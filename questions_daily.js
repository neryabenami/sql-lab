// שאלות שנוספות כל יום על ידי המשימה המתוזמנת (5 לכל רמה).
// מזהה: d<YYYYMMDD>_<b|i|a><1-5>, למשל d20261009_b1. השדה added הוא תאריך ההוספה.

const QUESTIONS_DAILY = [
  // ===== 2026-10-10 =====
  {
    id: 'd20261010_b1', level: 'basic', added: '2026-10-10', source: 'datadriven.io', company: 'Lyft',
    ref: 'Driver rides: total rides, average cost and rides over $20', url: 'https://datadriven.io/companies/lyft/interview',
    title: 'סיכום נסיעות לכל נהג', tables: ['d1010_rides'],
    prompt: 'בטבלה d1010_rides יש נסיעות של שירות הסעות. התייחסו רק לנסיעות שהסתיימו (status = \'completed\'). לכל נהג החזירו: driver_id, מספר הנסיעות שלו (total_rides), מחיר הנסיעה הממוצע מעוגן לשתי ספרות אחרי הנקודה (avg_fare), ומספר הנסיעות שמחירן גבוה מ-20 (rides_over_20).',
    solution: `SELECT driver_id, COUNT(*) AS total_rides, ROUND(AVG(fare), 2) AS avg_fare, SUM(fare > 20) AS rides_over_20
FROM d1010_rides
WHERE status = 'completed'
GROUP BY driver_id;`,
    ordered: false,
  },
  {
    id: 'd20261010_b2', level: 'basic', added: '2026-10-10', source: 'DataLemur', company: 'Lyft',
    ref: 'Average Lyft Driver Rating Per Month', url: 'https://datalemur.com/blog/lyft-sql-interview-questions',
    title: 'דירוג ממוצע לפי חודש', tables: ['d1010_rides'],
    prompt: 'בטבלה d1010_rides, התייחסו לנסיעות שהסתיימו (status = \'completed\') ושקיבלו דירוג (rating אינו NULL) בלבד. לכל חודש (בפורמט YYYY-MM, העמודה month) החזירו את הדירוג הממוצע של הנסיעות מעוגן לשתי ספרות (avg_rating) ואת מספר הנסיעות המדורגות (rated_rides). מיינו לפי החודש בסדר עולה.',
    solution: `SELECT strftime('%Y-%m', ride_date) AS month, ROUND(AVG(rating), 2) AS avg_rating, COUNT(*) AS rated_rides
FROM d1010_rides
WHERE status = 'completed' AND rating IS NOT NULL
GROUP BY strftime('%Y-%m', ride_date)
ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261010_b3', level: 'basic', added: '2026-10-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'אחוז ביטולים לפי עיר', tables: ['d1010_rides'],
    prompt: 'בטבלה d1010_rides, לכל עיר (city) שיש בה לפחות 12 נסיעות בסך הכול (בכל סטטוס), החזירו: city, מספר הנסיעות הכולל (total_rides) ואחוז הנסיעות שבוטלו (status = \'cancelled\') מתוך כלל הנסיעות בעיר, מעוגן לשתי ספרות אחרי הנקודה (cancel_pct).',
    solution: `SELECT city, COUNT(*) AS total_rides, ROUND(100.0 * SUM(status = 'cancelled') / COUNT(*), 2) AS cancel_pct
FROM d1010_rides
GROUP BY city
HAVING COUNT(*) >= 12;`,
    ordered: false,
  },
  {
    id: 'd20261010_b4', level: 'basic', added: '2026-10-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משחקים פופולריים וציון שיא', tables: ['d1010_scores'],
    prompt: 'בטבלה d1010_scores מתועדים ציונים של שחקנים במשחקים. עבור כל משחק ששיחקו בו לפחות 3 שחקנים שונים, החזירו: game, מספר השחקנים השונים (players), הציון הגבוה ביותר (best_score) והציון הממוצע מעוגן לשתי ספרות (avg_score).',
    solution: `SELECT game, COUNT(DISTINCT player) AS players, MAX(score) AS best_score, ROUND(AVG(score), 2) AS avg_score
FROM d1010_scores
GROUP BY game
HAVING COUNT(DISTINCT player) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261010_b5', level: 'basic', added: '2026-10-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מנויים פעילים ומבוטלים לפי תוכנית', tables: ['d1010_subs'],
    prompt: 'בטבלה d1010_subs מנוי נחשב פעיל כשאין לו תאריך ביטול (canceled_on הוא NULL). לכל תוכנית (plan) החזירו: plan, מספר המנויים הפעילים (active_subs), מספר המנויים שבוטלו (canceled_subs) וסך ה-mrr של המנויים הפעילים (active_mrr). תוכנית שאין בה מנויים פעילים צריכה להופיע עם 0.',
    solution: `SELECT plan,
  SUM(canceled_on IS NULL) AS active_subs,
  SUM(canceled_on IS NOT NULL) AS canceled_subs,
  COALESCE(SUM(CASE WHEN canceled_on IS NULL THEN mrr END), 0) AS active_mrr
FROM d1010_subs
GROUP BY plan;`,
    ordered: false,
  },
  {
    id: 'd20261010_i1', level: 'intermediate', added: '2026-10-10', source: 'LeetCode', company: '',
    ref: 'Tree Node', url: 'https://leetcode.com/problems/tree-node/',
    title: 'סיווג צמתים בעץ', tables: ['d1010_tree'],
    prompt: 'בטבלה d1010_tree כל שורה היא צומת בעץ: id הוא מזהה הצומת ו-p_id הוא מזהה האב שלו (NULL אצל השורש). סווגו כל צומת: \'Root\' אם אין לו אב, \'Leaf\' אם אין לו אף בן, ו-\'Inner\' בכל מקרה אחר. החזירו את העמודות id ו-type.',
    solution: `SELECT id,
  CASE
    WHEN p_id IS NULL THEN 'Root'
    WHEN id IN (SELECT p_id FROM d1010_tree WHERE p_id IS NOT NULL) THEN 'Inner'
    ELSE 'Leaf'
  END AS type
FROM d1010_tree;`,
    ordered: false,
  },
  {
    id: 'd20261010_i2', level: 'intermediate', added: '2026-10-10', source: 'DataLemur', company: 'Lyft',
    ref: 'Identify VIP Riders', url: 'https://datalemur.com/blog/lyft-sql-interview-questions',
    title: 'נוסעי VIP', tables: ['d1010_rides'],
    prompt: 'נוסע (rider_id) הוא VIP אם בין 2026-04-01 ל-2026-09-30 (כולל) הוא ביצע לפחות 4 נסיעות שהסתיימו (status = \'completed\') וסכום המחירים של הנסיעות האלה הוא לפחות 100. החזירו rider_id, מספר הנסיעות (rides) וסכום המחירים (total_fare) של נוסעי ה-VIP.',
    solution: `SELECT rider_id, COUNT(*) AS rides, SUM(fare) AS total_fare
FROM d1010_rides
WHERE status = 'completed' AND ride_date BETWEEN '2026-04-01' AND '2026-09-30'
GROUP BY rider_id
HAVING COUNT(*) >= 4 AND SUM(fare) >= 100;`,
    ordered: false,
  },
  {
    id: 'd20261010_i3', level: 'intermediate', added: '2026-10-10', source: 'Interview Query', company: 'DoorDash',
    ref: 'Last transaction of each day', url: 'https://www.interviewquery.com/interview-guides/Doordash-Data-Analyst',
    title: 'התנועה האחרונה בכל יום', tables: ['d1010_bank_tx'],
    prompt: 'בטבלה d1010_bank_tx יש תנועות בחשבון בנק עם חותמת זמן (tx_ts). לכל יום קלנדרי החזירו את התנועה האחרונה שהתבצעה באותו יום: tx_id, tx_ts ו-amount. מיינו לפי tx_ts בסדר עולה.',
    solution: `SELECT tx_id, tx_ts, amount
FROM d1010_bank_tx t
WHERE tx_ts = (SELECT MAX(tx_ts) FROM d1010_bank_tx WHERE date(tx_ts) = date(t.tx_ts))
ORDER BY tx_ts;`,
    ordered: true,
  },
  {
    id: 'd20261010_i4', level: 'intermediate', added: '2026-10-10', source: 'StrataScratch', company: 'Lyft',
    ref: 'Lyft Data Scientist Interview Question Walkthrough (driver churn rate)', url: 'https://www.stratascratch.com/blog/lyft-data-scientist-interview-question-walkthrough',
    title: 'נשירה מוקדמת של נהגים', tables: ['d1010_drivers'],
    prompt: 'בטבלה d1010_drivers מופיע תאריך ההצטרפות של כל נהג (start_date) ותאריך העזיבה (end_date, NULL אם עדיין פעיל). נהג נחשב כנושר מוקדם אם עזב לכל היותר 90 יום אחרי תאריך ההצטרפות (כולל היום ה-90). לכל אזור (region) החזירו: region, מספר הנהגים (drivers), מספר הנושרים המוקדמים (early_churned) ואחוז הנושרים המוקדמים מכלל נהגי האזור, מעוגן לשתי ספרות (churn_pct). מיינו לפי churn_pct מהגבוה לנמוך, ובשוויון לפי region בסדר אלפביתי.',
    solution: `SELECT region, COUNT(*) AS drivers,
  SUM(end_date IS NOT NULL AND end_date <= date(start_date, '+90 days')) AS early_churned,
  ROUND(100.0 * SUM(end_date IS NOT NULL AND end_date <= date(start_date, '+90 days')) / COUNT(*), 2) AS churn_pct
FROM d1010_drivers
GROUP BY region
ORDER BY churn_pct DESC, region;`,
    ordered: true,
  },
  {
    id: 'd20261010_i5', level: 'intermediate', added: '2026-10-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נוסעים שנעלמו בספטמבר', tables: ['d1010_rides'],
    prompt: 'החזירו את ה-rider_id של הנוסעים שביצעו לפחות נסיעה אחת שהסתיימה (status = \'completed\') באוגוסט 2026, ולא ביצעו אף נסיעה שהסתיימה בספטמבר 2026. כל נוסע יופיע פעם אחת.',
    solution: `SELECT DISTINCT rider_id
FROM d1010_rides
WHERE status = 'completed' AND ride_date >= '2026-08-01' AND ride_date < '2026-09-01'
  AND rider_id NOT IN (
    SELECT rider_id FROM d1010_rides
    WHERE status = 'completed' AND ride_date >= '2026-09-01' AND ride_date < '2026-10-01'
  );`,
    ordered: false,
  },
  {
    id: 'd20261010_a1', level: 'advanced', added: '2026-10-10', source: 'LeetCode', company: '',
    ref: 'Trips and Users', url: 'https://leetcode.com/problems/trips-and-users/',
    title: 'שיעור ביטולים יומי', tables: ['d1010_trips', 'd1010_trip_users'],
    prompt: 'בטבלה d1010_trips כל שורה היא בקשת נסיעה, ובטבלה d1010_trip_users פרטי המשתמשים (הלקוח והנהג). התייחסו רק לבקשות שבהן גם הלקוח וגם הנהג אינם חסומים (banned = \'No\'). לכל יום בין 2026-09-01 ל-2026-09-03 (כולל) שיש בו לפחות בקשה אחת כזו, החזירו: request_at ושיעור הביטולים (cancellation_rate), שהוא מספר הבקשות שבוטלו (כל סטטוס שאינו completed) חלקי מספר הבקשות באותו יום, מעוגן לשתי ספרות אחרי הנקודה.',
    solution: `SELECT t.request_at, ROUND(1.0 * SUM(t.status <> 'completed') / COUNT(*), 2) AS cancellation_rate
FROM d1010_trips t
JOIN d1010_trip_users c ON c.user_id = t.client_id AND c.banned = 'No'
JOIN d1010_trip_users d ON d.user_id = t.driver_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2026-09-01' AND '2026-09-03'
GROUP BY t.request_at;`,
    ordered: false,
  },
  {
    id: 'd20261010_a2', level: 'advanced', added: '2026-10-10', source: 'LeetCode', company: '',
    ref: 'Human Traffic of Stadium', url: 'https://leetcode.com/problems/human-traffic-of-stadium/',
    title: 'עומס באצטדיון', tables: ['d1010_stadium'],
    prompt: 'בטבלה d1010_stadium יש ביקורים יומיים באצטדיון, ומזהי ה-id עולים ברצף. החזירו את כל השורות ששייכות לרצף של שלושה מזהי id עוקבים או יותר, שבכל אחת מהשורות בו people הוא לפחות 100. החזירו id, visit_date ו-people, ממוינים לפי visit_date בסדר עולה.',
    solution: `WITH big AS (
  SELECT *, id - ROW_NUMBER() OVER (ORDER BY id) AS grp
  FROM d1010_stadium
  WHERE people >= 100
)
SELECT id, visit_date, people
FROM big
WHERE grp IN (SELECT grp FROM big GROUP BY grp HAVING COUNT(*) >= 3)
ORDER BY visit_date;`,
    ordered: true,
  },
  {
    id: 'd20261010_a3', level: 'advanced', added: '2026-10-10', source: 'Dataford', company: 'Lyft',
    ref: 'Find the top 3 drivers by revenue in each region for the last month', url: 'https://dataford.io/interview-guides/lyft/data-engineer',
    title: 'שלושת הנהגים המובילים בכל אזור', tables: ['d1010_rides'],
    prompt: 'בטבלה d1010_rides, חשבו לכל נהג את סך ההכנסה (סכום המחירים של נסיעות שהסתיימו, status = \'completed\') בספטמבר 2026. בתוך כל אזור (region) דרגו את הנהגים מההכנסה הגבוהה לנמוכה כך שנהגים עם הכנסה זהה מקבלים אותו דירוג והדירוג הבא אחריהם הוא המספר העוקב (למשל 1, 2, 3, 3, 4). החזירו את כל הנהגים שהדירוג שלהם הוא 3 או פחות: region, driver_id, revenue ו-revenue_rank.',
    solution: `WITH rev AS (
  SELECT region, driver_id, SUM(fare) AS revenue
  FROM d1010_rides
  WHERE status = 'completed' AND ride_date >= '2026-09-01' AND ride_date < '2026-10-01'
  GROUP BY region, driver_id
), ranked AS (
  SELECT *, DENSE_RANK() OVER (PARTITION BY region ORDER BY revenue DESC) AS revenue_rank
  FROM rev
)
SELECT region, driver_id, revenue, revenue_rank
FROM ranked
WHERE revenue_rank <= 3;`,
    ordered: false,
  },
  {
    id: 'd20261010_a4', level: 'advanced', added: '2026-10-10', source: 'HackerRank', company: '',
    ref: 'Occupations', url: 'https://www.hackerrank.com/challenges/occupations/problem',
    title: 'שמות לפי מקצוע בארבע עמודות', tables: ['d1010_people'],
    prompt: 'בטבלה d1010_people יש שמות ומקצועות. החזירו טבלה בת ארבע עמודות לפי הסדר Doctor, Professor, Singer, Actor, שבה כל עמודה מכילה את שמות בעלי המקצוע הזה ממוינים אלפביתית, שם אחד בכל שורה, והשורה ה-n מכילה את השם ה-n של כל מקצוע. אם לאחד המקצועות יש פחות שמות משורות אחרות, יוצג NULL בשורות החסרות. מיינו את התוצאה כך ששורה 1 היא השמות הראשונים בכל עמודה, וכן הלאה.',
    solution: `WITH r AS (
  SELECT name, occupation, ROW_NUMBER() OVER (PARTITION BY occupation ORDER BY name) AS rn
  FROM d1010_people
)
SELECT
  MAX(CASE WHEN occupation = 'Doctor' THEN name END) AS Doctor,
  MAX(CASE WHEN occupation = 'Professor' THEN name END) AS Professor,
  MAX(CASE WHEN occupation = 'Singer' THEN name END) AS Singer,
  MAX(CASE WHEN occupation = 'Actor' THEN name END) AS Actor
FROM r
GROUP BY rn
ORDER BY rn;`,
    ordered: true,
  },
  {
    id: 'd20261010_a5', level: 'advanced', added: '2026-10-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'רצף ימי עבודה ארוך ביותר', tables: ['d1010_rides'],
    prompt: 'בטבלה d1010_rides, יום נחשב יום עבודה של נהג אם ביצע בו לפחות נסיעה אחת שהסתיימה (status = \'completed\'). לכל נהג שיש לו לפחות יום עבודה אחד, מצאו את אורך הרצף הארוך ביותר של ימי עבודה רצופים בלוח השנה (בלי ימים חסרים באמצע). החזירו driver_id ו-longest_streak.',
    solution: `WITH days AS (
  SELECT DISTINCT driver_id, ride_date AS d
  FROM d1010_rides
  WHERE status = 'completed'
), g AS (
  SELECT driver_id, d, julianday(d) - ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY d) AS grp
  FROM days
), s AS (
  SELECT driver_id, COUNT(*) AS len
  FROM g
  GROUP BY driver_id, grp
)
SELECT driver_id, MAX(len) AS longest_streak
FROM s
GROUP BY driver_id;`,
    ordered: false,
  },
];

QUESTIONS.push(...QUESTIONS_DAILY);
