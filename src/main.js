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
4. **Math Notation**:
    - DO NOT use LaTeX delimiters ($ or \\[ \\]).
    - Use standard HTML tags for variables (e.g., <i>x</i>, <i>y</i>).
    - **Layout**:
      - **CRITICAL**: Do NOT add unnecessary line breaks or <br> tags within a single sentence or question text.
      - Keep mathematical variables (like <i>x</i>, <i>y</i>, <i>a</i>) INLINE with the text. Never break a line before or after a variable unless it's a new paragraph.
      - Write questions as continuous text.
    - **Fractions**: Use a vertical fraction layout with the following HTML structure:
      \`<span class="fraction"><span class="num">numerator</span><span class="den">denominator</span></span>\`
    - **Square Roots**: Use the following HTML structure:
      \`<span class="sqrt"><span class="radical">&radic;</span><span class="radicand">content</span></span>\`
    - Do NOT use slanted fractions like \`a/5\` or \`<sup>a</sup>/<sub>5</sub>\`.

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
   - **CRITICAL**: Do NOT include the "Instructor Guide" or "Teaching Points" here. Only what the student needs to understand the answer.

3. \`<div class="instructor-guide">...</div>\`
   - **MUST** be included.
   - **CRITICAL**: This section is ONLY for the teacher/parent.
   - Contains:
     - \`<h2>作問意図と到達目標</h2>\`: Bullet points explaining why these problems were chosen and what the student should learn.
     - \`<h2>指導のポイント</h2>\`: Specific advice for teaching these concepts (e.g., common pitfalls, key steps).
     - \`<h2>解説の順序・フロー</h2>\`: Recommended step-by-step explanation flow for the instructor.
     - Content should be professional, encouraging, and helpful for a tutor.
`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    const cleanHtml = text.replace(/```html|```/g, "");

    app.resultContent.innerHTML = cleanHtml;
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
  const win = window.open("", "_blank");

  const printDate = app.printDate.value || '';
  const studentName = app.studentName.value || '';
  const instructorName = app.instructorName.value || '';

  let formattedDate = '';
  if (printDate) {
    const d = new Date(printDate);
    formattedDate = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  const headerHtml = `
    <div class="print-header">
      <div class="header-left">
        ${formattedDate ? `<span class="date">${formattedDate}</span>` : ''}
        <div class="names">
            ${studentName ? `<span class="student">生徒: ${studentName}</span>` : ''}
            ${instructorName ? `<span class="instructor">講師: ${instructorName}</span>` : ''}
        </div>
      </div>
      
      <div class="header-right">
        <div class="score-box">
             <div class="score-item">目標時間<div class="score-line"></div>分</div>
             <div class="score-item">得点<div class="score-line"></div>/100</div>
        </div>
      </div>
    </div>
  `;

  let customStyles = "";
  let jsScript = "";

  const friendlyCss = `
    @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap');

    body {
      font-family: 'Zen Maru Gothic', sans-serif;
      color: #333;
      padding: 20px;
      line-height: 1.6;
    }

    .print-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 10px;
      border-bottom: 2px solid #333;
      padding-bottom: 5px;
    }

    .header-left .date {
      font-weight: 500;
    }

    .header-right {
      text-align: right;
      display: flex;
      gap: 15px;
    }

    .header-right h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 2px;
    }

    .score-box {
      border: 2px solid #333;
      border-radius: 8px;
      padding: 5px 15px;
      display: flex;
      gap: 20px;
      background: #fff;
    }
    
    .score-item {
      font-size: 14px;
      display: flex;
      align-items: flex-end;
    }

    .score-line {
      border-bottom: 1px solid #333;
      width: 60px;
      margin-left: 5px;
    }

    .problems, .solutions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .problem-item {
      border: 2px dashed #bbb;
      border-radius: 12px;
      padding: 15px;
      background-color: #fff;
      page-break-inside: avoid;
      position: relative;
    }

    h1 {
      font-size: 1.4rem;
      margin: 10px 0 15px;
      border-left: 6px solid #666;
      padding-left: 10px;
      color: #333;
    }
    
    .page-break { page-break-after: always; }
  `;

  const fractionCss = `
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.9em; text-align: center; }
    .num { border-bottom: 1px solid black; padding: 0 2px; display: block; }
    .den { padding: 0 2px; display: block; }
  `;

  const mathCss = `
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.9em; text-align: center; margin: 0 2px; }
    .num { border-bottom: 1px solid #333; padding: 0 2px; display: block; }
    .den { padding: 0 2px; display: block; }

    .sqrt { display: inline-flex; align-items: baseline; margin: 0 2px; }
    .radical { font-size: 1.2em; margin-right: 0px; line-height: 1; }
    .radicand { border-top: 1px solid #333; padding-top: 2px; padding-left: 1px; display: inline-block; line-height: 1.1; }
  `;

  if (mode === 'problem') {
    // Problem mode: Vertical list with fixed page height distribution
    customStyles = `
      ${friendlyCss}
      
      .solutions, .instructor-guide, h2 { 
        display: none !important; 
      }
      
      body {
        padding: 10mm !important;
        margin: 0 !important;
        font-size: 14px;
        width: 100% !important;
        box-sizing: border-box;
      }
      
      .print-header {
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #333;
        height: 35px; /* Fixed header height */
      }
      
      /* Fixed height container to force equal spacing on A4 */
      .problems {
        display: flex;
        flex-direction: column;
        /* A4 Height (297mm) - Padding (20mm) - Header (~15mm) = ~260mm */
        height: 260mm; 
        width: 100%;
      }
      
      .problem-item {
        flex: 1; /* Distribute available height equally */
        width: 100%; /* Force full width */
        padding: 5px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align to top, no forced spacing */
        page-break-inside: avoid;
        /* No border or extra line */
      }
      
      .problem-item:last-child {
        border-bottom: none;
      }
      
      .problem-item::before {
        content: '(' counter(problem) ')';
        counter-increment: problem;
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
      }
      
      .problems {
        counter-reset: problem;
      }
      
      /* Removed answer line '::after' block entirely */
      
      h1 {
        font-size: 1.1rem;
        margin: 0 0 5px;
        border-left: 4px solid #333;
        padding-left: 8px;
        color: #333;
      }
      
      .math, .fraction { font-size: 1.1em; }
      ${mathCss}
    `;
    // Simplified scaling safety
    jsScript = `
      <script>
      window.onload = function() {
        document.querySelectorAll('.solutions, .instructor-guide').forEach(el => el.remove());
      }
      </script>
    `;
  } else if (mode === 'solution') {
    // Solution & Learner Explanation mode
    customStyles = `
      ${friendlyCss}
      
      /* Hide problems and INSTRUCTOR guide */
      .problems, .instructor-guide { 
        display: none !important; 
      }
      
      /* Show solutions (now includes learner explanation) */
      .solutions {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 2 Columns for readability of explanation */
        gap: 15px;
        margin-bottom: 20px;
        border-bottom: 2px solid #333;
        padding-bottom: 20px;
      }
      
      .solutions > div {
        border: 1px solid #ccc; /* Box style for clear separation */
        border-radius: 8px;
        padding: 10px;
        background: transparent !important; 
        font-size: 13px;
        page-break-inside: avoid;
      }
      
      .explanation {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dashed #ccc;
        font-size: 12px;
        color: #444;
      }

      h1 { display: none; }
      
      ${mathCss}
    `;
    jsScript = `
      <script>
      window.onload = function() {
        // Remove problem and instructor guide elements
        document.querySelectorAll('.problems, .instructor-guide').forEach(el => el.remove());
        
        // Auto-scale to fit A4 page
        const body = document.body;
        let scale = 1;
        const pageHeight = 287 * 3.78;
        
        while (body.scrollHeight > pageHeight && scale > 0.6) {
          scale -= 0.02;
          body.style.transform = 'scale(' + scale + ')';
          body.style.transformOrigin = 'top left';
          body.style.width = (100 / scale) + '%';
        }
      }
      </script>
    `;
  } else if (mode === 'instructor') {
    customStyles = `
      ${friendlyCss}
      .problems, .solutions { display: none !important; }
      
      /* Ensure guide is visible and layout is optimized for single page */
      .instructor-guide { 
        display: block; 
        page-break-inside: avoid; 
      }
      
      .instructor-guide h2 {
        border-left: 6px solid #4f46e5;
        padding-left: 10px;
        margin-top: 15px; /* Reduced top margin */
        margin-bottom: 10px;
        color: #333;
        font-size: 1.2rem;
      }
      
      .instructor-guide ul, .instructor-guide ol {
        margin-left: 20px;
        line-height: 1.5; /* Slightly tighter line height */
        margin-bottom: 10px;
      }
      
      .instructor-guide li {
        margin-bottom: 4px;
      }
      
      h1 { 
        text-align: center; 
        margin-bottom: 1.5rem; 
        font-size: 1.5rem;
      }
      ${mathCss}
    `;
    // Add auto-scale logic for instructor mode
    jsScript = `
      <script>
      window.onload = function() {
        // Remove incompatible elements
        document.querySelectorAll('.problems, .solutions').forEach(el => el.remove());
        
        // Auto-scale to fit A4 page
        const body = document.body;
        let scale = 1;
        const pageHeight = 287 * 3.78; // A4 height approx
        
        while (body.scrollHeight > pageHeight && scale > 0.6) {
          scale -= 0.02;
          body.style.transform = 'scale(' + scale + ')';
          body.style.transformOrigin = 'top left';
          body.style.width = (100 / scale) + '%';
        }
      }
      </script>
    `;
  } else {
    customStyles = `
      ${friendlyCss}
      ${mathCss}
      /* In full mode, show everything but structured */
    `;
    jsScript = ``;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>類題プリント</title>
        <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 5mm; }
          body { font-family: 'Zen Kaku Gothic New', sans-serif; margin: 0; padding: 5mm; width: 100%; box-sizing: border-box; }
          h1 { font-size: 1.4rem; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-bottom: 1rem; }
          .page-break { page-break-before: always; height: 0; margin: 0; border: none; }

          ${fractionCss}

          .print-controls {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            display: flex;
            gap: 10px;
          }
          .print-controls button {
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
          }
          .print-btn { background: #4f46e5; color: white; }
          .close-btn { background: #6b7280; color: white; }

          @media print {
            .print-controls { display: none !important; }
            ${customStyles}
          }
          ${customStyles}
        </style>
      </head>
      <body>
        <div class="print-controls">
          <button class="print-btn" onclick="window.print()">🖨️ 印刷 / PDF保存</button>
          <button class="close-btn" onclick="window.close()">✕ 閉じる</button>
        </div>
        ${headerHtml}
        ${content}
        ${jsScript}
      </body>
    </html>
  `);
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
