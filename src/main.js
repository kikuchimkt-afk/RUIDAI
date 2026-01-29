import { GoogleGenerativeAI } from "@google/generative-ai";

const STORAGE_KEY = "ruidai_api_key";
const MODEL_STORAGE_KEY = "ruidai_model";
const IMAGES_STORAGE_KEY = "ruidai_images";

// State
let apiKey = localStorage.getItem(STORAGE_KEY) || "";
let selectedImages = []; // Array of Base64 strings

// Helper for safe JSON parse
function safeJsonParse(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
    return fallback;
  }
}

function saveImages() {
  try {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(selectedImages));
  } catch (e) {
    console.error("Failed to save images:", e);
    if (e.name === 'QuotaExceededError') {
      alert("保存容量を超えたため、画像の自動保存ができませんでした。");
    }
  }
}

// DOM Elements
let app = {};

// Initialize
function init() {

  app = {
    dropZone: document.getElementById("dropZone"),
    fileInput: document.getElementById("fileInput"),
    uploadBtn: document.getElementById("uploadBtn"),
    previewArea: document.getElementById("previewArea"),
    generateBtn: document.getElementById("generateBtn"),
    questionCount: document.getElementById("questionCount"),
    modelSelect: document.getElementById("modelSelect"),
    customInstructions: document.getElementById("customInstructions"),
    printDate: document.getElementById("printDate"),
    studentName: document.getElementById("studentName"),
    instructorName: document.getElementById("instructorName"),
    resultSection: document.getElementById("resultSection"),
    resultContent: document.getElementById("resultContent"),

    // Modal
    apiKeyModal: document.getElementById("apiKeyModal"),
    apiKeyInput: document.getElementById("apiKeyInput"),
    saveApiKeyBtn: document.getElementById("saveApiKeyBtn"),
    settingsBtn: document.getElementById("settingsBtn"),
    toggleApiKey: document.getElementById("toggleApiKey"),
    printProblemBtn: document.getElementById("printProblemBtn"),
    printSolutionBtn: document.getElementById("printSolutionBtn"),
    printFullBtn: document.getElementById("printFullBtn"),
    printInstructorBtn: document.getElementById("printInstructorBtn"),
    progressContainer: document.getElementById("progressContainer"),
  };

  // Check for missing elements
  for (const [key, element] of Object.entries(app)) {
    if (!element) {
      console.error(`Missing DOM element: ${key}`);
    }
  }

  if (!apiKey) {
    showModal();
  } else {
    app.apiKeyInput.value = apiKey;
  }

  // Restore model selection
  const savedModel = localStorage.getItem(MODEL_STORAGE_KEY);
  if (savedModel) {
    app.modelSelect.value = savedModel;
  }

  // Restore persisted inputs
  const savedDate = localStorage.getItem("ruidai_print_date");
  if (savedDate) app.printDate.value = savedDate;

  const savedStudent = localStorage.getItem("ruidai_current_student");
  if (savedStudent) app.studentName.value = savedStudent;

  const savedInstructor = localStorage.getItem("ruidai_current_instructor");
  if (savedInstructor) app.instructorName.value = savedInstructor;

  // Restore images
  const savedImages = safeJsonParse(IMAGES_STORAGE_KEY, []);
  if (savedImages.length > 0) {
    selectedImages = savedImages;
    renderPreviews();
  }

  updateGenerateButtonText();

  setupEventListeners();
}

function showModal() {
  app.apiKeyModal.classList.add("active");
  app.apiKeyInput.focus();
}

function hideModal() {
  app.apiKeyModal.classList.remove("active");
}

function setupEventListeners() {
  // Model Selection
  app.modelSelect.addEventListener("change", () => {
    localStorage.setItem(MODEL_STORAGE_KEY, app.modelSelect.value);
    updateGenerateButtonText();
  });

  // API Key Management
  app.saveApiKeyBtn.addEventListener("click", () => {
    const key = app.apiKeyInput.value.trim();
    if (key) {
      apiKey = key;
      localStorage.setItem(STORAGE_KEY, apiKey);
      hideModal();
    }
  });

  app.settingsBtn.addEventListener("click", showModal);

  app.toggleApiKey.addEventListener("click", () => {
    app.apiKeyInput.type = app.apiKeyInput.type === "password" ? "text" : "password";
  });

  // Persist Inputs
  app.printDate.addEventListener("input", () => localStorage.setItem("ruidai_print_date", app.printDate.value));
  app.studentName.addEventListener("input", () => localStorage.setItem("ruidai_current_student", app.studentName.value));
  app.instructorName.addEventListener("input", () => localStorage.setItem("ruidai_current_instructor", app.instructorName.value));

  // File Upload
  app.uploadBtn.addEventListener("click", () => app.fileInput.click());

  app.fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

  // Drag & Drop
  app.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    app.dropZone.classList.add("dragover");
  });

  app.dropZone.addEventListener("dragleave", () => {
    app.dropZone.classList.remove("dragover");
  });

  app.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    app.dropZone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  // Paste - Enhanced for better compatibility
  document.addEventListener("paste", handlePaste);

  // Generation
  app.generateBtn.addEventListener("click", generateSimilarProblems);

  // Preset Management
  loadUserPresets();
  setupPresetListeners();

  // Add Preset Button
  document.getElementById('addPresetBtn').addEventListener('click', addUserPreset);
  document.getElementById('newPresetInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addUserPreset();
  });

  // Name History Management
  setupNameHistory('studentName', 'studentNameList', 'ruidai_student_names');
  setupNameHistory('instructorName', 'instructorNameList', 'ruidai_instructor_names');
}

// Enhanced paste handler
function handlePaste(e) {
  try {
    const clipboard = e.clipboardData || window.clipboardData;
    if (!clipboard) {
      console.log("No clipboard data available");
      return;
    }

    const items = clipboard.items;
    const files = [];

    // Method 1: Try getting files from DataTransferItemList (preferred)
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            files.push(blob);
          }
        }
      }
    }

    // Method 2: Fallback to clipboard.files
    if (files.length === 0 && clipboard.files && clipboard.files.length > 0) {
      for (let i = 0; i < clipboard.files.length; i++) {
        const file = clipboard.files[i];
        if (file.type.startsWith('image/')) {
          files.push(file);
        }
      }
    }

    // Method 3: Check for image data in types (for some browsers)
    if (files.length === 0 && items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            files.push(blob);
          }
        }
      }
    }

    if (files.length > 0) {
      e.preventDefault();
      console.log(`Pasted ${files.length} image(s)`);
      handleFiles(files);
    }
  } catch (err) {
    console.error("Paste error:", err);
  }
}

// --- History Dropdown Logic for Names ---
function setupNameHistory(inputId, listId, storageKey) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);

  // Helper to render
  const renderList = () => {
    list.innerHTML = '';
    const currentHist = safeJsonParse(storageKey, []);

    if (currentHist.length === 0) {
      list.classList.add('hidden');
      return;
    }

    currentHist.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'dropdown-item';
      li.innerHTML = `
        <span class="content">${item}</span>
        <span class="delete-btn" title="削除">×</span>
      `;

      // Select item
      li.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('delete-btn')) return;
        input.value = item;
        list.classList.add('hidden');
      });

      // Delete item
      li.querySelector('.delete-btn').addEventListener('mousedown', (e) => {
        e.stopPropagation();
        if (confirm(`${item} を履歴から削除しますか？`)) {
          const newHist = safeJsonParse(storageKey, []);
          newHist.splice(index, 1);
          localStorage.setItem(storageKey, JSON.stringify(newHist));
          renderList();
          if (newHist.length === 0) list.classList.add('hidden');
        }
      });

      list.appendChild(li);
    });
  };

  // Show on focus
  input.addEventListener('focus', () => {
    renderList();
    if (list.children.length > 0) list.classList.remove('hidden');
  });

  // Hide on blur (delayed to allow click)
  input.addEventListener('blur', () => {
    setTimeout(() => {
      list.classList.add('hidden');
    }, 200);
  });
}

function saveToHistory(inputId, storageKey) {
  const val = document.getElementById(inputId).value.trim();
  if (!val) return;

  const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const existingIdx = history.indexOf(val);
  if (existingIdx !== -1) history.splice(existingIdx, 1);

  history.unshift(val);
  if (history.length > 10) history.pop();

  localStorage.setItem(storageKey, JSON.stringify(history));
}


const PRESET_STORAGE_KEY = "ruidai_custom_presets";
let userPresets = safeJsonParse(PRESET_STORAGE_KEY, []);

function loadUserPresets() {
  const container = document.getElementById('userPresets');
  container.innerHTML = '';
  userPresets.forEach((text, index) => {
    createPresetButton(text, index, container);
  });
}

function createPresetButton(text, index, container) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'preset-btn';
  btn.dataset.preset = text;
  btn.innerHTML = `${text} <span class="remove-tag" data-index="${index}" title="削除">×</span>`;

  btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-tag')) return;
    btn.classList.toggle('active');
  });

  btn.querySelector('.remove-tag').addEventListener('click', (e) => {
    e.stopPropagation();
    removeUserPreset(index);
  });

  container.appendChild(btn);
}

function addUserPreset() {
  const input = document.getElementById('newPresetInput');
  const text = input.value.trim();
  if (!text) return;

  if (userPresets.includes(text)) {
    alert("このタグは既に追加されています");
    return;
  }

  userPresets.push(text);
  saveUserPresets();
  loadUserPresets();
  input.value = '';
}

function removeUserPreset(index) {
  if (confirm("このタグを削除しますか？")) {
    userPresets.splice(index, 1);
    saveUserPresets();
    loadUserPresets();
  }
}

function saveUserPresets() {
  localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(userPresets));
}

function setupPresetListeners() {
  const defaultContainer = document.getElementById('defaultPresets');
  defaultContainer.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Print Buttons
  app.printProblemBtn.addEventListener("click", () => openPrintPreview('problem'));
  app.printSolutionBtn.addEventListener("click", () => openPrintPreview('solution'));
  app.printFullBtn.addEventListener("click", () => openPrintPreview('full'));
  app.printInstructorBtn.addEventListener("click", () => openPrintPreview('instructor'));
}

function handleFiles(files) {
  if (files.length === 0) return;

  const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));

  if (validFiles.length === 0) {
    alert("画像ファイルを選択してください");
    return;
  }

  let processedCount = 0;

  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImages.push(e.target.result);
      processedCount++;

      if (processedCount === validFiles.length) {
        saveImages();
        renderPreviews();
        app.fileInput.value = "";
      }
    };
    reader.readAsDataURL(file);
  });
}

function renderPreviews() {
  const container = app.previewArea;
  container.innerHTML = '';

  if (selectedImages.length === 0) {
    container.classList.add('hidden');
    app.uploadBtn.textContent = "画像を選択";
    app.generateBtn.disabled = true;
    return;
  }

  container.classList.remove('hidden');
  app.uploadBtn.textContent = "さらにページを追加";
  app.generateBtn.disabled = false;

  selectedImages.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Page ${index + 1}`;

    // Click to open modal
    img.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      modalImg.src = imgSrc;
      modal.classList.add('active');
    });

    const div = document.createElement('div');
    div.className = 'preview-item';
    div.innerHTML = `
      <span class="page-number">P.${index + 1}</span>
      <button class="remove-btn" data-index="${index}" title="削除">×</button>
    `;

    div.insertBefore(img, div.firstChild);

    div.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      removeImage(index);
    });

    container.appendChild(div);
  });

  // Modal Close Logic
  const imageModal = document.getElementById('imageModal');
  const closeModal = imageModal.querySelector('.close-modal');

  // Clean up listeners to avoid duplicates on re-render
  const newCloseBtn = closeModal.cloneNode(true);
  closeModal.parentNode.replaceChild(newCloseBtn, closeModal);

  const closeModalFunc = () => {
    imageModal.classList.remove('active');
    setTimeout(() => {
      const modalImg = document.getElementById('modalImage');
      if (modalImg) modalImg.src = '';
    }, 300);
  };

  newCloseBtn.addEventListener('click', closeModalFunc);

  imageModal.onclick = (e) => {
    if (e.target === imageModal) closeModalFunc();
  };
}

function removeImage(index) {
  if (confirm(`P.${index + 1} を削除しますか？`)) {
    selectedImages.splice(index, 1);
    saveImages();
    renderPreviews();
  }
}

function clearImage() {
  if (selectedImages.length > 0 && confirm("すべての画像を削除しますか？")) {
    selectedImages = [];
    saveImages();
    renderPreviews();
  }
  app.resultSection.classList.add("hidden");
}

async function generateSimilarProblems() {
  if (!apiKey) {
    showModal();
    return;
  }

  setLoading(true);

  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    const modelName = app.modelSelect.value;
    const model = genAI.getGenerativeModel({ model: modelName });

    const imageParts = selectedImages.map(imgData => ({
      inlineData: {
        data: imgData.split(',')[1],
        mimeType: "image/jpeg",
      },
    }));

    const count = app.questionCount.value;

    const activePresets = Array.from(document.querySelectorAll('.preset-btn.active'))
      .map(btn => btn.dataset.preset)
      .join('\n');
    const customText = app.customInstructions.value;
    const instructions = `${activePresets}\n${customText}`.trim();

    saveToHistory('studentName', 'ruidai_student_names');
    saveToHistory('instructorName', 'ruidai_instructor_names');

    const prompt = `
# System Role
You are an expert tutor preparing supplementary materials.

# Task
Create ${count} similar problems based on the provided image.
The output must be a self-contained HTML document suitable for printing.

# Requirements
1. **Target Audience**: Same academic level as the problem in the image.
2. **Topic**: Exactly the same mathematical/scientific concept.
3. **Format**: OUTPUT RAW HTML ONLY. No markdown delimiters.
4.    - **Math Notation**:
      - Use **LaTeX** format for mathematical formulas and variables (e.g., $x^2$, $\\frac{1}{2}$).
      - **IMPORTANT**: Do NOT use LaTeX for simple numbers (e.g. 1, 100, 2024) or units (円, 個, 人) unless they are part of a complex formula.
      - **Natural Japanese Notation**: Write "100個" (text), NOT "$100$個" or "$100個$". Write "$x$人" (variable x is LaTeX), NOT "$x人$".
      - Enclose inline math in \`$\` (e.g., \`$x^2 + y^2 = r^2$\`).
      - Enclose block math in \`$$\` (two dollar signs).
      - **Chemical Formulas**: Use LaTeX (e.g., \`$\\text{H}_2\\text{O}$\` or \`$\\ce{H2O}$\`).
      - **Layout**:
        - **CRITICAL**: Do NOT add unnecessary line breaks or <br> tags within a single sentence or question text.
        - Keep mathematical variables INLINE with the text. Never break a line before or after a variable unless it's a new paragraph.
        - Write questions as continuous text.

# Custom Instructions
${instructions}

# HTML Structure
The output HTML must contain exactly three main sections within the body:

1. \`<div class="problems">...</div>\`
   - Contains the ${count} problems.
   - Each problem inside a \`<div class="problem-item">...</div>\`.

2. \`<div class="solutions">...</div>\`
   - Contains the solutions AND explanations for the student.
   - Each item should be \`<div><strong>(1) Answer</strong><div class="explanation">Brief student-friendly explanation...</div></div>\`

3. \`<div class="instructor-guide">...</div>\`
   - **MUST** be included.
   - Contains:
     - \`<h2>作問意図と到達目標</h2>\`
     - \`<h2>指導のポイント</h2>\`
     - \`<h2>解説の順序・フロー</h2>\`

`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    const cleanHtml = text.replace(/```html|```/g, "");

    app.resultContent.innerHTML = cleanHtml;

    // Render Math (KaTeX)
    const renderMath = () => {
      if (window.renderMathInElement) {
        renderMathInElement(app.resultContent, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } else {
        console.warn("KaTeX renderMathInElement not found, retrying...");
        setTimeout(renderMath, 500);
      }
    };
    renderMath();

    app.resultSection.classList.remove("hidden");

    app.resultSection.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    console.error(error);
    alert(`エラーが発生しました: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

function updateGenerateButtonText() {
  const modelLabel = app.modelSelect.options[app.modelSelect.selectedIndex].text;
  const text = app.generateBtn.querySelector(".btn-text");
  text.textContent = `類題を作成(${modelLabel})`;
}

function setLoading(isLoading) {
  const btn = app.generateBtn;
  const spinner = btn.querySelector(".spinner");
  const text = btn.querySelector(".btn-text");
  const progress = app.progressContainer;

  if (isLoading) {
    btn.disabled = true;
    spinner.classList.remove("hidden");
    text.textContent = "作成中...";
    progress.classList.remove("hidden");
  } else {
    btn.disabled = false;
    spinner.classList.add("hidden");
    updateGenerateButtonText();
    progress.classList.add("hidden");
  }
}

function openPrintPreview(mode) {
  const content = app.resultContent.innerHTML;

  // Parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  const problems = doc.querySelector('.problems')?.innerHTML || '<div>問題が見つかりません</div>';
  const solutions = doc.querySelector('.solutions')?.innerHTML || '<div>解答が見つかりません</div>';
  const instructor = doc.querySelector('.instructor-guide')?.innerHTML || '<div>講師用ガイドが見つかりません</div>';

  const printDate = app.printDate.value || '';
  const studentName = app.studentName.value || '';
  const instructorName = app.instructorName.value || '';

  let formattedDate = '';
  if (printDate) {
    const d = new Date(printDate);
    formattedDate = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  // Header template
  const getHeader = (showScore = true) => `
    <div class="print-header">
      <div class="header-top">
         <h1 class="main-title" id="displayTitle">${title}</h1>
      </div>
      <div class="header-bottom">
          <div class="header-left">
            ${formattedDate ? `<span class="date">${formattedDate}</span>` : ''}
            <div class="names">
                ${studentName ? `<span class="student">生徒: ${studentName}</span>` : ''}
                ${instructorName ? `<span class="instructor">講師: ${instructorName}</span>` : ''}
            </div>
          </div>
          
          <div class="header-right">
            ${showScore ? `
            <div class="score-box">
                 <div class="score-item">目標時間<div class="score-line"></div>分</div>
                 <div class="score-item">得点<div class="score-line"></div>/100</div>
            </div>` : ''}
          </div>
      </div>
    </div>
  `;

  let sectionContent = "";
  let title = "";
  let headerHtml = "";

  const wrapSection = (titleText, innerContent, addBreak = false) => `
    <div class="print-section">
       ${mode !== 'full' ? `<!-- Single mode title skipped in body if header has it, but let's keep h2 for section -->` : ''}
       <h2>${titleText}</h2>
       <div class="section-body">
         ${innerContent}
       </div>
    </div>
    ${addBreak ? '<div class="page-break"></div>' : ''}
  `;

  // Build content HTML string
  switch (mode) {
    case 'problem':
      title = "問題";
      headerHtml = getHeader(true);
      sectionContent = wrapSection("問題", problems);
      break;
    case 'solution':
      title = "解答・解説";
      headerHtml = getHeader(false);
      sectionContent = wrapSection("解答・解説", solutions);
      break;
    case 'full':
      title = "類題プリント"; // Default title for full
      headerHtml = getHeader(true);
      sectionContent = `
        ${wrapSection("問題", problems, true)}
        ${getHeader(false)} 
        ${wrapSection("解答・解説", solutions, true)}
        ${getHeader(false)} 
        ${wrapSection("講師向けガイド", instructor, false)}
      `;
      break;
    case 'instructor':
      title = "講師向けガイド";
      headerHtml = getHeader(false);
      sectionContent = wrapSection("講師向けガイド", instructor);
      break;
  }

  const win = window.open("", "_blank");

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css');

    body {
      font-family: 'Zen Maru Gothic', sans-serif;
      color: #333;
      padding: 0;
      margin: 0;
      line-height: 1.6;
    }

    .print-wrapper {
        padding: 15mm;
        padding-bottom: 20mm; /* Space for footer */
        width: 100%;
        box-sizing: border-box;
    }

    .print-header {
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 5px;
    }
    
    .header-top {
        text-align: center;
        margin-bottom: 10px;
    }
    
    .main-title {
        font-size: 24px;
        margin: 0;
        letter-spacing: 2px;
    }

    .header-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-left .date { font-weight: 500; margin-right: 15px; }
    .names { display: inline-flex; gap: 15px; }
    
    .score-box {
      border: 2px solid #333;
      border-radius: 8px;
      padding: 5px 15px;
      display: flex;
      gap: 20px;
      background: #fff;
    }
    
    .score-item { font-size: 14px; display: flex; align-items: flex-end; }
    .score-line { border-bottom: 1px solid #333; width: 60px; margin-left: 5px; }

    /* Single Column Layout */
    .problems, .solutions, .section-body {
      display: block; 
      width: 100%;
    }

    .problem-item {
      padding: 10px 0;
      margin-bottom: 15px;
      border-bottom: 1px dashed #ccc;
      page-break-inside: avoid;
    }
    
    .problem-item:last-child { border-bottom: none; }

    /* Math Styles */
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.9em; text-align: center; margin: 0 4px; }
    .num { border-bottom: 1px solid #333; padding: 0 2px; display: block; }
    .den { padding: 0 2px; display: block; }

    .sqrt { display: inline-flex; align-items: baseline; margin: 0 2px; }
    .radical { font-size: 1.2em; margin-right: 0px; line-height: 1; }
    .radicand { border-top: 1px solid #333; padding-top: 2px; padding-left: 1px; display: inline-block; line-height: 1.1; }

    h2 {
        font-size: 1.2rem;
        border-left: 5px solid #888;
        padding-left: 10px;
        margin-top: 0;
        margin-bottom: 20px;
    }

    /* Page Break */
    .page-break { 
        page-break-after: always; 
        height: 0; 
        display: block; 
        border: none; 
    }
    
    /* Footer */
    .print-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 10px;
        color: #666;
        padding-bottom: 5mm;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 1000;
    }

    @page {
        size: A4 portrait;
        margin: 10mm;
    }

    /* Print Controls */
    .print-controls {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: #f3f4f6;
        border-bottom: 1px solid #d1d5db;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .control-group {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    input[type=range] { width: 150px; cursor: pointer; }
    input[type=text] { padding: 5px; border-radius: 4px; border: 1px solid #ccc; width: 150px; }
    
    .buttons { display: flex; gap: 10px; }
    .btn {
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        transition: opacity 0.2s;
    }
    .btn-print { background: #4f46e5; color: white; }
    .btn-close { background: #6b7280; color: white; }
    .btn:hover { opacity: 0.9; }

    @media print {
        .print-controls { display: none !important; }
        body { padding-top: 0 !important; }
        .print-footer { display: block !important; }
    }
    
    body { 
        padding-top: 80px; 
        background-color: #e5e7eb; 
    }
    
    .print-wrapper {
        background-color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
        min-height: 297mm;
        position: relative;
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title} - RUIDAI (Print)</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
            onload="renderMathInElement(document.body, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
              ],
              throwOnError: false
            });"></script>
        <style>${css}</style>
      </head>
      <body>
        <div class="print-controls">
            <div class="control-group">
                <label>タイトル:</label>
                <input type="text" id="titleInput" value="${title}">
                
                <label style="margin-left: 15px;">サイズ: <span id="scaleVal">100%</span></label>
                <input type="range" id="scaleSlider" min="50" max="150" value="100" step="5">
            </div>
            <div class="buttons">
                <button class="btn btn-print" onclick="window.print()">🖨️ 印刷</button>
                <button class="btn btn-close" onclick="window.close()">✕ 閉じる</button>
            </div>
        </div>

        <div class="print-wrapper" id="printContent">
            ${headerHtml}
            ${sectionContent}
            
            <div class="print-footer">
                ©ECCベストワン藍住・北島中央
            </div>
        </div>

        <script>
            const slider = document.getElementById('scaleSlider');
            const label = document.getElementById('scaleVal');
            const titleInput = document.getElementById('titleInput');
            
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                label.textContent = val + '%';
                document.body.style.zoom = val + '%';
            });
            
            titleInput.addEventListener('input', (e) => {
                const newTitle = e.target.value;
                document.querySelectorAll('.main-title').forEach(el => el.textContent = newTitle);
                document.title = newTitle;
            });
        </script>
      </body>
    </html>
  `;

  win.document.write(html);
  win.document.close();
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (e) {
    console.error("Initialization error:", e);
    alert("アプリの初期化に失敗しました: " + e.message);
  }
});
