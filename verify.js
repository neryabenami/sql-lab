// בדיקה של כל השאלות בלי דפדפן: node verify.js
// בודק שכל פתרון רץ, מחזיר לפחות שורה אחת, שאין מזהים כפולים ושכל טבלה שמוזכרת קיימת.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const ctx = { console };
vm.createContext(ctx);
for (const f of ['data.js', 'data_extra.js', 'data_daily.js', 'questions.js', 'questions_extra.js', 'questions_daily.js']) {
  // const ברמה העליונה לא נחשף להקשר, לכן ממירים ל-var
  const src = fs.readFileSync(path.join(root, f), 'utf8').replace(/^const /gm, 'var ');
  vm.runInContext(src, ctx, { filename: f });
}

const initSqlJs = require(path.join(root, 'vendor', 'sql-wasm.js'));

initSqlJs({ locateFile: (f) => path.join(root, 'vendor', f) }).then((SQL) => {
  const base = new SQL.Database();
  base.run(ctx.SEED_SQL);
  base.run(ctx.SEED_SQL_EXTRA);
  base.run(ctx.SEED_SQL_DAILY);
  const bytes = base.export();
  const tables = new Set(base.exec("SELECT name FROM sqlite_master WHERE type='table'")[0].values.map((r) => r[0]));

  const errors = [];
  const ids = new Set();
  const counts = {};
  for (const q of ctx.QUESTIONS) {
    counts[q.level] = (counts[q.level] || 0) + 1;
    if (ids.has(q.id)) errors.push(`${q.id}: מזהה כפול`);
    ids.add(q.id);
    for (const t of q.tables) if (!tables.has(t)) errors.push(`${q.id}: הטבלה ${t} לא קיימת`);
    const db = new SQL.Database(bytes);
    db.create_function('regexp', (p, v) => (v != null && new RegExp(p).test(String(v)) ? 1 : 0));
    try {
      const res = db.exec(q.solution);
      const last = res[res.length - 1];
      if (!last || last.values.length === 0) errors.push(`${q.id}: הפתרון לא מחזיר שורות`);
    } catch (e) {
      errors.push(`${q.id}: שגיאה בפתרון: ${e.message}`);
    }
    db.close();
  }
  console.log(`סה"כ שאלות: ${ctx.QUESTIONS.length}`, counts);
  if (errors.length) {
    console.log('נמצאו בעיות:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log('כל השאלות תקינות');
});
