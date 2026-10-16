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
];

QUESTIONS.push(...QUESTIONS_DAILY);
