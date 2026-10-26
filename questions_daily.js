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
  {
    id: 'd20261011_b1', level: 'basic', added: '2026-10-11', source: 'DataVidhya', company: 'Spotify',
    ref: 'Top 5 Artists by Stream Count', url: 'https://datavidhya.com/coding-problems/questionDetails/question/ranking-top5-artists-by-streams/',
    title: 'חמשת האמנים המושמעים ביותר', tables: ['d1011_streams'],
    prompt: 'בטבלה d1011_streams כל שורה היא השמעה אחת של שיר. החזירו את חמשת האמנים עם מספר ההשמעות הגבוה ביותר, בעמודות artist, streams (מספר ההשמעות) ו-total_hours (סך זמן ההאזנה בשעות, מעוגל ל-2 ספרות אחרי הנקודה). במקרה של שוויון במספר ההשמעות, האמן עם יותר שעות האזנה קודם, ואחריו לפי שם האמן בסדר אלפביתי. מיינו לפי הסדר הזה.',
    solution: `SELECT artist, COUNT(*) AS streams, ROUND(SUM(seconds_played) / 3600.0, 2) AS total_hours
FROM d1011_streams
GROUP BY artist
ORDER BY streams DESC, SUM(seconds_played) DESC, artist
LIMIT 5;`,
    ordered: true,
  },
  {
    id: 'd20261011_b2', level: 'basic', added: '2026-10-11', source: 'StrataScratch', company: 'Airbnb',
    ref: 'Host Popularity Rental Prices', url: 'https://www.stratascratch.com/blog/airbnb-python-interview-question-host-popularity-rental-prices',
    title: 'מחירים לפי רמת פופולריות', tables: ['d1011_listings'],
    prompt: "בטבלה d1011_listings לכל דירה יש מספר ביקורות (n_reviews) ומחיר ללילה (price). סווגו כל דירה לרמת פופולריות: 'New' ל-0 ביקורות, 'Rising' ל-1 עד 5, 'Trending' ל-6 עד 15, 'Popular' ל-16 עד 40, ו-'Hot' ל-41 ומעלה. לכל רמה שיש בה דירות החזירו את הרמה (tier), המחיר הנמוך ביותר (min_price), המחיר הממוצע מעוגל ל-2 ספרות (avg_price) והמחיר הגבוה ביותר (max_price). מיינו לפי min_price עולה.",
    solution: `SELECT tier, MIN(price) AS min_price, ROUND(AVG(price), 2) AS avg_price, MAX(price) AS max_price
FROM (
  SELECT price,
    CASE WHEN n_reviews = 0 THEN 'New'
         WHEN n_reviews <= 5 THEN 'Rising'
         WHEN n_reviews <= 15 THEN 'Trending'
         WHEN n_reviews <= 40 THEN 'Popular'
         ELSE 'Hot' END AS tier
  FROM d1011_listings
)
GROUP BY tier
ORDER BY min_price;`,
    ordered: true,
  },
  {
    id: 'd20261011_b3', level: 'basic', added: '2026-10-11', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'זמן טיפול ממוצע בקטגוריות עמוסות', tables: ['d1011_tickets'],
    prompt: 'בטבלה d1011_tickets כל שורה היא פנייה לתמיכה. עבור קטגוריות (category) שיש בהן לפחות 3 פניות בסך הכול, החזירו את הקטגוריה, מספר הפניות (ticket_count) וממוצע שעות הטיפול של הפניות שיש להן שעות טיפול רשומות (avg_hours, מעוגל ל-2 ספרות). מיינו לפי avg_hours יורד.',
    solution: `SELECT category, COUNT(*) AS ticket_count, ROUND(AVG(hours_spent), 2) AS avg_hours
FROM d1011_tickets
GROUP BY category
HAVING COUNT(*) >= 3
ORDER BY avg_hours DESC;`,
    ordered: true,
  },
  {
    id: 'd20261011_b4', level: 'basic', added: '2026-10-11', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פניות פתוחות לפי עדיפות', tables: ['d1011_tickets'],
    prompt: 'פנייה נחשבת פתוחה אם אין לה תאריך סגירה (closed_on). בטבלה d1011_tickets, לכל רמת עדיפות (priority) שיש בה לפחות פנייה פתוחה אחת החזירו את העדיפות ואת מספר הפניות הפתוחות (open_tickets).',
    solution: `SELECT priority, COUNT(*) AS open_tickets
FROM d1011_tickets
WHERE closed_on IS NULL
GROUP BY priority;`,
    ordered: false,
  },
  {
    id: 'd20261011_b5', level: 'basic', added: '2026-10-11', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מדווחים לפי סיומת דוא"ל', tables: ['d1011_tickets'],
    prompt: 'בטבלה d1011_tickets, החזירו את כתובות הדוא"ל השונות (reporter_email, בלי כפילויות) של מדווחים שכתובתם בדומיין gmail.com או מסתיימת ב-.co.il. מיינו לפי הכתובת בסדר אלפביתי.',
    solution: `SELECT DISTINCT reporter_email
FROM d1011_tickets
WHERE reporter_email LIKE '%@gmail.com' OR reporter_email LIKE '%.co.il'
ORDER BY reporter_email;`,
    ordered: true,
  },
  {
    id: 'd20261011_i1', level: 'intermediate', added: '2026-10-11', source: 'DataLemur', company: 'Airbnb',
    ref: 'Average Review Ratings (listing average rating per month)', url: 'https://datalemur.com/blog/airbnb-sql-interview-questions',
    title: 'דירוג ממוצע לדירה בכל חודש', tables: ['d1011_reviews'],
    prompt: 'בטבלה d1011_reviews כל שורה היא ביקורת על דירה (listing_id) עם תאריך (submit_date) ודירוג בכוכבים (stars). עבור ביקורות שנכתבו בשנת 2026 בלבד, החזירו לכל דירה ולכל חודש את מספר החודש (month, 1 עד 12), את מזהה הדירה (listing_id) ואת הדירוג הממוצע מעוגל ל-2 ספרות (avg_stars). מיינו לפי listing_id ואז לפי month.',
    solution: `SELECT CAST(strftime('%m', submit_date) AS INTEGER) AS month, listing_id, ROUND(AVG(stars), 2) AS avg_stars
FROM d1011_reviews
WHERE strftime('%Y', submit_date) = '2026'
GROUP BY listing_id, month
ORDER BY listing_id, month;`,
    ordered: true,
  },
  {
    id: 'd20261011_i2', level: 'intermediate', added: '2026-10-11', source: 'HackerRank', company: '',
    ref: 'Contest Leaderboard', url: 'https://www.hackerrank.com/challenges/contest-leaderboard/problem',
    title: 'טבלת מובילים בתחרות', tables: ['d1011_hackers', 'd1011_submissions'],
    prompt: 'בטבלה d1011_submissions יכולות להיות כמה הגשות של אותו משתתף לאותו אתגר. הציון של משתתף באתגר הוא הציון הגבוה ביותר שקיבל באתגר זה, והציון הכולל שלו הוא סכום הציונים שלו בכל האתגרים. החזירו את hacker_id, name (מהטבלה d1011_hackers) ו-total_score, רק למשתתפים שציונם הכולל גדול מ-0. מיינו לפי total_score יורד ואז לפי hacker_id עולה.',
    solution: `SELECT h.hacker_id, h.name, SUM(m.best) AS total_score
FROM d1011_hackers h
JOIN (
  SELECT hacker_id, challenge_id, MAX(score) AS best
  FROM d1011_submissions
  GROUP BY hacker_id, challenge_id
) m ON m.hacker_id = h.hacker_id
GROUP BY h.hacker_id, h.name
HAVING SUM(m.best) > 0
ORDER BY total_score DESC, h.hacker_id;`,
    ordered: true,
  },
  {
    id: 'd20261011_i3', level: 'intermediate', added: '2026-10-11', source: 'DataLemur', company: 'Airbnb',
    ref: 'Average Vacant Days', url: 'https://datalemur.com/blog/airbnb-sql-interview-questions',
    title: 'ממוצע ימי ריקנות בשנת 2025', tables: ['d1011_properties', 'd1011_bookings'],
    prompt: 'בטבלה d1011_properties נכס פעיל מסומן ב-is_active = 1. בטבלה d1011_bookings כל הזמנה היא טווח לילות מ-checkin (כולל) עד checkout (לא כולל), והזמנות של אותו נכס אינן חופפות. לשנת 2025 (365 ימים) נספרים רק הלילות שנמצאים בתוך השנה; הזמנה שחוצה את גבולות השנה נחתכת בהם. ימי ריקנות של נכס הם 365 פחות הלילות שהוזמנו בשנה זו, ונכס בלי הזמנות כלל נספר גם הוא. החזירו עמודה אחת, avg_vacant_days: ממוצע ימי הריקנות של הנכסים הפעילים בלבד, מעוגל למספר שלם.',
    solution: `SELECT ROUND(AVG(365 - COALESCE(b.nights, 0))) AS avg_vacant_days
FROM d1011_properties p
LEFT JOIN (
  SELECT property_id,
         SUM(julianday(MIN(checkout, '2026-01-01')) - julianday(MAX(checkin, '2025-01-01'))) AS nights
  FROM d1011_bookings
  WHERE checkout > '2025-01-01' AND checkin < '2026-01-01'
  GROUP BY property_id
) b ON b.property_id = p.property_id
WHERE p.is_active = 1;`,
    ordered: false,
  },
  {
    id: 'd20261011_i4', level: 'intermediate', added: '2026-10-11', source: 'MyCompiler', company: 'Airbnb',
    ref: 'Yearly host count growth', url: 'https://www.mycompiler.io/view/HsaYa96GqCA',
    title: 'צמיחה שנתית במספר המארחים', tables: ['d1011_host_reg'],
    prompt: 'בטבלה d1011_host_reg לכל מארח יש תאריך הצטרפות (registered_on). לכל שנה שקדמה לה שנה אחת לפחות עם הצטרפויות בנתונים (כלומר מהשנה השנייה ואילך), החזירו את השנה (year, כמספר), את מספר המארחים החדשים בשנה (new_hosts) ואת אחוז השינוי במספר המארחים החדשים לעומת השנה הקודמת (growth_pct, מעוגל ל-2 ספרות, למשל 33.33).',
    solution: `SELECT CAST(c.y AS INTEGER) AS year, c.n AS new_hosts,
       ROUND((c.n - p.n) * 100.0 / p.n, 2) AS growth_pct
FROM (SELECT strftime('%Y', registered_on) AS y, COUNT(*) AS n FROM d1011_host_reg GROUP BY y) c
JOIN (SELECT strftime('%Y', registered_on) AS y, COUNT(*) AS n FROM d1011_host_reg GROUP BY y) p
  ON CAST(p.y AS INTEGER) = CAST(c.y AS INTEGER) - 1;`,
    ordered: false,
  },
  {
    id: 'd20261011_i5', level: 'intermediate', added: '2026-10-11', source: 'Interview Query', company: 'Stripe',
    ref: 'ATM withdrawals exactly 10 seconds apart', url: 'https://interviewquery.com/interview-guides/stripe-data-analyst',
    title: 'משיכות במזומן במרחק 10 שניות', tables: ['d1011_bank_ops'],
    prompt: "בטבלה d1011_bank_ops כל שורה היא פעולה בחשבון, ו-op_type הוא 'withdrawal' (משיכה) או 'deposit' (הפקדה). החזירו את מזהי המשתמשים (user_id, בלי כפילויות) שביצעו שתי משיכות כלשהן שהפרש הזמן ביניהן (op_time) הוא בדיוק 10 שניות. מיינו לפי user_id עולה.",
    solution: `SELECT DISTINCT a.user_id
FROM d1011_bank_ops a
JOIN d1011_bank_ops b
  ON a.user_id = b.user_id
 AND a.op_type = 'withdrawal' AND b.op_type = 'withdrawal'
 AND CAST(strftime('%s', b.op_time) AS INTEGER) - CAST(strftime('%s', a.op_time) AS INTEGER) = 10
ORDER BY a.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261011_a1', level: 'advanced', added: '2026-10-11', source: 'Dataford', company: 'TikTok',
    ref: '10 consecutive login days', url: 'https://dataford.io/questions/10-consecutive-login-days',
    title: 'רצפי התחברות של 5 ימים לפחות', tables: ['d1011_logins'],
    prompt: 'בטבלה d1011_logins כל שורה היא התחברות של משתמש בתאריך מסוים (ייתכנו כמה שורות באותו יום). רצף הוא קבוצת ימי לוח עוקבים שבכל אחד מהם המשתמש התחבר, ולא ניתן להאריך אותו. החזירו כל רצף באורך 5 ימים לפחות, בעמודות user_id, run_start (היום הראשון ברצף) ו-run_days (מספר הימים ברצף). מיינו לפי user_id ואז לפי run_start.',
    solution: `WITH d AS (SELECT DISTINCT user_id, login_date FROM d1011_logins),
g AS (
  SELECT user_id, login_date,
         julianday(login_date) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS grp
  FROM d
)
SELECT user_id, MIN(login_date) AS run_start, COUNT(*) AS run_days
FROM g
GROUP BY user_id, grp
HAVING COUNT(*) >= 5
ORDER BY user_id, run_start;`,
    ordered: true,
  },
  {
    id: 'd20261011_a2', level: 'advanced', added: '2026-10-11', source: 'Dataford', company: '',
    ref: 'Consecutive activity days', url: 'https://dataford.io/questions/consecutive-activity-days',
    title: 'מספר רצפי פעילות בני יומיים ומעלה', tables: ['d1011_activity'],
    prompt: 'בטבלה d1011_activity כל שורה היא אינטראקציה של משתמש עם חותמת זמן (event_time), וייתכנו כמה אינטראקציות באותו יום. משתמש פעיל ביום אם ביצע בו לפחות אינטראקציה אחת. לכל משתמש שיש לו לפחות רצף אחד של שני ימי לוח פעילים עוקבים או יותר (גם מעל גבול חודש), החזירו את user_id ואת מספר הרצפים המקסימליים כאלה (streaks).',
    solution: `WITH d AS (SELECT DISTINCT user_id, date(event_time) AS d FROM d1011_activity),
g AS (
  SELECT user_id, d, julianday(d) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp
  FROM d
),
s AS (SELECT user_id, grp, COUNT(*) AS len FROM g GROUP BY user_id, grp)
SELECT user_id, COUNT(*) AS streaks
FROM s
WHERE len >= 2
GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261011_a3', level: 'advanced', added: '2026-10-11', source: 'HackerRank', company: '',
    ref: 'Interviews', url: 'https://www.hackerrank.com/challenges/interviews/problem',
    title: 'סיכום סטטיסטיקות לכל תחרות', tables: ['d1011_contests', 'd1011_colleges', 'd1011_challenges', 'd1011_view_stats', 'd1011_sub_stats'],
    prompt: 'לכל תחרות (d1011_contests) יש מכללות (d1011_colleges), לכל מכללה אתגרים (d1011_challenges), ולכל אתגר יכולות להיות כמה שורות סטטיסטיקת צפיות (d1011_view_stats) וכמה שורות סטטיסטיקת הגשות (d1011_sub_stats), או אף אחת. לכל תחרות החזירו contest_id, hacker_id, name, total_submissions, total_accepted_submissions, total_views, total_unique_views: סכום כל ערכי העמודות המתאימות על פני כל האתגרים של התחרות. אל תכללו תחרות שבה כל ארבעת הסכומים הם 0 (או חסרים). מיינו לפי contest_id.',
    solution: `SELECT c.contest_id, c.hacker_id, c.name,
       SUM(COALESCE(s.subs, 0)) AS total_submissions,
       SUM(COALESCE(s.acc, 0)) AS total_accepted_submissions,
       SUM(COALESCE(v.views, 0)) AS total_views,
       SUM(COALESCE(v.uviews, 0)) AS total_unique_views
FROM d1011_contests c
JOIN d1011_colleges col ON col.contest_id = c.contest_id
JOIN d1011_challenges ch ON ch.college_id = col.college_id
LEFT JOIN (SELECT challenge_id, SUM(total_submissions) AS subs, SUM(total_accepted_submissions) AS acc
           FROM d1011_sub_stats GROUP BY challenge_id) s ON s.challenge_id = ch.challenge_id
LEFT JOIN (SELECT challenge_id, SUM(total_views) AS views, SUM(total_unique_views) AS uviews
           FROM d1011_view_stats GROUP BY challenge_id) v ON v.challenge_id = ch.challenge_id
GROUP BY c.contest_id, c.hacker_id, c.name
HAVING SUM(COALESCE(s.subs, 0)) + SUM(COALESCE(s.acc, 0)) + SUM(COALESCE(v.views, 0)) + SUM(COALESCE(v.uviews, 0)) > 0
ORDER BY c.contest_id;`,
    ordered: true,
  },
  {
    id: 'd20261011_a4', level: 'advanced', added: '2026-10-11', source: 'StrataScratch', company: 'Amazon',
    ref: 'Revenue Over Time', url: 'https://www.stratascratch.com/blog/amazon-sql-interview-questions',
    title: 'הכנסה חודשית וממוצע נע של 3 חודשים', tables: ['d1011_purchases'],
    prompt: "בטבלה d1011_purchases לכל רכישה יש סכום (amount) וסטטוס. הכנסה חודשית היא סכום הרכישות בסטטוס 'completed' פחות סכום הרכישות בסטטוס 'refunded' באותו חודש קלנדרי של created_at; רכישות בסטטוס 'cancelled' לא נספרות. לכל חודש בנתונים החזירו month (בפורמט YYYY-MM), revenue (ההכנסה החודשית, מעוגלת ל-2 ספרות) ו-rolling_avg_3m: ממוצע ההכנסה החודשית של החודש הנוכחי ושני החודשים שלפניו (בשני החודשים הראשונים, ממוצע החודשים הקיימים עד אותו חודש), מעוגל ל-2 ספרות. מיינו לפי month עולה.",
    solution: `WITH m AS (
  SELECT strftime('%Y-%m', created_at) AS month,
         SUM(CASE status WHEN 'completed' THEN amount WHEN 'refunded' THEN -amount ELSE 0 END) AS revenue
  FROM d1011_purchases
  GROUP BY month
)
SELECT month, ROUND(revenue, 2) AS revenue,
       ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3m
FROM m
ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261011_a5', level: 'advanced', added: '2026-10-11', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חלוקת צפיות לסשנים', tables: ['d1011_pageviews'],
    prompt: 'בטבלה d1011_pageviews כל שורה היא צפייה בעמוד של משתמש בזמן ts. צפיות רצופות של אותו משתמש שייכות לאותו סשן כל עוד הפער בין צפייה לצפייה הקודמת שלה (של אותו משתמש) הוא 30 דקות או פחות; פער גדול מ-30 דקות פותח סשן חדש (גם מעבר לחצות). לכל סשן החזירו user_id, session_start (זמן הצפייה הראשונה), session_end (זמן הצפייה האחרונה) ו-views (מספר הצפיות). מיינו לפי user_id ואז לפי session_start.',
    solution: `WITH x AS (
  SELECT user_id, ts,
         CASE WHEN CAST(strftime('%s', ts) AS INTEGER)
                 - CAST(strftime('%s', LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)) AS INTEGER) > 1800
              THEN 1 ELSE 0 END AS new_session
  FROM d1011_pageviews
), s AS (
  SELECT user_id, ts, SUM(new_session) OVER (PARTITION BY user_id ORDER BY ts) AS sid
  FROM x
)
SELECT user_id, MIN(ts) AS session_start, MAX(ts) AS session_end, COUNT(*) AS views
FROM s
GROUP BY user_id, sid
ORDER BY user_id, session_start;`,
    ordered: true,
  },
  {
    id: 'd20261012_b1', level: 'basic', added: '2026-10-12', source: 'HackerRank', company: '',
    ref: 'Binary Tree Nodes', url: 'https://www.hackerrank.com/challenges/binary-search-tree-1/problem',
    title: 'סיווג צמתים בעץ', tables: ['d1012_bst'],
    prompt: 'בטבלה d1012_bst כל שורה היא צומת בעץ: n הוא מזהה הצומת ו-p הוא מזהה ההורה שלו (NULL עבור צומת ללא הורה). לכל צומת החזירו n ו-type: "Root" אם אין לו הורה, "Inner" אם יש לו הורה והוא עצמו הורה של צומת אחר, ו-"Leaf" בכל מקרה אחר. מיינו לפי n עולה.',
    solution: `SELECT n,
       CASE WHEN p IS NULL THEN 'Root'
            WHEN n IN (SELECT p FROM d1012_bst WHERE p IS NOT NULL) THEN 'Inner'
            ELSE 'Leaf' END AS type
FROM d1012_bst
ORDER BY n;`,
    ordered: true,
  },
  {
    id: 'd20261012_b2', level: 'basic', added: '2026-10-12', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שכר כולל ממוצע במחלקות', tables: ['d1012_staff'],
    prompt: 'בטבלה d1012_staff יש עובדים עם משכורת (salary) ובונוס (bonus), כאשר bonus ריק (NULL) משמעותו שאין בונוס, כלומר 0. עלות העובד היא salary + bonus. החזירו לכל מחלקה (dept) שיש בה לפחות 3 עובדים: dept, headcount (מספר העובדים) ו-avg_cost (ממוצע עלות העובד, מעוגל ל-2 ספרות). מיינו לפי avg_cost יורד.',
    solution: `SELECT dept, COUNT(*) AS headcount, ROUND(AVG(salary + COALESCE(bonus, 0)), 2) AS avg_cost
FROM d1012_staff
GROUP BY dept
HAVING COUNT(*) >= 3
ORDER BY avg_cost DESC;`,
    ordered: true,
  },
  {
    id: 'd20261012_b3', level: 'basic', added: '2026-10-12', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פניות פתוחות לפי ערוץ', tables: ['d1012_tickets'],
    prompt: 'בטבלה d1012_tickets כל שורה היא פניית תמיכה; פנייה שעדיין לא נסגרה היא כזו ש-closed_at שלה ריק (NULL). לכל ערוץ (channel) שיש בו לפחות פנייה פתוחה אחת, החזירו channel, total_tickets (סה"כ הפניות בערוץ), open_tickets (מספר הפניות הפתוחות) ו-open_pct (אחוז הפניות הפתוחות מתוך כלל הפניות בערוץ, מעוגל ל-2 ספרות). מיינו לפי open_pct יורד.',
    solution: `SELECT channel,
       COUNT(*) AS total_tickets,
       SUM(CASE WHEN closed_at IS NULL THEN 1 ELSE 0 END) AS open_tickets,
       ROUND(100.0 * SUM(CASE WHEN closed_at IS NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS open_pct
FROM d1012_tickets
GROUP BY channel
HAVING open_tickets > 0
ORDER BY open_pct DESC;`,
    ordered: true,
  },
  {
    id: 'd20261012_b4', level: 'basic', added: '2026-10-12', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שחקנים פעילים ברבעון', tables: ['d1012_matches'],
    prompt: 'בטבלה d1012_matches כל שורה היא משחק של שחקן (player) במשחק (game) עם תוצאה (score, ריקה אם המשחק לא הסתיים) בתאריך played_on. התייחסו רק למשחקים שהתקיימו מ-2026-07-01 עד 2026-09-30 (כולל) ושיש להם תוצאה. החזירו לכל שחקן שיש לו לפחות 2 משחקים כאלה: player, matches (מספר המשחקים), distinct_games (מספר סוגי המשחקים השונים ששיחק) ו-best_score (התוצאה הגבוהה ביותר). מיינו לפי best_score יורד ואז לפי player.',
    solution: `SELECT player, COUNT(*) AS matches, COUNT(DISTINCT game) AS distinct_games, MAX(score) AS best_score
FROM d1012_matches
WHERE played_on BETWEEN '2026-07-01' AND '2026-09-30' AND score IS NOT NULL
GROUP BY player
HAVING COUNT(*) >= 2
ORDER BY best_score DESC, player;`,
    ordered: true,
  },
  {
    id: 'd20261012_b5', level: 'basic', added: '2026-10-12', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'זמני אספקה לפי חברת שילוח', tables: ['d1012_shipments'],
    prompt: 'בטבלה d1012_shipments כל שורה היא משלוח; delivered_on ריק (NULL) אם המשלוח עדיין לא נמסר. התייחסו רק למשלוחים שנמסרו. משך האספקה הוא מספר הימים בין shipped_on ל-delivered_on. החזירו לכל חברת שילוח (carrier): carrier, delivered (מספר המשלוחים שנמסרו), avg_days (ממוצע ימי האספקה, מעוגל ל-2 ספרות) ו-late (מספר המשלוחים שנמסרו אחרי יותר מ-5 ימים). מיינו לפי avg_days עולה ואז לפי carrier.',
    solution: `SELECT carrier,
       COUNT(*) AS delivered,
       ROUND(AVG(julianday(delivered_on) - julianday(shipped_on)), 2) AS avg_days,
       SUM(CASE WHEN julianday(delivered_on) - julianday(shipped_on) > 5 THEN 1 ELSE 0 END) AS late
FROM d1012_shipments
WHERE delivered_on IS NOT NULL
GROUP BY carrier
ORDER BY avg_days, carrier;`,
    ordered: true,
  },
  {
    id: 'd20261012_i1', level: 'intermediate', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Exchange Seats', url: 'https://leetcode.com/problems/exchange-seats/',
    title: 'החלפת מושבים', tables: ['d1012_seats'],
    prompt: 'בטבלה d1012_seats יש תלמידים וכל אחד יושב במושב עם id רץ מ-1. מחליפים את התלמידים בכל זוג מושבים סמוכים (1 ו-2, 3 ו-4 וכן הלאה). אם מספר התלמידים אי-זוגי, התלמיד במושב האחרון נשאר במקומו. החזירו id ו-student לאחר ההחלפה (ה-id נשאר קבוע, התלמיד הוא מי שיושב עכשיו במושב), ממוינים לפי id.',
    solution: `SELECT s.id,
       CASE WHEN s.id % 2 = 1 AND s.id < (SELECT MAX(id) FROM d1012_seats) THEN (SELECT student FROM d1012_seats WHERE id = s.id + 1)
            WHEN s.id % 2 = 0 THEN (SELECT student FROM d1012_seats WHERE id = s.id - 1)
            ELSE s.student END AS student
FROM d1012_seats s
ORDER BY s.id;`,
    ordered: true,
  },
  {
    id: 'd20261012_i2', level: 'intermediate', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Friend Requests II: Who Has the Most Friends', url: 'https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/',
    title: 'מי הכי פופולרי ברשת', tables: ['d1012_friend_accepts'],
    prompt: 'בטבלה d1012_friend_accepts כל שורה היא בקשת חברות שאושרה בין requester_id ל-accepter_id, והחברות הדדית (אותו משתמש יכול להופיע בכל אחת משתי העמודות). החזירו את המשתמש או המשתמשים עם מספר החברים הגדול ביותר: id ו-num (מספר החברים). אם כמה משתמשים שווים במקום הראשון, החזירו את כולם. מיינו לפי id.',
    solution: `WITH f AS (
  SELECT requester_id AS id FROM d1012_friend_accepts
  UNION ALL
  SELECT accepter_id FROM d1012_friend_accepts
), c AS (
  SELECT id, COUNT(*) AS num FROM f GROUP BY id
)
SELECT id, num FROM c
WHERE num = (SELECT MAX(num) FROM c)
ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261012_i3', level: 'intermediate', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Active Businesses', url: 'https://leetcode.doocs.org/en/lc/1126/',
    title: 'עסקים פעילים', tables: ['d1012_biz_events'],
    prompt: 'בטבלה d1012_biz_events כל שורה מציינת כמה פעמים (occurrences) אירוע מסוג event_type קרה לעסק business_id. הפעילות הממוצעת של סוג אירוע היא ממוצע ה-occurrences של אותו סוג על פני כל העסקים שיש להם אירועים מהסוג הזה. עסק נחשב פעיל אם ביותר מסוג אירוע אחד מספר ה-occurrences שלו גדול ממש מהפעילות הממוצעת של אותו סוג. החזירו את business_id של העסקים הפעילים, ממוינים עולה.',
    solution: `SELECT e.business_id
FROM d1012_biz_events e
JOIN (SELECT event_type, AVG(occurrences) AS avg_occ FROM d1012_biz_events GROUP BY event_type) a
  ON a.event_type = e.event_type
WHERE e.occurrences > a.avg_occ
GROUP BY e.business_id
HAVING COUNT(*) > 1
ORDER BY e.business_id;`,
    ordered: true,
  },
  {
    id: 'd20261012_i4', level: 'intermediate', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Product Price at a Given Date', url: 'https://leetcode.com/problems/product-price-at-a-given-date',
    title: 'מחיר מוצר בתאריך נתון', tables: ['d1012_price_changes'],
    prompt: 'בטבלה d1012_price_changes כל שורה היא שינוי מחיר של מוצר: new_price נכנס לתוקף בתאריך change_date. לפני השינוי הראשון של מוצר מחירו היה 10. החזירו לכל מוצר שמופיע בטבלה את המחיר שלו בתאריך 2026-08-16 (שינוי שנכנס לתוקף בדיוק בתאריך הזה כבר נחשב): product_id ו-price. מיינו לפי product_id.',
    solution: `SELECT p.product_id,
       COALESCE((SELECT c.new_price FROM d1012_price_changes c
                 WHERE c.product_id = p.product_id AND c.change_date <= '2026-08-16'
                 ORDER BY c.change_date DESC LIMIT 1), 10) AS price
FROM (SELECT DISTINCT product_id FROM d1012_price_changes) p
ORDER BY p.product_id;`,
    ordered: true,
  },
  {
    id: 'd20261012_i5', level: 'intermediate', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Immediate Food Delivery II', url: 'https://leetcode.com/problems/immediate-food-delivery-ii/',
    title: 'אחוז הזמנות ראשונות מיידיות', tables: ['d1012_deliveries'],
    prompt: 'בטבלה d1012_deliveries כל שורה היא הזמנה של לקוח עם order_date ו-preferred_date. הזמנה היא מיידית אם התאריכים שווים. ההזמנה הראשונה של לקוח היא זו עם order_date המוקדם ביותר שלו (לכל לקוח יש תאריך הזמנה ייחודי). החזירו עמודה אחת, immediate_pct: אחוז הלקוחות שהזמנתם הראשונה מיידית, מתוך כלל הלקוחות, מעוגל ל-2 ספרות.',
    solution: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = preferred_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_pct
FROM d1012_deliveries
WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM d1012_deliveries GROUP BY customer_id);`,
    ordered: false,
  },
  {
    id: 'd20261012_a1', level: 'advanced', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Report Contiguous Dates', url: 'https://leetcode.doocs.org/en/lc/1225/',
    title: 'רצפי ימים של הצלחה וכישלון', tables: ['d1012_ok_days', 'd1012_failed_days'],
    prompt: 'הטבלה d1012_ok_days מכילה ימים שבהם משימה לילית הצליחה, והטבלה d1012_failed_days ימים שבהם נכשלה (כל יום מופיע בדיוק באחת משתיהן). התייחסו רק לתקופה מ-2026-09-01 עד 2026-09-15 (כולל). לכל רצף של ימים רצופים באותו מצב החזירו state ("succeeded" או "failed"), start_date ו-end_date של הרצף. מיינו לפי start_date.',
    solution: `WITH d AS (
  SELECT day, 'succeeded' AS state FROM d1012_ok_days WHERE day BETWEEN '2026-09-01' AND '2026-09-15'
  UNION ALL
  SELECT day, 'failed' FROM d1012_failed_days WHERE day BETWEEN '2026-09-01' AND '2026-09-15'
), g AS (
  SELECT state, day,
         julianday(day) - ROW_NUMBER() OVER (PARTITION BY state ORDER BY day) AS grp
  FROM d
)
SELECT state, MIN(day) AS start_date, MAX(day) AS end_date
FROM g
GROUP BY state, grp
ORDER BY start_date;`,
    ordered: true,
  },
  {
    id: 'd20261012_a2', level: 'advanced', added: '2026-10-12', source: 'HackerRank', company: '',
    ref: 'SQL Project Planning', url: 'https://www.hackerrank.com/challenges/sql-projects/problem',
    title: 'איחוד משימות רצופות לפרויקטים', tables: ['d1012_tasks'],
    prompt: 'בטבלה d1012_tasks כל משימה נמשכת יום אחד (end_date הוא היום שאחרי start_date). משימות שבהן ה-start_date של אחת שווה ל-end_date של הקודמת לה שייכות לאותו פרויקט. החזירו לכל פרויקט את start_date (תחילת המשימה הראשונה) ו-end_date (סוף המשימה האחרונה). מיינו לפי משך הפרויקט בימים (מהקצר לארוך) ובשוויון לפי start_date.',
    solution: `WITH g AS (
  SELECT start_date, end_date,
         julianday(start_date) - ROW_NUMBER() OVER (ORDER BY start_date) AS grp
  FROM d1012_tasks
)
SELECT MIN(start_date) AS start_date, MAX(end_date) AS end_date
FROM g
GROUP BY grp
ORDER BY julianday(MAX(end_date)) - julianday(MIN(start_date)), MIN(start_date);`,
    ordered: true,
  },
  {
    id: 'd20261012_a3', level: 'advanced', added: '2026-10-12', source: 'LeetCode', company: '',
    ref: 'Last Person to Fit in the Bus', url: 'https://leetcode.com/problems/last-person-to-fit-in-the-bus',
    title: 'האחרון שנכנס לאוטובוס', tables: ['d1012_bus_queue'],
    prompt: 'בטבלה d1012_bus_queue אנשים עולים לאוטובוס לפי סדר turn עולה. משקל האנשים באוטובוס לא יכול לעבור 1000 ק"ג, והעלייה נעצרת באדם הראשון שהוספתו תגרום לחריגה (אף אחד אחריו לא עולה). החזירו עמודה אחת, person_name: שם האדם האחרון שהצליח לעלות.',
    solution: `WITH r AS (
  SELECT person_name, turn, SUM(weight) OVER (ORDER BY turn) AS total
  FROM d1012_bus_queue
)
SELECT person_name FROM r
WHERE total <= 1000
ORDER BY turn DESC
LIMIT 1;`,
    ordered: false,
  },
  {
    id: 'd20261012_a4', level: 'advanced', added: '2026-10-12', source: 'Interview Query', company: '',
    ref: 'Paired Products', url: 'https://interviewquery.com/questions/paired-products',
    title: 'זוגות מוצרים נפוצים', tables: ['d1012_user_products'],
    prompt: 'בטבלה d1012_user_products כל שורה מציינת שמשתמש קנה מוצר (ייתכנו שורות כפולות). זוג מוצרים נספר עבור משתמש אם קנה את שניהם. החזירו את כל זוגות המוצרים השונים שנקנו על ידי לפחות 2 משתמשים שונים: product_a (השם הראשון בסדר אלפביתי), product_b ו-users (מספר המשתמשים השונים שקנו את שניהם). כל זוג מופיע פעם אחת. מיינו לפי users יורד, אחר כך product_a ואז product_b.',
    solution: `WITH u AS (SELECT DISTINCT user_id, product FROM d1012_user_products)
SELECT a.product AS product_a, b.product AS product_b, COUNT(*) AS users
FROM u a
JOIN u b ON a.user_id = b.user_id AND a.product < b.product
GROUP BY a.product, b.product
HAVING COUNT(*) >= 2
ORDER BY users DESC, product_a, product_b;`,
    ordered: true,
  },
  {
    id: 'd20261012_a5', level: 'advanced', added: '2026-10-12', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חציון הזמנה לפי עיר', tables: ['d1012_city_orders'],
    prompt: 'בטבלה d1012_city_orders כל שורה היא הזמנה עם סכום (amount) ועיר (city). החזירו לכל עיר את חציון סכומי ההזמנות שלה: city ו-median_amount. בעיר עם מספר זוגי של הזמנות החציון הוא ממוצע שני הערכים האמצעיים. מיינו לפי city.',
    solution: `WITH r AS (
  SELECT city, amount,
         ROW_NUMBER() OVER (PARTITION BY city ORDER BY amount) AS rn,
         COUNT(*) OVER (PARTITION BY city) AS cnt
  FROM d1012_city_orders
)
SELECT city, AVG(amount) AS median_amount
FROM r
WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2)
GROUP BY city
ORDER BY city;`,
    ordered: true,
  },
  // ===== 2026-10-13 =====
  {
    id: 'd20261013_b1', level: 'basic', added: '2026-10-13', source: 'HackerRank', company: '',
    ref: 'Weather Observation Station 3', url: 'https://dev.to/christianpaez/hackerrank-sql-preparation-weather-observation-station-3mysql-2l73',
    title: 'ערים בתחנות עם מזהה זוגי', tables: ['d1013_station'],
    prompt: 'בטבלה d1013_station יש תחנות מדידה, וייתכן שאותה עיר מופיעה בכמה תחנות. החזירו את שמות הערים (city) שיש להן לפחות תחנה אחת עם id זוגי, כל עיר פעם אחת. מיינו לפי city בסדר אלפביתי.',
    solution: `SELECT DISTINCT city FROM d1013_station WHERE id % 2 = 0 ORDER BY city;`,
    ordered: true,
  },
  {
    id: 'd20261013_b2', level: 'basic', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Game Play Analysis I', url: 'https://leetcode.com/problems/game-play-analysis-i/',
    title: 'התחברות ראשונה של כל שחקן', tables: ['d1013_game'],
    prompt: 'בטבלה d1013_game כל שורה היא יום פעילות של שחקן במכשיר מסוים (event_date בפורמט YYYY-MM-DD). החזירו לכל שחקן את התאריך המוקדם ביותר שבו התחבר: player_id ו-first_login.',
    solution: `SELECT player_id, MIN(event_date) AS first_login FROM d1013_game GROUP BY player_id;`,
    ordered: false,
  },
  {
    id: 'd20261013_b3', level: 'basic', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Second Highest Salary', url: 'https://leetcode.doocs.org/en/lc/176/',
    title: 'השכר השני בגובהו', tables: ['d1013_salaries'],
    prompt: 'בטבלה d1013_salaries יש שכר לכל עובד, וייתכנו עובדים עם אותו שכר. החזירו שורה אחת ועמודה אחת, second_salary: הערך השני בגובהו מבין השכרים השונים זה מזה (לא השכר של העובד השני ברשימה ממוינת).',
    solution: `SELECT MAX(salary) AS second_salary FROM d1013_salaries WHERE salary < (SELECT MAX(salary) FROM d1013_salaries);`,
    ordered: false,
  },
  {
    id: 'd20261013_b4', level: 'basic', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Capital Gain/Loss', url: 'https://leetcode.com/problems/capital-gainloss/',
    title: 'רווח או הפסד הון לכל מניה', tables: ['d1013_stocks'],
    prompt: 'בטבלה d1013_stocks כל שורה היא פעולת קנייה (operation = "Buy") או מכירה (operation = "Sell") של מניה במחיר מסוים. כל קנייה מתאימה למכירה מאוחרת יותר, ולכן סך המכירות פחות סך הקניות הוא הרווח או ההפסד של המניה. החזירו לכל מניה: stock_name ו-capital_gain_loss (סכום מחירי המכירה פחות סכום מחירי הקנייה).',
    solution: `SELECT stock_name, SUM(CASE WHEN operation = 'Sell' THEN price ELSE -price END) AS capital_gain_loss FROM d1013_stocks GROUP BY stock_name;`,
    ordered: false,
  },
  {
    id: 'd20261013_b5', level: 'basic', added: '2026-10-13', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'ז\'אנרים עם דירוג ממוצע גבוה', tables: ['d1013_movies'],
    prompt: 'בטבלה d1013_movies יש סרטים, ולחלקם אין עדיין דירוג (rating ריק). התעלמו מסרטים בלי דירוג. החזירו ז\'אנרים שיש בהם לפחות 2 סרטים מדורגים, עם: genre, rated_movies (מספר הסרטים המדורגים) ו-avg_rating (דירוג ממוצע מעוגל לספרה אחת אחרי הנקודה). הציגו רק ז\'אנרים שהדירוג הממוצע שלהם לפחות 6.5.',
    solution: `SELECT genre, COUNT(rating) AS rated_movies, ROUND(AVG(rating), 1) AS avg_rating
FROM d1013_movies
WHERE rating IS NOT NULL
GROUP BY genre
HAVING COUNT(*) >= 2 AND AVG(rating) >= 6.5;`,
    ordered: false,
  },
  {
    id: 'd20261013_i1', level: 'intermediate', added: '2026-10-13', source: 'HackerRank', company: '',
    ref: 'The Report', url: 'https://github.com/cuongtrans/hackerrank-sql-challenges',
    title: 'דוח ציונים עם הסתרת שמות', tables: ['d1013_students', 'd1013_grades'],
    prompt: 'בטבלה d1013_students יש תלמידים וציוניהם (marks), ובטבלה d1013_grades טבלת המרה: לכל grade יש טווח ציונים (min_mark עד max_mark, כולל). החזירו לכל תלמיד: name, grade, marks. עבור תלמידים בדרגה 7 ומטה, name יוצג כ-NULL. מיינו לפי grade יורד; בתוך דרגות 8 ומעלה לפי name עולה; בתוך דרגות 7 ומטה לפי marks עולה; ובתיקו נוסף לפי id עולה.',
    solution: `SELECT CASE WHEN g.grade >= 8 THEN s.name END AS name, g.grade, s.marks
FROM d1013_students s
JOIN d1013_grades g ON s.marks BETWEEN g.min_mark AND g.max_mark
ORDER BY g.grade DESC,
         CASE WHEN g.grade >= 8 THEN s.name END ASC,
         CASE WHEN g.grade < 8 THEN s.marks END ASC,
         s.id ASC;`,
    ordered: true,
  },
  {
    id: 'd20261013_i2', level: 'intermediate', added: '2026-10-13', source: 'HackerRank', company: '',
    ref: 'Top Competitors', url: 'https://github.com/cuongtrans/hackerrank-sql-challenges',
    title: 'מתחרים עם ציון מלא ביותר מאתגר אחד', tables: ['d1013_hackers', 'd1013_chal', 'd1013_difficulty', 'd1013_subs'],
    prompt: 'לכל אתגר (d1013_chal) יש רמת קושי, ולכל רמת קושי ציון מקסימלי (d1013_difficulty). ההגשות נמצאות ב-d1013_subs. הגשה היא "ציון מלא" כשהציון שלה שווה לציון המקסימלי של רמת הקושי של האתגר. החזירו את המתחרים שקיבלו ציון מלא ביותר מאתגר אחד (שני ציונים מלאים באותו אתגר נספרים כאתגר אחד): hacker_id, name ו-full_challenges (מספר האתגרים השונים שבהם קיבלו ציון מלא). מיינו לפי full_challenges יורד ואז hacker_id עולה.',
    solution: `SELECT h.hacker_id, h.name, COUNT(DISTINCT s.challenge_id) AS full_challenges
FROM d1013_subs s
JOIN d1013_chal c ON c.challenge_id = s.challenge_id
JOIN d1013_difficulty d ON d.difficulty_level = c.difficulty_level
JOIN d1013_hackers h ON h.hacker_id = s.hacker_id
WHERE s.score = d.max_score
GROUP BY h.hacker_id, h.name
HAVING COUNT(DISTINCT s.challenge_id) > 1
ORDER BY full_challenges DESC, h.hacker_id;`,
    ordered: true,
  },
  {
    id: 'd20261013_i3', level: 'intermediate', added: '2026-10-13', source: 'HackerRank', company: '',
    ref: 'Symmetric Pairs', url: 'https://dev.to/ranggakd/symmetric-pairs-hackerrank-mssql-31d2',
    title: 'זוגות סימטריים', tables: ['d1013_functions'],
    prompt: 'בטבלה d1013_functions כל שורה היא זוג (x, y), וייתכנו שורות כפולות. הזוג (a, b) נקרא סימטרי אם קיימות בטבלה גם שורה (a, b) וגם שורה (b, a). זוג שבו a = b נחשב סימטרי רק אם הוא מופיע בטבלה לפחות פעמיים. החזירו כל זוג סימטרי פעם אחת בלבד, בצורה x ≤ y: העמודות x ו-y. מיינו לפי x עולה ואז y עולה.',
    solution: `SELECT DISTINCT f1.x, f1.y
FROM d1013_functions f1
JOIN d1013_functions f2 ON f1.x = f2.y AND f1.y = f2.x
WHERE f1.x < f1.y
UNION
SELECT x, y FROM d1013_functions WHERE x = y GROUP BY x, y HAVING COUNT(*) > 1
ORDER BY 1, 2;`,
    ordered: true,
  },
  {
    id: 'd20261013_i4', level: 'intermediate', added: '2026-10-13', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נרשמים שמעולם לא השלימו הזמנה', tables: ['d1013_users', 'd1013_orders'],
    prompt: 'בטבלה d1013_users יש משתמשים רשומים, ובטבלה d1013_orders הזמנות עם סטטוס (completed, cancelled או refunded). החזירו את המשתמשים שאין להם אף הזמנה בסטטוס completed (כולל משתמשים שאין להם הזמנות בכלל): user_id ו-name. מיינו לפי user_id.',
    solution: `SELECT u.user_id, u.name
FROM d1013_users u
WHERE NOT EXISTS (SELECT 1 FROM d1013_orders o WHERE o.user_id = u.user_id AND o.status = 'completed')
ORDER BY u.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261013_i5', level: 'intermediate', added: '2026-10-13', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'גבייה לפי מרפאה', tables: ['d1013_visits'],
    prompt: 'בטבלה d1013_visits כל שורה היא ביקור במרפאה, עם עלות (fee) ועם paid = 1 אם שולם ו-0 אם לא. החזירו לכל מרפאה: clinic, visits (מספר הביקורים), paid_visits (מספר הביקורים ששולמו), unpaid_amount (סך העלויות שטרם שולמו) ו-collection_pct (אחוז הביקורים ששולמו מתוך כל הביקורים, מעוגל לספרה אחת אחרי הנקודה).',
    solution: `SELECT clinic,
       COUNT(*) AS visits,
       SUM(CASE WHEN paid = 1 THEN 1 ELSE 0 END) AS paid_visits,
       SUM(CASE WHEN paid = 0 THEN fee ELSE 0 END) AS unpaid_amount,
       ROUND(100.0 * SUM(CASE WHEN paid = 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS collection_pct
FROM d1013_visits
GROUP BY clinic;`,
    ordered: false,
  },
  {
    id: 'd20261013_a1', level: 'advanced', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Department Top Three Salaries', url: 'https://leetcode.com/problems/department-top-three-salaries/',
    title: 'שלושת השכרים הגבוהים בכל מחלקה', tables: ['d1013_dept', 'd1013_employee'],
    prompt: 'בטבלאות d1013_dept ו-d1013_employee יש מחלקות ועובדים. עובד נחשב "מרוויח בכיר" אם שכרו הוא אחד משלושת השכרים השונים הגבוהים ביותר במחלקה שלו (כל העובדים שחולקים אותו שכר נכללים). החזירו: department (שם המחלקה), employee (שם העובד) ו-salary. מיינו לפי department עולה, salary יורד ואז employee עולה.',
    solution: `SELECT d.name AS department, e.name AS employee, e.salary
FROM d1013_employee e
JOIN d1013_dept d ON d.id = e.dept_id
WHERE (SELECT COUNT(DISTINCT e2.salary) FROM d1013_employee e2 WHERE e2.dept_id = e.dept_id AND e2.salary > e.salary) < 3
ORDER BY department, e.salary DESC, employee;`,
    ordered: true,
  },
  {
    id: 'd20261013_a2', level: 'advanced', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Rank Scores', url: 'https://leetcode.com/problems/rank-scores/',
    title: 'דירוג ציונים בלי דילוגים', tables: ['d1013_scores'],
    prompt: 'בטבלה d1013_scores יש ציונים. דרגו את הציונים מהגבוה לנמוך: ציונים שווים מקבלים אותו דירוג, והדירוג הבא הוא המספר הבא ברצף, בלי דילוגים (1, 2, 2, 3 ...). החזירו score ו-ranking, ממוינים לפי score יורד.',
    solution: `SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS ranking FROM d1013_scores ORDER BY score DESC;`,
    ordered: true,
  },
  {
    id: 'd20261013_a3', level: 'advanced', added: '2026-10-13', source: 'DataLemur', company: 'Spotify',
    ref: 'Top 5 Artists', url: 'https://datalemur.com/blog/spotify-sql-interview-questions',
    title: 'האמנים המובילים במצעד', tables: ['d1013_artists', 'd1013_songs', 'd1013_chart'],
    prompt: 'בטבלה d1013_chart יש שורה לכל שיר שהופיע במצעד ביום מסוים, עם המיקום שלו (pos). התחשבו רק בהופעות שבהן המיקום הוא 10 או טוב יותר (pos ≤ 10). לכל אמן ספרו את מספר ההופעות של שיריו (d1013_songs מקשרת שיר לאמן, d1013_artists מכילה שמות אמנים). דרגו את האמנים לפי מספר ההופעות מהגבוה לנמוך: אמנים עם אותו מספר הופעות מקבלים אותו דירוג והדירוג הבא רציף (1, 2, 2, 3 ...). החזירו את האמנים שדירוגם 3 או טוב יותר: artist_name ו-artist_rank. מיינו לפי artist_rank ואז artist_name.',
    solution: `WITH cnt AS (
  SELECT a.artist_name, COUNT(*) AS appearances
  FROM d1013_chart c
  JOIN d1013_songs s ON s.song_id = c.song_id
  JOIN d1013_artists a ON a.artist_id = s.artist_id
  WHERE c.pos <= 10
  GROUP BY a.artist_id, a.artist_name
), r AS (
  SELECT artist_name, DENSE_RANK() OVER (ORDER BY appearances DESC) AS artist_rank FROM cnt
)
SELECT artist_name, artist_rank FROM r WHERE artist_rank <= 3 ORDER BY artist_rank, artist_name;`,
    ordered: true,
  },
  {
    id: 'd20261013_a4', level: 'advanced', added: '2026-10-13', source: 'Interview Query', company: 'Spotify',
    ref: 'Top three most streamed songs per country in the past 7 days', url: 'https://www.interviewquery.com/interview-guides/spotify-data-engineer',
    title: 'שלושת השירים המושמעים ביותר בכל מדינה', tables: ['d1013_plays'],
    prompt: 'בטבלה d1013_plays כל שורה היא השמעה של שיר במדינה בתאריך מסוים. התחשבו רק בהשמעות מ-7 הימים שנגמרים ב-2026-10-10 (כולל, כלומר מ-2026-10-04 עד 2026-10-10). בכל מדינה דרגו את השירים לפי מספר ההשמעות מהגבוה לנמוך: שירים עם אותו מספר השמעות מקבלים אותו מקום, והמקום שאחריהם מדלג (1, 2, 2, 4 ...). החזירו את השירים שמקומם 3 או טוב יותר: country, song ו-plays. מיינו לפי country, plays יורד ואז song.',
    solution: `WITH c AS (
  SELECT country, song, COUNT(*) AS plays
  FROM d1013_plays
  WHERE play_date BETWEEN '2026-10-04' AND '2026-10-10'
  GROUP BY country, song
), r AS (
  SELECT country, song, plays, RANK() OVER (PARTITION BY country ORDER BY plays DESC) AS rk FROM c
)
SELECT country, song, plays FROM r WHERE rk <= 3 ORDER BY country, plays DESC, song;`,
    ordered: true,
  },
  {
    id: 'd20261013_a5', level: 'advanced', added: '2026-10-13', source: 'LeetCode', company: '',
    ref: 'Consecutive Available Seats', url: 'https://leetcode.doocs.org/en/lc/603/',
    title: 'מושבים פנויים סמוכים', tables: ['d1013_cinema'],
    prompt: 'בטבלה d1013_cinema כל שורה היא מושב באולם, עם free = 1 אם הוא פנוי ו-0 אם תפוס. שימו לב: ייתכן שמספרי מושבים מסוימים חסרים לגמרי באולם. מושב פנוי נחשב "סמוך" אם גם המושב שמספרו גדול ממנו ב-1 או גם המושב שמספרו קטן ממנו ב-1 קיים ופנוי. החזירו את seat_id של כל המושבים הפנויים הסמוכים, ממוינים לפי seat_id.',
    solution: `SELECT c.seat_id
FROM d1013_cinema c
WHERE c.free = 1
  AND EXISTS (SELECT 1 FROM d1013_cinema n WHERE n.free = 1 AND n.seat_id IN (c.seat_id - 1, c.seat_id + 1))
ORDER BY c.seat_id;`,
    ordered: true,
  },
  // ===== 2026-10-14 =====
  {
    id: 'd20261014_b1', level: 'basic', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Find Customer Referee', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'לקוחות שלא הופנו על ידי לקוח 2', tables: ['d1014_customer'],
    prompt: 'בטבלה d1014_customer כל לקוח יכול להיות מופנה על ידי לקוח אחר (referee_id), או שאין לו מפנה (NULL). החזירו את name של כל הלקוחות שלא הופנו על ידי הלקוח שמספרו 2. לקוחות ללא מפנה נכללים.',
    solution: `SELECT name FROM d1014_customer WHERE referee_id IS NULL OR referee_id <> 2;`,
    ordered: false,
  },
  {
    id: 'd20261014_b2', level: 'basic', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Biggest Single Number', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'המספר הגדול ביותר שמופיע פעם אחת', tables: ['d1014_nums'],
    prompt: 'בטבלה d1014_nums עמודה אחת, num, וייתכנו בה ערכים כפולים. החזירו שורה אחת ובה המספר הגדול ביותר מבין המספרים שמופיעים בטבלה בדיוק פעם אחת. אם אין מספר כזה, יוחזר NULL.',
    solution: `SELECT MAX(num) AS num FROM (SELECT num FROM d1014_nums GROUP BY num HAVING COUNT(*) = 1);`,
    ordered: false,
  },
  {
    id: 'd20261014_b3', level: 'basic', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Customer Placing the Largest Number of Orders', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'הלקוח עם הכי הרבה הזמנות', tables: ['d1014_cust_orders'],
    prompt: 'בטבלה d1014_cust_orders כל שורה היא הזמנה של לקוח. החזירו שורה אחת עם הלקוח שביצע הכי הרבה הזמנות: customer_number ו-orders_count (מספר ההזמנות שלו). מובטח שיש לקוח יחיד כזה.',
    solution: `SELECT customer_number, COUNT(*) AS orders_count
FROM d1014_cust_orders
GROUP BY customer_number
ORDER BY orders_count DESC
LIMIT 1;`,
    ordered: false,
  },
  {
    id: 'd20261014_b4', level: 'basic', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Queries Quality and Percentage', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'איכות חיפושים ואחוז חיפושים גרועים', tables: ['d1014_queries'],
    prompt: 'בטבלה d1014_queries כל שורה היא תוצאה שהוחזרה לחיפוש (query_name), עם המיקום שלה ברשימה (position) והדירוג שנתן המשתמש (rating, בין 1 ל-5). לכל query_name החזירו: query_name, quality (ממוצע של rating חלקי position, בחילוק עשרוני, מעוגל ל-2 ספרות) ו-poor_query_percentage (אחוז התוצאות עם rating קטן מ-3, מעוגל ל-2 ספרות).',
    solution: `SELECT query_name,
       ROUND(AVG(rating * 1.0 / position), 2) AS quality,
       ROUND(100.0 * SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) / COUNT(*), 2) AS poor_query_percentage
FROM d1014_queries
GROUP BY query_name;`,
    ordered: false,
  },
  {
    id: 'd20261014_b5', level: 'basic', added: '2026-10-14', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סיכום עסקאות ועמלות לפי מטבע', tables: ['d1014_fees'],
    prompt: 'בטבלה d1014_fees כל שורה היא עסקה עם סכום (amount) ועמלה (fee). עסקה ללא עמלה מסומנת ב-NULL, ופירושה עמלה 0. לכל currency החזירו: currency, txns (מספר העסקות), net_amount (סכום amount פחות העמלה, מסוכם על כל העסקאות) ו-pct_no_fee (אחוז העסקאות שבהן fee הוא NULL, מעוגל ל-2 ספרות).',
    solution: `SELECT currency,
       COUNT(*) AS txns,
       SUM(amount - COALESCE(fee, 0)) AS net_amount,
       ROUND(100.0 * SUM(CASE WHEN fee IS NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS pct_no_fee
FROM d1014_fees
GROUP BY currency;`,
    ordered: false,
  },
  {
    id: 'd20261014_i1', level: 'intermediate', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Customers Who Bought All Products', url: 'https://zenn.dev/benn/scraps/0ca0b8e0a011db',
    title: 'לקוחות שקנו את כל המוצרים', tables: ['d1014_purchases', 'd1014_catalog'],
    prompt: 'בטבלה d1014_catalog כל מוצרי החנות, ובטבלה d1014_purchases רכישות של לקוחות (ייתכן שלקוח קנה את אותו מוצר כמה פעמים). החזירו את customer_id של הלקוחות שקנו כל מוצר בקטלוג לפחות פעם אחת.',
    solution: `SELECT customer_id
FROM d1014_purchases
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM d1014_catalog);`,
    ordered: false,
  },
  {
    id: 'd20261014_i2', level: 'intermediate', added: '2026-10-14', source: 'Interview Query', company: 'Meta',
    ref: 'Neighborhoods with 0 users', url: 'https://www.interviewquery.com/guides/meta-data-analyst?exp_page=1',
    title: 'שכונות בלי משתמשים', tables: ['d1014_neighborhoods', 'd1014_nb_users'],
    prompt: 'בטבלה d1014_neighborhoods רשימת שכונות, ובטבלה d1014_nb_users המשתמשים והשכונה שלהם (ייתכן שלמשתמש אין שכונה מוגדרת). החזירו את name של כל השכונות שאין בהן אף משתמש.',
    solution: `SELECT n.name
FROM d1014_neighborhoods n
LEFT JOIN d1014_nb_users u ON u.neighborhood_id = n.neighborhood_id
WHERE u.user_id IS NULL;`,
    ordered: false,
  },
  {
    id: 'd20261014_i3', level: 'intermediate', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Employees Whose Manager Left the Company', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'עובדים שהמנהל שלהם עזב', tables: ['d1014_emp'],
    prompt: 'בטבלה d1014_emp כל עובד עם manager_id של המנהל שלו (NULL אם אין מנהל). עובד שהמנהל שלו עזב הוא עובד שיש לו manager_id, אך אין בטבלה עובד עם מספר כזה. החזירו את employee_id של עובדים כאלה ששכרם קטן מ-30000 (שכר של בדיוק 30000 לא נכלל), ממוינים לפי employee_id.',
    solution: `SELECT e.employee_id
FROM d1014_emp e
WHERE e.salary < 30000
  AND e.manager_id IS NOT NULL
  AND e.manager_id NOT IN (SELECT employee_id FROM d1014_emp)
ORDER BY e.employee_id;`,
    ordered: true,
  },
  {
    id: 'd20261014_i4', level: 'intermediate', added: '2026-10-14', source: 'Interview Query', company: 'Walmart',
    ref: 'Do users order more to their primary address than to other addresses?', url: 'https://www.interviewquery.com/interview-guides/walmart-data-analyst',
    title: 'הזמנות לכתובת הראשית מול כתובות אחרות', tables: ['d1014_wm_users', 'd1014_wm_txns'],
    prompt: 'בטבלה d1014_wm_users לכל משתמש כתובת ראשית (primary_address), ובטבלה d1014_wm_txns הזמנות עם כתובת המשלוח (ship_address). לכל משתמש שביצע לפחות הזמנה אחת, חשבו כמה הזמנות נשלחו לכתובת הראשית שלו וכמה לכתובות אחרות. החזירו רק משתמשים שמספר ההזמנות לכתובת הראשית גדול ממספר ההזמנות לכתובות אחרות: user_id, primary_orders, other_orders. מיינו לפי user_id.',
    solution: `SELECT u.user_id,
       SUM(CASE WHEN t.ship_address = u.primary_address THEN 1 ELSE 0 END) AS primary_orders,
       SUM(CASE WHEN t.ship_address <> u.primary_address THEN 1 ELSE 0 END) AS other_orders
FROM d1014_wm_users u
JOIN d1014_wm_txns t ON t.user_id = u.user_id
GROUP BY u.user_id
HAVING primary_orders > other_orders
ORDER BY u.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261014_i5', level: 'intermediate', added: '2026-10-14', source: 'HackerRank', company: '',
    ref: "Ollivander's Inventory", url: 'https://github.com/satyarthiabhay/Hackerrank-SQL-Challenges',
    title: 'המכשיר הזול ביותר לכל מהירות ושנה', tables: ['d1014_gadgets', 'd1014_models'],
    prompt: 'בטבלה d1014_gadgets מכשירים עם מחיר (price), מהירות (speed) וקוד דגם, ובטבלה d1014_models לכל דגם שנת יציאה (release_year) והאם הופסק (discontinued = 1). התעלמו ממכשירים של דגמים שהופסקו. לכל צירוף של speed ו-release_year החזירו את המכשיר הזול ביותר: gadget_id, release_year, price, speed. מיינו לפי speed יורד ואז release_year יורד.',
    solution: `SELECT g.gadget_id, m.release_year, g.price, g.speed
FROM d1014_gadgets g
JOIN d1014_models m ON m.model_code = g.model_code
WHERE m.discontinued = 0
  AND g.price = (
    SELECT MIN(g2.price)
    FROM d1014_gadgets g2
    JOIN d1014_models m2 ON m2.model_code = g2.model_code
    WHERE m2.discontinued = 0 AND g2.speed = g.speed AND m2.release_year = m.release_year
  )
ORDER BY g.speed DESC, m.release_year DESC;`,
    ordered: true,
  },
  {
    id: 'd20261014_a1', level: 'advanced', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Game Play Analysis IV', url: 'https://medium.com/@Dhruv_work/leetcode-sql-solutions-e979b18b1239',
    title: 'שיעור שחקנים שחזרו למחרת ההתחברות הראשונה', tables: ['d1014_plays'],
    prompt: 'בטבלה d1014_plays כל שורה היא יום פעילות של שחקן (ייתכנו כמה שורות לאותו שחקן באותו יום ממכשירים שונים). החזירו שורה אחת עם העמודה fraction: חלק השחקנים שהתחברו שוב ביום שמיד אחרי יום ההתחברות הראשון שלהם, מחולק בסך כל השחקנים, מעוגל ל-2 ספרות.',
    solution: `WITH f AS (
  SELECT player_id, MIN(event_date) AS first_day FROM d1014_plays GROUP BY player_id
)
SELECT ROUND(1.0 * COUNT(DISTINCT p.player_id) / (SELECT COUNT(*) FROM f), 2) AS fraction
FROM f
JOIN d1014_plays p ON p.player_id = f.player_id AND p.event_date = date(f.first_day, '+1 day');`,
    ordered: false,
  },
  {
    id: 'd20261014_a2', level: 'advanced', added: '2026-10-14', source: 'Interview Query', company: 'Twitter',
    ref: 'New Notification (SQL case study: unsubscribes and login rate)', url: 'https://interviewquery.com/questions/new-notification',
    title: 'השפעת ביטולי הרשמה על שיעור ההתחברות', tables: ['d1014_notif_events', 'd1014_notif_variants'],
    prompt: 'בטבלה d1014_notif_events אירועי משתמשים בניסוי התראות: action הוא login, nologin (נכנס לאפליקציה ולא התחבר) או unsubscribe. בטבלה d1014_notif_variants הקבוצה של כל משתמש (control או test). לכל קבוצה ולכל חודש (בפורמט YYYY-MM של created_at) החזירו: variant, month, unsubscribes (מספר אירועי unsubscribe) ו-login_rate_pct (אחוז אירועי login מתוך אירועי login ו-nologin יחד, מעוגל ל-2 ספרות; אירועי unsubscribe לא נספרים במכנה). מיינו לפי variant ואז month.',
    solution: `SELECT v.variant,
       substr(e.created_at, 1, 7) AS month,
       SUM(CASE WHEN e.action = 'unsubscribe' THEN 1 ELSE 0 END) AS unsubscribes,
       ROUND(100.0 * SUM(CASE WHEN e.action = 'login' THEN 1 ELSE 0 END)
             / SUM(CASE WHEN e.action IN ('login', 'nologin') THEN 1 ELSE 0 END), 2) AS login_rate_pct
FROM d1014_notif_events e
JOIN d1014_notif_variants v ON v.user_id = e.user_id
GROUP BY v.variant, substr(e.created_at, 1, 7)
ORDER BY v.variant, month;`,
    ordered: true,
  },
  {
    id: 'd20261014_a3', level: 'advanced', added: '2026-10-14', source: 'HackerRank', company: '',
    ref: 'Placements', url: 'https://github.com/satyarthiabhay/Hackerrank-SQL-Challenges',
    title: 'עובדים שחבר הרוויח יותר מהם', tables: ['d1014_ppl', 'd1014_ppl_buddy', 'd1014_ppl_pay'],
    prompt: 'בטבלה d1014_ppl עובדים, בטבלה d1014_ppl_buddy לכל עובד החבר הקרוב שלו (buddy_id), ובטבלה d1014_ppl_pay השכר של כל עובד. החזירו את name של העובדים שהשכר של החבר הקרוב שלהם גבוה משלהם (שכר שווה לא נחשב), ממוינים לפי השכר של החבר, מהנמוך לגבוה.',
    solution: `SELECT p.name
FROM d1014_ppl p
JOIN d1014_ppl_buddy b ON b.id = p.id
JOIN d1014_ppl_pay mine ON mine.id = p.id
JOIN d1014_ppl_pay theirs ON theirs.id = b.buddy_id
WHERE theirs.salary > mine.salary
ORDER BY theirs.salary;`,
    ordered: true,
  },
  {
    id: 'd20261014_a4', level: 'advanced', added: '2026-10-14', source: 'LeetCode', company: '',
    ref: 'Investments in 2016', url: 'https://github.com/ieshreya/sql-50-leetcode',
    title: 'סכום השקעות לפי תנאי ערך ומיקום', tables: ['d1014_policies'],
    prompt: 'בטבלה d1014_policies כל שורה היא פוליסה עם ערך מבוטח ב-2015 (tiv_2015), ערך מבוטח ב-2016 (tiv_2016) ומיקום (lat, lon). החזירו שורה אחת עם tiv_2016, והיא סכום tiv_2016 של פוליסות שמתקיימים בהן שני התנאים: יש לפחות פוליסה אחרת עם אותו tiv_2015, ואין אף פוליסה אחרת עם אותו מיקום (אותם lat ו-lon). הסכום מעוגל ל-2 ספרות.',
    solution: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM (
  SELECT tiv_2016,
         COUNT(*) OVER (PARTITION BY tiv_2015) AS same_2015,
         COUNT(*) OVER (PARTITION BY lat, lon) AS same_loc
  FROM d1014_policies
)
WHERE same_2015 > 1 AND same_loc = 1;`,
    ordered: false,
  },
  {
    id: 'd20261014_a5', level: 'advanced', added: '2026-10-14', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סשנים לפי פער של 30 דקות', tables: ['d1014_clicks'],
    prompt: 'בטבלה d1014_clicks כל שורה היא קליק של משתמש (ts בפורמט YYYY-MM-DD HH:MM:SS). קליקים של אותו משתמש שייכים לאותו סשן כל עוד הפער בין קליק לקליק שלפניו אינו עולה על 30 דקות (פער של בדיוק 30 דקות נשאר באותו סשן); פער גדול יותר פותח סשן חדש. לכל משתמש החזירו: user_id, sessions (מספר הסשנים) ו-longest_session_minutes (משך הסשן הארוך ביותר בדקות, מהקליק הראשון עד האחרון בסשן, כמספר שלם). מיינו לפי user_id.',
    solution: `WITH o AS (
  SELECT user_id, ts,
         CASE WHEN LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) IS NULL
                OR strftime('%s', ts) - strftime('%s', LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)) > 1800
              THEN 1 ELSE 0 END AS new_session
  FROM d1014_clicks
), s AS (
  SELECT user_id, ts, SUM(new_session) OVER (PARTITION BY user_id ORDER BY ts) AS sid FROM o
), d AS (
  SELECT user_id, sid, (strftime('%s', MAX(ts)) - strftime('%s', MIN(ts))) / 60 AS mins
  FROM s GROUP BY user_id, sid
)
SELECT user_id, COUNT(*) AS sessions, MAX(mins) AS longest_session_minutes
FROM d GROUP BY user_id ORDER BY user_id;`,
    ordered: true,
  },
  // ===== 2026-10-15 =====
  {
    id: 'd20261015_b1', level: 'basic', added: '2026-10-15', source: 'StrataScratch', company: 'Microsoft',
    ref: 'Unique users per client per month', url: 'https://www.stratascratch.com/blog/microsoft-data-analyst-interview-questions',
    title: 'משתמשים ייחודיים לפי לקוח וחודש', tables: ['d1015_ms_events'],
    prompt: 'בטבלה d1015_ms_events כל שורה היא אירוע שביצע משתמש (user_id) דרך סוג לקוח (client_id), בתאריך event_date בפורמט YYYY-MM-DD. לכל צירוף של חודש (בפורמט YYYY-MM) וסוג לקוח החזירו: month, client_id ו-unique_users (מספר המשתמשים השונים). מיינו לפי month ואז לפי client_id, שניהם בסדר עולה.',
    solution: `SELECT strftime('%Y-%m', event_date) AS month, client_id, COUNT(DISTINCT user_id) AS unique_users
FROM d1015_ms_events
GROUP BY month, client_id
ORDER BY month, client_id;`,
    ordered: true,
  },
  {
    id: 'd20261015_b2', level: 'basic', added: '2026-10-15', source: 'HackerRank', company: '',
    ref: 'Weather Observation Station 5', url: 'https://github.com/satyarthiabhay/Hackerrank-SQL-Challenges',
    title: 'העיר הקצרה והארוכה ביותר', tables: ['d1015_station'],
    prompt: 'בטבלה d1015_station יש שמות ערים. החזירו שתי שורות עם העמודות city ו-name_length (מספר התווים בשם): בשורה הראשונה העיר בעלת השם הקצר ביותר, ובשנייה העיר בעלת השם הארוך ביותר. אם יש כמה ערים עם אותו אורך, בחרו את זו שהראשונה לפי סדר אלפביתי. הרווח בשם נספר כתו.',
    solution: `SELECT city, name_length FROM (SELECT city, LENGTH(city) AS name_length FROM d1015_station ORDER BY LENGTH(city) ASC, city ASC LIMIT 1)
UNION ALL
SELECT city, name_length FROM (SELECT city, LENGTH(city) AS name_length FROM d1015_station ORDER BY LENGTH(city) DESC, city ASC LIMIT 1);`,
    ordered: true,
  },
  {
    id: 'd20261015_b3', level: 'basic', added: '2026-10-15', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'קטגוריות עם מכירות גבוהות', tables: ['d1015_shop_orders'],
    prompt: 'בטבלה d1015_shop_orders יש הזמנות בחנות מקוונת. התייחסו רק להזמנות שהושלמו (status = \'completed\'). לכל קטגוריה שסך הסכומים (amount) שלה בהזמנות אלה גדול מ-100 בהחלט, החזירו: category, orders (מספר ההזמנות) ו-total (סך הסכומים). מיינו לפי total מהגבוה לנמוך.',
    solution: `SELECT category, COUNT(*) AS orders, SUM(amount) AS total
FROM d1015_shop_orders
WHERE status = 'completed'
GROUP BY category
HAVING SUM(amount) > 100
ORDER BY total DESC;`,
    ordered: true,
  },
  {
    id: 'd20261015_b4', level: 'basic', added: '2026-10-15', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שכר כולל עם בונוס חסר', tables: ['d1015_emps'],
    prompt: 'בטבלה d1015_emps יש עובדים עם שכר בסיס (salary) ובונוס (bonus), כשלעובדים מסוימים אין בונוס (ערך ריק, שנחשב כ-0). עבור עובדי מחלקות Sales ו-Support בלבד, החזירו את name ואת השכר הכולל total_pay (שכר בסיס ועוד בונוס) רק למי שהשכר הכולל שלו לפחות 5000. מיינו לפי total_pay מהגבוה לנמוך, ובשוויון לפי name אלפביתי.',
    solution: `SELECT name, salary + COALESCE(bonus, 0) AS total_pay
FROM d1015_emps
WHERE dept IN ('Sales', 'Support') AND salary + COALESCE(bonus, 0) >= 5000
ORDER BY total_pay DESC, name;`,
    ordered: true,
  },
  {
    id: 'd20261015_b5', level: 'basic', added: '2026-10-15', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פילוח מוצרים לפי טווח מחיר', tables: ['d1015_products'],
    prompt: 'בטבלה d1015_products יש מוצרים ומחיריהם. סווגו כל מוצר לטווח מחיר: \'cheap\' אם המחיר נמוך מ-40, \'mid\' אם המחיר לפחות 40 ונמוך מ-100, ו-\'premium\' אם המחיר לפחות 100. החזירו שורה לכל טווח עם העמודות tier ו-products (מספר המוצרים בטווח).',
    solution: `SELECT CASE WHEN price < 40 THEN 'cheap' WHEN price < 100 THEN 'mid' ELSE 'premium' END AS tier, COUNT(*) AS products
FROM d1015_products
GROUP BY tier;`,
    ordered: false,
  },
  {
    id: 'd20261015_i1', level: 'intermediate', added: '2026-10-15', source: 'StrataScratch', company: 'Microsoft',
    ref: 'Bottom 2 companies by mobile usage', url: 'https://www.stratascratch.com/blog/microsoft-sql-interview-questions-for-data-science-position/',
    title: 'שתי החברות עם השימוש הנמוך ביותר במובייל', tables: ['d1015_ms_events'],
    prompt: 'בטבלה d1015_ms_events כל שורה היא אירוע, ו-customer_id מזהה את החברה (הלקוח העסקי). אירוע מובייל הוא אירוע עם client_id = \'mobile\'. דרגו את החברות שיש להן לפחות אירוע מובייל אחד לפי מספר אירועי המובייל שלהן, מהנמוך לגבוה, כך שחברות עם אותו מספר אירועים מקבלות אותו דירוג והדירוג הבא רצוף (1, 1, 2, ...). החזירו את customer_id ואת mobile_events של כל החברות שדירוגן 1 או 2.',
    solution: `WITH c AS (
  SELECT customer_id, COUNT(*) AS mobile_events
  FROM d1015_ms_events WHERE client_id = 'mobile' GROUP BY customer_id
), r AS (
  SELECT customer_id, mobile_events, DENSE_RANK() OVER (ORDER BY mobile_events) AS rnk FROM c
)
SELECT customer_id, mobile_events FROM r WHERE rnk <= 2;`,
    ordered: false,
  },
  {
    id: 'd20261015_i2', level: 'intermediate', added: '2026-10-15', source: 'HackerRank', company: '',
    ref: 'New Companies', url: 'https://github.com/cuongtrans/hackerrank-sql-challenges',
    title: 'מבנה ניהולי לכל חברה', tables: ['d1015_company', 'd1015_lead', 'd1015_senior', 'd1015_mgr', 'd1015_emp'],
    prompt: 'לכל חברה בטבלה d1015_company יש מנהלי לידים (d1015_lead), מנהלים בכירים (d1015_senior), מנהלים (d1015_mgr) ועובדים (d1015_emp), וכל קוד יכול להופיע בטבלה יותר מפעם אחת. לכל חברה, כולל חברות שאין להן אף אחד מהם, החזירו: company_code, founder ובנוסף את מספר הקודים השונים של מנהלי הלידים (leads), הבכירים (seniors), המנהלים (managers) והעובדים (employees). מיינו לפי company_code.',
    solution: `SELECT c.company_code, c.founder,
  (SELECT COUNT(DISTINCT lead_code) FROM d1015_lead l WHERE l.company_code = c.company_code) AS leads,
  (SELECT COUNT(DISTINCT senior_code) FROM d1015_senior s WHERE s.company_code = c.company_code) AS seniors,
  (SELECT COUNT(DISTINCT manager_code) FROM d1015_mgr m WHERE m.company_code = c.company_code) AS managers,
  (SELECT COUNT(DISTINCT employee_code) FROM d1015_emp e WHERE e.company_code = c.company_code) AS employees
FROM d1015_company c
ORDER BY c.company_code;`,
    ordered: true,
  },
  {
    id: 'd20261015_i3', level: 'intermediate', added: '2026-10-15', source: 'GeeksforGeeks', company: 'Google',
    ref: 'Find employees who report to more than one manager', url: 'https://geeksforgeeks.org/google-sql-interview-questions',
    title: 'עובדים עם יותר ממנהל אחד', tables: ['d1015_reports'],
    prompt: 'בטבלה d1015_reports כל שורה אומרת שעובד (emp_name) מדווח למנהל (mgr_name); שורות יכולות לחזור על עצמן, ולפעמים המנהל לא ידוע (ערך ריק). החזירו את העובדים שמדווחים ליותר ממנהל אחד שונה ידוע: emp_name ו-managers (מספר המנהלים השונים).',
    solution: `SELECT emp_name, COUNT(DISTINCT mgr_name) AS managers
FROM d1015_reports
GROUP BY emp_name
HAVING COUNT(DISTINCT mgr_name) > 1;`,
    ordered: false,
  },
  {
    id: 'd20261015_i4', level: 'intermediate', added: '2026-10-15', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות בלי הזמנה שהושלמה', tables: ['d1015_cust', 'd1015_shop_orders'],
    prompt: 'בטבלה d1015_cust יש לקוחות של חנות, ובטבלה d1015_shop_orders יש הזמנות (העמודה customer מכילה את שם הלקוח). החזירו את name ו-city של כל לקוח שאין לו אף הזמנה שהושלמה (status = \'completed\'), כולל לקוחות שלא ביצעו הזמנות כלל.',
    solution: `SELECT c.name, c.city
FROM d1015_cust c
WHERE NOT EXISTS (SELECT 1 FROM d1015_shop_orders o WHERE o.customer = c.name AND o.status = 'completed');`,
    ordered: false,
  },
  {
    id: 'd20261015_i5', level: 'intermediate', added: '2026-10-15', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'אחוז הזמנות שהושלמו לפי קטגוריה', tables: ['d1015_shop_orders'],
    prompt: 'בטבלה d1015_shop_orders יש הזמנות בסטטוסים שונים. עבור קטגוריות שיש בהן לפחות 3 הזמנות (בכל סטטוס), החזירו: category, total_orders ו-completed_pct, שהוא אחוז ההזמנות שהושלמו (status = \'completed\') מתוך כל ההזמנות בקטגוריה, מעוגן לשתי ספרות אחרי הנקודה.',
    solution: `SELECT category, COUNT(*) AS total_orders,
  ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) / COUNT(*), 2) AS completed_pct
FROM d1015_shop_orders
GROUP BY category
HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261015_a1', level: 'advanced', added: '2026-10-15', source: 'LeetCode', company: '',
    ref: 'Tournament Winners', url: 'https://walkccc.me/LeetCode/problems/1194/',
    title: 'המנצח בכל קבוצה בטורניר', tables: ['d1015_players', 'd1015_matches'],
    prompt: 'בטבלה d1015_players כל שחקן משויך לקבוצה (group_id). בטבלה d1015_matches כל משחק הוא בין שני שחקנים מאותה קבוצה, עם הנקודות שכל אחד השיג (first_score, second_score). סך הנקודות של שחקן הוא סכום הנקודות שלו מכל המשחקים שלו, בין אם שיחק כראשון ובין אם כשני. לכל קבוצה החזירו את group_id ואת player_id של השחקן עם סך הנקודות הגבוה ביותר; בשוויון נבחר השחקן עם ה-player_id הנמוך יותר. מיינו לפי group_id.',
    solution: `WITH pts AS (
  SELECT first_player AS player_id, first_score AS score FROM d1015_matches
  UNION ALL
  SELECT second_player, second_score FROM d1015_matches
), tot AS (
  SELECT p.group_id, p.player_id, COALESCE(SUM(x.score), 0) AS total
  FROM d1015_players p LEFT JOIN pts x ON x.player_id = p.player_id
  GROUP BY p.group_id, p.player_id
), r AS (
  SELECT group_id, player_id, ROW_NUMBER() OVER (PARTITION BY group_id ORDER BY total DESC, player_id) AS rn FROM tot
)
SELECT group_id, player_id FROM r WHERE rn = 1 ORDER BY group_id;`,
    ordered: true,
  },
  {
    id: 'd20261015_a2', level: 'advanced', added: '2026-10-15', source: 'StrataScratch', company: 'Amazon',
    ref: 'Player with Longest Streak', url: 'https://www.stratascratch.com/blog/amazon-data-analyst-interview-questions',
    title: 'השחקן עם רצף הניצחונות הארוך ביותר', tables: ['d1015_pmatches'],
    prompt: 'בטבלה d1015_pmatches כל שורה היא משחק של שחקן, כשמספר המשחק (match_no) מציין את סדר המשחקים של אותו שחקן, ותוצאתו (result) היא \'W\' לניצחון או \'L\' להפסד. רצף ניצחונות הוא משחקים רצופים של אותו שחקן שכולם ניצחון. החזירו שורה אחת: player_id של השחקן עם רצף הניצחונות הארוך ביותר ו-longest_streak (אורך הרצף). בנתונים אין תיקו על המקום הראשון.',
    solution: `WITH g AS (
  SELECT player_id, result,
    ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_no)
    - ROW_NUMBER() OVER (PARTITION BY player_id, result ORDER BY match_no) AS grp
  FROM d1015_pmatches
), s AS (
  SELECT player_id, COUNT(*) AS streak FROM g WHERE result = 'W' GROUP BY player_id, grp
)
SELECT player_id, MAX(streak) AS longest_streak FROM s GROUP BY player_id ORDER BY longest_streak DESC LIMIT 1;`,
    ordered: false,
  },
  {
    id: 'd20261015_a3', level: 'advanced', added: '2026-10-15', source: 'PracHub', company: 'Capital One',
    ref: 'Calculate longest transaction streak for each user', url: 'https://prachub.com/interview-questions/calculate-longest-transaction-streak-for-each-user',
    title: 'רצף ימים ארוך ביותר של עסקאות מוצלחות', tables: ['d1015_txn'],
    prompt: 'בטבלה d1015_txn יש עסקאות של משתמשים עם תאריך txn_date (YYYY-MM-DD) וסטטוס. התייחסו רק לעסקאות עם status = \'success\'; כמה עסקאות מוצלחות באותו יום נחשבות כיום אחד. לכל משתמש שיש לו לפחות עסקה מוצלחת אחת, החזירו: user_id ו-longest_streak, מספר הימים הרצופים (ימי לוח) הארוך ביותר שבהם היתה לו עסקה מוצלחת. מיינו לפי user_id.',
    solution: `WITH d AS (
  SELECT DISTINCT user_id, txn_date FROM d1015_txn WHERE status = 'success'
), g AS (
  SELECT user_id, txn_date,
    date(txn_date, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY txn_date) || ' days') AS grp
  FROM d
), s AS (
  SELECT user_id, COUNT(*) AS streak FROM g GROUP BY user_id, grp
)
SELECT user_id, MAX(streak) AS longest_streak FROM s GROUP BY user_id ORDER BY user_id;`,
    ordered: true,
  },
  {
    id: 'd20261015_a4', level: 'advanced', added: '2026-10-15', source: 'Dataford', company: 'Netflix',
    ref: 'Top three genres per country in the last month', url: 'https://dataford.io/interview-guides/netflix/data-analyst',
    title: 'שלושת הז\'אנרים המובילים בכל מדינה', tables: ['d1015_views'],
    prompt: 'בטבלה d1015_views כל שורה היא צפייה בתוכן (מדינה, ז\'אנר ותאריך watched_at בפורמט YYYY-MM-DD). התייחסו לצפיות בספטמבר 2026 בלבד. לכל מדינה החזירו את שלושת הז\'אנרים עם מספר הצפיות הגבוה ביותר (או פחות משלושה אם במדינה יש פחות ז\'אנרים), כשבשוויון במספר הצפיות עדיף הז\'אנר הראשון לפי סדר אלפביתי. עמודות: country, genre, views. מיינו לפי country ואז לפי views מהגבוה לנמוך ואז לפי genre.',
    solution: `WITH g AS (
  SELECT country, genre, COUNT(*) AS views
  FROM d1015_views WHERE watched_at >= '2026-09-01' AND watched_at < '2026-10-01'
  GROUP BY country, genre
), r AS (
  SELECT country, genre, views, ROW_NUMBER() OVER (PARTITION BY country ORDER BY views DESC, genre) AS rn FROM g
)
SELECT country, genre, views FROM r WHERE rn <= 3 ORDER BY country, views DESC, genre;`,
    ordered: true,
  },
  {
    id: 'd20261015_a5', level: 'advanced', added: '2026-10-15', source: 'Dataford', company: 'Netflix',
    ref: 'Cohort retention from subscription start, cancel and pause events', url: 'https://dataford.io/interview-guides/netflix/data-analyst',
    title: 'שימור מנויים לפי חודש הצטרפות', tables: ['d1015_sub_events'],
    prompt: 'בטבלה d1015_sub_events יש אירועי מנוי (event_type: \'start\', \'pause\', \'resume\' או \'cancel\') עם תאריכים. חודש ההצטרפות של משתמש הוא החודש (YYYY-MM) של אירוע ה-start הראשון שלו. משתמש נחשב פעיל כרגע אם האירוע האחרון שלו (לפי תאריך) אינו \'cancel\'. לכל חודש הצטרפות החזירו: cohort_month, subscribers (מספר המשתמשים), active_users (כמה מהם פעילים כרגע) ו-active_pct (אחוז הפעילים, מעוגן לשתי ספרות אחרי הנקודה). מיינו לפי cohort_month.',
    solution: `WITH last_ev AS (
  SELECT user_id, event_type,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_date DESC) AS rn
  FROM d1015_sub_events
), first_start AS (
  SELECT user_id, strftime('%Y-%m', MIN(event_date)) AS cohort_month
  FROM d1015_sub_events WHERE event_type = 'start' GROUP BY user_id
)
SELECT f.cohort_month, COUNT(*) AS subscribers,
  SUM(CASE WHEN l.event_type <> 'cancel' THEN 1 ELSE 0 END) AS active_users,
  ROUND(100.0 * SUM(CASE WHEN l.event_type <> 'cancel' THEN 1 ELSE 0 END) / COUNT(*), 2) AS active_pct
FROM first_start f JOIN last_ev l ON l.user_id = f.user_id AND l.rn = 1
GROUP BY f.cohort_month ORDER BY f.cohort_month;`,
    ordered: true,
  },
  {
    id: 'd20261016_b1', level: 'basic', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'Top Earners', url: 'https://github.com/KursadKalender/HackerRank-SQL-Challenges-Solutions-',
    title: 'ההכנסה הכוללת הגבוהה ביותר', tables: ['d1016_staff'],
    prompt: `בטבלה d1016_staff יש לכל עובד מספר חודשי עבודה (months) ושכר חודשי (salary). ההכנסה הכוללת של עובד היא months * salary. החזירו שורה אחת עם שתי עמודות לפי הסדר: max_earnings (ההכנסה הכוללת הגבוהה ביותר) ו-employees (כמה עובדים השיגו בדיוק את ההכנסה הזו).`,
    solution: `SELECT MAX(months * salary) AS max_earnings, COUNT(*) AS employees
FROM d1016_staff
WHERE months * salary = (SELECT MAX(months * salary) FROM d1016_staff);`,
    ordered: false,
  },
  {
    id: 'd20261016_b2', level: 'basic', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'The Blunder', url: 'https://github.com/KursadKalender/HackerRank-SQL-Challenges-Solutions-',
    title: 'טעות בהקלדה: ספרות אפס חסרות', tables: ['d1016_units'],
    prompt: `בטבלה d1016_units יש כמויות מלאי (units). מקלדת פגומה לא מקלידה את הספרה 0, ולכן במערכת הדיווח כל כמות הופיעה בלי הספרות 0 שלה (למשל 1050 הפכה ל-15). החזירו עמודה אחת בשם diff: ההפרש בין ממוצע הכמויות האמיתיות לממוצע הכמויות כפי שדווחו בלי האפסים, מעוגן לשתי ספרות אחרי הנקודה.`,
    solution: `SELECT ROUND(AVG(units) - AVG(CAST(REPLACE(units, '0', '') AS INTEGER)), 2) AS diff
FROM d1016_units;`,
    ordered: false,
  },
  {
    id: 'd20261016_b3', level: 'basic', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'Population Density Difference', url: 'https://github.com/KursadKalender/HackerRank-SQL-Challenges-Solutions-',
    title: 'פער צפיפות אוכלוסין', tables: ['d1016_regions'],
    prompt: `בטבלה d1016_regions יש לכל אזור אוכלוסייה (population) ושטח בקמ"ר (area_sqkm). צפיפות אזור היא population חלקי area_sqkm. החזירו עמודה אחת בשם density_gap: ההפרש בין הצפיפות הגבוהה ביותר לנמוכה ביותר, מעוגן לשתי ספרות אחרי הנקודה.`,
    solution: `SELECT ROUND(MAX(population * 1.0 / area_sqkm) - MIN(population * 1.0 / area_sqkm), 2) AS density_gap
FROM d1016_regions;`,
    ordered: false,
  },
  {
    id: 'd20261016_b4', level: 'basic', added: '2026-10-16', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'זמני טיפול בפניות לפי ערוץ', tables: ['d1016_support'],
    prompt: `בטבלה d1016_support יש פניות תמיכה. אם resolved_hours ריק (NULL), הפנייה עדיין לא טופלה. לכל ערוץ (channel) שיש בו לפחות 3 פניות, החזירו: channel, tickets (מספר הפניות), resolved (מספר הפניות שטופלו) ו-avg_hours (ממוצע שעות הטיפול של הפניות שטופלו, מעוגן לספרה אחת אחרי הנקודה). מיינו לפי tickets מהגבוה לנמוך ואחר כך לפי channel בסדר אלפביתי.`,
    solution: `SELECT channel, COUNT(*) AS tickets, COUNT(resolved_hours) AS resolved, ROUND(AVG(resolved_hours), 1) AS avg_hours
FROM d1016_support
GROUP BY channel
HAVING COUNT(*) >= 3
ORDER BY tickets DESC, channel;`,
    ordered: true,
  },
  {
    id: 'd20261016_b5', level: 'basic', added: '2026-10-16', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סטטוס סוללה של מכשירים', tables: ['d1016_devices'],
    prompt: `בטבלה d1016_devices יש לכל מכשיר אחוז סוללה (battery_pct), ולעיתים הערך חסר (NULL). סווגו כל מכשיר: 'critical' אם הסוללה מתחת ל-20, 'low' אם היא בין 20 ל-49 (כולל), 'ok' אם היא 50 ומעלה, ו-'unknown' אם הערך חסר. החזירו status ו-devices (מספר המכשירים בכל סטטוס), ממוינים לפי status בסדר אלפביתי.`,
    solution: `SELECT CASE WHEN battery_pct IS NULL THEN 'unknown'
            WHEN battery_pct < 20 THEN 'critical'
            WHEN battery_pct < 50 THEN 'low'
            ELSE 'ok' END AS status,
       COUNT(*) AS devices
FROM d1016_devices
GROUP BY status
ORDER BY status;`,
    ordered: true,
  },
  {
    id: 'd20261016_i1', level: 'intermediate', added: '2026-10-16', source: 'LeetCode', company: '',
    ref: 'Department Highest Salary', url: 'https://www.scribd.com/document/846267546/300-Leetcode-SQL-Problems-and-Solutions',
    title: 'המשתכרים הגבוהים בכל מחלקה', tables: ['d1016_workers', 'd1016_depts'],
    prompt: `בטבלאות d1016_workers (עובדים) ו-d1016_depts (מחלקות) מחברת dept_id ל-id של המחלקה. לכל מחלקה שיש בה עובדים, החזירו את העובדים בעלי השכר הגבוה ביותר במחלקה שלהם (אם כמה עובדים חולקים את השכר הגבוה, החזירו את כולם). העמודות: department (שם המחלקה), employee (שם העובד), salary.`,
    solution: `SELECT d.name AS department, w.name AS employee, w.salary
FROM d1016_workers w
JOIN d1016_depts d ON d.id = w.dept_id
WHERE w.salary = (SELECT MAX(salary) FROM d1016_workers w2 WHERE w2.dept_id = w.dept_id);`,
    ordered: false,
  },
  {
    id: 'd20261016_i2', level: 'intermediate', added: '2026-10-16', source: 'LeetCode', company: '',
    ref: 'Nth Highest Salary', url: 'https://www.scribd.com/document/846267546/300-Leetcode-SQL-Problems-and-Solutions',
    title: 'השכר השלישי בגובהו', tables: ['d1016_pay'],
    prompt: `בטבלה d1016_pay יש שכר (salary) של כל עובד, וכמה עובדים יכולים להרוויח את אותו שכר. החזירו עמודה אחת בשם third_highest: הערך השלישי בגובהו מבין השכרים השונים זה מזה (שכר שחוזר כמה פעמים נספר פעם אחת). אם אין שלושה שכרים שונים, החזירו NULL.`,
    solution: `SELECT (SELECT DISTINCT salary FROM d1016_pay ORDER BY salary DESC LIMIT 1 OFFSET 2) AS third_highest;`,
    ordered: false,
  },
  {
    id: 'd20261016_i3', level: 'intermediate', added: '2026-10-16', source: 'LeetCode', company: '',
    ref: 'Employees Earning More Than Their Managers', url: 'https://www.scribd.com/document/846267546/300-Leetcode-SQL-Problems-and-Solutions',
    title: 'עובדים שמרוויחים יותר מהמנהל', tables: ['d1016_workers'],
    prompt: `בטבלה d1016_workers העמודה manager_id מצביעה על id של המנהל הישיר של העובד (NULL למי שאין לו מנהל). החזירו את שמות העובדים (name) ששכרם גבוה ממש משכר המנהל הישיר שלהם.`,
    solution: `SELECT e.name
FROM d1016_workers e
JOIN d1016_workers m ON m.id = e.manager_id
WHERE e.salary > m.salary;`,
    ordered: false,
  },
  {
    id: 'd20261016_i4', level: 'intermediate', added: '2026-10-16', source: 'LeetCode', company: '',
    ref: 'Customers Who Never Order', url: 'https://www.scribd.com/document/846267546/300-Leetcode-SQL-Problems-and-Solutions',
    title: 'לקוחות שמעולם לא הזמינו', tables: ['d1016_cust', 'd1016_ord'],
    prompt: `בטבלה d1016_cust יש לקוחות, ובטבלה d1016_ord הזמנות (cust_id הוא ה-id של הלקוח; הזמנה של אורח לא מזוהה נשמרת עם cust_id ריק). החזירו את שמות הלקוחות (name) שאין להם אף הזמנה.`,
    solution: `SELECT c.name
FROM d1016_cust c
LEFT JOIN d1016_ord o ON o.cust_id = c.id
WHERE o.id IS NULL;`,
    ordered: false,
  },
  {
    id: 'd20261016_i5', level: 'intermediate', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'The PADS', url: 'https://github.com/satyarthiabhay/Hackerrank-SQL-Challenges',
    title: 'רשימת אנשים וסיכום מקצועות', tables: ['d1016_ppl'],
    prompt: `בטבלה d1016_ppl יש שם (name) ומקצוע (occupation) של כל אדם. החזירו עמודה אחת בשם line עם שני חלקים ברצף. חלק ראשון: שורה לכל אדם בצורה name(X) כאשר X היא האות הראשונה של המקצוע, ממוינות לפי name בסדר אלפביתי. חלק שני: שורה לכל מקצוע בצורה There are a total of N occupations. כאשר N הוא מספר האנשים במקצוע והמקצוע באותיות קטנות עם s בסוף (למשל There are a total of 3 doctors.), ממוינות לפי N מהקטן לגדול ואחר כך לפי שם המקצוע בסדר אלפביתי.`,
    solution: `SELECT line FROM (
  SELECT name || '(' || SUBSTR(occupation, 1, 1) || ')' AS line, 0 AS g, 0 AS n, name AS k FROM d1016_ppl
  UNION ALL
  SELECT 'There are a total of ' || COUNT(*) || ' ' || LOWER(occupation) || 's.', 1, COUNT(*), LOWER(occupation)
  FROM d1016_ppl GROUP BY occupation
) ORDER BY g, n, k;`,
    ordered: true,
  },
  {
    id: 'd20261016_a1', level: 'advanced', added: '2026-10-16', source: 'LeetCode', company: '',
    ref: 'Game Play Analysis III', url: 'https://leetcode.doocs.org/en/lc/534/',
    title: 'משחקים מצטברים לכל שחקן', tables: ['d1016_gameplay'],
    prompt: `בטבלה d1016_gameplay יש לכל שחקן, בכל תאריך פעילות (event_date), את מספר המשחקים ששיחק באותו יום (games_played). לכל שחקן ולכל תאריך החזירו את סך המשחקים ששיחק מתחילת הפעילות שלו ועד התאריך הזה, כולל. העמודות: player_id, event_date, games_so_far. מיינו לפי player_id ואחר כך לפי event_date.`,
    solution: `SELECT player_id, event_date,
  SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_so_far
FROM d1016_gameplay
ORDER BY player_id, event_date;`,
    ordered: true,
  },
  {
    id: 'd20261016_a2', level: 'advanced', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'Weather Observation Station 20', url: 'https://dev.to/elitenomad/hacker-rank-sql-median-calculation-1fcm',
    title: 'חציון זמן משלוח לכל עיר', tables: ['d1016_deliv_times'],
    prompt: `בטבלה d1016_deliv_times יש זמני משלוח בדקות (minutes) לפי עיר. לכל עיר החזירו את החציון של זמני המשלוח: הערך האמצעי כשהם ממוינים, ואם מספר המשלוחים בעיר זוגי, ממוצע שני הערכים האמצעיים. העמודות: city ו-median_minutes (מעוגן לשתי ספרות אחרי הנקודה). מיינו לפי city בסדר אלפביתי.`,
    solution: `WITH r AS (
  SELECT city, minutes,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY minutes) AS rn,
    COUNT(*) OVER (PARTITION BY city) AS cnt
  FROM d1016_deliv_times
)
SELECT city, ROUND(AVG(minutes), 2) AS median_minutes
FROM r
WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2)
GROUP BY city
ORDER BY city;`,
    ordered: true,
  },
  {
    id: 'd20261016_a3', level: 'advanced', added: '2026-10-16', source: 'StrataScratch', company: 'DoorDash',
    ref: 'Restaurants in the top 10% by generated revenue', url: 'https://www.stratascratch.com/blog/most-common-doordash-data-scientist-interview-questions',
    title: 'המסעדות ב-10% העליונים בהכנסות', tables: ['d1016_rest_rev'],
    prompt: `בטבלה d1016_rest_rev יש לכל מסעדה את ההכנסות שלה (revenue). דרגו את המסעדות לפי revenue מהגבוה לנמוך, כשדירוג 1 הוא ההכנסה הגבוהה ביותר, ובמקרה של שוויון המסעדה עם restaurant_id הקטן יותר מדורגת ראשונה (אין דירוגים משותפים). החזירו את המסעדות שהדירוג שלהן קטן או שווה ל-10% ממספר המסעדות הכולל. העמודות: restaurant_id, name, revenue. מיינו לפי הדירוג.`,
    solution: `SELECT restaurant_id, name, revenue FROM (
  SELECT *, ROW_NUMBER() OVER (ORDER BY revenue DESC, restaurant_id) AS rk,
    COUNT(*) OVER () AS total
  FROM d1016_rest_rev
) WHERE rk <= 0.1 * total
ORDER BY rk;`,
    ordered: true,
  },
  {
    id: 'd20261016_a4', level: 'advanced', added: '2026-10-16', source: 'HackerRank', company: '',
    ref: 'Draw The Triangle 1', url: 'https://github.com/cuongtrans/hackerrank-sql-challenges',
    title: 'משולש כוכביות', tables: ['d1016_params'],
    prompt: `בטבלה d1016_params יש ערך אחד, rows_n. החזירו עמודה אחת בשם line, בה rows_n שורות המרכיבות משולש של כוכביות (*): השורה הראשונה מכילה rows_n כוכביות רצופות בלי רווחים, כל שורה אחריה מכילה כוכבית אחת פחות, והאחרונה מכילה כוכבית אחת. השורות ממוינות מהארוכה לקצרה.`,
    solution: `WITH RECURSIVE t(n) AS (
  SELECT rows_n FROM d1016_params
  UNION ALL
  SELECT n - 1 FROM t WHERE n > 1
)
SELECT REPLACE(HEX(ZEROBLOB(n)), '00', '*') AS line
FROM t
ORDER BY n DESC;`,
    ordered: true,
  },
  {
    id: 'd20261016_a5', level: 'advanced', added: '2026-10-16', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סשנים של קליקים', tables: ['d1016_clicks'],
    prompt: `בטבלה d1016_clicks יש קליקים של משתמשים עם חותמת זמן (ts). קליק שמתרחש יותר מ-30 דקות (ממש, כלומר 30 דקות בדיוק עדיין לא) אחרי הקליק הקודם של אותו משתמש מתחיל סשן חדש; הקליק הראשון של משתמש תמיד מתחיל סשן. לכל משתמש החזירו: user_id, sessions (מספר הסשנים) ו-longest_session_clicks (מספר הקליקים בסשן הארוך ביותר שלו). מיינו לפי user_id.`,
    solution: `WITH g AS (
  SELECT user_id, ts,
    strftime('%s', ts) - LAG(strftime('%s', ts)) OVER (PARTITION BY user_id ORDER BY ts) AS gap
  FROM d1016_clicks
), s AS (
  SELECT user_id, ts,
    SUM(CASE WHEN gap IS NULL OR gap > 1800 THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY ts) AS sid
  FROM g
), c AS (
  SELECT user_id, sid, COUNT(*) AS clicks FROM s GROUP BY user_id, sid
)
SELECT user_id, COUNT(*) AS sessions, MAX(clicks) AS longest_session_clicks
FROM c GROUP BY user_id ORDER BY user_id;`,
    ordered: true,
  },
  {
    id: 'd20261017_b1', level: 'basic', added: '2026-10-17',
    source: 'LearnSQL', company: '',
    ref: 'Metric patterns: KPIs', url: 'https://learnsql.com/blog/sql-metrics-real-interviews',
    title: 'מדדי KPI של הזמנות', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders יש הזמנות. התייחסו רק להזמנות בסטטוס 'delivered'. החזירו שורה אחת עם העמודות: orders_cnt (מספר ההזמנות), customers (מספר הלקוחות השונים שהזמינו), revenue (סך הסכומים) ו-avg_order_value (סכום ממוצע להזמנה, מעוגל ל-2 ספרות).`,
    solution: `SELECT COUNT(*) AS orders_cnt, COUNT(DISTINCT customer_id) AS customers, SUM(amount) AS revenue, ROUND(AVG(amount), 2) AS avg_order_value
FROM d1017_orders WHERE status = 'delivered';`,
    ordered: false,
  },
  {
    id: 'd20261017_b2', level: 'basic', added: '2026-10-17',
    source: 'LearnSQL', company: '',
    ref: 'Metric patterns: breakdowns', url: 'https://learnsql.com/blog/sql-metrics-real-interviews',
    title: 'פילוח הכנסות לפי ערוץ', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders התייחסו רק להזמנות בסטטוס 'delivered'. לכל ערוץ מכירה (channel) שיש בו לפחות 3 הזמנות כאלה, החזירו: channel, orders_cnt (מספר ההזמנות) ו-revenue (סך הסכומים). מיינו לפי revenue יורד.`,
    solution: `SELECT channel, COUNT(*) AS orders_cnt, SUM(amount) AS revenue
FROM d1017_orders WHERE status = 'delivered'
GROUP BY channel HAVING COUNT(*) >= 3
ORDER BY revenue DESC;`,
    ordered: true,
  },
  {
    id: 'd20261017_b3', level: 'basic', added: '2026-10-17',
    source: 'Blind', company: 'Reddit',
    ref: 'sql interview at reddit', url: 'https://www.teamblind.com/post/sql-interview-at-reddit-mhkznvzz',
    title: 'עלות שכר ממוצעת למחלקה', tables: ['d1017_emp'],
    prompt: `בטבלה d1017_emp לכל עובד יש משכורת (salary) ובונוס (bonus), שיכול להיות ריק (עובד בלי בונוס). עלות כוללת של עובד היא משכורת ועוד בונוס, ועובד בלי בונוס נחשב כבונוס 0. לכל מחלקה שיש בה לפחות 2 עובדים החזירו: dept, headcount (מספר העובדים) ו-avg_total_comp (ממוצע העלות הכוללת, מעוגל ל-2 ספרות). מיינו לפי avg_total_comp יורד.`,
    solution: `SELECT dept, COUNT(*) AS headcount, ROUND(AVG(salary + COALESCE(bonus, 0)), 2) AS avg_total_comp
FROM d1017_emp GROUP BY dept HAVING COUNT(*) >= 2
ORDER BY avg_total_comp DESC;`,
    ordered: true,
  },
  {
    id: 'd20261017_b4', level: 'basic', added: '2026-10-17',
    source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'קריאות שירות פתוחות וזמן טיפול', tables: ['d1017_tickets'],
    prompt: `בטבלה d1017_tickets כל קריאה נפתחת בתאריך opened_at ונסגרת בתאריך closed_at (ריק אם עדיין פתוחה). לכל רמת עדיפות (priority) החזירו: priority, open_cnt (מספר הקריאות שעדיין פתוחות) ו-avg_days_to_close (ממוצע מספר הימים בין הפתיחה לסגירה, רק על קריאות שנסגרו, מעוגל ל-1 ספרה). מיינו לפי priority בסדר אלפביתי.`,
    solution: `SELECT priority,
  SUM(closed_at IS NULL) AS open_cnt,
  ROUND(AVG(julianday(closed_at) - julianday(opened_at)), 1) AS avg_days_to_close
FROM d1017_tickets GROUP BY priority ORDER BY priority;`,
    ordered: true,
  },
  {
    id: 'd20261017_b5', level: 'basic', added: '2026-10-17',
    source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'דומיינים נפוצים באימייל', tables: ['d1017_customers'],
    prompt: `בטבלה d1017_customers לכל לקוח יש כתובת אימייל. החזירו את הדומיינים (החלק שאחרי התו @) שמופיעים אצל לפחות 2 לקוחות, בעמודות domain ו-users (מספר הלקוחות). מיינו לפי users יורד ואחר כך לפי domain אלפביתי.`,
    solution: `SELECT SUBSTR(email, INSTR(email, '@') + 1) AS domain, COUNT(*) AS users
FROM d1017_customers GROUP BY domain HAVING COUNT(*) >= 2
ORDER BY users DESC, domain;`,
    ordered: true,
  },
  {
    id: 'd20261017_i1', level: 'intermediate', added: '2026-10-17',
    source: 'LeetCode', company: '',
    ref: 'Friend Requests I: Overall Acceptance Rate', url: 'https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate/',
    title: 'שיעור קבלת בקשות חברות', tables: ['d1017_fr_sent', 'd1017_fr_acc'],
    prompt: `בטבלה d1017_fr_sent נשלחות בקשות חברות, ובטבלה d1017_fr_acc נרשמות בקשות שאושרו. אותה בקשה (אותו שולח ואותו נמען) עשויה להופיע יותר מפעם אחת בכל טבלה, וצריך לספור כל זוג פעם אחת בלבד. החזירו שורה אחת עם העמודה acceptance_rate: מספר הזוגות השונים שאושרו חלקי מספר הזוגות השונים שנשלחו, מעוגל ל-2 ספרות (0 אם לא נשלחו בקשות).`,
    solution: `SELECT ROUND(COALESCE(
  1.0 * (SELECT COUNT(*) FROM (SELECT DISTINCT requester_id, accepter_id FROM d1017_fr_acc))
  / NULLIF((SELECT COUNT(*) FROM (SELECT DISTINCT sender_id, send_to_id FROM d1017_fr_sent)), 0), 0), 2) AS acceptance_rate;`,
    ordered: false,
  },
  {
    id: 'd20261017_i2', level: 'intermediate', added: '2026-10-17',
    source: 'LearnSQL', company: '',
    ref: 'Metric patterns: ratios', url: 'https://learnsql.com/blog/sql-metrics-real-interviews',
    title: 'נתח כל קטגוריה מההכנסות', tables: ['d1017_sales'],
    prompt: `בטבלה d1017_sales לכל שורה יש כמות (qty) ומחיר ליחידה (price). הכנסה של שורה היא qty כפול price. לכל קטגוריה החזירו: category ו-pct_of_total, כלומר אחוז ההכנסה של הקטגוריה מסך ההכנסות של כל הקטגוריות, מעוגל ל-1 ספרה. מיינו לפי pct_of_total יורד.`,
    solution: `SELECT category, ROUND(100.0 * SUM(qty * price) / (SELECT SUM(qty * price) FROM d1017_sales), 1) AS pct_of_total
FROM d1017_sales GROUP BY category ORDER BY pct_of_total DESC;`,
    ordered: true,
  },
  {
    id: 'd20261017_i3', level: 'intermediate', added: '2026-10-17',
    source: 'Blind', company: 'Reddit',
    ref: 'sql interview at reddit', url: 'https://www.teamblind.com/post/sql-interview-at-reddit-mhkznvzz',
    title: 'לקוחות מעל ממוצע ההוצאה', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders התייחסו רק להזמנות בסטטוס 'delivered'. סכמו את הסכומים לכל לקוח, ואז מצאו את הלקוחות שהסכום הכולל שלהם גבוה ממש מהממוצע של הסכומים הכוללים של כל הלקוחות שהזמינו. החזירו customer_id ו-total_spent, ממוינים לפי customer_id.`,
    solution: `WITH t AS (SELECT customer_id, SUM(amount) AS total_spent FROM d1017_orders WHERE status = 'delivered' GROUP BY customer_id)
SELECT customer_id, total_spent FROM t WHERE total_spent > (SELECT AVG(total_spent) FROM t) ORDER BY customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261017_i4', level: 'intermediate', added: '2026-10-17',
    source: 'Blind', company: 'Reddit',
    ref: 'sql interview at reddit', url: 'https://www.teamblind.com/post/sql-interview-at-reddit-mhkznvzz',
    title: 'לקוחות שמעולם לא קיבלו הזמנה', tables: ['d1017_customers', 'd1017_orders'],
    prompt: `החזירו את הלקוחות מהטבלה d1017_customers שאין להם אף הזמנה בסטטוס 'delivered' בטבלה d1017_orders (כולל לקוחות שאין להם הזמנות בכלל). החזירו customer_id ו-name, ממוינים לפי customer_id.`,
    solution: `SELECT c.customer_id, c.name FROM d1017_customers c
LEFT JOIN d1017_orders o ON o.customer_id = c.customer_id AND o.status = 'delivered'
WHERE o.order_id IS NULL ORDER BY c.customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261017_i5', level: 'intermediate', added: '2026-10-17',
    source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שיעור ביטולים חודשי', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders לכל חודש קלנדרי של order_date החזירו: month (בפורמט YYYY-MM), delivered_cnt (מספר ההזמנות בסטטוס 'delivered'), cancelled_cnt (מספר ההזמנות בסטטוס 'cancelled') ו-cancel_rate_pct (אחוז ההזמנות שבוטלו מתוך כל ההזמנות באותו חודש, בכל סטטוס, מעוגל ל-1 ספרה). מיינו לפי month.`,
    solution: `SELECT strftime('%Y-%m', order_date) AS month,
  SUM(status = 'delivered') AS delivered_cnt,
  SUM(status = 'cancelled') AS cancelled_cnt,
  ROUND(100.0 * SUM(status = 'cancelled') / COUNT(*), 1) AS cancel_rate_pct
FROM d1017_orders GROUP BY month ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261017_a1', level: 'advanced', added: '2026-10-17',
    source: 'LeetCode', company: '',
    ref: 'Active Users', url: 'https://leetcode.doocs.org/en/lc/1454/',
    title: 'חשבונות עם רצף כניסות', tables: ['d1017_accounts', 'd1017_acct_logins'],
    prompt: `בטבלה d1017_acct_logins רשומות כניסות של חשבונות לפי תאריך (login_date), וייתכנו כמה כניסות באותו יום. מצאו חשבונות שנכנסו ב-4 ימים קלנדריים רצופים לפחות. החזירו id ו-name מהטבלה d1017_accounts, ממוינים לפי id.`,
    solution: `WITH d AS (SELECT DISTINCT id, login_date FROM d1017_acct_logins),
g AS (SELECT id, login_date, julianday(login_date) - ROW_NUMBER() OVER (PARTITION BY id ORDER BY login_date) AS grp FROM d)
SELECT a.id, a.name FROM d1017_accounts a
WHERE a.id IN (SELECT id FROM g GROUP BY id, grp HAVING COUNT(*) >= 4) ORDER BY a.id;`,
    ordered: true,
  },
  {
    id: 'd20261017_a2', level: 'advanced', added: '2026-10-17',
    source: 'LeetCode', company: '',
    ref: 'Game Play Analysis V', url: 'https://leetcode.doocs.org/en/lc/1097/',
    title: 'שימור יום ראשון לפי תאריך התקנה', tables: ['d1017_plays'],
    prompt: `בטבלה d1017_plays כל שורה היא יום משחק של שחקן. תאריך ההתקנה של שחקן הוא התאריך הראשון שבו הופיע בטבלה. לכל תאריך התקנה החזירו: install_dt, installs (מספר השחקנים שהותקנו בו) ו-day1_retention (חלק השחקנים מביניהם ששיחקו גם ביום הקלנדרי שאחרי ההתקנה, מעוגל ל-2 ספרות). מיינו לפי install_dt.`,
    solution: `WITH f AS (SELECT player_id, MIN(event_date) AS install_dt FROM d1017_plays GROUP BY player_id)
SELECT f.install_dt, COUNT(*) AS installs,
  ROUND(1.0 * COUNT(p.player_id) / COUNT(*), 2) AS day1_retention
FROM f LEFT JOIN d1017_plays p ON p.player_id = f.player_id AND p.event_date = date(f.install_dt, '+1 day')
GROUP BY f.install_dt ORDER BY f.install_dt;`,
    ordered: true,
  },
  {
    id: 'd20261017_a3', level: 'advanced', added: '2026-10-17',
    source: 'LearnSQL', company: '',
    ref: 'Metric patterns: cumulative totals and percentage change', url: 'https://learnsql.com/blog/sql-metrics-real-interviews',
    title: 'הכנסה חודשית, מצטברת ושינוי באחוזים', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders התייחסו רק להזמנות בסטטוס 'delivered'. לכל חודש קלנדרי של order_date החזירו: month (בפורמט YYYY-MM), revenue (סך ההכנסה בחודש), cumulative_revenue (סך ההכנסה מתחילת הנתונים ועד סוף אותו חודש כולל) ו-pct_change (שינוי באחוזים של ההכנסה לעומת החודש הקודם בנתונים, מעוגל ל-2 ספרות). בחודש הראשון pct_change הוא 0. מיינו לפי month.`,
    solution: `WITH m AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS revenue FROM d1017_orders WHERE status = 'delivered' GROUP BY month)
SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS cumulative_revenue,
  COALESCE(ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month), 2), 0) AS pct_change
FROM m ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261017_a4', level: 'advanced', added: '2026-10-17',
    source: 'LearnSQL', company: '',
    ref: 'Metric patterns: ranks', url: 'https://learnsql.com/blog/sql-metrics-real-interviews',
    title: 'שני המוצרים המובילים בכל קטגוריה', tables: ['d1017_sales'],
    prompt: `בטבלה d1017_sales הכנסה של מוצר היא qty כפול price. בכל קטגוריה דרגו את המוצרים לפי ההכנסה מהגבוהה לנמוכה, כך שמוצרים עם הכנסה זהה מקבלים אותו דירוג ואין דילוג בדירוגים. החזירו את המוצרים שדירוגם 1 או 2 בקטגוריה שלהם, בעמודות category, product ו-revenue.`,
    solution: `SELECT category, product, revenue FROM (
  SELECT category, product, qty * price AS revenue,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY qty * price DESC) AS rk
  FROM d1017_sales) WHERE rk <= 2;`,
    ordered: false,
  },
  {
    id: 'd20261017_a5', level: 'advanced', added: '2026-10-17',
    source: 'Blind', company: 'Reddit',
    ref: 'sql interview at reddit', url: 'https://www.teamblind.com/post/sql-interview-at-reddit-mhkznvzz',
    title: 'הזמנה שנייה של כל לקוח', tables: ['d1017_orders'],
    prompt: `בטבלה d1017_orders התייחסו רק להזמנות בסטטוס 'delivered'. לכל לקוח שיש לו לפחות שתי הזמנות כאלה, מיינו את הזמנותיו לפי order_date והחזירו: customer_id, first_order_date (תאריך ההזמנה הראשונה), second_order_date (תאריך ההזמנה השנייה) ו-days_between (מספר הימים ביניהן). מיינו לפי customer_id.`,
    solution: `WITH r AS (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn FROM d1017_orders WHERE status = 'delivered')
SELECT a.customer_id, a.order_date AS first_order_date, b.order_date AS second_order_date,
  CAST(julianday(b.order_date) - julianday(a.order_date) AS INTEGER) AS days_between
FROM r a JOIN r b ON a.customer_id = b.customer_id AND a.rn = 1 AND b.rn = 2 ORDER BY a.customer_id;`,
    ordered: true,
  },
  // ===== 2026-10-18 =====
  {
    id: 'd20261018_b1', level: 'basic', added: '2026-10-18', source: 'מקורי', company: '', ref: '', url: '',
    title: 'קורסים יקרים עם דירוג', tables: ['d1018_courses'],
    prompt: `בטבלה d1018_courses יש קורסים באתר לימוד מקוון. החזירו את title ו-price של קורסים בקטגוריה 'data' או 'design' שמחירם גבוה מ-50 ויש להם דירוג (rating אינו חסר). מיינו לפי price מהגבוה לנמוך, ובמחיר זהה לפי title בסדר אלפביתי.`,
    solution: `SELECT title, price FROM d1018_courses
WHERE category IN ('data', 'design') AND price > 50 AND rating IS NOT NULL
ORDER BY price DESC, title;`,
    ordered: true,
  },
  {
    id: 'd20261018_b2', level: 'basic', added: '2026-10-18', source: 'מקורי', company: '', ref: '', url: '',
    title: 'דירוג ממוצע לקטגוריה', tables: ['d1018_courses'],
    prompt: `לכל קטגוריה בטבלה d1018_courses שיש בה לפחות 3 קורסים, החזירו: category, courses (מספר הקורסים בקטגוריה) ו-avg_rating (דירוג ממוצע של הקורסים שיש להם דירוג, מעוגל ל-2 ספרות אחרי הנקודה).`,
    solution: `SELECT category, COUNT(*) AS courses, ROUND(AVG(rating), 2) AS avg_rating
FROM d1018_courses GROUP BY category HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261018_b3', level: 'basic', added: '2026-10-18', source: 'מקורי', company: '', ref: '', url: '',
    title: 'קורסי SQL או קורסים ללא דירוג', tables: ['d1018_courses'],
    prompt: `החזירו את course_id ו-title של כל הקורסים בטבלה d1018_courses ששמם (title) מכיל את הרצף sql, בלי קשר לאותיות גדולות או קטנות, וגם של כל הקורסים שאין להם דירוג.`,
    solution: `SELECT course_id, title FROM d1018_courses WHERE title LIKE '%sql%' OR rating IS NULL;`,
    ordered: false,
  },
  {
    id: 'd20261018_b4', level: 'basic', added: '2026-10-18', source: 'מקורי', company: '', ref: '', url: '',
    title: 'קורסים לפי רמת מחיר', tables: ['d1018_courses'],
    prompt: `סווגו כל קורס בטבלה d1018_courses לרמת מחיר: 'free' אם price הוא 0, 'premium' אם price הוא 100 ומעלה, ו-'standard' בכל מקרה אחר. החזירו לכל רמה את העמודות tier ו-courses (מספר הקורסים ברמה).`,
    solution: `SELECT CASE WHEN price = 0 THEN 'free' WHEN price >= 100 THEN 'premium' ELSE 'standard' END AS tier, COUNT(*) AS courses
FROM d1018_courses GROUP BY 1;`,
    ordered: false,
  },
  {
    id: 'd20261018_b5', level: 'basic', added: '2026-10-18', source: 'מקורי', company: '', ref: '', url: '',
    title: 'סטודנטים והכנסה לקורס', tables: ['d1018_enroll'],
    prompt: `בטבלה d1018_enroll כל שורה היא הרשמה של סטודנט לקורס, וייתכן שאותו סטודנט נרשם לאותו קורס יותר מפעם אחת. לכל קורס שנרשמו אליו לפחות 2 סטודנטים שונים, החזירו: course_id, students (מספר הסטודנטים השונים) ו-total_paid (סך כל הסכומים ששולמו בעמודה paid, כולל הרשמות חוזרות).`,
    solution: `SELECT course_id, COUNT(DISTINCT student) AS students, SUM(paid) AS total_paid
FROM d1018_enroll GROUP BY course_id HAVING COUNT(DISTINCT student) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261018_i1', level: 'intermediate', added: '2026-10-18', source: 'HackerRank', company: '',
    ref: "Ollivander's Inventory", url: 'https://www.hackerrank.com/challenges/harry-potter-and-wands/problem',
    title: 'השרביטים הזולים ביותר', tables: ['d1018_wands', 'd1018_wand_props'],
    prompt: `בטבלה d1018_wands יש שרביטים למכירה, ובטבלה d1018_wand_props יש לכל code את גיל השרביט (age) ואם הוא מושחת (is_evil = 1). התעלמו משרביטים מושחתים. לכל צירוף של power ו-age, מצאו את השרביט (או השרביטים) בעלי המחיר הנמוך ביותר (coins_needed) מבין השרביטים הלא מושחתים בצירוף. החזירו: id, age, coins_needed, power. מיינו לפי power מהגבוה לנמוך, אחר כך לפי age מהגבוה לנמוך, ואחר כך לפי id.`,
    solution: `SELECT w.id, p.age, w.coins_needed, w.power
FROM d1018_wands w JOIN d1018_wand_props p ON w.code = p.code
WHERE p.is_evil = 0 AND w.coins_needed = (
  SELECT MIN(w2.coins_needed) FROM d1018_wands w2 JOIN d1018_wand_props p2 ON w2.code = p2.code
  WHERE p2.is_evil = 0 AND w2.power = w.power AND p2.age = p.age)
ORDER BY w.power DESC, p.age DESC, w.id;`,
    ordered: true,
  },
  {
    id: 'd20261018_i2', level: 'intermediate', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Customer Who Visited but Did Not Make Any Transactions', url: 'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/',
    title: 'ביקורים בלי קנייה', tables: ['d1018_visits', 'd1018_txns'],
    prompt: `בטבלה d1018_visits יש ביקורים של לקוחות בחנות, ובטבלה d1018_txns יש עסקאות, שכל אחת מהן שייכת לביקור (visit_id). ביקור שאין לו אף עסקה נחשב ביקור ללא קנייה (גם עסקה בסכום 0 נחשבת עסקה). החזירו לכל לקוח שהיה לו לפחות ביקור אחד ללא קנייה את customer_id ואת count_no_trans, מספר הביקורים שלו ללא קנייה.`,
    solution: `SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM d1018_visits v LEFT JOIN d1018_txns t ON t.visit_id = v.visit_id
WHERE t.txn_id IS NULL GROUP BY v.customer_id;`,
    ordered: false,
  },
  {
    id: 'd20261018_i3', level: 'intermediate', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Page Recommendations', url: 'https://www.hellointerview.com/community/questions/page-recommendations/cm5eguhad02zi838o2yuo9ltp',
    title: 'המלצות לדפים למשתמש 1', tables: ['d1018_friends', 'd1018_likes'],
    prompt: `בטבלה d1018_friends כל שורה מציינת ששני משתמשים הם חברים (החברות הדדית, והמשתמש יכול להופיע בכל אחת משתי העמודות). בטבלה d1018_likes יש דפים שמשתמשים סימנו בלייק. החזירו עמודה אחת, page_id, עם כל הדפים (כל דף פעם אחת) שלפחות אחד מחבריו של משתמש 1 סימן בלייק, ושמשתמש 1 עצמו לא סימן בלייק.`,
    solution: `SELECT DISTINCT page_id FROM d1018_likes
WHERE user_id IN (SELECT user2 FROM d1018_friends WHERE user1 = 1 UNION SELECT user1 FROM d1018_friends WHERE user2 = 1)
AND page_id NOT IN (SELECT page_id FROM d1018_likes WHERE user_id = 1);`,
    ordered: false,
  },
  {
    id: 'd20261018_i4', level: 'intermediate', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Biggest Window Between Visits', url: 'https://www.algo.monster/liteproblems/1709',
    title: 'הפער הגדול בין ביקורים', tables: ['d1018_user_visits'],
    prompt: `בטבלה d1018_user_visits יש ביקורים של משתמשים באתר (ייתכנו שורות כפולות של אותו יום). לכל משתמש חשבו את הפער הגדול ביותר, בימים, בין שני ביקורים עוקבים שלו, כאשר גם הפער בין הביקור האחרון ל-2026-06-30 נחשב. החזירו user_id ו-biggest_window כמספר שלם.`,
    solution: `WITH v AS (SELECT DISTINCT user_id, visit_date FROM d1018_user_visits),
x AS (SELECT user_id, julianday(COALESCE(LEAD(visit_date) OVER (PARTITION BY user_id ORDER BY visit_date), '2026-06-30')) - julianday(visit_date) AS g FROM v)
SELECT user_id, CAST(MAX(g) AS INTEGER) AS biggest_window FROM x GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261018_i5', level: 'intermediate', added: '2026-10-18', source: 'HackerRank', company: '',
    ref: 'Challenges', url: 'https://www.hackerrank.com/challenges/challenges/problem',
    title: 'יוצרי האתגרים הבולטים', tables: ['d1018_hackers', 'd1018_chals'],
    prompt: `בטבלה d1018_chals כל שורה היא אתגר שיצר האקר. חשבו לכל האקר את מספר האתגרים שיצר. החזירו רק האקרים שמספר האתגרים שלהם הוא המקסימלי (גם אם כמה האקרים חולקים אותו), או מספר שרק האקר אחד בדיוק יצר. עמודות: hacker_id, name, challenges_created. מיינו לפי challenges_created מהגבוה לנמוך ואחר כך לפי hacker_id.`,
    solution: `WITH c AS (SELECT h.hacker_id, h.name, COUNT(*) AS n FROM d1018_hackers h JOIN d1018_chals x ON x.hacker_id = h.hacker_id GROUP BY h.hacker_id, h.name)
SELECT hacker_id, name, n AS challenges_created FROM c
WHERE n = (SELECT MAX(n) FROM c) OR n IN (SELECT n FROM c GROUP BY n HAVING COUNT(*) = 1)
ORDER BY n DESC, hacker_id;`,
    ordered: true,
  },
  {
    id: 'd20261018_a1', level: 'advanced', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Find the Start and End Number of Continuous Ranges', url: 'https://leetcode.doocs.org/en/lc/1285/',
    title: 'טווחים רציפים של מזהים', tables: ['d1018_logs'],
    prompt: `בטבלה d1018_logs יש מזהי לוגים ייחודיים (log_id), עם חורים ביניהם. קבצו את המזהים לטווחים של מספרים עוקבים (בלי דילוג) והחזירו לכל טווח את start_id (המזהה הקטן בטווח) ואת end_id (הגדול בטווח). טווח של מזהה בודד יחזיר אותו בשתי העמודות. מיינו לפי start_id.`,
    solution: `SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM (SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp FROM d1018_logs)
GROUP BY grp ORDER BY start_id;`,
    ordered: true,
  },
  {
    id: 'd20261018_a2', level: 'advanced', added: '2026-10-18', source: 'StrataScratch', company: 'Salesforce',
    ref: 'Find the Retention Rates', url: 'https://stratascratch.com/blog/find-the-retention-rates-salesforce-sql-interview-question',
    title: 'שימור משתמשים לפי חשבון', tables: ['d1018_acct_events'],
    prompt: `בטבלה d1018_acct_events יש אירועי פעילות של משתמשים בחשבונות לקוח. לכל חשבון שהיה בו לפחות משתמש אחד פעיל במרץ 2026, חשבו את שיעור השימור: מתוך המשתמשים השונים שהיו פעילים במרץ 2026, איזה חלק היה פעיל גם באפריל 2026 (משתמשים שהופיעו לראשונה באפריל אינם נספרים). החזירו: account_id ו-retention_rate כשבר בין 0 ל-1 מעוגל ל-2 ספרות אחרי הנקודה.`,
    solution: `SELECT a.account_id, ROUND(1.0 * COUNT(DISTINCT b.user_id) / COUNT(DISTINCT a.user_id), 2) AS retention_rate
FROM d1018_acct_events a
LEFT JOIN d1018_acct_events b ON b.account_id = a.account_id AND b.user_id = a.user_id AND substr(b.event_date, 1, 7) = '2026-04'
WHERE substr(a.event_date, 1, 7) = '2026-03' GROUP BY a.account_id;`,
    ordered: false,
  },
  {
    id: 'd20261018_a3', level: 'advanced', added: '2026-10-18', source: 'DataVidhya', company: '',
    ref: 'Sessionization', url: 'https://datavidhya.com/learn/sql/interview-patterns/sessionization/',
    title: 'חלוקת קליקים לסשנים', tables: ['d1018_clicks'],
    prompt: `בטבלה d1018_clicks יש קליקים של משתמשים עם חותמת זמן ts. לכל משתמש, קליק שמתרחש יותר מ-30 דקות אחרי הקליק הקודם שלו מתחיל סשן חדש (פער של בדיוק 30 דקות נשאר באותו סשן), והקליק הראשון של משתמש פותח את הסשן הראשון שלו. מספרו את הסשנים של כל משתמש מ-1 לפי הסדר בזמן. החזירו: user_id, session_no, session_start (ts הראשון בסשן), session_end (ts האחרון בסשן) ו-clicks (מספר הקליקים). מיינו לפי user_id ואז session_no.`,
    solution: `WITH g AS (SELECT user_id, ts, CASE WHEN strftime('%s', ts) - strftime('%s', LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)) > 1800 THEN 1 ELSE 0 END AS brk FROM d1018_clicks),
s AS (SELECT user_id, ts, SUM(brk) OVER (PARTITION BY user_id ORDER BY ts) + 1 AS session_no FROM g)
SELECT user_id, session_no, MIN(ts) AS session_start, MAX(ts) AS session_end, COUNT(*) AS clicks
FROM s GROUP BY user_id, session_no ORDER BY user_id, session_no;`,
    ordered: true,
  },
  {
    id: 'd20261018_a4', level: 'advanced', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Get the Second Most Recent Activity', url: 'https://leetcode.com/problems/get-the-second-most-recent-activity/',
    title: 'הפעילות האחרונה פחות אחת', tables: ['d1018_user_activity'],
    prompt: `בטבלה d1018_user_activity יש פעילויות של משתמשים, ולכל פעילות תאריכי התחלה וסיום (פעילויות של אותו משתמש אינן חופפות). לכל משתמש החזירו את הפעילות השנייה בסדר מהאחרונה (לפי start_date). אם למשתמש יש פעילות אחת בלבד, החזירו אותה. עמודות: username, activity, start_date, end_date.`,
    solution: `SELECT username, activity, start_date, end_date FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY username ORDER BY start_date DESC) AS rn, COUNT(*) OVER (PARTITION BY username) AS cnt
  FROM d1018_user_activity) WHERE rn = 2 OR cnt = 1;`,
    ordered: false,
  },
  {
    id: 'd20261018_a5', level: 'advanced', added: '2026-10-18', source: 'LeetCode', company: '',
    ref: 'Running Total for Different Genders', url: 'https://leetcode.com/problems/running-total-for-different-genders/',
    title: 'צבירת נקודות לפי מגדר', tables: ['d1018_gscores'],
    prompt: `בטבלה d1018_gscores כל שורה היא ניקוד שזכה בו שחקן ביום מסוים, ולכל מגדר יש לכל היותר שורה אחת ביום. לכל שורה החזירו: gender, day ו-total, סך הנקודות המצטבר של אותו מגדר מהיום הראשון ועד היום הנוכחי (כולל). מיינו לפי gender ואז day.`,
    solution: `SELECT gender, day, SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total
FROM d1018_gscores ORDER BY gender, day;`,
    ordered: true,
  },
  {
    id: 'd20261019_b1', level: 'basic', added: '2026-10-19', source: 'StrataScratch', company: 'Uber',
    ref: 'Uber SQL Interview Questions (total miles by business purpose)', url: 'https://www.stratascratch.com/blog/uber-sql-interview-questions',
    title: 'סך מייל לפי מטרת נסיעה', tables: ['d1019_biz_trips'],
    prompt: `בטבלה d1019_biz_trips יש נסיעות עסקיות של נהגים, עם מטרת הנסיעה (purpose) והמרחק במייל (miles). התעלמו מנסיעות שבהן המרחק לא נרשם. לכל מטרה החזירו: purpose ו-total_miles, סך המיילים. מיינו לפי total_miles מהגבוה לנמוך, ובשוויון לפי purpose בסדר אלפביתי.`,
    solution: `SELECT purpose, SUM(miles) AS total_miles FROM d1019_biz_trips WHERE miles IS NOT NULL
GROUP BY purpose ORDER BY total_miles DESC, purpose;`,
    ordered: true,
  },
  {
    id: 'd20261019_b2', level: 'basic', added: '2026-10-19', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שכר כולל ממוצע לפי מחלקה', tables: ['d1019_pay'],
    prompt: `בטבלה d1019_pay יש לכל עובד מחלקה, משכורת (salary) ובונוס (bonus), כשעובד שלא קיבל בונוס מסומן ב-NULL ובונוסו נחשב 0. לכל מחלקה שיש בה לפחות שני עובדים החזירו: dept, מספר העובדים emp_count, והשכר הכולל הממוצע (משכורת ועוד בונוס) avg_total מעוגל לשתי ספרות אחרי הנקודה. מיינו לפי avg_total מהגבוה לנמוך.`,
    solution: `SELECT dept, COUNT(*) AS emp_count, ROUND(AVG(salary + COALESCE(bonus, 0)), 2) AS avg_total
FROM d1019_pay GROUP BY dept HAVING COUNT(*) >= 2 ORDER BY avg_total DESC;`,
    ordered: true,
  },
  {
    id: 'd20261019_b3', level: 'basic', added: '2026-10-19', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות ישראלים או בלי עיר', tables: ['d1019_customers'],
    prompt: `בטבלה d1019_customers מופיעים לקוחות. החזירו את cust_id ואת name של לקוחות שנרשמו בשנת 2026 (signup_date) ושמתקיים בהם לפחות אחד מהשניים: כתובת הדוא"ל מסתיימת ב-.co.il, או שלא נרשמה להם עיר. מיינו לפי cust_id.`,
    solution: `SELECT cust_id, name FROM d1019_customers
WHERE signup_date >= '2026-01-01' AND signup_date < '2027-01-01' AND (email LIKE '%.co.il' OR city IS NULL)
ORDER BY cust_id;`,
    ordered: true,
  },
  {
    id: 'd20261019_b4', level: 'basic', added: '2026-10-19', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות עם הרבה הזמנות שסופקו', tables: ['d1019_orders'],
    prompt: `בטבלה d1019_orders יש הזמנות עם סטטוס (status). בהתחשב רק בהזמנות בסטטוס delivered, החזירו את הלקוחות שיש להם לפחות שתי הזמנות כאלה וסכום הסכומים שלהן גדול מ-300. עמודות: cust_id, delivered_orders (מספר ההזמנות), total_amount (הסכום הכולל). מיינו לפי cust_id.`,
    solution: `SELECT cust_id, COUNT(*) AS delivered_orders, SUM(amount) AS total_amount
FROM d1019_orders WHERE status = 'delivered'
GROUP BY cust_id HAVING COUNT(*) >= 2 AND SUM(amount) > 300 ORDER BY cust_id;`,
    ordered: true,
  },
  {
    id: 'd20261019_b5', level: 'basic', added: '2026-10-19', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פילוח עובדים לפי רמת שכר', tables: ['d1019_pay'],
    prompt: `בטבלה d1019_pay יש משכורת (salary) לכל עובד. סווגו כל עובד לרמה: Low אם המשכורת נמוכה מ-7000, Mid אם היא בין 7000 ל-9999 (כולל), ו-High אם היא 10000 ומעלה. החזירו לכל רמה שיש בה עובדים: band ו-emp_count, מספר העובדים.`,
    solution: `SELECT CASE WHEN salary < 7000 THEN 'Low' WHEN salary < 10000 THEN 'Mid' ELSE 'High' END AS band, COUNT(*) AS emp_count
FROM d1019_pay GROUP BY band;`,
    ordered: false,
  },
  {
    id: 'd20261019_i1', level: 'intermediate', added: '2026-10-19', source: 'GitHub', company: '',
    ref: 'Rising Temperature', url: 'https://github.com/ieshreya/sql-50-leetcode',
    title: 'ימים חמים יותר מהיום הקודם', tables: ['d1019_weather'],
    prompt: `בטבלה d1019_weather יש מדידת טמפרטורה אחת ליום, אך חלק מהימים חסרים. החזירו את id של כל יום שהטמפרטורה בו גבוהה מהטמפרטורה ביום הקלנדרי שקדם לו ישירות. יום שאין עבורו מדידה ליום הקודם אינו נחשב. עמודה: id.`,
    solution: `SELECT w.id FROM d1019_weather w JOIN d1019_weather p ON julianday(w.record_date) - julianday(p.record_date) = 1
WHERE w.temp > p.temp;`,
    ordered: false,
  },
  {
    id: 'd20261019_i2', level: 'intermediate', added: '2026-10-19', source: 'GitHub', company: '',
    ref: 'Product Sales Analysis III', url: 'https://github.com/ieshreya/sql-50-leetcode',
    title: 'מכירות בשנה הראשונה של מוצר', tables: ['d1019_prod_sales'],
    prompt: `בטבלה d1019_prod_sales כל שורה היא מכירה של מוצר בשנה מסוימת. לכל מוצר מצאו את השנה הראשונה שבה נמכר, והחזירו את כל המכירות שלו באותה שנה. עמודות: product_id, first_year, quantity, price.`,
    solution: `SELECT s.product_id, s.year AS first_year, s.quantity, s.price FROM d1019_prod_sales s
WHERE s.year = (SELECT MIN(year) FROM d1019_prod_sales WHERE product_id = s.product_id);`,
    ordered: false,
  },
  {
    id: 'd20261019_i3', level: 'intermediate', added: '2026-10-19', source: 'GitHub', company: '',
    ref: 'Consecutive Numbers', url: 'https://github.com/Feminto/Sql3',
    title: 'מספרים שחוזרים שלוש פעמים ברצף', tables: ['d1019_seq_log'],
    prompt: `בטבלה d1019_seq_log כל שורה היא ערך (num) שנרשם ביומן, ו-id רץ ברצף ללא חורים לפי סדר הרישום. החזירו כל מספר שמופיע לפחות שלוש פעמים ברצף בשלוש שורות עוקבות, כל מספר פעם אחת. עמודה: num.`,
    solution: `SELECT DISTINCT a.num FROM d1019_seq_log a JOIN d1019_seq_log b ON b.id = a.id + 1 JOIN d1019_seq_log c ON c.id = a.id + 2
WHERE a.num = b.num AND b.num = c.num;`,
    ordered: false,
  },
  {
    id: 'd20261019_i4', level: 'intermediate', added: '2026-10-19', source: 'DataLemur', company: 'Walmart',
    ref: 'Frequently Purchased Pairs', url: 'https://datalemur.com/sql-interview-questions',
    title: 'זוגות מוצרים שנקנים יחד', tables: ['d1019_basket'],
    prompt: `בטבלה d1019_basket כל שורה היא מוצר שנקנה בעסקה (txn_id). מצאו זוגות שונים של מוצרים שנקנו יחד באותה עסקה בלפחות שתי עסקאות שונות. כל זוג מופיע פעם אחת, כשהמוצר הראשון קודם אלפביתית לשני. עמודות: product_a, product_b, pair_count (מספר העסקאות שבהן הזוג הופיע).`,
    solution: `SELECT a.product AS product_a, b.product AS product_b, COUNT(*) AS pair_count
FROM d1019_basket a JOIN d1019_basket b ON a.txn_id = b.txn_id AND a.product < b.product
GROUP BY a.product, b.product HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261019_i5', level: 'intermediate', added: '2026-10-19', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נרשמו השנה ולא קיבלו הזמנה', tables: ['d1019_customers', 'd1019_orders'],
    prompt: `החזירו את cust_id ואת name של לקוחות מהטבלה d1019_customers שנרשמו בשנת 2026 ואין להם אף הזמנה בסטטוס delivered בטבלה d1019_orders (כולל לקוחות שאין להם הזמנות כלל).`,
    solution: `SELECT c.cust_id, c.name FROM d1019_customers c
WHERE c.signup_date >= '2026-01-01' AND c.signup_date < '2027-01-01'
AND NOT EXISTS (SELECT 1 FROM d1019_orders o WHERE o.cust_id = c.cust_id AND o.status = 'delivered');`,
    ordered: false,
  },
  {
    id: 'd20261019_a1', level: 'advanced', added: '2026-10-19', source: 'DataLemur', company: 'Uber',
    ref: 'Third Transaction', url: 'https://datalemur.com/questions/sql-third-transaction',
    title: 'העסקה השלישית של כל משתמש', tables: ['d1019_user_tx'],
    prompt: `בטבלה d1019_user_tx יש עסקאות של משתמשים. סדרו את עסקאות כל משתמש לפי tx_date, ובשוויון בתאריך לפי tx_id. החזירו את העסקה השלישית של כל משתמש שיש לו לפחות שלוש עסקאות. עמודות: user_id, spend, tx_date.`,
    solution: `SELECT user_id, spend, tx_date FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY tx_date, tx_id) AS rn FROM d1019_user_tx
) WHERE rn = 3;`,
    ordered: false,
  },
  {
    id: 'd20261019_a2', level: 'advanced', added: '2026-10-19', source: 'DataLemur', company: 'Tesla',
    ref: 'Analyzing Tesla Charging Stations Usage', url: 'https://datalemur.com/blog/tesla-sql-interview-questions',
    title: 'שינוי בזמן הטעינה מול היום הקודם', tables: ['d1019_charge_log'],
    prompt: `בטבלה d1019_charge_log כל שורה היא סשן טעינה בתחנה (station_id) ביום מסוים, עם משך בדקות (minutes). חשבו לכל תחנה ולכל יום שיש בו סשנים את סך הדקות. לכל יום שקדם לו בתחנה יום אחר עם נתונים, החזירו את ההפרש בין סך הדקות שלו לסך הדקות של היום האחרון שקדם לו באותה תחנה (גם אם חלפו כמה ימים). עמודות: station_id, day, total_minutes, diff_from_prev.`,
    solution: `SELECT station_id, day, total_minutes, total_minutes - prev AS diff_from_prev FROM (
  SELECT station_id, day, SUM(minutes) AS total_minutes,
         LAG(SUM(minutes)) OVER (PARTITION BY station_id ORDER BY day) AS prev
  FROM d1019_charge_log GROUP BY station_id, day
) WHERE prev IS NOT NULL;`,
    ordered: false,
  },
  {
    id: 'd20261019_a3', level: 'advanced', added: '2026-10-19', source: 'LeetCode', company: '',
    ref: 'Restaurant Growth', url: 'https://velog.io/@dav74/코드카타-SQL-55-Restaurant-Growth',
    title: 'ממוצע נע של שבעה ימים במסעדה', tables: ['d1019_rest_visits'],
    prompt: `בטבלה d1019_rest_visits כל שורה היא ביקור של לקוח במסעדה עם הסכום ששילם, ויש ביקורים בכל יום בטווח התאריכים. לכל יום שיש לפניו לפחות שישה ימים קודמים בנתונים, חשבו על חלון של שבעה ימים (היום עצמו ושישה ימים לפניו): את סך הסכומים בחלון ואת הממוצע היומי שלו (סך הסכומים חלקי 7) מעוגל לשתי ספרות אחרי הנקודה. עמודות: visited_on, amount, average_amount. מיינו לפי visited_on.`,
    solution: `SELECT visited_on, amount, ROUND(amount / 7.0, 2) AS average_amount FROM (
  SELECT visited_on, SUM(daily) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
         ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
  FROM (SELECT visited_on, SUM(amount) AS daily FROM d1019_rest_visits GROUP BY visited_on)
) WHERE rn >= 7 ORDER BY visited_on;`,
    ordered: true,
  },
  {
    id: 'd20261019_a4', level: 'advanced', added: '2026-10-19', source: 'StrataScratch', company: 'Google',
    ref: 'Activity Rank', url: 'https://www.stratascratch.com/blog/google-data-scientist-interview-questions',
    title: 'דירוג משתמשים לפי כמות מיילים', tables: ['d1019_mail'],
    prompt: `בטבלה d1019_mail כל שורה היא מייל ששלח משתמש (sender). דרגו את השולחים לפי מספר המיילים ששלחו, מהרב לפחות, כשדירוג כל שולח הוא מספר ייחודי: 1, 2, 3 וכן הלאה, ובשוויון במספר המיילים הדירוג נקבע לפי שם השולח בסדר אלפביתי. עמודות: sender, total_emails, activity_rank. מיינו לפי activity_rank.`,
    solution: `SELECT sender, COUNT(*) AS total_emails, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, sender) AS activity_rank
FROM d1019_mail GROUP BY sender ORDER BY activity_rank;`,
    ordered: true,
  },
  {
    id: 'd20261019_a5', level: 'advanced', added: '2026-10-19', source: 'PracHub', company: 'Uber',
    ref: 'Write SQL for active counts and YTD top driver', url: 'https://prachub.com/interview-questions/write-sql-for-active-counts-and-ytd-top-driver',
    title: 'הנהג המוביל מתחילת השנה בכל חודש', tables: ['d1019_driver_trips'],
    prompt: `בטבלה d1019_driver_trips יש נסיעות של נהגים עם הרווח מכל נסיעה, כולן בשנת 2026. לכל חודש שיש בו נסיעות, מצאו את הנהג שהרווח המצטבר שלו מתחילת השנה ועד סוף אותו חודש הוא הגבוה ביותר (בשוויון, הנהג עם driver_id הנמוך). נהג נחשב גם אם לא נסע באותו חודש. עמודות: month (בפורמט YYYY-MM), driver_id, ytd_earnings. מיינו לפי month.`,
    solution: `WITH months AS (SELECT DISTINCT substr(trip_date, 1, 7) AS month FROM d1019_driver_trips),
ytd AS (
  SELECT m.month, d.driver_id, SUM(d.earnings) AS ytd_earnings
  FROM months m JOIN d1019_driver_trips d ON substr(d.trip_date, 1, 7) <= m.month
  GROUP BY m.month, d.driver_id
), ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY month ORDER BY ytd_earnings DESC, driver_id) AS rn FROM ytd
)
SELECT month, driver_id, ytd_earnings FROM ranked WHERE rn = 1 ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261020_b1', level: 'basic', added: '2026-10-20', source: 'DataLemur', company: 'PayPal',
    ref: 'Final Account Balance', url: 'https://datalemur.com/questions/final-account-balance',
    title: 'יתרה סופית לכל חשבון', tables: ['d1020_acct_tx'],
    prompt: `בטבלה d1020_acct_tx יש תנועות בחשבונות בנק. עמודה tx_type היא 'Deposit' (הפקדה) או 'Withdrawal' (משיכה), ו-amount הוא סכום חיובי. החזירו לכל חשבון את היתרה הסופית שלו: סך ההפקדות פחות סך המשיכות. עמודות: account_id, final_balance.`,
    solution: `SELECT account_id, SUM(CASE WHEN tx_type = 'Deposit' THEN amount ELSE -amount END) AS final_balance
FROM d1020_acct_tx GROUP BY account_id;`,
    ordered: false,
  },
  {
    id: 'd20261020_b2', level: 'basic', added: '2026-10-20', source: 'DataLemur', company: 'LinkedIn',
    ref: 'Duplicate Job Listings', url: 'https://datalemur.com/questions/duplicate-job-listings',
    title: 'חברות עם משרות כפולות', tables: ['d1020_jobs'],
    prompt: `בטבלה d1020_jobs יש משרות שפורסמו על ידי חברות. שתי משרות נחשבות כפולות אם הן של אותה חברה ויש להן אותו title ואותו description בדיוק. כמה חברות פרסמו לפחות משרה כפולה אחת? עמודה אחת: duplicate_companies.`,
    solution: `SELECT COUNT(DISTINCT company_id) AS duplicate_companies FROM (
  SELECT company_id FROM d1020_jobs GROUP BY company_id, title, description HAVING COUNT(*) > 1
);`,
    ordered: false,
  },
  {
    id: 'd20261020_b3', level: 'basic', added: '2026-10-20', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סכום נטו ללקוחות חוזרים', tables: ['d1020_orders'],
    prompt: `בטבלה d1020_orders יש הזמנות. עמודה discount היא סכום ההנחה שניתן בהזמנה, והיא ריקה (NULL) כשלא ניתנה הנחה. התייחסו רק להזמנות בסטטוס 'completed'. החזירו לכל לקוח שיש לו לפחות 2 הזמנות כאלה: את שמו, מספר ההזמנות, והסכום נטו (סך amount פחות סך ההנחות). עמודות: customer, orders, net_total.`,
    solution: `SELECT customer, COUNT(*) AS orders, SUM(amount - COALESCE(discount, 0)) AS net_total
FROM d1020_orders WHERE status = 'completed'
GROUP BY customer HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261020_b4', level: 'basic', added: '2026-10-20', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'קטגוריות יקרות עם מוצרים שאזלו', tables: ['d1020_products'],
    prompt: `בטבלה d1020_products יש מוצרים עם מחיר ומלאי. החזירו כל קטגוריה שמחיר המוצר הממוצע בה גבוה מ-100 ושיש בה לפחות 2 מוצרים שאזלו מהמלאי (stock = 0). עמודות: category, products (מספר המוצרים בקטגוריה), avg_price (ממוצע המחיר מעוגל לספרה אחת אחרי הנקודה).`,
    solution: `SELECT category, COUNT(*) AS products, ROUND(AVG(price), 1) AS avg_price
FROM d1020_products GROUP BY category
HAVING AVG(price) > 100 AND SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261020_b5', level: 'basic', added: '2026-10-20', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חברים עם כתובת co.il לפי מסלול', tables: ['d1020_members'],
    prompt: `בטבלה d1020_members יש חברי מועדון עם כתובת אימייל ומסלול (plan). לכל מסלול החזירו את מספר החברים הכולל ואת מספר החברים שכתובת האימייל שלהם מסתיימת ב-.co.il (בדיוק, כך ש-.ac.il או כתובת שבה co.il מופיע באמצע לא נספרות). כל המסלולים צריכים להופיע, גם אם אין בהם כתובת כזו. עמודות: plan, total_members, il_members.`,
    solution: `SELECT plan, COUNT(*) AS total_members, SUM(CASE WHEN email LIKE '%.co.il' THEN 1 ELSE 0 END) AS il_members
FROM d1020_members GROUP BY plan;`,
    ordered: false,
  },
  {
    id: 'd20261020_i1', level: 'intermediate', added: '2026-10-20', source: 'LeetCode', company: '',
    ref: 'Monthly Transactions I', url: 'https://leetcode.doocs.org/lc/1193/',
    title: 'סיכום עסקאות חודשי לפי מדינה', tables: ['d1020_trans'],
    prompt: `בטבלה d1020_trans יש עסקאות עם מדינה (country, לעיתים ריקה), מצב ('approved' או 'declined'), סכום ותאריך. לכל צירוף של חודש ומדינה (עסקאות ללא מדינה מהוות קבוצה אחת משלהן) החזירו: את החודש בפורמט YYYY-MM, את המדינה, מספר העסקאות הכולל, מספר העסקאות שאושרו, סכום כל העסקאות וסכום העסקאות שאושרו. עמודות: month, country, trans_count, approved_count, trans_total_amount, approved_total_amount.`,
    solution: `SELECT substr(trans_date, 1, 7) AS month, country, COUNT(*) AS trans_count,
  SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
  SUM(amount) AS trans_total_amount,
  SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM d1020_trans GROUP BY substr(trans_date, 1, 7), country;`,
    ordered: false,
  },
  {
    id: 'd20261020_i2', level: 'intermediate', added: '2026-10-20', source: 'DataVidhya', company: 'Snapchat',
    ref: 'Sending vs Opening Snaps by Age Group', url: 'https://datavidhya.com/coding-problems/questionDetails/question/aggregation-snaps-send-vs-open-by-age/',
    title: 'שליחה מול פתיחה של סנאפים לפי קבוצת גיל', tables: ['d1020_snap_activity', 'd1020_snap_users'],
    prompt: `בטבלה d1020_snap_activity יש פעולות של משתמשים (activity_type הוא 'send', 'open' או 'chat') עם משך הזמן שהושקע, ובטבלה d1020_snap_users יש את קבוצת הגיל של כל משתמש. התעלמו מפעולות 'chat'. לכל קבוצת גיל שיש בה פעולות כאלה, החזירו את אחוז הזמן שהושקע בשליחה ואת אחוז הזמן שהושקע בפתיחה, מתוך סך הזמן של שליחה ופתיחה יחד בקבוצה, מעוגלים לשתי ספרות אחרי הנקודה. עמודות: age_bucket, send_pct, open_pct. מיינו לפי age_bucket.`,
    solution: `SELECT u.age_bucket,
  ROUND(100.0 * SUM(CASE WHEN a.activity_type = 'send' THEN a.time_spent ELSE 0 END) / SUM(a.time_spent), 2) AS send_pct,
  ROUND(100.0 * SUM(CASE WHEN a.activity_type = 'open' THEN a.time_spent ELSE 0 END) / SUM(a.time_spent), 2) AS open_pct
FROM d1020_snap_activity a JOIN d1020_snap_users u ON u.user_id = a.user_id
WHERE a.activity_type IN ('send', 'open')
GROUP BY u.age_bucket ORDER BY u.age_bucket;`,
    ordered: true,
  },
  {
    id: 'd20261020_i3', level: 'intermediate', added: '2026-10-20', source: 'StrataScratch', company: 'Meta',
    ref: 'Share of new and existing users', url: 'https://www.stratascratch.com/blog/facebook-and-microsoft-data-science-sql-interview-questions',
    title: 'משתמשים חדשים מול קיימים בספטמבר', tables: ['d1020_user_activity'],
    prompt: `בטבלה d1020_user_activity יש שורה לכל חודש שבו משתמש היה פעיל (activity_month בפורמט YYYY-MM, ייתכנו שורות כפולות). משתמש פעיל בספטמבר 2026 נחשב "חדש" אם לא היה פעיל באף חודש מוקדם יותר, ו"קיים" אם היה פעיל לפחות בחודש מוקדם אחד. פעילות בחודשים מאוחרים יותר לא משפיעה. החזירו את אחוז המשתמשים החדשים ואת אחוז המשתמשים הקיימים מתוך כל המשתמשים הפעילים בספטמבר 2026, מעוגלים לשתי ספרות אחרי הנקודה. עמודות: new_pct, existing_pct.`,
    solution: `WITH sep AS (SELECT DISTINCT user_id FROM d1020_user_activity WHERE activity_month = '2026-09')
SELECT
  ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1020_user_activity e WHERE e.user_id = s.user_id AND e.activity_month < '2026-09') THEN 0 ELSE 1 END) / COUNT(*), 2) AS new_pct,
  ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1020_user_activity e WHERE e.user_id = s.user_id AND e.activity_month < '2026-09') THEN 1 ELSE 0 END) / COUNT(*), 2) AS existing_pct
FROM sep s;`,
    ordered: false,
  },
  {
    id: 'd20261020_i4', level: 'intermediate', added: '2026-10-20', source: 'Towards Data Science', company: 'Microsoft',
    ref: 'SQL challenge case study (most popular client among call-heavy users)', url: 'https://towardsdatascience.com/sql-challenge-case-study-7bd75eb864ac/',
    title: 'הלקוח הפופולרי בקרב משתמשי שיחות', tables: ['d1020_call_events'],
    prompt: `בטבלה d1020_call_events יש אירועים של משתמשים ובכל אירוע ה-client_id שבו הם משתמשים (לכל משתמש client_id אחד). אירועי שיחה הם event_type מסוג 'call_start', 'call_end' ו-'call_drop'. משתמש "מוכוון שיחות" אם לפחות 50% מהאירועים שלו הם אירועי שיחה. מצאו את ה-client_id שיש בו הכי הרבה משתמשים מוכווני שיחות (בשוויון, ה-client_id הראשון לפי סדר אלפביתי). עמודות: client_id, users (מספר המשתמשים המוכווני שיחות בו).`,
    solution: `SELECT client_id, COUNT(*) AS users FROM (
  SELECT user_id, client_id FROM d1020_call_events GROUP BY user_id, client_id
  HAVING 1.0 * SUM(CASE WHEN event_type IN ('call_start', 'call_end', 'call_drop') THEN 1 ELSE 0 END) / COUNT(*) >= 0.5
) GROUP BY client_id ORDER BY users DESC, client_id LIMIT 1;`,
    ordered: true,
  },
  {
    id: 'd20261020_i5', level: 'intermediate', added: '2026-10-20', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'עובדים מעל ממוצע המחלקה ושם המנהל', tables: ['d1020_staff'],
    prompt: `בטבלה d1020_staff יש עובדים עם מחלקה, שכר ומזהה המנהל הישיר (manager_id, ריק אצל מי שאין לו מנהל). החזירו כל עובד ששכרו גבוה ממש מהשכר הממוצע של כל עובדי מחלקתו (כולל העובד עצמו בחישוב הממוצע), יחד עם שם המנהל שלו (ריק אם אין מנהל). עמודות: name, dept, salary, manager_name. מיינו לפי dept, אחר כך לפי salary מהגבוה לנמוך, ולבסוף לפי name.`,
    solution: `SELECT s.name, s.dept, s.salary, m.name AS manager_name
FROM d1020_staff s LEFT JOIN d1020_staff m ON m.staff_id = s.manager_id
WHERE s.salary > (SELECT AVG(x.salary) FROM d1020_staff x WHERE x.dept = s.dept)
ORDER BY s.dept, s.salary DESC, s.name;`,
    ordered: true,
  },
  {
    id: 'd20261020_a1', level: 'advanced', added: '2026-10-20', source: 'DataLemur', company: 'Google',
    ref: 'Odd and Even Measurements', url: 'https://datalemur.com/questions/odd-even-measurements',
    title: 'סכום מדידות אי-זוגיות וזוגיות לכל יום', tables: ['d1020_meas'],
    prompt: `בטבלה d1020_meas יש מדידות של חיישן עם ערך וזמן מדידה (measurement_time). בכל יום, סדרו את המדידות לפי זמן המדידה: המדידה הראשונה באותו יום היא מספר 1, השנייה מספר 2 וכן הלאה. החזירו לכל יום את סכום הערכים של המדידות במקומות האי-זוגיים (1, 3, 5, ...) ואת סכום הערכים של המדידות במקומות הזוגיים (2, 4, 6, ...). עמודות: measurement_day (בפורמט YYYY-MM-DD), odd_sum, even_sum. מיינו לפי measurement_day.`,
    solution: `WITH r AS (
  SELECT date(measurement_time) AS d, measurement_value AS v,
    ROW_NUMBER() OVER (PARTITION BY date(measurement_time) ORDER BY measurement_time) AS rn
  FROM d1020_meas
)
SELECT d AS measurement_day,
  ROUND(SUM(CASE WHEN rn % 2 = 1 THEN v ELSE 0 END), 2) AS odd_sum,
  ROUND(SUM(CASE WHEN rn % 2 = 0 THEN v ELSE 0 END), 2) AS even_sum
FROM r GROUP BY d ORDER BY d;`,
    ordered: true,
  },
  {
    id: 'd20261020_a2', level: 'advanced', added: '2026-10-20', source: 'DataLemur', company: 'Wayfair',
    ref: 'Y-on-Y Growth Rate', url: 'https://datalemur.com/questions/yoy-growth-rate',
    title: 'צמיחה שנתית בהוצאה לכל מוצר', tables: ['d1020_spend'],
    prompt: `בטבלה d1020_spend יש עסקאות עם מוצר, סכום הוצאה ותאריך. לכל מוצר ולכל שנה שיש בה עסקאות, החזירו את סך ההוצאה בשנה, את סך ההוצאה בשנה הקלנדרית הקודמת (ריק אם לא הייתה הוצאה במוצר באותה שנה), ואת אחוז הצמיחה: (השנה הנוכחית פחות הקודמת) חלקי הקודמת כפול 100, מעוגל לשתי ספרות אחרי הנקודה (ריק אם אין שנה קודמת). עמודות: year, product_id, curr_year_spend, prev_year_spend, yoy_rate. מיינו לפי product_id ואז לפי year.`,
    solution: `WITH y AS (
  SELECT CAST(strftime('%Y', txn_date) AS INTEGER) AS yr, product_id, SUM(spend) AS s
  FROM d1020_spend GROUP BY 1, 2
)
SELECT c.yr AS year, c.product_id, c.s AS curr_year_spend, p.s AS prev_year_spend,
  ROUND(100.0 * (c.s - p.s) / p.s, 2) AS yoy_rate
FROM y c LEFT JOIN y p ON p.product_id = c.product_id AND p.yr = c.yr - 1
ORDER BY c.product_id, c.yr;`,
    ordered: true,
  },
  {
    id: 'd20261020_a3', level: 'advanced', added: '2026-10-20', source: 'DataLemur', company: 'Twitter',
    ref: "Tweets' Rolling Averages", url: 'https://datalemur.com/questions/rolling-average-tweets',
    title: 'ממוצע נע של ציוצים ל-3 ימים', tables: ['d1020_tweets'],
    prompt: `בטבלה d1020_tweets יש לכל משתמש מספר ציוצים בימים שבהם צייץ (ימים ללא שורה אינם מופיעים). לכל שורה, החזירו את הממוצע של tweet_count של אותו משתמש על פני שלושת הימים הקלנדריים המסתיימים בתאריך השורה (היום עצמו והיומיים שלפניו), כאשר נספרות רק שורות קיימות של אותו משתמש בטווח הזה. עיגול לשתי ספרות אחרי הנקודה. עמודות: user_id, tweet_date, rolling_avg_3d. מיינו לפי user_id ואז לפי tweet_date.`,
    solution: `SELECT t.user_id, t.tweet_date, ROUND(AVG(w.tweet_count), 2) AS rolling_avg_3d
FROM d1020_tweets t JOIN d1020_tweets w
  ON w.user_id = t.user_id AND w.tweet_date BETWEEN date(t.tweet_date, '-2 days') AND t.tweet_date
GROUP BY t.user_id, t.tweet_date ORDER BY t.user_id, t.tweet_date;`,
    ordered: true,
  },
  {
    id: 'd20261020_a4', level: 'advanced', added: '2026-10-20', source: 'StrataScratch', company: 'Meta',
    ref: 'Facebook Interview Question Walkthrough - Popular Posts', url: 'https://www.stratascratch.com/blog/facebook-interview-question-walkthrough-popular-posts',
    title: 'אחוז זמן הצפייה בפוסטים בכל סשן', tables: ['d1020_sessions', 'd1020_views'],
    prompt: `בטבלה d1020_sessions יש סשנים עם שניית התחלה ושניית סיום, ובטבלה d1020_views יש צפיות בפוסטים בתוך הסשן (view_start, view_end בשניות מתחילת הסשן). צפיות באותו סשן עשויות לחפוף זו לזו. זמן הצפייה של סשן הוא מספר השניות שבהן הייתה פעילה לפחות צפייה אחת (שנייה שמכוסה בכמה צפיות נספרת פעם אחת). לכל סשן שיש בו לפחות צפייה אחת, החזירו את זמן הצפייה ואת אחוזו מאורך הסשן (end_sec פחות start_sec), מעוגל לשתי ספרות אחרי הנקודה. עמודות: session_id, viewed_seconds, viewed_pct. מיינו לפי session_id.`,
    solution: `WITH o AS (
  SELECT session_id, view_start AS s, view_end AS e,
    MAX(view_end) OVER (PARTITION BY session_id ORDER BY view_start, view_end ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS pm
  FROM d1020_views
), g AS (
  SELECT *, SUM(CASE WHEN pm IS NULL OR s > pm THEN 1 ELSE 0 END) OVER (PARTITION BY session_id ORDER BY s, e ROWS UNBOUNDED PRECEDING) AS grp FROM o
), isl AS (
  SELECT session_id, grp, MAX(e) - MIN(s) AS len FROM g GROUP BY session_id, grp
), c AS (
  SELECT session_id, SUM(len) AS covered FROM isl GROUP BY session_id
)
SELECT c.session_id, c.covered AS viewed_seconds,
  ROUND(100.0 * c.covered / (se.end_sec - se.start_sec), 2) AS viewed_pct
FROM c JOIN d1020_sessions se ON se.session_id = c.session_id ORDER BY c.session_id;`,
    ordered: true,
  },
  {
    id: 'd20261020_a5', level: 'advanced', added: '2026-10-20', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הרגע הראשון שבו היתרה נהייתה שלילית', tables: ['d1020_wallet'],
    prompt: `בטבלה d1020_wallet יש תנועות בארנק של משתמשים (amount חיובי הוא הפקדה ושלילי הוא הוצאה). סדרו את התנועות של כל משתמש לפי tx_date ובשוויון לפי tx_id. לכל משתמש שהיתרה המצטברת שלו ירדה מתחת לאפס בנקודה כלשהי, החזירו את תאריך התנועה הראשונה שאחריה היתרה שלילית ואת היתרה באותה נקודה. עמודות: user_name, first_negative_date, balance. מיינו לפי user_name.`,
    solution: `WITH r AS (
  SELECT user_name, tx_date, tx_id, SUM(amount) OVER (PARTITION BY user_name ORDER BY tx_date, tx_id) AS bal FROM d1020_wallet
), n AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_name ORDER BY tx_date, tx_id) AS rn FROM r WHERE bal < 0
)
SELECT user_name, tx_date AS first_negative_date, bal AS balance FROM n WHERE rn = 1 ORDER BY user_name;`,
    ordered: true,
  },
  // ===== 2026-10-21 =====
  {
    id: 'd20261021_b1', level: 'basic', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Net amount with default discount', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'סכום נטו אחרי הנחה', tables: ['d1021_payments'],
    prompt: `בטבלה d1021_payments יש תשלומים, כולל סכום, הנחה (שעשויה להיות חסרה, ואז אין הנחה) ושיטת תשלום (שעשויה להיות חסרה). החזירו לכל תשלום את ה-id, את שיטת התשלום (כשהיא חסרה הציגו את הטקסט 'not specified') ואת הסכום נטו, כלומר הסכום פחות ההנחה. עמודות: id, method, net_amount. מיינו לפי id.`,
    solution: `SELECT id, COALESCE(payment_method, 'not specified') AS method, amount - COALESCE(discount, 0) AS net_amount FROM d1021_payments ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261021_b2', level: 'basic', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Active and canceled subscriptions per plan', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'מנויים פעילים ומבוטלים לפי תוכנית', tables: ['d1021_subs'],
    prompt: `בטבלה d1021_subs יש מנויים, כל אחד עם תוכנית (plan) וסטטוס (active, canceled או paused). לכל תוכנית החזירו את מספר המנויים הכולל, את מספר המנויים הפעילים ואת מספר המנויים המבוטלים. עמודות: plan, total, active, canceled. מיינו לפי שם התוכנית.`,
    solution: `SELECT plan, COUNT(*) AS total, SUM(status = 'active') AS active, SUM(status = 'canceled') AS canceled FROM d1021_subs GROUP BY plan ORDER BY plan;`,
    ordered: true,
  },
  {
    id: 'd20261021_b3', level: 'basic', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Categories with revenue at or above a threshold', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'קטגוריות עם הכנסה של לפחות 10,000', tables: ['d1021_lines'],
    prompt: `בטבלה d1021_lines יש שורות מכירה עם קטגוריה, כמות ומחיר ליחידה. ההכנסה של שורה היא כמות כפול מחיר. החזירו את הקטגוריות שסך ההכנסה שלהן הוא לפחות 10,000, עם סך ההכנסה מעוגל לשתי ספרות אחרי הנקודה. עמודות: category, revenue. מיינו לפי revenue מהגבוה לנמוך ובשוויון לפי category.`,
    solution: `SELECT category, ROUND(SUM(quantity * unit_price), 2) AS revenue FROM d1021_lines GROUP BY category HAVING SUM(quantity * unit_price) >= 10000 ORDER BY revenue DESC, category;`,
    ordered: true,
  },
  {
    id: 'd20261021_b4', level: 'basic', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Products whose names start with "Coffee"', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'מוצרים ששמם מתחיל ב-Coffee', tables: ['d1021_items'],
    prompt: `בטבלה d1021_items יש מוצרים (השם עשוי להיות חסר). החזירו את השם והמחיר של המוצרים ששמם מתחיל במילה Coffee (מוצר ששם נמצא בו Coffee באמצע לא נחשב). עמודות: name, price. מיינו לפי price מהנמוך לגבוה ובשוויון לפי name.`,
    solution: `SELECT name, price FROM d1021_items WHERE name LIKE 'Coffee %' ORDER BY price, name;`,
    ordered: true,
  },
  {
    id: 'd20261021_b5', level: 'basic', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Products with the maximum price', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'כל המוצרים במחיר הגבוה ביותר', tables: ['d1021_catalog'],
    prompt: `בטבלה d1021_catalog יש מוצרים, ולחלקם אין מחיר (מחיר חסר). החזירו את כל המוצרים שמחירם שווה למחיר הגבוה ביותר בטבלה (אם כמה מוצרים חולקים אותו מחיר, החזירו את כולם). עמודות: id, title, price. מיינו לפי id.`,
    solution: `SELECT id, title, price FROM d1021_catalog WHERE price = (SELECT MAX(price) FROM d1021_catalog) ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261021_i1', level: 'intermediate', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Products never ordered (anti-join)', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/middle.md',
    title: 'מוצרים שמעולם לא הוזמנו', tables: ['d1021_prod', 'd1021_oi'],
    prompt: `בטבלה d1021_prod יש מוצרים ובטבלה d1021_oi יש פריטים בהזמנות (ייתכן שבחלק מהשורות product_id חסר). החזירו את המוצרים שאינם מופיעים באף פריט הזמנה. עמודות: product_id, name, price, stock. מיינו לפי product_id.`,
    solution: `SELECT p.product_id, p.name, p.price, p.stock FROM d1021_prod p WHERE NOT EXISTS (SELECT 1 FROM d1021_oi o WHERE o.product_id = p.product_id) ORDER BY p.product_id;`,
    ordered: true,
  },
  {
    id: 'd20261021_i2', level: 'intermediate', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Posts with likes above the author\'s average', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/middle.md',
    title: 'פוסטים עם יותר לייקים מהממוצע של הכותב', tables: ['d1021_posts'],
    prompt: `בטבלה d1021_posts יש פוסטים עם כותב (user_id) ומספר לייקים. החזירו את הפוסטים שמספר הלייקים שלהם גבוה בהחלט מממוצע הלייקים של פוסטים של אותו כותב. עמודות: post_id, user_id, likes. מיינו לפי user_id ובשוויון לפי post_id.`,
    solution: `SELECT p.post_id, p.user_id, p.likes FROM d1021_posts p WHERE p.likes > (SELECT AVG(likes) FROM d1021_posts WHERE user_id = p.user_id) ORDER BY p.user_id, p.post_id;`,
    ordered: true,
  },
  {
    id: 'd20261021_i3', level: 'intermediate', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'API usage spike days', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/middle.md',
    title: 'ימי שיא בשימוש ב-API', tables: ['d1021_usage'],
    prompt: `בטבלה d1021_usage יש מספר קריאות API ליום לכל חשבון. החזירו את הימים שבהם מספר הקריאות היה לפחות פי 1.5 מממוצע הקריאות היומי של אותו חשבון (ממוצע על פני כל הימים של החשבון בטבלה). עמודות: account_id, usage_date, api_calls. מיינו לפי account_id ובשוויון לפי usage_date.`,
    solution: `SELECT u.account_id, u.usage_date, u.api_calls FROM d1021_usage u JOIN (SELECT account_id, AVG(api_calls) AS avg_calls FROM d1021_usage GROUP BY account_id) a ON a.account_id = u.account_id WHERE u.api_calls >= 1.5 * a.avg_calls ORDER BY u.account_id, u.usage_date;`,
    ordered: true,
  },
  {
    id: 'd20261021_i4', level: 'intermediate', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Customers with an order in the last 30 days (EXISTS)', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/middle.md',
    title: 'לקוחות עם הזמנה ב-30 הימים האחרונים', tables: ['d1021_custs', 'd1021_ords'],
    prompt: `בטבלה d1021_custs יש לקוחות ובטבלה d1021_ords יש הזמנות (בחלקן תאריך ההזמנה חסר). תאריך הדוח הוא 2026-07-17. החזירו את הלקוחות שיש להם לפחות הזמנה אחת בטווח של 30 הימים שמסתיים בתאריך הדוח, כלומר מ-2026-06-17 ועד 2026-07-17 כולל. הזמנות עתידיות אחרי תאריך הדוח אינן נספרות. עמודות: customer_id, name. מיינו לפי customer_id.`,
    solution: `SELECT c.customer_id, c.name FROM d1021_custs c WHERE EXISTS (SELECT 1 FROM d1021_ords o WHERE o.customer_id = c.customer_id AND o.ordered_at BETWEEN '2026-06-17' AND '2026-07-17') ORDER BY c.customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261021_i5', level: 'intermediate', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Same-city user pairs', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/junior.md',
    title: 'זוגות משתמשים מאותה עיר', tables: ['d1021_users2'],
    prompt: `בטבלה d1021_users2 יש משתמשים עם עיר (לחלקם העיר חסרה). החזירו כל זוג משתמשים שגרים באותה עיר, כל זוג פעם אחת בלבד (המשתמש עם ה-id הקטן יופיע ראשון) וללא זוג של משתמש עם עצמו. משתמשים שהעיר שלהם חסרה אינם נחשבים כגרים באותה עיר. עמודות: user1, user2, city (user1 ו-user2 הם שמות). מיינו לפי city, אחר כך user1 ואחר כך user2.`,
    solution: `SELECT a.name AS user1, b.name AS user2, a.city FROM d1021_users2 a JOIN d1021_users2 b ON a.city = b.city AND a.id < b.id ORDER BY a.city, a.name, b.name;`,
    ordered: true,
  },
  {
    id: 'd20261021_a1', level: 'advanced', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Checkout funnel with step-by-step conversion', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/senior.md',
    title: 'משפך רכישה והמרה בין שלבים', tables: ['d1021_funnel'],
    prompt: `בטבלה d1021_funnel יש אירועי משתמשים בשלבי רכישה: view, cart, checkout, purchase (בסדר הזה). משתמש יכול להופיע כמה פעמים באותו שלב. לכל שלב החזירו את מספר המשתמשים השונים שהגיעו אליו ואת אחוז ההמרה ביחס לשלב הקודם (מספר המשתמשים בשלב חלקי מספר המשתמשים בשלב הקודם, באחוזים, מעוגל לספרה אחת אחרי הנקודה). בשלב הראשון אחוז ההמרה הוא NULL. עמודות: step, users, conv_pct. מיינו לפי סדר השלבים.`,
    solution: `WITH s AS (
  SELECT step, COUNT(DISTINCT user_id) AS users,
    CASE step WHEN 'view' THEN 1 WHEN 'cart' THEN 2 WHEN 'checkout' THEN 3 ELSE 4 END AS ord
  FROM d1021_funnel GROUP BY step
)
SELECT step, users, ROUND(100.0 * users / LAG(users) OVER (ORDER BY ord), 1) AS conv_pct FROM s ORDER BY ord;`,
    ordered: true,
  },
  {
    id: 'd20261021_a2', level: 'advanced', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Median payment amount by segment', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/senior.md',
    title: 'חציון תשלום לפי סגמנט', tables: ['d1021_pay'],
    prompt: `בטבלה d1021_pay יש תשלומים לפי סגמנט. לכל סגמנט החזירו את חציון סכומי התשלום (כשמספר התשלומים זוגי, החציון הוא ממוצע שני הערכים האמצעיים), מעוגל לשתי ספרות אחרי הנקודה. עמודות: segment, median_amount. מיינו לפי segment.`,
    solution: `WITH r AS (
  SELECT segment, amount,
    ROW_NUMBER() OVER (PARTITION BY segment ORDER BY amount) AS rn,
    COUNT(*) OVER (PARTITION BY segment) AS n
  FROM d1021_pay
)
SELECT segment, ROUND(AVG(amount), 2) AS median_amount FROM r WHERE rn IN ((n + 1) / 2, (n + 2) / 2) GROUP BY segment ORDER BY segment;`,
    ordered: true,
  },
  {
    id: 'd20261021_a3', level: 'advanced', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'SCD Type-2 intervals from change history', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/senior.md',
    title: 'בניית טווחי תוקף מהיסטוריית שינויים', tables: ['d1021_cust_changes'],
    prompt: `בטבלה d1021_cust_changes יש היסטוריית שינויים של סגמנט לקוח (segment עשוי להיות NULL, כלומר ללא סגמנט). שינויים רצופים של אותו לקוח לאותו ערך (כולל NULL אחרי NULL) הם גרסה אחת. לכל גרסה החזירו את תאריך תחילתה (תאריך השינוי הראשון בגרסה), את תאריך סיומה (היום שלפני תחילת הגרסה הבאה של אותו לקוח, או NULL בגרסה האחרונה) ודגל is_current שהוא 1 לגרסה האחרונה של הלקוח ו-0 לאחרות. עמודות: customer_id, segment, valid_from, valid_to, is_current. מיינו לפי customer_id ואז valid_from.`,
    solution: `WITH x AS (
  SELECT customer_id, segment, changed_at,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY changed_at) AS rn,
    LAG(segment) OVER (PARTITION BY customer_id ORDER BY changed_at) AS prev_seg
  FROM d1021_cust_changes
), v AS (
  SELECT customer_id, segment, changed_at AS valid_from FROM x WHERE rn = 1 OR segment IS NOT prev_seg
)
SELECT customer_id, segment, valid_from,
  DATE(LEAD(valid_from) OVER (PARTITION BY customer_id ORDER BY valid_from), '-1 day') AS valid_to,
  CASE WHEN LEAD(valid_from) OVER (PARTITION BY customer_id ORDER BY valid_from) IS NULL THEN 1 ELSE 0 END AS is_current
FROM v ORDER BY customer_id, valid_from;`,
    ordered: true,
  },
  {
    id: 'd20261021_a4', level: 'advanced', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'First-touch attribution of revenue by channel', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/senior.md',
    title: 'ייחוס הכנסות לערוץ המגע הראשון', tables: ['d1021_touches', 'd1021_convs'],
    prompt: `בטבלה d1021_touches יש מגעים שיווקיים של משתמשים בערוצים שונים, ובטבלה d1021_convs יש המרות עם הכנסה. כל המרה מיוחסת לערוץ של המגע המוקדם ביותר של אותו משתמש (touch_time הקטן ביותר, ובשוויון המגע עם touch_id הקטן יותר). המרות של משתמשים שאין להם אף מגע מיוחסות לערוץ 'direct'. החזירו לכל ערוץ את מספר ההמרות ואת סך ההכנסה. עמודות: channel, conversions, total_revenue. מיינו לפי total_revenue מהגבוה לנמוך ובשוויון לפי channel.`,
    solution: `WITH first_touch AS (
  SELECT user_id, channel, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY touch_time, touch_id) AS rn FROM d1021_touches
)
SELECT COALESCE(f.channel, 'direct') AS channel, COUNT(*) AS conversions, SUM(c.revenue) AS total_revenue
FROM d1021_convs c LEFT JOIN first_touch f ON f.user_id = c.user_id AND f.rn = 1
GROUP BY COALESCE(f.channel, 'direct') ORDER BY total_revenue DESC, channel;`,
    ordered: true,
  },
  {
    id: 'd20261021_a5', level: 'advanced', added: '2026-10-21', source: 'GitHub', company: '',
    ref: 'Rolling 7-day WAU', url: 'https://github.com/zaskulpitona-ux/sql-interview-tasks/blob/main/tasks/senior.md',
    title: 'משתמשים פעילים בחלון נע של 7 ימים', tables: ['d1021_sessions'],
    prompt: `בטבלה d1021_sessions יש סשנים של שחקנים (שחקן יכול להופיע כמה פעמים באותו יום). לכל יום בלוח השנה, מהיום הראשון בטבלה ועד האחרון, כולל ימים ללא אף סשן, החזירו את מספר השחקנים השונים שהיה להם לפחות סשן אחד ב-7 הימים שמסתיימים באותו יום (היום עצמו ו-6 הימים שלפניו). עמודות: day, wau. מיינו לפי day.`,
    solution: `WITH RECURSIVE cal(day) AS (
  SELECT MIN(play_date) FROM d1021_sessions
  UNION ALL
  SELECT DATE(day, '+1 day') FROM cal WHERE day < (SELECT MAX(play_date) FROM d1021_sessions)
)
SELECT cal.day AS day, (SELECT COUNT(DISTINCT s.player_id) FROM d1021_sessions s WHERE s.play_date BETWEEN DATE(cal.day, '-6 day') AND cal.day) AS wau
FROM cal ORDER BY cal.day;`,
    ordered: true,
  },
  {
    id: 'd20261022_b1', level: 'basic', added: '2026-10-22', source: 'StrataScratch', company: 'Airbnb',
    ref: 'Ranking Hosts by Beds', url: 'https://www.stratascratch.com/blog/sql-window-functions-interview-questions-by-airbnb',
    title: 'סך המיטות לכל מארח', tables: ['d1022_listings'],
    prompt: `בטבלה d1022_listings יש מודעות אירוח, ולכל מודעה מארח (host_id) ומספר מיטות (beds, ייתכן ריק כשהנתון חסר). החזירו לכל מארח את סך המיטות בכל המודעות שלו (נתון חסר אינו נספר). עמודות: host_id, total_beds. מיינו לפי total_beds מהגבוה לנמוך ובשוויון לפי host_id עולה.`,
    solution: `SELECT host_id, SUM(beds) AS total_beds FROM d1022_listings GROUP BY host_id ORDER BY total_beds DESC, host_id;`,
    ordered: true,
  },
  {
    id: 'd20261022_b2', level: 'basic', added: '2026-10-22', source: 'University of Rochester Career Education', company: '',
    ref: 'Count messages per sender in a date range', url: 'https://careereducation.rochester.edu/blog/2025/03/05/top-25-sql-data-engineering-interview-questions/',
    title: 'הודעות לכל שולח בטווח תאריכים', tables: ['d1022_messages'],
    prompt: `בטבלה d1022_messages יש הודעות, ולכל הודעה שולח (sender_id) וזמן שליחה (sent_at, בפורמט YYYY-MM-DD HH:MM). החזירו את מספר ההודעות של כל שולח שנשלחו בין 2026-08-10 ל-2026-08-20 כולל, כאשר כל שעות היום האחרון נכללות. הציגו רק שולחים עם לפחות 2 הודעות בטווח. עמודות: sender_id, msg_count. מיינו לפי msg_count מהגבוה לנמוך ובשוויון לפי sender_id עולה.`,
    solution: `SELECT sender_id, COUNT(*) AS msg_count FROM d1022_messages
WHERE sent_at >= '2026-08-10' AND sent_at < '2026-08-21'
GROUP BY sender_id HAVING COUNT(*) >= 2 ORDER BY msg_count DESC, sender_id;`,
    ordered: true,
  },
  {
    id: 'd20261022_b3', level: 'basic', added: '2026-10-22', source: 'LeetCode', company: '',
    ref: 'Number of Calls Between Two Persons', url: 'https://leetcode.com/problems/number-of-calls-between-two-persons/',
    title: 'שיחות בין זוגות אנשים', tables: ['d1022_calls'],
    prompt: `בטבלה d1022_calls יש שיחות טלפון: caller_id, callee_id ו-duration (בשניות). לכל זוג אנשים, ללא קשר לכיוון השיחה, החזירו את מספר השיחות ביניהם וסך משך השיחות. הזוג מוצג פעם אחת כך ש-person1 קטן מ-person2. עמודות: person1, person2, call_count, total_duration.`,
    solution: `SELECT MIN(caller_id, callee_id) AS person1, MAX(caller_id, callee_id) AS person2, COUNT(*) AS call_count, SUM(duration) AS total_duration
FROM d1022_calls GROUP BY MIN(caller_id, callee_id), MAX(caller_id, callee_id);`,
    ordered: false,
  },
  {
    id: 'd20261022_b4', level: 'basic', added: '2026-10-22', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'ממוצע מחיר נסיעה לעיר', tables: ['d1022_rides'],
    prompt: `בטבלה d1022_rides יש נסיעות עם עיר (city), מחיר (fare) וסטטוס (status). בחנו רק נסיעות בסטטוס completed. החזירו לכל עיר עם לפחות 3 נסיעות כאלה את מספר הנסיעות ואת ממוצע המחיר מעוגל ל-2 ספרות אחרי הנקודה. עמודות: city, rides, avg_fare. מיינו לפי avg_fare מהגבוה לנמוך.`,
    solution: `SELECT city, COUNT(*) AS rides, ROUND(AVG(fare), 2) AS avg_fare FROM d1022_rides
WHERE status = 'completed' GROUP BY city HAVING COUNT(*) >= 3 ORDER BY avg_fare DESC;`,
    ordered: true,
  },
  {
    id: 'd20261022_b5', level: 'basic', added: '2026-10-22', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פניות פתוחות לפי עדיפות', tables: ['d1022_tickets'],
    prompt: `בטבלה d1022_tickets יש פניות תמיכה. פנייה שעדיין לא טופלה היא פנייה שאין לה זמן סגירה (resolved_at ריק). לכל רמת עדיפות (priority) שיש בה לפחות פנייה פתוחה אחת, החזירו את סך הפניות, מספר הפניות הפתוחות ואחוז הפתוחות מתוך הכול, מעוגל לספרה אחת אחרי הנקודה. עמודות: priority, total_tickets, open_tickets, open_pct.`,
    solution: `SELECT priority, COUNT(*) AS total_tickets, SUM(resolved_at IS NULL) AS open_tickets, ROUND(100.0 * SUM(resolved_at IS NULL) / COUNT(*), 1) AS open_pct
FROM d1022_tickets GROUP BY priority HAVING SUM(resolved_at IS NULL) > 0;`,
    ordered: false,
  },
  {
    id: 'd20261022_i1', level: 'intermediate', added: '2026-10-22', source: 'DataLemur', company: 'Robinhood',
    ref: 'Completed Trades', url: 'https://datalemur.com/questions/completed-trades',
    title: 'שלוש הערים עם הכי הרבה עסקאות שהושלמו', tables: ['d1022_trades', 'd1022_users'],
    prompt: `בטבלה d1022_trades יש הוראות מסחר (order_id, user_id, status), ובטבלה d1022_users יש את עיר המגורים של כל משתמש. החזירו את שלוש הערים עם מספר ההוראות הגבוה ביותר בסטטוס Completed. עמודות: city, completed_orders. מיינו לפי completed_orders מהגבוה לנמוך (אין שוויון בין שלושת המקומות הראשונים).`,
    solution: `SELECT u.city, COUNT(*) AS completed_orders FROM d1022_trades t JOIN d1022_users u ON u.user_id = t.user_id
WHERE t.status = 'Completed' GROUP BY u.city ORDER BY completed_orders DESC LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261022_i2', level: 'intermediate', added: '2026-10-22', source: 'LeetCode', company: '',
    ref: 'Count Salary Categories', url: 'https://leetcode.com/problems/count-salary-categories/description/',
    title: 'חשבונות לפי קטגוריית הכנסה', tables: ['d1022_accounts'],
    prompt: `בטבלה d1022_accounts יש חשבונות בנק עם הכנסה חודשית (income). סווגו כל חשבון: Low Salary אם ההכנסה קטנה מ-20000, Average Salary אם היא בין 20000 ל-50000 כולל, High Salary אם היא גדולה מ-50000. החזירו את מספר החשבונות בכל אחת משלוש הקטגוריות, וגם קטגוריה שאין בה חשבונות מוצגת עם 0. עמודות: category, accounts_count.`,
    solution: `SELECT c.category, COUNT(a.account_id) AS accounts_count
FROM (SELECT 'Low Salary' AS category UNION ALL SELECT 'Average Salary' UNION ALL SELECT 'High Salary') c
LEFT JOIN d1022_accounts a ON c.category = CASE WHEN a.income < 20000 THEN 'Low Salary' WHEN a.income <= 50000 THEN 'Average Salary' ELSE 'High Salary' END
GROUP BY c.category;`,
    ordered: false,
  },
  {
    id: 'd20261022_i3', level: 'intermediate', added: '2026-10-22', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות שלא הזמינו מאז תחילת ספטמבר', tables: ['d1022_customers', 'd1022_orders'],
    prompt: `בטבלאות d1022_customers ו-d1022_orders, החזירו את הלקוחות שאין להם אף הזמנה בתאריך 2026-09-01 או אחריו, כולל לקוחות שמעולם לא הזמינו. עבור כל אחד הציגו את תאריך ההזמנה האחרונה שלו (ריק אם אין). עמודות: customer_id, name, last_order_date.`,
    solution: `SELECT c.customer_id, c.name, MAX(o.order_date) AS last_order_date
FROM d1022_customers c LEFT JOIN d1022_orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.name HAVING COALESCE(MAX(o.order_date), '') < '2026-09-01';`,
    ordered: false,
  },
  {
    id: 'd20261022_i4', level: 'intermediate', added: '2026-10-22', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שיעור משלוחים מאחרים לכל מסעדה', tables: ['d1022_dlv'],
    prompt: `בטבלה d1022_dlv יש משלוחים עם זמן מובטח (promised_min) וזמן בפועל (actual_min, ריק למשלוח שבוטל). משלוח מאחר הוא משלוח שהזמן בפועל שלו גדול מהמובטח. התעלמו ממשלוחים שבוטלו. לכל מסעדה עם לפחות 3 משלוחים שנמסרו, החזירו את מספר המשלוחים שנמסרו, מספר המאחרים ואחוז המאחרים מעוגל לספרה אחת אחרי הנקודה. עמודות: restaurant, delivered, late_count, late_pct.`,
    solution: `SELECT restaurant, COUNT(*) AS delivered, SUM(actual_min > promised_min) AS late_count, ROUND(100.0 * SUM(actual_min > promised_min) / COUNT(*), 1) AS late_pct
FROM d1022_dlv WHERE actual_min IS NOT NULL GROUP BY restaurant HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261022_i5', level: 'intermediate', added: '2026-10-22', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נרשמים משני ערוצים', tables: ['d1022_web_signups', 'd1022_app_signups'],
    prompt: `הטבלאות d1022_web_signups ו-d1022_app_signups מכילות הרשמות דרך האתר ודרך האפליקציה. כתובת אותו משתמש עשויה להופיע באותיות גדולות וקטנות שונות. החזירו לכל כתובת דוא"ל (באותיות קטנות) שתאריך ההרשמה הראשון שלה היה במרץ 2026 את תאריך ההרשמה המוקדם ביותר שלה בכל הערוצים יחד ואת מספר הערוצים השונים שבהם נרשמה. עמודות: email, first_signup_date, channels.`,
    solution: `WITH s AS (
  SELECT LOWER(email) AS email, signup_date, 'web' AS ch FROM d1022_web_signups
  UNION ALL
  SELECT LOWER(email), signup_date, 'app' FROM d1022_app_signups
)
SELECT email, MIN(signup_date) AS first_signup_date, COUNT(DISTINCT ch) AS channels
FROM s GROUP BY email HAVING MIN(signup_date) >= '2026-03-01' AND MIN(signup_date) < '2026-04-01';`,
    ordered: false,
  },
  {
    id: 'd20261022_a1', level: 'advanced', added: '2026-10-22', source: 'DataLemur', company: 'DoorDash',
    ref: 'Rank Drivers by Daily Delivery Performance', url: 'https://datalemur.com/blog/doordash-sql-interview-questions',
    title: 'דירוג נהגים לפי זמן משלוח יומי', tables: ['d1022_dd'],
    prompt: `בטבלה d1022_dd יש משלוחים עם נהג (driver_id), זמן התחלה וזמן סיום (end_time ריק למשלוח שלא הסתיים; התעלמו ממנו). משך משלוח הוא מספר הדקות השלמות בין ההתחלה לסיום. לכל נהג ולכל יום (לפי זמן ההתחלה) החזירו את ממוצע משך המשלוחים ביום, מעוגל ל-2 ספרות, את דירוג הנהג באותו יום לפי הממוצע היומי מהנמוך לגבוה (נהגים עם אותו ממוצע מקבלים אותו מקום, והמקום הבא מדולג), ואת ממוצע משך כל המשלוחים של הנהג בכל הימים, מעוגל ל-2 ספרות. עמודות: driver_id, delivery_date, avg_minutes, daily_rank, driver_overall_avg.`,
    solution: `WITH d AS (
  SELECT driver_id, DATE(start_time) AS delivery_date, (strftime('%s', end_time) - strftime('%s', start_time)) / 60 AS mins
  FROM d1022_dd WHERE end_time IS NOT NULL
), daily AS (
  SELECT driver_id, delivery_date, AVG(mins) AS avg_minutes FROM d GROUP BY driver_id, delivery_date
)
SELECT driver_id, delivery_date, ROUND(avg_minutes, 2) AS avg_minutes,
  RANK() OVER (PARTITION BY delivery_date ORDER BY avg_minutes) AS daily_rank,
  ROUND((SELECT AVG(mins) FROM d WHERE d.driver_id = daily.driver_id), 2) AS driver_overall_avg
FROM daily;`,
    ordered: false,
  },
  {
    id: 'd20261022_a2', level: 'advanced', added: '2026-10-22', source: 'LeetCode', company: '',
    ref: 'Find the Missing IDs', url: 'https://leetcode.com/discuss/post/1601295/Database-SQL-Primer-(Part-4)-Recursive-CTEs/',
    title: 'מזהים חסרים ברצף', tables: ['d1022_members'],
    prompt: `בטבלה d1022_members יש חברים עם member_id. החזירו את כל המספרים השלמים בין 1 ל-member_id הגבוה ביותר בטבלה שאינם מופיעים בה כמזהה של אף חבר. עמודה: missing_id. מיינו מהקטן לגדול.`,
    solution: `WITH RECURSIVE n(i) AS (
  SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < (SELECT MAX(member_id) FROM d1022_members)
)
SELECT i AS missing_id FROM n WHERE i NOT IN (SELECT member_id FROM d1022_members) ORDER BY missing_id;`,
    ordered: true,
  },
  {
    id: 'd20261022_a3', level: 'advanced', added: '2026-10-22', source: 'LeetCode', company: '',
    ref: 'Average Salary: Departments VS Company', url: 'https://leetcode.com/problems/average-salary-departments-vs-company/',
    title: 'שכר ממוצע של מחלקה מול החברה', tables: ['d1022_salary'],
    prompt: `בטבלה d1022_salary יש תשלומי שכר לעובדים לפי מחלקה (dept) וחודש (pay_month). לכל חודש ולכל מחלקה, השוו את ממוצע השכר של המחלקה באותו חודש לממוצע השכר של כל עובדי החברה באותו חודש. החזירו higher אם ממוצע המחלקה גבוה יותר, lower אם נמוך יותר, same אם שווה. עמודות: pay_month, dept, comparison.`,
    solution: `WITH dm AS (SELECT pay_month, dept, AVG(amount) AS d_avg FROM d1022_salary GROUP BY pay_month, dept),
cm AS (SELECT pay_month, AVG(amount) AS c_avg FROM d1022_salary GROUP BY pay_month)
SELECT dm.pay_month, dm.dept, CASE WHEN d_avg > c_avg THEN 'higher' WHEN d_avg < c_avg THEN 'lower' ELSE 'same' END AS comparison
FROM dm JOIN cm ON cm.pay_month = dm.pay_month;`,
    ordered: false,
  },
  {
    id: 'd20261022_a4', level: 'advanced', added: '2026-10-22', source: 'StrataScratch', company: 'Airbnb',
    ref: 'Ranking Most Active Guests', url: 'https://www.stratascratch.com/blog/sql-window-functions-interview-questions-by-airbnb',
    title: 'דירוג האורחים הפעילים ביותר', tables: ['d1022_guest_msgs'],
    prompt: `בטבלה d1022_guest_msgs יש לכל שורה אורח (guest_id), מארח (host_id) ומספר ההודעות (n_messages) ששלח האורח למארח. דרגו את האורחים לפי סך ההודעות שלהם מהגבוה לנמוך: אורחים עם אותו סך מקבלים אותו דירוג, והדירוג הבא הוא המספר העוקב ללא דילוג. עמודות: guest_id, total_messages, ranking. מיינו לפי ranking ובשוויון לפי guest_id עולה.`,
    solution: `SELECT guest_id, SUM(n_messages) AS total_messages, DENSE_RANK() OVER (ORDER BY SUM(n_messages) DESC) AS ranking
FROM d1022_guest_msgs GROUP BY guest_id ORDER BY ranking, guest_id;`,
    ordered: true,
  },
  {
    id: 'd20261022_a5', level: 'advanced', added: '2026-10-22', source: 'StrataScratch', company: 'Spotify',
    ref: 'Days at Number One', url: 'https://platform.stratascratch.com/coding',
    title: 'רצף הימים הארוך ביותר במקום הראשון', tables: ['d1022_no1'],
    prompt: `בטבלה d1022_no1 יש לכל תאריך (chart_date) השיר שהיה במקום הראשון במצעד באותו יום; בחלק מהתאריכים אין שורה כלל. לכל שיר, החזירו את מספר הימים הרצופים (בלוח השנה) הארוך ביותר שבו היה במקום הראשון. עמודות: song, longest_streak. מיינו לפי longest_streak מהגבוה לנמוך ובשוויון לפי song.`,
    solution: `WITH g AS (
  SELECT song, chart_date, JULIANDAY(chart_date) - ROW_NUMBER() OVER (PARTITION BY song ORDER BY chart_date) AS grp FROM d1022_no1
), runs AS (SELECT song, COUNT(*) AS len FROM g GROUP BY song, grp)
SELECT song, MAX(len) AS longest_streak FROM runs GROUP BY song ORDER BY longest_streak DESC, song;`,
    ordered: true,
  },
  {
    id: 'd20261023_b1', level: 'basic', added: '2026-10-23', source: 'Data Interview', company: 'Netflix',
    ref: 'GROUP BY / HAVING: users who watched at least 3 different series', url: 'https://www.datainterview.com/courses/sql/sql-having',
    title: 'צופים בלפחות שלוש סדרות שונות', tables: ['d1023_watch'],
    prompt: `בטבלה d1023_watch כל שורה היא צפייה בפרק של סדרה על ידי משתמש. החזירו את המשתמשים שצפו בלפחות 3 סדרות שונות, יחד עם מספר הסדרות השונות שצפו בהן. עמודות: user_id, series_count. מיינו לפי series_count מהגבוה לנמוך ובשוויון לפי user_id עולה.`,
    solution: `SELECT user_id, COUNT(DISTINCT series) AS series_count FROM d1023_watch GROUP BY user_id HAVING COUNT(DISTINCT series) >= 3 ORDER BY series_count DESC, user_id;`,
    ordered: true,
  },
  {
    id: 'd20261023_b2', level: 'basic', added: '2026-10-23', source: 'StrataScratch', company: 'Apple',
    ref: 'Apple Data Scientist Interview Questions (events of MacBook Pro users)', url: 'https://www.stratascratch.com/blog/apple-data-scientist-interview-questions',
    title: 'אירועים של משתמשי MacBook Pro', tables: ['d1023_apple_events'],
    prompt: `בטבלה d1023_apple_events נרשמים אירועי משתמשים יחד עם המכשיר שבו בוצעו. לכל סוג אירוע (event_name), ספרו כמה אירועים בוצעו במכשיר מסוג MacBook Pro. עמודות: event_name, event_count. מיינו לפי event_count מהגבוה לנמוך ובשוויון לפי event_name בסדר אלפביתי.`,
    solution: `SELECT event_name, COUNT(*) AS event_count FROM d1023_apple_events WHERE device = 'MacBook Pro' GROUP BY event_name ORDER BY event_count DESC, event_name;`,
    ordered: true,
  },
  {
    id: 'd20261023_b3', level: 'basic', added: '2026-10-23', source: 'StrataScratch', company: 'Apple',
    ref: 'Apple Data Scientist Interview Questions (number of speakers of each language by country)', url: 'https://www.stratascratch.com/blog/apple-data-scientist-interview-questions',
    title: 'שפות שמדוברות ביותר ממדינה אחת', tables: ['d1023_speakers'],
    prompt: `בטבלה d1023_speakers יש לכל מדינה ואזור את השפות המדוברות בהם ומספר הדוברים. החזירו את השפות שמדוברות בשתי מדינות שונות או יותר, עם מספר המדינות וסך כל הדוברים בכל המדינות. עמודות: language, countries, total_speakers. מיינו לפי total_speakers מהגבוה לנמוך ובשוויון לפי language.`,
    solution: `SELECT language, COUNT(DISTINCT country) AS countries, SUM(speakers) AS total_speakers FROM d1023_speakers GROUP BY language HAVING COUNT(DISTINCT country) >= 2 ORDER BY total_speakers DESC, language;`,
    ordered: true,
  },
  {
    id: 'd20261023_b4', level: 'basic', added: '2026-10-23', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פריטי מלאי שדורשים הזמנה מחדש', tables: ['d1023_inventory'],
    prompt: `בטבלה d1023_inventory יש כמות במלאי (qty) לכל מק"ט בכל מחסן, ורף להזמנה מחדש (reorder_level) שיכול להיות ריק. פריט דורש הזמנה מחדש אם הכמות קטנה מהרף. כשאין רף מוגדר, הפריט דורש הזמנה מחדש רק אם הכמות שלו היא 0. החזירו את הפריטים שדורשים הזמנה מחדש. עמודות: sku, warehouse, qty. מיינו לפי sku ואז לפי warehouse.`,
    solution: `SELECT sku, warehouse, qty FROM d1023_inventory WHERE qty < reorder_level OR (reorder_level IS NULL AND qty = 0) ORDER BY sku, warehouse;`,
    ordered: true,
  },
  {
    id: 'd20261023_b5', level: 'basic', added: '2026-10-23', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'ממוצע תשלום לביקורים שהושלמו במרפאות', tables: ['d1023_visits'],
    prompt: `בטבלה d1023_visits רשומים ביקורי מטופלים במרפאות, עם סטטוס וסכום תשלום (fee) שחסר בחלק מהביקורים. לכל מרפאה, חשבו את מספר הביקורים בסטטוס done ואת ממוצע התשלום שלהם (ביקורים ללא סכום אינם נכללים בממוצע), מעוגל ל-2 ספרות אחרי הנקודה. הציגו רק מרפאות שיש בהן לפחות שני ביקורים בסטטוס done. עמודות: clinic, done_visits, avg_fee. מיינו לפי avg_fee מהגבוה לנמוך ובשוויון לפי clinic.`,
    solution: `SELECT clinic, COUNT(*) AS done_visits, ROUND(AVG(fee), 2) AS avg_fee FROM d1023_visits WHERE status = 'done' GROUP BY clinic HAVING COUNT(*) >= 2 ORDER BY avg_fee DESC, clinic;`,
    ordered: true,
  },
  {
    id: 'd20261023_i1', level: 'intermediate', added: '2026-10-23', source: 'DataLemur', company: 'Etsy',
    ref: 'Etsy SQL Interview Questions (signed up and purchased within 7 days)', url: 'https://datalemur.com/blog/etsy-sql-interview-questions',
    title: 'שיעור הנרשמים שקנו בתוך שבוע', tables: ['d1023_signups', 'd1023_purchases'],
    prompt: `בטבלה d1023_signups תאריך ההרשמה של כל משתמש, ובטבלה d1023_purchases רכישות (למשתמש יכולות להיות כמה). חשבו איזה חלק מהנרשמים ביצעו רכישה כלשהי בתוך 7 ימים מיום ההרשמה, כולל יום ההרשמה עצמו וכולל היום השביעי. רכישה שבוצעה לפני ההרשמה לא נחשבת, ורכישות של משתמשים שאינם בטבלת ההרשמות מתעלמים מהן. החזירו עמודה אחת, activation_rate, כשבר בין 0 ל-1 מעוגל ל-2 ספרות אחרי הנקודה.`,
    solution: `SELECT ROUND(1.0 * COUNT(DISTINCT s.user_id) / (SELECT COUNT(*) FROM d1023_signups), 2) AS activation_rate
FROM d1023_signups s JOIN d1023_purchases p ON p.user_id = s.user_id
 AND p.purchase_date BETWEEN s.signup_date AND DATE(s.signup_date, '+7 days');`,
    ordered: false,
  },
  {
    id: 'd20261023_i2', level: 'intermediate', added: '2026-10-23', source: 'DataLemur', company: 'Etsy',
    ref: 'Etsy SQL Interview Questions (first transaction)', url: 'https://datalemur.com/blog/etsy-sql-interview-questions',
    title: 'לקוחות שהעסקה הראשונה שלהם גדולה', tables: ['d1023_tx'],
    prompt: `בטבלה d1023_tx רשומות עסקאות של לקוחות. העסקה הראשונה של לקוח היא זו עם התאריך המוקדם ביותר, ובשוויון תאריכים זו עם tx_id הנמוך יותר. החזירו את הלקוחות שסכום העסקה הראשונה שלהם הוא 50 לפחות, יחד עם סכום העסקה הראשונה ומספר העסקאות הכולל של הלקוח. עמודות: customer_id, first_amount, tx_count. מיינו לפי customer_id.`,
    solution: `SELECT t.customer_id, t.amount AS first_amount, (SELECT COUNT(*) FROM d1023_tx x WHERE x.customer_id = t.customer_id) AS tx_count
FROM d1023_tx t
WHERE t.tx_id = (SELECT x.tx_id FROM d1023_tx x WHERE x.customer_id = t.customer_id ORDER BY x.tx_date, x.tx_id LIMIT 1)
  AND t.amount >= 50
ORDER BY t.customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261023_i3', level: 'intermediate', added: '2026-10-23', source: 'DataLemur', company: 'Netflix',
    ref: 'Netflix SQL Interview Questions (top users by hours watched last month)', url: 'https://datalemur.com/blog/netflix-sql-interview-questions',
    title: 'שלושת הצופים המובילים בחודש מרץ', tables: ['d1023_views'],
    prompt: `בטבלה d1023_views נרשמות צפיות של משתמשים בדקות. מצאו את שלושת המשתמשים שצפו הכי הרבה שעות בחודש מרץ 2026 (כולל הימים 1 ו-31 במרץ). עמודות: user_id, hours_watched (דקות חלקי 60, מעוגל ל-2 ספרות אחרי הנקודה). מיינו לפי סך הדקות מהגבוה לנמוך ובשוויון לפי user_id עולה, והחזירו רק שלוש שורות.`,
    solution: `SELECT user_id, ROUND(SUM(minutes) / 60.0, 2) AS hours_watched FROM d1023_views
WHERE view_date BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY user_id ORDER BY SUM(minutes) DESC, user_id LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261023_i4', level: 'intermediate', added: '2026-10-23', source: 'LeetCode', company: '',
    ref: 'Customer Order Frequency', url: 'https://cloud.tencent.cn/developer/article/1787716',
    title: 'לקוחות שהוציאו לפחות 100 ביוני וגם ביולי', tables: ['d1023_cust', 'd1023_ord', 'd1023_prod'],
    prompt: `הטבלאות d1023_cust (לקוחות), d1023_prod (מחיר ליחידה) ו-d1023_ord (הזמנות עם כמות) מתארות רכישות. החזירו את הלקוחות שסכום ההוצאה שלהם (כמות כפול מחיר) היה לפחות 100 גם בחודש יוני 2026 וגם בחודש יולי 2026. עמודות: customer_id, name. מיינו לפי customer_id.`,
    solution: `SELECT c.customer_id, c.name FROM d1023_cust c
JOIN d1023_ord o ON o.customer_id = c.customer_id JOIN d1023_prod p ON p.product_id = o.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN o.order_date LIKE '2026-06%' THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN o.order_date LIKE '2026-07%' THEN o.quantity * p.price ELSE 0 END) >= 100
ORDER BY c.customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261023_i5', level: 'intermediate', added: '2026-10-23', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מרוויחים מעל ממוצע המחלקה שמנהלם במחלקה אחרת', tables: ['d1023_hr_emp'],
    prompt: `בטבלה d1023_hr_emp יש עובדים עם מחלקה, שכר ומזהה מנהל (manager_id, ריק אצל מי שאין לו מנהל). החזירו את העובדים שיש להם מנהל, שהמנהל שלהם שייך למחלקה אחרת משלהם, ושהשכר שלהם גבוה בהחלט מהשכר הממוצע במחלקה שלהם. עמודות: emp_id, name, dept. מיינו לפי emp_id.`,
    solution: `SELECT e.emp_id, e.name, e.dept FROM d1023_hr_emp e
JOIN d1023_hr_emp m ON m.emp_id = e.manager_id
WHERE m.dept <> e.dept AND e.salary > (SELECT AVG(salary) FROM d1023_hr_emp d WHERE d.dept = e.dept)
ORDER BY e.emp_id;`,
    ordered: true,
  },
  {
    id: 'd20261023_a1', level: 'advanced', added: '2026-10-23', source: 'Dataford', company: 'Next Insurance',
    ref: 'How would you write a query to find the retention rate of customers year over year grouped by their industry classification', url: 'https://dataford.io/questions/how-would-you-write-a-query-to-find-the-retention-rate-of-customers-year-over-year-grouped-by-their-industry-classification-at-next-insurance',
    title: 'שימור לקוחות משנה לשנה לפי ענף', tables: ['d1023_cust_years'],
    prompt: `בטבלה d1023_cust_years יש שורה לכל לקוח וכל שנה שבה היה פעיל, יחד עם הענף שלו. לכל ענף ולכל שנה Y בין 2024 ל-2025, חשבו איזה אחוז מהלקוחות שהיו פעילים בשנה Y-1 היו פעילים גם בשנה Y. עמודות: industry, year, retention_pct (אחוז מעוגל ל-2 ספרות אחרי הנקודה). מיינו לפי industry ואז לפי year.`,
    solution: `SELECT a.industry, b.y AS year, ROUND(100.0 * COUNT(c.customer_id) / COUNT(*), 2) AS retention_pct
FROM d1023_cust_years a
JOIN (SELECT 2024 AS y UNION ALL SELECT 2025) b ON a.active_year = b.y - 1
LEFT JOIN d1023_cust_years c ON c.customer_id = a.customer_id AND c.active_year = b.y
GROUP BY a.industry, b.y ORDER BY a.industry, b.y;`,
    ordered: true,
  },
  {
    id: 'd20261023_a2', level: 'advanced', added: '2026-10-23', source: 'Scribd', company: '',
    ref: 'Write a query to calculate monthly retention rates (cohort by first purchase month)', url: 'https://www.scribd.com/document/862057097/Amazon-SQL-Question',
    title: 'שימור חודשי לפי קבוצת חודש הרכישה הראשונה', tables: ['d1023_shop_orders'],
    prompt: `בטבלה d1023_shop_orders יש הזמנות של לקוחות. קבוצת הלקוח היא החודש (בפורמט YYYY-MM) של ההזמנה הראשונה שלו. לכל קבוצה ולכל היסט חודשים (0 הוא חודש הקבוצה עצמו) שבו היה לפחות לקוח אחד פעיל מהקבוצה, החזירו כמה לקוחות מהקבוצה הזמינו באותו חודש ואיזה אחוז הם מגודל הקבוצה, מעוגל ל-2 ספרות אחרי הנקודה. עמודות: cohort_month, month_offset, active_customers, retention_pct. מיינו לפי cohort_month ואז month_offset.`,
    solution: `WITH f AS (SELECT customer_id, STRFTIME('%Y-%m', MIN(order_date)) AS cohort_month FROM d1023_shop_orders GROUP BY customer_id),
size AS (SELECT cohort_month, COUNT(*) AS n FROM f GROUP BY cohort_month),
act AS (
  SELECT DISTINCT o.customer_id, f.cohort_month,
    (CAST(STRFTIME('%Y', o.order_date) AS INTEGER) - CAST(SUBSTR(f.cohort_month, 1, 4) AS INTEGER)) * 12
    + CAST(STRFTIME('%m', o.order_date) AS INTEGER) - CAST(SUBSTR(f.cohort_month, 6, 2) AS INTEGER) AS month_offset
  FROM d1023_shop_orders o JOIN f ON f.customer_id = o.customer_id)
SELECT a.cohort_month, a.month_offset, COUNT(*) AS active_customers, ROUND(100.0 * COUNT(*) / s.n, 2) AS retention_pct
FROM act a JOIN size s ON s.cohort_month = a.cohort_month
GROUP BY a.cohort_month, a.month_offset ORDER BY a.cohort_month, a.month_offset;`,
    ordered: true,
  },
  {
    id: 'd20261023_a3', level: 'advanced', added: '2026-10-23', source: 'Codemia', company: 'Pinterest',
    ref: 'Optimize a slow query on orders (Pinterest Data Scientist take-home)', url: 'https://codemia.io/practice/optimize-a-slow-query-on-orders-6',
    title: 'הזמנות גדולות מהממוצע של ההזמנות הקודמות של הלקוח', tables: ['d1023_cust_orders'],
    prompt: `בטבלה d1023_cust_orders יש הזמנות של לקוחות. סדר ההזמנות של לקוח נקבע לפי order_date ובשוויון לפי order_id. עבור כל הזמנה שיש לפניה לפחות הזמנה אחת קודמת של אותו לקוח, חשבו את ממוצע הסכומים של כל ההזמנות הקודמות שלו (prev_avg, מעוגל ל-2 ספרות אחרי הנקודה). החזירו רק הזמנות שסכומן גבוה בהחלט מהממוצע הזה. עמודות: order_id, customer_id, amount, prev_avg. מיינו לפי customer_id, ואז order_date, ואז order_id.`,
    solution: `WITH t AS (
  SELECT order_id, customer_id, order_date, amount,
    AVG(amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS pa
  FROM d1023_cust_orders)
SELECT order_id, customer_id, amount, ROUND(pa, 2) AS prev_avg FROM t WHERE pa IS NOT NULL AND amount > pa
ORDER BY customer_id, order_date, order_id;`,
    ordered: true,
  },
  {
    id: 'd20261023_a4', level: 'advanced', added: '2026-10-23', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'ממוצע נע של 3 ימים עם ימים חסרים', tables: ['d1023_daily_rev'],
    prompt: `בטבלה d1023_daily_rev יש הכנסה יומית, ובחלק מהימים בין 2026-05-01 ל-2026-05-12 אין שורה כלל, והכנסתם נחשבת 0. לכל יום בין 2026-05-03 ל-2026-05-12 (כולל), חשבו את ממוצע ההכנסה של אותו יום ושני ימי הלוח שלפניו (שלושה ימי לוח בסך הכל), מעוגל ל-2 ספרות אחרי הנקודה. עמודות: day, avg_revenue_3d. החזירו שורה לכל אחד מהימים בטווח, ממוינת לפי day.`,
    solution: `WITH RECURSIVE cal(day) AS (SELECT '2026-05-01' UNION ALL SELECT DATE(day, '+1 day') FROM cal WHERE day < '2026-05-12'),
d AS (SELECT cal.day, COALESCE(r.revenue, 0) AS rev FROM cal LEFT JOIN d1023_daily_rev r ON r.day = cal.day),
m AS (SELECT day, AVG(rev) OVER (ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS a FROM d)
SELECT day, ROUND(a, 2) AS avg_revenue_3d FROM m WHERE day >= '2026-05-03' ORDER BY day;`,
    ordered: true,
  },
  {
    id: 'd20261023_a5', level: 'advanced', added: '2026-10-23', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משפך פרסום עם סדר אירועים לכל קמפיין', tables: ['d1023_ad_events'],
    prompt: `בטבלה d1023_ad_events נרשמים אירועי חשיפה (impression), לחיצה (click) ורכישה (purchase) של משתמשים בקמפיינים. לכל קמפיין, ספרו משתמשים ייחודיים בשלושה שלבים: impressions הם משתמשים עם חשיפה כלשהי; clicks הם משתמשים שלחצו אחרי החשיפה הראשונה שלהם בקמפיין; purchases הם משתמשים שרכשו אחרי הלחיצה הראשונה שהתבצעה אחרי החשיפה הראשונה. אירוע שקרה לפני השלב שקדם לו אינו נספר. עמודות: campaign, impressions, clicks, purchases. מיינו לפי campaign.`,
    solution: `WITH imp AS (SELECT user_id, campaign, MIN(event_ts) AS t FROM d1023_ad_events WHERE event_type = 'impression' GROUP BY user_id, campaign),
clk AS (SELECT i.user_id, i.campaign, MIN(e.event_ts) AS t FROM imp i JOIN d1023_ad_events e
  ON e.user_id = i.user_id AND e.campaign = i.campaign AND e.event_type = 'click' AND e.event_ts > i.t GROUP BY i.user_id, i.campaign),
pur AS (SELECT c.user_id, c.campaign FROM clk c JOIN d1023_ad_events e
  ON e.user_id = c.user_id AND e.campaign = c.campaign AND e.event_type = 'purchase' AND e.event_ts > c.t GROUP BY c.user_id, c.campaign)
SELECT i.campaign, COUNT(*) AS impressions, COUNT(c.user_id) AS clicks, COUNT(p.user_id) AS purchases
FROM imp i LEFT JOIN clk c ON c.user_id = i.user_id AND c.campaign = i.campaign
LEFT JOIN pur p ON p.user_id = i.user_id AND p.campaign = i.campaign
GROUP BY i.campaign ORDER BY i.campaign;`,
    ordered: true,
  },
  {
    id: 'd20261024_b1', level: 'basic', added: '2026-10-24', source: 'HackerRank', company: '',
    ref: 'Weather Observation Station 18', url: 'https://www.hackerrank.com/challenges/weather-observation-station-18/leaderboard',
    title: 'מרחק מנהטן בין פינות המפה', tables: ['d1024_stations'],
    prompt: `בטבלה d1024_stations כל שורה היא תחנת מדידה עם קו רוחב (lat_n) וקו אורך (long_w). דמיינו מלבן שפינתו האחת היא (הערך המינימלי של lat_n, הערך המינימלי של long_w) והפינה הנגדית היא (הערך המקסימלי של lat_n, הערך המקסימלי של long_w). החזירו שורה אחת עם מרחק מנהטן בין שתי הפינות (סכום ההפרשים המוחלטים בכל ציר), מעוגל ל-4 ספרות אחרי הנקודה. עמודה: manhattan_distance.`,
    solution: `SELECT ROUND(ABS(MAX(lat_n) - MIN(lat_n)) + ABS(MAX(long_w) - MIN(long_w)), 4) AS manhattan_distance FROM d1024_stations;`,
    ordered: false,
  },
  {
    id: 'd20261024_b2', level: 'basic', added: '2026-10-24', source: 'Interview Query', company: 'Fetch Rewards',
    ref: 'Fetch Rewards Data Analyst interview: duplicate receipts', url: 'https://interviewquery.com/interview-guides/fetch-rewards-llc-data-analyst',
    title: 'קבלות כפולות', tables: ['d1024_receipts'],
    prompt: `בטבלה d1024_receipts כל שורה היא קבלה שנסרקה באפליקציה. קבלות נחשבות כפולות כשיש להן אותם user_id, store, total ו-receipt_date. החזירו כל קבוצת קבלות כפולות (שמופיעה יותר מפעם אחת) יחד עם מספר ההעתקים שלה. עמודות: user_id, store, receipt_date, total, copies. מיינו לפי user_id ובשוויון לפי receipt_date עולה.`,
    solution: `SELECT user_id, store, receipt_date, total, COUNT(*) AS copies FROM d1024_receipts GROUP BY user_id, store, receipt_date, total HAVING COUNT(*) > 1 ORDER BY user_id, receipt_date;`,
    ordered: true,
  },
  {
    id: 'd20261024_b3', level: 'basic', added: '2026-10-24', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מוצרים לפי רמת מחיר', tables: ['d1024_products'],
    prompt: `בטבלה d1024_products כל שורה היא מוצר. סווגו כל מוצר לרמת מחיר: מחיר נמוך מ-20 הוא 'cheap', מחיר מ-20 ועד פחות מ-100 הוא 'mid', ומחיר 100 ומעלה הוא 'premium'. לכל רמה החזירו את מספר המוצרים ואת המחיר הממוצע, מעוגל לספרה אחת אחרי הנקודה. עמודות: tier, products, avg_price.`,
    solution: `SELECT CASE WHEN price < 20 THEN 'cheap' WHEN price < 100 THEN 'mid' ELSE 'premium' END AS tier, COUNT(*) AS products, ROUND(AVG(price), 1) AS avg_price FROM d1024_products GROUP BY tier;`,
    ordered: false,
  },
  {
    id: 'd20261024_b4', level: 'basic', added: '2026-10-24', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משימות באיחור לפי אחראי', tables: ['d1024_tasks'],
    prompt: `בטבלה d1024_tasks כל שורה היא משימה. משימה נחשבת באיחור אם לא הושלמה (done_date ריק) ותאריך היעד שלה (due_date) קטן מ-2026-10-01. ספרו משימות באיחור לכל אחראי; משימות ללא אחראי יוצגו תחת השם 'unassigned'. אחראים ללא משימות באיחור לא יופיעו. עמודות: assignee, overdue_tasks. מיינו לפי overdue_tasks מהגבוה לנמוך ובשוויון לפי assignee בסדר אלפביתי.`,
    solution: `SELECT COALESCE(assignee, 'unassigned') AS assignee, COUNT(*) AS overdue_tasks FROM d1024_tasks WHERE done_date IS NULL AND due_date < '2026-10-01' GROUP BY COALESCE(assignee, 'unassigned') ORDER BY overdue_tasks DESC, assignee;`,
    ordered: true,
  },
  {
    id: 'd20261024_b5', level: 'basic', added: '2026-10-24', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'טווח מחירים של מוצרים במלאי', tables: ['d1024_products'],
    prompt: `בטבלה d1024_products, עבור מוצרים שיש מהם מלאי (stock גדול מ-0) בלבד, החזירו לכל קטגוריה את המחיר הנמוך ביותר ואת המחיר הגבוה ביותר. הציגו רק קטגוריות שיש בהן לפחות 2 מוצרים במלאי. עמודות: category, min_price, max_price. מיינו לפי category בסדר אלפביתי.`,
    solution: `SELECT category, MIN(price) AS min_price, MAX(price) AS max_price FROM d1024_products WHERE stock > 0 GROUP BY category HAVING COUNT(*) >= 2 ORDER BY category;`,
    ordered: true,
  },
  {
    id: 'd20261024_i1', level: 'intermediate', added: '2026-10-24', source: 'HackerRank', company: '',
    ref: 'African Cities', url: 'https://github.com/cuongtrans/hackerrank-sql-challenges',
    title: 'ערים גדולות באפריקה', tables: ['d1024_city', 'd1024_country'],
    prompt: `בטבלה d1024_city נתונות ערים עם קוד מדינה (country_code), ובטבלה d1024_country נתונות מדינות עם היבשת שלהן (continent). החזירו את שמות הערים שנמצאות במדינה ביבשת 'Africa' ואוכלוסייתן (population) לפחות 1,000,000. עמודה: name. מיינו לפי name בסדר אלפביתי.`,
    solution: `SELECT c.name FROM d1024_city c JOIN d1024_country k ON k.code = c.country_code WHERE k.continent = 'Africa' AND c.population >= 1000000 ORDER BY c.name;`,
    ordered: true,
  },
  {
    id: 'd20261024_i2', level: 'intermediate', added: '2026-10-24', source: 'LeetCode', company: '',
    ref: 'Market Analysis I', url: 'https://www.scribd.com/document/887610471/LeetCode-SQL-Problems',
    title: 'הזמנות של כל חבר בשנת 2025', tables: ['d1024_members', 'd1024_mkt_orders'],
    prompt: `בטבלה d1024_members נתונים חברי מועדון עם תאריך הצטרפות, ובטבלה d1024_mkt_orders נתונות הזמנות. לכל חבר, כולל חברים שלא ביצעו אף הזמנה, החזירו כמה הזמנות ביצע במהלך שנת 2025 (מ-2025-01-01 עד 2025-12-31 כולל). עמודות: member_id, join_date, orders_2025.`,
    solution: `SELECT m.member_id, m.join_date, COUNT(o.order_id) AS orders_2025 FROM d1024_members m LEFT JOIN d1024_mkt_orders o ON o.member_id = m.member_id AND o.order_date BETWEEN '2025-01-01' AND '2025-12-31' GROUP BY m.member_id, m.join_date;`,
    ordered: false,
  },
  {
    id: 'd20261024_i3', level: 'intermediate', added: '2026-10-24', source: 'LeetCode', company: '',
    ref: 'Number of Comments per Post', url: 'https://medium.com/@checkedandchanged/leetcode-sql-questions-41ce9797689c',
    title: 'מספר תגובות לכל פוסט', tables: ['d1024_submissions'],
    prompt: `בטבלה d1024_submissions כל שורה היא פריט שפורסם: פוסט (parent_id ריק) או תגובה (parent_id הוא מזהה הפריט שאליו מגיבים). ייתכנו שורות כפולות לאותו sub_id. לכל פוסט (מזהה ייחודי), החזירו את מספר התגובות השונות שהוגשו ישירות אליו. תגובה לתגובה אינה נספרת לאף פוסט, ופוסט ללא תגובות מקבל 0. עמודות: post_id, number_of_comments. מיינו לפי post_id עולה.`,
    solution: `SELECT p.sub_id AS post_id, COUNT(DISTINCT c.sub_id) AS number_of_comments FROM (SELECT DISTINCT sub_id FROM d1024_submissions WHERE parent_id IS NULL) p LEFT JOIN d1024_submissions c ON c.parent_id = p.sub_id GROUP BY p.sub_id ORDER BY p.sub_id;`,
    ordered: true,
  },
  {
    id: 'd20261024_i4', level: 'intermediate', added: '2026-10-24', source: 'Interview Query', company: 'Amazon',
    ref: 'Top 13 Amazon SQL Interview Questions (unique pairs of locations in a flight_routes table)', url: 'https://www.interviewquery.com/p/amazon-sql-interview-questions',
    title: 'זוגות ערים ייחודיים', tables: ['d1024_flights'],
    prompt: `בטבלה d1024_flights כל שורה היא טיסה ממקור (origin) ליעד (destination). טיסה מ-A ל-B וטיסה מ-B ל-A הן אותו קו, וייתכנו גם שורות כפולות. החזירו כל קו ייחודי פעם אחת, כאשר city_a הוא השם הקטן יותר בסדר אלפביתי ו-city_b הגדול יותר. עמודות: city_a, city_b. מיינו לפי city_a ובשוויון לפי city_b.`,
    solution: `SELECT DISTINCT MIN(origin, destination) AS city_a, MAX(origin, destination) AS city_b FROM d1024_flights ORDER BY city_a, city_b;`,
    ordered: true,
  },
  {
    id: 'd20261024_i5', level: 'intermediate', added: '2026-10-24', source: 'Interview Query', company: 'Amazon',
    ref: 'Amazon Data Engineer guide: users currently Excited who were never Bored', url: 'https://interviewquery.com/interview-guides/amazon-data-engineer',
    title: 'נרגשים כרגע שמעולם לא שיעממו', tables: ['d1024_user_moods'],
    prompt: `בטבלה d1024_user_moods כל שורה היא דיווח מצב רוח של משתמש (mood) בזמן מסוים (ts). המצב הנוכחי של משתמש הוא מצב הרוח בדיווח האחרון שלו. החזירו את המשתמשים שהמצב הנוכחי שלהם הוא 'Excited' ושמעולם לא דיווחו 'Bored'. עמודה: user_id. מיינו לפי user_id עולה.`,
    solution: `SELECT m.user_id FROM d1024_user_moods m WHERE m.mood = 'Excited' AND m.ts = (SELECT MAX(ts) FROM d1024_user_moods x WHERE x.user_id = m.user_id) AND m.user_id NOT IN (SELECT user_id FROM d1024_user_moods WHERE mood = 'Bored') ORDER BY m.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261024_a1', level: 'advanced', added: '2026-10-24', source: 'DataLemur', company: 'Meta',
    ref: 'Event Friends Rec', url: 'https://datalemur.com/questions/event-friends-rec',
    title: 'המלצות חברים לפי אירועים פרטיים', tables: ['d1024_friend_pairs', 'd1024_rsvp'],
    prompt: `בטבלה d1024_rsvp נרשמות תשובות הגעה לאירועים (event_type הוא 'public' או 'private', ו-status הוא 'going', 'maybe' או 'not_going'; ייתכנו שורות כפולות). משתמש מעוניין להגיע לאירוע אם ה-status שלו הוא 'going' או 'maybe'. בטבלה d1024_friend_pairs כל שורה היא חברות בין שני משתמשים, בכל סדר. המליצו על זוגות משתמשים שאינם חברים ושמעוניינים להגיע לפחות ל-2 אירועים פרטיים משותפים שונים. כל זוג יופיע בשני הכיוונים. עמודות: user_a_id, user_b_id. מיינו לפי user_a_id ובשוויון לפי user_b_id.`,
    solution: `WITH interest AS (SELECT DISTINCT user_id, event_id FROM d1024_rsvp WHERE event_type = 'private' AND status IN ('going', 'maybe'))
SELECT a.user_id AS user_a_id, b.user_id AS user_b_id
FROM interest a JOIN interest b ON a.event_id = b.event_id AND a.user_id <> b.user_id
WHERE NOT EXISTS (SELECT 1 FROM d1024_friend_pairs f WHERE (f.user_a = a.user_id AND f.user_b = b.user_id) OR (f.user_a = b.user_id AND f.user_b = a.user_id))
GROUP BY a.user_id, b.user_id HAVING COUNT(*) >= 2
ORDER BY user_a_id, user_b_id;`,
    ordered: true,
  },
  {
    id: 'd20261024_a2', level: 'advanced', added: '2026-10-24', source: 'DataVidhya', company: 'Meta',
    ref: 'Users By Average Session Time', url: 'https://datavidhya.com/coding-problems/questionDetails/question/aggregation-users-avg-session-time/',
    title: 'זמן סשן ממוצע לכל משתמש', tables: ['d1024_web_log'],
    prompt: `בטבלה d1024_web_log נרשמים אירועי page_load ו-page_exit של משתמשים. סשן הוא פער הזמן בין טעינת עמוד ליציאה ממנו, ולכל משתמש יש לכל היותר סשן אחד ביום. אם באותו יום יש כמה טעינות או כמה יציאות, משתמשים בטעינה האחרונה של היום וביציאה המוקדמת ביותר של היום. יום נחשב רק אם הטעינה שנבחרה מוקדמת מהיציאה שנבחרה. לכל משתמש עם לפחות סשן תקף אחד, החזירו את ממוצע משך הסשנים בשניות, מעוגל ל-2 ספרות אחרי הנקודה. עמודות: user_id, avg_session_seconds. מיינו לפי user_id עולה.`,
    solution: `WITH d AS (SELECT user_id, date(ts) AS day, MAX(CASE WHEN action = 'page_load' THEN ts END) AS load_ts, MIN(CASE WHEN action = 'page_exit' THEN ts END) AS exit_ts FROM d1024_web_log GROUP BY user_id, date(ts))
SELECT user_id, ROUND(AVG(strftime('%s', exit_ts) - strftime('%s', load_ts)), 2) AS avg_session_seconds
FROM d WHERE load_ts < exit_ts GROUP BY user_id ORDER BY user_id;`,
    ordered: true,
  },
  {
    id: 'd20261024_a3', level: 'advanced', added: '2026-10-24', source: 'Interview Query', company: 'Amazon',
    ref: 'Top 13 Amazon SQL Interview Questions (cumulative new users per day, resetting each month)', url: 'https://www.interviewquery.com/p/amazon-sql-interview-questions',
    title: 'משתמשים חדשים מצטברים לפי חודש', tables: ['d1024_signups'],
    prompt: `בטבלה d1024_signups כל שורה היא הרשמה של משתמש חדש עם חותמת זמן. לכל יום שבו היו הרשמות, החזירו את מספר המשתמשים החדשים באותו יום ואת הסכום המצטבר של משתמשים חדשים מתחילת החודש הקלנדרי ועד אותו יום כולל (הסכום מתאפס בתחילת כל חודש). עמודות: day (בפורמט YYYY-MM-DD), new_users, month_to_date. מיינו לפי day עולה.`,
    solution: `WITH d AS (SELECT date(created_at) AS day, COUNT(*) AS new_users FROM d1024_signups GROUP BY date(created_at))
SELECT day, new_users, SUM(new_users) OVER (PARTITION BY strftime('%Y-%m', day) ORDER BY day) AS month_to_date FROM d ORDER BY day;`,
    ordered: true,
  },
  {
    id: 'd20261024_a4', level: 'advanced', added: '2026-10-24', source: 'LeetCode', company: '',
    ref: 'Product Sales Analysis IV', url: 'https://www.hellointerview.com/community/questions/product-sales-4/cm5eguhah03sy838o9yubp1qu',
    title: 'המוצר שעליו כל משתמש הוציא הכי הרבה', tables: ['d1024_sales', 'd1024_prod'],
    prompt: `בטבלה d1024_sales כל שורה היא רכישה של משתמש (כמות quantity ממוצר), ובטבלה d1024_prod מחיר ליחידה לכל מוצר. לכל משתמש החזירו את המוצר שעליו הוציא סך כסף הגבוה ביותר (סכום quantity כפול price על פני כל רכישותיו של אותו מוצר). אם כמה מוצרים שווים בסכום הגבוה ביותר, החזירו את כולם. עמודות: user_id, product_id. מיינו לפי user_id ובשוויון לפי product_id.`,
    solution: `WITH t AS (SELECT s.user_id, s.product_id, SUM(s.quantity * p.price) AS spent FROM d1024_sales s JOIN d1024_prod p ON p.product_id = s.product_id GROUP BY s.user_id, s.product_id),
r AS (SELECT *, RANK() OVER (PARTITION BY user_id ORDER BY spent DESC) AS rk FROM t)
SELECT user_id, product_id FROM r WHERE rk = 1 ORDER BY user_id, product_id;`,
    ordered: true,
  },
  {
    id: 'd20261024_a5', level: 'advanced', added: '2026-10-24', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הלקוחות שמרכיבים חצי מההכנסות', tables: ['d1024_invoices'],
    prompt: `בטבלה d1024_invoices כל שורה היא חשבונית של לקוח. חשבו את סך החשבוניות לכל לקוח וסדרו את הלקוחות מהסכום הגבוה לנמוך (בשוויון לפי שם הלקוח בסדר אלפביתי). החזירו את הקבוצה הקטנה ביותר של לקוחות מראש הרשימה הזו שסכומם המצטבר מגיע לפחות ל-50% מסך כל החשבוניות. עמודות: customer, total_amount. מיינו לפי total_amount מהגבוה לנמוך ובשוויון לפי customer.`,
    solution: `WITH t AS (SELECT customer, SUM(amount) AS total_amount FROM d1024_invoices GROUP BY customer),
c AS (SELECT customer, total_amount, SUM(total_amount) OVER (ORDER BY total_amount DESC, customer ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS before_amt, SUM(total_amount) OVER () AS grand FROM t)
SELECT customer, total_amount FROM c WHERE COALESCE(before_amt, 0) * 2 < grand ORDER BY total_amount DESC, customer;`,
    ordered: true,
  },
  // ===== 2026-10-25 =====
  {
    id: 'd20261025_b1', level: 'basic', added: '2026-10-25', source: 'HackerRank', company: '',
    ref: 'Average Population of Each Continent', url: 'https://dev.to/mrpunkdasilva/hackerrank-sql-average-population-of-each-continent-11bn',
    title: 'אוכלוסיית עיר ממוצעת בכל יבשת', tables: ['d1025_city', 'd1025_country'],
    prompt: `בטבלה d1025_city יש ערים ואוכלוסייתן, ובטבלה d1025_country יש לכל מדינה את היבשת שלה (countrycode בטבלת הערים מתאים ל-code בטבלת המדינות). לכל יבשת החזירו את גודל האוכלוסייה הממוצע של הערים בה, מעוגל כלפי מטה למספר שלם. עמודות: continent, avg_population. התעלמו מערים שאין להן מדינה בטבלת המדינות, ומיבשות שאין בהן ערים.`,
    solution: `SELECT co.continent, CAST(AVG(c.population) AS INTEGER) AS avg_population
FROM d1025_city c JOIN d1025_country co ON co.code = c.countrycode
GROUP BY co.continent;`,
    ordered: false,
  },
  {
    id: 'd20261025_b2', level: 'basic', added: '2026-10-25', source: 'Interview Query', company: 'Twitch',
    ref: 'Session Difference', url: 'https://www.interviewquery.com/questions/session-difference',
    title: 'ימים בין הסשן הראשון לאחרון', tables: ['d1025_user_sessions'],
    prompt: `בטבלה d1025_user_sessions כל שורה היא סשן של משתמש (created_at הוא תאריך בפורמט YYYY-MM-DD). התייחסו רק לסשנים שהתרחשו בשנת 2020. לכל משתמש שהיה לו לפחות סשן אחד ב-2020 החזירו את מספר הימים בין הסשן הראשון לסשן האחרון שלו באותה שנה (משתמש עם סשן יחיד מקבל 0). עמודות: user_id, days_between.`,
    solution: `SELECT user_id, CAST(julianday(MAX(created_at)) - julianday(MIN(created_at)) AS INTEGER) AS days_between
FROM d1025_user_sessions
WHERE created_at >= '2020-01-01' AND created_at < '2021-01-01'
GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261025_b3', level: 'basic', added: '2026-10-25', source: 'Dataford', company: '',
    ref: 'Write a query to extract the top 10 customers based on sales from a database', url: 'https://dataford.io/questions/write-a-query-to-extract-the-top-10-customers-based-on-sales-from-a-database',
    title: 'שלושת הלקוחות המובילים במכירות', tables: ['d1025_cust_sales'],
    prompt: `בטבלה d1025_cust_sales יש מכירות לפי לקוח. התחשבו רק במכירות בסטטוס 'paid'. החזירו את שלושת הלקוחות עם סך המכירות הגבוה ביותר. עמודות: customer, total_sales. מיינו לפי total_sales מהגבוה לנמוך ובשוויון לפי customer בסדר אלפביתי; בשוויון על המקום האחרון בחרו לפי אותו סדר.`,
    solution: `SELECT customer, SUM(amount) AS total_sales
FROM d1025_cust_sales
WHERE status = 'paid'
GROUP BY customer
ORDER BY total_sales DESC, customer
LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261025_b4', level: 'basic', added: '2026-10-25', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'דירוג ממוצע לז\'אנר', tables: ['d1025_games'],
    prompt: `בטבלה d1025_games יש משחקים עם ז'אנר ודירוג (rating), כשחלק מהמשחקים עדיין לא מדורגים (NULL). לכל ז'אנר שיש בו לפחות שני משחקים מדורגים החזירו את מספר המשחקים המדורגים ואת הדירוג הממוצע שלהם מעוגל לשתי ספרות אחרי הנקודה. עמודות: genre, rated_games, avg_rating.`,
    solution: `SELECT genre, COUNT(rating) AS rated_games, ROUND(AVG(rating), 2) AS avg_rating
FROM d1025_games
GROUP BY genre
HAVING COUNT(rating) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261025_b5', level: 'basic', added: '2026-10-25', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'דומיינים נפוצים באנשי קשר', tables: ['d1025_contacts'],
    prompt: `בטבלה d1025_contacts יש כתובות אימייל של אנשי קשר (חלקן NULL, וחלקן עם אותיות גדולות). הדומיין הוא החלק שאחרי ה-@, ויש להתייחס אליו באותיות קטנות בלבד. החזירו כל דומיין שמופיע אצל יותר מאיש קשר אחד, ואת מספר אנשי הקשר שלו. עמודות: domain, contacts.`,
    solution: `SELECT LOWER(SUBSTR(email, INSTR(email, '@') + 1)) AS domain, COUNT(*) AS contacts
FROM d1025_contacts
WHERE email IS NOT NULL
GROUP BY domain
HAVING COUNT(*) > 1;`,
    ordered: false,
  },
  {
    id: 'd20261025_i1', level: 'intermediate', added: '2026-10-25', source: 'LeetCode', company: '',
    ref: 'Customers Who Bought Products A and B but Not C', url: 'https://leetcode.doocs.org/en/lc/1398/',
    title: 'קנו A ו-B אבל לא C', tables: ['d1025_customers', 'd1025_orders'],
    prompt: `בטבלה d1025_orders יש הזמנות של לקוחות (product_name הוא שם המוצר), ובטבלה d1025_customers שמות הלקוחות. החזירו את הלקוחות שהזמינו גם את המוצר 'A' וגם את המוצר 'B' אך מעולם לא הזמינו את המוצר 'C'. עמודות: customer_id, customer_name.`,
    solution: `SELECT c.customer_id, c.customer_name
FROM d1025_customers c
JOIN d1025_orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.product_name = 'A') > 0 AND SUM(o.product_name = 'B') > 0 AND SUM(o.product_name = 'C') = 0;`,
    ordered: false,
  },
  {
    id: 'd20261025_i2', level: 'intermediate', added: '2026-10-25', source: 'LeetCode', company: '',
    ref: 'Primary Department for Each Employee', url: 'https://leetcode.doocs.org/en/lc/1789/',
    title: 'המחלקה הראשית של כל עובד', tables: ['d1025_emp_dept'],
    prompt: `בטבלה d1025_emp_dept כל שורה מציינת שעובד שייך למחלקה, ו-primary_flag הוא 'Y' אם זו המחלקה הראשית שלו ו-'N' אחרת. עובד ששייך ליותר ממחלקה אחת מסומן 'Y' בדיוק באחת מהן. עובד ששייך למחלקה אחת בלבד נחשב כשייך אליה כמחלקה ראשית, גם אם הדגל שלו הוא 'N'. החזירו לכל עובד את המחלקה הראשית שלו. עמודות: employee_id, department_id.`,
    solution: `SELECT employee_id, department_id FROM d1025_emp_dept WHERE primary_flag = 'Y'
UNION
SELECT employee_id, MIN(department_id) FROM d1025_emp_dept GROUP BY employee_id HAVING COUNT(*) = 1;`,
    ordered: false,
  },
  {
    id: 'd20261025_i3', level: 'intermediate', added: '2026-10-25', source: 'StrataScratch', company: 'Noom',
    ref: 'Noom Data Analyst Interview Question (average transaction per billing cycle)', url: 'https://stratascratch.com/blog/noom-data-analyst-interview-question',
    title: 'ממוצע עסקאות לרשומים ותיקים', tables: ['d1025_plans', 'd1025_signups', 'd1025_signup_txns'],
    prompt: `בטבלה d1025_signups יש הרשמות למנוי (start_date הוא תאריך תחילת המנוי), בטבלה d1025_plans לכל תוכנית יש מחזור חיוב (billing_cycle), ובטבלה d1025_signup_txns יש עסקאות לפי הרשמה. התייחסו רק להרשמות שהחלו יותר מ-10 חודשים לפני התאריך 2026-10-01 (כלומר לפני 2025-12-01). לכל הרשמה כזו שיש לה עסקאות החזירו את מחזור החיוב של התוכנית ואת סכום העסקה הממוצע שלה מעוגל לשתי ספרות אחרי הנקודה. עמודות: billing_cycle, signup_id, avg_amount. מיינו לפי billing_cycle בסדר אלפביתי הפוך (מ-z ל-a) ובשוויון לפי signup_id בסדר עולה.`,
    solution: `SELECT p.billing_cycle, s.signup_id, ROUND(AVG(t.amount), 2) AS avg_amount
FROM d1025_signups s
JOIN d1025_plans p ON p.plan_id = s.plan_id
JOIN d1025_signup_txns t ON t.signup_id = s.signup_id
WHERE s.start_date < date('2026-10-01', '-10 months')
GROUP BY p.billing_cycle, s.signup_id
ORDER BY p.billing_cycle DESC, s.signup_id;`,
    ordered: true,
  },
  {
    id: 'd20261025_i4', level: 'intermediate', added: '2026-10-25', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משתמשים בערוץ יחיד', tables: ['d1025_web_events', 'd1025_app_events'],
    prompt: `בטבלאות d1025_web_events ו-d1025_app_events יש אירועים של משתמשים באתר ובאפליקציה. החזירו כל משתמש שהופיע בערוץ אחד בלבד מבין השניים (באתר בלבד או באפליקציה בלבד), פעם אחת לכל משתמש, ואת הערוץ שלו: 'web' או 'app'. עמודות: user_id, channel.`,
    solution: `SELECT user_id, 'web' AS channel FROM (SELECT DISTINCT user_id FROM d1025_web_events) WHERE user_id NOT IN (SELECT user_id FROM d1025_app_events)
UNION ALL
SELECT user_id, 'app' FROM (SELECT DISTINCT user_id FROM d1025_app_events) WHERE user_id NOT IN (SELECT user_id FROM d1025_web_events);`,
    ordered: false,
  },
  {
    id: 'd20261025_i5', level: 'intermediate', added: '2026-10-25', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שיעור ביטולים חודשי', tables: ['d1025_bookings_log'],
    prompt: `בטבלה d1025_bookings_log יש הזמנות עם תאריך (booking_date) וסטטוס ('confirmed' או 'cancelled'). לכל חודש קלנדרי שבו היו לפחות 2 הזמנות החזירו את החודש בפורמט YYYY-MM, מספר ההזמנות, מספר ההזמנות שבוטלו ואחוז הביטולים מתוך כלל ההזמנות בחודש מעוגל לספרה אחת אחרי הנקודה. עמודות: month, total_bookings, cancelled, cancel_pct.`,
    solution: `SELECT strftime('%Y-%m', booking_date) AS month, COUNT(*) AS total_bookings, SUM(status = 'cancelled') AS cancelled,
       ROUND(100.0 * SUM(status = 'cancelled') / COUNT(*), 1) AS cancel_pct
FROM d1025_bookings_log
GROUP BY month
HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261025_a1', level: 'advanced', added: '2026-10-25', source: 'LeetCode', company: 'Pinterest',
    ref: 'Find Median Given Frequency of Numbers', url: 'https://leetcode.doocs.org/en/lc/571/',
    title: 'חציון לפי טבלת שכיחויות', tables: ['d1025_numbers'],
    prompt: `בטבלה d1025_numbers כל שורה מציינת ערך (num) ואת מספר הפעמים שהוא מופיע במדגם (frequency). חשבו את החציון של כל הערכים במדגם, כאילו כל ערך חוזר בדיוק frequency פעמים. אם מספר הערכים זוגי, החציון הוא הממוצע של שני הערכים האמצעיים. החזירו שורה אחת, עמודה אחת בשם median, מעוגלת לספרה אחת אחרי הנקודה.`,
    solution: `WITH c AS (SELECT num, frequency, SUM(frequency) OVER (ORDER BY num) AS cum, SUM(frequency) OVER () AS total FROM d1025_numbers)
SELECT ROUND(AVG(num), 1) AS median FROM c
WHERE (cum - frequency < (total + 1) / 2 AND cum >= (total + 1) / 2)
   OR (cum - frequency < (total + 2) / 2 AND cum >= (total + 2) / 2);`,
    ordered: false,
  },
  {
    id: 'd20261025_a2', level: 'advanced', added: '2026-10-25', source: 'LeetCode', company: '',
    ref: 'Number of Transactions per Visit', url: 'https://leetcode.doocs.org/en/lc/1336/',
    title: 'התפלגות עסקאות לביקור', tables: ['d1025_visits', 'd1025_visit_txns'],
    prompt: `בטבלה d1025_visits כל שורה היא ביקור של משתמש בחנות ביום מסוים, ובטבלה d1025_visit_txns כל שורה היא עסקה של משתמש באותו יום ביקור. עסקה שייכת לביקור של אותו משתמש באותו תאריך. לכל ערך k מ-0 ועד המספר המרבי של עסקאות בביקור בודד (כולל ערכים ביניים שאף ביקור לא מתאים להם) החזירו כמה ביקורים כללו בדיוק k עסקאות. עמודות: transactions_count, visits_count. מיינו לפי transactions_count בסדר עולה.`,
    solution: `WITH RECURSIVE per_visit AS (
  SELECT v.user_id, v.visit_date, COUNT(t.user_id) AS n
  FROM d1025_visits v LEFT JOIN d1025_visit_txns t ON t.user_id = v.user_id AND t.transaction_date = v.visit_date
  GROUP BY v.user_id, v.visit_date),
seq(k) AS (SELECT 0 UNION ALL SELECT k + 1 FROM seq WHERE k < (SELECT MAX(n) FROM per_visit))
SELECT seq.k AS transactions_count, COUNT(p.n) AS visits_count
FROM seq LEFT JOIN per_visit p ON p.n = seq.k
GROUP BY seq.k
ORDER BY seq.k;`,
    ordered: true,
  },
  {
    id: 'd20261025_a3', level: 'advanced', added: '2026-10-25', source: 'PracHub', company: 'DoorDash',
    ref: 'Analyze Order Spending Patterns Across Cities Using SQL', url: 'https://prachub.com/coding-questions/analyze-order-spending-patterns-across-cities-using-sql',
    title: 'דירוג הזמנות בעיר והזמנה קודמת', tables: ['d1025_dd_orders'],
    prompt: `בטבלה d1025_dd_orders יש הזמנות משלוח לפי משתמש ועיר. לכל הזמנה החזירו: order_id; city_rank - הדירוג של ערך ההזמנה (order_value) בתוך העיר שלה מהגבוה לנמוך, כך שהזמנות עם ערך זהה באותה עיר מקבלות אותו דירוג והדירוג הבא מדלג בהתאם; ו-prev_order_value - ערך ההזמנה הקודמת של אותו משתמש לפי order_date (ובשוויון לפי order_id), או NULL אם זו ההזמנה הראשונה שלו. מיינו לפי order_id.`,
    solution: `SELECT order_id,
       RANK() OVER (PARTITION BY city ORDER BY order_value DESC) AS city_rank,
       LAG(order_value) OVER (PARTITION BY user_id ORDER BY order_date, order_id) AS prev_order_value
FROM d1025_dd_orders
ORDER BY order_id;`,
    ordered: true,
  },
  {
    id: 'd20261025_a4', level: 'advanced', added: '2026-10-25', source: 'Interview Query', company: 'DoorDash',
    ref: 'How would you calculate weekly consumer retention for DoorDash users by cohort?', url: 'https://www.interviewquery.com/interview-guides/Doordash-Data-Analyst',
    title: 'שימור שבועי לפי קוהורט', tables: ['d1025_consumer_orders'],
    prompt: `בטבלה d1025_consumer_orders יש הזמנות של לקוחות. שבוע מתחיל ביום שני. הקוהורט של לקוח הוא השבוע שבו ביצע את ההזמנה הראשונה שלו. לכל קוהורט ולכל מספר שבועות מאז שבוע הקוהורט (0 הוא שבוע הקוהורט עצמו) שבהם לפחות לקוח אחד מהקוהורט הזמין, החזירו: cohort_week (תאריך יום השני של שבוע הקוהורט בפורמט YYYY-MM-DD), weeks_since (מספר שלם), active_customers (מספר הלקוחות השונים מהקוהורט שהזמינו באותו שבוע), ו-retention_pct - אחוז הלקוחות הפעילים מתוך גודל הקוהורט, מעוגל לספרה אחת אחרי הנקודה. מיינו לפי cohort_week ואז weeks_since.`,
    solution: `WITH o AS (SELECT consumer_id, order_date, date(order_date, '-' || ((CAST(strftime('%w', order_date) AS INTEGER) + 6) % 7) || ' days') AS wk FROM d1025_consumer_orders),
f AS (SELECT consumer_id, MIN(wk) AS cohort_week FROM o GROUP BY consumer_id),
sz AS (SELECT cohort_week, COUNT(*) AS size FROM f GROUP BY cohort_week),
a AS (SELECT f.cohort_week, CAST((julianday(o.wk) - julianday(f.cohort_week)) / 7 AS INTEGER) AS weeks_since, COUNT(DISTINCT o.consumer_id) AS active_customers
      FROM o JOIN f ON f.consumer_id = o.consumer_id GROUP BY f.cohort_week, weeks_since)
SELECT a.cohort_week, a.weeks_since, a.active_customers, ROUND(100.0 * a.active_customers / sz.size, 1) AS retention_pct
FROM a JOIN sz ON sz.cohort_week = a.cohort_week
ORDER BY a.cohort_week, a.weeks_since;`,
    ordered: true,
  },
  {
    id: 'd20261025_a5', level: 'advanced', added: '2026-10-25', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שרשרת הפניות של משתמשים', tables: ['d1025_referrals'],
    prompt: `בטבלה d1025_referrals לכל משתמש יש referred_by - המשתמש שהפנה אותו (NULL אם הצטרף בלי הפניה). הפנייה עקיפה נחשבת גם היא: אם A הפנה את B ו-B הפנה את C, אז C נספר גם אצל A. לכל משתמש בטבלה החזירו את המספר הכולל של המשתמשים שהגיעו דרכו, ישירות או בעקיפין (0 אם אף אחד). עמודות: user_id, total_referred.`,
    solution: `WITH RECURSIVE d(root, node) AS (
  SELECT referred_by, user_id FROM d1025_referrals WHERE referred_by IS NOT NULL
  UNION ALL
  SELECT d.root, r.user_id FROM d JOIN d1025_referrals r ON r.referred_by = d.node)
SELECT u.user_id, COUNT(d.node) AS total_referred
FROM d1025_referrals u LEFT JOIN d ON d.root = u.user_id
GROUP BY u.user_id;`,
    ordered: false,
  },
  {
    id: 'd20261026_b1', level: 'basic', added: '2026-10-26', source: 'HackerRank', company: '',
    ref: 'Weather Observation Station 4', url: 'https://dev.to/mrpunkdasilva/hackerrank-sql-weather-observation-station-4-1110',
    title: 'כמה שמות ערים חוזרים', tables: ['d1026_cities'],
    prompt: `בטבלה d1026_cities יש שורה לכל עיר, וייתכן ששם עיר יופיע בכמה שורות (למשל באותו שם במדינות שונות). החזירו מספר אחד: מספר השורות בטבלה פחות מספר שמות הערים השונים. עמודה: diff.`,
    solution: `SELECT COUNT(city) - COUNT(DISTINCT city) AS diff FROM d1026_cities;`,
    ordered: false,
  },
  {
    id: 'd20261026_b2', level: 'basic', added: '2026-10-26', source: 'datadriven.io', company: '',
    ref: 'Power Users', url: 'https://datadriven.io/interview/power_users',
    title: 'משתמשים עם חמש כניסות ומעלה', tables: ['d1026_sessions'],
    prompt: `בטבלה d1026_sessions כל שורה היא כניסה (session) של משתמש. החזירו את שמות המשתמשים שביצעו לפחות 5 כניסות, ולצדם מספר הכניסות. מיינו לפי מספר הכניסות מהגבוה לנמוך, ובשוויון לפי username בסדר אלפביתי. עמודות: username, session_count.`,
    solution: `SELECT username, COUNT(*) AS session_count FROM d1026_sessions GROUP BY username HAVING COUNT(*) >= 5 ORDER BY session_count DESC, username;`,
    ordered: true,
  },
  {
    id: 'd20261026_b3', level: 'basic', added: '2026-10-26', source: 'DataLemur', company: 'Meta',
    ref: 'Average Post Hiatus (Part 1)', url: 'https://datalemur.com/sql-interview-questions',
    title: 'ימים בין הפוסט הראשון לאחרון בשנה', tables: ['d1026_posts'],
    prompt: `בטבלה d1026_posts כל שורה היא פוסט של משתמש. התייחסו רק לפוסטים משנת 2026. עבור כל משתמש שפרסם לפחות שני פוסטים בשנה זו, החזירו את מספר הימים שבין הפוסט הראשון לפוסט האחרון שלו באותה שנה (מספר שלם; 0 אם כל הפוסטים באותו יום). עמודות: user_id, days_between.`,
    solution: `SELECT user_id, CAST(JULIANDAY(MAX(post_date)) - JULIANDAY(MIN(post_date)) AS INTEGER) AS days_between FROM d1026_posts WHERE post_date >= '2026-01-01' AND post_date < '2027-01-01' GROUP BY user_id HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261026_b4', level: 'basic', added: '2026-10-26', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מחיר ממוצע ומוצרים בלי מחיר לפי קטגוריה', tables: ['d1026_products'],
    prompt: `בטבלה d1026_products חלק מהמוצרים מופיעים בלי מחיר (NULL). התייחסו רק למוצרים שיש מהם מלאי (stock גדול מ-0). לכל קטגוריה שנשאר בה לפחות מוצר אחד, החזירו את המחיר הממוצע של המוצרים שיש להם מחיר, מעוגל לשתי ספרות אחרי הנקודה (NULL אם לאף מוצר בקטגוריה אין מחיר), ואת מספר המוצרים בלי מחיר. עמודות: category, avg_price, missing_price_count.`,
    solution: `SELECT category, ROUND(AVG(price), 2) AS avg_price, SUM(CASE WHEN price IS NULL THEN 1 ELSE 0 END) AS missing_price_count FROM d1026_products WHERE stock > 0 GROUP BY category;`,
    ordered: false,
  },
  {
    id: 'd20261026_b5', level: 'basic', added: '2026-10-26', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הלוואות מאושרות לפי רמת סכום', tables: ['d1026_loans'],
    prompt: `בטבלה d1026_loans התייחסו רק להלוואות בסטטוס approved. סווגו אותן לרמות לפי הסכום: small - פחות מ-10,000; medium - מ-10,000 ועד 49,999 כולל; large - 50,000 ומעלה. לכל רמה שיש בה הלוואות החזירו את מספר ההלוואות ואת סך הסכומים. עמודות: tier, loans, total_amount.`,
    solution: `SELECT CASE WHEN amount < 10000 THEN 'small' WHEN amount < 50000 THEN 'medium' ELSE 'large' END AS tier, COUNT(*) AS loans, SUM(amount) AS total_amount FROM d1026_loans WHERE status = 'approved' GROUP BY tier;`,
    ordered: false,
  },
  {
    id: 'd20261026_i1', level: 'intermediate', added: '2026-10-26', source: 'Blind', company: 'Walmart',
    ref: 'walmart interview sql questions', url: 'https://www.teamblind.com/post/walmart-interview-sql-questions-whqyf63j',
    title: 'פער שכר בין גברים לנשים לפי מחלקה', tables: ['d1026_staff'],
    prompt: `בטבלה d1026_staff לכל עובד יש gender ('M' או 'F'), מחלקה ושכר. התייחסו רק למחלקות שיש בהן לפחות גבר אחד ולפחות אישה אחת. לכל מחלקה כזו החזירו את השכר הממוצע של הגברים, השכר הממוצע של הנשים (שניהם מעוגלים לשתי ספרות), והפער ביניהם (ממוצע גברים פחות ממוצע נשים, מעוגל גם הוא). עמודות: dept, avg_male, avg_female, gap.`,
    solution: `SELECT dept, ROUND(AVG(CASE WHEN gender='M' THEN salary END), 2) AS avg_male, ROUND(AVG(CASE WHEN gender='F' THEN salary END), 2) AS avg_female, ROUND(AVG(CASE WHEN gender='M' THEN salary END) - AVG(CASE WHEN gender='F' THEN salary END), 2) AS gap FROM d1026_staff GROUP BY dept HAVING SUM(gender='M') > 0 AND SUM(gender='F') > 0;`,
    ordered: false,
  },
  {
    id: 'd20261026_i2', level: 'intermediate', added: '2026-10-26', source: 'Instacart Tech Blog', company: 'Instacart',
    ref: 'Data Science Spotlight: Cracking the SQL Interview at Instacart', url: 'https://tech.instacart.com/data-science-spotlight-cracking-the-sql-interview-at-instacart-llm-edition-52d04bde474c',
    title: 'דירוג ממוצע ליום, רק ממשתמשים עם 5 הזמנות ומעלה', tables: ['d1026_gr_orders'],
    prompt: `בטבלה d1026_gr_orders כל שורה היא הזמנה של משתמש, עם תאריך ודירוג (rating, יכול להיות NULL כשלא דורגה). התייחסו רק למשתמשים שיש להם בסך הכול (כולל הזמנות בלי דירוג) לפחות 5 הזמנות. לכל תאריך שיש בו לפחות הזמנה מדורגת אחת של משתמשים כאלה, החזירו את הדירוג הממוצע של ההזמנות המדורגות, מעוגל לשתי ספרות. עמודות: order_date, avg_rating.`,
    solution: `SELECT order_date, ROUND(AVG(rating), 2) AS avg_rating FROM d1026_gr_orders WHERE user_id IN (SELECT user_id FROM d1026_gr_orders GROUP BY user_id HAVING COUNT(*) >= 5) GROUP BY order_date HAVING COUNT(rating) > 0;`,
    ordered: false,
  },
  {
    id: 'd20261026_i3', level: 'intermediate', added: '2026-10-26', source: 'Dataford', company: 'eBay',
    ref: 'Given a table of user transactions, write a query to identify repeat buyers who made a purchase within 30 days of their initial sign up', url: 'https://dataford.io/questions/given-a-table-of-user-transactions-write-a-query-to-identify-repeat-buyers-who-made-a-purchase-within-30-days-of-their-initial-sign-up',
    title: 'קונים חוזרים בחודש הראשון', tables: ['d1026_members', 'd1026_buys'],
    prompt: `בטבלה d1026_members יש תאריך הרשמה לכל משתמש, ובטבלה d1026_buys רכישות. קונה חוזר הוא משתמש שביצע לפחות שתי רכישות (שורות נפרדות, גם באותו יום) בתוך 30 הימים הראשונים להרשמתו - מיום ההרשמה עצמו ועד 30 ימים אחריו כולל. רכישות לפני ההרשמה אינן נספרות. החזירו את מזהי הקונים החוזרים. עמודה: user_id.`,
    solution: `SELECT m.user_id FROM d1026_members m JOIN d1026_buys b ON b.user_id = m.user_id AND b.buy_date >= m.signup_date AND b.buy_date <= DATE(m.signup_date, '+30 day') GROUP BY m.user_id HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261026_i4', level: 'intermediate', added: '2026-10-26', source: 'Dataford', company: 'Amazon',
    ref: 'Write a query to find the second purchase date for each customer', url: 'https://dataford.io/questions/write-a-query-to-find-the-second-purchase-date-for-each-customer',
    title: 'יום הקנייה השני של כל לקוח', tables: ['d1026_cust_buys'],
    prompt: `בטבלה d1026_cust_buys כל שורה היא פריט שלקוח קנה בתאריך מסוים. לכל לקוח שקנה ביותר מיום אחד, החזירו את התאריך של יום הקנייה השני שלו (כמה פריטים שנקנו באותו יום נחשבים ליום אחד). עמודות: customer_id, second_day.`,
    solution: `SELECT customer_id, buy_date AS second_day FROM (SELECT customer_id, buy_date, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY buy_date) AS rk FROM d1026_cust_buys) WHERE rk = 2 GROUP BY customer_id;`,
    ordered: false,
  },
  {
    id: 'd20261026_i5', level: 'intermediate', added: '2026-10-26', source: 'Dataford', company: 'Instacart',
    ref: 'Write a query to find the percentage of users who placed a second order within 7 days of their first order', url: 'https://dataford.io/questions/write-a-query-to-find-the-percentage-of-users-who-placed-a-second-order-within-7-days-of-their-first-order',
    title: 'אחוז משתמשים שהזמינו שוב תוך שבוע', tables: ['d1026_user_orders'],
    prompt: `בטבלה d1026_user_orders כל שורה היא הזמנה. סדר ההזמנות של משתמש נקבע לפי התאריך, ובשוויון לפי order_id. החזירו את האחוז מבין כל המשתמשים שהזמינו לפחות פעם אחת, שההזמנה השנייה שלהם התבצעה לכל היותר 7 ימים אחרי הראשונה (כולל 7 בדיוק). מעוגל לשתי ספרות. עמודה: pct.`,
    solution: `WITH r AS (SELECT user_id, order_date, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date, order_id) AS rn FROM d1026_user_orders) SELECT ROUND(100.0 * SUM(CASE WHEN s.user_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS pct FROM r f LEFT JOIN r s ON s.user_id = f.user_id AND s.rn = 2 AND JULIANDAY(s.order_date) - JULIANDAY(f.order_date) <= 7 WHERE f.rn = 1;`,
    ordered: false,
  },
  {
    id: 'd20261026_a1', level: 'advanced', added: '2026-10-26', source: 'Interview Query', company: 'Walmart',
    ref: 'Rolling Bank Transactions', url: 'https://interviewquery.com/questions/rolling-bank-transactions',
    title: 'ממוצע נע של הפקדות ל-3 ימים', tables: ['d1026_bank'],
    prompt: `בטבלה d1026_bank כל שורה היא תנועה בחשבון: סכום חיובי הוא הפקדה וסכום שלילי הוא משיכה, וב-created_at מופיעים תאריך ושעה. התעלמו ממשיכות. חשבו לכל יום (dt, בפורמט YYYY-MM-DD) שיש בו הפקדה את סך ההפקדות ביום. לאחר מכן החזירו לכל יום כזה את הממוצע של סכומי ההפקדות היומיים של אותו יום ושל היומיים הקלנדריים שלפניו, תוך התחשבות רק בימים שיש בהם הפקדות, מעוגל לשתי ספרות. מיינו לפי dt עולה. עמודות: dt, rolling_three_day.`,
    solution: `WITH d AS (SELECT DATE(created_at) AS dt, SUM(amount) AS tot FROM d1026_bank WHERE amount > 0 GROUP BY DATE(created_at)) SELECT a.dt, ROUND(AVG(b.tot), 2) AS rolling_three_day FROM d a JOIN d b ON JULIANDAY(a.dt) - JULIANDAY(b.dt) BETWEEN 0 AND 2 GROUP BY a.dt ORDER BY a.dt;`,
    ordered: true,
  },
  {
    id: 'd20261026_a2', level: 'advanced', added: '2026-10-26', source: 'DataLemur', company: 'Amazon',
    ref: 'Amazon Shopping Spree', url: 'https://datalemur.com/questions/amazon-shopping-spree',
    title: 'משתמשים עם סדרת קניות של שלושה ימים רצופים', tables: ['d1026_spree_log'],
    prompt: `בטבלה d1026_spree_log כל שורה היא הזמנה של משתמש בתאריך מסוים (ייתכנו כמה הזמנות באותו יום). משתמש עבר "סדרת קניות" אם הזמין בשלושה ימים קלנדריים רצופים לפחות. החזירו את מזהי המשתמשים שהיתה להם לפחות סדרה אחת, ממוינים לפי user_id עולה. עמודה: user_id.`,
    solution: `WITH x AS (SELECT DISTINCT user_id, order_date FROM d1026_spree_log), g AS (SELECT user_id, order_date, JULIANDAY(order_date) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS grp FROM x) SELECT DISTINCT user_id FROM (SELECT user_id, grp FROM g GROUP BY user_id, grp HAVING COUNT(*) >= 3) ORDER BY user_id;`,
    ordered: true,
  },
  {
    id: 'd20261026_a3', level: 'advanced', added: '2026-10-26', source: 'LeetCode', company: '',
    ref: 'Users With Two Purchases Within Seven Days', url: 'https://www.talentd.in/fleetcode/solutions/users-with-two-purchases-within-seven-days',
    title: 'שתי רכישות בטווח של שבעה ימים', tables: ['d1026_user_purchases'],
    prompt: `בטבלה d1026_user_purchases לכל רכישה יש purchase_id ייחודי, משתמש ותאריך. החזירו את המשתמשים שיש להם שתי רכישות שונות שהפרש התאריכים ביניהן הוא לכל היותר 7 ימים (כולל 7 בדיוק, וכולל שתי רכישות באותו יום), ממוינים לפי user_id עולה. עמודה: user_id.`,
    solution: `SELECT DISTINCT a.user_id FROM d1026_user_purchases a JOIN d1026_user_purchases b ON a.user_id = b.user_id AND a.purchase_id < b.purchase_id AND ABS(JULIANDAY(a.purchase_date) - JULIANDAY(b.purchase_date)) <= 7 ORDER BY a.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261026_a4', level: 'advanced', added: '2026-10-26', source: 'Dataford', company: '',
    ref: 'Write a SQL query to find customers who made purchases in consecutive months', url: 'https://dataford.io/questions/write-a-sql-query-to-find-customers-who-made-purchases-in-consecutive-months',
    title: 'זוגות חודשים רצופים של קניות', tables: ['d1026_month_buys'],
    prompt: `בטבלה d1026_month_buys כל שורה היא קנייה של לקוח בתאריך מסוים. לכל לקוח ספרו את מספר זוגות החודשים הקלנדריים הרצופים שבשניהם הוא קנה לפחות פעם אחת (למשל קניות בינואר, פברואר ומרץ נותנות שני זוגות; דצמבר ואחריו ינואר של השנה הבאה נחשבים רצופים). החזירו רק לקוחות עם זוג אחד לפחות. עמודות: customer_id, pairs.`,
    solution: `WITH m AS (SELECT DISTINCT customer_id, CAST(STRFTIME('%Y', buy_date) AS INTEGER) * 12 + CAST(STRFTIME('%m', buy_date) AS INTEGER) AS mi FROM d1026_month_buys) SELECT a.customer_id, COUNT(*) AS pairs FROM m a JOIN m b ON b.customer_id = a.customer_id AND b.mi = a.mi + 1 GROUP BY a.customer_id;`,
    ordered: false,
  },
  {
    id: 'd20261026_a5', level: 'advanced', added: '2026-10-26', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'רצף הצמיחה הארוך ביותר בהכנסות', tables: ['d1026_monthly_rev'],
    prompt: `בטבלה d1026_monthly_rev יש הכנסה חודשית (month בפורמט YYYY-MM) לכל מוצר, וייתכנו חודשים חסרים. חודש נחשב "חודש צמיחה" אם קיים נתון לחודש הקלנדרי הקודם של אותו מוצר וההכנסה בו גבוהה ממנו ממש. לכל מוצר בטבלה החזירו את מספר חודשי הצמיחה הרצופים הארוך ביותר (0 אם אין אף חודש צמיחה). עמודות: product, longest_streak.`,
    solution: `WITH t AS (SELECT product, CAST(SUBSTR(month,1,4) AS INTEGER) * 12 + CAST(SUBSTR(month,6,2) AS INTEGER) AS mi, revenue FROM d1026_monthly_rev), g AS (SELECT a.product, a.mi FROM t a JOIN t b ON b.product = a.product AND b.mi = a.mi - 1 AND a.revenue > b.revenue), s AS (SELECT product, mi - ROW_NUMBER() OVER (PARTITION BY product ORDER BY mi) AS grp FROM g), r AS (SELECT product, COUNT(*) AS len FROM s GROUP BY product, grp) SELECT p.product, COALESCE(MAX(r.len), 0) AS longest_streak FROM (SELECT DISTINCT product FROM d1026_monthly_rev) p LEFT JOIN r ON r.product = p.product GROUP BY p.product;`,
    ordered: false,
  },
];

QUESTIONS.push(...QUESTIONS_DAILY);
