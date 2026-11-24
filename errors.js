// תרגום שגיאות של SQLite להודעות בעברית, עם מספר השורה של הבעיה.
// לא נותנים פתרון: רק מה הבעיה ואיפה היא.

// מבנים מכל מסדי הנתונים שלא קיימים ב-SQLite, ושהמנוע מדווח עליהם כשגיאת תחביר או כשגיאה מטעה
const UNSUPPORTED_CONSTRUCTS = [
  { re: /\bTOP\s*\(?\s*\d/i, name: 'TOP' },
  { re: /\bFETCH\s+(NEXT|FIRST)\b/i, name: 'OFFSET … FETCH' },
  { re: /\b(CROSS|OUTER)\s+APPLY\b/i, name: 'CROSS APPLY / OUTER APPLY' },
  { re: /\bUNPIVOT\b/i, name: 'UNPIVOT' },
  { re: /\bPIVOT\b/i, name: 'PIVOT' },
  { re: /^\s*MERGE\b/im, name: 'MERGE' },
  { re: /\bDECLARE\b/i, name: 'DECLARE' },
  { re: /@@?\w+/, name: '@ (משתנים)' },
  { re: /#\w+/, name: '# (טבלאות זמניות)' },
  { re: /\bINTERVAL\b/i, name: 'INTERVAL' },
  { re: /::\s*\w+/, name: ':: (המרת סוג)' },
  { re: /\bWITHIN\s+GROUP\b/i, name: 'WITHIN GROUP' },
  { re: /\bGROUPING\s+SETS\b/i, name: 'GROUPING SETS' },
  { re: /\bROLLUP\b/i, name: 'ROLLUP' },
  { re: /\bCUBE\b/i, name: 'CUBE' },
  { re: /\bQUALIFY\b/i, name: 'QUALIFY' },
  { re: /\bSELECT\b(?:(?!\bFROM\b)[\s\S])*?\bINTO\b/i, name: 'SELECT … INTO' },
  { re: /\bDELETE\s+\w+\s+FROM\b/i, name: 'DELETE … FROM (מחיקה עם JOIN)' },
  { re: /(^|[^\w'])N'/, name: "N'…' (טקסט עם קידומת N)" },
  { re: /\bLIMIT\s+\d+\s*,\s*\d+\s+OFFSET\b/i, name: 'LIMIT … , … OFFSET' },
  // פונקציות שהמנוע מדווח עליהן בשגיאה מטעה (למשל "no such column: day")
  { re: /\b(DATEADD|DATEDIFF|DATEPART|DATENAME|DATETRUNC|DATE_TRUNC|DATE_PART|DATE_ADD|DATE_SUB|EXTRACT|CONVERT|TRY_CAST|TRY_CONVERT|ISNULL|CAST_AS)\s*\(/i, fn: true },
];

// מחליף טקסט בתוך גרשיים והערות ברווחים, כדי שהחיפוש לא ימצא מילים בתוך מחרוזות. שומר על מיקומי השורות.
function maskSql(sql) {
  return sql
    .replace(/--[^\n]*/g, (m) => ' '.repeat(m.length))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/'(?:[^']|'')*'/g, (m) => "'" + m.slice(1, -1).replace(/[^\n]/g, ' ') + "'");
}

const lineAt = (sql, index) => sql.slice(0, index).split('\n').length;

// מוצא את השורה הראשונה שבה מופיעה מילה (כמילה שלמה), בלי להתחשב באותיות גדולות וקטנות
function findLine(masked, word) {
  if (!word) return null;
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp(`(^|[^\\w])${esc}(?![\\w])`, 'i').exec(masked);
  return m ? lineAt(masked, m.index + m[1].length) : null;
}

const withLine = (text, line) => (line ? `${text} (שורה ${line})` : text);

// מוצא את השורה של שגיאת תחביר: עובר על כל מופעי המילה, ובודק עם המנוע (probe) איזה מופע הוא זה שבו השאילתה נשברת.
// עד המופע הנכון הקוד עדיין תקין (רק לא גמור), וכשחותכים אחרי המופע הנכון מתקבלת אותה שגיאה בדיוק.
function findSyntaxLine(sql, masked, word, rawMessage, probe) {
  if (!probe) return findLine(masked, word);
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(/^\w/.test(word) ? `(^|[^\\w])(${esc})(?![\\w])` : `()(${esc})`, 'gi');
  let m;
  while ((m = re.exec(masked))) {
    const end = m.index + m[1].length + m[2].length;
    if (probe(sql.slice(0, end)) === rawMessage) return lineAt(masked, m.index + m[1].length);
    if (re.lastIndex === m.index) re.lastIndex++;
  }
  return findLine(masked, word);
}

// מחזיר { msg, line } בעברית. probe(sql) מחזיר את הודעת השגיאה של קימפול השאילתה, או null
function explainError(sql, rawMessage, probe) {
  const masked = maskSql(sql);
  const raw = String(rawMessage || '');

  // 1. מבנה או פונקציה שלא קיימים ב-SQLite (זוהו לפי הטקסט)
  for (const c of UNSUPPORTED_CONSTRUCTS) {
    const target = c.re.source.includes("N'") ? sql : masked;
    const m = c.re.exec(target);
    if (!m) continue;
    const line = lineAt(target, m.index + (c.name && c.name.startsWith("N'") ? m[1].length : 0));
    if (c.fn) return { msg: withLine(`הפונקציה ${m[1].toUpperCase()} לא נתמכת ב-SQLite`, line), line };
    return { msg: withLine(`התחביר ${c.name} לא נתמך ב-SQLite`, line), line };
  }

  // 2. פונקציה שלא קיימת ב-SQLite (המנוע מדווח עליה ישירות)
  let m = raw.match(/no such function: (\S+)/i);
  if (m) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`הפונקציה ${m[1].toUpperCase()} לא נתמכת ב-SQLite`, line), line };
  }

  // 3. שאר השגיאות: מה הבעיה ואיפה, בלי פתרון
  if ((m = raw.match(/near "([^"]*)": syntax error/i))) {
    const line = findSyntaxLine(sql, masked, m[1], raw, probe);
    return { msg: withLine(`שגיאת תחביר ליד "${m[1]}". בדקו את המבנה של השורה הזו`, line), line };
  }
  if (/incomplete input/i.test(raw)) {
    const line = sql.trimEnd().split('\n').length;
    return { msg: withLine('השאילתה נקטעה באמצע: משהו לא נסגר או חסר בסוף', line), line };
  }
  if ((m = raw.match(/unrecognized token: "([^"]*)"/i))) {
    const line = findLine(sql, m[1].slice(0, 20));
    return { msg: withLine(`תו או סימן לא מוכר: ${m[1]}`, line), line };
  }
  if ((m = raw.match(/no such column: (\S+)/i))) {
    const name = m[1].split('.').pop();
    const line = findLine(masked, name);
    return { msg: withLine(`העמודה ${m[1]} לא קיימת באף אחת מהטבלאות בשאילתה`, line), line };
  }
  if ((m = raw.match(/no such table: (\S+)/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`הטבלה ${m[1]} לא קיימת`, line), line };
  }
  if ((m = raw.match(/ambiguous column name: (\S+)/i))) {
    const name = m[1].split('.').pop();
    const line = findLine(masked, name);
    return { msg: withLine(`שם העמודה ${m[1]} קיים ביותר מטבלה אחת בשאילתה, ולא ברור לאיזו מהן הכוונה`, line), line };
  }
  if ((m = raw.match(/misuse of (?:aggregate|aggregate function) (\w+)\(\)/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`שימוש לא תקין בפונקציית הצבירה ${m[1].toUpperCase()}: בדקו באיזה חלק של השאילתה היא מופיעה`, line), line };
  }
  if ((m = raw.match(/misuse of window function (\w+)\(\)/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`שימוש לא תקין בפונקציית החלון ${m[1].toUpperCase()}: בדקו באיזה חלק של השאילתה היא מופיעה`, line), line };
  }
  if ((m = raw.match(/wrong number of arguments to function (\w+)\(\)/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`מספר הפרמטרים שנשלחו לפונקציה ${m[1].toUpperCase()} לא נכון`, line), line };
  }
  if (/GROUP BY clause is required before HAVING/i.test(raw)) {
    const line = findLine(masked, 'HAVING');
    return { msg: withLine('HAVING מופיע בשאילתה שאין בה קיבוץ', line), line };
  }
  if (/do not have the same number of result columns/i.test(raw)) {
    return { msg: 'לשתי השאילתות שמחוברות יחד יש מספר שונה של עמודות', line: null };
  }
  if ((m = raw.match(/sub-select returns (\d+) columns - expected 1/i))) {
    return { msg: `תת-שאילתה מחזירה ${m[1]} עמודות, אבל במקום הזה מצופה עמודה אחת`, line: null };
  }
  if ((m = raw.match(/(\d+)\w* ORDER BY term out of range/i)) || /ORDER BY term out of range/i.test(raw)) {
    const line = findLine(masked, 'ORDER');
    return { msg: withLine('המספר ב-ORDER BY גדול ממספר העמודות בפלט', line), line };
  }
  if (/aggregate functions are not allowed in the GROUP BY clause/i.test(raw)) {
    const line = findLine(masked, 'GROUP');
    return { msg: withLine('פונקציית צבירה מופיעה בתוך הקיבוץ עצמו', line), line };
  }
  if ((m = raw.match(/no such window: (\w+)/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`החלון ${m[1]} לא הוגדר`, line), line };
  }
  if ((m = raw.match(/table (\w+) already exists/i))) {
    const line = findLine(masked, m[1]);
    return { msg: withLine(`הטבלה ${m[1]} כבר קיימת`, line), line };
  }
  return { msg: `השאילתה נכשלה. הודעת המנוע: ${raw}`, line: null };
}

// מלכודות: קוד שרץ בלי שגיאה ב-SQLite אבל מתנהג אחרת ממסדי נתונים אחרים
function findTraps(sql) {
  const masked = maskSql(sql);
  const traps = [];
  let m = /'\s*\+|\+\s*'/.exec(masked);
  if (m) {
    const line = lineAt(masked, m.index);
    traps.push(withLine('שימו לב: ב-SQLite הסימן + בין טקסטים מבצע חיבור של מספרים, ולא מחבר את הטקסטים', line));
  }
  m = /\bCAST\s*\([^)]*\bAS\s+(DATE|DATETIME|TIMESTAMP)\b/i.exec(masked);
  if (m) {
    const line = lineAt(masked, m.index);
    traps.push(withLine(`שימו לב: ב-SQLite אין סוג ${m[1].toUpperCase()}, ולכן ההמרה מחזירה מספר ולא תאריך`, line));
  }
  return traps;
}
