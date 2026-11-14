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
  // ===== 2026-10-27 =====
  {
    id: 'd20261027_b1', level: 'basic', added: '2026-10-27', source: 'DataLemur', company: 'DiDi',
    ref: 'DiDi SQL Interview Questions (total kilometres and average cost per month in 2022)', url: 'https://datalemur.com/blog/didi-sql-interview-questions',
    title: 'סיכום נסיעות חודשי ב-2022', tables: ['d1027_didi_rides'],
    prompt: `בטבלה d1027_didi_rides כל שורה היא נסיעה: משתמש, תאריך, מרחק בק"מ ועלות. לכל חודש קלנדרי בשנת 2022 בלבד (חודשים ללא נסיעות לא יופיעו) החזירו את החודש בפורמט YYYY-MM, מספר הנסיעות, סך הקילומטרים, ועלות ממוצעת לנסיעה מעוגלת לשתי ספרות אחרי הנקודה, ממוינים לפי החודש עולה. עמודות: month, rides, total_km, avg_cost.`,
    solution: `SELECT STRFTIME('%Y-%m', ride_date) AS month, COUNT(*) AS rides, ROUND(SUM(km), 1) AS total_km, ROUND(AVG(cost), 2) AS avg_cost FROM d1027_didi_rides WHERE ride_date >= '2022-01-01' AND ride_date < '2023-01-01' GROUP BY 1 ORDER BY 1;`,
    ordered: true,
  },
  {
    id: 'd20261027_b2', level: 'basic', added: '2026-10-27', source: 'StrataScratch', company: 'Uber',
    ref: 'Highest Total Miles', url: 'https://www.stratascratch.com/blog/uber-sql-interview-questions',
    title: 'שלוש מטרות הנסיעה עם הכי הרבה מיילים', tables: ['d1027_biz_trips'],
    prompt: `בטבלה d1027_biz_trips כל שורה היא נסיעת עבודה עם מטרה (purpose) ומספר מיילים. התעלמו מנסיעות שאין להן מטרה. החזירו את שלוש המטרות עם סך המיילים הגבוה ביותר, מהגבוה לנמוך (אין שוויון בנתונים). עמודות: purpose, total_miles.`,
    solution: `SELECT purpose, ROUND(SUM(miles), 1) AS total_miles FROM d1027_biz_trips WHERE purpose IS NOT NULL GROUP BY purpose ORDER BY SUM(miles) DESC LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261027_b3', level: 'basic', added: '2026-10-27', source: 'DataLemur', company: 'PayPal',
    ref: 'PayPal SQL Interview Questions (average transaction amount per user)', url: 'https://datalemur.com/blog/paypal-sql-interview-questions',
    title: 'משתמשים עם סכום עסקה ממוצע גבוה', tables: ['d1027_pp_tx'],
    prompt: `בטבלה d1027_pp_tx יש עסקאות עם סטטוס. בהתחשב רק בעסקאות בסטטוס completed, מצאו משתמשים שביצעו לפחות 2 עסקאות כאלה והסכום הממוצע שלהן גדול ממש מ-100. עמודות: user_id, avg_amount (מעוגל לשתי ספרות אחרי הנקודה). סדר השורות לא משנה.`,
    solution: `SELECT user_id, ROUND(AVG(amount), 2) AS avg_amount FROM d1027_pp_tx WHERE status = 'completed' GROUP BY user_id HAVING COUNT(*) >= 2 AND AVG(amount) > 100;`,
    ordered: false,
  },
  {
    id: 'd20261027_b4', level: 'basic', added: '2026-10-27', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'עלות שכר ממוצעת למחלקה', tables: ['d1027_staff'],
    prompt: `בטבלה d1027_staff לכל עובד יש משכורת ובונוס (הבונוס עשוי להיות חסר, ואז הוא נחשב כ-0). לכל מחלקה שיש בה לפחות שני עובדים, החזירו את מספר העובדים ואת העלות הכוללת הממוצעת לעובד (משכורת ועוד בונוס) מעוגלת לשתי ספרות אחרי הנקודה. עמודות: dept, headcount, avg_total_comp. סדר השורות לא משנה.`,
    solution: `SELECT dept, COUNT(*) AS headcount, ROUND(AVG(salary + COALESCE(bonus, 0)), 2) AS avg_total_comp FROM d1027_staff GROUP BY dept HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261027_b5', level: 'basic', added: '2026-10-27', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מטופלים שביקרו ביותר ממרפאה אחת', tables: ['d1027_visits'],
    prompt: `בטבלה d1027_visits כל שורה היא ביקור של מטופל במרפאה. החזירו מטופלים שביקרו בלפחות שתי מרפאות שונות, עם מספר המרפאות השונות שבהן ביקרו, ממוינים לפי מספר המרפאות יורד ובשוויון לפי patient_id עולה. עמודות: patient_id, clinics.`,
    solution: `SELECT patient_id, COUNT(DISTINCT clinic) AS clinics FROM d1027_visits GROUP BY patient_id HAVING COUNT(DISTINCT clinic) >= 2 ORDER BY clinics DESC, patient_id;`,
    ordered: true,
  },
  {
    id: 'd20261027_i1', level: 'intermediate', added: '2026-10-27', source: 'DataVidhya', company: 'TikTok',
    ref: 'Second Day Confirmation Rate', url: 'https://datavidhya.com/coding-problems/questionDetails/question/joins-second-day-confirmation-rate/',
    title: 'אחוז המאשרים ביום שאחרי ההרשמה', tables: ['d1027_signups','d1027_confirms'],
    prompt: `בטבלה d1027_signups יש תאריך הרשמה לכל משתמש, ובטבלה d1027_confirms תאריכי אישור חשבון (למשתמש יכולות להיות כמה שורות, וייתכן שאין לו אף אחת). חשבו איזה אחוז מכלל המשתמשים שנרשמו אישרו את החשבון בדיוק יום קלנדרי אחד אחרי תאריך ההרשמה (לפחות שורת אישור אחת באותו תאריך), מעוגל לשתי ספרות אחרי הנקודה. עמודה: confirm_rate_pct.`,
    solution: `SELECT ROUND(100.0 * COUNT(DISTINCT c.user_id) / (SELECT COUNT(*) FROM d1027_signups), 2) AS confirm_rate_pct FROM d1027_signups s JOIN d1027_confirms c ON c.user_id = s.user_id AND c.confirm_date = DATE(s.signup_date, '+1 day');`,
    ordered: false,
  },
  {
    id: 'd20261027_i2', level: 'intermediate', added: '2026-10-27', source: 'Interview Query', company: 'Uber',
    ref: 'Uber Data Scientist interview guide (customers who signed up in January 2020 with sending and receiving volume above $100 in their first 30 days)', url: 'https://interviewquery.com/interview-guides/uber-data-scientist',
    title: 'נפח העברות בשלושים הימים הראשונים', tables: ['d1027_customers','d1027_transfers'],
    prompt: `בטבלה d1027_customers תאריך הרשמה לכל לקוח, ובטבלה d1027_transfers העברות כסף בין לקוחות. התייחסו רק להעברות בסטטוס success. נפח הלקוח הוא סכום ההעברות שהוא שלח ועוד ההעברות שהוא קיבל, בתאריכים שבין תאריך ההרשמה שלו ועד 30 ימים אחריו (שני הקצוות כלולים). החזירו לקוחות שנרשמו בינואר 2020 והנפח שלהם גדול ממש מ-100. עמודות: customer_id, volume. סדר השורות לא משנה.`,
    solution: `SELECT c.customer_id, SUM(t.amount) AS volume FROM d1027_customers c JOIN d1027_transfers t ON (t.sender_id = c.customer_id OR t.receiver_id = c.customer_id) AND t.status = 'success' AND t.transfer_date BETWEEN c.signup_date AND DATE(c.signup_date, '+30 days') WHERE c.signup_date BETWEEN '2020-01-01' AND '2020-01-31' GROUP BY c.customer_id HAVING SUM(t.amount) > 100;`,
    ordered: false,
  },
  {
    id: 'd20261027_i3', level: 'intermediate', added: '2026-10-27', source: 'DataLemur', company: 'DiDi',
    ref: 'DiDi SQL Interview Questions (power users with many rides in a month)', url: 'https://datalemur.com/blog/didi-sql-interview-questions',
    title: 'משתמשי על בחודש', tables: ['d1027_didi_rides'],
    prompt: `בטבלה d1027_didi_rides כל שורה היא נסיעה. מצאו את כל צמדי (משתמש, חודש קלנדרי בשנת 2022) שבהם המשתמש ביצע יותר מ-3 נסיעות. עמודות: user_id, month (בפורמט YYYY-MM), rides. סדר השורות לא משנה.`,
    solution: `SELECT user_id, STRFTIME('%Y-%m', ride_date) AS month, COUNT(*) AS rides FROM d1027_didi_rides WHERE ride_date >= '2022-01-01' AND ride_date < '2023-01-01' GROUP BY user_id, STRFTIME('%Y-%m', ride_date) HAVING COUNT(*) > 3;`,
    ordered: false,
  },
  {
    id: 'd20261027_i4', level: 'intermediate', added: '2026-10-27', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מוצרים שלא הוזמנו מעולם לפי קטגוריה', tables: ['d1027_products','d1027_orderlines'],
    prompt: `בטבלה d1027_products מוצרים וקטגוריות, ובטבלה d1027_orderlines שורות הזמנה. לכל קטגוריה שיש בה לפחות מוצר אחד שמעולם לא הוזמן, החזירו את מספר המוצרים הכולל בקטגוריה ואת מספר המוצרים שמעולם לא הוזמנו. עמודות: category, total_products, never_ordered. סדר השורות לא משנה.`,
    solution: `SELECT p.category, COUNT(*) AS total_products, SUM(CASE WHEN NOT EXISTS (SELECT 1 FROM d1027_orderlines o WHERE o.product_id = p.product_id) THEN 1 ELSE 0 END) AS never_ordered FROM d1027_products p GROUP BY p.category HAVING never_ordered > 0;`,
    ordered: false,
  },
  {
    id: 'd20261027_i5', level: 'intermediate', added: '2026-10-27', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'טבלת ליגה ממשחקי בית וחוץ', tables: ['d1027_games'],
    prompt: `בטבלה d1027_games כל שורה היא משחק בין שחקן בית לשחקן חוץ עם התוצאה. ניצחון שווה 3 נקודות, תיקו נקודה אחת והפסד 0. לכל שחקן שהשתתף בלפחות משחק אחד (בבית או בחוץ) החזירו את מספר המשחקים, הניצחונות, התיקו, ההפסדים והנקודות. מיינו לפי נקודות יורד, ובשוויון לפי שם השחקן אלפביתית. עמודות: player, played, wins, draws, losses, points.`,
    solution: `WITH s AS (SELECT home_player AS player, CASE WHEN home_score > away_score THEN 'w' WHEN home_score = away_score THEN 'd' ELSE 'l' END AS r FROM d1027_games UNION ALL SELECT away_player, CASE WHEN away_score > home_score THEN 'w' WHEN home_score = away_score THEN 'd' ELSE 'l' END FROM d1027_games) SELECT player, COUNT(*) AS played, SUM(r = 'w') AS wins, SUM(r = 'd') AS draws, SUM(r = 'l') AS losses, SUM(CASE r WHEN 'w' THEN 3 WHEN 'd' THEN 1 ELSE 0 END) AS points FROM s GROUP BY player ORDER BY points DESC, player;`,
    ordered: true,
  },
  {
    id: 'd20261027_a1', level: 'advanced', added: '2026-10-27', source: 'StrataScratch', company: 'Uber',
    ref: 'Maximum Number of Employees Reached', url: 'https://www.stratascratch.com/blog/uber-data-scientist-interview-questions',
    title: 'שיא מצבת העובדים בתקופת העסקה', tables: ['d1027_tenure'],
    prompt: `בטבלה d1027_tenure לכל עובד יש תאריך תחילת עבודה (hired) ותאריך סיום (end_date, חסר אם עדיין עובד). עובד נחשב כמועסק מתאריך התחילה ועד היום שלפני תאריך הסיום (ביום הסיום עצמו הוא כבר לא נספר). לכל עובד החזירו את מספר העובדים הגדול ביותר שהיו מועסקים בו-זמנית בחברה בתוך תקופת העסקתו שלו. עמודות: emp_id, peak_headcount. סדר השורות לא משנה.`,
    solution: `WITH pts AS (SELECT DISTINCT hired AS d FROM d1027_tenure), hc AS (SELECT d, (SELECT COUNT(*) FROM d1027_tenure x WHERE x.hired <= pts.d AND (x.end_date IS NULL OR x.end_date > pts.d)) AS n FROM pts) SELECT e.emp_id, MAX(hc.n) AS peak_headcount FROM d1027_tenure e JOIN hc ON hc.d >= e.hired AND (e.end_date IS NULL OR hc.d < e.end_date) GROUP BY e.emp_id;`,
    ordered: false,
  },
  {
    id: 'd20261027_a2', level: 'advanced', added: '2026-10-27', source: 'StrataScratch', company: 'Uber',
    ref: 'Longest stretch without hiring and without firing', url: 'https://www.stratascratch.com/blog/uber-data-scientist-interview-questions',
    title: 'התקופה הארוכה ביותר בלי גיוס ובלי פיטורין', tables: ['d1027_tenure'],
    prompt: `בטבלה d1027_tenure תאריכי תחילת וסיום עבודה (end_date חסר אצל מי שעדיין עובד). החזירו שורה אחת עם מספר הימים הגדול ביותר בין שני תאריכי גיוס שונים עוקבים שבהם לא היה גיוס, ומספר הימים הגדול ביותר בין שני תאריכי סיום שונים עוקבים. עמודות: longest_no_hire_days, longest_no_exit_days.`,
    solution: `WITH h AS (SELECT DISTINCT hired AS d FROM d1027_tenure), e AS (SELECT DISTINCT end_date AS d FROM d1027_tenure WHERE end_date IS NOT NULL) SELECT (SELECT MAX(JULIANDAY(d) - JULIANDAY(p)) FROM (SELECT d, LAG(d) OVER (ORDER BY d) AS p FROM h)) AS longest_no_hire_days, (SELECT MAX(JULIANDAY(d) - JULIANDAY(p)) FROM (SELECT d, LAG(d) OVER (ORDER BY d) AS p FROM e)) AS longest_no_exit_days;`,
    ordered: false,
  },
  {
    id: 'd20261027_a3', level: 'advanced', added: '2026-10-27', source: 'Educative', company: '',
    ref: 'Grokking the Data Science Interview (day-7 retention and average revenue per user by day 30 per signup cohort)', url: 'https://www.educative.io/courses/grokking-the-data-science-interview/how-sql-rounds-are-scored',
    title: 'שימור ביום 7 והכנסה למשתמש לפי קוהורט', tables: ['d1027_acc','d1027_act','d1027_pay'],
    prompt: `בטבלה d1027_acc תאריך הרשמה לכל משתמש, בטבלה d1027_act תאריכי פעילות (ייתכנו שורות כפולות), ובטבלה d1027_pay תשלומים. לכל חודש הרשמה (קוהורט) החזירו: מספר המשתמשים, אחוז המשתמשים שהיו פעילים בדיוק 7 ימים אחרי תאריך ההרשמה שלהם, וההכנסה הממוצעת למשתמש מתשלומים שבוצעו מתאריך ההרשמה ועד 30 ימים אחריו (שני הקצוות כלולים; משתמש ללא תשלומים נספר עם 0). האחוז וההכנסה מעוגלים לשתי ספרות אחרי הנקודה. עמודות: cohort_month (YYYY-MM), users, day7_retention_pct, arpu_30. סדר השורות לא משנה.`,
    solution: `SELECT STRFTIME('%Y-%m', a.signup_date) AS cohort_month, COUNT(*) AS users, ROUND(100.0 * SUM(EXISTS (SELECT 1 FROM d1027_act t WHERE t.user_id = a.user_id AND t.act_date = DATE(a.signup_date, '+7 days'))) / COUNT(*), 2) AS day7_retention_pct, ROUND(1.0 * SUM(COALESCE((SELECT SUM(p.amount) FROM d1027_pay p WHERE p.user_id = a.user_id AND p.pay_date BETWEEN a.signup_date AND DATE(a.signup_date, '+30 days')), 0)) / COUNT(*), 2) AS arpu_30 FROM d1027_acc a GROUP BY 1;`,
    ordered: false,
  },
  {
    id: 'd20261027_a4', level: 'advanced', added: '2026-10-27', source: 'Dataford', company: 'Teradata',
    ref: 'how would you use SQL window functions to calculate rolling 7-day retention and compare cohorts over time at Teradata', url: 'https://dataford.io/questions/how-would-you-use-sql-window-functions-to-calculate-rolling-7-day-retention-and-compare-cohorts-over-time-at-teradata',
    title: 'משתמשים פעילים ייחודיים בחלון נע של 7 ימים', tables: ['d1027_act'],
    prompt: `בטבלה d1027_act שורה לכל פעילות של משתמש בתאריך (ייתכנו כפילויות). לכל תאריך שבו הייתה לפחות פעילות אחת, החזירו את מספר המשתמשים השונים שהיו פעילים בטווח של 7 ימים קלנדריים שנגמר באותו תאריך (כולל אותו). עמודות: act_date, active_users_7d. סדר השורות לא משנה.`,
    solution: `SELECT d.act_date, (SELECT COUNT(DISTINCT x.user_id) FROM d1027_act x WHERE x.act_date BETWEEN DATE(d.act_date, '-6 days') AND d.act_date) AS active_users_7d FROM (SELECT DISTINCT act_date FROM d1027_act) d;`,
    ordered: false,
  },
  {
    id: 'd20261027_a5', level: 'advanced', added: '2026-10-27', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סשנים לפי פער של חצי שעה', tables: ['d1027_clicks'],
    prompt: `בטבלה d1027_clicks כל שורה היא לחיצה של משתמש בזמן מסוים. לחיצה פותחת סשן חדש אם עברו יותר מ-30 דקות מהלחיצה הקודמת של אותו משתמש (בדיוק 30 דקות עדיין באותו סשן), ולחיצה ראשונה של משתמש תמיד פותחת סשן. לכל משתמש החזירו את מספר הסשנים ואת משך הסשן הארוך ביותר בדקות (מהלחיצה הראשונה ועד האחרונה בסשן, מספר שלם). עמודות: user_id, sessions, longest_session_minutes. סדר השורות לא משנה.`,
    solution: `WITH g AS (SELECT user_id, ts, CASE WHEN LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) IS NULL OR STRFTIME('%s', ts) - STRFTIME('%s', LAG(ts) OVER (PARTITION BY user_id ORDER BY ts)) > 1800 THEN 1 ELSE 0 END AS new_s FROM d1027_clicks), s AS (SELECT user_id, ts, SUM(new_s) OVER (PARTITION BY user_id ORDER BY ts) AS sid FROM g), d AS (SELECT user_id, sid, (STRFTIME('%s', MAX(ts)) - STRFTIME('%s', MIN(ts))) / 60 AS mins FROM s GROUP BY user_id, sid) SELECT user_id, COUNT(*) AS sessions, MAX(mins) AS longest_session_minutes FROM d GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261028_b1', level: 'basic', added: '2026-10-28', source: 'Skillcure Academy', company: '',
    ref: 'Employees earning more than the average salary', url: 'https://skillcureacademy.com/blogs/real-world-sql-interview-questions/',
    title: 'שכר מעל הממוצע בחברה', tables: ['d1028_emp'],
    prompt: `בטבלה d1028_emp פרטי עובדים: מספר, שם, מחלקה ושכר. החזירו את השם והשכר של כל עובד ששכרו גבוה ממש מהשכר הממוצע של כל העובדים בחברה. מיינו לפי שכר מהגבוה לנמוך, ובשוויון לפי שם בסדר אלפביתי.`,
    solution: `SELECT name, salary FROM d1028_emp WHERE salary > (SELECT AVG(salary) FROM d1028_emp) ORDER BY salary DESC, name;`,
    ordered: true,
  },
  {
    id: 'd20261028_b2', level: 'basic', added: '2026-10-28', source: 'Skillcure Academy', company: '',
    ref: 'Top-selling products by quantity', url: 'https://skillcureacademy.com/blogs/real-world-sql-interview-questions/',
    title: 'חמשת המוצרים הנמכרים ביותר', tables: ['d1028_sales'],
    prompt: `בטבלה d1028_sales כל שורה היא מכירה של מוצר וכמות היחידות שנמכרו. החזירו את חמשת המוצרים עם סך היחידות הגבוה ביותר, עם העמודות product ו-total_units. מיינו לפי total_units מהגבוה לנמוך, ובשוויון לפי שם המוצר בסדר אלפביתי (כך שהשוויון קובע גם מי נכנס לחמישייה).`,
    solution: `SELECT product, SUM(units) AS total_units FROM d1028_sales GROUP BY product ORDER BY total_units DESC, product LIMIT 5;`,
    ordered: true,
  },
  {
    id: 'd20261028_b3', level: 'basic', added: '2026-10-28', source: 'LeetCode', company: '',
    ref: 'Percentage of Users Attended a Contest', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'אחוז המשתמשים שנרשמו לכל תחרות', tables: ['d1028_users','d1028_register'],
    prompt: `בטבלה d1028_users כל משתמשי המערכת, ובטבלה d1028_register הרשמות לתחרויות (תחרות ומשתמש). לכל תחרות שיש לה לפחות הרשמה אחת החזירו את contest_id ואת האחוז מכלל המשתמשים במערכת שנרשמו אליה (עמודה percentage, מעוגל לשתי ספרות אחרי הנקודה). מיינו לפי האחוז מהגבוה לנמוך, ובשוויון לפי contest_id בסדר עולה.`,
    solution: `SELECT contest_id, ROUND(100.0 * COUNT(DISTINCT user_id) / (SELECT COUNT(*) FROM d1028_users), 2) AS percentage FROM d1028_register GROUP BY contest_id ORDER BY percentage DESC, contest_id;`,
    ordered: true,
  },
  {
    id: 'd20261028_b4', level: 'basic', added: '2026-10-28', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות ללא טלפון לפי מדינה', tables: ['d1028_cust'],
    prompt: `בטבלה d1028_cust פרטי לקוחות, ולחלקם אין מספר טלפון (ערך חסר). החזירו לכל מדינה את מספר הלקוחות ללא טלפון (עמודות country ו-customers_without_phone), אך רק למדינות שיש בהן לפחות שני לקוחות כאלה.`,
    solution: `SELECT country, COUNT(*) AS customers_without_phone FROM d1028_cust WHERE phone IS NULL GROUP BY country HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261028_b5', level: 'basic', added: '2026-10-28', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סיווג הזמנות לפי גודל', tables: ['d1028_orders'],
    prompt: `בטבלה d1028_orders הזמנות עם סטטוס וסכום. בין ההזמנות בסטטוס paid בלבד, סווגו כל הזמנה לפי סכומה: small אם הסכום קטן מ-50, medium אם הוא לפחות 50 וקטן מ-200, ו-large אם הוא לפחות 200. החזירו לכל סיווג את מספר ההזמנות (עמודות size_class ו-orders_count).`,
    solution: `SELECT CASE WHEN amount < 50 THEN 'small' WHEN amount < 200 THEN 'medium' ELSE 'large' END AS size_class, COUNT(*) AS orders_count FROM d1028_orders WHERE status = 'paid' GROUP BY 1;`,
    ordered: false,
  },
  {
    id: 'd20261028_i1', level: 'intermediate', added: '2026-10-28', source: 'DataLemur', company: 'Salesforce',
    ref: 'Average Deal Size', url: 'https://datalemur.com/questions/sql-average-deal-size',
    title: 'הכנסה שנתית ממוצעת לפי סגמנט לקוח', tables: ['d1028_accounts','d1028_contracts'],
    prompt: `בטבלה d1028_accounts לקוחות עם מספר העובדים שלהם, ובטבלה d1028_contracts חוזה אחד לכל לקוח: מספר רישיונות (seats) ומחיר שנתי לרישיון (seat_price). סגמנט הלקוח נקבע לפי מספר העובדים: SMB עד 500 עובדים כולל, Mid-Market מ-501 עד 5000 כולל, ו-Enterprise מעל 5000. הכנסה שנתית של לקוח היא מספר הרישיונות כפול מחיר הרישיון. החזירו לכל סגמנט את ההכנסה השנתית הממוצעת של לקוח, מעוגלת לשתי ספרות (עמודות segment ו-avg_annual_revenue).`,
    solution: `SELECT CASE WHEN a.employees <= 500 THEN 'SMB' WHEN a.employees <= 5000 THEN 'Mid-Market' ELSE 'Enterprise' END AS segment, ROUND(AVG(c.seats * c.seat_price), 2) AS avg_annual_revenue FROM d1028_accounts a JOIN d1028_contracts c ON c.account_id = a.account_id GROUP BY 1;`,
    ordered: false,
  },
  {
    id: 'd20261028_i2', level: 'intermediate', added: '2026-10-28', source: 'LeetCode', company: '',
    ref: 'Average Time of Process per Machine', url: 'https://github.com/ieshreya/sql-50-leetcode',
    title: 'זמן עיבוד ממוצע לכל מכונה', tables: ['d1028_machine_ops'],
    prompt: `בטבלה d1028_machine_ops לכל מכונה ותהליך יש שתי שורות: אחת עם activity_type השווה ל-start ואחת עם end, וב-ts זמן האירוע בשניות. זמן העיבוד של תהליך הוא ההפרש בין זמן הסיום לזמן ההתחלה שלו. החזירו לכל מכונה את זמן העיבוד הממוצע על פני התהליכים שלה, מעוגל לשלוש ספרות אחרי הנקודה (עמודות machine_id ו-processing_time).`,
    solution: `SELECT s.machine_id, ROUND(AVG(e.ts - s.ts), 3) AS processing_time FROM d1028_machine_ops s JOIN d1028_machine_ops e ON e.machine_id = s.machine_id AND e.process_id = s.process_id AND e.activity_type = 'end' WHERE s.activity_type = 'start' GROUP BY s.machine_id;`,
    ordered: false,
  },
  {
    id: 'd20261028_i3', level: 'intermediate', added: '2026-10-28', source: 'LeetCode', company: '',
    ref: 'Managers with at Least 5 Direct Reports', url: 'https://github.com/rahulnamilakonda/sql-50-leetcode',
    title: 'מנהלים עם לפחות שלושה כפופים ישירים', tables: ['d1028_staff'],
    prompt: `בטבלה d1028_staff עובדים עם מספר המנהל הישיר שלהם (manager_id, ריק עבור מי שאין לו מנהל). החזירו את שמות העובדים שיש להם לפחות שלושה כפופים ישירים, יחד עם מספר הכפופים הישירים (עמודות name ו-direct_reports).`,
    solution: `SELECT m.name, COUNT(*) AS direct_reports FROM d1028_staff e JOIN d1028_staff m ON m.staff_id = e.manager_id GROUP BY m.staff_id, m.name HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261028_i4', level: 'intermediate', added: '2026-10-28', source: 'LeetCode', company: '',
    ref: 'Confirmation Rate', url: 'https://leetcode.com/problems/confirmation-rate/',
    title: 'שיעור אישורים לכל משתמש', tables: ['d1028_signups','d1028_confirms'],
    prompt: `בטבלה d1028_signups כל המשתמשים שנרשמו, ובטבלה d1028_confirms בקשות אישור שנשלחו אליהם, וב-action הערך confirmed אם המשתמש אישר או timeout אם לא. החזירו לכל משתמש רשום את שיעור האישורים שלו: מספר הבקשות שאושרו חלקי מספר כל הבקשות, מעוגל לשתי ספרות אחרי הנקודה. למשתמש שלא נשלחו אליו בקשות השיעור הוא 0 (עמודות user_id ו-confirmation_rate).`,
    solution: `SELECT s.user_id, COALESCE(ROUND(AVG(c.action = 'confirmed'), 2), 0) AS confirmation_rate FROM d1028_signups s LEFT JOIN d1028_confirms c ON c.user_id = s.user_id GROUP BY s.user_id;`,
    ordered: false,
  },
  {
    id: 'd20261028_i5', level: 'intermediate', added: '2026-10-28', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות שהפסיקו לקנות', tables: ['d1028_cust','d1028_orders'],
    prompt: `בטבלה d1028_orders הזמנות עם סטטוס, ובטבלה d1028_cust פרטי הלקוחות. החזירו את שמות הלקוחות שביצעו לפחות הזמנה אחת בסטטוס paid אך לא ביצעו אף הזמנה בסטטוס paid בטווח התאריכים מ-2026-05-02 ועד 2026-06-30 כולל, יחד עם תאריך ההזמנה האחרונה ששולמה שלהם (עמודות name ו-last_paid_date).`,
    solution: `SELECT c.name, MAX(o.order_date) AS last_paid_date FROM d1028_cust c JOIN d1028_orders o ON o.cust_id = c.cust_id AND o.status = 'paid' GROUP BY c.cust_id, c.name HAVING SUM(o.order_date BETWEEN '2026-05-02' AND '2026-06-30') = 0;`,
    ordered: false,
  },
  {
    id: 'd20261028_a1', level: 'advanced', added: '2026-10-28', source: 'Interview Query', company: 'Salesforce',
    ref: 'Month-over-month revenue change for 2019 (Salesforce guide)', url: 'https://www.interviewquery.com/interview-guides/salesforce',
    title: 'שינוי חודשי באחוזים בהכנסות 2019', tables: ['d1028_sf_tx'],
    prompt: `בטבלה d1028_sf_tx עסקאות עם תאריך וסכום. לכל חודש בשנת 2019, פרט לחודש הראשון שיש לו נתונים בשנה זו, החזירו את החודש בפורמט YYYY-MM ואת השינוי באחוזים בסך ההכנסות לעומת החודש הקודם, מעוגל לשתי ספרות אחרי הנקודה (עמודות month ו-mom_pct_change). עסקאות משנים אחרות אינן נספרות. מיינו לפי חודש בסדר עולה.`,
    solution: `WITH m AS (SELECT STRFTIME('%Y-%m', created_at) AS month, SUM(value) AS rev FROM d1028_sf_tx WHERE created_at >= '2019-01-01' AND created_at < '2020-01-01' GROUP BY 1), l AS (SELECT month, rev, LAG(rev) OVER (ORDER BY month) AS prev FROM m) SELECT month, ROUND(100.0 * (rev - prev) / prev, 2) AS mom_pct_change FROM l WHERE prev IS NOT NULL ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261028_a2', level: 'advanced', added: '2026-10-28', source: 'PracHub', company: 'Shopify',
    ref: 'Shopify Data Engineer SQL pair programming (daily counts with missing dates and rolling average)', url: 'https://prachub.com/resources/shopify-data-engineer-sql-pair-programming-practice-questions-and-preparation',
    title: 'ממוצע נע של אירועים כולל ימים ריקים', tables: ['d1028_shop_events'],
    prompt: `בטבלה d1028_shop_events כל שורה היא אירוע של חנות בתאריך מסוים. לכל חנות שמופיעה בטבלה ולכל תאריך מ-2026-03-03 ועד 2026-03-07 כולל, החזירו את הממוצע של מספר האירועים היומי ביום זה ובשני הימים שלפניו, כאשר יום ללא אירועים נספר כ-0. מעגלים לשתי ספרות אחרי הנקודה (עמודות shop_id, day ו-avg_events_3d). אירועים לפני 2026-03-01 אינם נכללים בחישוב.`,
    solution: `WITH RECURSIVE days(d) AS (SELECT '2026-03-01' UNION ALL SELECT DATE(d, '+1 day') FROM days WHERE d < '2026-03-07'), daily AS (SELECT s.shop_id, days.d AS day, COUNT(e.event_date) AS c FROM (SELECT DISTINCT shop_id FROM d1028_shop_events) s CROSS JOIN days LEFT JOIN d1028_shop_events e ON e.shop_id = s.shop_id AND e.event_date = days.d GROUP BY s.shop_id, days.d), r AS (SELECT shop_id, day, AVG(c) OVER (PARTITION BY shop_id ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS a FROM daily) SELECT shop_id, day, ROUND(a, 2) AS avg_events_3d FROM r WHERE day >= '2026-03-03';`,
    ordered: false,
  },
  {
    id: 'd20261028_a3', level: 'advanced', added: '2026-10-28', source: 'DataVidhya', company: '',
    ref: 'Time Series Gap Filling with Date Spine', url: 'https://datavidhya.com/coding-problems/questionDetails/question/time-series-gap-filling-with-date-spine/',
    title: 'מחיר ידוע אחרון לכל יום', tables: ['d1028_prices'],
    prompt: `בטבלה d1028_prices נרשמים שינויי מחיר של פריטים: פריט, תאריך המחיר ומחיר שנכנס לתוקף באותו תאריך. לכל פריט ולכל תאריך מ-2026-04-01 ועד 2026-04-07 כולל, החזירו את המחיר שהיה בתוקף באותו יום, כלומר המחיר מהרישום האחרון בתאריך זה או לפניו (עמודות item, day ו-price). אם לפריט עדיין אין מחיר בתאריך מסוים, אל תחזירו שורה עבורו.`,
    solution: `WITH RECURSIVE days(d) AS (SELECT '2026-04-01' UNION ALL SELECT DATE(d, '+1 day') FROM days WHERE d < '2026-04-07') SELECT i.item, days.d AS day, (SELECT p.price FROM d1028_prices p WHERE p.item = i.item AND p.price_date <= days.d ORDER BY p.price_date DESC LIMIT 1) AS price FROM (SELECT DISTINCT item FROM d1028_prices) i CROSS JOIN days WHERE EXISTS (SELECT 1 FROM d1028_prices p WHERE p.item = i.item AND p.price_date <= days.d);`,
    ordered: false,
  },
  {
    id: 'd20261028_a4', level: 'advanced', added: '2026-10-28', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות עם פער ארוך בין הזמנות', tables: ['d1028_cust','d1028_orders'],
    prompt: `בטבלה d1028_orders הזמנות (בכל סטטוס) ובטבלה d1028_cust פרטי הלקוחות. עבור כל לקוח, פער הוא מספר הימים בין שתי הזמנות עוקבות שלו לפי תאריך. החזירו את שמות הלקוחות שהפער הגדול ביותר שלהם הוא לפחות 60 ימים, יחד עם הפער הזה (עמודות name ו-max_gap_days). לקוחות עם הזמנה אחת בלבד אינם נכללים.`,
    solution: `WITH g AS (SELECT cust_id, CAST(JULIANDAY(order_date) - JULIANDAY(LAG(order_date) OVER (PARTITION BY cust_id ORDER BY order_date, order_id)) AS INTEGER) AS gap FROM d1028_orders) SELECT c.name, MAX(g.gap) AS max_gap_days FROM g JOIN d1028_cust c ON c.cust_id = g.cust_id WHERE g.gap IS NOT NULL GROUP BY c.cust_id, c.name HAVING MAX(g.gap) >= 60;`,
    ordered: false,
  },
  {
    id: 'd20261028_a5', level: 'advanced', added: '2026-10-28', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משפך המרה לפי סדר אירועים', tables: ['d1028_shop_funnel'],
    prompt: `בטבלה d1028_shop_funnel אירועי משתמשים בשלבים view, cart ו-purchase עם חותמת זמן, וייתכנו כמה אירועים מאותו שלב. החזירו שורה אחת עם שלוש עמודות: viewed, מספר המשתמשים עם אירוע view; carted, מספר המשתמשים שיש להם אירוע cart מאוחר ממש מה-view הראשון שלהם; ו-purchased, מספר המשתמשים שמתוך אלה יש להם גם אירוע purchase מאוחר ממש מאירוע ה-cart הראשון שאחרי ה-view הראשון שלהם.`,
    solution: `WITH v AS (SELECT user_id, MIN(ts) AS t FROM d1028_shop_funnel WHERE step = 'view' GROUP BY user_id), c AS (SELECT v.user_id, MIN(f.ts) AS t FROM v JOIN d1028_shop_funnel f ON f.user_id = v.user_id AND f.step = 'cart' AND f.ts > v.t GROUP BY v.user_id), p AS (SELECT c.user_id, MIN(f.ts) AS t FROM c JOIN d1028_shop_funnel f ON f.user_id = c.user_id AND f.step = 'purchase' AND f.ts > c.t GROUP BY c.user_id) SELECT (SELECT COUNT(*) FROM v) AS viewed, (SELECT COUNT(*) FROM c) AS carted, (SELECT COUNT(*) FROM p) AS purchased;`,
    ordered: false,
  },
  {
    id: 'd20261029_b1', level: 'basic', added: '2026-10-29', source: 'Taggd', company: '',
    ref: 'Top 10 SQL Query Interview Questions for 2026 (find duplicate records)', url: 'https://taggd.in/blogs/sql-query-interview-questions/',
    title: 'כתובות אימייל כפולות', tables: ['d1029_contacts'],
    prompt: `בטבלה d1029_contacts רשימת אנשי קשר עם כתובת אימייל. החזירו כל כתובת אימייל שמופיעה יותר מפעם אחת, יחד עם מספר ההופעות שלה. התעלמו משורות ללא אימייל (NULL) והתייחסו לכתובות כשוות רק אם הטקסט זהה בדיוק. העמודות: email, cnt.`,
    solution: `SELECT email, COUNT(*) AS cnt FROM d1029_contacts WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1;`,
    ordered: false,
  },
  {
    id: 'd20261029_b2', level: 'basic', added: '2026-10-29', source: 'Interview Query', company: 'Airbnb',
    ref: 'Airbnb Data Analyst Interview Guide (total revenue per city)', url: 'https://www.interviewquery.com/interview-guides/airbnb-data-analyst',
    title: 'הכנסות לפי עיר מהזמנות שהושלמו', tables: ['d1029_bookings'],
    prompt: `בטבלה d1029_bookings הזמנות לינה. הכנסה של הזמנה היא nights כפול price_per_night. החזירו לכל עיר את סך ההכנסות מהזמנות בסטטוס completed בלבד, מהגבוה לנמוך (בשוויון לפי שם העיר בסדר אלפביתי). העמודות: city, revenue.`,
    solution: `SELECT city, SUM(nights * price_per_night) AS revenue FROM d1029_bookings WHERE status = 'completed' GROUP BY city ORDER BY revenue DESC, city;`,
    ordered: true,
  },
  {
    id: 'd20261029_b3', level: 'basic', added: '2026-10-29', source: 'Interview Query', company: 'Airbnb',
    ref: 'Airbnb Data Analyst Interview Guide (find recent bookings)', url: 'https://www.interviewquery.com/interview-guides/airbnb-data-analyst',
    title: 'הזמנות אחרונות שלא בוטלו', tables: ['d1029_bookings'],
    prompt: `בטבלה d1029_bookings החזירו את ההזמנות שנוצרו בין 2026-09-01 ל-2026-09-30 (כולל שני התאריכים) ואינן בסטטוס cancelled. מיינו מהחדשה לישנה לפי created_at, ובתאריך זהה לפי booking_id בסדר עולה. העמודות: booking_id, city, created_at.`,
    solution: `SELECT booking_id, city, created_at FROM d1029_bookings WHERE created_at BETWEEN '2026-09-01' AND '2026-09-30' AND status <> 'cancelled' ORDER BY created_at DESC, booking_id;`,
    ordered: true,
  },
  {
    id: 'd20261029_b4', level: 'basic', added: '2026-10-29', source: 'Interview Query', company: 'Airbnb',
    ref: 'Airbnb Data Analyst Interview Guide (segment users by activity)', url: 'https://www.interviewquery.com/interview-guides/airbnb-data-analyst',
    title: 'פילוח משתמשים לפי רמת פעילות', tables: ['d1029_user_activity'],
    prompt: `בטבלה d1029_user_activity מספר הסשנים של כל משתמש ב-30 הימים האחרונים (NULL פירושו שאין נתון ונחשב כ-0). סווגו כל משתמש: 0 סשנים הוא inactive, 1 עד 4 הוא casual, 5 ומעלה הוא active. החזירו לכל סיווג את מספר המשתמשים. העמודות: segment, users.`,
    solution: `SELECT CASE WHEN COALESCE(sessions_30d, 0) = 0 THEN 'inactive' WHEN sessions_30d < 5 THEN 'casual' ELSE 'active' END AS segment, COUNT(*) AS users FROM d1029_user_activity GROUP BY segment;`,
    ordered: false,
  },
  {
    id: 'd20261029_b5', level: 'basic', added: '2026-10-29', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חמשת השחקנים המובילים בטווח רמות', tables: ['d1029_players'],
    prompt: `בטבלה d1029_players שחקני משחק. בין השחקנים ברמה (level) 10 עד 30 כולל, החזירו את חמשת בעלי הניקוד (score) הגבוה ביותר, מהגבוה לנמוך ובשוויון לפי player_id בסדר עולה. אם לשחקן אין גילדה (guild הוא NULL) יוצג הטקסט none. העמודות: name, guild_label, score.`,
    solution: `SELECT name, COALESCE(guild, 'none') AS guild_label, score FROM d1029_players WHERE level BETWEEN 10 AND 30 ORDER BY score DESC, player_id LIMIT 5;`,
    ordered: true,
  },
  {
    id: 'd20261029_i1', level: 'intermediate', added: '2026-10-29', source: 'LeetCode', company: '',
    ref: 'Average Selling Price', url: 'https://leetcode.doocs.org/en/lc/1251/',
    title: 'מחיר מכירה ממוצע לפי תקופות מחיר', tables: ['d1029_prices', 'd1029_units'],
    prompt: `בטבלה d1029_prices מחיר כל מוצר בטווחי תאריכים (start_date עד end_date כולל, ללא חפיפה), ובטבלה d1029_units מכירות לפי תאריך (ייתכנו שורות זהות, וכל שורה היא מכירה נפרדת). החזירו לכל מוצר את מחיר המכירה הממוצע: סך ההכנסות (יחידות כפול המחיר שהיה בתוקף בתאריך הרכישה) חלקי סך היחידות, מעוגל ל-2 ספרות. מוצר ללא מכירות מקבל 0. העמודות: product_id, average_price.`,
    solution: `SELECT p.product_id, ROUND(COALESCE(SUM(u.units * p.price) * 1.0 / SUM(u.units), 0), 2) AS average_price FROM d1029_prices p LEFT JOIN d1029_units u ON u.product_id = p.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date GROUP BY p.product_id;`,
    ordered: false,
  },
  {
    id: 'd20261029_i2', level: 'intermediate', added: '2026-10-29', source: 'LeetCode', company: '',
    ref: 'Number of Trusted Contacts of a Customer', url: 'https://leetcode.doocs.org/en/lc/1364/',
    title: 'אנשי קשר מהימנים בכל חשבונית', tables: ['d1029_customers', 'd1029_contact_list', 'd1029_invoices'],
    prompt: `לכל לקוח ב-d1029_customers יש רשימת אנשי קשר ב-d1029_contact_list (owner_id הוא ה-customer_id של הבעלים) וחשבוניות ב-d1029_invoices. איש קשר נחשב מהימן אם האימייל שלו שייך ללקוח רשום בטבלת הלקוחות. החזירו שורה לכל חשבונית: invoice_id, customer_name (שם הלקוח), price, contacts_cnt (מספר אנשי הקשר של הלקוח), trusted_contacts_cnt (מספר אנשי הקשר המהימנים). לקוח בלי אנשי קשר מקבל 0 בשתי הספירות. מיינו לפי invoice_id בסדר עולה.`,
    solution: `SELECT i.invoice_id, c.name AS customer_name, i.price, COUNT(l.contact_email) AS contacts_cnt, COUNT(t.customer_id) AS trusted_contacts_cnt FROM d1029_invoices i JOIN d1029_customers c ON c.customer_id = i.user_id LEFT JOIN d1029_contact_list l ON l.owner_id = c.customer_id LEFT JOIN d1029_customers t ON t.email = l.contact_email GROUP BY i.invoice_id, c.name, i.price ORDER BY i.invoice_id;`,
    ordered: true,
  },
  {
    id: 'd20261029_i3', level: 'intermediate', added: '2026-10-29', source: 'Reddit', company: '',
    ref: 'r/SQL thread: SQL assessments getting harder (reshaping data from long to wide)', url: 'https://reddit.sentinel-team.org/posts/1u0kuwy/snapshots/2026-06-10T05%3A53%3A39.860606Z',
    title: 'הפיכת מדדים משורות לעמודות', tables: ['d1029_metrics'],
    prompt: `בטבלה d1029_metrics שורה לכל זוג של חנות (store) ומדד (metric), כאשר המדדים האפשריים הם revenue, cost ו-visits. החזירו שורה אחת לכל חנות עם עמודה נפרדת לכל מדד. מדד שאין לו שורה עבור החנות יוצג כ-0. העמודות: store, revenue, cost, visits.`,
    solution: `SELECT store, COALESCE(MAX(CASE WHEN metric = 'revenue' THEN value END), 0) AS revenue, COALESCE(MAX(CASE WHEN metric = 'cost' THEN value END), 0) AS cost, COALESCE(MAX(CASE WHEN metric = 'visits' THEN value END), 0) AS visits FROM d1029_metrics GROUP BY store;`,
    ordered: false,
  },
  {
    id: 'd20261029_i4', level: 'intermediate', added: '2026-10-29', source: 'DataLemur', company: 'Stripe',
    ref: 'Repeated Payments', url: 'https://datalemur.com/blog/stripe-sql-interview-questions',
    title: 'תשלומים חוזרים באותו כרטיס', tables: ['d1029_card_tx'],
    prompt: `בטבלה d1029_card_tx עסקאות כרטיס אשראי. עסקה נחשבת תשלום חוזר אם קיימת עסקה קודמת עם אותו merchant, אותו card ואותו amount שבוצעה לכל היותר 10 דקות (600 שניות, כולל) לפניה. העסקה הראשונה בסדרה אינה נחשבת חוזרת. החזירו עמודה אחת, repeated_payments, עם מספר התשלומים החוזרים.`,
    solution: `SELECT COUNT(*) AS repeated_payments FROM d1029_card_tx a WHERE EXISTS (SELECT 1 FROM d1029_card_tx b WHERE b.merchant = a.merchant AND b.card = a.card AND b.amount = a.amount AND b.tx_time < a.tx_time AND CAST(strftime('%s', a.tx_time) AS INTEGER) - CAST(strftime('%s', b.tx_time) AS INTEGER) <= 600);`,
    ordered: false,
  },
  {
    id: 'd20261029_i5', level: 'intermediate', added: '2026-10-29', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נהגים ללא נסיעות בשבועיים האחרונים', tables: ['d1029_drivers', 'd1029_rides'],
    prompt: `בטבלה d1029_drivers נהגים ובטבלה d1029_rides נסיעות. בהנחה שהתאריך הנוכחי הוא 2026-09-30, החזירו נהגים שלא ביצעו אף נסיעה בין 2026-09-17 ל-2026-09-30 (כולל). נהג שמעולם לא ביצע נסיעה נכלל גם הוא. נסיעות אחרי 2026-09-30 אינן נחשבות. העמודות: driver_id, name.`,
    solution: `SELECT d.driver_id, d.name FROM d1029_drivers d WHERE NOT EXISTS (SELECT 1 FROM d1029_rides r WHERE r.driver_id = d.driver_id AND r.ride_date BETWEEN '2026-09-17' AND '2026-09-30');`,
    ordered: false,
  },
  {
    id: 'd20261029_a1', level: 'advanced', added: '2026-10-29', source: 'DataLemur', company: 'Stripe',
    ref: '3-Day Rolling Earnings', url: 'https://datalemur.com/questions/3d-rolling-earnings',
    title: 'הכנסות מתגלגלות ל-3 ימים', tables: ['d1029_earnings'],
    prompt: `בטבלה d1029_earnings הכנסות של משתמשים לפי תאריך (ייתכנו כמה שורות באותו יום, ויש ימים חסרים). לכל צירוף של user_id ותאריך שבו יש הכנסות, חשבו את סך ההכנסות של אותו משתמש ביום זה וביומיים הקלנדריים שלפניו. החזירו שורה אחת לכל משתמש ותאריך. העמודות: user_id, tx_date, rolling_3d.`,
    solution: `WITH d AS (SELECT user_id, tx_date, SUM(amount) AS a FROM d1029_earnings GROUP BY user_id, tx_date) SELECT x.user_id, x.tx_date, (SELECT SUM(y.a) FROM d y WHERE y.user_id = x.user_id AND y.tx_date BETWEEN date(x.tx_date, '-2 day') AND x.tx_date) AS rolling_3d FROM d x;`,
    ordered: false,
  },
  {
    id: 'd20261029_a2', level: 'advanced', added: '2026-10-29', source: 'LeetCode', company: '',
    ref: 'User Purchase Platform', url: 'https://leetcode.doocs.org/lc/1127/',
    title: 'קנייה במובייל, בדסקטופ או בשניהם', tables: ['d1029_spending'],
    prompt: `בטבלה d1029_spending הוצאות של משתמשים לפי תאריך ופלטפורמה (desktop או mobile). לכל תאריך וכל אחת משלוש הקבוצות desktop, mobile ו-both חשבו את מספר המשתמשים וסך ההוצאה שלהם באותו יום. משתמש שקנה באותו יום בשתי הפלטפורמות שייך רק לקבוצה both וסכום ההוצאה שלו נספר במלואו שם. לכל תאריך שמופיע בטבלה יש להחזיר את שלוש הקבוצות, גם כשאין בהן משתמשים (0 ו-0). העמודות: spend_date, platform, total_amount, total_users.`,
    solution: `WITH u AS (SELECT user_id, spend_date, CASE WHEN COUNT(*) = 2 THEN 'both' ELSE MAX(platform) END AS p, SUM(amount) AS amt FROM d1029_spending GROUP BY user_id, spend_date), d AS (SELECT DISTINCT spend_date FROM d1029_spending), pl AS (SELECT 'desktop' AS p UNION ALL SELECT 'mobile' UNION ALL SELECT 'both') SELECT d.spend_date, pl.p AS platform, COALESCE(SUM(u.amt), 0) AS total_amount, COUNT(u.user_id) AS total_users FROM d CROSS JOIN pl LEFT JOIN u ON u.spend_date = d.spend_date AND u.p = pl.p GROUP BY d.spend_date, pl.p;`,
    ordered: false,
  },
  {
    id: 'd20261029_a3', level: 'advanced', added: '2026-10-29', source: 'LeetCode', company: '',
    ref: 'The Most Frequently Ordered Products for Each Customer', url: 'https://leetcode.doocs.org/en/lc/1596/',
    title: 'המוצר המוזמן ביותר לכל לקוח', tables: ['d1029_shop_customers', 'd1029_shop_products', 'd1029_shop_orders'],
    prompt: `בטבלאות d1029_shop_customers, d1029_shop_orders ו-d1029_shop_products החזירו לכל לקוח שביצע הזמנות את המוצר (או המוצרים, במקרה של שוויון) שהזמין מספר פעמים מקסימלי. לקוח ללא הזמנות אינו מופיע. העמודות: customer_id, product_id, product_name.`,
    solution: `WITH c AS (SELECT customer_id, product_id, COUNT(*) AS n FROM d1029_shop_orders GROUP BY customer_id, product_id), r AS (SELECT customer_id, product_id, RANK() OVER (PARTITION BY customer_id ORDER BY n DESC) AS rk FROM c) SELECT r.customer_id, r.product_id, p.product_name FROM r JOIN d1029_shop_products p ON p.product_id = r.product_id WHERE r.rk = 1;`,
    ordered: false,
  },
  {
    id: 'd20261029_a4', level: 'advanced', added: '2026-10-29', source: 'Reddit', company: '',
    ref: 'r/SQL thread: SQL assessments getting harder (median calculation)', url: 'https://reddit.sentinel-team.org/posts/1u0kuwy/snapshots/2026-06-10T05%3A53%3A39.860606Z',
    title: 'חציון זמן משלוח לכל עיר', tables: ['d1029_deliveries'],
    prompt: `בטבלה d1029_deliveries זמני משלוח בדקות לפי עיר (NULL פירושו שהמשלוח טרם הסתיים ולא נכלל בחישוב). החזירו לכל עיר את החציון של זמני המשלוח: הערך האמצעי כשמספר המשלוחים אי-זוגי, וממוצע שני הערכים האמצעיים כשהוא זוגי. העמודות: city, median_minutes, מעוגל ל-2 ספרות.`,
    solution: `WITH r AS (SELECT city, minutes, ROW_NUMBER() OVER (PARTITION BY city ORDER BY minutes) AS rn, COUNT(*) OVER (PARTITION BY city) AS cnt FROM d1029_deliveries WHERE minutes IS NOT NULL) SELECT city, ROUND(AVG(minutes), 2) AS median_minutes FROM r WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2) GROUP BY city;`,
    ordered: false,
  },
  {
    id: 'd20261029_a5', level: 'advanced', added: '2026-10-29', source: 'PracHub', company: 'Reddit',
    ref: 'Query US-based users and most active forums', url: 'https://prachub.com/interview-questions/query-us-based-users-and-most-active-forums',
    title: 'הפורום הפעיל ביותר של כל משתמש אמריקאי', tables: ['d1029_forum_users', 'd1029_forum_posts'],
    prompt: `בטבלה d1029_forum_users משתמשים ומדינה, ובטבלה d1029_forum_posts פוסטים לפי פורום. לכל משתמש מארצות הברית (country הוא US) שפרסם לפחות פוסט אחד, החזירו את הפורום שבו פרסם הכי הרבה פוסטים. בשוויון נבחר הפורום הראשון בסדר אלפביתי. העמודות: user_id, forum, post_cnt.`,
    solution: `WITH c AS (SELECT p.user_id, p.forum, COUNT(*) AS post_cnt FROM d1029_forum_posts p JOIN d1029_forum_users u ON u.user_id = p.user_id WHERE u.country = 'US' GROUP BY p.user_id, p.forum), r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY post_cnt DESC, forum) AS rn FROM c) SELECT user_id, forum, post_cnt FROM r WHERE rn = 1;`,
    ordered: false,
  },
  {
    id: 'd20261030_b1', level: 'basic', added: '2026-10-30', source: 'GitHub', company: '',
    ref: 'Get the ID with the Highest Value', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'העובדים עם השכר הגבוה ביותר', tables: ['d1030_salaries'],
    prompt: `בטבלה d1030_salaries מחלקה, מספר עובד ושכר (לעובד אחד אין שכר מוגדר). החזירו את כל העובדים בעלי השכר הגבוה ביותר בחברה כולה, גם אם כמה עובדים חולקים אותו שכר. העמודות: empno, salary.`,
    solution: `SELECT empno, salary FROM d1030_salaries WHERE salary = (SELECT MAX(salary) FROM d1030_salaries);`,
    ordered: false,
  },
  {
    id: 'd20261030_b2', level: 'basic', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הכנסות לפי קטגוריה בבית קפה', tables: ['d1030_cafe'],
    prompt: `בטבלה d1030_cafe שורות הזמנה של בית קפה: מחיר ליחידה, כמות ואחוז הנחה (ריק פירושו ללא הנחה). הכנסת שורה היא מחיר כפול כמות אחרי הפחתת ההנחה. לכל קטגוריה שסך ההכנסות שלה לפחות 60, החזירו את סך ההכנסות מעוגל ל-2 ספרות. העמודות: category, revenue. מיינו מההכנסה הגבוהה לנמוכה.`,
    solution: `SELECT category, ROUND(SUM(price * qty * (1 - COALESCE(discount_pct, 0) / 100.0)), 2) AS revenue FROM d1030_cafe GROUP BY category HAVING SUM(price * qty * (1 - COALESCE(discount_pct, 0) / 100.0)) >= 60 ORDER BY revenue DESC;`,
    ordered: true,
  },
  {
    id: 'd20261030_b3', level: 'basic', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'רופאים עם מטופלים רבים ותעריף גבוה', tables: ['d1030_clinic_visits'],
    prompt: `בטבלה d1030_clinic_visits ביקורי מטופלים אצל רופאים ועלות כל ביקור. החזירו כל רופא שטיפל לפחות בשני מטופלים שונים ושעלות הביקור הממוצעת אצלו גבוהה מ-150. העמודות: doctor, patients (מספר המטופלים השונים), avg_fee (מעוגל ל-2 ספרות).`,
    solution: `SELECT doctor, COUNT(DISTINCT patient) AS patients, ROUND(AVG(fee), 2) AS avg_fee FROM d1030_clinic_visits GROUP BY doctor HAVING COUNT(DISTINCT patient) >= 2 AND AVG(fee) > 150;`,
    ordered: false,
  },
  {
    id: 'd20261030_b4', level: 'basic', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'רמות שחקנים לפי נקודות', tables: ['d1030_players'],
    prompt: `בטבלה d1030_players שחקנים והנקודות שהבקיעו (ייתכן שאין ערך, ואז נחשב כ-0). סווגו כל שחקן: "star" עם 25 נקודות ומעלה, "regular" עם 10 עד 24, ו-"bench" עם פחות מ-10. החזירו כמה שחקנים יש בכל סיווג. העמודות: tier, players.`,
    solution: `SELECT CASE WHEN COALESCE(points, 0) >= 25 THEN 'star' WHEN COALESCE(points, 0) >= 10 THEN 'regular' ELSE 'bench' END AS tier, COUNT(*) AS players FROM d1030_players GROUP BY tier;`,
    ordered: false,
  },
  {
    id: 'd20261030_b5', level: 'basic', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'תפוסת טיסות בנובמבר', tables: ['d1030_flights'],
    prompt: `בטבלה d1030_flights טיסות עם מספר מושבים ומספר כרטיסים שנמכרו (ריק פירושו שלא נמכרו). לכל שדה מוצא, עבור טיסות שמועד ההמראה שלהן בנובמבר 2026 בלבד, החזירו את מספר הטיסות ואת אחוז התפוסה: סך הכרטיסים שנמכרו חלקי סך המושבים כפול 100, מעוגל ל-2 ספרות. העמודות: origin, flights, load_pct.`,
    solution: `SELECT origin, COUNT(*) AS flights, ROUND(100.0 * SUM(COALESCE(sold, 0)) / SUM(seats), 2) AS load_pct FROM d1030_flights WHERE dep_date >= '2026-11-01' AND dep_date < '2026-12-01' GROUP BY origin;`,
    ordered: false,
  },
  {
    id: 'd20261030_i1', level: 'intermediate', added: '2026-10-30', source: 'GitHub', company: '',
    ref: 'Histograms', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'היסטוגרמה של אורך סשנים', tables: ['d1030_sessions'],
    prompt: `בטבלה d1030_sessions סשנים של צפייה בווידאו ואורכם בשניות. חלקו את האורכים לטווחים בגודל 5 שניות: 0-4, 5-9, 10-14 וכן הלאה. החזירו לכל טווח שיש בו לפחות סשן אחד את התווית שלו בצורה "5-9" ואת מספר הסשנים. העמודות: bin_label, sessions. מיינו לפי תחילת הטווח מהקטן לגדול.`,
    solution: `SELECT ((length_seconds / 5) * 5) || '-' || ((length_seconds / 5) * 5 + 4) AS bin_label, COUNT(*) AS sessions FROM d1030_sessions GROUP BY length_seconds / 5 ORDER BY length_seconds / 5;`,
    ordered: true,
  },
  {
    id: 'd20261030_i2', level: 'intermediate', added: '2026-10-30', source: 'GitHub', company: '',
    ref: 'Retained Users Per Month', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'משתמשים שנשמרו מחודש לחודש', tables: ['d1030_logins'],
    prompt: `בטבלה d1030_logins כניסות משתמשים לפי תאריך. משתמש נחשב "נשמר" בחודש מסוים אם נכנס גם בו וגם בחודש הקלנדרי הקודם. החזירו לכל חודש שיש בו לפחות משתמש אחד שנשמר את מספר המשתמשים השונים שנשמרו. העמודות: month (בפורמט YYYY-MM), retained_users.`,
    solution: `SELECT a.m AS month, COUNT(DISTINCT a.user_id) AS retained_users FROM (SELECT DISTINCT user_id, strftime('%Y-%m', login_date) AS m FROM d1030_logins) a JOIN (SELECT DISTINCT user_id, strftime('%Y-%m', login_date) AS m FROM d1030_logins) b ON b.user_id = a.user_id AND b.m = strftime('%Y-%m', a.m || '-01', '-1 month') GROUP BY a.m;`,
    ordered: false,
  },
  {
    id: 'd20261030_i3', level: 'intermediate', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'תלמידים שלא נכשלו באף מבחן', tables: ['d1030_students', 'd1030_results'],
    prompt: `בטבלה d1030_students תלמידים, ובטבלה d1030_results ציוני מבחנים. ציון מתחת ל-60 הוא כישלון. החזירו את התלמידים שנבחנו לפחות במבחן אחד ולא נכשלו באף אחד מהם. העמודות: student_id, name.`,
    solution: `SELECT s.student_id, s.name FROM d1030_students s WHERE EXISTS (SELECT 1 FROM d1030_results r WHERE r.student_id = s.student_id) AND NOT EXISTS (SELECT 1 FROM d1030_results r WHERE r.student_id = s.student_id AND r.score < 60);`,
    ordered: false,
  },
  {
    id: 'd20261030_i4', level: 'intermediate', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות רב-ערוציים עם הוצאה גבוהה', tables: ['d1030_web_orders', 'd1030_store_orders'],
    prompt: `בטבלאות d1030_web_orders ו-d1030_store_orders הזמנות מהאתר ומהחנות הפיזית. החזירו לקוחות שקנו בשני הערוצים וסך ההוצאה שלהם בשני הערוצים יחד הוא לפחות 500. העמודות: customer, total_spend.`,
    solution: `SELECT customer, SUM(amount) AS total_spend FROM (SELECT customer, amount, 'web' AS ch FROM d1030_web_orders UNION ALL SELECT customer, amount, 'store' AS ch FROM d1030_store_orders) GROUP BY customer HAVING COUNT(DISTINCT ch) = 2 AND SUM(amount) >= 500;`,
    ordered: false,
  },
  {
    id: 'd20261030_i5', level: 'intermediate', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'טיפול בפניות לפי דחיפות', tables: ['d1030_tickets'],
    prompt: `בטבלה d1030_tickets פניות תמיכה עם זמן פתיחה וזמן סגירה (ריק פירושו שהפנייה עדיין פתוחה). לכל רמת דחיפות החזירו: סך הפניות, כמה נסגרו תוך 48 שעות או פחות מרגע הפתיחה, וכמה עדיין פתוחות. העמודות: priority, total, fast_closed, still_open.`,
    solution: `SELECT priority, COUNT(*) AS total, SUM(CASE WHEN closed_at IS NOT NULL AND strftime('%s', closed_at) - strftime('%s', opened_at) <= 172800 THEN 1 ELSE 0 END) AS fast_closed, SUM(CASE WHEN closed_at IS NULL THEN 1 ELSE 0 END) AS still_open FROM d1030_tickets GROUP BY priority;`,
    ordered: false,
  },
  {
    id: 'd20261030_a1', level: 'advanced', added: '2026-10-30', source: 'GitHub', company: '',
    ref: 'MoM Percent Change', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'שינוי חודשי באחוזים במשתמשים פעילים', tables: ['d1030_logins'],
    prompt: `בטבלה d1030_logins כניסות משתמשים לפי תאריך. לכל חודש חשבו את מספר המשתמשים הפעילים השונים ואת השינוי באחוזים לעומת החודש הקודם בנתונים, מעוגל ל-2 ספרות. בחודש הראשון השינוי הוא NULL. העמודות: month (בפורמט YYYY-MM), active_users, pct_change. מיינו לפי חודש.`,
    solution: `WITH m AS (SELECT strftime('%Y-%m', login_date) AS month, COUNT(DISTINCT user_id) AS active_users FROM d1030_logins GROUP BY 1) SELECT month, active_users, ROUND(100.0 * (active_users - LAG(active_users) OVER (ORDER BY month)) / LAG(active_users) OVER (ORDER BY month), 2) AS pct_change FROM m ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261030_a2', level: 'advanced', added: '2026-10-30', source: 'GitHub', company: '',
    ref: 'Multiple Join Conditions (email response time)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'זמן תגובה של התמיכה למיילים', tables: ['d1030_emails'],
    prompt: `בטבלה d1030_emails הודעות דואר בין לקוחות לתמיכה (support@x.com). לכל הודעה שנשלחה אל support@x.com ושנענתה, החזירו את מספר הדקות מרגע שליחתה ועד התשובה הראשונה של התמיכה לאותו שולח באותו נושא שנשלחה אחריה. הודעות שלא נענו לא יופיעו. העמודות: id, response_minutes.`,
    solution: `SELECT e.id, (strftime('%s', MIN(r.sent_at)) - strftime('%s', e.sent_at)) / 60 AS response_minutes FROM d1030_emails e JOIN d1030_emails r ON r.subject = e.subject AND r.sender = e.recipient AND r.recipient = e.sender AND r.sent_at > e.sent_at WHERE e.recipient = 'support@x.com' GROUP BY e.id, e.sent_at;`,
    ordered: false,
  },
  {
    id: 'd20261030_a3', level: 'advanced', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'רצפי תקלות של חיישנים', tables: ['d1030_sensor'],
    prompt: `בטבלה d1030_sensor קריאות חיישנים לפי מספר קריאה עוקב (reading_id) וסטטוס (up או down). לכל חיישן מצאו רצפים של קריאות down עוקבות (לפי מספר הקריאה) שאורכם לפחות 3. העמודות: device, start_id, end_id, readings (מספר הקריאות ברצף).`,
    solution: `WITH d AS (SELECT device, reading_id, reading_id - ROW_NUMBER() OVER (PARTITION BY device ORDER BY reading_id) AS grp FROM d1030_sensor WHERE status = 'down') SELECT device, MIN(reading_id) AS start_id, MAX(reading_id) AS end_id, COUNT(*) AS readings FROM d GROUP BY device, grp HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261030_a4', level: 'advanced', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מסלול ההנהלה של עובדים ללא כפיפים', tables: ['d1030_org'],
    prompt: `בטבלה d1030_org עובדים והמנהל הישיר של כל אחד (למנכ"ל אין מנהל). לכל עובד שאין לו כפיפים החזירו את שרשרת השמות מהמנכ"ל ועד אליו, מופרדת ב-" > ", לדוגמה "A > B > C". העמודות: name, path.`,
    solution: `WITH RECURSIVE p AS (SELECT emp_id, name, name AS path FROM d1030_org WHERE manager_id IS NULL UNION ALL SELECT o.emp_id, o.name, p.path || ' > ' || o.name FROM d1030_org o JOIN p ON o.manager_id = p.emp_id) SELECT name, path FROM p WHERE emp_id NOT IN (SELECT manager_id FROM d1030_org WHERE manager_id IS NOT NULL);`,
    ordered: false,
  },
  {
    id: 'd20261030_a5', level: 'advanced', added: '2026-10-30', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'היום שבו קמפיין חצה תקציב', tables: ['d1030_ads'],
    prompt: `בטבלה d1030_ads הוצאה יומית על קמפיינים פרסומיים. לכל קמפיין שסך ההוצאה המצטבר שלו הגיע ל-500 לפחות, החזירו את היום הראשון שבו זה קרה ואת ההוצאה המצטברת באותו יום (כולל אותו). העמודות: campaign, day, cumulative_spend.`,
    solution: `WITH c AS (SELECT campaign, day, SUM(spend) OVER (PARTITION BY campaign ORDER BY day) AS cumulative_spend FROM d1030_ads) SELECT campaign, day, cumulative_spend FROM c WHERE cumulative_spend >= 500 AND day = (SELECT MIN(c2.day) FROM c c2 WHERE c2.campaign = c.campaign AND c2.cumulative_spend >= 500);`,
    ordered: false,
  },
  {
    id: 'd20261031_b1', level: 'basic', added: '2026-10-31', source: 'StrataScratch', company: 'Lyft',
    ref: 'Bikes Last Used', url: 'https://www.stratascratch.com/blog/categories/lyft',
    title: 'מתי כל אופניים שימשו לאחרונה', tables: ['d1031_bike_rides'],
    prompt: `בטבלה d1031_bike_rides נסיעות באופניים שיתופיים, עם מספר האופניים וזמן סיום הנסיעה. לכל אופניים החזירו את זמן הסיום האחרון שלהם. העמודות: bike_number, last_end_time. מיינו מהאחרון לראשון לפי last_end_time, ובשוויון לפי bike_number בסדר עולה.`,
    solution: `SELECT bike_number, MAX(end_time) AS last_end_time FROM d1031_bike_rides GROUP BY bike_number ORDER BY last_end_time DESC, bike_number;`,
    ordered: true,
  },
  {
    id: 'd20261031_b2', level: 'basic', added: '2026-10-31', source: 'GeeksforGeeks', company: 'Spotify',
    ref: 'Spotify SQL interview questions (top artists by chart positions)', url: 'https://geeksforgeeks.org/spotify-sql-interview-questions',
    title: 'אמנים שנכנסו לחמישייה הראשונה שוב ושוב', tables: ['d1031_charts'],
    prompt: `בטבלה d1031_charts שורה לכל הופעה של שיר במצעד השבועי, עם מיקומו (1 הוא הגבוה ביותר). החזירו אמנים שהשירים שלהם הופיעו במקומות 1 עד 5 לפחות 3 פעמים בסך הכול, ואת מספר ההופעות האלה. העמודות: artist, top5_entries. מיינו לפי top5_entries מהגבוה לנמוך, ובשוויון לפי artist בסדר עולה.`,
    solution: `SELECT artist, COUNT(*) AS top5_entries FROM d1031_charts WHERE position <= 5 GROUP BY artist HAVING COUNT(*) >= 3 ORDER BY top5_entries DESC, artist;`,
    ordered: true,
  },
  {
    id: 'd20261031_b3', level: 'basic', added: '2026-10-31', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הכנסה חודשית ממנויים פעילים לפי תוכנית', tables: ['d1031_subs'],
    prompt: `בטבלה d1031_subs מנויים לשירות SaaS. מנוי פעיל הוא מנוי שלא בוטל (canceled_at ריק). לכל תוכנית החזירו את מספר המנויים הפעילים ואת סך ההכנסה החודשית מהם, אך רק לתוכניות שההכנסה החודשית שלהן לפחות 80. העמודות: plan, active_subs, monthly_revenue.`,
    solution: `SELECT plan, COUNT(*) AS active_subs, SUM(monthly_fee) AS monthly_revenue FROM d1031_subs WHERE canceled_at IS NULL GROUP BY plan HAVING SUM(monthly_fee) >= 80;`,
    ordered: false,
  },
  {
    id: 'd20261031_b4', level: 'basic', added: '2026-10-31', source: 'Final Round AI', company: 'Lyft',
    ref: 'Lyft Ride Requests', url: 'https://www.finalroundai.com/interview-questions/lyft-data-analysis-sql',
    title: 'שיעור אישור בקשות נסיעה לפי אזור', tables: ['d1031_requests'],
    prompt: `בטבלה d1031_requests בקשות נסיעה עם אזור וסטטוס (accepted, declined או expired). לכל אזור חשבו את אחוז הבקשות שסטטוסן accepted מתוך כל הבקשות באזור, מעוגל ל-2 ספרות אחרי הנקודה. העמודות: region, acceptance_pct.`,
    solution: `SELECT region, ROUND(100.0 * SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) / COUNT(*), 2) AS acceptance_pct FROM d1031_requests GROUP BY region;`,
    ordered: false,
  },
  {
    id: 'd20261031_b5', level: 'basic', added: '2026-10-31', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סטטיסטיקת שחקנים לפי מדינה', tables: ['d1031_players'],
    prompt: `בטבלה d1031_players שחקני משחק, עם מדינה, תאריך כניסה אחרון (ריק אם מעולם לא נכנס) וניקוד (ריק אם אין). לכל מדינה החזירו את מספר השחקנים, את מספר השחקנים שמעולם לא נכנסו, ואת הניקוד הממוצע מעוגל לספרה אחת אחרי הנקודה (שחקנים ללא ניקוד אינם נספרים בממוצע). העמודות: country, players, never_logged_in, avg_score. מיינו לפי country.`,
    solution: `SELECT country, COUNT(*) AS players, SUM(CASE WHEN last_login IS NULL THEN 1 ELSE 0 END) AS never_logged_in, ROUND(AVG(score), 1) AS avg_score FROM d1031_players GROUP BY country ORDER BY country;`,
    ordered: true,
  },
  {
    id: 'd20261031_i1', level: 'intermediate', added: '2026-10-31', source: 'Glassdoor', company: 'Lyft',
    ref: 'Lyft interview review: SQL round with Rides and Drivers tables', url: 'https://www.glassdoor.com/Interview/Lyft-Interview-E700614-RVW40457746.htm',
    title: 'נסיעות שהושלמו מחוץ לאזור הבית של הנהג', tables: ['d1031_drivers', 'd1031_rides'],
    prompt: `בטבלה d1031_drivers לכל נהג אזור בית, ובטבלה d1031_rides נסיעות עם האזור שבו התבצעו ודגל is_completed (1 אם הושלמה). לכל נהג שהשלים לפחות נסיעה אחת, חשבו את אחוז הנסיעות שהושלמו מחוץ לאזור הבית שלו מתוך הנסיעות שהושלמו, מעוגל ל-2 ספרות. העמודות: driver_id, outside_pct.`,
    solution: `SELECT d.driver_id, ROUND(100.0 * SUM(CASE WHEN r.ride_region <> d.home_region THEN 1 ELSE 0 END) / COUNT(*), 2) AS outside_pct FROM d1031_drivers d JOIN d1031_rides r ON r.driver_id = d.driver_id WHERE r.is_completed = 1 GROUP BY d.driver_id;`,
    ordered: false,
  },
  {
    id: 'd20261031_i2', level: 'intermediate', added: '2026-10-31', source: 'DataDriven', company: 'Lyft',
    ref: 'Lyft Data Engineer SQL onsite: customers with purchases on two consecutive calendar days', url: 'https://datadriven.io/companies/lyft/interview',
    title: 'לקוחות שקנו בשני ימים רצופים', tables: ['d1031_purchases'],
    prompt: `בטבלה d1031_purchases שורה לכל רכישה, עם מזהה לקוח ותאריך. החזירו כל לקוח שביצע רכישות בשני ימי לוח עוקבים לפחות פעם אחת, פעם אחת לכל לקוח. שתי רכישות באותו יום אינן נחשבות לימים עוקבים. העמודה: customer_id.`,
    solution: `SELECT DISTINCT a.customer_id FROM d1031_purchases a JOIN d1031_purchases b ON b.customer_id = a.customer_id AND b.purchase_date = date(a.purchase_date, '+1 day');`,
    ordered: false,
  },
  {
    id: 'd20261031_i3', level: 'intermediate', added: '2026-10-31', source: 'StrataScratch', company: 'Lyft',
    ref: 'Lyft question on distance traveled by users (ID 10324)', url: 'https://www.stratascratch.com/blog/categories/lyft',
    title: 'שלושת הרוכבים שנסעו הכי הרבה', tables: ['d1031_riders', 'd1031_trips'],
    prompt: `בטבלה d1031_riders רוכבים, ובטבלה d1031_trips נסיעות עם מרחק בקילומטרים. החזירו את שלושת הרוכבים עם סך המרחק הגבוה ביותר (רוכבים ללא נסיעות אינם נכללים). העמודות: name, total_km. מיינו לפי total_km מהגבוה לנמוך, ובשוויון לפי name בסדר עולה, והחזירו שלוש שורות בדיוק.`,
    solution: `SELECT r.name, SUM(t.distance_km) AS total_km FROM d1031_riders r JOIN d1031_trips t ON t.user_id = r.user_id GROUP BY r.user_id, r.name ORDER BY total_km DESC, r.name LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261031_i4', level: 'intermediate', added: '2026-10-31', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'עובדים ללא הערכת ביצועים ב-2026', tables: ['d1031_emps', 'd1031_reviews'],
    prompt: `בטבלה d1031_emps עובדים, ובטבלה d1031_reviews הערכות ביצועים עם תאריך. החזירו עובדים שאין להם אף הערכה שתאריכה בשנת 2026, כולל עובדים שמעולם לא הוערכו. העמודות: emp_id, name.`,
    solution: `SELECT e.emp_id, e.name FROM d1031_emps e WHERE NOT EXISTS (SELECT 1 FROM d1031_reviews r WHERE r.emp_id = e.emp_id AND r.review_date >= '2026-01-01' AND r.review_date < '2027-01-01');`,
    ordered: false,
  },
  {
    id: 'd20261031_i5', level: 'intermediate', added: '2026-10-31', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'יעדים עם לפחות שני משלוחים באוויר ובים יחד', tables: ['d1031_ship_air', 'd1031_ship_sea'],
    prompt: `הטבלאות d1031_ship_air ו-d1031_ship_sea מכילות משלוחים אוויריים וימיים בנפרד (מספרי המשלוח עשויים לחזור בין הטבלאות, וגם שורות זהות הן משלוחים נפרדים). לכל יעד שיש אליו לפחות שני משלוחים בשתי הטבלאות יחד, החזירו את מספר המשלוחים ואת המשקל הכולל בק"ג. העמודות: destination, shipments, total_kg.`,
    solution: `SELECT destination, COUNT(*) AS shipments, SUM(weight_kg) AS total_kg FROM (SELECT destination, weight_kg FROM d1031_ship_air UNION ALL SELECT destination, weight_kg FROM d1031_ship_sea) GROUP BY destination HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261031_a1', level: 'advanced', added: '2026-10-31', source: 'LeetCode', company: 'Hopper',
    ref: 'Hopper Company Queries I', url: 'https://jaywin.gitbook.io/leetcode/solutions/1635-hopper-company-queries-i',
    title: 'נהגים זמינים ונסיעות שאושרו לפי חודש', tables: ['d1031_hdrivers', 'd1031_hrides', 'd1031_haccepted'],
    prompt: `בטבלה d1031_hdrivers נהגים עם תאריך הצטרפות, בטבלה d1031_hrides בקשות נסיעה עם תאריך הבקשה, ובטבלה d1031_haccepted הנסיעות שאושרו על ידי נהג. לכל חודש מינואר 2026 עד יוני 2026 (כולל), גם חודש בלי נסיעות מאושרות, החזירו את מספר הנהגים שהצטרפו עד סוף החודש (כולל) ואת מספר הנסיעות שאושרו מבין הבקשות שהוגשו באותו חודש. העמודות: month (בפורמט YYYY-MM), active_drivers, accepted_rides. מיינו לפי חודש.`,
    solution: `WITH RECURSIVE m(ms) AS (SELECT '2026-01-01' UNION ALL SELECT date(ms, '+1 month') FROM m WHERE ms < '2026-06-01') SELECT strftime('%Y-%m', ms) AS month, (SELECT COUNT(*) FROM d1031_hdrivers d WHERE d.join_date <= date(ms, '+1 month', '-1 day')) AS active_drivers, (SELECT COUNT(*) FROM d1031_hrides r JOIN d1031_haccepted a ON a.ride_id = r.ride_id WHERE strftime('%Y-%m', r.requested_at) = strftime('%Y-%m', ms)) AS accepted_rides FROM m ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261031_a2', level: 'advanced', added: '2026-10-31', source: 'LeetCode', company: 'Hopper',
    ref: 'Hopper Company Queries II', url: 'https://www.tutorialspoint.com/practice/hopper-company-queries-ii.htm',
    title: 'אחוז הנהגים שעבדו בכל חודש', tables: ['d1031_hdrivers', 'd1031_hrides', 'd1031_haccepted'],
    prompt: `בהמשך לאותן טבלאות (d1031_hdrivers, d1031_hrides, d1031_haccepted): נהג נחשב זמין בחודש אם הצטרף עד סוף אותו חודש, ועובד בחודש אם אישר לפחות נסיעה אחת מבקשה שהוגשה בו. לכל חודש מינואר 2026 עד יוני 2026 החזירו את אחוז הנהגים העובדים מתוך הנהגים הזמינים, מעוגל ל-2 ספרות. העמודות: month (בפורמט YYYY-MM), working_pct. מיינו לפי חודש.`,
    solution: `WITH RECURSIVE m(ms) AS (SELECT '2026-01-01' UNION ALL SELECT date(ms, '+1 month') FROM m WHERE ms < '2026-06-01') SELECT strftime('%Y-%m', ms) AS month, ROUND(100.0 * (SELECT COUNT(DISTINCT a.driver_id) FROM d1031_hrides r JOIN d1031_haccepted a ON a.ride_id = r.ride_id WHERE strftime('%Y-%m', r.requested_at) = strftime('%Y-%m', ms)) / (SELECT COUNT(*) FROM d1031_hdrivers d WHERE d.join_date <= date(ms, '+1 month', '-1 day')), 2) AS working_pct FROM m ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261031_a3', level: 'advanced', added: '2026-10-31', source: 'Interview Query', company: 'Home Depot',
    ref: 'Home Depot interview guide: manager with the biggest team size', url: 'https://www.interviewquery.com/interview-guides/home-depot',
    title: 'גודל צוות מלא של כל מנהל', tables: ['d1031_staff'],
    prompt: `בטבלה d1031_staff עובדים והמנהל הישיר של כל אחד (למנכ"ל אין מנהל). צוות של מנהל כולל את כל העובדים הכפופים לו, ישירות או דרך מנהלים אחרים. לכל עובד שיש לו לפחות כפיף אחד, החזירו את גודל הצוות המלא שלו, ללא המנהל עצמו. העמודות: name, team_size. מיינו לפי team_size מהגבוה לנמוך, ובשוויון לפי name בסדר עולה.`,
    solution: `WITH RECURSIVE t(root, emp) AS (SELECT emp_id, emp_id FROM d1031_staff UNION ALL SELECT t.root, s.emp_id FROM t JOIN d1031_staff s ON s.manager_id = t.emp) SELECT m.name, COUNT(*) - 1 AS team_size FROM t JOIN d1031_staff m ON m.emp_id = t.root GROUP BY t.root, m.name HAVING COUNT(*) > 1 ORDER BY team_size DESC, m.name;`,
    ordered: true,
  },
  {
    id: 'd20261031_a4', level: 'advanced', added: '2026-10-31', source: 'Codemia', company: '',
    ref: 'Write a query to find retention rate from events', url: 'https://codemia.io/practice/write-a-query-to-find-retention-rate-from-events',
    title: 'שימור ליום הבא לפי יום הצטרפות', tables: ['d1031_events'],
    prompt: `בטבלה d1031_events שורה לכל פעילות של משתמש בתאריך מסוים (ייתכנו כפילויות). יום ההצטרפות של משתמש הוא התאריך הראשון שבו הופיע. לכל יום הצטרפות החזירו את מספר המשתמשים שהצטרפו בו, כמה מהם פעילים גם ביום שלמחרת, ואחוז השימור מעוגל ל-2 ספרות. העמודות: cohort_date, cohort_size, retained, retention_pct. מיינו לפי cohort_date.`,
    solution: `WITH f AS (SELECT user_id, MIN(event_date) AS cohort_date FROM d1031_events GROUP BY user_id) SELECT f.cohort_date, COUNT(*) AS cohort_size, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1031_events e WHERE e.user_id = f.user_id AND e.event_date = date(f.cohort_date, '+1 day')) THEN 1 ELSE 0 END) AS retained, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1031_events e WHERE e.user_id = f.user_id AND e.event_date = date(f.cohort_date, '+1 day')) THEN 1 ELSE 0 END) / COUNT(*), 2) AS retention_pct FROM f GROUP BY f.cohort_date ORDER BY f.cohort_date;`,
    ordered: true,
  },
  {
    id: 'd20261031_a5', level: 'advanced', added: '2026-10-31', source: 'DataDriven', company: 'Lyft',
    ref: 'Lyft Data Engineer SQL onsite (gaps-and-islands extension: streaks of 3 or more consecutive days)', url: 'https://datadriven.io/companies/lyft/interview',
    title: 'הרצף הארוך ביותר של ימי רכישה', tables: ['d1031_purchases'],
    prompt: `בטבלה d1031_purchases שורה לכל רכישה, עם מזהה לקוח ותאריך (ייתכנו כמה רכישות באותו יום, והן נחשבות ליום אחד). לכל לקוח מצאו את מספר הימים העוקבים הרב ביותר שבהם קנה ברצף, והחזירו רק לקוחות שהרצף הארוך ביותר שלהם הוא לפחות 3 ימים. העמודות: customer_id, longest_streak.`,
    solution: `WITH d AS (SELECT DISTINCT customer_id, purchase_date FROM d1031_purchases), g AS (SELECT customer_id, julianday(purchase_date) - ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY purchase_date) AS grp FROM d), s AS (SELECT customer_id, COUNT(*) AS len FROM g GROUP BY customer_id, grp) SELECT customer_id, MAX(len) AS longest_streak FROM s GROUP BY customer_id HAVING MAX(len) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261101_b1', level: 'basic', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'Product Sales Analysis V', url: 'https://www.hellointerview.com/community/questions/product-sales-analysis-v/cm5eguhah03t3838o4hrwmstd',
    title: 'סך ההוצאה של כל לקוח', tables: ['d1101_sales', 'd1101_products'],
    prompt: `בטבלה d1101_sales שורה לכל קנייה (לקוח, מוצר וכמות), ובטבלה d1101_products המחיר ליחידה של כל מוצר. החזירו לכל לקוח שביצע קניות את הסכום הכולל ששילם. העמודות: user_id, spending. מיינו לפי spending מהגבוה לנמוך, ובשוויון לפי user_id בסדר עולה.`,
    solution: `SELECT s.user_id, SUM(s.quantity * p.price) AS spending FROM d1101_sales s JOIN d1101_products p ON p.product_id = s.product_id GROUP BY s.user_id ORDER BY spending DESC, s.user_id;`,
    ordered: true,
  },
  {
    id: 'd20261101_b2', level: 'basic', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'Sort the Olympic Table', url: 'https://leetcode.doocs.org/en/lc/2377',
    title: 'טבלת המדליות', tables: ['d1101_olympics'],
    prompt: `בטבלה d1101_olympics מספר מדליות הזהב, הכסף והארד של כל מדינה. החזירו את כל המדינות עם כל העמודות: country, gold, silver, bronze. מיינו לפי זהב מהרב למעט, ובשוויון לפי כסף מהרב למעט, אחר כך לפי ארד מהרב למעט, ולבסוף לפי שם המדינה בסדר אלפביתי עולה.`,
    solution: `SELECT country, gold, silver, bronze FROM d1101_olympics ORDER BY gold DESC, silver DESC, bronze DESC, country;`,
    ordered: true,
  },
  {
    id: 'd20261101_b3', level: 'basic', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'The Number of Users That Are Eligible for Discount', url: 'https://doocs.github.io/leetcode/en/lc/2205/',
    title: 'כמה משתמשים זכאים להנחה', tables: ['d1101_purchases'],
    prompt: `משתמש זכאי להנחה אם ביצע לפחות קנייה אחת שזמנה בין 2026-03-08 00:00:00 ל-2026-03-20 00:00:00 (כולל שני הקצוות) וסכומה לפחות 1000. בטבלה d1101_purchases שורה לכל קנייה. החזירו את מספר המשתמשים הזכאים בעמודה אחת בשם user_cnt.`,
    solution: `SELECT COUNT(DISTINCT user_id) AS user_cnt FROM d1101_purchases WHERE time_stamp BETWEEN '2026-03-08 00:00:00' AND '2026-03-20 00:00:00' AND amount >= 1000;`,
    ordered: false,
  },
  {
    id: 'd20261101_b4', level: 'basic', added: '2026-11-01', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שחקנים לפי מדינה', tables: ['d1101_players'],
    prompt: `בטבלה d1101_players שחקני משחק, עם מדינה (לחלק מהשחקנים המדינה לא ידועה) ורמה. קבצו את השחקנים לפי מדינה, כששחקנים בלי מדינה נספרים יחד תחת הערך Unknown. החזירו רק קבוצות עם לפחות 2 שחקנים. העמודות: country, players, avg_level (ממוצע הרמה מעוגל ל-2 ספרות אחרי הנקודה). מיינו לפי players מהגבוה לנמוך, ובשוויון לפי country בסדר אלפביתי.`,
    solution: `SELECT COALESCE(country, 'Unknown') AS country, COUNT(*) AS players, ROUND(AVG(level), 2) AS avg_level FROM d1101_players GROUP BY COALESCE(country, 'Unknown') HAVING COUNT(*) >= 2 ORDER BY players DESC, country;`,
    ordered: true,
  },
  {
    id: 'd20261101_b5', level: 'basic', added: '2026-11-01', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'זמן המתנה ממוצע במרפאות', tables: ['d1101_visits'],
    prompt: `בטבלה d1101_visits ביקורים במרפאות, עם סטטוס (done, cancelled או no_show) וזמן המתנה בדקות (לעיתים חסר). התחשבו רק בביקורים שהסטטוס שלהם done ושזמן ההמתנה שלהם ידוע. לכל מרפאה עם לפחות 3 ביקורים כאלה, החזירו את מספר הביקורים ואת זמן ההמתנה הממוצע מעוגל ספרה אחת אחרי הנקודה. העמודות: clinic, visits, avg_wait. מיינו לפי avg_wait מהגבוה לנמוך.`,
    solution: `SELECT clinic, COUNT(*) AS visits, ROUND(AVG(wait_min), 1) AS avg_wait FROM d1101_visits WHERE status = 'done' AND wait_min IS NOT NULL GROUP BY clinic HAVING COUNT(*) >= 3 ORDER BY avg_wait DESC;`,
    ordered: true,
  },
  {
    id: 'd20261101_i1', level: 'intermediate', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'Drop Type 1 Orders for Customers With Type 0 Orders', url: 'https://leetcode.doocs.org/en/lc/2084/',
    title: 'הזמנות אחרי הסרת סוג 1', tables: ['d1101_orders'],
    prompt: `בטבלה d1101_orders הזמנות עם מזהה לקוח וסוג הזמנה (0 או 1). עבור לקוח שיש לו לפחות הזמנה אחת מסוג 0, יש להסיר את כל ההזמנות שלו מסוג 1. שאר ההזמנות נשארות. החזירו את ההזמנות שנשארו עם העמודות order_id, customer_id, order_type.`,
    solution: `SELECT order_id, customer_id, order_type FROM d1101_orders o WHERE order_type = 0 OR NOT EXISTS (SELECT 1 FROM d1101_orders x WHERE x.customer_id = o.customer_id AND x.order_type = 0);`,
    ordered: false,
  },
  {
    id: 'd20261101_i2', level: 'intermediate', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'The Airport With the Most Traffic', url: 'https://leetcode.doocs.org/en/lc/2112/',
    title: 'שדה התעופה העמוס ביותר', tables: ['d1101_flights'],
    prompt: `בטבלה d1101_flights לכל זוג שדות תעופה (המראה ונחיתה) מספר הטיסות ביניהם. התנועה בשדה תעופה היא סך הטיסות שהמריאו ממנו ועוד סך הטיסות שנחתו בו. החזירו את מזהה שדה התעופה עם התנועה הגבוהה ביותר, ואם יש כמה כאלה בשוויון, את כולם. עמודה אחת בשם airport_id.`,
    solution: `WITH t AS (SELECT airport, SUM(c) AS traffic FROM (SELECT departure_airport AS airport, flights_count AS c FROM d1101_flights UNION ALL SELECT arrival_airport, flights_count FROM d1101_flights) GROUP BY airport) SELECT airport AS airport_id FROM t WHERE traffic = (SELECT MAX(traffic) FROM t);`,
    ordered: false,
  },
  {
    id: 'd20261101_i3', level: 'intermediate', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'Employees With Deductions', url: 'https://brain-leetcode.pages.dev/23xx/2394/',
    title: 'עובדים עם ניכוי משכר', tables: ['d1101_emp', 'd1101_logs'],
    prompt: `בטבלה d1101_emp לכל עובד מספר שעות העבודה הנדרש לחודש (needed_hours), ובטבלה d1101_logs הפעלות עבודה עם שעת כניסה ושעת יציאה. אורך כל הפעלה מעוגל כלפי מעלה לדקה שלמה. עובד נקנס אם סך הדקות שעבד קטן ממש מ-needed_hours כפול 60. עובד בלי אף הפעלה נקנס גם הוא. החזירו את employee_id של העובדים שנקנסו.`,
    solution: `SELECT e.employee_id FROM d1101_emp e LEFT JOIN d1101_logs l ON l.employee_id = e.employee_id GROUP BY e.employee_id, e.needed_hours HAVING COALESCE(SUM((CAST(strftime('%s', l.out_time) AS INTEGER) - CAST(strftime('%s', l.in_time) AS INTEGER) + 59) / 60), 0) < e.needed_hours * 60;`,
    ordered: false,
  },
  {
    id: 'd20261101_i4', level: 'intermediate', added: '2026-11-01', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'אחוז ביטולי נסיעות לפי עיר', tables: ['d1101_rides'],
    prompt: `בטבלה d1101_rides נסיעות שיתופיות עם עיר וסטטוס (completed או cancelled). לכל עיר עם לפחות 4 נסיעות, החזירו את מספר הנסיעות ואת אחוז הנסיעות שבוטלו מתוך כלל נסיעות העיר, מעוגל ספרה אחת אחרי הנקודה. העמודות: city, total_rides, cancel_pct. מיינו לפי cancel_pct מהגבוה לנמוך.`,
    solution: `SELECT city, COUNT(*) AS total_rides, ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_pct FROM d1101_rides GROUP BY city HAVING COUNT(*) >= 4 ORDER BY cancel_pct DESC;`,
    ordered: true,
  },
  {
    id: 'd20261101_i5', level: 'intermediate', added: '2026-11-01', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'יחידות שנמכרו לכל מוצר', tables: ['d1101_products', 'd1101_sales'],
    prompt: `לכל מוצר בטבלה d1101_products, כולל מוצרים שלא נמכרו אף פעם, החזירו את שם המוצר ואת סך היחידות שנמכרו ממנו (0 אם לא נמכר). העמודות: product_name, units_sold.`,
    solution: `SELECT p.product_name, COALESCE(SUM(s.quantity), 0) AS units_sold FROM d1101_products p LEFT JOIN d1101_sales s ON s.product_id = p.product_id GROUP BY p.product_id, p.product_name;`,
    ordered: false,
  },
  {
    id: 'd20261101_a1', level: 'advanced', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'Account Balance', url: 'https://www.talentd.in/fleetcode/videos/account-balance',
    title: 'יתרה רצה לכל חשבון', tables: ['d1101_txn'],
    prompt: `בטבלה d1101_txn תנועות בחשבונות בנק: חשבון, יום, סוג (Deposit מוסיף לחשבון, Withdraw מפחית ממנו) וסכום. לכל חשבון יש לכל היותר תנועה אחת ביום, וכל חשבון מתחיל מיתרה 0. החזירו לכל תנועה את היתרה בחשבון אחריה. העמודות: account_id, day, balance. מיינו לפי account_id ואז לפי day.`,
    solution: `SELECT account_id, day, SUM(CASE WHEN type = 'Deposit' THEN amount ELSE -amount END) OVER (PARTITION BY account_id ORDER BY day) AS balance FROM d1101_txn ORDER BY account_id, day;`,
    ordered: true,
  },
  {
    id: 'd20261101_a2', level: 'advanced', added: '2026-11-01', source: 'LeetCode', company: '',
    ref: 'The Number of Passengers in Each Bus I', url: 'https://doocs.github.io/leetcode/en/lc/2142/',
    title: 'נוסעים בכל אוטובוס', tables: ['d1101_buses', 'd1101_pass'],
    prompt: `בטבלה d1101_buses זמני ההגעה של אוטובוסים לתחנה (אין שני אוטובוסים באותו זמן), ובטבלה d1101_pass זמני ההגעה של נוסעים. כל נוסע עולה על האוטובוס הראשון שמגיע בזמן שווה לזמן הגעתו או מאוחר ממנו. נוסע שהגיע אחרי האוטובוס האחרון לא עולה על אף אוטובוס. החזירו לכל אוטובוס, גם אם לא עלה עליו אף נוסע, את מספר הנוסעים שעלו עליו. העמודות: bus_id, passengers_cnt. מיינו לפי bus_id.`,
    solution: `SELECT b.bus_id, COUNT(p.passenger_id) AS passengers_cnt FROM d1101_buses b LEFT JOIN (SELECT passenger_id, (SELECT MIN(b2.arrival_time) FROM d1101_buses b2 WHERE b2.arrival_time >= ps.arrival_time) AS bus_time FROM d1101_pass ps) p ON p.bus_time = b.arrival_time GROUP BY b.bus_id ORDER BY b.bus_id;`,
    ordered: true,
  },
  {
    id: 'd20261101_a3', level: 'advanced', added: '2026-11-01', source: 'DataLemur', company: 'Alibaba',
    ref: 'Compressed Median', url: 'https://datalemur.com/questions?company=Alibaba',
    title: 'חציון מטבלה דחוסה', tables: ['d1101_items'],
    prompt: `בטבלה d1101_items לכל מספר פריטים בהזמנה (item_count) מספר ההזמנות שהכילו בדיוק כך (order_occurrences). דמיינו את הרשימה המלאה של כל ההזמנות, ערך אחד לכל הזמנה. החזירו את החציון של מספר הפריטים בהזמנה (ממוצע שני הערכים האמצעיים כשמספר ההזמנות זוגי), מעוגל ספרה אחת אחרי הנקודה, בעמודה בשם median.`,
    solution: `WITH c AS (SELECT item_count, SUM(order_occurrences) OVER (ORDER BY item_count) AS cum, SUM(order_occurrences) OVER () AS n FROM d1101_items) SELECT ROUND(((SELECT MIN(item_count) FROM c WHERE cum >= (n + 1) / 2) + (SELECT MIN(item_count) FROM c WHERE cum >= n / 2 + 1)) / 2.0, 1) AS median FROM (SELECT 1) LIMIT 1;`,
    ordered: false,
  },
  {
    id: 'd20261101_a4', level: 'advanced', added: '2026-11-01', source: 'DataDriven', company: '',
    ref: 'Monthly cohort retention', url: 'https://datadriven.io/interview/monthly_cohort_retention',
    title: 'שימור חודשי לפי חודש הצטרפות', tables: ['d1101_users', 'd1101_sessions'],
    prompt: `בטבלה d1101_users תאריך הצטרפות של כל משתמש, ובטבלה d1101_sessions תאריכי כניסה לאפליקציה. קבוצה היא כל המשתמשים שהצטרפו באותו חודש קלנדרי. לכל קבוצה ולכל מספר חודשים מאז ההצטרפות (0 הוא חודש ההצטרפות עצמו) שבו היה לפחות משתמש אחד פעיל, החזירו את שיעור המשתמשים מהקבוצה שהיו פעילים באותו חודש, כשבר בין 0 ל-1 מעוגל ל-2 ספרות. העמודות: cohort_month (בפורמט YYYY-MM), months_since_signup, retention_rate. מיינו לפי cohort_month ואז months_since_signup.`,
    solution: `WITH u AS (SELECT user_id, substr(signup_date, 1, 7) AS cohort_month, CAST(substr(signup_date, 1, 4) AS INTEGER) * 12 + CAST(substr(signup_date, 6, 2) AS INTEGER) AS sm FROM d1101_users), a AS (SELECT DISTINCT s.user_id, CAST(substr(s.session_date, 1, 4) AS INTEGER) * 12 + CAST(substr(s.session_date, 6, 2) AS INTEGER) AS am FROM d1101_sessions s) SELECT u.cohort_month, a.am - u.sm AS months_since_signup, ROUND(1.0 * COUNT(*) / (SELECT COUNT(*) FROM u u2 WHERE u2.cohort_month = u.cohort_month), 2) AS retention_rate FROM u JOIN a ON a.user_id = u.user_id WHERE a.am >= u.sm GROUP BY u.cohort_month, a.am - u.sm ORDER BY u.cohort_month, months_since_signup;`,
    ordered: true,
  },
  {
    id: 'd20261101_a5', level: 'advanced', added: '2026-11-01', source: 'DataDriven', company: '',
    ref: 'The Seventh Day', url: 'https://datadriven.io/interview/the_seventh_day',
    title: 'חזרה שבוע ואילך אחרי ההצטרפות', tables: ['d1101_users', 'd1101_sessions'],
    prompt: `בטבלאות d1101_users ו-d1101_sessions (תאריך הצטרפות ותאריכי כניסה לכל משתמש) משתמש נחשב כחוזר אם יש לו כניסה שבוצעה לפחות 7 ימים אחרי תאריך ההצטרפות שלו. לכל חודש הצטרפות החזירו את מספר המשתמשים שהצטרפו בו, כמה מהם חזרו, ואחוז החוזרים מעוגל ל-2 ספרות. העמודות: signup_month (בפורמט YYYY-MM), users, returned, returned_pct. מיינו לפי signup_month.`,
    solution: `SELECT substr(u.signup_date, 1, 7) AS signup_month, COUNT(*) AS users, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1101_sessions s WHERE s.user_id = u.user_id AND julianday(s.session_date) - julianday(u.signup_date) >= 7) THEN 1 ELSE 0 END) AS returned, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1101_sessions s WHERE s.user_id = u.user_id AND julianday(s.session_date) - julianday(u.signup_date) >= 7) THEN 1 ELSE 0 END) / COUNT(*), 2) AS returned_pct FROM d1101_users u GROUP BY substr(u.signup_date, 1, 7) ORDER BY signup_month;`,
    ordered: true,
  },
  {
    id: 'd20261102_b1', level: 'basic', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Ads Performance', url: 'https://github.com/MlvPrasadOfficial/LeetCode_SQL_Solutions_MLV_Prasad',
    title: 'אחוז הקלקות (CTR) לכל מודעה', tables: ['d1102_ads'],
    prompt: `בטבלה d1102_ads כל שורה היא פעולה של משתמש על מודעה: Clicked (לחץ), Viewed (צפה) או Ignored (התעלם). אחוז ההקלקות של מודעה הוא 100 כפול מספר ה-Clicked חלקי סכום מספר ה-Clicked ועוד ה-Viewed שלה (פעולות Ignored אינן נספרות). אם למודעה אין אף פעולה Clicked או Viewed, אחוז ההקלקות שלה הוא 0. החזירו לכל מודעה את ad_id ואת ctr מעוגל ל-2 ספרות. מיינו לפי ctr יורד ואז לפי ad_id עולה.`,
    solution: `SELECT ad_id, ROUND(COALESCE(100.0 * SUM(action = 'Clicked') / NULLIF(SUM(action IN ('Clicked', 'Viewed')), 0), 0), 2) AS ctr FROM d1102_ads GROUP BY ad_id ORDER BY ctr DESC, ad_id;`,
    ordered: true,
  },
  {
    id: 'd20261102_b2', level: 'basic', added: '2026-11-02', source: 'Glassdoor', company: 'Meta',
    ref: 'Given a sample SQL table, write a few query to solve increasingly difficult asks from the data', url: 'https://www.glassdoor.com.au/Interview/Given-a-sample-SQL-table-write-a-few-query-to-solve-increasingly-difficult-asks-from-the-data-QTN_8231462.htm',
    title: 'כותבים פעילים ברשת חברתית ב-2026', tables: ['d1102_posts'],
    prompt: `בטבלה d1102_posts יש פוסטים עם כותב, מספר לייקים (likes, ערך חסר נחשב ל-0) ותאריך פרסום. עבור פוסטים שפורסמו בשנת 2026 בלבד, החזירו כל כותב שפרסם בה לפחות 2 פוסטים, עם העמודות: author, posts (מספר הפוסטים), total_likes (סך הלייקים), avg_likes (ממוצע לייקים לפוסט, מעוגל ל-2 ספרות). מיינו לפי total_likes יורד ואז לפי author עולה.`,
    solution: `SELECT author, COUNT(*) AS posts, SUM(COALESCE(likes, 0)) AS total_likes, ROUND(AVG(COALESCE(likes, 0)), 2) AS avg_likes FROM d1102_posts WHERE posted_on >= '2026-01-01' AND posted_on < '2027-01-01' GROUP BY author HAVING COUNT(*) >= 2 ORDER BY total_likes DESC, author;`,
    ordered: true,
  },
  {
    id: 'd20261102_b3', level: 'basic', added: '2026-11-02', source: 'DataVidhya', company: '',
    ref: 'User Purchase Histogram', url: 'https://datavidhya.com/coding-problems/questionDetails/question/aggregation-user-purchase-histogram/',
    title: 'התפלגות מספר ההזמנות למשתמש', tables: ['d1102_hist_orders'],
    prompt: `בטבלה d1102_hist_orders כל שורה היא הזמנה של משתמש. החזירו התפלגות: לכל מספר הזמנות שקיים בנתונים, כמה משתמשים ביצעו בדיוק את מספר ההזמנות הזה. העמודות: orders_count, users_count. מיינו לפי orders_count עולה.`,
    solution: `SELECT orders_count, COUNT(*) AS users_count FROM (SELECT user_id, COUNT(*) AS orders_count FROM d1102_hist_orders GROUP BY user_id) GROUP BY orders_count ORDER BY orders_count;`,
    ordered: true,
  },
  {
    id: 'd20261102_b4', level: 'basic', added: '2026-11-02', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שכר כולל ממוצע במחלקות גדולות', tables: ['d1102_staff'],
    prompt: `בטבלה d1102_staff יש לכל עובד שכר בסיס (salary) ובונוס (bonus, ערך חסר פירושו שאין בונוס, כלומר 0). החזירו לכל מחלקה שיש בה לפחות 3 עובדים את dept ואת avg_total_comp: הממוצע של שכר הבסיס ועוד הבונוס, מעוגל ל-2 ספרות. מיינו לפי avg_total_comp יורד.`,
    solution: `SELECT dept, ROUND(AVG(salary + COALESCE(bonus, 0)), 2) AS avg_total_comp FROM d1102_staff GROUP BY dept HAVING COUNT(*) >= 3 ORDER BY avg_total_comp DESC;`,
    ordered: true,
  },
  {
    id: 'd20261102_b5', level: 'basic', added: '2026-11-02', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שחקני נינג׳ בלי מדינה מוגדרת', tables: ['d1102_players'],
    prompt: `בטבלה d1102_players החזירו שחקנים שהכינוי שלהם (nickname) מכיל את המחרוזת ninja באותיות כלשהן, הרמה שלהם (level) היא לפחות 20, ושלא הוגדרה להם מדינה (country חסר). העמודות: nickname, level. מיינו לפי level יורד.`,
    solution: `SELECT nickname, level FROM d1102_players WHERE LOWER(nickname) LIKE '%ninja%' AND level >= 20 AND country IS NULL ORDER BY level DESC;`,
    ordered: true,
  },
  {
    id: 'd20261102_i1', level: 'intermediate', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Strong Friendship', url: 'https://leetcode.doocs.org/en/lc/1949/',
    title: 'חברויות חזקות', tables: ['d1102_friends'],
    prompt: `בטבלה d1102_friends כל שורה היא חברות הדדית בין שני משתמשים (תמיד user1_id קטן מ-user2_id). חברות נקראת חזקה אם לשני החברים יש לפחות 3 חברים משותפים. החזירו את כל החברויות החזקות עם מספר החברים המשותפים. העמודות: user1_id, user2_id, mutual_friends. מיינו לפי user1_id ואז user2_id.`,
    solution: `WITH e AS (SELECT user1_id AS a, user2_id AS b FROM d1102_friends UNION ALL SELECT user2_id, user1_id FROM d1102_friends) SELECT f.user1_id, f.user2_id, COUNT(*) AS mutual_friends FROM d1102_friends f JOIN e x ON x.a = f.user1_id JOIN e y ON y.a = f.user2_id AND y.b = x.b GROUP BY f.user1_id, f.user2_id HAVING COUNT(*) >= 3 ORDER BY f.user1_id, f.user2_id;`,
    ordered: true,
  },
  {
    id: 'd20261102_i2', level: 'intermediate', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Unpopular Books', url: 'https://www.scribd.com/document/744897816/SQL-Leetcode-Questions',
    title: 'ספרים לא פופולריים', tables: ['d1102_books', 'd1102_book_orders'],
    prompt: `נתון שהיום הוא 2026-06-23. החזירו ספרים שנמכרו בפחות מ-10 עותקים (סכום quantity) בשנה האחרונה, כלומר עם dispatch_date אחרי 2025-06-23 ועד 2026-06-23 כולל. ספרים שאינם נמכרו כלל נספרים כ-0 מכירות. התעלמו מספרים שהפכו זמינים (available_from) אחרי 2026-05-23, כלומר זמינים פחות מחודש. העמודות: book_id, name. מיינו לפי book_id.`,
    solution: `SELECT b.book_id, b.name FROM d1102_books b LEFT JOIN d1102_book_orders o ON o.book_id = b.book_id AND o.dispatch_date > '2025-06-23' AND o.dispatch_date <= '2026-06-23' WHERE b.available_from <= '2026-05-23' GROUP BY b.book_id, b.name HAVING COALESCE(SUM(o.quantity), 0) < 10 ORDER BY b.book_id;`,
    ordered: true,
  },
  {
    id: 'd20261102_i3', level: 'intermediate', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Find the Quiet Students in All Exams', url: 'https://www.tutorialspoint.com/practice/find-the-quiet-students-in-all-exams.htm',
    title: 'תלמידים שקטים בכל המבחנים', tables: ['d1102_stu', 'd1102_exams'],
    prompt: `בטבלאות d1102_stu ו-d1102_exams (ציון לכל תלמיד בכל מבחן) תלמיד נקרא שקט אם ניגש לפחות למבחן אחד ובאף מבחן שבו ניגש הציון שלו לא היה הגבוה ביותר ולא הנמוך ביותר במבחן (ציון שווה לגבוה או לנמוך ביותר נחשב גבוה או נמוך). החזירו את התלמידים השקטים. העמודות: student_id, name. מיינו לפי student_id.`,
    solution: `WITH r AS (SELECT student_id, score, MAX(score) OVER (PARTITION BY exam_id) AS hi, MIN(score) OVER (PARTITION BY exam_id) AS lo FROM d1102_exams) SELECT s.student_id, s.name FROM d1102_stu s WHERE s.student_id IN (SELECT student_id FROM r) AND s.student_id NOT IN (SELECT student_id FROM r WHERE score = hi OR score = lo) ORDER BY s.student_id;`,
    ordered: true,
  },
  {
    id: 'd20261102_i4', level: 'intermediate', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Bank Account Summary II', url: 'https://github.com/Ivanbyone/awesome-leetcode-sql',
    title: 'לקוחות בנק עם יתרה גבוהה לפני סגירת חודש', tables: ['d1102_bank_users', 'd1102_bank_tx'],
    prompt: `בטבלה d1102_bank_tx כל תנועה היא הפקדה (סכום חיובי) או משיכה (סכום שלילי) בחשבון. היתרה של חשבון היא סכום התנועות שלו שבוצעו עד 2026-09-30 כולל (תנועות מאוחרות יותר אינן נספרות). החזירו את שמות בעלי החשבונות שהיתרה שלהם גדולה ממש מ-10000, יחד עם היתרה. העמודות: name, balance.`,
    solution: `SELECT u.name, SUM(t.amount) AS balance FROM d1102_bank_users u JOIN d1102_bank_tx t ON t.account = u.account WHERE t.transacted_on <= '2026-09-30' GROUP BY u.account, u.name HAVING SUM(t.amount) > 10000;`,
    ordered: false,
  },
  {
    id: 'd20261102_i5', level: 'intermediate', added: '2026-11-02', source: 'DataLemur', company: 'Airbnb',
    ref: 'Booking Referral Source', url: 'https://datalemur.com/questions/booking-referral-source',
    title: 'ערוץ ההפניה של ההזמנה הראשונה', tables: ['d1102_bk_bookings'],
    prompt: `בטבלה d1102_bk_bookings כל שורה היא הזמנה של משתמש וערוץ ההפניה שדרכו הגיע (channel). ההזמנה הראשונה של משתמש היא זו עם booking_date המוקדם ביותר שלו, ובשוויון תאריכים זו עם booking_id הקטן יותר. לכל ערוץ החזירו כמה משתמשים הגיעו אליו בהזמנה הראשונה שלהם. העמודות: channel, first_bookings. מיינו לפי first_bookings יורד ואז לפי channel בסדר אלפביתי עולה.`,
    solution: `WITH f AS (SELECT user_id, channel, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY booking_date, booking_id) AS rn FROM d1102_bk_bookings) SELECT channel, COUNT(*) AS first_bookings FROM f WHERE rn = 1 GROUP BY channel ORDER BY first_bookings DESC, channel;`,
    ordered: true,
  },
  {
    id: 'd20261102_a1', level: 'advanced', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'Longest Winning Streak', url: 'https://doocs.github.io/leetcode/en/lc/2173/',
    title: 'רצף הניצחונות הארוך ביותר', tables: ['d1102_mtch'],
    prompt: `בטבלה d1102_mtch יש לכל שחקן תוצאות משחקים לפי תאריך (Win, Draw או Lose). רצף ניצחונות הוא סדרת משחקי Win רצופים של אותו שחקן, שלא נקטעה בתיקו או בהפסד. החזירו לכל שחקן את אורך רצף הניצחונות הארוך ביותר שלו (0 אם לא ניצח אף פעם). העמודות: player_id, longest_streak. מיינו לפי player_id.`,
    solution: `WITH x AS (SELECT player_id, result, SUM(CASE WHEN result <> 'Win' THEN 1 ELSE 0 END) OVER (PARTITION BY player_id ORDER BY match_day) AS grp FROM d1102_mtch), y AS (SELECT player_id, grp, SUM(result = 'Win') AS w FROM x GROUP BY player_id, grp) SELECT player_id, MAX(w) AS longest_streak FROM y GROUP BY player_id ORDER BY player_id;`,
    ordered: true,
  },
  {
    id: 'd20261102_a2', level: 'advanced', added: '2026-11-02', source: 'LeetCode', company: '',
    ref: 'League Statistics', url: 'https://jaywin.gitbook.io/leetcode/solutions/1841-league-statistics',
    title: 'טבלת ליגה', tables: ['d1102_teams', 'd1102_league'],
    prompt: `בטבלה d1102_league כל שורה היא משחק עם הקבוצה המארחת והאורחת ומספר השערים של כל אחת. ניצחון שווה 3 נקודות, תיקו נקודה אחת והפסד 0. בנו טבלת ליגה לכל הקבוצות ב-d1102_teams, כולל קבוצה שעוד לא שיחקה (כל הערכים שלה 0). העמודות: team_name, played (מספר משחקים), points, goals_for (שערי זכות), goals_against (שערי חובה), goal_diff (הפרש שערים). מיינו לפי points יורד, אחר כך goal_diff יורד, ואחר כך team_name בסדר אלפביתי עולה.`,
    solution: `WITH m AS (SELECT home_team_id AS t, home_goals AS gf, away_goals AS ga FROM d1102_league UNION ALL SELECT away_team_id, away_goals, home_goals FROM d1102_league) SELECT tm.team_name, COUNT(m.t) AS played, COALESCE(SUM(CASE WHEN m.gf > m.ga THEN 3 WHEN m.gf = m.ga THEN 1 ELSE 0 END), 0) AS points, COALESCE(SUM(m.gf), 0) AS goals_for, COALESCE(SUM(m.ga), 0) AS goals_against, COALESCE(SUM(m.gf - m.ga), 0) AS goal_diff FROM d1102_teams tm LEFT JOIN m ON m.t = tm.team_id GROUP BY tm.team_id, tm.team_name ORDER BY points DESC, goal_diff DESC, tm.team_name;`,
    ordered: true,
  },
  {
    id: 'd20261102_a3', level: 'advanced', added: '2026-11-02', source: 'DataVidhya', company: '',
    ref: 'Referral Chain Attribution', url: 'https://datavidhya.com/coding-problems/questionDetails/question/referral-chain-attribution',
    title: 'עצי הפניות של משתמשים', tables: ['d1102_refs'],
    prompt: `בטבלה d1102_refs לכל משתמש יש referred_by: המשתמש שהפנה אותו (ערך חסר אם הצטרף בלי הפניה, ואז הוא שורש). הפניות יכולות להמשיך בשרשרת: מי שהופנה יכול להפנות אחרים. לכל שורש החזירו את גודל עץ ההפניות שלו, כולל השורש עצמו ואת כל מי שהגיע ממנו בשרשרת, ואת העומק המרבי בעץ (שורש לבדו הוא עומק 0, המופנים ישירות ממנו עומק 1, וכן הלאה). העמודות: root_user_id, tree_size, max_depth. מיינו לפי tree_size יורד ואז לפי root_user_id עולה.`,
    solution: `WITH RECURSIVE t(user_id, root, depth) AS (SELECT user_id, user_id, 0 FROM d1102_refs WHERE referred_by IS NULL UNION ALL SELECT r.user_id, t.root, t.depth + 1 FROM d1102_refs r JOIN t ON r.referred_by = t.user_id) SELECT root AS root_user_id, COUNT(*) AS tree_size, MAX(depth) AS max_depth FROM t GROUP BY root ORDER BY tree_size DESC, root;`,
    ordered: true,
  },
  {
    id: 'd20261102_a4', level: 'advanced', added: '2026-11-02', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משפך המרה לפי סדר כרונולוגי', tables: ['d1102_funnel'],
    prompt: `בטבלה d1102_funnel יש אירועי משתמשים בשלבי משפך: visit, signup, trial, paid, כל אחד עם חותמת זמן ts (משתמש יכול לבצע אירוע יותר מפעם אחת). משתמש נחשב כמי שהגיע לשלב רק אם ביצע את כל השלבים שלפניו וגם הזמן הראשון שבו ביצע כל שלב מאוחר מהזמן הראשון שבו ביצע את השלב הקודם. החזירו לכל שלב, לפי הסדר visit, signup, trial, paid, את מספר המשתמשים שהגיעו אליו (users) ואת האחוז מהשלב הקודם, מעוגל ל-1 ספרה אחרי הנקודה (pct_from_previous). לשלב הראשון האחוז הוא 100.0. העמודות: step, users, pct_from_previous.`,
    solution: `WITH p AS (SELECT user_id, MIN(CASE WHEN event = 'visit' THEN ts END) AS v, MIN(CASE WHEN event = 'signup' THEN ts END) AS s, MIN(CASE WHEN event = 'trial' THEN ts END) AS t, MIN(CASE WHEN event = 'paid' THEN ts END) AS d FROM d1102_funnel GROUP BY user_id), c AS (SELECT SUM(v IS NOT NULL) AS n1, SUM(v IS NOT NULL AND s > v) AS n2, SUM(v IS NOT NULL AND s > v AND t > s) AS n3, SUM(v IS NOT NULL AND s > v AND t > s AND d > t) AS n4 FROM p) SELECT 'visit' AS step, n1 AS users, 100.0 AS pct_from_previous FROM c UNION ALL SELECT 'signup', n2, ROUND(100.0 * n2 / n1, 1) FROM c UNION ALL SELECT 'trial', n3, ROUND(100.0 * n3 / n2, 1) FROM c UNION ALL SELECT 'paid', n4, ROUND(100.0 * n4 / n3, 1) FROM c;`,
    ordered: true,
  },
  {
    id: 'd20261102_a5', level: 'advanced', added: '2026-11-02', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'הכנסות חודשיות: שינוי וממוצע נע', tables: ['d1102_subs_rev'],
    prompt: `בטבלה d1102_subs_rev יש חיובי מנויים עם חודש (month בפורמט YYYY-MM) וסכום, וכל חודש מופיע בה ברצף ללא חודשים חסרים. לכל חודש החזירו את סך ההכנסות שלו (total_revenue), את אחוז השינוי מהחודש הקודם (mom_pct, מעוגל ל-2 ספרות, ערך חסר לחודש הראשון) ואת ממוצע ההכנסות החודשיות בשלושת החודשים האחרונים כולל הנוכחי (avg_3m, מעוגל ל-2 ספרות, ערך חסר בחודשים שיש לפניהם פחות משלושה חודשים בסך הכול). העמודות: month, total_revenue, mom_pct, avg_3m. מיינו לפי month.`,
    solution: `WITH m AS (SELECT month, SUM(amount) AS total FROM d1102_subs_rev GROUP BY month), w AS (SELECT month, total, LAG(total) OVER (ORDER BY month) AS prev, COUNT(*) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS cnt, AVG(total) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS av FROM m) SELECT month, total AS total_revenue, ROUND(100.0 * (total - prev) / prev, 2) AS mom_pct, CASE WHEN cnt = 3 THEN ROUND(av, 2) END AS avg_3m FROM w ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261103_b1', level: 'basic', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חשבוניות ששולמו לפי תוכנית', tables: ['d1103_invoices'],
    prompt: `בטבלה d1103_invoices יש חשבוניות עם תוכנית המנוי (plan), סטטוס (status) וסכום (amount). לכל תוכנית שיש לה לפחות שתי חשבוניות בסטטוס 'paid', החזירו את מספר החשבוניות ששולמו (paid_count) ואת הסכום הממוצע שלהן, מעוגל ל-2 ספרות (avg_amount). העמודות: plan, paid_count, avg_amount. מיינו לפי plan בסדר אלפביתי.`,
    solution: `SELECT plan, COUNT(*) AS paid_count, ROUND(AVG(amount), 2) AS avg_amount FROM d1103_invoices WHERE status = 'paid' GROUP BY plan HAVING COUNT(*) >= 2 ORDER BY plan;`,
    ordered: true,
  },
  {
    id: 'd20261103_b2', level: 'basic', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שחקנים ברמה 10 ומעלה עם מדינה חסרה', tables: ['d1103_players'],
    prompt: `בטבלה d1103_players יש שחקנים עם שם (name), מדינה (country, לפעמים חסרה) ורמה (level). החזירו את כל השחקנים ברמה 10 ומעלה: שם השחקן והמדינה שלו, כאשר לשחקן ללא מדינה תוצג המילה 'Unknown'. העמודות: name, country_label. מיינו לפי level מהגבוה לנמוך, ובשוויון לפי name בסדר אלפביתי.`,
    solution: `SELECT name, COALESCE(country, 'Unknown') AS country_label FROM d1103_players WHERE level >= 10 ORDER BY level DESC, name;`,
    ordered: true,
  },
  {
    id: 'd20261103_b3', level: 'basic', added: '2026-11-03', source: 'DataLemur', company: 'Microsoft',
    ref: 'Teams Power Users', url: 'https://datalemur.com/questions?company=Microsoft',
    title: 'שני המשתמשים ששלחו הכי הרבה הודעות באוגוסט', tables: ['d1103_messages'],
    prompt: `בטבלה d1103_messages יש הודעות עם מזהה השולח (sender_id), מזהה הנמען (receiver_id) ומועד השליחה (sent_at). החזירו את שני המשתמשים ששלחו הכי הרבה הודעות בחודש אוגוסט 2026 (כולל כל היום האחרון של החודש), עם מספר ההודעות שלהם. העמודות: sender_id, message_count. מיינו לפי message_count מהגבוה לנמוך. אין שוויון בין שני המקומות הראשונים.`,
    solution: `SELECT sender_id, COUNT(*) AS message_count FROM d1103_messages WHERE sent_at >= '2026-08-01' AND sent_at < '2026-09-01' GROUP BY sender_id ORDER BY message_count DESC LIMIT 2;`,
    ordered: true,
  },
  {
    id: 'd20261103_b4', level: 'basic', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'ביקורים ללא ביטוח לפי מחלקה', tables: ['d1103_visits'],
    prompt: `בטבלה d1103_visits יש ביקורי מטופלים עם מחלקה (dept), עלות (fee) ומזהה ביטוח (insurance_id), שחסר כאשר למטופל אין ביטוח. לכל מחלקה שסך העלויות שלה הוא לפחות 400, החזירו את מספר הביקורים (visits), את מספר הביקורים ללא ביטוח (uninsured) ואת סך העלויות (total_fee). העמודות: dept, visits, uninsured, total_fee. מיינו לפי total_fee מהגבוה לנמוך.`,
    solution: `SELECT dept, COUNT(*) AS visits, SUM(CASE WHEN insurance_id IS NULL THEN 1 ELSE 0 END) AS uninsured, SUM(fee) AS total_fee FROM d1103_visits GROUP BY dept HAVING SUM(fee) >= 400 ORDER BY total_fee DESC;`,
    ordered: true,
  },
  {
    id: 'd20261103_b5', level: 'basic', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שלוש הקמפיינים עם אחוז הקליקים הגבוה ביותר', tables: ['d1103_ads'],
    prompt: `בטבלה d1103_ads יש מודעות עם קמפיין (campaign), מספר חשיפות (impressions) ומספר קליקים (clicks). לכל קמפיין שסך החשיפות שלו גדול מ-0, חשבו את אחוז הקליקים: סך הקליקים חלקי סך החשיפות כפול 100, מעוגל ל-2 ספרות (ctr_pct). החזירו את שלושת הקמפיינים עם האחוז הגבוה ביותר. העמודות: campaign, ctr_pct. מיינו לפי ctr_pct מהגבוה לנמוך.`,
    solution: `SELECT campaign, ROUND(100.0 * SUM(clicks) / SUM(impressions), 2) AS ctr_pct FROM d1103_ads GROUP BY campaign HAVING SUM(impressions) > 0 ORDER BY ctr_pct DESC LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261103_i1', level: 'intermediate', added: '2026-11-03', source: 'TryExponent', company: 'Walmart',
    ref: 'Walmart Inventory Status', url: 'https://www.tryexponent.com/courses/data-science/sql-interviews/walmart-inventory-status',
    title: 'סטטוס מכירה לכל מוצר', tables: ['d1103_products', 'd1103_sales'],
    prompt: `בטבלה d1103_products יש מוצרים, ובטבלה d1103_sales יש מכירות (כל שורה היא מכירה של מוצר אחד, ולמוצר יכולות להיות כמה מכירות). החזירו את כל המוצרים, כל מוצר פעם אחת בדיוק, עם סטטוס: 'Sold' אם נמכר לפחות פעם אחת ו-'Not Sold' אם מעולם לא נמכר. העמודות: product_id, product_name, sale_status.`,
    solution: `SELECT p.product_id, p.product_name, CASE WHEN EXISTS (SELECT 1 FROM d1103_sales s WHERE s.product_id = p.product_id) THEN 'Sold' ELSE 'Not Sold' END AS sale_status FROM d1103_products p;`,
    ordered: false,
  },
  {
    id: 'd20261103_i2', level: 'intermediate', added: '2026-11-03', source: 'DataLemur', company: 'Robinhood',
    ref: 'Cities With Completed Trades', url: 'https://datalemur.com/questions/sql-join-practice-exercise-robinhood',
    title: 'שלוש הערים עם הכי הרבה עסקאות שהושלמו', tables: ['d1103_users', 'd1103_trades'],
    prompt: `בטבלה d1103_users יש משתמשים עם עיר (city), ובטבלה d1103_trades יש פקודות מסחר עם סטטוס (status) ומזהה המשתמש. ספרו לכל עיר רק פקודות בסטטוס 'completed', והחזירו את שלוש הערים עם המספר הגבוה ביותר. העמודות: city, completed_orders. מיינו לפי completed_orders מהגבוה לנמוך.`,
    solution: `SELECT u.city, COUNT(*) AS completed_orders FROM d1103_trades t JOIN d1103_users u ON u.user_id = t.user_id WHERE t.status = 'completed' GROUP BY u.city ORDER BY completed_orders DESC LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261103_i3', level: 'intermediate', added: '2026-11-03', source: 'Dataford', company: 'Walmart',
    ref: 'Write a SQL query to analyze store performance at Walmart by joining sales, inventory and staffing tables and identify locations with declining sales and low inventory', url: 'https://dataford.io/questions/write-a-sql-query-to-analyze-store-performance-at-walmart-by-joining-sales-inventory-and-staffing-tables-and-identify-locations-with-declining-sales-and-low-inventory',
    title: 'חנויות עם ירידה במכירות ומלאי נמוך', tables: ['d1103_stores', 'd1103_store_rev', 'd1103_stock'],
    prompt: `בטבלה d1103_stores יש חנויות, בטבלה d1103_store_rev יש הכנסה חודשית לכל חנות (month בפורמט YYYY-MM), ובטבלה d1103_stock יש יחידות מלאי לפי מק"ט לכל חנות. החזירו את החנויות שההכנסה שלהן ביוני 2026 הייתה נמוכה מההכנסה שלהן במאי 2026 וגם סך יחידות המלאי שלהן (על פני כל המק"טים) קטן מ-100. העמודות: store_name, may_revenue, june_revenue, total_units. מיינו לפי store_name.`,
    solution: `SELECT s.store_name, m.revenue AS may_revenue, j.revenue AS june_revenue, st.total_units FROM d1103_stores s JOIN d1103_store_rev m ON m.store_id = s.store_id AND m.month = '2026-05' JOIN d1103_store_rev j ON j.store_id = s.store_id AND j.month = '2026-06' JOIN (SELECT store_id, SUM(units) AS total_units FROM d1103_stock GROUP BY store_id) st ON st.store_id = s.store_id WHERE j.revenue < m.revenue AND st.total_units < 100 ORDER BY s.store_name;`,
    ordered: true,
  },
  {
    id: 'd20261103_i4', level: 'intermediate', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מנהלים שכפיפיהם מרוויחים בממוצע יותר מהם', tables: ['d1103_staff'],
    prompt: `בטבלה d1103_staff יש עובדים עם מזהה (staff_id), שם (name), מזהה המנהל הישיר (manager_id, חסר למי שאין לו מנהל) ושכר (salary). החזירו את המנהלים שהשכר הממוצע של הכפיפים הישירים שלהם גבוה משכרם שלהם: שם המנהל, מספר הכפיפים הישירים (reports) והשכר הממוצע שלהם מעוגל ל-2 ספרות (avg_report_salary). העמודות: name, reports, avg_report_salary. מיינו לפי name.`,
    solution: `SELECT m.name, COUNT(*) AS reports, ROUND(AVG(e.salary), 2) AS avg_report_salary FROM d1103_staff m JOIN d1103_staff e ON e.manager_id = m.staff_id GROUP BY m.staff_id, m.name, m.salary HAVING AVG(e.salary) > m.salary ORDER BY m.name;`,
    ordered: true,
  },
  {
    id: 'd20261103_i5', level: 'intermediate', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות שקנו בספטמבר ולא באוקטובר', tables: ['d1103_purchases'],
    prompt: `בטבלה d1103_purchases יש רכישות עם שם לקוח (customer), תאריך (purchase_date) וסכום. החזירו את הלקוחות שביצעו לפחות רכישה אחת בספטמבר 2026 ולא ביצעו אף רכישה באוקטובר 2026. כל לקוח יופיע פעם אחת. העמודה: customer. מיינו לפי customer.`,
    solution: `SELECT DISTINCT customer FROM d1103_purchases WHERE purchase_date >= '2026-09-01' AND purchase_date < '2026-10-01' AND customer NOT IN (SELECT customer FROM d1103_purchases WHERE purchase_date >= '2026-10-01' AND purchase_date < '2026-11-01') ORDER BY customer;`,
    ordered: true,
  },
  {
    id: 'd20261103_a1', level: 'advanced', added: '2026-11-03', source: 'DataLemur', company: 'Zomato',
    ref: 'Swapped Food Delivery', url: 'https://datalemur.com/questions/sql-swapped-food-delivery',
    title: 'תיקון הזמנות שהפריטים בהן הוחלפו בזוגות', tables: ['d1103_deliv'],
    prompt: `בטבלה d1103_deliv יש הזמנות עם מספר סידורי רציף (order_id, מ-1 ללא חוסרים) ופריט (item). בגלל תקלה, הפריטים הוחלפו בין כל זוג הזמנות סמוכות: הזמנה 1 קיבלה את הפריט של הזמנה 2 ולהפך, הזמנה 3 עם הזמנה 4, וכן הלאה. אם מספר ההזמנות אי-זוגי, ההזמנה האחרונה נשארה במקומה. החזירו לכל הזמנה את הפריט הנכון שלה. העמודות: order_id, corrected_item. מיינו לפי order_id.`,
    solution: `SELECT order_id, CASE WHEN order_id % 2 = 1 THEN COALESCE(LEAD(item) OVER (ORDER BY order_id), item) ELSE LAG(item) OVER (ORDER BY order_id) END AS corrected_item FROM d1103_deliv ORDER BY order_id;`,
    ordered: true,
  },
  {
    id: 'd20261103_a2', level: 'advanced', added: '2026-11-03', source: 'DataLemur', company: 'Amazon',
    ref: 'Total Utilization Time', url: 'https://datalemur.com/questions/total-utilization-time',
    title: 'זמן הפעלה כולל של השרתים בימים שלמים', tables: ['d1103_server_log'],
    prompt: `בטבלה d1103_server_log יש אירועי הפעלה (session_status = 'start') וכיבוי (session_status = 'stop') של שרתים, עם מזהה שרת (server_id) וזמן האירוע (status_time). לכל שרת האירועים מתחלפים לפי הזמן, וכל הפעלה נמשכת מ-start ועד ה-stop הבא של אותו שרת. הפעלה שלא נסגרה ב-stop אינה נספרת. החזירו עמודה אחת בשם total_days: סך זמן ההפעלה של כל השרתים יחד, בימים שלמים (עיגול כלפי מטה).`,
    solution: `WITH x AS (SELECT session_status, strftime('%s', status_time) AS s, LEAD(strftime('%s', status_time)) OVER (PARTITION BY server_id ORDER BY status_time) AS e, LEAD(session_status) OVER (PARTITION BY server_id ORDER BY status_time) AS next_status FROM d1103_server_log) SELECT CAST(SUM(e - s) / 86400 AS INTEGER) AS total_days FROM x WHERE session_status = 'start' AND next_status = 'stop';`,
    ordered: false,
  },
  {
    id: 'd20261103_a3', level: 'advanced', added: '2026-11-03', source: 'Data Engineer Academy', company: 'Walmart',
    ref: 'Walmart advanced SQL question (rank products by sales within each category, keep the top three)', url: 'https://dataengineeracademy.com/blog/walmart-advance-sql-question/',
    title: 'שלושת הדרגים העליונים של הכנסות בכל קטגוריה', tables: ['d1103_catalog'],
    prompt: `בטבלה d1103_catalog יש מוצרים עם קטגוריה (category) והכנסה (revenue). בתוך כל קטגוריה מדרגים את המוצרים לפי הכנסה מהגבוהה לנמוכה: מוצרים עם הכנסה זהה חולקים את אותו דירוג, והדירוג הבא אינו מדלג (1, 1, 2, 3...). החזירו את כל המוצרים שדירוגם בקטגוריה שלהם הוא 3 או טוב יותר, יחד עם הדירוג. העמודות: category, product, revenue, rnk. מיינו לפי category, אחר כך revenue מהגבוה לנמוך, ואז product.`,
    solution: `SELECT category, product, revenue, rnk FROM (SELECT category, product, revenue, DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS rnk FROM d1103_catalog) WHERE rnk <= 3 ORDER BY category, revenue DESC, product;`,
    ordered: true,
  },
  {
    id: 'd20261103_a4', level: 'advanced', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'שימור חודשי לפי קבוצת חודש הצטרפות', tables: ['d1103_app_activity'],
    prompt: `בטבלה d1103_app_activity יש ימי פעילות של משתמשים באפליקציה (user_id, active_date), ולמשתמש יכולות להיות כמה שורות באותו יום או באותו חודש. חודש ההצטרפות של משתמש הוא החודש (YYYY-MM) של יום הפעילות הראשון שלו. לכל חודש הצטרפות החזירו את מספר המשתמשים בו (cohort_size), כמה מהם היו פעילים לפחות ביום אחד בחודש הקלנדרי שמיד אחריו (retained_users), ואחוז השימור מעוגל ל-2 ספרות (retention_pct). העמודות: cohort_month, cohort_size, retained_users, retention_pct. מיינו לפי cohort_month.`,
    solution: `WITH f AS (SELECT user_id, strftime('%Y-%m', MIN(active_date)) AS cohort_month FROM d1103_app_activity GROUP BY user_id) SELECT f.cohort_month, COUNT(*) AS cohort_size, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1103_app_activity a WHERE a.user_id = f.user_id AND strftime('%Y-%m', a.active_date) = strftime('%Y-%m', f.cohort_month || '-01', '+1 month')) THEN 1 ELSE 0 END) AS retained_users, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1103_app_activity a WHERE a.user_id = f.user_id AND strftime('%Y-%m', a.active_date) = strftime('%Y-%m', f.cohort_month || '-01', '+1 month')) THEN 1 ELSE 0 END) / COUNT(*), 2) AS retention_pct FROM f GROUP BY f.cohort_month ORDER BY f.cohort_month;`,
    ordered: true,
  },
  {
    id: 'd20261103_a5', level: 'advanced', added: '2026-11-03', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סשנים לפי הפסקה של יותר מ-30 דקות', tables: ['d1103_clicks'],
    prompt: `בטבלה d1103_clicks יש קליקים של משתמשים (user_id, clicked_at) ולעיתים יש שני קליקים באותו רגע בדיוק. סשן חדש של משתמש מתחיל כאשר עברו יותר מ-30 דקות מהקליק הקודם שלו (הפרש של בדיוק 30 דקות עדיין נחשב לאותו סשן). משך סשן הוא ההפרש בדקות שלמות בין הקליק הראשון לאחרון בו. לכל משתמש החזירו את מספר הסשנים (sessions) ואת משך הסשן הארוך ביותר (longest_session_min). העמודות: user_id, sessions, longest_session_min. מיינו לפי user_id.`,
    solution: `WITH g AS (SELECT user_id, CAST(strftime('%s', clicked_at) AS INTEGER) AS t, CASE WHEN CAST(strftime('%s', clicked_at) AS INTEGER) - LAG(CAST(strftime('%s', clicked_at) AS INTEGER)) OVER (PARTITION BY user_id ORDER BY clicked_at) > 1800 THEN 1 ELSE 0 END AS is_new FROM d1103_clicks), s AS (SELECT user_id, t, SUM(is_new) OVER (PARTITION BY user_id ORDER BY t ROWS UNBOUNDED PRECEDING) AS sid FROM g), d AS (SELECT user_id, sid, (MAX(t) - MIN(t)) / 60 AS mins FROM s GROUP BY user_id, sid) SELECT user_id, COUNT(*) AS sessions, MAX(mins) AS longest_session_min FROM d GROUP BY user_id ORDER BY user_id;`,
    ordered: true,
  },
  // ===== 2026-11-04 =====
  {
    id: 'd20261104_b1', level: 'basic', added: '2026-11-04', source: 'HackerRank', company: '',
    ref: 'Type of Triangle', url: 'https://github.com/KursadKalender/HackerRank-SQL-Challenges-Solutions-',
    title: 'סיווג משולשים לפי אורכי צלעות', tables: ['d1104_shapes'],
    prompt: `בטבלה d1104_shapes יש לכל שורה שלושה אורכי צלעות (a, b, c). סווגו כל שורה לאחת מארבע תוויות: 'Not A Triangle' אם הצלעות אינן יכולות ליצור משולש (סכום שתי צלעות כלשהן קטן או שווה לצלע השלישית), אחרת 'Equilateral' אם שלוש הצלעות שוות, 'Isosceles' אם בדיוק שתי צלעות שוות, ו-'Scalene' אם כל הצלעות שונות. העמודות: id, type. מיינו לפי id.`,
    solution: `SELECT id, CASE WHEN a + b <= c OR a + c <= b OR b + c <= a THEN 'Not A Triangle' WHEN a = b AND b = c THEN 'Equilateral' WHEN a = b OR a = c OR b = c THEN 'Isosceles' ELSE 'Scalene' END AS type FROM d1104_shapes ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261104_b2', level: 'basic', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Daily Leads and Partners', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'לידים ושותפים ייחודיים לכל יום ויצרן', tables: ['d1104_deals'],
    prompt: `בטבלה d1104_deals יש עסקאות מכירת רכבים: תאריך (date_id), שם יצרן (make_name), מזהה ליד (lead_id) ומזהה שותף (partner_id). לכל צירוף של תאריך ויצרן החזירו כמה לידים שונים (unique_leads) וכמה שותפים שונים (unique_partners) היו. העמודות: date_id, make_name, unique_leads, unique_partners. מיינו לפי date_id ואז לפי make_name.`,
    solution: `SELECT date_id, make_name, COUNT(DISTINCT lead_id) AS unique_leads, COUNT(DISTINCT partner_id) AS unique_partners FROM d1104_deals GROUP BY date_id, make_name ORDER BY date_id, make_name;`,
    ordered: true,
  },
  {
    id: 'd20261104_b3', level: 'basic', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Find Total Time Spent by Each Employee', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'סך הדקות של כל עובד בכל יום', tables: ['d1104_shifts'],
    prompt: `בטבלה d1104_shifts כל שורה היא כניסה ויציאה של עובד במהלך יום (event_day), כאשר in_time ו-out_time הם דקות מתחילת היום. עובד יכול להיכנס ולצאת כמה פעמים באותו יום. לכל עובד ולכל יום החזירו את סך הדקות שהוא שהה במקום. העמודות: event_day, emp_id, total_time. מיינו לפי event_day ואז לפי emp_id.`,
    solution: `SELECT event_day, emp_id, SUM(out_time - in_time) AS total_time FROM d1104_shifts GROUP BY event_day, emp_id ORDER BY event_day, emp_id;`,
    ordered: true,
  },
  {
    id: 'd20261104_b4', level: 'basic', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Apples & Oranges', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'הפרש מכירות תפוחים ותפוזים ביום', tables: ['d1104_fruit_sales'],
    prompt: `בטבלה d1104_fruit_sales יש לכל יום (sale_date) שורה אחת עבור 'apples' ושורה אחת עבור 'oranges', עם הכמות שנמכרה (sold_num). לכל יום החזירו את ההפרש בין כמות התפוחים שנמכרה לכמות התפוזים (תפוחים פחות תפוזים). העמודות: sale_date, diff. מיינו לפי sale_date.`,
    solution: `SELECT sale_date, SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff FROM d1104_fruit_sales GROUP BY sale_date ORDER BY sale_date;`,
    ordered: true,
  },
  {
    id: 'd20261104_b5', level: 'basic', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Article Views II', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'צופים שקראו כמה מאמרים באותו יום', tables: ['d1104_article_views'],
    prompt: `בטבלה d1104_article_views כל שורה היא צפייה של viewer_id במאמר article_id בתאריך view_date (ייתכנו צפיות חוזרות באותו מאמר). החזירו את מזהי הצופים שצפו, ביום אחד לפחות, בשני מאמרים שונים או יותר באותו היום. כל מזהה יופיע פעם אחת. העמודה: id. מיינו בסדר עולה.`,
    solution: `SELECT DISTINCT viewer_id AS id FROM d1104_article_views GROUP BY viewer_id, view_date HAVING COUNT(DISTINCT article_id) > 1 ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261104_i1', level: 'intermediate', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Find the Team Size', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'גודל הצוות של כל עובד', tables: ['d1104_team'],
    prompt: `בטבלה d1104_team כל עובד (emp_id) משויך לצוות אחד (team_id). לכל עובד החזירו את מספר העובדים בצוות שלו, כולל אותו עצמו. העמודות: emp_id, team_size. מיינו לפי emp_id.`,
    solution: `SELECT t.emp_id, (SELECT COUNT(*) FROM d1104_team x WHERE x.team_id = t.team_id) AS team_size FROM d1104_team t ORDER BY t.emp_id;`,
    ordered: true,
  },
  {
    id: 'd20261104_i2', level: 'intermediate', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Students With Invalid Departments', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'סטודנטים עם מחלקה שנמחקה', tables: ['d1104_students', 'd1104_depts'],
    prompt: `בטבלה d1104_students יש סטודנטים עם dept_id, ובטבלה d1104_depts יש את המחלקות הקיימות. החזירו את הסטודנטים שמצוין להם dept_id אך אין מחלקה כזו בטבלת המחלקות. סטודנטים שאין להם dept_id בכלל (NULL) לא נכללים. העמודות: id, name. מיינו לפי id.`,
    solution: `SELECT s.id, s.name FROM d1104_students s LEFT JOIN d1104_depts d ON d.id = s.dept_id WHERE s.dept_id IS NOT NULL AND d.id IS NULL ORDER BY s.id;`,
    ordered: true,
  },
  {
    id: 'd20261104_i3', level: 'intermediate', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Orders With Maximum Quantity Above Average', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'הזמנות שהכמות המקסימלית בהן חורגת מכל הממוצעים', tables: ['d1104_order_lines'],
    prompt: `בטבלה d1104_order_lines כל שורה היא פריט בהזמנה (order_id, product_id, quantity). לכל הזמנה מגדירים את הכמות הממוצעת לפריט ואת הכמות המקסימלית לפריט. החזירו את ההזמנות שהכמות המקסימלית שלהן גדולה ממש מהכמות הממוצעת הגבוהה ביותר מבין כל ההזמנות. העמודה: order_id. מיינו בסדר עולה.`,
    solution: `SELECT order_id FROM d1104_order_lines GROUP BY order_id HAVING MAX(quantity) > (SELECT MAX(a) FROM (SELECT AVG(quantity) AS a FROM d1104_order_lines GROUP BY order_id)) ORDER BY order_id;`,
    ordered: true,
  },
  {
    id: 'd20261104_i4', level: 'intermediate', added: '2026-11-04', source: 'GitHub', company: '',
    ref: 'Advancing Counting (SQL practice problems by Zachary Thomas)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'ספירת משתמשים לפי סיווג סופי', tables: ['d1104_user_classes'],
    prompt: `בטבלה d1104_user_classes כל שורה מציינת שמשתמש (user_name) משויך למחלקה 'a' או 'b'; משתמש יכול להופיע כמה פעמים, גם באותה מחלקה. הסיווג הסופי של משתמש הוא 'b' אם הוא משויך ל-'b' (גם אם הוא משויך גם ל-'a'), ואחרת 'a'. החזירו כמה משתמשים שונים יש בכל סיווג סופי. העמודות: class, users. מיינו לפי class.`,
    solution: `SELECT class, COUNT(*) AS users FROM (SELECT user_name, CASE WHEN SUM(class = 'b') > 0 THEN 'b' ELSE 'a' END AS class FROM d1104_user_classes GROUP BY user_name) GROUP BY class ORDER BY class;`,
    ordered: true,
  },
  {
    id: 'd20261104_i5', level: 'intermediate', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Tasks Count in the Weekend', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'משימות שהוגשו בסוף שבוע מול ימי עבודה', tables: ['d1104_tasks'],
    prompt: `בטבלה d1104_tasks יש משימות עם תאריך הגשה (submit_date). סוף שבוע הוא שבת וראשון; שאר הימים הם ימי עבודה. התייחסו רק למשימות שהוגשו בין 2026-10-01 ל-2026-10-31 כולל. החזירו שורה אחת עם מספר המשימות שהוגשו בסוף שבוע (weekend_cnt) ומספר המשימות שהוגשו בימי עבודה (working_cnt).`,
    solution: `SELECT SUM(CASE WHEN strftime('%w', submit_date) IN ('0','6') THEN 1 ELSE 0 END) AS weekend_cnt, SUM(CASE WHEN strftime('%w', submit_date) IN ('0','6') THEN 0 ELSE 1 END) AS working_cnt FROM d1104_tasks WHERE submit_date BETWEEN '2026-10-01' AND '2026-10-31';`,
    ordered: false,
  },
  {
    id: 'd20261104_a1', level: 'advanced', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Group Employees of the Same Salary', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'חלוקה לצוותים לפי שכר זהה', tables: ['d1104_emps'],
    prompt: `בטבלה d1104_emps יש עובדים עם שכר (salary). מחלקים עובדים לצוותים: כל העובדים עם אותו שכר באותו צוות, ורק שכרים שיש בהם לפחות שני עובדים יוצרים צוות (עובד שהשכר שלו ייחודי לא נכלל). מספר הצוות (team_id) נקבע לפי סדר השכר מהנמוך לגבוה, החל מ-1 וללא דילוגים. העמודות: emp_id, name, salary, team_id. מיינו לפי team_id ואז לפי emp_id.`,
    solution: `SELECT emp_id, name, salary, DENSE_RANK() OVER (ORDER BY salary) AS team_id FROM d1104_emps WHERE salary IN (SELECT salary FROM d1104_emps GROUP BY salary HAVING COUNT(*) >= 2) ORDER BY team_id, emp_id;`,
    ordered: true,
  },
  {
    id: 'd20261104_a2', level: 'advanced', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Compute the Rank as a Percentage', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'דירוג באחוזים בתוך מחלקה', tables: ['d1104_scores'],
    prompt: `בטבלה d1104_scores יש ציונים (mark) של סטודנטים לפי מחלקה (department_id). בכל מחלקה מדרגים סטודנטים מהציון הגבוה לנמוך, כאשר סטודנטים עם ציון זהה מקבלים אותו דירוג והדירוג הבא מדלג (למשל 1, 1, 3). האחוז של סטודנט הוא (דירוג פחות 1) כפול 100 לחלק (מספר הסטודנטים במחלקה פחות 1), מעוגל ל-2 ספרות אחרי הנקודה; במחלקה עם סטודנט אחד האחוז הוא 0. העמודות: student_id, department_id, percentage.`,
    solution: `SELECT student_id, department_id, CASE WHEN COUNT(*) OVER (PARTITION BY department_id) = 1 THEN 0 ELSE ROUND((RANK() OVER (PARTITION BY department_id ORDER BY mark DESC) - 1) * 100.0 / (COUNT(*) OVER (PARTITION BY department_id) - 1), 2) END AS percentage FROM d1104_scores;`,
    ordered: false,
  },
  {
    id: 'd20261104_a3', level: 'advanced', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Change Null Values in a Table to the Previous Value', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'מילוי ערכים חסרים בערך האחרון הידוע', tables: ['d1104_drinks'],
    prompt: `בטבלה d1104_drinks יש הזמנות משקאות לפי id עולה, ובחלקן המשקאות (drink) חסר (NULL). החליפו כל ערך חסר במשקאות האחרון שאינו חסר ומופיע לפניו לפי סדר ה-id. אם אין ערך כזה, יישאר NULL. העמודות: id, drink. מיינו לפי id.`,
    solution: `WITH g AS (SELECT id, drink, COUNT(drink) OVER (ORDER BY id) AS grp FROM d1104_drinks) SELECT id, MAX(drink) OVER (PARTITION BY grp) AS drink FROM g ORDER BY id;`,
    ordered: true,
  },
  {
    id: 'd20261104_a4', level: 'advanced', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Products With Three or More Orders in Two Consecutive Years', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'מוצרים עם 3 הזמנות ויותר בשתי שנים רצופות', tables: ['d1104_product_orders'],
    prompt: `בטבלה d1104_product_orders כל שורה היא הזמנה של מוצר (product_id) בתאריך purchase_date. החזירו את המוצרים שקיימות עבורם שתי שנים קלנדריות עוקבות, כך שבכל אחת מהן היו לפחות 3 הזמנות של המוצר. כל מוצר יופיע פעם אחת. העמודה: product_id. מיינו בסדר עולה.`,
    solution: `WITH c AS (SELECT product_id, CAST(strftime('%Y', purchase_date) AS INTEGER) AS y FROM d1104_product_orders GROUP BY product_id, y HAVING COUNT(*) >= 3) SELECT DISTINCT a.product_id FROM c a JOIN c b ON a.product_id = b.product_id AND b.y = a.y + 1 ORDER BY a.product_id;`,
    ordered: true,
  },
  {
    id: 'd20261104_a5', level: 'advanced', added: '2026-11-04', source: 'LeetCode', company: '',
    ref: 'Monthly Transactions II', url: 'https://github.com/Anacoder1/Leetcode_Database_Problems',
    title: 'עסקאות מאושרות וביטולי חיוב לפי חודש ומדינה', tables: ['d1104_txn', 'd1104_chargebacks'],
    prompt: `בטבלה d1104_txn יש עסקאות (id, country, state, amount, trans_date) ובטבלה d1104_chargebacks יש ביטולי חיוב (trans_id של עסקה קיימת, ותאריך הביטול trans_date). לכל צירוף של חודש (בפורמט YYYY-MM) ומדינה שיש בו עסקה מאושרת (state = 'approved') לפי תאריך העסקה, או ביטול חיוב לפי תאריך הביטול, החזירו: מספר העסקאות המאושרות וסכומן, ומספר ביטולי החיוב וסכום העסקאות שבוטלו. ערך שאין עבורו נתונים הוא 0. העמודות: month, country, approved_count, approved_amount, chargeback_count, chargeback_amount. מיינו לפי month ואז לפי country.`,
    solution: `WITH a AS (SELECT strftime('%Y-%m', trans_date) AS m, country, COUNT(*) AS ac, SUM(amount) AS aa FROM d1104_txn WHERE state = 'approved' GROUP BY 1, 2), c AS (SELECT strftime('%Y-%m', cb.trans_date) AS m, t.country, COUNT(*) AS cc, SUM(t.amount) AS ca FROM d1104_chargebacks cb JOIN d1104_txn t ON t.id = cb.trans_id GROUP BY 1, 2), k AS (SELECT m, country FROM a UNION SELECT m, country FROM c) SELECT k.m AS month, k.country, COALESCE(a.ac, 0) AS approved_count, COALESCE(a.aa, 0) AS approved_amount, COALESCE(c.cc, 0) AS chargeback_count, COALESCE(c.ca, 0) AS chargeback_amount FROM k LEFT JOIN a ON a.m = k.m AND a.country = k.country LEFT JOIN c ON c.m = k.m AND c.country = k.country ORDER BY k.m, k.country;`,
    ordered: true,
  },
  {
    id: 'd20261105_b1', level: 'basic', added: '2026-11-05', source: 'LeetCode', company: '',
    ref: 'Reformat Department Table', url: 'https://leetcode.doocs.org/en/lc/1179/',
    title: 'הכנסות מחלקה בעמודה לכל חודש', tables: ['d1105_dept_rev'],
    prompt: `בטבלה d1105_dept_rev יש הכנסה (revenue) של מחלקה (id) בחודש (month, בקיצור באנגלית כמו 'Jan'). לכל מחלקה שיש לה נתון באחד מהחודשים Jan עד Apr, החזירו שורה אחת עם ההכנסה בכל אחד מארבעת החודשים האלה בעמודה נפרדת. חודש ללא נתון יוצג כ-NULL, וחודשים אחרים מתעלמים מהם. העמודות: id, jan, feb, mar, apr.`,
    solution: `SELECT id, SUM(CASE WHEN month = 'Jan' THEN revenue END) AS jan, SUM(CASE WHEN month = 'Feb' THEN revenue END) AS feb, SUM(CASE WHEN month = 'Mar' THEN revenue END) AS mar, SUM(CASE WHEN month = 'Apr' THEN revenue END) AS apr FROM d1105_dept_rev WHERE month IN ('Jan','Feb','Mar','Apr') GROUP BY id;`,
    ordered: false,
  },
  {
    id: 'd20261105_b2', level: 'basic', added: '2026-11-05', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סיכום משמרות וטיפים לפי עיר', tables: ['d1105_shifts'],
    prompt: `בטבלה d1105_shifts יש משמרות של עובדים בערים (city), עם מספר שעות (hours) וטיפ (tip) שחסר (NULL) כשלא נרשם טיפ. לכל עיר שיש בה לפחות 3 משמרות, החזירו את מספר המשמרות, סך השעות, וממוצע הטיפ מתוך המשמרות שנרשם בהן טיפ, מעוגל ל-2 ספרות אחרי הנקודה. העמודות: city, shifts, total_hours, avg_tip. מיינו לפי סך השעות מהגבוה לנמוך ואז לפי city.`,
    solution: `SELECT city, COUNT(*) AS shifts, SUM(hours) AS total_hours, ROUND(AVG(tip), 2) AS avg_tip FROM d1105_shifts GROUP BY city HAVING COUNT(*) >= 3 ORDER BY total_hours DESC, city;`,
    ordered: true,
  },
  {
    id: 'd20261105_b3', level: 'basic', added: '2026-11-05', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'מטופלים שמתחילים ב-D בטיפולים בינוניים', tables: ['d1105_visits'],
    prompt: `בטבלה d1105_visits יש ביקורי מטופלים במרפאה (patient, dept, visit_date, cost). החזירו את שמות המטופלים (כל שם פעם אחת) שמתחיל באות D ושיש להם לפחות ביקור אחד בשנת 2026 במחלקת Cardiology או Neurology בעלות של 200 עד 500 כולל. העמודה: patient. מיינו לפי שם בסדר אלפביתי.`,
    solution: `SELECT DISTINCT patient FROM d1105_visits WHERE patient LIKE 'D%' AND dept IN ('Cardiology','Neurology') AND visit_date >= '2026-01-01' AND visit_date < '2027-01-01' AND cost BETWEEN 200 AND 500 ORDER BY patient;`,
    ordered: true,
  },
  {
    id: 'd20261105_b4', level: 'basic', added: '2026-11-05', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חלוקת תוצאות לרמות ניקוד', tables: ['d1105_matches'],
    prompt: `בטבלה d1105_matches יש ניקוד (score) של משחקים, ובחלק מהם הניקוד חסר (NULL). סווגו כל משחק לרמה: 'high' אם הניקוד 800 ומעלה, 'medium' אם הוא בין 400 ל-799, 'low' אם הוא מתחת ל-400, ו-'unknown' אם הניקוד חסר. החזירו לכל רמה את מספר המשחקים בה. העמודות: tier, games.`,
    solution: `SELECT CASE WHEN score IS NULL THEN 'unknown' WHEN score >= 800 THEN 'high' WHEN score >= 400 THEN 'medium' ELSE 'low' END AS tier, COUNT(*) AS games FROM d1105_matches GROUP BY tier;`,
    ordered: false,
  },
  {
    id: 'd20261105_b5', level: 'basic', added: '2026-11-05', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'אירועים עם תפוסה נמוכה', tables: ['d1105_events'],
    prompt: `בטבלה d1105_events יש אירועים עם מספר כרטיסים שנמכרו (sold), קיבולת (capacity) ומחיר כרטיס (ticket_price). החזירו את האירועים שהתפוסה שלהם (אחוז הכרטיסים שנמכרו מהקיבולת) נמוכה מ-70% בהחלט. העמודות: name, occupancy_pct (התפוסה באחוזים, מעוגלת לספרה אחת אחרי הנקודה), revenue (מספר הכרטיסים כפול המחיר). מיינו לפי התפוסה מהנמוכה לגבוהה ואז לפי name.`,
    solution: `SELECT name, ROUND(sold * 100.0 / capacity, 1) AS occupancy_pct, sold * ticket_price AS revenue FROM d1105_events WHERE sold * 100 < capacity * 70 ORDER BY sold * 1.0 / capacity, name;`,
    ordered: true,
  },
  {
    id: 'd20261105_i1', level: 'intermediate', added: '2026-11-05', source: 'LeetCode', company: '',
    ref: 'Winning Candidate', url: 'https://leetcode.doocs.org/en/lc/574/',
    title: 'המועמד עם מרב הקולות', tables: ['d1105_candidates', 'd1105_votes'],
    prompt: `בטבלה d1105_votes כל שורה היא קול שניתן למועמד (candidate_id), וקול ריק מסומן ב-NULL ואינו נספר. בטבלה d1105_candidates יש את שמות המועמדים. החזירו את שם המועמד שקיבל הכי הרבה קולות (מובטח שיש מנצח אחד בלבד). העמודה: name.`,
    solution: `SELECT c.name FROM d1105_candidates c JOIN (SELECT candidate_id, COUNT(*) AS n FROM d1105_votes WHERE candidate_id IS NOT NULL GROUP BY candidate_id ORDER BY n DESC LIMIT 1) v ON v.candidate_id = c.id;`,
    ordered: false,
  },
  {
    id: 'd20261105_i2', level: 'intermediate', added: '2026-11-05', source: 'DataLemur', company: 'Airbnb',
    ref: 'Average number of guests per booking in each city', url: 'https://datalemur.com/blog/airbnb-sql-interview-questions',
    title: 'ממוצע אורחים להזמנה בכל עיר', tables: ['d1105_stays', 'd1105_stay_listings'],
    prompt: `בטבלה d1105_stays יש הזמנות (booking_id, listing_id, guests) ובטבלה d1105_stay_listings יש את העיר של כל נכס. החזירו לכל עיר שיש בה לפחות הזמנה אחת של נכס מוכר את ממוצע האורחים להזמנה, מעוגל ל-2 ספרות אחרי הנקודה. הזמנות של נכס שאינו מופיע ברשימת הנכסים אינן נספרות. העמודות: city, avg_guests.`,
    solution: `SELECT l.city, ROUND(AVG(s.guests), 2) AS avg_guests FROM d1105_stays s JOIN d1105_stay_listings l ON l.listing_id = s.listing_id GROUP BY l.city;`,
    ordered: false,
  },
  {
    id: 'd20261105_i3', level: 'intermediate', added: '2026-11-05', source: 'DataLemur', company: 'Spotify',
    ref: 'Spotify Listening History', url: 'https://datalemur.com/questions/spotify-listening-history',
    title: 'סך השמעות מצטבר עד תאריך מסוים', tables: ['d1105_play_hist', 'd1105_play_week'],
    prompt: `בטבלה d1105_play_hist יש מספר השמעות מצטבר (plays) לכל צירוף של משתמש ושיר עד תחילת השבוע, ובטבלה d1105_play_week יש כל השמעה בודדת של השבוע עם זמנה (listen_time). חשבו לכל צירוף של user_id ו-song_id את סך ההשמעות עד סוף היום 2026-10-04 (כולל כל השעות ביום הזה): ההיסטוריה ועוד השמעות השבוע עד התאריך הזה. צירוף שיש לו בסך הכול 0 השמעות לא יוצג, וצירוף יכול להופיע רק באחת משתי הטבלאות. העמודות: user_id, song_id, total_plays. מיינו לפי total_plays מהגבוה לנמוך, אז user_id, אז song_id.`,
    solution: `SELECT user_id, song_id, SUM(n) AS total_plays FROM (SELECT user_id, song_id, plays AS n FROM d1105_play_hist UNION ALL SELECT user_id, song_id, 1 FROM d1105_play_week WHERE date(listen_time) <= '2026-10-04') GROUP BY user_id, song_id HAVING SUM(n) > 0 ORDER BY total_plays DESC, user_id, song_id;`,
    ordered: true,
  },
  {
    id: 'd20261105_i4', level: 'intermediate', added: '2026-11-05', source: 'LeetCode', company: '',
    ref: 'Find Cumulative Salary of an Employee', url: 'https://leetcode.com/problems/find-cumulative-salary-of-an-employee/',
    title: 'שכר מצטבר של שלושה חודשים לעובד', tables: ['d1105_pay'],
    prompt: `בטבלה d1105_pay יש שכר חודשי (salary) לעובד (emp_id) לפי מספר חודש (month, 1 עד 12) באותה שנה, ולא לכל עובד יש נתון לכל חודש. לכל עובד ולכל חודש שיש לו נתון, למעט החודש האחרון שיש לו נתון, חשבו את סכום השכר בחודש הזה ובשני החודשים הקלנדריים שקדמו לו (חודש חסר נחשב אפס). העמודות: emp_id, month, total. מיינו לפי emp_id בסדר עולה ואז לפי month בסדר יורד.`,
    solution: `SELECT p.emp_id, p.month, (SELECT SUM(x.salary) FROM d1105_pay x WHERE x.emp_id = p.emp_id AND x.month BETWEEN p.month - 2 AND p.month) AS total FROM d1105_pay p WHERE p.month < (SELECT MAX(y.month) FROM d1105_pay y WHERE y.emp_id = p.emp_id) ORDER BY p.emp_id, p.month DESC;`,
    ordered: true,
  },
  {
    id: 'd20261105_i5', level: 'intermediate', added: '2026-11-05', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נוסעים שביטלו יותר ממה שנסעו', tables: ['d1105_riders', 'd1105_rides'],
    prompt: `בטבלה d1105_riders יש נוסעים (rider_id, city) ובטבלה d1105_rides יש נסיעות עם סטטוס (status) שיכול להיות 'done', 'cancelled' או 'no_show'. החזירו את הנוסעים שמספר הנסיעות שבוטלו אצלם ('cancelled') גדול ממספר הנסיעות שהושלמו ('done'), כולל נוסעים שלא השלימו אף נסיעה. העמודות: rider_id, city, completed, cancelled.`,
    solution: `SELECT r.rider_id, r.city, COUNT(CASE WHEN s.status = 'done' THEN 1 END) AS completed, COUNT(CASE WHEN s.status = 'cancelled' THEN 1 END) AS cancelled FROM d1105_riders r LEFT JOIN d1105_rides s ON s.rider_id = r.rider_id GROUP BY r.rider_id, r.city HAVING COUNT(CASE WHEN s.status = 'cancelled' THEN 1 END) > COUNT(CASE WHEN s.status = 'done' THEN 1 END);`,
    ordered: false,
  },
  {
    id: 'd20261105_a1', level: 'advanced', added: '2026-11-05', source: 'LeetCode', company: '',
    ref: 'Market Analysis II', url: 'https://leetcode.doocs.org/en/lc/1159/',
    title: 'האם הפריט השני שנמכר הוא מהמותג האהוב', tables: ['d1105_sellers', 'd1105_items', 'd1105_sales'],
    prompt: `בטבלה d1105_sellers יש מוכרים עם מותג אהוב (favorite_brand), בטבלה d1105_items יש את המותג של כל פריט, ובטבלה d1105_sales יש מכירות (order_date, item_id, seller_id), כאשר לכל מוכר תאריכי מכירה שונים זה מזה. לכל מוכר החזירו 'yes' אם המותג של הפריט השני שמכר, לפי סדר התאריכים, זהה למותג האהוב עליו, ואחרת 'no'. מוכר שמכר פחות משני פריטים מקבל 'no'. העמודות: seller_id, answer.`,
    solution: `WITH r AS (SELECT seller_id, item_id, ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date) AS rn FROM d1105_sales) SELECT s.seller_id, CASE WHEN i.brand = s.favorite_brand THEN 'yes' ELSE 'no' END AS answer FROM d1105_sellers s LEFT JOIN r ON r.seller_id = s.seller_id AND r.rn = 2 LEFT JOIN d1105_items i ON i.item_id = r.item_id;`,
    ordered: false,
  },
  {
    id: 'd20261105_a2', level: 'advanced', added: '2026-11-05', source: 'LeetCode', company: '',
    ref: 'Total Sales Amount by Year', url: 'https://doocs.github.io/leetcode/en/lc/1384/',
    title: 'פיצול מכירות של תקופה לשנים קלנדריות', tables: ['d1105_prod', 'd1105_period_sales'],
    prompt: `בטבלה d1105_period_sales כל שורה היא תקופת מכירה של מוצר מ-period_start עד period_end (שני התאריכים כלולים) עם מכירה ממוצעת קבועה ליום (avg_daily_sales). התקופות נמצאות בין השנים 2018 ל-2020. חשבו לכל מוצר ולכל שנה קלנדרית שבה נמכר, את סכום המכירות באותה שנה: מספר ימי התקופה שנפלו בשנה כפול המכירה היומית (שנת 2020 היא שנה מעוברת), וסכמו תקופות שונות של אותו מוצר. העמודות: product_id, product_name, report_year (מספר שלם), total_amount. מיינו לפי product_id ואז לפי report_year.`,
    solution: `WITH RECURSIVE y(yr) AS (SELECT 2018 UNION ALL SELECT yr + 1 FROM y WHERE yr < 2020) SELECT p.product_id, p.product_name, y.yr AS report_year, SUM((CAST(julianday(MIN(s.period_end, y.yr || '-12-31')) - julianday(MAX(s.period_start, y.yr || '-01-01')) AS INTEGER) + 1) * s.avg_daily_sales) AS total_amount FROM d1105_period_sales s JOIN y ON s.period_start <= y.yr || '-12-31' AND s.period_end >= y.yr || '-01-01' JOIN d1105_prod p ON p.product_id = s.product_id GROUP BY p.product_id, p.product_name, y.yr ORDER BY p.product_id, y.yr;`,
    ordered: true,
  },
  {
    id: 'd20261105_a3', level: 'advanced', added: '2026-11-05', source: 'PracHub', company: 'Amazon',
    ref: 'Compute daily work hours from in/out events', url: 'https://prachub.com/interview-questions/compute-daily-work-hours-from-in-out-events',
    title: 'שעות עבודה יומיות מאירועי כניסה ויציאה', tables: ['d1105_punches'],
    prompt: `בטבלה d1105_punches יש אירועי החתמה של עובדים: זמן (ts) ופעולה (action) שהיא 'in' או 'out'. משמרת היא אירוע 'in' שהאירוע הבא של אותו עובד לפי זמן הוא 'out'. אירוע 'in' שאחריו 'in' נוסף או שאין אחריו אירוע, ואירוע 'out' שאין לפניו 'in' כזה, אינם משמרת ומתעלמים מהם. משמרת שחוצה חצות מתחלקת בין הימים הקלנדריים שבהם התקיימה. לכל עובד ולכל תאריך חשבו את סך שעות העבודה, מעוגל ל-2 ספרות אחרי הנקודה. העמודות: emp_id, work_date, hours. מיינו לפי emp_id ואז לפי work_date.`,
    solution: `WITH RECURSIVE s AS (SELECT emp_id, ts AS t_in, LEAD(ts) OVER (PARTITION BY emp_id ORDER BY ts) AS t_out, action, LEAD(action) OVER (PARTITION BY emp_id ORDER BY ts) AS nxt FROM d1105_punches), sh AS (SELECT emp_id, t_in, t_out FROM s WHERE action = 'in' AND nxt = 'out'), d(emp_id, t_in, t_out, day) AS (SELECT emp_id, t_in, t_out, date(t_in) FROM sh UNION ALL SELECT emp_id, t_in, t_out, date(day, '+1 day') FROM d WHERE date(day, '+1 day') <= date(t_out)) SELECT emp_id, day AS work_date, ROUND(SUM(strftime('%s', MIN(t_out, date(day, '+1 day') || ' 00:00:00')) - strftime('%s', MAX(t_in, day || ' 00:00:00'))) / 3600.0, 2) AS hours FROM d GROUP BY emp_id, day ORDER BY emp_id, day;`,
    ordered: true,
  },
  {
    id: 'd20261105_a4', level: 'advanced', added: '2026-11-05', source: 'DataDriven', company: '',
    ref: 'The Ninety-Day Comeback', url: 'https://datadriven.io/problems/the_ninety_day_comeback',
    title: 'שיעור משתמשים שחזרו תוך 90 יום', tables: ['d1105_sessions'],
    prompt: `בטבלה d1105_sessions יש סשנים של משתמשים (user_id, started_at). היום הראשון של משתמש הוא התאריך של הסשן הראשון שלו. משתמש נחשב כמי שחזר אם יש לו סשן בתאריך מאוחר מהיום הראשון ועד 90 ימים אחריו, כולל היום ה-90. סשנים נוספים באותו יום קלנדרי של היום הראשון אינם נחשבים חזרה. החזירו את אחוז המשתמשים שחזרו מתוך כל המשתמשים, מעוגל ל-2 ספרות אחרי הנקודה. העמודה: pct_returned.`,
    solution: `WITH f AS (SELECT user_id, date(MIN(started_at)) AS d0 FROM d1105_sessions GROUP BY user_id) SELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN s.user_id IS NOT NULL THEN f.user_id END) / COUNT(DISTINCT f.user_id), 2) AS pct_returned FROM f LEFT JOIN d1105_sessions s ON s.user_id = f.user_id AND date(s.started_at) > f.d0 AND date(s.started_at) <= date(f.d0, '+90 day');`,
    ordered: false,
  },
  {
    id: 'd20261105_a5', level: 'advanced', added: '2026-11-05', source: 'PracHub', company: 'OpenAI',
    ref: 'Handle repeated churn in SQL', url: 'https://prachub.com/coding-questions/handle-repeated-churn-in-sql',
    title: 'מנויים שחזרו אחרי ביטול וימי המנוי שלהם', tables: ['d1105_sub_events'],
    prompt: `בטבלה d1105_sub_events יש אירועי מנוי של משתמשים: event_type הוא 'start' או 'cancel', והאירועים של כל משתמש מתחלפים לפי סדר התאריכים (התחלה, ביטול, התחלה וכן הלאה). תקופת מנוי נפתחת באירוע 'start' ונסגרת באירוע הבא של אותו משתמש. תקופה שלא נסגרה נחשבת כפעילה עד 2026-11-01. החזירו את המשתמשים שהיו להם לפחות שתי תקופות מנוי, עם מספר התקופות וסך ימי המנוי (סכום ההפרשים בימים בין תחילת כל תקופה לסופה). העמודות: user_id, periods, days_subscribed.`,
    solution: `WITH e AS (SELECT user_id, event_type, event_date, LEAD(event_date) OVER (PARTITION BY user_id ORDER BY event_date) AS nxt FROM d1105_sub_events) SELECT user_id, COUNT(*) AS periods, SUM(ROUND(julianday(COALESCE(nxt, '2026-11-01')) - julianday(event_date))) AS days_subscribed FROM e WHERE event_type = 'start' GROUP BY user_id HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261106_b1', level: 'basic', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Classes More Than 5 Students', url: 'https://leetcode.com/problems/classes-more-than-5-students/',
    title: 'קורסים עם חמישה סטודנטים לפחות', tables: ['d1106_enrollments'],
    prompt: `בטבלה d1106_enrollments כל שורה מציינת שסטודנט רשום לקורס (ייתכנו רישומים כפולים של אותו סטודנט לאותו קורס). החזירו את שמות הקורסים שיש בהם לפחות 5 סטודנטים שונים. העמודה: course.`,
    solution: `SELECT course FROM d1106_enrollments GROUP BY course HAVING COUNT(DISTINCT student) >= 5;`,
    ordered: false,
  },
  {
    id: 'd20261106_b2', level: 'basic', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Weather Type in Each Country', url: 'https://leetcode.com/problems/weather-type-in-each-country/',
    title: 'סוג מזג האוויר בכל מדינה', tables: ['d1106_weather'],
    prompt: `בטבלה d1106_weather יש מדידות טמפרטורה יומיות לפי מדינה. עבור כל מדינה שיש לה מדידות בחודש נובמבר 2026, חשבו את הטמפרטורה הממוצעת בחודש זה וסווגו: 'Cold' אם הממוצע קטן או שווה ל-15, 'Hot' אם הוא גדול או שווה ל-25, ואחרת 'Warm'. העמודות: country, weather_type.`,
    solution: `SELECT country, CASE WHEN AVG(temp) <= 15 THEN 'Cold' WHEN AVG(temp) >= 25 THEN 'Hot' ELSE 'Warm' END AS weather_type FROM d1106_weather WHERE day >= '2026-11-01' AND day < '2026-12-01' GROUP BY country;`,
    ordered: false,
  },
  {
    id: 'd20261106_b3', level: 'basic', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Delete Duplicate Emails', url: 'https://leetcode.com/problems/delete-duplicate-emails/',
    title: 'רשומה ראשונה לכל כתובת אימייל', tables: ['d1106_signups'],
    prompt: `בטבלה d1106_signups יש הרשמות, ולאותה כתובת אימייל יש לפעמים כמה הרשמות. עבור כל כתובת אימייל החזירו רק את ההרשמה בעלת ה-id הנמוך ביותר. העמודות: id, email.`,
    solution: `SELECT MIN(id) AS id, email FROM d1106_signups GROUP BY email;`,
    ordered: false,
  },
  {
    id: 'd20261106_b4', level: 'basic', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'User Activity for the Past 30 Days I', url: 'https://leetcode.com/problems/user-activity-for-the-past-30-days-i/',
    title: 'משתמשים פעילים ביום בחודש האחרון', tables: ['d1106_app_activity'],
    prompt: `בטבלה d1106_app_activity יש פעולות של משתמשים באפליקציה. עבור כל יום בטווח של 30 הימים שמסתיים ב-2026-10-31 (כולל שני הקצוות, כלומר מ-2026-10-02), החזירו את מספר המשתמשים השונים שביצעו לפחות פעולה אחת באותו יום. ימים בלי פעילות לא יופיעו. העמודות: activity_date, active_users.`,
    solution: `SELECT activity_date, COUNT(DISTINCT user_id) AS active_users FROM d1106_app_activity WHERE activity_date BETWEEN '2026-10-02' AND '2026-10-31' GROUP BY activity_date;`,
    ordered: false,
  },
  {
    id: 'd20261106_b5', level: 'basic', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Reported Posts', url: 'https://leetcode.com/problems/reported-posts/',
    title: 'פוסטים שדווחו לפי סיבה', tables: ['d1106_post_actions'],
    prompt: `בטבלה d1106_post_actions נרשמות פעולות משתמשים על פוסטים (action יכול להיות 'view', 'like' או 'report', ובדיווח reason מציין את הסיבה). עבור כל סיבת דיווח, החזירו כמה פוסטים שונים דווחו בגללה ביום 2026-10-20. העמודות: reason, report_count.`,
    solution: `SELECT reason, COUNT(DISTINCT post_id) AS report_count FROM d1106_post_actions WHERE action = 'report' AND action_date = '2026-10-20' GROUP BY reason;`,
    ordered: false,
  },
  {
    id: 'd20261106_i1', level: 'intermediate', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Sales Person', url: 'https://leetcode.com/problems/sales-person/',
    title: 'נציגים שלא מכרו לחברה מסוימת', tables: ['d1106_reps', 'd1106_firms', 'd1106_deals'],
    prompt: `יש נציגי מכירות (d1106_reps), חברות (d1106_firms) ועסקאות (d1106_deals) שמקשרות נציג לחברה. החזירו את שמות הנציגים שאין להם אף עסקה עם החברה בשם 'Atlas' (כולל נציגים שאין להם עסקאות כלל). העמודה: name.`,
    solution: `SELECT r.name FROM d1106_reps r WHERE r.rep_id NOT IN (SELECT d.rep_id FROM d1106_deals d JOIN d1106_firms f ON f.firm_id = d.firm_id WHERE f.name = 'Atlas');`,
    ordered: false,
  },
  {
    id: 'd20261106_i2', level: 'intermediate', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Top Travellers', url: 'https://leetcode.com/problems/top-travellers/',
    title: 'הרוכבים שצברו הכי הרבה קילומטרים', tables: ['d1106_riders', 'd1106_legs'],
    prompt: `בטבלה d1106_riders יש רוכבים ובטבלה d1106_legs יש קטעי רכיבה עם מרחק בק"מ. החזירו עבור כל רוכב את סך הק"מ שרכב (0 אם לא רכב כלל). מיינו לפי סך הק"מ מהגבוה לנמוך, ובשוויון לפי השם בסדר אלפביתי עולה. העמודות: name, total_km.`,
    solution: `SELECT r.name, COALESCE(SUM(l.km), 0) AS total_km FROM d1106_riders r LEFT JOIN d1106_legs l ON l.rider_id = r.rider_id GROUP BY r.rider_id, r.name ORDER BY total_km DESC, r.name ASC;`,
    ordered: true,
  },
  {
    id: 'd20261106_i3', level: 'intermediate', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Second Degree Follower', url: 'https://leetcode.com/problems/second-degree-follower/',
    title: 'עוקבים שיש להם עצמם עוקבים', tables: ['d1106_follows'],
    prompt: `בטבלה d1106_follows כל שורה אומרת שהמשתמש follower עוקב אחרי המשתמש followee (ייתכנו שורות כפולות). החזירו את המשתמשים שעוקבים אחרי לפחות משתמש אחד וגם יש להם לפחות עוקב אחד, יחד עם מספר העוקבים השונים שלהם. העמודות: follower, followers_count.`,
    solution: `SELECT followee AS follower, COUNT(DISTINCT follower) AS followers_count FROM d1106_follows WHERE followee IN (SELECT follower FROM d1106_follows) GROUP BY followee;`,
    ordered: false,
  },
  {
    id: 'd20261106_i4', level: 'intermediate', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Get Highest Answer Rate Question', url: 'https://leetcode.com/problems/get-highest-answer-rate-question/',
    title: 'השאלה עם שיעור המענה הגבוה ביותר', tables: ['d1106_q_log'],
    prompt: `בטבלה d1106_q_log כל שורה היא אירוע סביב שאלה בסקר: 'show' (השאלה הוצגה), 'answer' (נענתה) או 'skip' (דולגה). שיעור המענה של שאלה הוא מספר אירועי 'answer' חלקי מספר אירועי 'show'. החזירו שורה אחת: השאלה עם שיעור המענה הגבוה ביותר (בשוויון, זו עם question_id הנמוך יותר), עם השיעור מעוגל לשתי ספרות אחרי הנקודה. שאלות שלא הוצגו לא נחשבות. העמודות: question_id, answer_rate.`,
    solution: `SELECT question_id, ROUND(1.0 * SUM(action = 'answer') / SUM(action = 'show'), 2) AS answer_rate FROM d1106_q_log GROUP BY question_id HAVING SUM(action = 'show') > 0 ORDER BY 1.0 * SUM(action = 'answer') / SUM(action = 'show') DESC, question_id ASC LIMIT 1;`,
    ordered: true,
  },
  {
    id: 'd20261106_i5', level: 'intermediate', added: '2026-11-06',
    source: 'DataLemur', company: 'Twitter',
    ref: 'Histogram of Tweets', url: 'https://datalemur.com/questions/histogram-tweets',
    title: 'היסטוגרמת ציוצים לפי משתמש', tables: ['d1106_tweets'],
    prompt: `בטבלה d1106_tweets יש ציוצים של משתמשים. ספרו לכל משתמש כמה ציוצים פרסם בשנת 2026 (משתמשים בלי ציוצים ב-2026 לא נכללים), ואז החזירו היסטוגרמה: לכל כמות ציוצים אפשרית, כמה משתמשים פרסמו בדיוק כמות זו. העמודות: tweet_bucket, users_num.`,
    solution: `SELECT cnt AS tweet_bucket, COUNT(*) AS users_num FROM (SELECT user_id, COUNT(*) AS cnt FROM d1106_tweets WHERE tweet_date >= '2026-01-01' AND tweet_date < '2027-01-01' GROUP BY user_id) GROUP BY cnt;`,
    ordered: false,
  },
  {
    id: 'd20261106_a1', level: 'advanced', added: '2026-11-06',
    source: 'DataLemur', company: 'Twitter',
    ref: "Tweets' Rolling Averages", url: 'https://datalemur.com/questions/rolling-average-tweets',
    title: 'ממוצע נע של ציוצים לשלושה ימים', tables: ['d1106_daily_tweets'],
    prompt: `בטבלה d1106_daily_tweets יש לכל משתמש מספר ציוצים ביום. עבור כל שורה, חשבו את ממוצע מספר הציוצים של אותו משתמש ביום הנוכחי ובשתי השורות הקודמות לו לפי תאריך (אם יש פחות משתיים קודמות, הממוצע על מה שקיים), מעוגל לשתי ספרות אחרי הנקודה. העמודות: user_id, tweet_date, rolling_avg_3d.`,
    solution: `SELECT user_id, tweet_date, ROUND(AVG(tweet_count) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3d FROM d1106_daily_tweets;`,
    ordered: false,
  },
  {
    id: 'd20261106_a2', level: 'advanced', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Median Employee Salary', url: 'https://leetcode.com/problems/median-employee-salary/',
    title: 'העובדים שבאמצע השכר בכל חברה', tables: ['d1106_pay'],
    prompt: `בטבלה d1106_pay יש עובדים, החברה שלהם והשכר. בכל חברה מסדרים את העובדים לפי שכר עולה ובשוויון לפי emp_id עולה. אם מספר העובדים בחברה אי-זוגי, החזירו את העובד האמצעי; אם זוגי, החזירו את שני העובדים האמצעיים. העמודות: company, emp_id, salary.`,
    solution: `WITH r AS (SELECT emp_id, company, salary, ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary, emp_id) AS rn, COUNT(*) OVER (PARTITION BY company) AS cnt FROM d1106_pay) SELECT company, emp_id, salary FROM r WHERE rn IN ((cnt + 1) / 2, cnt / 2 + 1);`,
    ordered: false,
  },
  {
    id: 'd20261106_a3', level: 'advanced', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Highest Grade For Each Student', url: 'https://leetcode.com/problems/highest-grade-for-each-student/',
    title: 'הציון הגבוה ביותר לכל סטודנט', tables: ['d1106_exams'],
    prompt: `בטבלה d1106_exams יש ציונים של סטודנטים בקורסים. עבור כל סטודנט החזירו את הקורס שבו קיבל את הציון הגבוה ביותר; אם יש כמה קורסים עם אותו ציון גבוה, בחרו את זה עם course_id הנמוך ביותר. העמודות: student_id, course_id, grade.`,
    solution: `SELECT student_id, course_id, grade FROM (SELECT student_id, course_id, grade, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY grade DESC, course_id ASC) AS rn FROM d1106_exams) WHERE rn = 1;`,
    ordered: false,
  },
  {
    id: 'd20261106_a4', level: 'advanced', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'New Users Daily Count', url: 'https://leetcode.com/problems/new-users-daily-count/',
    title: 'משתמשים חדשים לפי יום כניסה ראשון', tables: ['d1106_traffic'],
    prompt: `בטבלה d1106_traffic נרשמות פעולות של משתמשים (activity יכול להיות 'login' או פעולה אחרת). יום הכניסה הראשון של משתמש הוא התאריך המוקדם ביותר של פעולת 'login' שלו. עבור כל תאריך, החזירו כמה משתמשים נכנסו לראשונה באותו תאריך, אך רק תאריכים שנמצאים בטווח של 90 הימים שמסתיים ב-2026-10-31 (כולל; כלומר מ-2026-08-03). העמודות: login_date, user_count.`,
    solution: `SELECT first_login AS login_date, COUNT(*) AS user_count FROM (SELECT user_id, MIN(activity_date) AS first_login FROM d1106_traffic WHERE activity = 'login' GROUP BY user_id) WHERE first_login BETWEEN '2026-08-03' AND '2026-10-31' GROUP BY first_login;`,
    ordered: false,
  },
  {
    id: 'd20261106_a5', level: 'advanced', added: '2026-11-06',
    source: 'LeetCode', company: '',
    ref: 'Students Report By Geography', url: 'https://leetcode.com/problems/students-report-by-geography/',
    title: 'דוח סטודנטים לפי יבשת בעמודות', tables: ['d1106_students'],
    prompt: `בטבלה d1106_students יש סטודנטים והיבשת שלהם ('America', 'Asia' או 'Europe'). הציגו דוח בשלוש עמודות, אחת לכל יבשת, שבו שמות הסטודנטים של כל יבשת מסודרים בסדר אלפביתי מלמעלה למטה, והשורה ה-n מכילה את הסטודנט ה-n מכל יבשת (NULL אם ליבשת אין מספיק סטודנטים). העמודות לפי הסדר: america, asia, europe.`,
    solution: `WITH r AS (SELECT name, continent, ROW_NUMBER() OVER (PARTITION BY continent ORDER BY name) AS rn FROM d1106_students) SELECT MAX(CASE WHEN continent = 'America' THEN name END) AS america, MAX(CASE WHEN continent = 'Asia' THEN name END) AS asia, MAX(CASE WHEN continent = 'Europe' THEN name END) AS europe FROM r GROUP BY rn;`,
    ordered: false,
  },
  // ===== 2026-11-07 =====
  {
    id: 'd20261107_b1', level: 'basic', added: '2026-11-07', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'סיכום חבילות לפי חברת שליחויות', tables: ['d1107_parcels'],
    prompt: 'בטבלה d1107_parcels מופיעות חבילות שנשלחו. לכל חברת שליחויות (courier) הציגו את מספר החבילות, את סך העמלות (fee) ואת המשקל הממוצע (weight_kg) מעוגל ל-2 ספרות אחרי הנקודה. הציגו רק חברות שיש להן לפחות שתי חבילות. עמודות לפי הסדר: courier, parcels, total_fee, avg_weight. מיינו לפי total_fee מהגבוה לנמוך, ובשוויון לפי courier בסדר אלפביתי.',
    solution: `SELECT courier, COUNT(*) AS parcels, SUM(fee) AS total_fee, ROUND(AVG(weight_kg), 2) AS avg_weight FROM d1107_parcels GROUP BY courier HAVING COUNT(*) >= 2 ORDER BY total_fee DESC, courier;`,
    ordered: true,
  },
  {
    id: 'd20261107_b2', level: 'basic', added: '2026-11-07', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חבילות כבדות שטרם נמסרו', tables: ['d1107_parcels'],
    prompt: 'החזירו את מזהה החבילה (parcel_id) והעיר (city) של כל חבילה שטרם נמסרה (אין לה תאריך מסירה) ומשקלה לפחות 5 ק"ג. מיינו לפי parcel_id בסדר עולה.',
    solution: `SELECT parcel_id, city FROM d1107_parcels WHERE delivered_on IS NULL AND weight_kg >= 5 ORDER BY parcel_id;`,
    ordered: true,
  },
  {
    id: 'd20261107_b3', level: 'basic', added: '2026-11-07', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'דירוג ממוצע ושחקנים שלא דירגו', tables: ['d1107_game_ratings'],
    prompt: 'בטבלה d1107_game_ratings כל שורה היא שחקן ששיחק במשחק. הדירוג (rating) ריק אם השחקן לא דירג. לכל משחק הציגו את הדירוג הממוצע של מי שדירג, מעוגל ל-2 ספרות, ואת מספר השחקנים שלא דירגו. עמודות: game, avg_rating, unrated_players.',
    solution: `SELECT game, ROUND(AVG(rating), 2) AS avg_rating, SUM(rating IS NULL) AS unrated_players FROM d1107_game_ratings GROUP BY game;`,
    ordered: false,
  },
  {
    id: 'd20261107_b4', level: 'basic', added: '2026-11-07', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משחקי Quest עם זמן משחק בינוני', tables: ['d1107_game_ratings'],
    prompt: 'החזירו את שמות המשחקים (game, כל שם פעם אחת) שמופיעה בהם המילה Quest בשם, ושיש לפחות שחקן אחד ששיחק בהם בין 10 ל-50 שעות (hours), כולל הקצוות.',
    solution: `SELECT DISTINCT game FROM d1107_game_ratings WHERE game LIKE '%Quest%' AND hours BETWEEN 10 AND 50;`,
    ordered: false,
  },
  {
    id: 'd20261107_b5', level: 'basic', added: '2026-11-07', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חבילות לפי קטגוריית משקל', tables: ['d1107_parcels'],
    prompt: 'סווגו כל חבילה לפי משקלה: "light" אם פחות מ-2 ק"ג, "medium" אם לפחות 2 ופחות מ-10, ו-"heavy" אם 10 ק"ג ומעלה. הציגו לכל קטגוריה את מספר החבילות. עמודות: weight_class, parcels.',
    solution: `SELECT CASE WHEN weight_kg < 2 THEN 'light' WHEN weight_kg < 10 THEN 'medium' ELSE 'heavy' END AS weight_class, COUNT(*) AS parcels FROM d1107_parcels GROUP BY weight_class;`,
    ordered: false,
  },
  {
    id: 'd20261107_i1', level: 'intermediate', added: '2026-11-07', source: 'Dataford', company: 'Headway',
    ref: 'Write a SQL query to identify churned patients on Headway, defined as those who have not booked an appointment within 60 days of their last session',
    url: 'https://dataford.io/questions/write-a-sql-query-to-identify-churned-patients-on-headway-defined-as-those-who-have-not-booked-an-appointment-within-60-days-of-their-last-session',
    title: 'מטופלים שנטשו', tables: ['d1107_appts'],
    prompt: 'בטבלה d1107_appts יש פגישות של מטופלים; הסטטוס (status) הוא completed, cancelled או scheduled. נתון שהתאריך הנוכחי הוא 2026-11-01. מטופל נחשב נטוש אם יש לו לפחות פגישה אחת שהושלמה, הפגישה האחרונה שהושלמה הייתה לפני יותר מ-60 ימים, ואין לו פגישה בסטטוס scheduled שמועדה אחרי הפגישה האחרונה שהושלמה. החזירו patient_id ואת תאריך הפגישה האחרונה שהושלמה בעמודה last_session.',
    solution: `WITH l AS (SELECT patient_id, MAX(appt_date) AS last_session FROM d1107_appts WHERE status = 'completed' GROUP BY patient_id) SELECT patient_id, last_session FROM l WHERE last_session < date('2026-11-01', '-60 days') AND NOT EXISTS (SELECT 1 FROM d1107_appts s WHERE s.patient_id = l.patient_id AND s.status = 'scheduled' AND s.appt_date > l.last_session);`,
    ordered: false,
  },
  {
    id: 'd20261107_i2', level: 'intermediate', added: '2026-11-07', source: 'PracHub', company: '',
    ref: 'Compute percent of first cancelled users who never rebook',
    url: 'https://prachub.com/coding-questions/compute-percent-of-first-cancelled-users-who-never-rebook',
    title: 'אחוז מי שביטל הזמנה ראשונה ולא הזמין שוב', tables: ['d1107_bookings'],
    prompt: 'בטבלה d1107_bookings מופיעות הזמנות של משתמשים (לכל משתמש תאריכי הזמנה שונים). הסטטוס הוא completed או cancelled. מבין המשתמשים שההזמנה הראשונה שלהם (לפי booked_at) בוטלה, חשבו איזה אחוז מהם לא ביצעו אף הזמנה נוספת אחריה, בכל סטטוס. החזירו ערך אחד בשם never_rebook_pct, מעוגל ל-2 ספרות.',
    solution: `WITH f AS (SELECT user_id, MIN(booked_at) AS first_at FROM d1107_bookings GROUP BY user_id), fc AS (SELECT f.user_id, f.first_at FROM f JOIN d1107_bookings b ON b.user_id = f.user_id AND b.booked_at = f.first_at WHERE b.status = 'cancelled') SELECT ROUND(100.0 * SUM(NOT EXISTS (SELECT 1 FROM d1107_bookings b WHERE b.user_id = fc.user_id AND b.booked_at > fc.first_at)) / COUNT(*), 2) AS never_rebook_pct FROM fc;`,
    ordered: false,
  },
  {
    id: 'd20261107_i3', level: 'intermediate', added: '2026-11-07', source: 'LeetCode', company: 'Intuit',
    ref: 'Intuit | 1-to-1 Technical | Senior Business Data Analyst (churn rate from subscription and termination dates)',
    url: 'https://leetcode.com/discuss/interview-experience/1588621/intuit-1-to-1-technical-senior-business-data-analyst-november-2021-mountain-view',
    title: 'שיעור נטישה באוקטובר', tables: ['d1107_subs'],
    prompt: 'בטבלה d1107_subs יש מנויים עם תאריך התחלה (start_date) ותאריך סיום (end_date, ריק אם המנוי עדיין פעיל). מנוי נחשב פעיל בתחילת אוקטובר 2026 אם התחיל לפני 2026-10-01 ולא הסתיים לפני התאריך הזה. שיעור הנטישה של אוקטובר הוא האחוז מהמנויים הפעילים בתחילת החודש שתאריך הסיום שלהם נופל באוקטובר 2026. החזירו ערך אחד בשם churn_pct, מעוגל ל-2 ספרות.',
    solution: `SELECT ROUND(100.0 * SUM(end_date IS NOT NULL AND end_date <= '2026-10-31') / COUNT(*), 2) AS churn_pct FROM d1107_subs WHERE start_date < '2026-10-01' AND (end_date IS NULL OR end_date >= '2026-10-01');`,
    ordered: false,
  },
  {
    id: 'd20261107_i4', level: 'intermediate', added: '2026-11-07', source: 'Dataford', company: 'RealSelf',
    ref: 'SQL for Three Questions (monthly leads, completed appointments and conversion rate by provider)',
    url: 'https://dataford.io/questions/sql-for-three-questions',
    title: 'המרת פניות לפגישות לפי נותן שירות וחודש', tables: ['d1107_providers', 'd1107_leads'],
    prompt: 'בטבלה d1107_leads יש פניות (leads) לנותני שירות, עם חודש הפנייה (lead_month), דגל ספאם (is_spam, 1 = ספאם) וסטטוס הפגישה (appt_status: completed, cancelled או ריק אם לא נקבעה). התעלמו מפניות ספאם. לכל נותן שירות ולכל חודש שבו הייתה לו לפחות פנייה אחת תקינה, הציגו את מספר הפניות, את מספר הפגישות שהושלמו ואת שיעור ההמרה באחוזים (פגישות שהושלמו חלקי פניות) מעוגל ל-2 ספרות. עמודות: provider_name, lead_month, leads, completed, conversion_pct.',
    solution: `SELECT p.provider_name, l.lead_month, COUNT(*) AS leads, SUM(l.appt_status = 'completed') AS completed, ROUND(100.0 * SUM(l.appt_status = 'completed') / COUNT(*), 2) AS conversion_pct FROM d1107_leads l JOIN d1107_providers p ON p.provider_id = l.provider_id WHERE l.is_spam = 0 GROUP BY p.provider_name, l.lead_month;`,
    ordered: false,
  },
  {
    id: 'd20261107_i5', level: 'intermediate', added: '2026-11-07', source: 'GitHub', company: '',
    ref: 'Churned Users (active last month but not this month)',
    url: 'https://gist.github.com/monbang/76151aa5f36d5c058f95ce396d992bdb',
    title: 'משתמשים שנטשו בכל חודש', tables: ['d1107_logins'],
    prompt: 'בטבלה d1107_logins יש כניסות של משתמשים. משתמש נטש בחודש מסוים אם היה פעיל בחודש הקודם ולא נכנס בכלל בחודש הנוכחי. לכל אחד מהחודשים 2026-07 עד 2026-10 (כולל, בפורמט YYYY-MM) החזירו את מספר המשתמשים שנטשו. עמודות: month, churned_users. מיינו לפי month.',
    solution: `WITH m AS (SELECT DISTINCT user_id, strftime('%Y-%m', login_date) AS mon FROM d1107_logins), months(mon) AS (VALUES ('2026-07'), ('2026-08'), ('2026-09'), ('2026-10')) SELECT months.mon AS month, (SELECT COUNT(*) FROM m p WHERE p.mon = strftime('%Y-%m', date(months.mon || '-01', '-1 month')) AND NOT EXISTS (SELECT 1 FROM m c WHERE c.user_id = p.user_id AND c.mon = months.mon)) AS churned_users FROM months ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261107_a1', level: 'advanced', added: '2026-11-07', source: 'Dev Genius', company: 'Paytm',
    ref: 'My Tough SQL Interview Experience at Paytm (new, active and churned customers by date)',
    url: 'https://blog.devgenius.io/my-tough-sql-interview-experience-at-paytm-what-i-was-asked-and-what-i-learned-e987f88de733',
    title: 'לקוחות חדשים, פעילים ונטושים לפי תאריך', tables: ['d1107_cust_orders'],
    prompt: 'בטבלה d1107_cust_orders יש הזמנות של לקוחות. לכל תאריך שבו בוצעה לפחות הזמנה אחת, סווגו כל לקוח שהזמנתו הראשונה בוצעה בתאריך הזה או לפניו: "NEW" אם הזמנתו הראשונה בוצעה בדיוק בתאריך הזה; "ACTIVE" אם לא, וההזמנה האחרונה שלו עד התאריך הזה (כולל) הייתה לכל היותר 90 ימים לפניו; אחרת "CHURNED". החזירו את התאריך (order_date), הקטגוריה (cohort) ומספר הלקוחות בה (customers), רק לקטגוריות שיש בהן לקוחות. מיינו לפי order_date ואז cohort בסדר אלפביתי.',
    solution: `WITH d AS (SELECT DISTINCT order_date AS dt FROM d1107_cust_orders), c AS (SELECT cust_id, MIN(order_date) AS first_d FROM d1107_cust_orders GROUP BY cust_id) SELECT d.dt AS order_date, CASE WHEN c.first_d = d.dt THEN 'NEW' WHEN julianday(d.dt) - julianday((SELECT MAX(o.order_date) FROM d1107_cust_orders o WHERE o.cust_id = c.cust_id AND o.order_date <= d.dt)) <= 90 THEN 'ACTIVE' ELSE 'CHURNED' END AS cohort, COUNT(*) AS customers FROM d JOIN c ON c.first_d <= d.dt GROUP BY d.dt, cohort ORDER BY d.dt, cohort;`,
    ordered: true,
  },
  {
    id: 'd20261107_a2', level: 'advanced', added: '2026-11-07', source: 'Dataford', company: 'RealSelf',
    ref: 'SQL for Three Questions (flag providers whose conversion rate fell from the prior month)',
    url: 'https://dataford.io/questions/sql-for-three-questions',
    title: 'נותני שירות ששיעור ההמרה שלהם ירד', tables: ['d1107_providers', 'd1107_leads'],
    prompt: 'בטבלה d1107_leads יש פניות לנותני שירות (is_spam = 1 הוא ספאם, יש להתעלם ממנו). שיעור ההמרה של נותן שירות בחודש הוא מספר הפגישות שהושלמו (appt_status = completed) חלקי מספר הפניות התקינות שלו באותו חודש, באחוזים. החזירו כל צירוף של נותן שירות וחודש שבו שיעור ההמרה נמוך משיעור ההמרה שלו בחודש הקלנדרי הקודם (רק אם היו לו פניות תקינות גם בחודש הקודם). עמודות: provider_name, lead_month, prev_pct, curr_pct, change_pp. כל האחוזים מעוגלים ל-2 ספרות, ו-change_pp הוא curr_pct פחות prev_pct (מחושב מהערכים המעוגלים). מיינו לפי lead_month ואז provider_name.',
    solution: `WITH mp AS (SELECT provider_id, lead_month, ROUND(100.0 * SUM(appt_status = 'completed') / COUNT(*), 2) AS pct FROM d1107_leads WHERE is_spam = 0 GROUP BY provider_id, lead_month) SELECT p.provider_name, c.lead_month, v.pct AS prev_pct, c.pct AS curr_pct, ROUND(c.pct - v.pct, 2) AS change_pp FROM mp c JOIN mp v ON v.provider_id = c.provider_id AND v.lead_month = strftime('%Y-%m', date(c.lead_month || '-01', '-1 month')) JOIN d1107_providers p ON p.provider_id = c.provider_id WHERE c.pct < v.pct ORDER BY c.lead_month, p.provider_name;`,
    ordered: true,
  },
  {
    id: 'd20261107_a3', level: 'advanced', added: '2026-11-07', source: 'PracHub', company: 'Stripe',
    ref: 'Write SQL to detect recurring non-subscription users',
    url: 'https://prachub.com/coding-questions/write-sql-to-detect-recurring-non-subscription-users',
    title: 'זיהוי לקוחות עם חיוב חוזר שאינו מנוי', tables: ['d1107_charges'],
    prompt: 'בטבלה d1107_charges יש חיובים. התעלמו מחיובים שמסומנים כמנוי (is_subscription = 1). לקוח נחשב חוזר אם יש לו שני חיובים עוקבים, באותו כרטיס (card_fp) ובאותו סכום, שהמרחק ביניהם בימים הוא בין 28 ל-35 כולל, כאשר חיובים עוקבים נקבעים לפי תאריך בתוך אותו לקוח, כרטיס וסכום. החזירו את customer, כל לקוח פעם אחת.',
    solution: `WITH g AS (SELECT customer, julianday(charged_at) - julianday(LAG(charged_at) OVER (PARTITION BY customer, card_fp, amount ORDER BY charged_at)) AS gap FROM d1107_charges WHERE is_subscription = 0) SELECT DISTINCT customer FROM g WHERE gap BETWEEN 28 AND 35;`,
    ordered: false,
  },
  {
    id: 'd20261107_a4', level: 'advanced', added: '2026-11-07', source: 'Glassdoor', company: 'Thumbtack',
    ref: 'Thumbtack Product Analytics interview (week-over-week retention query)',
    url: 'https://www.glassdoor.sg/Interview/Thumbtack-Interview-E414078-RVW80626162.htm',
    title: 'שימור שבועי של משתמשים', tables: ['d1107_activity'],
    prompt: 'בטבלה d1107_activity יש ימי פעילות של משתמשים. שבוע מתחיל ביום שני וממשיך עד יום ראשון. לכל שבוע שיש בו פעילות ושהשבוע שלפניו (שבוע קלנדרי רצוף) גם הוא כולל פעילות, החזירו: את יום שני של השבוע (week_start), את מספר המשתמשים הפעילים בשבוע הקודם (prev_users), כמה מהם היו פעילים גם בשבוע הנוכחי (retained) ואת שיעור השימור באחוזים (retained חלקי prev_users) מעוגל ל-2 ספרות (retention_pct). מיינו לפי week_start.',
    solution: `WITH w AS (SELECT DISTINCT user_id, date(activity_date, 'weekday 0', '-6 days') AS ws FROM d1107_activity) SELECT date(p.ws, '+7 days') AS week_start, COUNT(DISTINCT p.user_id) AS prev_users, COUNT(DISTINCT c.user_id) AS retained, ROUND(100.0 * COUNT(DISTINCT c.user_id) / COUNT(DISTINCT p.user_id), 2) AS retention_pct FROM w p LEFT JOIN w c ON c.user_id = p.user_id AND c.ws = date(p.ws, '+7 days') WHERE date(p.ws, '+7 days') IN (SELECT ws FROM w) GROUP BY p.ws ORDER BY week_start;`,
    ordered: true,
  },
  {
    id: 'd20261107_a5', level: 'advanced', added: '2026-11-07', source: 'Dataford', company: 'RealSelf',
    ref: 'SQL for Three Questions (top two providers per month with a rolling three-month lead count)',
    url: 'https://dataford.io/questions/sql-for-three-questions',
    title: 'שני נותני השירות המובילים בכל חודש', tables: ['d1107_providers', 'd1107_leads'],
    prompt: 'בטבלה d1107_leads יש פניות לנותני שירות (is_spam = 1 הוא ספאם, יש להתעלם ממנו; פגישה הושלמה כאשר appt_status = completed). לכל חודש (lead_month) דרגו את נותני השירות שהיו להם בו פניות תקינות לפי מספר הפגישות שהושלמו, מהגבוה לנמוך, ובשוויון לפי provider_name בסדר אלפביתי (דירוג 1, 2, 3 וכן הלאה ללא כפילויות). החזירו את שני המובילים בכל חודש: lead_month, rank, provider_name, completed (פגישות שהושלמו בחודש), rolling_leads (סך הפניות התקינות של אותו נותן שירות בחודש הנוכחי ובשני החודשים הקלנדריים שקדמו לו). מיינו לפי lead_month ואז rank.',
    solution: `WITH mp AS (SELECT provider_id, lead_month, COUNT(*) AS leads, SUM(appt_status = 'completed') AS completed FROM d1107_leads WHERE is_spam = 0 GROUP BY provider_id, lead_month), r AS (SELECT mp.*, p.provider_name, ROW_NUMBER() OVER (PARTITION BY mp.lead_month ORDER BY mp.completed DESC, p.provider_name) AS rnk, (SELECT SUM(x.leads) FROM mp x WHERE x.provider_id = mp.provider_id AND x.lead_month BETWEEN strftime('%Y-%m', date(mp.lead_month || '-01', '-2 months')) AND mp.lead_month) AS rolling_leads FROM mp JOIN d1107_providers p ON p.provider_id = mp.provider_id) SELECT lead_month, rnk AS rank, provider_name, completed, rolling_leads FROM r WHERE rnk <= 2 ORDER BY lead_month, rnk;`,
    ordered: true,
  },
  // ===== 2026-11-08 =====
  {
    id: 'd20261108_b1', level: 'basic', added: '2026-11-08',
    source: 'DataLemur', company: 'Visa',
    ref: 'Apple Pay Volume', url: 'https://github.com/suleenwong/DataLemur-SQL-Interview-Questions',
    title: 'היקף עסקאות דרך ארנק דיגיטלי',
    tables: ['d1108_wallet_tx'],
    prompt: "בטבלה d1108_wallet_tx כל שורה היא עסקה של סוחר דרך ארנק דיגיטלי. החזירו את merchant_id ואת סך סכומי העסקאות (total), מעוגל למספר שלם, רק עבור סוחרים שהמזהה שלהם מתחיל במילים 'Apple Pay'. מיינו לפי total מהגבוה לנמוך, ובשוויון לפי merchant_id בסדר אלפביתי.",
    solution: `SELECT merchant_id, ROUND(SUM(amount)) AS total FROM d1108_wallet_tx WHERE merchant_id LIKE 'Apple Pay%' GROUP BY merchant_id ORDER BY total DESC, merchant_id;`,
    ordered: true,
  },
  {
    id: 'd20261108_b2', level: 'basic', added: '2026-11-08',
    source: 'DataLemur', company: 'Zoom',
    ref: 'Calculate the Average Duration of Zoom Meetings', url: 'https://datalemur.com/blog/zoom-sql-interview-questions',
    title: 'משך פגישה ממוצע לפי חודש',
    tables: ['d1108_meetings'],
    prompt: "בטבלה d1108_meetings מופיעות פגישות וידאו עם זמן התחלה וזמן סיום (end_time ריק בפגישה שעדיין נמשכת). החזירו לכל חודש התחלה (בפורמט YYYY-MM, לפי start_time) את month ואת avg_hours, משך הפגישה הממוצע בשעות מעוגל לשתי ספרות אחרי הנקודה. התחשבו רק בפגישות שהסתיימו. מיינו לפי month.",
    solution: `SELECT strftime('%Y-%m', start_time) AS month, ROUND(AVG((julianday(end_time) - julianday(start_time)) * 24), 2) AS avg_hours FROM d1108_meetings WHERE end_time IS NOT NULL GROUP BY month ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261108_b3', level: 'basic', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'Calculate Special Bonus', url: 'https://leetcode.com/problems/calculate-special-bonus/',
    title: 'חישוב בונוס מיוחד',
    tables: ['d1108_staff_bonus'],
    prompt: "בטבלה d1108_staff_bonus מופיעים עובדים ושכרם. עובד מקבל בונוס השווה לשכרו אם מספר העובד שלו אי-זוגי ושמו אינו מתחיל באות M גדולה (אות m קטנה אינה נחשבת); בכל מקרה אחר הבונוס הוא 0. החזירו employee_id ו-bonus לכל העובדים, ממוינים לפי employee_id.",
    solution: `SELECT employee_id, CASE WHEN employee_id % 2 = 1 AND substr(name, 1, 1) <> 'M' THEN salary ELSE 0 END AS bonus FROM d1108_staff_bonus ORDER BY employee_id;`,
    ordered: true,
  },
  {
    id: 'd20261108_b4', level: 'basic', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'Number of Unique Subjects Taught by Each Teacher', url: 'https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/',
    title: 'מספר מקצועות שונים לכל מורה',
    tables: ['d1108_teaching'],
    prompt: "בטבלה d1108_teaching כל שורה מציינת שמורה מלמד מקצוע במחלקה מסוימת (אותו מקצוע יכול להופיע כמה פעמים לאותו מורה). החזירו לכל מורה את teacher_id ואת cnt, מספר המקצועות השונים שהוא מלמד.",
    solution: `SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt FROM d1108_teaching GROUP BY teacher_id;`,
    ordered: false,
  },
  {
    id: 'd20261108_b5', level: 'basic', added: '2026-11-08',
    source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משחקים פופולריים עם ציון גבוה',
    tables: ['d1108_plays'],
    prompt: "בטבלה d1108_plays כל שורה היא סבב משחק של שחקן (score ריק כשהסבב לא הסתיים). החזירו לכל משחק שבו שיחקו לפחות שלושה שחקנים שונים וממוצע הציונים שלו (בסבבים עם ציון) גבוה מ-50: game, players (מספר השחקנים השונים) ו-avg_score (ממוצע הציונים מעוגל לספרה אחת אחרי הנקודה).",
    solution: `SELECT game, COUNT(DISTINCT player) AS players, ROUND(AVG(score), 1) AS avg_score FROM d1108_plays GROUP BY game HAVING COUNT(DISTINCT player) >= 3 AND AVG(score) > 50;`,
    ordered: false,
  },
  {
    id: 'd20261108_i1', level: 'intermediate', added: '2026-11-08',
    source: 'DataLemur', company: 'Adobe',
    ref: 'Photoshop Revenue Analysis', url: 'https://datalemur.com/blog/adobe-sql-interview-questions',
    title: 'הכנסות ממוצרים נוספים של לקוחות Photoshop',
    tables: ['d1108_adobe_sales'],
    prompt: "בטבלה d1108_adobe_sales כל שורה היא רכישה של לקוח ממוצר של חברת תוכנה. מצאו את הלקוחות שרכשו את המוצר Photoshop לפחות פעם אחת, והחזירו לכל אחד מהם את customer_id ואת other_revenue, סך ההכנסות ממוצרים אחרים שרכש. אל תחזירו לקוחות שלא רכשו שום מוצר אחר. מיינו לפי customer_id.",
    solution: `SELECT customer_id, SUM(revenue) AS other_revenue FROM d1108_adobe_sales WHERE product <> 'Photoshop' AND customer_id IN (SELECT customer_id FROM d1108_adobe_sales WHERE product = 'Photoshop') GROUP BY customer_id ORDER BY customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261108_i2', level: 'intermediate', added: '2026-11-08',
    source: 'DataLemur', company: 'Zoom',
    ref: 'Get Average Meeting Duration per User', url: 'https://datalemur.com/blog/zoom-sql-interview-questions',
    title: 'משך פגישה ממוצע לכל מארח',
    tables: ['d1108_hosts', 'd1108_meetings'],
    prompt: "לכל מארח שקיימו לו לפחות שתי פגישות שהסתיימו (end_time אינו ריק), החזירו את host_name ואת avg_minutes, משך הפגישה הממוצע שלו בדקות מעוגל לשתי ספרות אחרי הנקודה. מיינו לפי avg_minutes מהגבוה לנמוך, ובשוויון לפי host_name.",
    solution: `SELECT h.host_name, ROUND(AVG((julianday(m.end_time) - julianday(m.start_time)) * 1440), 2) AS avg_minutes FROM d1108_meetings m JOIN d1108_hosts h ON h.host_id = m.host_id WHERE m.end_time IS NOT NULL GROUP BY h.host_id, h.host_name HAVING COUNT(*) >= 2 ORDER BY avg_minutes DESC, h.host_name;`,
    ordered: true,
  },
  {
    id: 'd20261108_i3', level: 'intermediate', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'The Most Recent Orders for Each Product', url: 'https://leetcode.com/problems/the-most-recent-orders-for-each-product/',
    title: 'ההזמנות האחרונות של כל מוצר',
    tables: ['d1108_products', 'd1108_orders'],
    prompt: "לכל מוצר שהוזמן לפחות פעם אחת, החזירו את כל ההזמנות שנעשו בתאריך ההזמנה האחרון שלו (אם כמה הזמנות באותו תאריך אחרון, החזירו את כולן). העמודות: product_name, product_id, order_id, order_date. מיינו לפי product_name, אחר כך product_id ואחר כך order_id.",
    solution: `SELECT p.product_name, o.product_id, o.order_id, o.order_date FROM d1108_orders o JOIN d1108_products p ON p.product_id = o.product_id WHERE o.order_date = (SELECT MAX(o2.order_date) FROM d1108_orders o2 WHERE o2.product_id = o.product_id) ORDER BY p.product_name, o.product_id, o.order_id;`,
    ordered: true,
  },
  {
    id: 'd20261108_i4', level: 'intermediate', added: '2026-11-08',
    source: 'Data Engineer Academy', company: 'Zoom',
    ref: 'SQL interview questions: Zoom (peak hour of the day for meetings)', url: 'https://dataengineeracademy.com/blog/sql-interview-questions-zoom/',
    title: 'שעת השיא של פגישות',
    tables: ['d1108_meetings'],
    prompt: "מצאו את שעת היום (מספר שלם 0 עד 23, לפי start_time) שבה התחילו הכי הרבה פגישות בטבלה d1108_meetings, בכל התקופה. אם כמה שעות חולקות את המקום הראשון, החזירו את כולן. העמודות: hour ו-meetings (מספר הפגישות שהתחילו בשעה זו). כללו גם פגישות שעדיין נמשכות.",
    solution: `WITH h AS (SELECT CAST(strftime('%H', start_time) AS INTEGER) AS hour, COUNT(*) AS meetings FROM d1108_meetings GROUP BY 1) SELECT hour, meetings FROM h WHERE meetings = (SELECT MAX(meetings) FROM h);`,
    ordered: false,
  },
  {
    id: 'd20261108_i5', level: 'intermediate', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'Sellers With No Sales', url: 'https://leetcode.com/problems/sellers-with-no-sales/',
    title: 'מוכרים ללא מכירות ב-2020',
    tables: ['d1108_sellers', 'd1108_sales'],
    prompt: "החזירו את seller_name של כל המוכרים שלא ביצעו אף מכירה במהלך שנת 2020 (מ-1 בינואר 2020 עד 31 בדצמבר 2020 כולל), כולל מוכרים שמעולם לא מכרו דבר. מיינו לפי seller_name.",
    solution: `SELECT seller_name FROM d1108_sellers WHERE seller_id NOT IN (SELECT seller_id FROM d1108_sales WHERE sale_date BETWEEN '2020-01-01' AND '2020-12-31') ORDER BY seller_name;`,
    ordered: true,
  },
  {
    id: 'd20261108_a1', level: 'advanced', added: '2026-11-08',
    source: 'DataLemur', company: 'Visa',
    ref: 'Monthly Merchant Balance', url: 'https://datalemur.com/blog/advanced-sql-interview-questions',
    title: 'יתרת סוחר מצטברת עם איפוס חודשי',
    tables: ['d1108_merchant_tx'],
    prompt: "בטבלה d1108_merchant_tx מופיעות כל העסקאות של חשבון סוחר: הפקדות (deposit) מוסיפות ליתרה ומשיכות (withdrawal) מפחיתות ממנה. החזירו לכל יום שבו היו עסקאות את tx_day (בפורמט YYYY-MM-DD) ואת balance, היתרה המצטברת בסוף אותו יום מתחילת החודש הקלנדרי שלו, כאשר היתרה מתאפסת בתחילת כל חודש חדש. מיינו לפי tx_day.",
    solution: `WITH d AS (SELECT date(tx_time) AS tx_day, SUM(CASE WHEN tx_type = 'deposit' THEN amount ELSE -amount END) AS net FROM d1108_merchant_tx GROUP BY date(tx_time)) SELECT tx_day, SUM(net) OVER (PARTITION BY strftime('%Y-%m', tx_day) ORDER BY tx_day) AS balance FROM d ORDER BY tx_day;`,
    ordered: true,
  },
  {
    id: 'd20261108_a2', level: 'advanced', added: '2026-11-08',
    source: 'StrataScratch', company: 'Redfin',
    ref: 'Update Call Duration', url: 'https://www.stratascratch.com/blog/sql-window-functions-interview-questions',
    title: 'משך שיחות המשך לפי ערוץ פנייה',
    tables: ['d1108_requests', 'd1108_support_calls'],
    prompt: "כל פנייה (d1108_requests) יכולה לכלול כמה שיחות תמיכה (d1108_support_calls). השיחה הראשונה בזמן (call_time) של כל פנייה היא שיחה ראשונית, וכל שיחה אחריה היא שיחת המשך. החזירו לכל ערוץ פנייה (channel) שהיו בו שיחות המשך את channel ואת avg_followup_sec, משך שיחות ההמשך הממוצע בשניות מעוגל לספרה אחת אחרי הנקודה. מיינו לפי channel.",
    solution: `WITH r AS (SELECT c.request_id, c.duration_sec, ROW_NUMBER() OVER (PARTITION BY c.request_id ORDER BY c.call_time, c.call_id) AS rn FROM d1108_support_calls c) SELECT q.channel, ROUND(AVG(r.duration_sec), 1) AS avg_followup_sec FROM r JOIN d1108_requests q ON q.request_id = r.request_id WHERE r.rn > 1 GROUP BY q.channel ORDER BY q.channel;`,
    ordered: true,
  },
  {
    id: 'd20261108_a3', level: 'advanced', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'Customers With Strictly Increasing Purchases', url: 'https://leetcode.com/problems/customers-with-strictly-increasing-purchases/',
    title: 'לקוחות עם רכישות שנתיות עולות',
    tables: ['d1108_buys'],
    prompt: "בטבלה d1108_buys מופיעות הזמנות של לקוחות. סכמו את סכום ההזמנות של כל לקוח בכל שנה קלנדרית. החזירו את customer_id של לקוחות שרכשו ביותר משנה אחת, שיש להם רכישות בכל שנה רצופה בין שנת הרכישה הראשונה לאחרונה שלהם (בלי שנים חסרות), ושסך הרכישות השנתי שלהם גדל בהחלט משנה לשנה. מיינו לפי customer_id.",
    solution: `WITH y AS (SELECT customer_id, CAST(strftime('%Y', order_date) AS INTEGER) AS yr, SUM(price) AS total FROM d1108_buys GROUP BY customer_id, yr), l AS (SELECT customer_id, yr, total, LAG(yr) OVER (PARTITION BY customer_id ORDER BY yr) AS py, LAG(total) OVER (PARTITION BY customer_id ORDER BY yr) AS pt FROM y) SELECT customer_id FROM l GROUP BY customer_id HAVING COUNT(*) >= 2 AND SUM(CASE WHEN py IS NOT NULL AND (yr <> py + 1 OR total <= pt) THEN 1 ELSE 0 END) = 0 ORDER BY customer_id;`,
    ordered: true,
  },
  {
    id: 'd20261108_a4', level: 'advanced', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'The Number of Seniors and Juniors to Join the Company', url: 'https://leetcode.com/problems/the-number-of-seniors-and-juniors-to-join-the-company/',
    title: 'גיוס בכירים וזוטרים בתקציב מוגבל',
    tables: ['d1108_candidates'],
    prompt: "לחברה תקציב שכר כולל של 70000. מועמדים בכירים (Senior) וזוטרים (Junior) נמצאים בטבלה d1108_candidates. החברה מגייסת קודם כמה שיותר בכירים, בסדר שכר עולה (בשוויון לפי employee_id), ואחר כך מגייסת כמה שיותר זוטרים מהתקציב שנותר, גם הם בסדר שכר עולה. החזירו experience ו-accepted_candidates (מספר המועמדים שגויסו מכל סוג), ממוינים לפי experience.",
    solution: `WITH sen AS (SELECT SUM(salary) OVER (ORDER BY salary, employee_id) AS rt FROM d1108_candidates WHERE experience = 'Senior'), sc AS (SELECT COUNT(*) AS n, COALESCE(MAX(rt), 0) AS spent FROM sen WHERE rt <= 70000), jun AS (SELECT SUM(salary) OVER (ORDER BY salary, employee_id) AS rt FROM d1108_candidates WHERE experience = 'Junior') SELECT 'Junior' AS experience, COUNT(*) AS accepted_candidates FROM jun WHERE rt <= 70000 - (SELECT spent FROM sc) UNION ALL SELECT 'Senior', n FROM sc ORDER BY experience;`,
    ordered: true,
  },
  {
    id: 'd20261108_a5', level: 'advanced', added: '2026-11-08',
    source: 'LeetCode', company: '',
    ref: 'Find the Subtasks That Did Not Execute', url: 'https://leetcode.com/problems/find-the-subtasks-that-did-not-execute/',
    title: 'תתי-משימות שלא בוצעו',
    tables: ['d1108_tasks', 'd1108_executed'],
    prompt: "לכל משימה בטבלה d1108_tasks יש subtasks_count תתי-משימות ממוספרות מ-1 ועד המספר הזה. הטבלה d1108_executed מכילה את תתי-המשימות שבוצעו. החזירו את task_id ו-subtask_id של כל תת-משימה שלא בוצעה. מיינו לפי task_id ואז subtask_id.",
    solution: `WITH RECURSIVE s(task_id, subtask_id, mx) AS (SELECT task_id, 1, subtasks_count FROM d1108_tasks UNION ALL SELECT task_id, subtask_id + 1, mx FROM s WHERE subtask_id < mx) SELECT s.task_id, s.subtask_id FROM s LEFT JOIN d1108_executed e ON e.task_id = s.task_id AND e.subtask_id = s.subtask_id WHERE e.task_id IS NULL ORDER BY s.task_id, s.subtask_id;`,
    ordered: true,
  },
  {
    id: 'd20261109_b1', level: 'basic', added: '2026-11-09',
    source: 'Interview Query', company: '',
    ref: 'Top SQL Interview Questions for Data Analysts (WHERE vs HAVING)', url: 'https://interviewquery.com/p/sql-questions-data-analyst',
    title: 'לקוחות עם לפחות שתי הזמנות שנשלחו',
    tables: ['d1109_orders'],
    prompt: "בטבלה d1109_orders כל הזמנה נמצאת באחד הסטטוסים shipped, cancelled או pending. התחשבו רק בהזמנות בסטטוס shipped. החזירו customer, shipped_orders (מספר ההזמנות שנשלחו) ו-shipped_total (סכום ההזמנות שנשלחו) עבור לקוחות שיש להם לפחות שתי הזמנות שנשלחו. מיינו לפי shipped_total יורד ובשוויון לפי customer עולה.",
    solution: `SELECT customer, COUNT(*) AS shipped_orders, SUM(amount) AS shipped_total FROM d1109_orders WHERE status = 'shipped' GROUP BY customer HAVING COUNT(*) >= 2 ORDER BY shipped_total DESC, customer;`,
    ordered: true,
  },
  {
    id: 'd20261109_b2', level: 'basic', added: '2026-11-09',
    source: 'מקורי', company: '', ref: '', url: '',
    title: 'שכר כולל עם בונוס חסר',
    tables: ['d1109_staff'],
    prompt: "בטבלה d1109_staff לחלק מהעובדים אין בונוס (הערך NULL), ובשבילם הבונוס נחשב כ-0. החזירו name ו-total_comp (שכר בסיס + בונוס) של העובדים ששכרם הכולל לפחות 9000. מיינו לפי total_comp יורד ובשוויון לפי name עולה.",
    solution: `SELECT name, base_salary + COALESCE(bonus, 0) AS total_comp FROM d1109_staff WHERE base_salary + COALESCE(bonus, 0) >= 9000 ORDER BY total_comp DESC, name;`,
    ordered: true,
  },
  {
    id: 'd20261109_b3', level: 'basic', added: '2026-11-09',
    source: 'מקורי', company: '', ref: '', url: '',
    title: 'קטגוריות מחיר של נסיעות',
    tables: ['d1109_trips'],
    prompt: "סווגו כל נסיעה בטבלה d1109_trips לפי המחיר fare: מתחת ל-20 היא 'cheap', מ-20 ועד מתחת ל-50 היא 'regular', ו-50 ומעלה היא 'premium'. החזירו category, trips (מספר הנסיעות בקטגוריה) ו-avg_fare (ממוצע המחיר מעוגל ל-2 ספרות אחרי הנקודה).",
    solution: `SELECT CASE WHEN fare < 20 THEN 'cheap' WHEN fare < 50 THEN 'regular' ELSE 'premium' END AS category, COUNT(*) AS trips, ROUND(AVG(fare), 2) AS avg_fare FROM d1109_trips GROUP BY 1;`,
    ordered: false,
  },
  {
    id: 'd20261109_b4', level: 'basic', added: '2026-11-09',
    source: 'מקורי', company: '', ref: '', url: '',
    title: 'קטגוריות של מוצרי Pro יקרים',
    tables: ['d1109_items'],
    prompt: "החזירו את הערכים השונים של category (כל קטגוריה פעם אחת) מתוך מוצרי d1109_items ששמם מכיל את הרצף pro (ללא הבחנה בין אותיות גדולות לקטנות) ומחירם גבוה מ-100. מיינו לפי category בסדר אלפביתי.",
    solution: `SELECT DISTINCT category FROM d1109_items WHERE name LIKE '%pro%' AND price > 100 ORDER BY category;`,
    ordered: true,
  },
  {
    id: 'd20261109_b5', level: 'basic', added: '2026-11-09',
    source: 'מקורי', company: '', ref: '', url: '',
    title: 'משחקים עם לפחות שלושה משחקונים מנוקדים',
    tables: ['d1109_plays'],
    prompt: "בטבלה d1109_plays חלק מהניקוד (score) חסר (NULL) וצריך להתעלם ממנו לגמרי. החזירו game, scored_plays (מספר המשחקים עם ניקוד) ו-avg_score (ממוצע הניקוד מעוגל ל-2 ספרות אחרי הנקודה) עבור משחקים שיש להם לפחות 3 משחקונים עם ניקוד. מיינו לפי avg_score יורד ובשוויון לפי game עולה.",
    solution: `SELECT game, COUNT(score) AS scored_plays, ROUND(AVG(score), 2) AS avg_score FROM d1109_plays GROUP BY game HAVING COUNT(score) >= 3 ORDER BY avg_score DESC, game;`,
    ordered: true,
  },
  {
    id: 'd20261109_i1', level: 'intermediate', added: '2026-11-09',
    source: 'GitHub', company: '',
    ref: 'CROSS JOIN: pairs of states with similar total streams (SQL practice problems by Zachary Thomas)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'זוגות מדינות עם נתוני סטרימינג קרובים',
    tables: ['d1109_state_streams'],
    prompt: "בטבלה d1109_state_streams מופיע מספר הסטרימים הכולל לכל מדינה. החזירו כל זוג מדינות שההפרש המוחלט בין הסטרימים שלהן קטן מ-1000, כשכל זוג מופיע פעם אחת בלבד. העמודות: state_a, state_b (בסדר אלפביתי, כלומר state_a קטנה מ-state_b) ו-diff (ההפרש המוחלט). מיינו לפי state_a ואז state_b.",
    solution: `SELECT a.state AS state_a, b.state AS state_b, ABS(a.total_streams - b.total_streams) AS diff FROM d1109_state_streams a JOIN d1109_state_streams b ON a.state < b.state WHERE ABS(a.total_streams - b.total_streams) < 1000 ORDER BY a.state, b.state;`,
    ordered: true,
  },
  {
    id: 'd20261109_i2', level: 'intermediate', added: '2026-11-09',
    source: 'ai2sql', company: 'Amazon',
    ref: 'Amazon (medium): second-highest order amount per customer', url: 'https://builder.ai2sql.io/blog/sql-interview-questions-faang',
    title: 'הסכום השני בגובהו לכל לקוח',
    tables: ['d1109_purchases'],
    prompt: "לכל לקוח בטבלה d1109_purchases מצאו את סכום הרכישה השני בגובהו מבין הסכומים השונים שלו (סכום שחוזר כמה פעמים נחשב פעם אחת). לקוחות שיש להם פחות משני סכומים שונים לא יופיעו. החזירו customer_id ו-second_amount.",
    solution: `SELECT customer_id, MAX(amount) AS second_amount FROM d1109_purchases p WHERE amount < (SELECT MAX(amount) FROM d1109_purchases WHERE customer_id = p.customer_id) GROUP BY customer_id;`,
    ordered: false,
  },
  {
    id: 'd20261109_i3', level: 'intermediate', added: '2026-11-09',
    source: 'GitHub', company: '',
    ref: 'Average and Rank with a Window Function (SQL practice problems by Zachary Thomas)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'עובדים ששכרם מעל ממוצע המחלקה',
    tables: ['d1109_salaries'],
    prompt: "בטבלה d1109_salaries החזירו את העובדים ששכרם גבוה ממש מממוצע השכר במחלקה שלהם. העמודות: empno, depname, salary, dept_avg (ממוצע השכר במחלקה מעוגל ל-2 ספרות אחרי הנקודה) ו-above_avg (salary פחות הממוצע המדויק, מעוגל ל-2 ספרות אחרי הנקודה).",
    solution: `SELECT s.empno, s.depname, s.salary, ROUND(d.a, 2) AS dept_avg, ROUND(s.salary - d.a, 2) AS above_avg FROM d1109_salaries s JOIN (SELECT depname, AVG(salary) AS a FROM d1109_salaries GROUP BY depname) d ON d.depname = s.depname WHERE s.salary > d.a;`,
    ordered: false,
  },
  {
    id: 'd20261109_i4', level: 'intermediate', added: '2026-11-09',
    source: 'GitHub', company: '',
    ref: 'Tree Structure Labeling (SQL practice problems by Zachary Thomas)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'תיוג צמתים בעץ',
    tables: ['d1109_tree'],
    prompt: "בטבלה d1109_tree כל צומת (node) מצביע על האב שלו (parent), ולשורש אין אב (NULL). החזירו לכל צומת את node ו-label: 'Root' לשורש, 'Leaf' לצומת שאין לו ילדים, ו-'Inner' לכל צומת אחר.",
    solution: `SELECT t.node, CASE WHEN t.parent IS NULL THEN 'Root' WHEN NOT EXISTS (SELECT 1 FROM d1109_tree c WHERE c.parent = t.node) THEN 'Leaf' ELSE 'Inner' END AS label FROM d1109_tree t;`,
    ordered: false,
  },
  {
    id: 'd20261109_i5', level: 'intermediate', added: '2026-11-09',
    source: 'מקורי', company: '', ref: '', url: '',
    title: 'מטופלים שביטלו ולא הגיעו אף פעם',
    tables: ['d1109_appts'],
    prompt: "בטבלה d1109_appts לכל תור יש סטטוס: completed, cancelled או scheduled. החזירו patient ו-cancelled_count (מספר התורים שבוטלו) עבור מטופלים שיש להם לפחות תור אחד שבוטל ואין להם אף תור בסטטוס completed. מיינו לפי cancelled_count יורד ובשוויון לפי patient.",
    solution: `SELECT patient, SUM(status = 'cancelled') AS cancelled_count FROM d1109_appts GROUP BY patient HAVING SUM(status = 'cancelled') >= 1 AND SUM(status = 'completed') = 0 ORDER BY cancelled_count DESC, patient;`,
    ordered: true,
  },
  {
    id: 'd20261109_a1', level: 'advanced', added: '2026-11-09',
    source: 'DataLemur', company: 'Twitter',
    ref: "Tweets' Rolling Averages", url: 'https://datalemur.com/questions/rolling-average-tweets',
    title: 'ממוצע נע של ציוצים לשלושה ימים',
    tables: ['d1109_tweets'],
    prompt: "לכל משתמש בטבלה d1109_tweets חשבו ממוצע נע של tweet_count על פני שלושה ימים: היום הנוכחי ושני הימים שלפניו (לכל משתמש הימים רצופים). בתחילת ציר הזמן של משתמש, כשיש פחות משלושה ימים, חשבו ממוצע על הימים הקיימים. החזירו user_id, tweet_date ו-rolling_avg (מעוגל ל-2 ספרות אחרי הנקודה). מיינו לפי user_id ואז tweet_date.",
    solution: `SELECT user_id, tweet_date, ROUND(AVG(tweet_count) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg FROM d1109_tweets ORDER BY user_id, tweet_date;`,
    ordered: true,
  },
  {
    id: 'd20261109_a2', level: 'advanced', added: '2026-11-09',
    source: 'Interview Query', company: 'Google',
    ref: 'Top 3 Users', url: 'https://interviewquery.com/questions/top-3-users',
    title: 'שלושת המורידים המובילים בכל יום',
    tables: ['d1109_downloads'],
    prompt: "בטבלה d1109_downloads מופיע מספר ההורדות של כל משתמש בכל יום. דרגו את המשתמשים בכל יום לפי downloads מהגבוה לנמוך, כך שמשתמשים עם אותו מספר הורדות מקבלים אותו דירוג והדירוג הבא מדלג בהתאם (לדוגמה 1, 1, 3). החזירו daily_rank, user_id, dl_date ו-downloads לכל מי שדירוגו 3 או פחות באותו יום. מיינו לפי dl_date, daily_rank ואז user_id.",
    solution: `SELECT daily_rank, user_id, dl_date, downloads FROM (SELECT user_id, dl_date, downloads, RANK() OVER (PARTITION BY dl_date ORDER BY downloads DESC) AS daily_rank FROM d1109_downloads) WHERE daily_rank <= 3 ORDER BY dl_date, daily_rank, user_id;`,
    ordered: true,
  },
  {
    id: 'd20261109_a3', level: 'advanced', added: '2026-11-09',
    source: 'GitHub', company: '',
    ref: 'Rolling Averages (SQL practice problems by Zachary Thomas)', url: 'https://gist.github.com/pagles/9d9317c8e64d22f2710b4295d2da69cb',
    title: 'ממוצע נע של הרשמות לשבוע',
    tables: ['d1109_signups'],
    prompt: "בטבלה d1109_signups יש שורה לכל יום רצוף. חשבו לכל יום את ממוצע ההרשמות (sign_ups) על פני 7 הימים האחרונים כולל היום הנוכחי, ובימים הראשונים, כשיש פחות מ-7 ימים, על הימים הקיימים. החזירו signup_date ו-avg_7d (מעוגל ל-2 ספרות אחרי הנקודה), והציגו רק ימים שבהם הממוצע גבוה מ-12. מיינו לפי signup_date.",
    solution: `SELECT signup_date, avg_7d FROM (SELECT signup_date, ROUND(AVG(sign_ups) OVER (ORDER BY signup_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS avg_7d FROM d1109_signups) WHERE avg_7d > 12 ORDER BY signup_date;`,
    ordered: true,
  },
  {
    id: 'd20261109_a4', level: 'advanced', added: '2026-11-09',
    source: 'Dataford', company: '',
    ref: 'Write a SQL query to find the top 3 users by spend in each month, including ties', url: 'https://dataford.io/questions/write-a-sql-query-to-find-the-top-3-users-by-spend-in-each-month-including-ties',
    title: 'שלושת המבזבזים המובילים בכל חודש',
    tables: ['d1109_spend'],
    prompt: "בטבלה d1109_spend מופיעות הוצאות של משתמשים. חשבו לכל משתמש את סך ההוצאות בכל חודש קלנדרי. דרגו את המשתמשים בכל חודש לפי הסכום מהגבוה לנמוך, כשסכומים שווים מקבלים אותו דירוג והדירוג הבא מדלג. החזירו month (בפורמט YYYY-MM), user_id ו-total_spend עבור כל מי שדירוגו 3 או פחות באותו חודש.",
    solution: `WITH m AS (SELECT strftime('%Y-%m', spend_date) AS month, user_id, SUM(amount) AS total_spend FROM d1109_spend GROUP BY 1, 2), r AS (SELECT month, user_id, total_spend, RANK() OVER (PARTITION BY month ORDER BY total_spend DESC) AS rk FROM m) SELECT month, user_id, total_spend FROM r WHERE rk <= 3;`,
    ordered: false,
  },
  {
    id: 'd20261109_a5', level: 'advanced', added: '2026-11-09',
    source: 'Codemia', company: 'Reddit',
    ref: 'Window function: running total over user_id', url: 'https://codemia.io/practice/window-function-running-total-over-user-id-3',
    title: 'היום שבו היתרה המצטברת חוצה 100',
    tables: ['d1109_wallet'],
    prompt: "בטבלה d1109_wallet כל שורה היא תנועה בארנק של משתמש (amount יכול להיות שלילי). לכל משתמש חשבו יתרה מצטברת לפי סדר התנועות, כשהתנועות ממוינות לפי txn_date ובשוויון לפי txn_id. החזירו user_id ו-first_date: התאריך של התנועה הראשונה שבה היתרה המצטברת הגיעה ל-100 או יותר. משתמשים שמעולם לא הגיעו ל-100 לא יופיעו.",
    solution: `SELECT user_id, MIN(txn_date) AS first_date FROM (SELECT user_id, txn_date, SUM(amount) OVER (PARTITION BY user_id ORDER BY txn_date, txn_id) AS running FROM d1109_wallet) WHERE running >= 100 GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261110_b1', level: 'basic', added: '2026-11-10', source: 'LeetCode', company: '',
    ref: 'Immediate Food Delivery I', url: 'https://leetcode.doocs.org/en/lc/1173/',
    title: 'אחוז משלוחים מיידיים',
    tables: ['d1110_delivery'],
    prompt: "בטבלה d1110_delivery כל שורה היא הזמנת משלוח, עם order_date (תאריך ההזמנה) ו-pref_date (התאריך שהלקוח ביקש לקבל). הזמנה נחשבת מיידית אם שני התאריכים זהים. החזירו עמודה אחת: אחוז ההזמנות המיידיות מכלל ההזמנות בטבלה, מעוגל לשתי ספרות אחרי הנקודה.",
    solution: `SELECT ROUND(100.0 * SUM(order_date = pref_date) / COUNT(*), 2) FROM d1110_delivery;`,
    ordered: false,
  },
  {
    id: 'd20261110_b2', level: 'basic', added: '2026-11-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'עובדים שהתקבלו מ-2023 לפי שכר',
    tables: ['d1110_staff'],
    prompt: "מתוך d1110_staff החזירו את העובדים שתאריך הקליטה שלהם (hire_date) הוא 1 בינואר 2023 או מאוחר יותר. החזירו name, dept, salary. מיינו לפי salary מהגבוה לנמוך, ובשוויון לפי emp_id מהנמוך לגבוה.",
    solution: `SELECT name, dept, salary FROM d1110_staff WHERE hire_date >= '2023-01-01' ORDER BY salary DESC, emp_id ASC;`,
    ordered: true,
  },
  {
    id: 'd20261110_b3', level: 'basic', added: '2026-11-10', source: 'Dataford', company: '',
    ref: 'Write a SQL query to find the second highest value in a table without using LIMIT', url: 'https://dataford.io/questions/write-a-sql-query-to-find-the-second-highest-value-in-a-table-without-using-limit',
    title: 'הסכום השני בגובהו בקבלות',
    tables: ['d1110_receipts'],
    prompt: "בטבלה d1110_receipts יש קבלות עם עמודת amount (חלק מהערכים חסרים, NULL, וחלק מהסכומים חוזרים כמה פעמים). החזירו ערך אחד: הסכום השני בגובהו מבין הסכומים השונים זה מזה, בלי להשתמש ב-LIMIT או ב-OFFSET. ערכים חסרים אינם נספרים.",
    solution: `SELECT MAX(amount) AS second_highest FROM d1110_receipts WHERE amount < (SELECT MAX(amount) FROM d1110_receipts);`,
    ordered: false,
  },
  {
    id: 'd20261110_b4', level: 'basic', added: '2026-11-10', source: 'DataLemur', company: 'Wayfair',
    ref: '8 Wayfair SQL Interview Questions (high-value shoppers)', url: 'https://datalemur.com/blog/wayfair-sql-interview-questions',
    title: 'לקוחות בעלי ערך גבוה ב-2026',
    tables: ['d1110_orders'],
    prompt: "בטבלה d1110_orders כל שורה היא הזמנה אחת (total הוא סכום ההזמנה). התחשבו רק בהזמנות משנת 2026. החזירו את הלקוחות שביצעו לפחות 3 הזמנות וסכום ההזמנות הכולל שלהם הוא לפחות 1000. החזירו customer_id, orders_count, total_spent. מיינו לפי total_spent מהגבוה לנמוך, ובשוויון לפי customer_id מהנמוך לגבוה.",
    solution: `SELECT customer_id, COUNT(*) AS orders_count, SUM(total) AS total_spent FROM d1110_orders WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01' GROUP BY customer_id HAVING COUNT(*) >= 3 AND SUM(total) >= 1000 ORDER BY total_spent DESC, customer_id ASC;`,
    ordered: true,
  },
  {
    id: 'd20261110_b5', level: 'basic', added: '2026-11-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'חבילות לפי קבוצת משקל',
    tables: ['d1110_parcels'],
    prompt: "בטבלה d1110_parcels יש חבילות עם weight_kg (לחלקן המשקל חסר). סווגו כל חבילה לקבוצה: 'light' אם המשקל קטן מ-2, 'medium' אם הוא לפחות 2 וקטן מ-10, ו-'heavy' אם הוא 10 ומעלה. חבילות בלי משקל לא נכללות. החזירו weight_class ו-parcels (מספר החבילות בקבוצה).",
    solution: `SELECT CASE WHEN weight_kg < 2 THEN 'light' WHEN weight_kg < 10 THEN 'medium' ELSE 'heavy' END AS weight_class, COUNT(*) AS parcels FROM d1110_parcels WHERE weight_kg IS NOT NULL GROUP BY weight_class;`,
    ordered: false,
  },
  {
    id: 'd20261110_i1', level: 'intermediate', added: '2026-11-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'נרשמים שלא חזרו בשבוע הראשון',
    tables: ['d1110_users', 'd1110_logins'],
    prompt: "בטבלה d1110_users יש תאריך הרשמה (signup_date) לכל משתמש, ובטבלה d1110_logins יש התחברויות. החזירו את המשתמשים שלא התחברו אף פעם בטווח שמיום ההרשמה ועד 7 ימים אחריו (שני הקצוות כלולים). התחברות לפני ההרשמה לא נחשבת, ומשתמש בלי התחברויות כלל גם הוא ברשימה. החזירו user_id ו-name.",
    solution: `SELECT u.user_id, u.name FROM d1110_users u WHERE NOT EXISTS (SELECT 1 FROM d1110_logins l WHERE l.user_id = u.user_id AND l.login_date >= u.signup_date AND l.login_date <= date(u.signup_date, '+7 day'));`,
    ordered: false,
  },
  {
    id: 'd20261110_i2', level: 'intermediate', added: '2026-11-10', source: 'PracHub', company: 'Meta',
    ref: 'Write SQL for video call recipients and FR activity', url: 'https://prachub.com/interview-questions/write-sql-for-video-call-recipients-and-fr-activity',
    title: 'שלושת המתקשרים עם הכי הרבה נמענים שונים',
    tables: ['d1110_calls'],
    prompt: "בטבלה d1110_calls כל שורה היא שיחת וידאו מ-caller_id אל recipient_id. בחנו רק שיחות מ-1 בנובמבר 2026 עד 7 בנובמבר 2026 (כולל). החזירו את שלושת המתקשרים שהתקשרו למספר הגדול ביותר של נמענים שונים בטווח זה: caller_id ו-distinct_recipients. מיינו לפי distinct_recipients מהגבוה לנמוך, ובשוויון לפי caller_id מהנמוך לגבוה, וקחו את שלוש השורות הראשונות.",
    solution: `SELECT caller_id, COUNT(DISTINCT recipient_id) AS distinct_recipients FROM d1110_calls WHERE call_date BETWEEN '2026-11-01' AND '2026-11-07' GROUP BY caller_id ORDER BY distinct_recipients DESC, caller_id ASC LIMIT 3;`,
    ordered: true,
  },
  {
    id: 'd20261110_i3', level: 'intermediate', added: '2026-11-10', source: 'PracHub', company: 'Meta',
    ref: 'Write SQL for initiators and French DAU percent', url: 'https://prachub.com/coding-questions/write-sql-for-initiators-and-french-daupercent',
    title: 'אחוז משתמשים צרפתים פעילים שהיו בשיחה',
    tables: ['d1110_daily_users', 'd1110_call_parts'],
    prompt: "בטבלה d1110_daily_users יש לכל משתמש ולכל יום את המדינה (country) והסימון dau_flag (1 = משתמש פעיל באותו יום). בטבלה d1110_call_parts יש משתתפים בשיחות (משתמש יכול להופיע בכמה שיחות באותו יום). עבור התאריך 2026-08-31 החזירו שורה אחת עם: ds (התאריך), dau_france (מספר המשתמשים הפעילים מצרפת, country = 'FR' ו-dau_flag = 1), on_call_france (כמה מהם השתתפו בלפחות שיחה אחת באותו תאריך) ו-pct (on_call_france כאחוז מ-dau_france, מעוגל לשתי ספרות).",
    solution: `SELECT '2026-08-31' AS ds, COUNT(*) AS dau_france, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1110_call_parts p WHERE p.user_id = d.user_id AND p.call_date = '2026-08-31') THEN 1 ELSE 0 END) AS on_call_france, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1110_call_parts p WHERE p.user_id = d.user_id AND p.call_date = '2026-08-31') THEN 1 ELSE 0 END) / COUNT(*), 2) AS pct FROM d1110_daily_users d WHERE d.ds = '2026-08-31' AND d.country = 'FR' AND d.dau_flag = 1;`,
    ordered: false,
  },
  {
    id: 'd20261110_i4', level: 'intermediate', added: '2026-11-10', source: 'Dataford', company: 'Meta',
    ref: 'IG Reels posting span', url: 'https://dataford.io/interview-guides/questions/ig-reels-posting-span',
    title: 'טווח הפרסום של יוצרי רילס ב-2024',
    tables: ['d1110_reels'],
    prompt: "בטבלה d1110_reels כל שורה היא רילס שפורסם (posted_on הוא התאריך). התחשבו רק בפרסומים מהשנה הקלנדרית 2024. עבור כל יוצר עם לפחות 2 פרסומים באותה שנה החזירו creator_id, posts (מספר הפרסומים) ו-span_days (מספר הימים בין הפרסום הראשון לאחרון). מיינו לפי span_days מהגדול לקטן, ובשוויון לפי creator_id מהנמוך לגבוה.",
    solution: `SELECT creator_id, COUNT(*) AS posts, CAST(julianday(MAX(posted_on)) - julianday(MIN(posted_on)) AS INTEGER) AS span_days FROM d1110_reels WHERE posted_on >= '2024-01-01' AND posted_on < '2025-01-01' GROUP BY creator_id HAVING COUNT(*) >= 2 ORDER BY span_days DESC, creator_id ASC;`,
    ordered: true,
  },
  {
    id: 'd20261110_i5', level: 'intermediate', added: '2026-11-10', source: 'Dataford', company: '',
    ref: 'Write a scenario-based query to retrieve the second highest sales record from a transactional table', url: 'https://dataford.io/questions/write-a-scenario-based-query-to-retrieve-the-second-highest-sales-record-from-a-transactional-table',
    title: 'רשומת המכירה השנייה בגובהה בכל אזור',
    tables: ['d1110_sales'],
    prompt: "בטבלה d1110_sales כל שורה היא מכירה (amount עשוי להיות חסר, NULL, ומכירות כאלה מתעלמים מהן). בכל region מצאו את הסכום השני בגובהו מבין הסכומים השונים באותו אזור, והחזירו את כל המכירות שסכומן שווה לו: sale_id, region, amount. אזור שיש בו פחות משני סכומים שונים לא יופיע.",
    solution: `SELECT s.sale_id, s.region, s.amount FROM d1110_sales s WHERE s.amount IS NOT NULL AND (SELECT COUNT(DISTINCT t.amount) FROM d1110_sales t WHERE t.region = s.region AND t.amount > s.amount) = 1;`,
    ordered: false,
  },
  {
    id: 'd20261110_a1', level: 'advanced', added: '2026-11-10', source: 'Dataford', company: 'Meta',
    ref: 'Reels cohort 7-day rolling retention', url: 'https://dataford.io/questions/reels-cohort-7-day-rolling-retention',
    title: 'שימור מתגלגל לאחר 7 ימים לפי קוהורט רילס',
    tables: ['d1110_events'],
    prompt: "בטבלה d1110_events יש אירועים של משתמשים (event_type: reel_view, app_open, like ועוד). תאריך הקוהורט של משתמש הוא התאריך הראשון שבו יש לו אירוע reel_view; משתמשים בלי reel_view לא נכללים. משתמש נחשב משומר אם יש לו אירוע כלשהו (מכל סוג) בתאריך שהוא 7 ימים או יותר אחרי תאריך הקוהורט שלו. לכל תאריך קוהורט החזירו cohort_date, users (מספר המשתמשים), retained (מספר המשתמשים המשומרים) ו-retention_pct (retained כאחוז מ-users, שתי ספרות אחרי הנקודה). מיינו לפי cohort_date עולה.",
    solution: `WITH c AS (SELECT user_id, MIN(event_date) AS cohort_date FROM d1110_events WHERE event_type = 'reel_view' GROUP BY user_id) SELECT c.cohort_date, COUNT(*) AS users, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1110_events e WHERE e.user_id = c.user_id AND e.event_date >= date(c.cohort_date, '+7 day')) THEN 1 ELSE 0 END) AS retained, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1110_events e WHERE e.user_id = c.user_id AND e.event_date >= date(c.cohort_date, '+7 day')) THEN 1 ELSE 0 END) / COUNT(*), 2) AS retention_pct FROM c GROUP BY c.cohort_date ORDER BY c.cohort_date;`,
    ordered: true,
  },
  {
    id: 'd20261110_a2', level: 'advanced', added: '2026-11-10', source: 'PracHub', company: 'Meta',
    ref: 'Identify 3-person call cycles in video calling app', url: 'https://prachub.com/coding-questions/identify-3-person-call-cycles-in-video-calling-app',
    title: 'מעגלי שיחות של שלושה אנשים',
    tables: ['d1110_vcalls'],
    prompt: "בטבלה d1110_vcalls כל שורה היא שיחה מ-caller_id אל recipient_id (אותו זוג יכול להופיע כמה פעמים). מעגל של שלושה הוא שלישייה של שלושה אנשים שונים A, B, C כך ש-A התקשר ל-B, B התקשר ל-C ו-C התקשר ל-A. החזירו כל מעגל פעם אחת בלבד, כשהמזהה הקטן ביותר מופיע ראשון ושני הכיוונים נחשבים למעגלים נפרדים: העמודות a, b, c, כאשר a הוא המזהה הקטן מהשלושה, a התקשר ל-b, b ל-c ו-c ל-a.",
    solution: `SELECT DISTINCT x.caller_id AS a, x.recipient_id AS b, y.recipient_id AS c FROM d1110_vcalls x JOIN d1110_vcalls y ON y.caller_id = x.recipient_id JOIN d1110_vcalls z ON z.caller_id = y.recipient_id AND z.recipient_id = x.caller_id WHERE x.caller_id < x.recipient_id AND x.caller_id < y.recipient_id AND x.recipient_id <> y.recipient_id;`,
    ordered: false,
  },
  {
    id: 'd20261110_a3', level: 'advanced', added: '2026-11-10', source: 'Dataford', company: '',
    ref: 'SQL day over day growth', url: 'https://dataford.io/questions/sql-day-over-day-growth',
    title: 'צמיחה יומית באחוזים',
    tables: ['d1110_dau_counts'],
    prompt: "בטבלה d1110_dau_counts יש לכל יום (ds, בימים רצופים) את מספר המשתמשים הפעילים. לכל יום מלבד הראשון החזירו ds ו-growth_pct: השינוי באחוזים לעומת היום הקודם, מעוגל לשתי ספרות אחרי הנקודה (ירידה היא ערך שלילי). מיינו לפי ds עולה.",
    solution: `SELECT ds, ROUND(100.0 * (active_users - prev) / prev, 2) AS growth_pct FROM (SELECT ds, active_users, LAG(active_users) OVER (ORDER BY ds) AS prev FROM d1110_dau_counts) WHERE prev IS NOT NULL ORDER BY ds;`,
    ordered: true,
  },
  {
    id: 'd20261110_a4', level: 'advanced', added: '2026-11-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'לקוחות עם מרווח ממוצע קצר בין הזמנות',
    tables: ['d1110_cust_orders'],
    prompt: "בטבלה d1110_cust_orders כל שורה היא הזמנה של לקוח. עבור לקוחות עם לפחות 3 הזמנות חשבו את מספר הימים הממוצע בין הזמנות עוקבות (לפי סדר התאריכים; שתי הזמנות באותו יום יוצרות מרווח של 0). החזירו את הלקוחות שהמרווח הממוצע שלהם הוא 10 ימים או פחות: customer_id, orders_count ו-avg_gap_days (מעוגל לשתי ספרות אחרי הנקודה).",
    solution: `SELECT customer_id, COUNT(*) AS orders_count, ROUND(AVG(gap), 2) AS avg_gap_days FROM (SELECT customer_id, julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id)) AS gap FROM d1110_cust_orders) GROUP BY customer_id HAVING COUNT(*) >= 3 AND AVG(gap) <= 10;`,
    ordered: false,
  },
  {
    id: 'd20261110_a5', level: 'advanced', added: '2026-11-10', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'משפך קנייה מהיר לפי סדר פעולות',
    tables: ['d1110_funnel'],
    prompt: "בטבלה d1110_funnel יש פעולות של משתמשים (step: view, cart, purchase) עם חותמת זמן ts. החזירו את המשתמשים שיש להם צפייה (view), אחריה בזמן מאוחר יותר ממש הוספה לעגלה (cart), ואחריה בזמן מאוחר יותר ממש רכישה (purchase), כך שהרכישה בוצעה עד 60 דקות (כולל) אחרי אותה צפייה. פעולות נוספות באמצע לא משנות. החזירו user_id בלבד, פעם אחת לכל משתמש.",
    solution: `SELECT DISTINCT v.user_id FROM d1110_funnel v JOIN d1110_funnel c ON c.user_id = v.user_id AND c.step = 'cart' AND c.ts > v.ts JOIN d1110_funnel p ON p.user_id = v.user_id AND p.step = 'purchase' AND p.ts > c.ts WHERE v.step = 'view' AND strftime('%s', p.ts) - strftime('%s', v.ts) <= 3600;`,
    ordered: false,
  },
  {
    id: 'd20261111_b1', level: 'basic', added: '2026-11-11', source: 'DataLemur', company: 'Instacart',
    ref: "Instacart SQL Interview Questions (average number of items per order)", url: 'https://datalemur.com/blog/instacart-sql-interview-questions',
    title: "ממוצע פריטים להזמנה",
    tables: ['d1111_order_items'],
    prompt: "בטבלה d1111_order_items כל שורה היא מוצר בהזמנה עם הכמות qty. חשבו את סך הכמות בכל הזמנה, ואז את הממוצע של הסכומים האלה על פני כל ההזמנות שיש להן לפחות שורת פריט אחת. החזירו עמודה אחת, מעוגלת ל-2 ספרות אחרי הנקודה.",
    solution: `SELECT ROUND(AVG(t), 2) FROM (SELECT SUM(qty) AS t FROM d1111_order_items GROUP BY order_id);`,
    ordered: false,
  },
  {
    id: 'd20261111_b2', level: 'basic', added: '2026-11-11', source: 'DataVidhya', company: '',
    ref: "Calculate Order Metrics by Customer Segment", url: 'https://datavidhya.com/coding-problems/questionDetails/question/customer-segment-order-metrics/',
    title: "מדדי הזמנות לפי סגמנט לקוח",
    tables: ['d1111_customers','d1111_orders'],
    prompt: "בטבלאות d1111_customers ו-d1111_orders: לכל סגמנט לקוחות (segment) החזירו את מספר ההזמנות, סכום הסכומים והסכום הממוצע להזמנה, רק מהזמנות בסטטוס 'completed'. סגמנט ללא הזמנות כאלה לא יופיע. עמודות: segment, orders_count, total_amount, avg_amount (ממוצע מעוגל ל-2 ספרות).",
    solution: `SELECT c.segment, COUNT(*) AS orders_count, SUM(o.amount) AS total_amount, ROUND(AVG(o.amount), 2) AS avg_amount FROM d1111_orders o JOIN d1111_customers c ON c.customer_id = o.customer_id WHERE o.status = 'completed' GROUP BY c.segment;`,
    ordered: false,
  },
  {
    id: 'd20261111_b3', level: 'basic', added: '2026-11-11', source: 'PracHub', company: '',
    ref: "Calculate weekly revenue and order count for standard deliveries", url: 'https://prachub.com/coding-questions/calculate-weekly-revenue-and-order-count-for-standard-deliveries',
    title: "הכנסות שבועיות ממשלוחים רגילים",
    tables: ['d1111_deliveries'],
    prompt: "בטבלה d1111_deliveries, לכל שבוע (השבוע מתחיל ביום שני) שבו היו משלוחים מסוג 'standard', החזירו את תאריך יום שני של אותו שבוע (פורמט YYYY-MM-DD), מספר ההזמנות וסך ההכנסות revenue. שבועות ללא משלוח רגיל לא יופיעו. עמודות: week_start, orders, revenue.",
    solution: `SELECT date(order_date, '-6 days', 'weekday 1') AS week_start, COUNT(*) AS orders, SUM(revenue) AS revenue FROM d1111_deliveries WHERE delivery_type = 'standard' GROUP BY week_start;`,
    ordered: false,
  },
  {
    id: 'd20261111_b4', level: 'basic', added: '2026-11-11', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "מוצרים עם מספר דירוגים מספק",
    tables: ['d1111_reviews'],
    prompt: "בטבלה d1111_reviews יש ביקורות עם דירוג rating, ולעיתים הדירוג ריק (NULL). לכל מוצר שיש לו לפחות 2 ביקורות עם דירוג, החזירו את מספר הביקורות המדורגות ואת ממוצע הדירוגים, מעוגל ל-2 ספרות. עמודות: product, rated_count, avg_rating.",
    solution: `SELECT product, COUNT(rating) AS rated_count, ROUND(AVG(rating), 2) AS avg_rating FROM d1111_reviews GROUP BY product HAVING COUNT(rating) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261111_b5', level: 'basic', added: '2026-11-11', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "חברים לפי סוג כתובת מייל",
    tables: ['d1111_members'],
    prompt: "בטבלה d1111_members יש כתובת מייל לכל חבר. סווגו כל חבר: 'gmail' אם הכתובת מסתיימת ב-@gmail.com (ללא הבדל בין אותיות גדולות לקטנות), 'co_il' אם היא מסתיימת ב-.co.il, ואחרת 'other'. החזירו לכל קטגוריה את מספר החברים. עמודות: category, members.",
    solution: `SELECT CASE WHEN email LIKE '%@gmail.com' THEN 'gmail' WHEN email LIKE '%.co.il' THEN 'co_il' ELSE 'other' END AS category, COUNT(*) AS members FROM d1111_members GROUP BY category;`,
    ordered: false,
  },
  {
    id: 'd20261111_i1', level: 'intermediate', added: '2026-11-11', source: 'DataLemur', company: 'Shopify',
    ref: "Shopify SQL Interview Questions (customers with unfulfilled orders older than 15 days)", url: 'https://datalemur.com/blog/shopify-sql-interview-questions',
    title: "לקוחות עם הזמנות שלא סופקו",
    tables: ['d1111_customers','d1111_fulfil'],
    prompt: "נכון לתאריך 2026-11-01, מצאו לקוחות שיש להם הזמנה בסטטוס 'unfulfilled' שגילה גדול מ-15 ימים (הזמנה מלפני בדיוק 15 ימים לא נחשבת). החזירו את שם הלקוח (name) ואת מספר ההזמנות כאלה שלו. עמודות: name, old_unfulfilled.",
    solution: `SELECT c.name, COUNT(*) AS old_unfulfilled FROM d1111_fulfil f JOIN d1111_customers c ON c.customer_id = f.customer_id WHERE f.status = 'unfulfilled' AND julianday('2026-11-01') - julianday(f.order_date) > 15 GROUP BY c.customer_id, c.name;`,
    ordered: false,
  },
  {
    id: 'd20261111_i2', level: 'intermediate', added: '2026-11-11', source: 'DataLemur', company: 'Shopify',
    ref: "Shopify SQL Interview Questions (average sales per product per month)", url: 'https://datalemur.com/blog/shopify-sql-interview-questions',
    title: "ממוצע מכירה למוצר בכל חודש",
    tables: ['d1111_products','d1111_sales'],
    prompt: "לכל מוצר ולכל חודש שבו נמכר, החזירו את שם המוצר, החודש בפורמט YYYY-MM וממוצע סכומי העסקאות (amount) באותו חודש, מעוגל ל-2 ספרות. עמודות: name, month, avg_amount.",
    solution: `SELECT p.name, strftime('%Y-%m', s.sale_date) AS month, ROUND(AVG(s.amount), 2) AS avg_amount FROM d1111_sales s JOIN d1111_products p ON p.product_id = s.product_id GROUP BY p.product_id, month;`,
    ordered: false,
  },
  {
    id: 'd20261111_i3', level: 'intermediate', added: '2026-11-11', source: 'Dataford', company: '',
    ref: "Given a database of orders and delivery partners, write an optimized SQL query to find the average delivery time per restaurant filtering out outliers", url: 'https://dataford.io/questions/given-a-database-of-orders-and-delivery-partners-write-an-optimized-sql-query-to-find-the-average-delivery-time-per-restaurant-filtering-out-outliers',
    title: "זמן משלוח ממוצע ללא חריגים",
    tables: ['d1111_rest_deliv'],
    prompt: "בטבלה d1111_rest_deliv יש זמן משלוח בדקות (minutes) לכל משלוח. חשבו לכל מסעדה את זמן המשלוח הממוצע לאחר השמטת משלוחים חריגים, כלומר משלוחים שזמנם גדול ביותר מפי 2 מהממוצע של כל המשלוחים של אותה מסעדה (הממוצע המקורי, לפני ההשמטה). עמודות: restaurant_id, avg_minutes (מעוגל ל-2 ספרות).",
    solution: `SELECT d.restaurant_id, ROUND(AVG(d.minutes), 2) AS avg_minutes FROM d1111_rest_deliv d JOIN (SELECT restaurant_id, AVG(minutes) AS m FROM d1111_rest_deliv GROUP BY restaurant_id) a ON a.restaurant_id = d.restaurant_id WHERE d.minutes <= 2 * a.m GROUP BY d.restaurant_id;`,
    ordered: false,
  },
  {
    id: 'd20261111_i4', level: 'intermediate', added: '2026-11-11', source: 'PracHub', company: '',
    ref: "Write SQL for late delivery metrics by window", url: 'https://prachub.com/interview-questions/write-sql-for-late-delivery-metrics-by-window',
    title: "מדדי איחור במשלוחים לפי אזור",
    tables: ['d1111_regions','d1111_sla'],
    prompt: "בטבלה d1111_sla יש לכל הזמנה זמן הבטחה promised_ts וזמן אספקה delivered_ts (NULL אם טרם סופקה). בהזמנות שסופקו, שזמן ההבטחה שלהן הוא בין 2026-11-01 ל-2026-11-07 כולל (לפי התאריך), חשבו לכל אזור את מספר ההזמנות, כמה מהן איחרו (אספקה מאוחרת ממש מההבטחה) ואחוז האיחורים מעוגל ספרה אחת אחרי הנקודה. עמודות: region_name, delivered_orders, late_orders, late_pct.",
    solution: `SELECT r.region_name, COUNT(*) AS delivered_orders, SUM(s.delivered_ts > s.promised_ts) AS late_orders, ROUND(100.0 * SUM(s.delivered_ts > s.promised_ts) / COUNT(*), 1) AS late_pct FROM d1111_sla s JOIN d1111_regions r ON r.region_id = s.region_id WHERE s.delivered_ts IS NOT NULL AND date(s.promised_ts) BETWEEN '2026-11-01' AND '2026-11-07' GROUP BY r.region_id, r.region_name;`,
    ordered: false,
  },
  {
    id: 'd20261111_i5', level: 'intermediate', added: '2026-11-11', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "לקוחות שנעלמו בנובמבר",
    tables: ['d1111_customers','d1111_orders'],
    prompt: "החזירו את שמות הלקוחות (name) שביצעו לפחות הזמנה אחת בסטטוס 'completed' באוקטובר 2026 ואין להם אף הזמנה בסטטוס 'completed' בנובמבר 2026.",
    solution: `SELECT c.name FROM d1111_customers c WHERE EXISTS (SELECT 1 FROM d1111_orders o WHERE o.customer_id = c.customer_id AND o.status = 'completed' AND o.order_date LIKE '2026-10-%') AND NOT EXISTS (SELECT 1 FROM d1111_orders o WHERE o.customer_id = c.customer_id AND o.status = 'completed' AND o.order_date LIKE '2026-11-%');`,
    ordered: false,
  },
  {
    id: 'd20261111_a1', level: 'advanced', added: '2026-11-11', source: 'Dataford', company: 'Instacart',
    ref: "Given a table of shopper deliveries, calculate the rolling 3 day average of deliveries completed per shopper", url: 'https://dataford.io/questions/given-a-table-of-shopper-deliveries-calculate-the-rolling-3-day-average-of-deliveries-completed-per-shopper',
    title: "ממוצע נע של משלוחים לשופר",
    tables: ['d1111_shopper_days'],
    prompt: "בטבלה d1111_shopper_days יש לכל שופר (shopper_id) וליום (day) מספר משלוחים deliveries; ימים בלי פעילות אינם מופיעים בטבלה. לכל שורה בטבלה חשבו את סך המשלוחים של השופר ב-3 הימים הקלנדריים המסתיימים באותו יום (כולל היום עצמו, ויום חסר נחשב 0) חלקי 3, מעוגל ל-2 ספרות. עמודות: shopper_id, day, rolling_avg.",
    solution: `SELECT shopper_id, day, ROUND(SUM(deliveries) OVER (PARTITION BY shopper_id ORDER BY julianday(day) RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) / 3.0, 2) AS rolling_avg FROM d1111_shopper_days;`,
    ordered: false,
  },
  {
    id: 'd20261111_a2', level: 'advanced', added: '2026-11-11', source: 'Dataford', company: '',
    ref: "Top 5 products per month 2", url: 'https://dataford.io/questions/top-5-products-per-month-2',
    title: "שני המוצרים המובילים בכל חודש",
    tables: ['d1111_products','d1111_sales'],
    prompt: "לכל חודש (YYYY-MM) החזירו את שני המוצרים עם סך המכירות (amount) הגבוה ביותר באותו חודש. מוצרים בתיקו על המקום השני נכללים כולם. עמודות: month, name, total_amount.",
    solution: `SELECT month, name, total FROM (SELECT strftime('%Y-%m', s.sale_date) AS month, p.name, SUM(s.amount) AS total, RANK() OVER (PARTITION BY strftime('%Y-%m', s.sale_date) ORDER BY SUM(s.amount) DESC) AS rk FROM d1111_sales s JOIN d1111_products p ON p.product_id = s.product_id GROUP BY month, p.product_id, p.name) WHERE rk <= 2;`,
    ordered: false,
  },
  {
    id: 'd20261111_a3', level: 'advanced', added: '2026-11-11', source: 'Codemia', company: '',
    ref: "Join orders and transactions to find rolling 7-day average", url: 'https://codemia.io/practice/join-orders-and-transactions-to-find-rolling-7-day-average',
    title: "ממוצע נע של הכנסה יומית על 7 ימים",
    tables: ['d1111_orders','d1111_pay'],
    prompt: "בטבלה d1111_pay יש תשלומים להזמנות. התחשבו רק בתשלומים בסטטוס 'ok' של הזמנות שהסטטוס שלהן ב-d1111_orders הוא 'completed'. חשבו את ההכנסה היומית לכל תאריך תשלום, ולכל תאריך כזה את ממוצע ההכנסות היומיות של הימים שיש בהם תשלומים, בטווח של התאריך עצמו ו-6 הימים הקלנדריים שלפניו. עמודות: pay_date, daily_revenue, rolling_avg (מעוגל ל-2 ספרות).",
    solution: `SELECT pay_date, daily_revenue, ROUND(AVG(daily_revenue) OVER (ORDER BY julianday(pay_date) RANGE BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_avg FROM (SELECT p.pay_date, SUM(p.amount) AS daily_revenue FROM d1111_pay p JOIN d1111_orders o ON o.order_id = p.order_id WHERE p.status = 'ok' AND o.status = 'completed' GROUP BY p.pay_date);`,
    ordered: false,
  },
  {
    id: 'd20261111_a4', level: 'advanced', added: '2026-11-11', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "ההזמנה שהצליבה סף הוצאה מצטברת",
    tables: ['d1111_orders'],
    prompt: "לכל לקוח, מיינו את ההזמנות שלו בסטטוס 'completed' לפי order_date ואז לפי order_id, וחשבו סכום מצטבר של amount. החזירו את ההזמנה הראשונה שבה הסכום המצטבר הגיע ל-100 או יותר. לקוחות שלא הגיעו לסף לא יופיעו. עמודות: customer_id, order_id.",
    solution: `SELECT customer_id, order_id FROM (SELECT customer_id, order_id, SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS cum, COALESCE(SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date, order_id ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS prev FROM d1111_orders WHERE status = 'completed') WHERE cum >= 100 AND prev < 100;`,
    ordered: false,
  },
  {
    id: 'd20261111_a5', level: 'advanced', added: '2026-11-11', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "הפער הארוך ביותר בין הזמנות",
    tables: ['d1111_orders'],
    prompt: "לכל לקוח עם לפחות 2 הזמנות בסטטוס 'completed', מצאו את הפער הגדול ביותר בימים בין שתי הזמנות עוקבות שלו (לפי order_date), ואת תאריך ההזמנה שסיימה את הפער. בתיקו בין פערים, בחרו את המוקדם יותר. עמודות: customer_id, gap_days, ended_on.",
    solution: `SELECT customer_id, gap_days, ended_on FROM (SELECT customer_id, gap_days, ended_on, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY gap_days DESC, ended_on) AS rn FROM (SELECT customer_id, order_date AS ended_on, CAST(julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id)) AS INTEGER) AS gap_days FROM d1111_orders WHERE status = 'completed') WHERE gap_days IS NOT NULL) WHERE rn = 1;`,
    ordered: false,
  },
  {
    id: 'd20261112_b1', level: 'basic', added: '2026-11-12', source: 'DataLemur', company: 'Tesla',
    ref: "Unfinished Parts", url: 'https://datalemur.com/questions/tesla-unfinished-parts',
    title: "חלקים עם שלבי הרכבה שלא הסתיימו",
    tables: ['d1112_parts'],
    prompt: "בטבלה d1112_parts כל שורה היא שלב הרכבה של חלק. שלב נחשב לא גמור אם אין לו finish_date. לכל חלק שיש לו לפחות שלב אחד לא גמור, החזירו את part_id, part_name ואת מספר השלבים הלא גמורים שלו. עמודות: part_id, part_name, unfinished_steps.",
    solution: `SELECT part_id, part_name, COUNT(*) AS unfinished_steps FROM d1112_parts WHERE finish_date IS NULL GROUP BY part_id, part_name;`,
    ordered: false,
  },
  {
    id: 'd20261112_b2', level: 'basic', added: '2026-11-12', source: 'DataLemur', company: 'Alibaba',
    ref: "Compressed Mode", url: 'https://datalemur.com/questions',
    title: "הכמות השכיחה ביותר בהזמנה",
    tables: ['d1112_item_counts'],
    prompt: "הטבלה d1112_item_counts מכילה, לכל כמות פריטים בהזמנה (item_count), כמה הזמנות היו עם כמות זו (order_occurrences). החזירו את כל ערכי item_count שמופיעים במספר ההזמנות הגבוה ביותר (כולל תיקו), ממוינים מהקטן לגדול. עמודה: item_count.",
    solution: `SELECT item_count FROM d1112_item_counts WHERE order_occurrences = (SELECT MAX(order_occurrences) FROM d1112_item_counts) ORDER BY item_count;`,
    ordered: true,
  },
  {
    id: 'd20261112_b3', level: 'basic', added: '2026-11-12', source: 'DataLemur', company: 'UnitedHealth',
    ref: "Patient Support Analysis", url: 'https://datalemur.com/questions?company=UnitedHealth',
    title: "מבוטחים שפנו הרבה למוקד התמיכה",
    tables: ['d1112_support_calls'],
    prompt: "בטבלה d1112_support_calls מתועדות פניות של מבוטחים למוקד. התעלמו משיחות שבהן call_category ריק. החזירו את המבוטחים שיש להם לפחות 3 שיחות כאלה, עם מספר השיחות שלהם, ממוינים לפי מספר השיחות מהגבוה לנמוך ובתיקו לפי policy_holder_id עולה. עמודות: policy_holder_id, calls.",
    solution: `SELECT policy_holder_id, COUNT(*) AS calls FROM d1112_support_calls WHERE call_category IS NOT NULL GROUP BY policy_holder_id HAVING COUNT(*) >= 3 ORDER BY calls DESC, policy_holder_id;`,
    ordered: true,
  },
  {
    id: 'd20261112_b4', level: 'basic', added: '2026-11-12', source: 'DataLemur', company: 'Asana',
    ref: "Calculate Monthly Average Task Completion Time", url: 'https://datalemur.com/blog/asana-sql-interview-questions',
    title: "זמן השלמת משימה ממוצע לפי חודש",
    tables: ['d1112_tasks'],
    prompt: "בטבלה d1112_tasks לכל משימה יש תאריך יצירה ותאריך השלמה (ריק אם טרם הושלמה). עבור משימות שהושלמו בלבד, חשבו לכל חודש השלמה (בפורמט YYYY-MM) את מספר המשימות שהושלמו בו ואת ממוצע הימים בין היצירה להשלמה, מעוגל ל-2 ספרות אחרי הנקודה. מיינו לפי החודש עולה. עמודות: month, tasks_done, avg_days.",
    solution: `SELECT strftime('%Y-%m', completed_date) AS month, COUNT(*) AS tasks_done, ROUND(AVG(julianday(completed_date) - julianday(created_date)), 2) AS avg_days FROM d1112_tasks WHERE completed_date IS NOT NULL GROUP BY strftime('%Y-%m', completed_date) ORDER BY month;`,
    ordered: true,
  },
  {
    id: 'd20261112_b5', level: 'basic', added: '2026-11-12', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "דירוג שליחים לפי ציוני לקוחות",
    tables: ['d1112_deliveries'],
    prompt: "בטבלה d1112_deliveries כל שורה היא משלוח; rating ריק כשהלקוח לא דירג. לכל שליח עם לפחות 3 משלוחים בסך הכול (כולל משלוחים ללא דירוג), החזירו את מספר המשלוחים שלו ואת ממוצע הדירוגים הקיימים בלבד, מעוגל ל-2 ספרות אחרי הנקודה. עמודות: courier_id, deliveries, avg_rating.",
    solution: `SELECT courier_id, COUNT(*) AS deliveries, ROUND(AVG(rating), 2) AS avg_rating FROM d1112_deliveries GROUP BY courier_id HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261112_i1', level: 'intermediate', added: '2026-11-12', source: 'DataLemur', company: 'PayPal',
    ref: "Unique Money Transfer Relationships", url: 'https://datalemur.com/blog/paypal-sql-interview-questions',
    title: "זוגות שמעבירים כסף זה לזה",
    tables: ['d1112_transfers'],
    prompt: "בטבלה d1112_transfers כל שורה היא העברת כסף ממשתמש (payer_id) למשתמש אחר (recipient_id); אותו זוג יכול להופיע כמה פעמים. זוג משתמשים נחשב 'הדדי' אם כל אחד מהם העביר כסף לשני לפחות פעם אחת. כמה זוגות הדדיים שונים יש? כל זוג נספר פעם אחת בלבד, בלי קשר לסדר המשתמשים. עמודה: mutual_pairs.",
    solution: `SELECT COUNT(*) AS mutual_pairs FROM (SELECT DISTINCT a.payer_id AS u1, a.recipient_id AS u2 FROM d1112_transfers a JOIN d1112_transfers b ON a.payer_id = b.recipient_id AND a.recipient_id = b.payer_id WHERE a.payer_id < a.recipient_id);`,
    ordered: false,
  },
  {
    id: 'd20261112_i2', level: 'intermediate', added: '2026-11-12', source: 'DataLemur', company: 'Verizon',
    ref: "International Call Percentage", url: 'https://datalemur.com/questions',
    title: "אחוז השיחות הבינלאומיות",
    tables: ['d1112_phones', 'd1112_pcalls'],
    prompt: "בטבלה d1112_phones מוגדרת המדינה של כל משתמש, ובטבלה d1112_pcalls רשומות שיחות בין שני משתמשים. שיחה היא בינלאומית אם המתקשר והמקבל נמצאים במדינות שונות. מהו אחוז השיחות הבינלאומיות מכלל השיחות, מעוגל לספרה אחת אחרי הנקודה? עמודה: international_pct.",
    solution: `SELECT ROUND(100.0 * SUM(CASE WHEN p1.country <> p2.country THEN 1 ELSE 0 END) / COUNT(*), 1) AS international_pct FROM d1112_pcalls c JOIN d1112_phones p1 ON p1.user_id = c.caller_id JOIN d1112_phones p2 ON p2.user_id = c.receiver_id;`,
    ordered: false,
  },
  {
    id: 'd20261112_i3', level: 'intermediate', added: '2026-11-12', source: 'DataLemur', company: 'Visa',
    ref: "Average Daily Transaction Volume for Each Merchant", url: 'https://datalemur.com/blog/visa-sql-interview-questions',
    title: "נפח עסקאות יומי ממוצע לסוחר",
    tables: ['d1112_visa_tx'],
    prompt: "בטבלה d1112_visa_tx כל שורה היא עסקה של סוחר. לכל סוחר, חשבו את סכום העסקאות בכל יום שבו היו לו עסקאות, ואז את הממוצע של הסכומים היומיים האלה, מעוגל ל-2 ספרות אחרי הנקודה. ימים ללא עסקאות אינם נספרים. עמודות: merchant_id, avg_daily_volume.",
    solution: `SELECT merchant_id, ROUND(AVG(daily), 2) AS avg_daily_volume FROM (SELECT merchant_id, txn_date, SUM(amount) AS daily FROM d1112_visa_tx GROUP BY merchant_id, txn_date) GROUP BY merchant_id;`,
    ordered: false,
  },
  {
    id: 'd20261112_i4', level: 'intermediate', added: '2026-11-12', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "חשבונות שהפסיקו להשתמש בנובמבר",
    tables: ['d1112_accounts', 'd1112_usage'],
    prompt: "זהו חשבונות שהייתה להם לפחות שורת שימוש אחת באוקטובר 2026 ולא הייתה להם אף שורת שימוש בנובמבר 2026. החזירו את שם החשבון, החבילה וסך יחידות השימוש שלו באוקטובר, ממוינים לפי סך היחידות מהגבוה לנמוך ובתיקו לפי שם עולה. עמודות: name, plan, oct_units.",
    solution: `SELECT a.name, a.plan, SUM(u.units) AS oct_units FROM d1112_accounts a JOIN d1112_usage u ON u.account_id = a.account_id WHERE u.usage_date BETWEEN '2026-10-01' AND '2026-10-31' AND NOT EXISTS (SELECT 1 FROM d1112_usage n WHERE n.account_id = a.account_id AND n.usage_date BETWEEN '2026-11-01' AND '2026-11-30') GROUP BY a.account_id, a.name, a.plan ORDER BY oct_units DESC, a.name;`,
    ordered: true,
  },
  {
    id: 'd20261112_i5', level: 'intermediate', added: '2026-11-12', source: 'DataLemur', company: 'JPMorgan Chase',
    ref: "Card Launch Success", url: 'https://datalemur.com/questions/card-launch-success',
    title: "הנפקות כרטיס בחודש ההשקה",
    tables: ['d1112_cards'],
    prompt: "בטבלה d1112_cards מופיעים, לכל כרטיס אשראי וחודש (issue_month, issue_year), מספר הכרטיסים שהונפקו. חודש ההשקה של כרטיס הוא החודש המוקדם ביותר שמופיע עבורו בטבלה. החזירו לכל כרטיס את מספר ההנפקות בחודש ההשקה שלו, ממוינים מהגבוה לנמוך. עמודות: card_name, launch_issued.",
    solution: `SELECT c.card_name, c.issued_amount AS launch_issued FROM d1112_cards c WHERE c.issue_year * 12 + c.issue_month = (SELECT MIN(x.issue_year * 12 + x.issue_month) FROM d1112_cards x WHERE x.card_name = c.card_name) ORDER BY launch_issued DESC;`,
    ordered: true,
  },
  {
    id: 'd20261112_a1', level: 'advanced', added: '2026-11-12', source: 'DataLemur', company: 'Asana',
    ref: "Identify Most Active Users by Weekly Log", url: 'https://datalemur.com/blog/asana-sql-interview-questions',
    title: "המשתמש הפעיל ביותר בכל שבוע",
    tables: ['d1112_user_log'],
    prompt: "בטבלה d1112_user_log כל שורה היא פעולה של משתמש. שבוע מתחיל ביום שני ומסתיים ביום ראשון. לכל שבוע שיש בו פעילות, החזירו את המשתמש עם מספר הפעולות הגבוה ביותר באותו שבוע (בתיקו, את בעל ה-user_id הקטן), תאריך יום השני של השבוע ומספר הפעולות. מיינו לפי תאריך תחילת השבוע. עמודות: week_start, user_id, entries.",
    solution: `SELECT week_start, user_id, entries FROM (SELECT week_start, user_id, entries, ROW_NUMBER() OVER (PARTITION BY week_start ORDER BY entries DESC, user_id) AS rn FROM (SELECT date(log_date, 'weekday 0', '-6 days') AS week_start, user_id, COUNT(*) AS entries FROM d1112_user_log GROUP BY week_start, user_id)) WHERE rn = 1 ORDER BY week_start;`,
    ordered: true,
  },
  {
    id: 'd20261112_a2', level: 'advanced', added: '2026-11-12', source: 'Dataford', company: 'Scopely',
    ref: "Write SQL queries against a fictitious database to answer five business questions for a marketing analytics take-home assignment", url: 'https://dataford.io/questions/write-sql-queries-against-a-fictitious-database-to-answer-five-business-questions-for-a-marketing-analytics-take-home-assignment',
    title: "הקמפיין הרווחי ביותר בכל ערוץ",
    tables: ['d1112_mkt_campaigns', 'd1112_mkt_events'],
    prompt: "לכל קמפיין יש הוצאה (spend) ושורות אירועים בטבלה d1112_mkt_events. ההכנסה של קמפיין היא סכום revenue של אירועי purchase שלו. ROAS של קמפיין הוא ההכנסה חלקי ההוצאה, מעוגל ל-2 ספרות אחרי הנקודה. בכל ערוץ (channel) החזירו את הקמפיין עם ה-ROAS המעוגל הגבוה ביותר (בתיקו, את ה-campaign_id הקטן), כולל קמפיינים ללא רכישות שה-ROAS שלהם 0. מיינו לפי שם הערוץ. עמודות: channel, campaign_id, roas.",
    solution: `SELECT channel, campaign_id, roas FROM (SELECT c.channel, c.campaign_id, ROUND(COALESCE(SUM(CASE WHEN e.event_type = 'purchase' THEN e.revenue END), 0) / c.spend, 2) AS roas, ROW_NUMBER() OVER (PARTITION BY c.channel ORDER BY ROUND(COALESCE(SUM(CASE WHEN e.event_type = 'purchase' THEN e.revenue END), 0) / c.spend, 2) DESC, c.campaign_id) AS rn FROM d1112_mkt_campaigns c LEFT JOIN d1112_mkt_events e ON e.campaign_id = c.campaign_id GROUP BY c.campaign_id, c.channel, c.spend) WHERE rn = 1 ORDER BY channel;`,
    ordered: true,
  },
  {
    id: 'd20261112_a3', level: 'advanced', added: '2026-11-12', source: 'Dataford', company: 'Datavant',
    ref: "What SQL techniques would you use to identify drop-off points in a multi-stage marketing funnel", url: 'https://dataford.io/questions/what-sql-techniques-would-you-use-to-identify-drop-off-points-in-a-multi-stage-marketing-funnel-at-datavant',
    title: "משפך הרשמה ונקודות נשירה",
    tables: ['d1112_funnel_steps', 'd1112_funnel'],
    prompt: "בטבלה d1112_funnel_steps מוגדרים שלבי המשפך לפי step_order, ובטבלה d1112_funnel מתועדים השלבים שמשתמשים ביצעו (ייתכנו כפילויות ושלבים שדולגו). משתמש נחשב כמי שהגיע לשלב רק אם ביצע גם את כל השלבים שלפניו. לכל שלב החזירו את מספר המשתמשים שהגיעו אליו ואת אחוזם ממספר המשתמשים שהגיעו לשלב הקודם, מעוגל לספרה אחת אחרי הנקודה (בשלב הראשון: 100.0). מיינו לפי סדר השלבים. עמודות: step_name, users, pct_of_prev.",
    solution: `WITH reached AS (SELECT s.step_name, s.step_order, COUNT(*) AS users FROM d1112_funnel_steps s JOIN (SELECT DISTINCT user_id FROM d1112_funnel) u ON (SELECT COUNT(DISTINCT st.step_order) FROM d1112_funnel f JOIN d1112_funnel_steps st ON st.step_name = f.step_name WHERE f.user_id = u.user_id AND st.step_order <= s.step_order) = s.step_order GROUP BY s.step_name, s.step_order) SELECT step_name, users, ROUND(100.0 * users / COALESCE(LAG(users) OVER (ORDER BY step_order), users), 1) AS pct_of_prev FROM reached ORDER BY step_order;`,
    ordered: true,
  },
  {
    id: 'd20261112_a4', level: 'advanced', added: '2026-11-12', source: 'Codemia', company: '',
    ref: "Join impressions and orders to find percentile rank", url: 'https://codemia.io/practice/join-impressions-and-orders-to-find-percentile-rank',
    title: "דירוג אחוזוני של מודעות לפי המרה",
    tables: ['d1112_ads', 'd1112_ad_impr', 'd1112_ad_orders'],
    prompt: "לכל מודעה חשבו אחוז המרה: מספר ההזמנות שלה (d1112_ad_orders) כפול 100 חלקי סך החשיפות שלה (d1112_ad_impr), מעוגל ל-2 ספרות אחרי הנקודה; מודעה ללא הזמנות מקבלת 0. בנוסף חשבו לכל מודעה דירוג אחוזוני בתוך המפרסם שלה: מספר המודעות של אותו מפרסם עם אחוז המרה (לא מעוגל) נמוך ממנה ממש, חלקי מספר המודעות של המפרסם פחות 1, מעוגל ל-2 ספרות אחרי הנקודה. עמודות: ad_id, advertiser, conv_pct, pct_rank.",
    solution: `WITH m AS (SELECT a.ad_id, a.advertiser, 100.0 * (SELECT COUNT(*) FROM d1112_ad_orders o WHERE o.ad_id = a.ad_id) / (SELECT SUM(impressions) FROM d1112_ad_impr i WHERE i.ad_id = a.ad_id) AS conv FROM d1112_ads a) SELECT ad_id, advertiser, ROUND(conv, 2) AS conv_pct, ROUND(1.0 * (SELECT COUNT(*) FROM m m2 WHERE m2.advertiser = m.advertiser AND m2.conv < m.conv) / ((SELECT COUNT(*) FROM m m3 WHERE m3.advertiser = m.advertiser) - 1), 2) AS pct_rank FROM m;`,
    ordered: false,
  },
  {
    id: 'd20261112_a5', level: 'advanced', added: '2026-11-12', source: 'מקורי', company: '',
    ref: "", url: '',
    title: "הרגע הראשון שבו החשבון נכנס למינוס",
    tables: ['d1112_ledger'],
    prompt: "בטבלה d1112_ledger כל שורה היא תנועה בחשבון (חיוב בסכום שלילי וזיכוי בסכום חיובי). היתרה אחרי תנועה היא סכום כל התנועות של החשבון עד אליה, כשהתנועות מסודרות לפי tx_date ובתיקו לפי tx_id. לכל חשבון שהיתרה שלו ירדה אי פעם מתחת ל-0, החזירו את התאריך של התנועה הראשונה שאחריה היתרה שלילית ואת היתרה באותו רגע. מיינו לפי account_id. עמודות: account_id, first_negative_date, balance.",
    solution: `SELECT account_id, tx_date AS first_negative_date, bal AS balance FROM (SELECT account_id, tx_date, bal, ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY tx_date, tx_id) AS rn FROM (SELECT account_id, tx_id, tx_date, SUM(amount) OVER (PARTITION BY account_id ORDER BY tx_date, tx_id) AS bal FROM d1112_ledger) WHERE bal < 0) WHERE rn = 1 ORDER BY account_id;`,
    ordered: true,
  },
  // ===== 2026-11-13 =====
  {
    id: 'd20261113_b1', level: 'basic', added: '2026-11-13', source: "DataLemur", company: "NVIDIA",
    ref: "Average GPU Temperature per Model", url: "https://datalemur.com/blog/nvidia-sql-interview-questions",
    title: "טמפרטורת GPU לפי דגם", tables: ["d1113_gpu_temps"],
    prompt: "בטבלה d1113_gpu_temps יש מדידות טמפרטורה של כרטיסי GPU במרכז נתונים. חלק מהמדידות חסרות (temp_c ריק) ואינן נספרות כמדידה. לכל דגם (gpu_model) החזירו: gpu_model, הטמפרטורה הממוצעת מעוגלת לשתי ספרות אחרי הנקודה (avg_temp), הטמפרטורה המקסימלית (max_temp) ומספר המדידות התקינות (readings).",
    solution: `SELECT gpu_model, ROUND(AVG(temp_c), 2) AS avg_temp, MAX(temp_c) AS max_temp, COUNT(temp_c) AS readings
FROM d1113_gpu_temps
GROUP BY gpu_model;`,
    ordered: false,
  },
  {
    id: 'd20261113_b2', level: 'basic', added: '2026-11-13', source: "DataLemur", company: "Goldman Sachs",
    ref: "Average Trade Amount for each Client Segment", url: "https://datalemur.com/blog/goldman-sachs-sql-interview-questions",
    title: "ממוצע עסקה לפי סגמנט ולפי חודש", tables: ["d1113_trades"],
    prompt: "בטבלה d1113_trades יש עסקאות מסחר של לקוחות בנק השקעות, כל לקוח שייך לסגמנט (client_segment). לכל חודש (בפורמט YYYY-MM, העמודה month) ולכל סגמנט החזירו את סכום העסקה הממוצע מעוגן לשתי ספרות אחרי הנקודה (avg_amount). עמודות: month, client_segment, avg_amount. מיינו לפי החודש מהחדש לישן, ובתוך כל חודש לפי הממוצע מהגבוה לנמוך.",
    solution: `SELECT strftime('%Y-%m', trade_date) AS month, client_segment, ROUND(AVG(amount), 2) AS avg_amount
FROM d1113_trades
GROUP BY month, client_segment
ORDER BY month DESC, avg_amount DESC;`,
    ordered: true,
  },
  {
    id: 'd20261113_b3', level: 'basic', added: '2026-11-13', source: "DataLemur", company: "Hilton",
    ref: "Hotel Booking Analysis", url: "https://datalemur.com/blog/hilton-sql-interview-questions",
    title: "הזמנות לפי חודש וסוג חדר", tables: ["d1113_hotel_bookings"],
    prompt: "בטבלה d1113_hotel_bookings יש הזמנות חדרים במלון. התייחסו רק להזמנות של לקוחות מארה\"ב (USA) ומבריטניה (UK). לכל חודש (YYYY-MM, העמודה month) ולכל סוג חדר החזירו את מספר ההזמנות. עמודות: month, room_type, bookings. מיינו לפי החודש מהמוקדם למאוחר, אחר כך לפי מספר ההזמנות מהגבוה לנמוך, ובשוויון לפי room_type בסדר אלפביתי.",
    solution: `SELECT strftime('%Y-%m', booked_on) AS month, room_type, COUNT(*) AS bookings
FROM d1113_hotel_bookings
WHERE customer_country IN ('USA', 'UK')
GROUP BY month, room_type
ORDER BY month, bookings DESC, room_type;`,
    ordered: true,
  },
  {
    id: 'd20261113_b4', level: 'basic', added: '2026-11-13', source: "DataLemur", company: "NVIDIA",
    ref: "Monthly Average Reviews for NVIDIA Products", url: "https://datalemur.com/blog/nvidia-sql-interview-questions",
    title: "דירוג ממוצע חודשי למוצר", tables: ["d1113_gpu_reviews"],
    prompt: "בטבלה d1113_gpu_reviews יש ביקורות כוכבים על כרטיסי מסך. ביקורת ללא דירוג (stars ריק) אינה נחשבת. לכל מוצר ולכל חודש (YYYY-MM, העמודה month) שבו יש לו לפחות ביקורת מדורגת אחת, החזירו את מספר הכוכבים הממוצע מעוגן לשתי ספרות אחרי הנקודה (avg_stars). עמודות: month, product_id, avg_stars. מיינו לפי החודש ואז לפי product_id, שניהם בסדר עולה.",
    solution: `SELECT strftime('%Y-%m', submit_date) AS month, product_id, ROUND(AVG(stars), 2) AS avg_stars
FROM d1113_gpu_reviews
GROUP BY month, product_id
HAVING COUNT(stars) > 0
ORDER BY month, product_id;`,
    ordered: true,
  },
  {
    id: 'd20261113_b5', level: 'basic', added: '2026-11-13', source: "מקורי", company: "",
    ref: "", url: "",
    title: "מרפאות עם ביקורים ללא ביטוח", tables: ["d1113_visits"],
    prompt: "בטבלה d1113_visits יש ביקורי מטופלים במרפאות. ביקור ללא ביטוח הוא ביקור שבו insurance ריק. לכל מרפאה שיש בה לפחות 2 ביקורים ללא ביטוח החזירו: clinic, מספר הביקורים ללא ביטוח (uninsured_visits) וסך התשלומים עליהם (total_fee). מיינו לפי total_fee מהגבוה לנמוך.",
    solution: `SELECT clinic, COUNT(*) AS uninsured_visits, SUM(fee) AS total_fee
FROM d1113_visits
WHERE insurance IS NULL
GROUP BY clinic
HAVING COUNT(*) >= 2
ORDER BY total_fee DESC;`,
    ordered: true,
  },
  {
    id: 'd20261113_i1', level: 'intermediate', added: '2026-11-13', source: "DataLemur", company: "Hilton",
    ref: "Average Review Score per City per Month", url: "https://datalemur.com/blog/hilton-sql-interview-questions",
    title: "העיר עם הציון הגבוה בכל חודש", tables: ["d1113_hotels", "d1113_hotel_reviews"],
    prompt: "בטבלה d1113_hotels יש מלונות ועיר של כל אחד, ובטבלה d1113_hotel_reviews יש ביקורות עם ציון (score). לכל חודש (YYYY-MM, העמודה month) מצאו את העיר שציון הביקורת הממוצע שלה באותו חודש הוא הגבוה ביותר (הממוצע על פני כל הביקורות של מלונות העיר). אם כמה ערים שוות, החזירו את זו הראשונה לפי סדר אלפביתי. עמודות: month, city, avg_score (מעוגן לשתי ספרות אחרי הנקודה).",
    solution: `SELECT month, city, avg_score FROM (
  SELECT strftime('%Y-%m', r.review_date) AS month, h.city, ROUND(AVG(r.score), 2) AS avg_score,
         ROW_NUMBER() OVER (PARTITION BY strftime('%Y-%m', r.review_date) ORDER BY AVG(r.score) DESC, h.city) AS rn
  FROM d1113_hotel_reviews r JOIN d1113_hotels h ON h.hotel_id = r.hotel_id
  GROUP BY month, h.city
) WHERE rn = 1;`,
    ordered: false,
  },
  {
    id: 'd20261113_i2', level: 'intermediate', added: '2026-11-13', source: "DataLemur", company: "Booking.com",
    ref: "VIP Customers (five-star hotel bookings per month)", url: "https://datalemur.com/blog/booking-sql-interview-questions",
    title: "לקוחות VIP לפי הזמנות במלונות 5 כוכבים", tables: ["d1113_bk_hotels", "d1113_bk_bookings"],
    prompt: "בטבלה d1113_bk_hotels יש מלונות עם דירוג כוכבים (stars), ובטבלה d1113_bk_bookings יש הזמנות של משתמשים. משתמש נחשב VIP בחודש מסוים אם הזמין באותו חודש קלנדרי לפחות 2 הזמנות במלונות של 5 כוכבים. החזירו את כל זוגות המשתמש-חודש שבהם המשתמש VIP: user_id, month (YYYY-MM) ו-five_star_bookings (מספר ההזמנות במלונות 5 כוכבים באותו חודש).",
    solution: `SELECT b.user_id, strftime('%Y-%m', b.booked_on) AS month, COUNT(*) AS five_star_bookings
FROM d1113_bk_bookings b JOIN d1113_bk_hotels h ON h.hotel_id = b.hotel_id
WHERE h.stars = 5
GROUP BY b.user_id, month
HAVING COUNT(*) >= 2;`,
    ordered: false,
  },
  {
    id: 'd20261113_i3', level: 'intermediate', added: '2026-11-13', source: "PracHub", company: "Amazon",
    ref: "Find Top Three Books by City in Recent Months", url: "https://prachub.com/interview-questions/find-top-three-books-by-city-in-recent-months",
    title: "שלושת הספרים המובילים בכל עיר", tables: ["d1113_book_sales"],
    prompt: "בטבלה d1113_book_sales יש מכירות ספרים לפי עיר. התייחסו רק למכירות מ-1 בספטמבר 2026 ואילך. ההכנסה של ספר בעיר היא סכום של units כפול unit_price על פני כל מכירותיו שם. לכל עיר החזירו עד שלושה ספרים עם ההכנסה הגבוהה ביותר, ובשוויון בהכנסה העדיפו asin קטן יותר בסדר אלפביתי. עמודות: city, asin, revenue, position (המיקום 1 עד 3 בתוך העיר).",
    solution: `SELECT city, asin, revenue, position FROM (
  SELECT city, asin, SUM(units * unit_price) AS revenue,
         ROW_NUMBER() OVER (PARTITION BY city ORDER BY SUM(units * unit_price) DESC, asin) AS position
  FROM d1113_book_sales
  WHERE sale_date >= '2026-09-01'
  GROUP BY city, asin
) WHERE position <= 3;`,
    ordered: false,
  },
  {
    id: 'd20261113_i4', level: 'intermediate', added: '2026-11-13', source: "Codemia", company: "",
    ref: "Join events and messages to find time to first action", url: "https://codemia.io/practice/join-events-and-messages-to-find-time-to-first-action",
    title: "זמן מההודעה הראשונה לפעולה הראשונה", tables: ["d1113_cx_msgs", "d1113_cx_actions"],
    prompt: "בטבלה d1113_cx_msgs יש הודעות ששלחו משתמשים, ובטבלה d1113_cx_actions יש פעולות של משתמשים באפליקציה. לכל משתמש ששלח לפחות הודעה אחת החזירו את מספר הדקות (שלם) מרגע ההודעה הראשונה שלו ועד הפעולה הראשונה שלו שהתרחשה באותו רגע או אחריו. אם אין למשתמש פעולה כזו, הערך יהיה NULL. עמודות: user_id, minutes_to_first_action.",
    solution: `SELECT m.user_id,
       ROUND((julianday(MIN(a.action_at)) - julianday(m.first_msg)) * 1440) AS minutes_to_first_action
FROM (SELECT user_id, MIN(sent_at) AS first_msg FROM d1113_cx_msgs GROUP BY user_id) m
LEFT JOIN d1113_cx_actions a ON a.user_id = m.user_id AND a.action_at >= m.first_msg
GROUP BY m.user_id, m.first_msg;`,
    ordered: false,
  },
  {
    id: 'd20261113_i5', level: 'intermediate', added: '2026-11-13', source: "מקורי", company: "",
    ref: "", url: "",
    title: "מחלקות עם עובדים ללא הדרכה ב-2026", tables: ["d1113_staff", "d1113_trainings"],
    prompt: "בטבלה d1113_staff יש עובדים ומחלקה, ובטבלה d1113_trainings יש הדרכות. הדרכה נחשבת רק אם יש לה completed_on והיא הושלמה בשנת 2026. לכל מחלקה שיש בה לפחות עובד אחד בלי הדרכה כזו, החזירו: dept, מספר העובדים במחלקה (total_staff) ומספר העובדים בלי הדרכה כזו (untrained_staff).",
    solution: `SELECT s.dept, COUNT(*) AS total_staff,
       SUM(CASE WHEN NOT EXISTS (SELECT 1 FROM d1113_trainings t WHERE t.emp_id = s.emp_id AND strftime('%Y', t.completed_on) = '2026') THEN 1 ELSE 0 END) AS untrained_staff
FROM d1113_staff s
GROUP BY s.dept
HAVING untrained_staff > 0;`,
    ordered: false,
  },
  {
    id: 'd20261113_a1', level: 'advanced', added: '2026-11-13', source: "PracHub", company: "Amazon",
    ref: "Compute a Rolling Seven-Day Revenue Sum with Missing Dates", url: "https://prachub.com/interview-questions/compute-a-rolling-seven-day-revenue-sum-with-missing-dates",
    title: "הכנסה מתגלגלת של 7 ימים לכל מוכר", tables: ["d1113_seller_orders"],
    prompt: "בטבלה d1113_seller_orders יש הזמנות של מוכרים. רק הזמנות בסטטוס 'completed' נחשבות. ההכנסה היומית של מוכר היא סכום ההזמנות שלו באותו תאריך קלנדרי (החלק של התאריך ב-order_ts), ו-0 בתאריך שבו אין לו הזמנות. לכל מוכר בנו רצף תאריכים רציף מתאריך ההזמנה הראשונה שלו ועד תאריך ההזמנה האחרונה שלו (כולל ימים ריקים), והחזירו לכל יום: order_date, seller_id, daily_revenue, ו-rolling_7d_revenue, סכום ההכנסה היומית של אותו יום ושל 6 הימים הקלנדריים שלפניו (בתחילת הרצף - רק הימים הקיימים). מיינו לפי seller_id ואז order_date.",
    solution: `WITH RECURSIVE bounds AS (
  SELECT seller_id, MIN(date(order_ts)) AS d0, MAX(date(order_ts)) AS d1 FROM d1113_seller_orders WHERE status = 'completed' GROUP BY seller_id
), spine(seller_id, d, d1) AS (
  SELECT seller_id, d0, d1 FROM bounds
  UNION ALL
  SELECT seller_id, date(d, '+1 day'), d1 FROM spine WHERE d < d1
), daily AS (
  SELECT s.d AS order_date, s.seller_id, COALESCE(SUM(o.amount), 0) AS daily_revenue
  FROM spine s LEFT JOIN d1113_seller_orders o ON o.seller_id = s.seller_id AND date(o.order_ts) = s.d AND o.status = 'completed'
  GROUP BY s.d, s.seller_id
)
SELECT order_date, seller_id, daily_revenue,
       SUM(daily_revenue) OVER (PARTITION BY seller_id ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d_revenue
FROM daily
ORDER BY seller_id, order_date;`,
    ordered: true,
  },
  {
    id: 'd20261113_a2', level: 'advanced', added: '2026-11-13', source: "Dataford", company: "Sony PlayStation",
    ref: "PlayStation cohort metrics: active users, PS5 sessions, purchasers and revenue per cohort-month", url: "https://dataford.io/questions/sql-cohort-metrics-query",
    title: "מדדי קוהורט: משתמשים, סשנים ורכישות", tables: ["d1113_ps_users", "d1113_ps_sessions", "d1113_ps_purchases"],
    prompt: "בטבלה d1113_ps_users יש משתמשי קונסולה עם תאריך הרשמה, בטבלה d1113_ps_sessions יש סשנים (platform הוא PS4 או PS5), ובטבלה d1113_ps_purchases יש רכישות (רק status = 'completed' נחשבת). קוהורט הוא חודש ההרשמה (YYYY-MM). לכל צירוף של קוהורט וחודש פעילות (YYYY-MM, חודש שבו היה למשתמשי הקוהורט לפחות סשן אחד או רכישה שהושלמה) החזירו: cohort_month, activity_month, active_users (משתמשים שונים עם סשן באותו חודש), ps5_sessions (מספר סשני PS5), purchasers (משתמשים שונים עם רכישה שהושלמה באותו חודש) ו-revenue (סכום הרכישות שהושלמו באותו חודש).",
    solution: `WITH ev AS (
  SELECT u.user_id, strftime('%Y-%m', u.signup_date) AS cohort_month, strftime('%Y-%m', s.session_date) AS activity_month,
         1 AS is_session, CASE WHEN s.platform = 'PS5' THEN 1 ELSE 0 END AS is_ps5, 0 AS is_purchase, 0.0 AS amount
  FROM d1113_ps_users u JOIN d1113_ps_sessions s ON s.user_id = u.user_id
  UNION ALL
  SELECT u.user_id, strftime('%Y-%m', u.signup_date), strftime('%Y-%m', p.purchase_date), 0, 0, 1, p.amount
  FROM d1113_ps_users u JOIN d1113_ps_purchases p ON p.user_id = u.user_id
  WHERE p.status = 'completed'
)
SELECT cohort_month, activity_month,
       COUNT(DISTINCT CASE WHEN is_session = 1 THEN user_id END) AS active_users,
       SUM(is_ps5) AS ps5_sessions,
       COUNT(DISTINCT CASE WHEN is_purchase = 1 THEN user_id END) AS purchasers,
       SUM(amount) AS revenue
FROM ev
GROUP BY cohort_month, activity_month;`,
    ordered: false,
  },
  {
    id: 'd20261113_a3', level: 'advanced', added: '2026-11-13', source: "PracHub", company: "",
    ref: "Build 30-day retention cohort table", url: "https://prachub.com/interview-questions/build-30-day-retention-cohort-table",
    title: "שימור ביום 30 לפי חודש הרשמה", tables: ["d1113_companies"],
    prompt: "בטבלה d1113_companies יש חברות שנרשמו לשירות (signup_date) ואולי ביטלו (termination_date, ריק אם לא ביטלו). חברה נחשבת ששמרה על מנוי ביום 30 אם לא ביטלה כלל, או שתאריך הביטול שלה הוא לפחות 30 ימים אחרי תאריך ההרשמה. לכל חודש הרשמה (YYYY-MM, העמודה signup_month) החזירו: מספר החברות שנרשמו (companies), כמה מהן שמרו על מנוי ביום 30 (retained) ואחוז השימור מעוגן לשתי ספרות אחרי הנקודה (retention_pct, ערך בין 0 ל-100).",
    solution: `SELECT strftime('%Y-%m', signup_date) AS signup_month, COUNT(*) AS companies,
       SUM(CASE WHEN termination_date IS NULL OR termination_date >= date(signup_date, '+30 days') THEN 1 ELSE 0 END) AS retained,
       ROUND(100.0 * SUM(CASE WHEN termination_date IS NULL OR termination_date >= date(signup_date, '+30 days') THEN 1 ELSE 0 END) / COUNT(*), 2) AS retention_pct
FROM d1113_companies
GROUP BY signup_month;`,
    ordered: false,
  },
  {
    id: 'd20261113_a4', level: 'advanced', added: '2026-11-13', source: "Dataford", company: "",
    ref: "Write a SQL query to find the monthly recurring revenue (MRR) for a given cohort of customers over a 12 month period", url: "https://dataford.io/questions/write-a-sql-query-to-find-the-monthly-recurring-revenue-mrr-for-a-given-cohort-of-customers-over-a-12-month-period",
    title: "הכנסה חוזרת לפי קוהורט וחודש מההצטרפות", tables: ["d1113_mrr"],
    prompt: "בטבלה d1113_mrr יש לכל לקוח את ההכנסה החודשית החוזרת שלו (mrr) בחודשים שבהם יש לו שורה (month בפורמט YYYY-MM). חודש ההצטרפות של לקוח הוא החודש הראשון שבו ה-mrr שלו גדול מ-0, והקוהורט שלו הוא חודש ההצטרפות. התייחסו רק לשורות מחודש ההצטרפות ואילך. לכל קוהורט ולכל מרחק בחודשים מחודש ההצטרפות (month_offset, 0 הוא חודש ההצטרפות) שבו יש שורות, החזירו: cohort_month, month_offset, total_mrr (סכום ה-mrr של לקוחות הקוהורט) ו-pct_of_initial, סכום זה באחוזים מסכום הקוהורט בחודש 0, מעוגן לשתי ספרות אחרי הנקודה.",
    solution: `WITH j AS (
  SELECT customer_id, MIN(month) AS cohort_month FROM d1113_mrr WHERE mrr > 0 GROUP BY customer_id
), m AS (
  SELECT j.cohort_month,
         (CAST(substr(r.month, 1, 4) AS INTEGER) * 12 + CAST(substr(r.month, 6, 2) AS INTEGER))
         - (CAST(substr(j.cohort_month, 1, 4) AS INTEGER) * 12 + CAST(substr(j.cohort_month, 6, 2) AS INTEGER)) AS month_offset,
         r.mrr
  FROM d1113_mrr r JOIN j ON j.customer_id = r.customer_id
  WHERE r.month >= j.cohort_month
), t AS (
  SELECT cohort_month, month_offset, SUM(mrr) AS total_mrr FROM m GROUP BY cohort_month, month_offset
)
SELECT cohort_month, month_offset, total_mrr,
       ROUND(100.0 * total_mrr / (SELECT total_mrr FROM t t0 WHERE t0.cohort_month = t.cohort_month AND t0.month_offset = 0), 2) AS pct_of_initial
FROM t;`,
    ordered: false,
  },
  {
    id: 'd20261113_a5', level: 'advanced', added: '2026-11-13', source: "מקורי", company: "",
    ref: "", url: "",
    title: "רצפי ימי עבודה של נהגים", tables: ["d1113_online_days"],
    prompt: "בטבלה d1113_online_days יש ימים שבהם נהג בשירות הסעות היה מחובר (ייתכנו שורות כפולות לאותו יום). רצף הוא קבוצת ימים קלנדריים עוקבים ללא הפסקה. החזירו כל רצף של 3 ימים או יותר: driver_id, start_day (היום הראשון), end_day (היום האחרון) ו-days (מספר הימים השונים ברצף).",
    solution: `SELECT driver_id, MIN(day) AS start_day, MAX(day) AS end_day, COUNT(*) AS days FROM (
  SELECT driver_id, day, julianday(day) - ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY day) AS grp
  FROM (SELECT DISTINCT driver_id, day FROM d1113_online_days)
)
GROUP BY driver_id, grp
HAVING COUNT(*) >= 3;`,
    ordered: false,
  },
  {
    id: 'd20261114_b1', level: 'basic', added: '2026-11-14', source: 'DataVidhya', company: 'LinkedIn',
    ref: 'Duplicate Job Listing Detection', url: 'https://datavidhya.com/coding-problems/questionDetails/question/aggregation-duplicate-job-listings/',
    title: 'משרות כפולות לפי חברה וכותרת', tables: ['d1114_jobs'],
    prompt: 'בטבלה d1114_jobs מופיעות משרות שפורסמו על ידי חברות. משרות של אותה חברה עם אותה כותרת (title) ואותו תיאור (description) נחשבות כפולות. החזירו לכל קבוצה כזו שמכילה יותר ממשרה אחת את העמודות company_id, title ו-duplicate_count (מספר המשרות בקבוצה). מיינו לפי duplicate_count מהגבוה לנמוך, ובשוויון לפי company_id ולאחר מכן לפי title בסדר עולה.',
    solution: `SELECT company_id, title, COUNT(*) AS duplicate_count FROM d1114_jobs GROUP BY company_id, title, description HAVING COUNT(*) > 1 ORDER BY duplicate_count DESC, company_id, title;`,
    ordered: true,
  },
  {
    id: 'd20261114_b2', level: 'basic', added: '2026-11-14', source: 'HackerRank', company: '',
    ref: 'Employee Salaries', url: 'https://www.hackerrank.com/challenges/salary-of-employees',
    title: 'עובדים לפי שכר וותק', tables: ['d1114_emp'],
    prompt: 'בטבלה d1114_emp יש לכל עובד שכר חודשי (salary) ומספר חודשי עבודה (months). החזירו את שמות (name) העובדים ששכרם החודשי גבוה מ-2000 ושעבדו פחות מ-10 חודשים. מיינו לפי emp_id בסדר עולה (העמודה emp_id עצמה לא מוצגת).',
    solution: `SELECT name FROM d1114_emp WHERE salary > 2000 AND months < 10 ORDER BY emp_id;`,
    ordered: true,
  },
  {
    id: 'd20261114_b3', level: 'basic', added: '2026-11-14', source: 'DataLemur', company: 'Capital One',
    ref: 'Identify Most Active Credit Card Users', url: 'https://datalemur.com/blog/capital-one-sql-interview-questions',
    title: 'כרטיסי האשראי הפעילים ביותר באוקטובר', tables: ['d1114_card_tx'],
    prompt: 'בטבלה d1114_card_tx יש עסקאות בכרטיסי אשראי עם חותמת זמן (tx_ts). ספרו לכל כרטיס את מספר העסקאות שבוצעו באוקטובר 2026 (כולל כל היום האחרון של החודש), והחזירו את הכרטיסים עם המספר הגבוה ביותר, כולל כל הכרטיסים שחולקים את המקסימום. העמודות: card_id, tx_count.',
    solution: `SELECT card_id, COUNT(*) AS tx_count FROM d1114_card_tx WHERE tx_ts >= '2026-10-01' AND tx_ts < '2026-11-01' GROUP BY card_id HAVING COUNT(*) = (SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM d1114_card_tx WHERE tx_ts >= '2026-10-01' AND tx_ts < '2026-11-01' GROUP BY card_id));`,
    ordered: false,
  },
  {
    id: 'd20261114_b4', level: 'basic', added: '2026-11-14', source: 'DataLemur', company: 'Dropbox',
    ref: 'Filter Active Dropbox Users', url: 'https://datalemur.com/blog/dropbox-sql-interview-questions',
    title: 'משתמשים פעילים בתוכנית בתשלום', tables: ['d1114_accounts'],
    prompt: 'בטבלה d1114_accounts יש חשבונות אחסון בענן עם תוכנית (plan), סטטוס (status) ותאריך העלאה אחרון (last_upload_at, עשוי להיות NULL אם לא הועלה קובץ מעולם). החזירו את user_id ו-plan של חשבונות בסטטוס active, בתוכנית שאינה free, שהעלו קובץ לפחות פעם אחת, והעלאתם האחרונה בוצעה ב-1 באוקטובר 2026 או אחריו.',
    solution: `SELECT user_id, plan FROM d1114_accounts WHERE status = 'active' AND plan <> 'free' AND last_upload_at IS NOT NULL AND last_upload_at >= '2026-10-01';`,
    ordered: false,
  },
  {
    id: 'd20261114_b5', level: 'basic', added: '2026-11-14', source: 'מקורי', company: '',
    ref: '', url: '',
    title: 'פילוח בדיקות סוכר בדם', tables: ['d1114_labs'],
    prompt: 'בטבלה d1114_labs יש תוצאות בדיקות מעבדה (result עשוי להיות NULL כשהתוצאה חסרה). עבור בדיקות Glucose בלבד, סווגו כל תוצאה לרמה: missing אם אין תוצאה, low אם התוצאה קטנה מ-70, normal אם היא לפחות 70 וקטנה מ-100, ו-high אם היא 100 ומעלה. החזירו לכל רמה שמופיעה בנתונים את העמודות band ו-tests (מספר הבדיקות).',
    solution: `SELECT CASE WHEN result IS NULL THEN 'missing' WHEN result < 70 THEN 'low' WHEN result < 100 THEN 'normal' ELSE 'high' END AS band, COUNT(*) AS tests FROM d1114_labs WHERE test_name = 'Glucose' GROUP BY band;`,
    ordered: false,
  },
  {
    id: 'd20261114_i1', level: 'intermediate', added: '2026-11-14', source: 'PracHub', company: 'LinkedIn',
    ref: 'SQL Job Ad Metrics With Applicant Filter', url: 'https://prachub.com/interview-questions/sql-job-ad-metrics-with-applicant-filter',
    title: 'מדדי משרות ללא מועמדים שרק הגישו', tables: ['d1114_job_activity'],
    prompt: 'בטבלה d1114_job_activity כל שורה היא פעולה של מועמד על משרה: צפייה (view) או הגשת מועמדות (apply). התעלמו לחלוטין ממועמדים שהגישו מועמדות אך מעולם לא צפו באף משרה. לכל משרה החזירו: job_id, total_activities (מספר הפעולות של המועמדים שנותרו), unique_viewers (מספר המועמדים השונים שצפו) ו-unique_appliers (מספר המועמדים השונים שהגישו).',
    solution: `SELECT job_id, COUNT(*) AS total_activities, COUNT(DISTINCT CASE WHEN activity_type = 'view' THEN candidate_id END) AS unique_viewers, COUNT(DISTINCT CASE WHEN activity_type = 'apply' THEN candidate_id END) AS unique_appliers FROM d1114_job_activity WHERE candidate_id IN (SELECT candidate_id FROM d1114_job_activity WHERE activity_type = 'view') GROUP BY job_id;`,
    ordered: false,
  },
  {
    id: 'd20261114_i2', level: 'intermediate', added: '2026-11-14', source: 'PracHub', company: 'Upstart',
    ref: 'Write Monthly Touches and Last Touch SQL', url: 'https://prachub.com/coding-questions/write-monthly-touches-and-last-touch-sql',
    title: 'ממוצע נקודות מגע לחברה בחודש', tables: ['d1114_touches', 'd1114_conversions'],
    prompt: 'בטבלה d1114_touches יש נקודות מגע שיווקיות עם חברות פוטנציאליות, ובטבלה d1114_conversions יש לכל חברה שהומרה ללקוחה את מועד ההמרה (converted_at). ספרו רק נקודות מגע שהתרחשו עד מועד ההמרה כולל (לחברה שלא הומרה סופרים את כל נקודות המגע). לכל חודש קלנדרי שמופיע בנתונים (בפורמט YYYY-MM) החזירו: month ו-avg_touches, שהוא מספר נקודות המגע בחודש חלקי מספר החברות השונות שהייתה להן נקודת מגע בחודש, מעוגל ל-2 ספרות אחרי הנקודה.',
    solution: `SELECT substr(t.touched_at, 1, 7) AS month, ROUND(1.0 * COUNT(*) / COUNT(DISTINCT t.company_id), 2) AS avg_touches FROM d1114_touches t LEFT JOIN d1114_conversions c ON c.company_id = t.company_id WHERE c.converted_at IS NULL OR t.touched_at <= c.converted_at GROUP BY substr(t.touched_at, 1, 7);`,
    ordered: false,
  },
  {
    id: 'd20261114_i3', level: 'intermediate', added: '2026-11-14', source: 'Dataford', company: '',
    ref: 'Write a SQL query to find users who churned and came back', url: 'https://dataford.io/questions/write-a-sql-query-to-find-users-who-churned-and-came-back',
    title: 'משתמשים שנטשו וחזרו', tables: ['d1114_logins'],
    prompt: 'בטבלה d1114_logins יש כניסות של משתמשים (ייתכנו כמה כניסות באותו יום). נאמר שמשתמש "נטש וחזר" כשבין שני ימי כניסה עוקבים שלו עברו יותר מ-30 ימים. החזירו לכל משתמש שנטש וחזר לפחות פעם אחת את user_id ואת returns (מספר הפעמים שנטש וחזר).',
    solution: `SELECT user_id, COUNT(*) AS returns FROM (SELECT user_id, login_date, LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date) AS prev_date FROM (SELECT DISTINCT user_id, login_date FROM d1114_logins)) WHERE julianday(login_date) - julianday(prev_date) > 30 GROUP BY user_id;`,
    ordered: false,
  },
  {
    id: 'd20261114_i4', level: 'intermediate', added: '2026-11-14', source: 'Dataford', company: 'Omada Health',
    ref: 'Write a query to calculate the rolling 7 day retention rate of Omada Health members after their initial enrollment date', url: 'https://dataford.io/questions/write-a-query-to-calculate-the-rolling-7-day-retention-rate-of-omada-health-members-after-their-initial-enrollment-date',
    title: 'שימור 7 ימים אחרי הרשמה', tables: ['d1114_members', 'd1114_member_activity'],
    prompt: 'בטבלה d1114_members יש מועד הרשמה (enrolled_on) לכל חבר בתוכנית בריאות, ובטבלה d1114_member_activity יש ימי פעילות שלו. חבר נחשב משומר אם הייתה לו לפחות פעילות אחת בין היום שאחרי ההרשמה ועד 7 ימים אחרי ההרשמה (כולל). לכל תאריך הרשמה החזירו: enrolled_on, members (מספר החברים שנרשמו בו), retained (מספר החברים המשומרים) ו-retention_pct (אחוז המשומרים, מעוגל ל-2 ספרות אחרי הנקודה).',
    solution: `SELECT m.enrolled_on, COUNT(*) AS members, SUM(CASE WHEN EXISTS (SELECT 1 FROM d1114_member_activity a WHERE a.member_id = m.member_id AND a.activity_date > m.enrolled_on AND a.activity_date <= date(m.enrolled_on, '+7 days')) THEN 1 ELSE 0 END) AS retained, ROUND(100.0 * SUM(CASE WHEN EXISTS (SELECT 1 FROM d1114_member_activity a WHERE a.member_id = m.member_id AND a.activity_date > m.enrolled_on AND a.activity_date <= date(m.enrolled_on, '+7 days')) THEN 1 ELSE 0 END) / COUNT(*), 2) AS retention_pct FROM d1114_members m GROUP BY m.enrolled_on;`,
    ordered: false,
  },
  {
    id: 'd20261114_i5', level: 'intermediate', added: '2026-11-14', source: 'HackerRank', company: '',
    ref: 'Contest Leaderboard', url: 'https://www.hackerrank.com/challenges/contest-leaderboard',
    title: 'לוח תוצאות של תחרות תכנות', tables: ['d1114_hackers', 'd1114_subs'],
    prompt: 'בטבלה d1114_subs יש הגשות של משתתפי תחרות, עם ציון לכל הגשה (ייתכנו כמה הגשות של אותו משתתף לאותו אתגר). הציון של משתתף באתגר הוא הציון הגבוה ביותר שקיבל באתגר זה, והציון הכולל הוא סכום הציונים בכל האתגרים. החזירו hacker_id, name ו-total_score עבור משתתפים שהציון הכולל שלהם גדול מ-0. מיינו לפי total_score מהגבוה לנמוך, ובשוויון לפי hacker_id בסדר עולה.',
    solution: `SELECT h.hacker_id, h.name, SUM(b.best) AS total_score FROM d1114_hackers h JOIN (SELECT hacker_id, challenge_id, MAX(score) AS best FROM d1114_subs GROUP BY hacker_id, challenge_id) b ON b.hacker_id = h.hacker_id GROUP BY h.hacker_id, h.name HAVING SUM(b.best) > 0 ORDER BY total_score DESC, h.hacker_id;`,
    ordered: true,
  },
  {
    id: 'd20261114_a1', level: 'advanced', added: '2026-11-14', source: 'DataLemur', company: 'Snowflake',
    ref: 'Marketing Touch Streak', url: 'https://datalemur.com/questions/marketing-touch-streak',
    title: 'אנשי קשר עם רצף נקודות מגע', tables: ['d1114_crm'],
    prompt: 'בטבלה d1114_crm יש נקודות מגע שיווקיות עם אנשי קשר (touch_type הוא למשל email, webinar או trial_request). שבוע מוגדר מיום שני עד יום ראשון. החזירו את contact_id של אנשי קשר שמתקיימים בהם שני התנאים: היו להם נקודות מגע ב-3 שבועות עוקבים לפחות (גם אם חצו שנה), ויש להם לפחות נקודת מגע אחת מסוג trial_request. כל איש קשר יופיע פעם אחת.',
    solution: `WITH w AS (SELECT DISTINCT contact_id, date(touch_date, 'weekday 0', '-6 days') AS wk FROM d1114_crm), g AS (SELECT contact_id, wk, julianday(wk) - 7 * ROW_NUMBER() OVER (PARTITION BY contact_id ORDER BY wk) AS grp FROM w), s AS (SELECT contact_id FROM g GROUP BY contact_id, grp HAVING COUNT(*) >= 3) SELECT DISTINCT contact_id FROM s WHERE contact_id IN (SELECT contact_id FROM d1114_crm WHERE touch_type = 'trial_request');`,
    ordered: false,
  },
  {
    id: 'd20261114_a2', level: 'advanced', added: '2026-11-14', source: 'PracHub', company: 'Chime',
    ref: 'Write rolling window SQL over weekly cohorts', url: 'https://prachub.com/coding-questions/write-rolling-window-sql-over-weekly-cohorts',
    title: 'הכנסה שבועית, סכום נע ורכישה שנייה', tables: ['d1114_purchases'],
    prompt: 'בטבלה d1114_purchases יש רכישות של משתמשים. שבוע מתחיל ביום שני. לכל משתמש ולכל שבוע שבו ביצע רכישה החזירו: week_start (תאריך יום שני של השבוע), user_id, weekly_revenue (סכום הרכישות בשבוע), rolling_4w_revenue (סכום ההכנסות של המשתמש בשבוע הזה ובשלושת השבועות הקלנדריים שלפניו, שבועות ללא רכישות תורמים 0) ו-days_to_second_purchase (מספר הימים בין הרכישה הראשונה לשנייה של המשתמש בכלל הנתונים, לפי תאריך ואז לפי purchase_id; NULL אם יש לו פחות משתי רכישות).',
    solution: `WITH w AS (SELECT user_id, date(purchase_date, 'weekday 0', '-6 days') AS wk, SUM(amount) AS rev FROM d1114_purchases GROUP BY user_id, date(purchase_date, 'weekday 0', '-6 days')), r AS (SELECT user_id, purchase_date, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY purchase_date, purchase_id) AS rn FROM d1114_purchases) SELECT w.wk AS week_start, w.user_id, w.rev AS weekly_revenue, (SELECT SUM(w2.rev) FROM w w2 WHERE w2.user_id = w.user_id AND w2.wk BETWEEN date(w.wk, '-21 days') AND w.wk) AS rolling_4w_revenue, (SELECT CAST(julianday(MAX(CASE WHEN rn = 2 THEN purchase_date END)) - julianday(MAX(CASE WHEN rn = 1 THEN purchase_date END)) AS INTEGER) FROM r WHERE r.user_id = w.user_id) AS days_to_second_purchase FROM w;`,
    ordered: false,
  },
  {
    id: 'd20261114_a3', level: 'advanced', added: '2026-11-14', source: 'PracHub', company: 'Apple',
    ref: 'Detect Sessions and Gaps Using SQL LEAD', url: 'https://prachub.com/interview-questions/detect-sessions-and-gaps-using-sql-lead',
    title: 'חלוקת אירועים לסשנים', tables: ['d1114_events'],
    prompt: 'בטבלה d1114_events יש אירועי שימוש של משתמשים עם חותמת זמן. אירוע חדש של אותו משתמש פותח סשן חדש אם עברו יותר מ-30 דקות (יותר מ-1800 שניות בדיוק) מהאירוע הקודם שלו; אחרת הוא שייך לאותו סשן. החזירו לכל סשן: user_id, session_no (מספר הסשן של המשתמש, מתחיל ב-1 לפי סדר הזמן), session_start (זמן האירוע הראשון), session_end (זמן האירוע האחרון) ו-events (מספר האירועים).',
    solution: `WITH x AS (SELECT user_id, event_ts, CASE WHEN LAG(event_ts) OVER (PARTITION BY user_id ORDER BY event_ts) IS NULL OR CAST(strftime('%s', event_ts) AS INTEGER) - CAST(strftime('%s', LAG(event_ts) OVER (PARTITION BY user_id ORDER BY event_ts)) AS INTEGER) > 1800 THEN 1 ELSE 0 END AS ns FROM d1114_events), y AS (SELECT user_id, event_ts, SUM(ns) OVER (PARTITION BY user_id ORDER BY event_ts) AS sn FROM x) SELECT user_id, sn AS session_no, MIN(event_ts) AS session_start, MAX(event_ts) AS session_end, COUNT(*) AS events FROM y GROUP BY user_id, sn;`,
    ordered: false,
  },
  {
    id: 'd20261114_a4', level: 'advanced', added: '2026-11-14', source: 'Dataford', company: '',
    ref: 'Rolling churn with window functions', url: 'https://dataford.io/questions/rolling-churn-with-window-functions',
    title: 'שיעור נטישה חודשי וממוצע נע', tables: ['d1114_sub_months'],
    prompt: 'בטבלה d1114_sub_months יש שורה לכל לקוח ולכל חודש (בפורמט YYYY-MM) שבו היה מנוי פעיל. לקוח "נטש" בחודש מסוים אם היה פעיל בחודש הקודם ואינו פעיל בחודש הזה (לקוח שחוזר אחרי הפסקה אינו נספר כנוטש שוב עד שיעזוב שוב). עבור כל חודש שיש לו חודש קודם בנתונים החזירו: month, churned (מספר הנוטשים), prev_active (מספר הפעילים בחודש הקודם), churn_pct (churned חלקי prev_active באחוזים, מעוגל ל-2 ספרות) ו-rolling_3m_churn_pct (ממוצע שיעורי הנטישה, ללא עיגול ביניים, של החודש הזה ושני החודשים שלפניו שמופיעים בתוצאה, או פחות מהם אם אין, מעוגל ל-2 ספרות).',
    solution: `WITH a AS (SELECT month, COUNT(*) AS n FROM d1114_sub_months GROUP BY month), c AS (SELECT strftime('%Y-%m', date(p.month || '-01', '+1 month')) AS month, COUNT(*) AS churned FROM d1114_sub_months p WHERE NOT EXISTS (SELECT 1 FROM d1114_sub_months q WHERE q.customer_id = p.customer_id AND q.month = strftime('%Y-%m', date(p.month || '-01', '+1 month'))) GROUP BY 1), r AS (SELECT a2.month, COALESCE(c.churned, 0) AS churned, a1.n AS prev_active, 1.0 * COALESCE(c.churned, 0) / a1.n AS rate FROM a a2 JOIN a a1 ON a1.month = strftime('%Y-%m', date(a2.month || '-01', '-1 month')) LEFT JOIN c ON c.month = a2.month) SELECT month, churned, prev_active, ROUND(100 * rate, 2) AS churn_pct, ROUND(100 * AVG(rate) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_3m_churn_pct FROM r;`,
    ordered: false,
  },
  {
    id: 'd20261114_a5', level: 'advanced', added: '2026-11-14', source: 'PracHub', company: 'Upstart',
    ref: 'Write Monthly Touches and Last Touch SQL (last touch before conversion)', url: 'https://prachub.com/coding-questions/write-monthly-touches-and-last-touch-sql',
    title: 'נקודת המגע האחרונה לפני המרה', tables: ['d1114_touches', 'd1114_conversions'],
    prompt: 'בטבלאות d1114_touches ו-d1114_conversions (נקודות מגע שיווקיות ומועדי המרה של חברות) מצאו לכל חברה שהומרה את נקודת המגע האחרונה שהתרחשה עד מועד ההמרה כולל; אם כמה נקודות מגע חולקות את אותה חותמת זמן, נבחרת זו עם touch_id הגבוה ביותר. החזירו: company_id, channel, campaign ו-same_day (1 אם נקודת המגע התרחשה באותו יום קלנדרי של ההמרה, אחרת 0). לחברה שלא הייתה לה נקודת מגע עד ההמרה החזירו NULL בשלוש העמודות האחרונות.',
    solution: `WITH r AS (SELECT c.company_id, c.converted_at, t.channel, t.campaign, t.touched_at, ROW_NUMBER() OVER (PARTITION BY c.company_id ORDER BY t.touched_at DESC, t.touch_id DESC) AS rn FROM d1114_conversions c LEFT JOIN d1114_touches t ON t.company_id = c.company_id AND t.touched_at <= c.converted_at) SELECT company_id, channel, campaign, CASE WHEN touched_at IS NULL THEN NULL WHEN date(touched_at) = date(converted_at) THEN 1 ELSE 0 END AS same_day FROM r WHERE rn = 1;`,
    ordered: false,
  },
];

QUESTIONS.push(...QUESTIONS_DAILY);
