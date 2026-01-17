(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var H;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(H||(H={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(G||(G={}));var P;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(P||(P={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U=["user","model","function","system"];var F;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(F||(F={}));var K;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(K||(K={}));var q;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(q||(q={}));var j;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(j||(j={}));var x;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(x||(x={}));var Y;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(Y||(Y={}));var z;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(z||(z={}));var V;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(V||(V={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class C extends g{constructor(t,n){super(t),this.response=n}}class re extends g{constructor(t,n,s,o){super(t),this.status=n,this.statusText=s,this.errorDetails=o}}class v extends g{}class ae extends g{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="https://generativelanguage.googleapis.com",ve="v1beta",ye="0.24.1",be="genai-js";var y;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(y||(y={}));class Ie{constructor(t,n,s,o,i){this.model=t,this.task=n,this.apiKey=s,this.stream=o,this.requestOptions=i}toString(){var t,n;const s=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||ve;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||Ee}/${s}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function Ce(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${be}/${ye}`),t.join(" ")}async function _e(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",Ce(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(o){throw new v(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${o.message}`)}for(const[o,i]of s.entries()){if(o==="x-goog-api-key")throw new v(`Cannot set reserved header name ${o}`);if(o==="x-goog-api-client")throw new v(`Header name ${o} can only be set using the apiClient field`);n.append(o,i)}}return n}async function xe(e,t,n,s,o,i){const r=new Ie(e,t,n,s,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},Ae(i)),{method:"POST",headers:await _e(r),body:o})}}async function A(e,t,n,s,o,i={},r=fetch){const{url:l,fetchOptions:c}=await xe(e,t,n,s,o,i);return Oe(l,c,r)}async function Oe(e,t,n=fetch){let s;try{s=await n(e,t)}catch(o){Se(o,e)}return s.ok||await we(s,e),s}function Se(e,t){let n=e;throw n.name==="AbortError"?(n=new ae(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof re||e instanceof v||(n=new g(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function we(e,t){let n="",s;try{const o=await e.json();n=o.error.message,o.error.details&&(n+=` ${JSON.stringify(o.error.details)}`,s=o.error.details)}catch{}throw new re(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,s)}function Ae(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),N(e.candidates[0]))throw new C(`${E(e)}`,e);return Re(e)}else if(e.promptFeedback)throw new C(`Text not available. ${E(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),N(e.candidates[0]))throw new C(`${E(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),J(e)[0]}else if(e.promptFeedback)throw new C(`Function call not available. ${E(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),N(e.candidates[0]))throw new C(`${E(e)}`,e);return J(e)}else if(e.promptFeedback)throw new C(`Function call not available. ${E(e)}`,e)},e}function Re(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)r.text&&i.push(r.text),r.executableCode&&i.push("\n```"+r.executableCode.language+`
`+r.executableCode.code+"\n```\n"),r.codeExecutionResult&&i.push("\n```\n"+r.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function J(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)r.functionCall&&i.push(r.functionCall);if(i.length>0)return i}const Ne=[x.RECITATION,x.SAFETY,x.LANGUAGE];function N(e){return!!e.finishReason&&Ne.includes(e.finishReason)}function E(e){var t,n,s;let o="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)o+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(o+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((s=e.candidates)===null||s===void 0)&&s[0]){const i=e.candidates[0];N(i)&&(o+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(o+=`: ${i.finishMessage}`))}return o}function O(e){return this instanceof O?(this.v=e,this):new O(e)}function Te(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=n.apply(e,t||[]),o,i=[];return o={},r("next"),r("throw"),r("return"),o[Symbol.asyncIterator]=function(){return this},o;function r(u){s[u]&&(o[u]=function(d){return new Promise(function(m,I){i.push([u,d,m,I])>1||l(u,d)})})}function l(u,d){try{c(s[u](d))}catch(m){h(i[0][3],m)}}function c(u){u.value instanceof O?Promise.resolve(u.value.v).then(f,p):h(i[0][2],u)}function f(u){l("next",u)}function p(u){l("throw",u)}function h(u,d){u(d),i.shift(),i.length&&l(i[0][0],i[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Le(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=De(t),[s,o]=n.tee();return{stream:Be(s),response:Me(o)}}async function Me(e){const t=[],n=e.getReader();for(;;){const{done:s,value:o}=await n.read();if(s)return M($e(t));t.push(o)}}function Be(e){return Te(this,arguments,function*(){const n=e.getReader();for(;;){const{value:s,done:o}=yield O(n.read());if(o)break;yield yield O(M(s))}})}function De(e){const t=e.getReader();return new ReadableStream({start(s){let o="";return i();function i(){return t.read().then(({value:r,done:l})=>{if(l){if(o.trim()){s.error(new g("Failed to parse stream"));return}s.close();return}o+=r;let c=o.match(W),f;for(;c;){try{f=JSON.parse(c[1])}catch{s.error(new g(`Error parsing JSON response: "${c[1]}"`));return}s.enqueue(f),o=o.substring(c[0].length),c=o.match(W)}return i()}).catch(r=>{let l=r;throw l.stack=r.stack,l.name==="AbortError"?l=new ae("Request aborted when reading from the stream"):l=new g("Error reading from the stream"),l})}}})}function $e(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const s of e){if(s.candidates){let o=0;for(const i of s.candidates)if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:o}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].groundingMetadata=i.groundingMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});const r={};for(const l of i.content.parts)l.text&&(r.text=l.text),l.functionCall&&(r.functionCall=l.functionCall),l.executableCode&&(r.executableCode=l.executableCode),l.codeExecutionResult&&(r.codeExecutionResult=l.codeExecutionResult),Object.keys(r).length===0&&(r.text=""),n.candidates[o].content.parts.push(r)}o++}s.usageMetadata&&(n.usageMetadata=s.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function le(e,t,n,s){const o=await A(t,y.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s);return Le(o)}async function ce(e,t,n,s){const i=await(await A(t,y.GENERATE_CONTENT,e,!1,JSON.stringify(n),s)).json();return{response:M(i)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function S(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return ke(t)}function ke(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,o=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),o=!0):(t.parts.push(i),s=!0);if(s&&o)throw new g("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new g("No content is provided for sending chat message.");return s?t:n}function He(e,t){var n;let s={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const o=e.generateContentRequest!=null;if(e.contents){if(o)throw new v("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{const i=S(e);s.contents=[i]}return{generateContentRequest:s}}function Z(e){let t;return e.contents?t=e:t={contents:[S(e)]},e.systemInstruction&&(t.systemInstruction=de(e.systemInstruction)),t}function Ge(e){return typeof e=="string"||Array.isArray(e)?{content:S(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Pe={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Ue(e){let t=!1;for(const n of e){const{role:s,parts:o}=n;if(!t&&s!=="user")throw new g(`First content should be with role 'user', got ${s}`);if(!U.includes(s))throw new g(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(U)}`);if(!Array.isArray(o))throw new g("Content should have 'parts' property with an array of Parts");if(o.length===0)throw new g("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const l of o)for(const c of X)c in l&&(i[c]+=1);const r=Pe[s];for(const l of X)if(!r.includes(l)&&i[l]>0)throw new g(`Content with role '${s}' can't contain '${l}' part`);t=!0}}function Q(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const s of n.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="SILENT_ERROR";class Fe{constructor(t,n,s,o={}){this.model=n,this.params=s,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,s!=null&&s.history&&(Ue(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var s,o,i,r,l,c;await this._sendPromise;const f=S(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,f]},h=Object.assign(Object.assign({},this._requestOptions),n);let u;return this._sendPromise=this._sendPromise.then(()=>ce(this._apiKey,this.model,p,h)).then(d=>{var m;if(Q(d.response)){this._history.push(f);const I=Object.assign({parts:[],role:"model"},(m=d.response.candidates)===null||m===void 0?void 0:m[0].content);this._history.push(I)}else{const I=E(d.response);I&&console.warn(`sendMessage() was unsuccessful. ${I}. Inspect response object for details.`)}u=d}).catch(d=>{throw this._sendPromise=Promise.resolve(),d}),await this._sendPromise,u}async sendMessageStream(t,n={}){var s,o,i,r,l,c;await this._sendPromise;const f=S(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,f]},h=Object.assign(Object.assign({},this._requestOptions),n),u=le(this._apiKey,this.model,p,h);return this._sendPromise=this._sendPromise.then(()=>u).catch(d=>{throw new Error(ee)}).then(d=>d.response).then(d=>{if(Q(d)){this._history.push(f);const m=Object.assign({},d.candidates[0].content);m.role||(m.role="model"),this._history.push(m)}else{const m=E(d);m&&console.warn(`sendMessageStream() was unsuccessful. ${m}. Inspect response object for details.`)}}).catch(d=>{d.message!==ee&&console.error(d)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ke(e,t,n,s){return(await A(t,y.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qe(e,t,n,s){return(await A(t,y.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function je(e,t,n,s){const o=n.requests.map(r=>Object.assign(Object.assign({},r),{model:t}));return(await A(t,y.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(t,n,s={}){this.apiKey=t,this._requestOptions=s,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=de(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var s;const o=Z(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ce(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}async generateContentStream(t,n={}){var s;const o=Z(t),i=Object.assign(Object.assign({},this._requestOptions),n);return le(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}startChat(t){var n;return new Fe(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const s=He(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),n);return Ke(this.apiKey,this.model,s,o)}async embedContent(t,n={}){const s=Ge(t),o=Object.assign(Object.assign({},this._requestOptions),n);return qe(this.apiKey,this.model,s,o)}async batchEmbedContents(t,n={}){const s=Object.assign(Object.assign({},this._requestOptions),n);return je(this.apiKey,this.model,t,s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new g("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new te(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,s){if(!t.name)throw new v("Cached content must contain a `name` field.");if(!t.model)throw new v("Cached content must contain a `model` field.");const o=["model","systemInstruction"];for(const r of o)if(n!=null&&n[r]&&t[r]&&(n==null?void 0:n[r])!==t[r]){if(r==="model"){const l=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,c=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(l===c)continue}throw new v(`Different value for "${r}" specified in modelParams (${n[r]}) and cachedContent (${t[r]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new te(this.apiKey,i,s)}}const ue="ruidai_api_key",fe="ruidai_model",pe="ruidai_images";let _=localStorage.getItem(ue)||"",b=[];function T(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error(`Error parsing ${e}:`,n),t}}function ge(){try{localStorage.setItem(pe,JSON.stringify(b))}catch(e){console.error("Failed to save images:",e),e.name==="QuotaExceededError"&&alert("保存容量を超えたため、画像の自動保存ができませんでした。")}}let a={};function ze(){a={dropZone:document.getElementById("dropZone"),fileInput:document.getElementById("fileInput"),uploadBtn:document.getElementById("uploadBtn"),previewArea:document.getElementById("previewArea"),generateBtn:document.getElementById("generateBtn"),questionCount:document.getElementById("questionCount"),modelSelect:document.getElementById("modelSelect"),customInstructions:document.getElementById("customInstructions"),printDate:document.getElementById("printDate"),studentName:document.getElementById("studentName"),instructorName:document.getElementById("instructorName"),resultSection:document.getElementById("resultSection"),resultContent:document.getElementById("resultContent"),apiKeyModal:document.getElementById("apiKeyModal"),apiKeyInput:document.getElementById("apiKeyInput"),saveApiKeyBtn:document.getElementById("saveApiKeyBtn"),settingsBtn:document.getElementById("settingsBtn"),toggleApiKey:document.getElementById("toggleApiKey"),printProblemBtn:document.getElementById("printProblemBtn"),printSolutionBtn:document.getElementById("printSolutionBtn"),printFullBtn:document.getElementById("printFullBtn"),printInstructorBtn:document.getElementById("printInstructorBtn"),progressContainer:document.getElementById("progressContainer")};for(const[i,r]of Object.entries(a))r||console.error(`Missing DOM element: ${i}`);_?a.apiKeyInput.value=_:B();const e=localStorage.getItem(fe);e&&(a.modelSelect.value=e);const t=localStorage.getItem("ruidai_print_date");t&&(a.printDate.value=t);const n=localStorage.getItem("ruidai_current_student");n&&(a.studentName.value=n);const s=localStorage.getItem("ruidai_current_instructor");s&&(a.instructorName.value=s);const o=T(pe,[]);o.length>0&&(b=o,$()),k(),Je()}function B(){a.apiKeyModal.classList.add("active"),a.apiKeyInput.focus()}function Ve(){a.apiKeyModal.classList.remove("active")}function Je(){a.modelSelect.addEventListener("change",()=>{localStorage.setItem(fe,a.modelSelect.value),k()}),a.saveApiKeyBtn.addEventListener("click",()=>{const e=a.apiKeyInput.value.trim();e&&(_=e,localStorage.setItem(ue,_),Ve())}),a.settingsBtn.addEventListener("click",B),a.toggleApiKey.addEventListener("click",()=>{a.apiKeyInput.type=a.apiKeyInput.type==="password"?"text":"password"}),a.printDate.addEventListener("input",()=>localStorage.setItem("ruidai_print_date",a.printDate.value)),a.studentName.addEventListener("input",()=>localStorage.setItem("ruidai_current_student",a.studentName.value)),a.instructorName.addEventListener("input",()=>localStorage.setItem("ruidai_current_instructor",a.instructorName.value)),a.uploadBtn.addEventListener("click",()=>a.fileInput.click()),a.fileInput.addEventListener("change",e=>L(e.target.files)),a.dropZone.addEventListener("dragover",e=>{e.preventDefault(),a.dropZone.classList.add("dragover")}),a.dropZone.addEventListener("dragleave",()=>{a.dropZone.classList.remove("dragover")}),a.dropZone.addEventListener("drop",e=>{e.preventDefault(),a.dropZone.classList.remove("dragover"),L(e.dataTransfer.files)}),document.addEventListener("paste",We),a.generateBtn.addEventListener("click",tt),D(),Qe(),document.getElementById("addPresetBtn").addEventListener("click",se),document.getElementById("newPresetInput").addEventListener("keypress",e=>{e.key==="Enter"&&se()}),ne("studentName","studentNameList","ruidai_student_names"),ne("instructorName","instructorNameList","ruidai_instructor_names")}function We(e){try{const t=e.clipboardData||window.clipboardData;if(!t){console.log("No clipboard data available");return}const n=t.items,s=[];if(n&&n.length>0)for(let o=0;o<n.length;o++){const i=n[o];if(i.kind==="file"&&i.type.startsWith("image/")){const r=i.getAsFile();r&&s.push(r)}}if(s.length===0&&t.files&&t.files.length>0)for(let o=0;o<t.files.length;o++){const i=t.files[o];i.type.startsWith("image/")&&s.push(i)}if(s.length===0&&n){for(let o=0;o<n.length;o++)if(n[o].type.indexOf("image")!==-1){const i=n[o].getAsFile();i&&s.push(i)}}s.length>0&&(e.preventDefault(),console.log(`Pasted ${s.length} image(s)`),L(s))}catch(t){console.error("Paste error:",t)}}function ne(e,t,n){const s=document.getElementById(e),o=document.getElementById(t),i=()=>{o.innerHTML="";const r=T(n,[]);if(r.length===0){o.classList.add("hidden");return}r.forEach((l,c)=>{const f=document.createElement("li");f.className="dropdown-item",f.innerHTML=`
        <span class="content">${l}</span>
        <span class="delete-btn" title="削除">×</span>
      `,f.addEventListener("mousedown",p=>{p.target.classList.contains("delete-btn")||(s.value=l,o.classList.add("hidden"))}),f.querySelector(".delete-btn").addEventListener("mousedown",p=>{if(p.stopPropagation(),confirm(`${l} を履歴から削除しますか？`)){const h=T(n,[]);h.splice(c,1),localStorage.setItem(n,JSON.stringify(h)),i(),h.length===0&&o.classList.add("hidden")}}),o.appendChild(f)})};s.addEventListener("focus",()=>{i(),o.children.length>0&&o.classList.remove("hidden")}),s.addEventListener("blur",()=>{setTimeout(()=>{o.classList.add("hidden")},200)})}function oe(e,t){const n=document.getElementById(e).value.trim();if(!n)return;const s=JSON.parse(localStorage.getItem(t)||"[]"),o=s.indexOf(n);o!==-1&&s.splice(o,1),s.unshift(n),s.length>10&&s.pop(),localStorage.setItem(t,JSON.stringify(s))}const me="ruidai_custom_presets";let w=T(me,[]);function D(){const e=document.getElementById("userPresets");e.innerHTML="",w.forEach((t,n)=>{Ze(t,n,e)})}function Ze(e,t,n){const s=document.createElement("button");s.type="button",s.className="preset-btn",s.dataset.preset=e,s.innerHTML=`${e} <span class="remove-tag" data-index="${t}" title="削除">×</span>`,s.addEventListener("click",o=>{o.target.classList.contains("remove-tag")||s.classList.toggle("active")}),s.querySelector(".remove-tag").addEventListener("click",o=>{o.stopPropagation(),Xe(t)}),n.appendChild(s)}function se(){const e=document.getElementById("newPresetInput"),t=e.value.trim();if(t){if(w.includes(t)){alert("このタグは既に追加されています");return}w.push(t),he(),D(),e.value=""}}function Xe(e){confirm("このタグを削除しますか？")&&(w.splice(e,1),he(),D())}function he(){localStorage.setItem(me,JSON.stringify(w))}function Qe(){document.getElementById("defaultPresets").querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{t.classList.toggle("active")})}),a.printProblemBtn.addEventListener("click",()=>R("problem")),a.printSolutionBtn.addEventListener("click",()=>R("solution")),a.printFullBtn.addEventListener("click",()=>R("full")),a.printInstructorBtn.addEventListener("click",()=>R("instructor"))}function L(e){if(e.length===0)return;const t=Array.from(e).filter(s=>s.type.startsWith("image/"));if(t.length===0){alert("画像ファイルを選択してください");return}let n=0;t.forEach(s=>{const o=new FileReader;o.onload=i=>{b.push(i.target.result),n++,n===t.length&&(ge(),$(),a.fileInput.value="")},o.readAsDataURL(s)})}function $(){const e=a.previewArea;if(e.innerHTML="",b.length===0){e.classList.add("hidden"),a.uploadBtn.textContent="画像を選択",a.generateBtn.disabled=!0;return}e.classList.remove("hidden"),a.uploadBtn.textContent="さらにページを追加",a.generateBtn.disabled=!1,b.forEach((i,r)=>{const l=document.createElement("img");l.src=i,l.alt=`Page ${r+1}`,l.addEventListener("click",()=>{const f=document.getElementById("imageModal"),p=document.getElementById("modalImage");p.src=i,f.classList.add("active")});const c=document.createElement("div");c.className="preview-item",c.innerHTML=`
      <span class="page-number">P.${r+1}</span>
      <button class="remove-btn" data-index="${r}" title="削除">×</button>
    `,c.insertBefore(l,c.firstChild),c.querySelector(".remove-btn").addEventListener("click",f=>{f.stopPropagation(),et(r)}),e.appendChild(c)});const t=document.getElementById("imageModal"),n=t.querySelector(".close-modal"),s=n.cloneNode(!0);n.parentNode.replaceChild(s,n);const o=()=>{t.classList.remove("active"),setTimeout(()=>{const i=document.getElementById("modalImage");i&&(i.src="")},300)};s.addEventListener("click",o),t.onclick=i=>{i.target===t&&o()}}function et(e){confirm(`P.${e+1} を削除しますか？`)&&(b.splice(e,1),ge(),$())}async function tt(){if(!_){B();return}ie(!0);try{const e=new Ye(_.trim()),t=a.modelSelect.value,n=e.getGenerativeModel({model:t}),s=b.map(d=>({inlineData:{data:d.split(",")[1],mimeType:"image/jpeg"}})),o=a.questionCount.value,i=Array.from(document.querySelectorAll(".preset-btn.active")).map(d=>d.dataset.preset).join(`
`),r=a.customInstructions.value,l=`${i}
${r}`.trim();oe("studentName","ruidai_student_names"),oe("instructorName","ruidai_instructor_names");const c=`
# System Role
You are an expert tutor preparing supplementary materials.

# Task
Create ${o} similar problems based on the provided image.
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
${l}

# HTML Structure
The output HTML must contain exactly three main sections within the body:

1. \`<div class="problems">...</div>\`
   - Contains the ${o} problems.
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
`,u=(await(await n.generateContent([c,...s])).response).text().replace(/```html|```/g,"");a.resultContent.innerHTML=u,a.resultSection.classList.remove("hidden"),a.resultSection.scrollIntoView({behavior:"smooth"})}catch(e){console.error(e),alert(`エラーが発生しました: ${e.message}`)}finally{ie(!1)}}function k(){const e=a.modelSelect.options[a.modelSelect.selectedIndex].text,t=a.generateBtn.querySelector(".btn-text");t.textContent=`類題を作成(${e})`}function ie(e){const t=a.generateBtn,n=t.querySelector(".spinner"),s=t.querySelector(".btn-text"),o=a.progressContainer;e?(t.disabled=!0,n.classList.remove("hidden"),s.textContent="作成中...",o.classList.remove("hidden")):(t.disabled=!1,n.classList.add("hidden"),k(),o.classList.add("hidden"))}function R(e){const t=a.resultContent.innerHTML,n=window.open("","_blank"),s=a.printDate.value||"",o=a.studentName.value||"",i=a.instructorName.value||"";let r="";if(s){const d=new Date(s);r=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`}const l=`
    <div class="print-header">
      <div class="header-left">
        ${r?`<span class="date">${r}</span>`:""}
        <div class="names">
            ${o?`<span class="student">生徒: ${o}</span>`:""}
            ${i?`<span class="instructor">講師: ${i}</span>`:""}
        </div>
      </div>
      
      <div class="header-right">
        <div class="score-box">
             <div class="score-item">目標時間<div class="score-line"></div>分</div>
             <div class="score-item">得点<div class="score-line"></div>/100</div>
        </div>
      </div>
    </div>
  `;let c="",f="";const p=`
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
  `,h=`
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.9em; text-align: center; }
    .num { border-bottom: 1px solid black; padding: 0 2px; display: block; }
    .den { padding: 0 2px; display: block; }
  `,u=`
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.9em; text-align: center; margin: 0 2px; }
    .num { border-bottom: 1px solid #333; padding: 0 2px; display: block; }
    .den { padding: 0 2px; display: block; }

    .sqrt { display: inline-flex; align-items: baseline; margin: 0 2px; }
    .radical { font-size: 1.2em; margin-right: 0px; line-height: 1; }
    .radicand { border-top: 1px solid #333; padding-top: 2px; padding-left: 1px; display: inline-block; line-height: 1.1; }
  `;e==="problem"?(c=`
      ${p}
      
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
      ${u}
    `,f=`
      <script>
      window.onload = function() {
        document.querySelectorAll('.solutions, .instructor-guide').forEach(el => el.remove());
      }
      <\/script>
    `):e==="solution"?(c=`
      ${p}
      
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
      
      ${u}
    `,f=`
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
      <\/script>
    `):e==="instructor"?(c=`
      ${p}
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
      ${u}
    `,f=`
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
      <\/script>
    `):(c=`
      ${p}
      ${u}
      /* In full mode, show everything but structured */
    `,f=""),n.document.write(`
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

          ${h}

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
            ${c}
          }
          ${c}
        </style>
      </head>
      <body>
        <div class="print-controls">
          <button class="print-btn" onclick="window.print()">🖨️ 印刷 / PDF保存</button>
          <button class="close-btn" onclick="window.close()">✕ 閉じる</button>
        </div>
        ${l}
        ${t}
        ${f}
      </body>
    </html>
  `),n.document.close()}document.addEventListener("DOMContentLoaded",()=>{try{ze()}catch(e){console.error("Initialization error:",e),alert("アプリの初期化に失敗しました: "+e.message)}});
