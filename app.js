// SQL Lab: לוגיקת האפליקציה

const STORE_KEY = 'sqlLab.v1';
const SQLJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';

const $ = (id) => document.getElementById(id);

// ---------- שמירה מקומית ----------
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign({ level: null, currentId: null, solved: {}, code: {}, theme: null }, JSON.parse(raw));
  } catch (e) { /* אין גישה ל-localStorage */ }
  return { level: null, currentId: null, solved: {}, code: {}, theme: null };
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* מתעלמים */ }
}

const state = loadState();
let SQL = null;
let baseDbBytes = null;
let editor = null;
const expectedCache = {};
let lastUserResult = null;
let activeTab = 'user';
let previewTable = null;

// ---------- מנוע SQL ----------
async function initEngine() {
  try {
    // בגרסה המפורסמת קובץ ה-wasm מגיע יחד עם העמוד (window.SQLJS_LOCAL)
    SQL = await initSqlJs({ locateFile: (f) => (window.SQLJS_LOCAL ? 'vendor/' : SQLJS_CDN) + f });
    const db = new SQL.Database();
    db.run(SEED_SQL);
    db.run(SEED_SQL_EXTRA);
    db.run(SEED_SQL_DAILY);
    baseDbBytes = db.export();
    db.close();
    $('runBtn').disabled = false;
    $('runStatus').textContent = 'מוכן';
  } catch (e) {
    $('runStatus').textContent = 'שגיאה בטעינת מנוע ה-SQL. בדקו חיבור לאינטרנט ורעננו.';
    console.error(e);
  }
}

// כל הרצה על עותק נקי של המסד
function runSql(sql) {
  const db = new SQL.Database(baseDbBytes);
  // SQLite לא כולל REGEXP כברירת מחדל: X REGEXP P קורא ל-regexp(P, X)
  db.create_function('regexp', (pattern, value) => (value != null && new RegExp(pattern).test(String(value)) ? 1 : 0));
  try {
    const results = db.exec(sql);
    const last = results.length ? results[results.length - 1] : null;
    return { columns: last ? last.columns : [], values: last ? last.values : [], hasResult: !!last };
  } finally {
    db.close();
  }
}

function getExpected(q) {
  if (!expectedCache[q.id]) expectedCache[q.id] = runSql(q.solution);
  return expectedCache[q.id];
}

// ---------- השוואת פלטים ----------
function normCell(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Math.round(v * 100) / 100 + 0;
  if (typeof v === 'string') {
    const t = v.trim();
    if (/^-?\d+(\.\d+)?$/.test(t)) return Math.round(parseFloat(t) * 100) / 100 + 0;
    return v;
  }
  return String(v);
}
const rowKey = (row) => JSON.stringify(row.map(normCell));

function compareResults(user, expected, ordered) {
  if (!user.hasResult) {
    return { ok: false, msg: 'השאילתה לא החזירה טבלה. ודאו שהפקודה האחרונה היא SELECT.' };
  }
  if (user.columns.length !== expected.columns.length) {
    return { ok: false, msg: `מספר העמודות שונה: בפלט שלך יש ${user.columns.length}, ובפלט הצפוי יש ${expected.columns.length}.` };
  }
  if (user.values.length !== expected.values.length) {
    return { ok: false, msg: `מספר השורות שונה: בפלט שלך יש ${user.values.length}, ובפלט הצפוי יש ${expected.values.length}.` };
  }
  const u = user.values.map(rowKey);
  const e = expected.values.map(rowKey);
  const uSorted = [...u].sort();
  const eSorted = [...e].sort();
  const sameContent = uSorted.every((k, i) => k === eSorted[i]);
  if (!sameContent) {
    return { ok: false, msg: 'מספר השורות והעמודות נכון, אבל חלק מהערכים שונים. השוו מול הלשונית "פלט צפוי". שימו לב גם לסדר העמודות.' };
  }
  if (ordered && !u.every((k, i) => k === e[i])) {
    return { ok: false, msg: 'הערכים נכונים, אבל סדר השורות שונה. בשאלה הזו הסדר חשוב.' };
  }
  return { ok: true };
}

// ---------- עזרי תצוגה ----------
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtCell(v) {
  if (v === null || v === undefined) return '<span class="null">NULL</span>';
  if (typeof v === 'number' && !Number.isInteger(v)) return esc(Math.round(v * 10000) / 10000);
  return esc(v);
}
function tableHtml(res) {
  if (!res.hasResult) return '<p class="muted empty">אין טבלה להצגה.</p>';
  const head = res.columns.map((c) => `<th>${esc(c)}</th>`).join('');
  const body = res.values.map((r) => `<tr>${r.map((v) => `<td>${fmtCell(v)}</td>`).join('')}</tr>`).join('');
  const n = res.values.length;
  return `<div class="result-info">${n} שורות · ${res.columns.length} עמודות</div>
    <table class="result"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// תאריך הוספה: לשאלות היומיות יש שדה added. כל השאלות הראשונות נוספו ב-6.10.2026
const BASE_ADDED = '2026-10-06';
const addedOf = (q) => q.added || BASE_ADDED;
const fmtDate = (d) => d.split('-').reverse().join('.');
// "חדשות" = המנה האחרונה שנוספה לרמה (השאלות היומיות עם התאריך המאוחר ביותר)
const latestBatch = (level) => QUESTIONS.reduce((m, q) => (q.level === level && q.added && q.added > m ? q.added : m), '');
const isNew = (q) => !!q.added && q.added === latestBatch(q.level);

// השאלות החדשות ראשונות, ואחריהן השאר מהחדש לישן (המיון יציב, כך שבאותו תאריך נשמר הסדר המקורי)
const levelQuestions = (level) => QUESTIONS.filter((q) => q.level === level)
  .sort((a, b) => (isNew(b) - isNew(a)) || addedOf(b).localeCompare(addedOf(a)));
const currentQuestion = () => QUESTIONS.find((q) => q.id === state.currentId);
const solvedCount = (level) => levelQuestions(level).filter((q) => state.solved[q.id]).length;

// ---------- מסך רמות ----------
function renderLevels() {
  $('levelGrid').innerHTML = Object.entries(LEVELS).map(([key, lv]) => {
    const total = levelQuestions(key).length;
    const done = solvedCount(key);
    return `<button class="level-card" data-level="${key}">
      <span class="icon">${lv.icon}</span>
      <h3>${lv.name}</h3>
      <p>${esc(lv.desc)}</p>
      <div class="progress"><div class="progress-fill" style="width:${(100 * done) / total}%"></div></div>
      <span class="muted small-text">נפתרו ${done} מתוך ${total}</span>
    </button>`;
  }).join('');
  $('levelGrid').querySelectorAll('.level-card').forEach((el) => {
    el.addEventListener('click', () => chooseLevel(el.dataset.level));
  });
}

function showLevelScreen() {
  renderLevels();
  $('levelScreen').hidden = false;
  $('workspace').hidden = true;
  $('changeLevelBtn').hidden = true;
}

function chooseLevel(level) {
  state.level = level;
  const qs = levelQuestions(level);
  const cur = currentQuestion();
  if (!cur || cur.level !== level) {
    state.currentId = (qs.find((q) => !state.solved[q.id]) || qs[0]).id;
  }
  saveState();
  $('levelScreen').hidden = true;
  $('workspace').hidden = false;
  $('changeLevelBtn').hidden = false;
  openQuestion(state.currentId);
  if (editor) setTimeout(() => editor.refresh(), 0);
}

// ---------- רשימת שאלות ----------
const sourceOf = (q) => q.source || 'מקורי';
const originLabel = (q) => (q.source ? [q.company, q.source].filter(Boolean).join(' · ') : 'שאלה מקורית');

function renderSidebar() {
  const lv = LEVELS[state.level];
  const qs = levelQuestions(state.level);
  const done = solvedCount(state.level);
  $('sideLevelIcon').textContent = lv.icon;
  $('sideLevelName').textContent = 'רמה: ' + lv.name;
  $('sideProgressFill').style.width = `${(100 * done) / qs.length}%`;
  $('sideProgressText').textContent = `נפתרו ${done} מתוך ${qs.length}`;

  const unsolvedOnly = $('unsolvedOnly').checked;
  const src = $('sourceFilter').value;
  const visible = (q) => !(unsolvedOnly && state.solved[q.id] && q.id !== state.currentId) && !(src && !sourceOf(q).includes(src));
  const item = (q, i) => {
    const solved = !!state.solved[q.id];
    const fresh = isNew(q);
    return `<li class="q-item ${solved ? 'solved' : ''} ${fresh ? 'in-new' : ''} ${q.id === state.currentId ? 'active' : ''}" data-id="${q.id}">
      ${fresh ? '<span class="new-tag">חדש</span>' : ''}
      <span class="q-num">${solved ? '✓' : i + 1}</span>
      <div class="q-item-text">
        <div class="q-item-title">${esc(q.title)}</div>
        <div class="q-item-topic">${esc(originLabel(q))}${fresh && solved ? ' · בוצע' : ''}</div>
      </div>
      ${fresh ? '' : `<span class="q-date">${fmtDate(addedOf(q))}</span>`}
    </li>`;
  };
  const newItems = qs.map((q, i) => (isNew(q) && visible(q) ? item(q, i) : '')).join('');
  const restItems = qs.map((q, i) => (!isNew(q) && visible(q) ? item(q, i) : '')).join('');
  const batch = latestBatch(state.level);
  $('qList').innerHTML =
    (newItems ? `<li class="new-box"><div class="new-box-head">שאלות חדשות · ${fmtDate(batch)}</div><ol class="new-box-list">${newItems}</ol></li>` : '') +
    (restItems ? (newItems ? '<li class="q-section">שאר השאלות</li>' : '') + restItems : '') ||
    '<li class="muted small-text" style="padding:12px">אין שאלות שמתאימות לסינון.</li>';
  $('qList').querySelectorAll('.q-item').forEach((el) => {
    el.addEventListener('click', () => openQuestion(el.dataset.id));
  });
}

// ---------- שאלה ----------
function openQuestion(id) {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) return;
  state.currentId = id;
  saveState();

  $('qLevel').textContent = LEVELS[q.level].name;
  $('qDone').hidden = !state.solved[q.id];
  $('qNew').hidden = !isNew(q);
  $('qOrigin').textContent = originLabel(q);
  $('solutionRef').textContent = q.ref ? `שם השאלה במקור (${q.source}): ${q.ref}` : '';
  if (q.url && /^https:\/\//.test(q.url)) {
    const a = document.createElement('a');
    a.href = q.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = ' · לשאלה במקור';
    $('solutionRef').appendChild(a);
  }
  $('solutionRef').hidden = !q.ref;
  $('qTitle').textContent = q.title;
  $('qPrompt').textContent = q.prompt;
  $('qTables').innerHTML = q.tables.map((t) => `<button class="table-chip" data-table="${t}">${t}</button>`).join('');
  $('qTables').querySelectorAll('.table-chip').forEach((el) => {
    el.addEventListener('click', () => showPreview(el.dataset.table));
  });
  $('solutionBox').hidden = true;
  $('solutionCode').textContent = q.solution;
  $('feedback').hidden = true;

  editor.setValue(state.code[q.id] || '');
  editor.clearHistory();
  lastUserResult = null;
  previewTable = null;
  $('previewTab').hidden = true;
  setTab('user');
  renderSidebar();
  document.querySelector('.main').scrollTop = 0;
}

function nextQuestionId() {
  const qs = levelQuestions(state.level);
  const idx = qs.findIndex((q) => q.id === state.currentId);
  const after = qs.slice(idx + 1).concat(qs.slice(0, idx));
  const next = after.find((q) => !state.solved[q.id]) || qs[idx + 1];
  return next ? next.id : null;
}

// ---------- הרצה ----------
function run() {
  if (!SQL) return;
  const q = currentQuestion();
  const sql = editor.getValue().trim();
  if (!sql) {
    showFeedback(false, 'העורך ריק. כתבו שאילתה ואז לחצו על "הרץ".');
    return;
  }
  const t0 = performance.now();
  let res;
  try {
    res = runSql(sql);
  } catch (e) {
    lastUserResult = null;
    showFeedback(false, 'שגיאת SQL:', e.message);
    setTab('user');
    $('runStatus').textContent = '';
    return;
  }
  $('runStatus').textContent = `רץ ב-${Math.round(performance.now() - t0)}ms`;
  lastUserResult = res;
  const cmp = compareResults(res, getExpected(q), q.ordered);
  if (cmp.ok) {
    const firstTime = !state.solved[q.id];
    state.solved[q.id] = true;
    saveState();
    $('qDone').hidden = false;
    renderSidebar();
    showFeedback(true, firstTime ? 'מעולה! הפלט זהה לפלט הצפוי. השאלה סומנה כבוצעה.' : 'נכון! הפלט זהה לפלט הצפוי.');
  } else {
    showFeedback(false, cmp.msg);
  }
  setTab('user');
}

function showFeedback(ok, msg, detail) {
  const fb = $('feedback');
  fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
  let html = `<span class="msg">${ok ? '✓ ' : '✗ '}${esc(msg)}</span>`;
  if (ok) {
    const next = nextQuestionId();
    if (next) html += '<button class="btn success small" id="nextBtn">לשאלה הבאה ←</button>';
  }
  if (detail) html += `<pre>${esc(detail)}</pre>`;
  fb.innerHTML = html;
  fb.hidden = false;
  const nb = $('nextBtn');
  if (nb) nb.addEventListener('click', () => openQuestion(nextQuestionId()));
}

// ---------- לשוניות פלט ----------
function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach((el) => el.classList.toggle('active', el.dataset.tab === tab));
  const body = $('tabBody');
  if (tab === 'user') {
    body.innerHTML = lastUserResult ? tableHtml(lastUserResult) : '<p class="muted empty">הריצו שאילתה כדי לראות כאן את הפלט.</p>';
  } else if (tab === 'expected') {
    if (!SQL) { body.innerHTML = '<p class="muted empty">המנוע עדיין נטען...</p>'; return; }
    body.innerHTML = tableHtml(getExpected(currentQuestion()));
  } else if (tab === 'preview' && previewTable) {
    const info = SCHEMA_INFO[previewTable];
    const colRows = runSql(`PRAGMA table_info(${previewTable})`).values;
    const cols = colRows.map((r) => `<b>${esc(r[1])}</b> ${esc(r[2])}`).join(' · ');
    body.innerHTML = (info ? `<div class="muted small-text">${esc(info.desc)}</div>` : '') +
      `<div class="schema-cols">${cols}</div>` + tableHtml(runSql(`SELECT * FROM ${previewTable}`));
  }
}

function showPreview(table) {
  if (!SQL) return;
  previewTable = table;
  const tab = $('previewTab');
  tab.textContent = 'טבלה: ' + table;
  tab.hidden = false;
  setTab('preview');
}

// ---------- ערכת נושא ----------
function applyTheme() {
  if (state.theme) document.documentElement.setAttribute('data-theme', state.theme);
  else document.documentElement.removeAttribute('data-theme');
}
function toggleTheme() {
  const isDark = state.theme ? state.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  state.theme = isDark ? 'light' : 'dark';
  saveState();
  applyTheme();
}

// ---------- בדיקה עצמית (לפיתוח): window.selfTest() ----------
window.selfTest = function () {
  return QUESTIONS.map((q) => {
    try {
      const r = runSql(q.solution);
      const cmp = compareResults(r, r, q.ordered);
      return { id: q.id, rows: r.values.length, ok: cmp.ok && r.values.length > 0 };
    } catch (e) {
      return { id: q.id, ok: false, error: e.message };
    }
  });
};

// ---------- אתחול ----------
function init() {
  applyTheme();
  editor = CodeMirror.fromTextArea($('editor'), {
    mode: 'text/x-sqlite',
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    direction: 'ltr',
    extraKeys: { 'Ctrl-Enter': run, 'Cmd-Enter': run },
  });
  let saveTimer = null;
  editor.on('change', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      if (!state.currentId) return;
      state.code[state.currentId] = editor.getValue();
      saveState();
    }, 400);
  });

  $('runBtn').addEventListener('click', run);
  $('clearBtn').addEventListener('click', () => { editor.setValue(''); editor.focus(); });
  $('solutionBtn').addEventListener('click', () => { $('solutionBox').hidden = !$('solutionBox').hidden; });
  $('useSolutionBtn').addEventListener('click', () => { editor.setValue(currentQuestion().solution); editor.focus(); });
  $('changeLevelBtn').addEventListener('click', showLevelScreen);
  $('brandBtn').addEventListener('click', showLevelScreen);
  $('themeBtn').addEventListener('click', toggleTheme);
  $('unsolvedOnly').addEventListener('change', renderSidebar);
  $('sourceFilter').addEventListener('change', renderSidebar);
  document.querySelectorAll('.tab').forEach((el) => el.addEventListener('click', () => setTab(el.dataset.tab)));
  // אישור בתוך העמוד: לחיצה ראשונה מבקשת אישור, לחיצה שנייה תוך 4 שניות מוחקת
  let resetArmed = null;
  $('resetBtn').addEventListener('click', () => {
    const btn = $('resetBtn');
    if (!resetArmed) {
      btn.textContent = 'לחצו שוב כדי למחוק את כל ההתקדמות והקוד';
      resetArmed = setTimeout(() => { resetArmed = null; btn.textContent = 'איפוס כל ההתקדמות'; }, 4000);
      return;
    }
    clearTimeout(resetArmed);
    resetArmed = null;
    state.solved = {};
    state.code = {};
    state.currentId = null;
    saveState();
    renderLevels();
    btn.textContent = 'ההתקדמות אופסה';
    setTimeout(() => { btn.textContent = 'איפוס כל ההתקדמות'; }, 2500);
  });

  if (state.level && LEVELS[state.level]) chooseLevel(state.level);
  else showLevelScreen();

  initEngine();
}

init();
