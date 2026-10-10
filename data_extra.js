// טבלאות נוספות לשאלות שמבוססות על מקורות ציבוריים (DataLemur, LeetCode, StrataScratch).
// הנתונים נכתבו מחדש ואינם הנתונים המקוריים.

const SEED_SQL_EXTRA = `
-- ===== DataLemur =====
CREATE TABLE tweets (tweet_id INTEGER, user_id INTEGER, msg TEXT, tweet_date TEXT);
INSERT INTO tweets VALUES
 (1,101,'Happy new year soon','2021-12-30 10:00:00'),(2,101,'Back to work','2022-01-03 09:12:00'),
 (3,101,'SQL is fun','2022-03-15 18:40:00'),(4,102,'First tweet!','2022-02-01 12:00:00'),
 (5,103,'Coffee time','2022-04-11 08:05:00'),(6,103,'Shipping a feature','2022-06-21 16:30:00'),
 (7,104,'Hello world','2022-01-20 11:00:00'),(8,104,'Window functions rock','2022-05-05 14:22:00'),
 (9,104,'Weekend','2022-07-09 10:10:00'),(10,105,'Data data data','2022-12-31 23:59:00'),
 (11,106,'Old account','2021-06-01 07:00:00'),(12,105,'Too early','2023-01-01 00:01:00');

CREATE TABLE candidates (candidate_id INTEGER, skill TEXT);
INSERT INTO candidates VALUES
 (123,'Python'),(123,'Tableau'),(123,'PostgreSQL'),(234,'R'),(234,'PowerBI'),(234,'SQL Server'),
 (345,'Python'),(345,'Tableau'),(456,'Python'),(456,'Tableau'),(456,'PostgreSQL'),(456,'Excel'),
 (567,'PostgreSQL'),(567,'Python');

CREATE TABLE pages (page_id INTEGER, page_name TEXT);
INSERT INTO pages VALUES (20001,'SQL Solutions'),(20045,'Brain Exercises'),(20701,'Tips for Data Analysts'),
 (31111,'Postgres Crash Course'),(32728,'Break the thread');
CREATE TABLE page_likes (user_id INTEGER, page_id INTEGER, liked_date TEXT);
INSERT INTO page_likes VALUES (111,20001,'2022-04-08'),(121,20045,'2022-03-12'),(156,20001,'2022-07-25'),
 (255,20045,'2022-07-19'),(125,20001,'2022-07-19'),(144,31111,'2022-06-21'),(125,31111,'2022-07-04');

CREATE TABLE parts_assembly (part TEXT, finish_date TEXT, assembly_step INTEGER);
INSERT INTO parts_assembly VALUES ('bumper','2022-01-01',1),('bumper','2022-01-02',2),('bumper',NULL,3),
 ('bumper',NULL,4),('engine','2022-01-01',1),('engine','2022-01-03',2),('engine','2022-01-05',3),
 ('door','2022-01-02',1),('door',NULL,2),('mirror','2022-01-04',1);

CREATE TABLE viewership (user_id INTEGER, device_type TEXT, view_time TEXT);
INSERT INTO viewership VALUES (123,'tablet','2022-01-02 16:00:00'),(125,'laptop','2022-01-07 16:00:00'),
 (128,'laptop','2022-02-09 16:00:00'),(129,'phone','2022-02-09 16:00:00'),(145,'tablet','2022-02-24 16:00:00'),
 (150,'laptop','2022-03-01 10:00:00'),(151,'phone','2022-03-02 21:00:00'),(152,'phone','2022-03-05 22:00:00');

CREATE TABLE fb_posts (user_id INTEGER, post_id INTEGER, post_content TEXT, post_date TEXT);
INSERT INTO fb_posts VALUES (151,1,'Need a hug','2021-07-10 12:00:00'),(661,2,'Class then work','2021-07-29 13:00:00'),
 (151,3,'Lunch time','2021-08-15 09:30:00'),(661,4,'Gym','2021-07-01 08:00:00'),(423,5,'Just one post','2021-05-05 10:00:00'),
 (151,6,'Happy holidays','2021-12-20 20:00:00'),(777,7,'Last year','2020-12-31 10:00:00'),(777,8,'This year','2021-02-01 10:00:00'),
 (888,9,'Hello','2021-03-03 03:00:00'),(888,10,'Again','2022-01-15 08:00:00');

CREATE TABLE ms_messages (message_id INTEGER, sender_id INTEGER, receiver_id INTEGER, content TEXT, sent_date TEXT);
INSERT INTO ms_messages VALUES (1,3601,4500,'You up?','2022-08-03 00:00:00'),(2,4500,3601,'Yep','2022-08-03 00:01:00'),
 (3,3601,4500,'Lunch?','2022-08-05 11:00:00'),(4,2520,3601,'Meeting moved','2022-08-07 09:00:00'),
 (5,3601,2520,'Thanks','2022-08-07 09:05:00'),(6,4500,2520,'Got it','2022-08-10 10:00:00'),
 (7,4500,1000,'Hi','2022-08-15 15:00:00'),(8,3601,1000,'Review please','2022-08-20 17:00:00'),
 (9,2520,4500,'Weekly report','2022-08-28 08:00:00'),(10,1000,3601,'Done','2022-08-30 12:00:00'),
 (11,2520,3601,'July note 1','2022-07-10 10:00:00'),(12,2520,3601,'July note 2','2022-07-11 10:00:00'),
 (13,2520,3601,'July note 3','2022-07-12 10:00:00'),(14,2520,4500,'Sept note','2022-09-01 10:00:00');

CREATE TABLE job_listings (job_id INTEGER, company_id INTEGER, title TEXT, description TEXT);
INSERT INTO job_listings VALUES (248,827,'Business Analyst','Analyze data'),(149,845,'Business Analyst','Analyze data'),
 (945,345,'Data Analyst','Dashboards'),(164,345,'Data Analyst','Dashboards'),(172,244,'Data Engineer','Pipelines'),
 (573,244,'Data Engineer','Pipelines'),(324,244,'Data Engineer','Pipelines and Spark'),(890,827,'Data Scientist','Models'),
 (891,827,'Data Scientist','Models v2');

CREATE TABLE rh_users (user_id INTEGER, city TEXT, email TEXT, signup_date TEXT);
INSERT INTO rh_users VALUES (111,'San Francisco','rrok10@gmail.com','2021-08-03'),(148,'Boston','sailor9820@gmail.com','2021-08-20'),
 (178,'San Francisco','potterfan182@gmail.com','2022-01-05'),(265,'Denver','shadower@hotmail.com','2022-02-26'),
 (300,'San Francisco','cowboy1122@hotmail.com','2022-06-30'),(301,'Boston','bos301@mail.com','2022-07-01'),
 (302,'Chicago','chi302@mail.com','2022-07-02');
CREATE TABLE rh_trades (order_id INTEGER, user_id INTEGER, quantity INTEGER, status TEXT, trade_date TEXT, price REAL);
INSERT INTO rh_trades VALUES (100101,111,10,'Cancelled','2022-08-17 12:00:00',9.80),(100102,111,10,'Completed','2022-08-17 12:00:00',10.00),
 (100259,148,35,'Completed','2022-08-25 12:00:00',5.10),(100264,148,40,'Completed','2022-08-26 12:00:00',4.80),
 (100305,300,15,'Completed','2022-09-05 12:00:00',10.00),(100400,178,32,'Completed','2022-09-17 12:00:00',12.00),
 (100565,265,2,'Completed','2022-09-27 12:00:00',8.70),(100566,265,3,'Cancelled','2022-09-28 12:00:00',8.70),
 (100567,265,4,'Completed','2022-09-29 13:00:00',8.90),(100600,302,5,'Completed','2022-09-29 12:00:00',3.00),
 (100601,301,5,'Cancelled','2022-09-30 12:00:00',3.00),(100700,111,1,'Completed','2022-10-01 10:00:00',11.00),
 (100701,301,7,'Completed','2022-10-02 10:00:00',3.50);

CREATE TABLE amz_reviews (review_id INTEGER, user_id INTEGER, submit_date TEXT, product_id INTEGER, stars INTEGER);
INSERT INTO amz_reviews VALUES (6171,123,'2022-06-08 00:00:00',50001,4),(7802,265,'2022-06-10 00:00:00',69852,4),
 (5293,362,'2022-06-18 00:00:00',50001,3),(6352,192,'2022-07-26 00:00:00',69852,3),(4517,981,'2022-07-05 00:00:00',69852,2),
 (4600,111,'2022-07-14 00:00:00',50001,5),(4601,112,'2022-07-20 00:00:00',50001,4),(4602,113,'2022-08-02 00:00:00',69852,5);

CREATE TABLE faang_department (department_id INTEGER, department_name TEXT);
INSERT INTO faang_department VALUES (1,'Data Analytics'),(2,'Data Science');
CREATE TABLE faang_employee (employee_id INTEGER, name TEXT, salary INTEGER, department_id INTEGER, manager_id INTEGER);
INSERT INTO faang_employee VALUES (1,'Emma Thompson',3800,1,NULL),(2,'Daniel Rodriguez',2230,1,10),(3,'Olivia Smith',8000,1,8),
 (4,'Noah Johnson',6800,2,8),(5,'Sophia Martinez',1750,1,10),(8,'William Davis',7000,2,NULL),(10,'James Anderson',4000,1,NULL),
 (11,'Liam Brown',4500,2,8),(12,'Ava Wilson',5200,1,10),(13,'Mia Garcia',5200,1,10);

CREATE TABLE pp_transactions (transaction_id INTEGER, account_id INTEGER, amount REAL, transaction_type TEXT);
INSERT INTO pp_transactions VALUES (123,101,10.00,'Deposit'),(124,101,20.00,'Deposit'),(125,101,5.00,'Withdrawal'),
 (126,201,20.00,'Deposit'),(128,201,10.00,'Withdrawal'),(129,301,50.00,'Deposit'),(130,301,75.50,'Withdrawal');

CREATE TABLE app_events (app_id INTEGER, event_type TEXT, event_timestamp TEXT);
INSERT INTO app_events VALUES (123,'impression','2022-07-18 11:36:12'),(123,'impression','2022-07-18 11:37:12'),
 (123,'click','2022-07-18 11:37:42'),(234,'impression','2022-07-18 14:15:12'),(234,'click','2022-07-18 14:16:12'),
 (123,'impression','2022-08-01 09:00:00'),(123,'click','2022-08-01 09:01:00'),(234,'impression','2022-09-01 10:00:00'),
 (345,'impression','2022-10-10 10:00:00'),(345,'click','2021-12-31 23:00:00'),(234,'click','2023-01-02 10:00:00');

CREATE TABLE tt_emails (email_id INTEGER, user_id INTEGER, signup_date TEXT);
INSERT INTO tt_emails VALUES (125,7771,'2022-06-14 00:00:00'),(433,1052,'2022-07-09 00:00:00'),
 (234,6900,'2022-08-01 00:00:00'),(301,5500,'2022-08-10 00:00:00');
CREATE TABLE tt_texts (text_id INTEGER, email_id INTEGER, signup_action TEXT, action_date TEXT);
INSERT INTO tt_texts VALUES (6878,125,'Confirmed','2022-06-14 00:00:00'),(6997,433,'Not Confirmed','2022-07-09 00:00:00'),
 (7000,433,'Confirmed','2022-07-10 00:00:00'),(7100,234,'Not Confirmed','2022-08-01 00:00:00'),
 (7101,234,'Not Confirmed','2022-08-02 00:00:00'),(7200,301,'Not Confirmed','2022-08-10 00:00:00'),
 (7201,301,'Confirmed','2022-08-12 00:00:00');

CREATE TABLE ibm_employees (employee_id INTEGER, full_name TEXT, gender TEXT);
INSERT INTO ibm_employees VALUES (226,'Adam Ross','Male'),(227,'Sara Lee','Female'),(228,'Mark Chen','Male'),
 (229,'Lina Park','Female'),(230,'Omar Haddad','Male'),(231,'Ruth Klein','Female');
CREATE TABLE ibm_queries (employee_id INTEGER, query_id INTEGER, query_starttime TEXT, execution_time INTEGER);
INSERT INTO ibm_queries VALUES (226,856987,'2023-07-01 01:04:43',2698),(226,286115,'2023-07-01 01:04:43',2705),
 (226,856987,'2023-07-02 05:00:00',100),(227,1,'2023-08-01 10:00:00',30),(227,2,'2023-08-02 10:00:00',40),
 (227,3,'2023-09-30 23:00:00',50),(228,4,'2023-06-30 10:00:00',20),(229,10,'2023-07-15 10:00:00',10),
 (230,11,'2023-09-01 10:00:00',10),(230,12,'2023-09-02 10:00:00',10),(229,13,'2023-10-01 00:00:00',10);

CREATE TABLE monthly_cards_issued (card_name TEXT, issued_amount INTEGER, issue_month INTEGER, issue_year INTEGER);
INSERT INTO monthly_cards_issued VALUES ('Chase Freedom Flex',55000,1,2021),('Chase Freedom Flex',60000,2,2021),
 ('Chase Freedom Flex',65000,3,2021),('Chase Freedom Flex',70000,4,2021),('Chase Sapphire Reserve',170000,1,2021),
 ('Chase Sapphire Reserve',175000,2,2021),('Chase Sapphire Reserve',180000,3,2021),('Chase Sapphire Reserve',140000,4,2021),
 ('Chase Slate',30000,4,2021),('Chase Slate',21000,3,2021),('Chase Slate',26000,5,2021);

CREATE TABLE items_per_order (item_count INTEGER, order_occurrences INTEGER);
INSERT INTO items_per_order VALUES (1,500),(2,1000),(3,800),(4,1000),(5,300);

CREATE TABLE pharmacy_sales (product_id INTEGER, units_sold INTEGER, total_sales REAL, cogs REAL, manufacturer TEXT, drug TEXT);
INSERT INTO pharmacy_sales VALUES (9,37410,293452.54,208876.01,'Eli Lilly','Zyprexa'),(34,94698,600997.19,521182.16,'AstraZeneca','Surmontil'),
 (61,77023,500101.61,419174.97,'Biogen','Varicose Relief'),(136,144814,1084258.00,1006447.73,'Biogen','Burkhart'),
 (20,10000,100000.00,150000.00,'Eli Lilly','Humalog Mix'),(21,5000,40000.00,52000.00,'Biogen','Neuro Rx'),
 (22,8000,90000.00,99500.00,'Biogen','Calm Plus'),(23,12000,2500000.00,1200000.00,'AstraZeneca','Breathe Easy'),
 (24,3000,30000.00,31000.00,'AstraZeneca','Nexi'),(25,60000,1500000.00,900000.00,'Eli Lilly','Glucofix');

CREATE TABLE callers (policy_holder_id INTEGER, case_id TEXT, call_category TEXT, call_date TEXT, call_duration_secs INTEGER);
INSERT INTO callers VALUES (1,'f1','billing','2023-01-05 10:00:00',120),(1,'f2','claims','2023-01-09 11:00:00',400),
 (1,'f3','n/a','2023-02-20 09:00:00',310),(2,'f4','benefits','2023-01-15 14:00:00',200),(2,'f5',NULL,'2023-03-01 08:00:00',600),
 (3,'f6','claims','2023-02-01 10:00:00',350),(3,'f7','claims','2023-02-05 10:00:00',90),(3,'f8','billing','2023-02-28 10:00:00',100),
 (3,'f9','billing','2023-03-20 10:00:00',500),(4,'f10','benefits','2023-03-10 10:00:00',305),(4,'f11','n/a','2023-03-14 10:00:00',60),
 (5,'f12','billing','2023-01-30 10:00:00',700);

CREATE TABLE uber_transactions (user_id INTEGER, spend REAL, transaction_date TEXT);
INSERT INTO uber_transactions VALUES (111,100.50,'2022-01-08 12:00:00'),(111,55.00,'2022-01-10 12:00:00'),
 (121,36.00,'2022-01-18 12:00:00'),(145,24.99,'2022-01-26 12:00:00'),(111,89.60,'2022-02-05 12:00:00'),
 (145,45.00,'2022-03-01 10:00:00'),(145,19.90,'2022-03-15 10:00:00'),(145,70.00,'2022-04-01 10:00:00'),
 (121,12.00,'2022-04-02 10:00:00');

CREATE TABLE spree_transactions (user_id INTEGER, amount REAL, transaction_date TEXT);
INSERT INTO spree_transactions VALUES (1,9.99,'2022-08-01 10:00:00'),(1,55.00,'2022-08-17 10:00:00'),
 (2,149.50,'2022-08-05 10:00:00'),(2,4.89,'2022-08-06 10:00:00'),(2,34.00,'2022-08-07 10:00:00'),
 (3,10.00,'2022-08-10 10:00:00'),(3,12.00,'2022-08-11 10:00:00'),(3,7.00,'2022-08-11 18:00:00'),(3,20.00,'2022-08-13 10:00:00'),
 (4,5.00,'2022-08-20 09:00:00'),(4,6.00,'2022-08-21 09:00:00'),(4,7.00,'2022-08-22 09:00:00'),(4,8.00,'2022-08-23 09:00:00');

CREATE TABLE snap_age_breakdown (user_id INTEGER, age_bucket TEXT);
INSERT INTO snap_age_breakdown VALUES (123,'31-35'),(456,'26-30'),(789,'21-25'),(321,'26-30');
CREATE TABLE snap_activities (activity_id INTEGER, user_id INTEGER, activity_type TEXT, time_spent REAL, activity_date TEXT);
INSERT INTO snap_activities VALUES (7274,123,'open',4.50,'2022-06-22'),(2425,123,'send',3.50,'2022-06-22'),
 (1413,456,'send',5.67,'2022-06-23'),(1414,789,'chat',11.00,'2022-06-25'),(2536,456,'open',3.00,'2022-06-25'),
 (2537,789,'send',2.00,'2022-06-26'),(2538,789,'open',8.00,'2022-06-26'),(2539,321,'open',2.33,'2022-06-27'),
 (2540,321,'send',1.00,'2022-06-27');

CREATE TABLE tweet_counts (user_id INTEGER, tweet_date TEXT, tweet_count INTEGER);
INSERT INTO tweet_counts VALUES (111,'2022-06-01',2),(111,'2022-06-02',1),(111,'2022-06-03',3),(111,'2022-06-04',4),
 (111,'2022-06-05',1),(111,'2022-06-06',5),(254,'2022-06-01',0),(254,'2022-06-02',2),(254,'2022-06-03',1),(254,'2022-06-04',3);

CREATE TABLE product_spend (category TEXT, product TEXT, user_id INTEGER, spend REAL, transaction_date TEXT);
INSERT INTO product_spend VALUES ('appliance','refrigerator',165,246.00,'2022-12-26 12:00:00'),
 ('appliance','refrigerator',123,299.99,'2022-03-02 12:00:00'),('appliance','washing machine',123,219.80,'2022-03-02 12:00:00'),
 ('appliance','microwave',150,50.00,'2022-05-01 12:00:00'),('appliance','microwave',151,30.00,'2022-06-01 12:00:00'),
 ('appliance','washing machine',160,400.00,'2021-11-01 12:00:00'),('electronics','vacuum',178,152.00,'2022-04-05 12:00:00'),
 ('electronics','wireless headset',156,249.90,'2022-07-08 12:00:00'),('electronics','vacuum',145,189.00,'2022-07-15 12:00:00'),
 ('electronics','tablet',145,500.00,'2021-07-15 12:00:00'),('electronics','tablet',146,100.00,'2022-08-15 12:00:00');

CREATE TABLE songs_history (history_id INTEGER, user_id INTEGER, song_id INTEGER, song_plays INTEGER);
INSERT INTO songs_history VALUES (10011,777,1238,11),(12452,695,4520,1),(12453,777,9630,3);
CREATE TABLE songs_weekly (user_id INTEGER, song_id INTEGER, listen_time TEXT);
INSERT INTO songs_weekly VALUES (777,1238,'2022-08-01 12:00:00'),(695,4520,'2022-08-04 08:00:00'),
 (125,9630,'2022-08-04 16:00:00'),(695,9852,'2022-08-07 12:00:00'),(777,9630,'2022-08-02 10:00:00'),
 (777,9630,'2022-08-03 10:00:00');

CREATE TABLE ms_products (product_id INTEGER, product_category TEXT, product_name TEXT);
INSERT INTO ms_products VALUES (1,'Analytics','Azure Databricks'),(2,'Analytics','Azure Stream Analytics'),
 (4,'Containers','Azure Kubernetes Service'),(5,'Containers','Azure Service Fabric'),(6,'Compute','Virtual Machines'),
 (7,'Compute','Azure Functions');
CREATE TABLE ms_customer_contracts (customer_id INTEGER, product_id INTEGER, amount INTEGER);
INSERT INTO ms_customer_contracts VALUES (1,1,1000),(1,6,2000),(1,5,1500),(2,2,3000),(2,6,2000),(3,1,1100),
 (3,4,1000),(3,7,1500),(4,1,1000),(4,2,1000),(4,4,500);

CREATE TABLE measurements (measurement_id INTEGER, measurement_value REAL, measurement_time TEXT);
INSERT INTO measurements VALUES (131233,1109.51,'2022-07-10 09:00:00'),(135211,1662.74,'2022-07-10 11:00:00'),
 (523542,1246.24,'2022-07-10 13:15:00'),(143562,1124.50,'2022-07-10 15:00:00'),(346462,1234.14,'2022-07-11 16:45:00'),
 (124245,1252.62,'2022-07-11 15:00:00'),(124246,1500.00,'2022-07-11 09:00:00');

CREATE TABLE zomato_orders (order_id INTEGER, item TEXT);
INSERT INTO zomato_orders VALUES (1,'Chow Mein'),(2,'Pizza'),(3,'Pad Thai'),(4,'Butter Chicken'),(5,'Eggrolls'),
 (6,'Burger'),(7,'Tandoori Chicken');

CREATE TABLE stock_prices (date TEXT, ticker TEXT, open REAL, high REAL, low REAL, close REAL);
INSERT INTO stock_prices VALUES
 ('2023-01-31','AAPL',142.28,144.34,141.00,144.29),('2023-02-28','AAPL',146.83,149.08,146.83,147.41),
 ('2023-03-31','AAPL',162.44,165.00,161.91,164.90),('2023-04-28','AAPL',168.49,169.85,167.88,169.68),
 ('2023-01-31','MSFT',243.08,247.95,242.95,247.81),('2023-02-28','MSFT',250.76,252.82,249.68,249.42),
 ('2023-03-31','MSFT',283.73,289.27,283.00,288.30),('2023-04-28','MSFT',275.00,309.00,274.50,307.26),
 ('2023-01-31','NFLX',353.86,354.88,349.00,353.86),('2023-02-28','NFLX',322.00,324.70,318.00,322.13),
 ('2023-03-31','NFLX',310.00,346.00,309.00,345.48),('2023-04-28','NFLX',330.00,331.00,325.00,329.93);

CREATE TABLE amz_order_lines (order_id INTEGER, product_name TEXT, category TEXT, quantity INTEGER);
INSERT INTO amz_order_lines VALUES (1,'Kindle','Electronics',3),(2,'Echo Dot','Electronics',5),(3,'Kindle','Electronics',4),
 (4,'Fire TV','Electronics',2),(5,'Yoga Mat','Sports',6),(6,'Dumbbells','Sports',4),(7,'Dumbbells','Sports',3),
 (8,'Notebook','Office',10),(9,'Stapler','Office',2),(10,'Pens','Office',10);

CREATE TABLE wm_user_transactions (product_id INTEGER, user_id INTEGER, spend REAL, transaction_date TEXT);
INSERT INTO wm_user_transactions VALUES (3673,123,68.90,'2022-07-08 12:00:00'),(9623,123,274.10,'2022-07-08 12:00:00'),
 (1467,115,19.90,'2022-07-08 12:00:00'),(2513,159,25.00,'2022-07-08 12:00:00'),(1452,159,74.50,'2022-07-10 12:00:00'),
 (1453,115,15.00,'2022-07-12 10:00:00'),(1454,115,20.00,'2022-07-12 10:00:00'),(1455,115,30.00,'2022-07-12 18:00:00');

CREATE TABLE vz_phone_info (caller_id INTEGER, country_id TEXT, network TEXT, phone_number TEXT);
INSERT INTO vz_phone_info VALUES (1,'US','Verizon','+1-212-897-1964'),(2,'US','Verizon','+1-703-555-9844'),
 (3,'US','Verizon','+1-212-897-1965'),(4,'US','Verizon','+1-703-555-9845'),(5,'IN','Vodafone','+91-7503-907302'),
 (6,'IN','Vodafone','+91-2287-664895'),(7,'IL','Partner','+972-50-1234567');
CREATE TABLE vz_phone_calls (caller_id INTEGER, receiver_id INTEGER, call_time TEXT);
INSERT INTO vz_phone_calls VALUES (1,2,'2022-07-04 10:13:49'),(1,5,'2022-08-21 23:54:56'),(5,1,'2022-05-13 17:24:06'),
 (5,6,'2022-03-18 12:11:49'),(3,7,'2022-04-01 10:00:00'),(7,4,'2022-04-02 10:00:00'),(2,3,'2022-04-03 10:00:00'),
 (6,5,'2022-04-04 10:00:00');

CREATE TABLE fb_user_actions (user_id INTEGER, event_id INTEGER, event_type TEXT, event_date TEXT);
INSERT INTO fb_user_actions VALUES (445,1,'sign-in','2022-05-31 12:00:00'),(445,2,'like','2022-06-05 12:00:00'),
 (445,3,'comment','2022-07-02 12:00:00'),(648,4,'like','2022-06-18 12:00:00'),(648,5,'comment','2022-07-03 12:00:00'),
 (742,6,'sign-in','2022-06-01 08:00:00'),(123,7,'like','2022-07-10 09:00:00'),(999,8,'comment','2022-05-20 10:00:00'),
 (999,9,'like','2022-07-20 10:00:00'),(445,10,'like','2022-07-15 12:00:00');

CREATE TABLE wf_user_transactions (transaction_id INTEGER, product_id INTEGER, spend REAL, transaction_date TEXT);
INSERT INTO wf_user_transactions VALUES (1341,123424,1500.60,'2019-12-31 12:00:00'),(1423,123424,1000.20,'2020-12-31 12:00:00'),
 (1623,123424,1246.44,'2021-12-31 12:00:00'),(1322,123424,2145.32,'2022-12-31 12:00:00'),(1500,234412,1800.00,'2019-06-10 12:00:00'),
 (1501,234412,1234.00,'2020-06-10 12:00:00'),(1502,234412,500.00,'2021-03-10 12:00:00'),(1503,234412,389.50,'2021-09-10 12:00:00'),
 (1504,234412,2900.00,'2022-06-10 12:00:00');

CREATE TABLE inventory (item_id INTEGER, item_type TEXT, item_category TEXT, square_footage REAL);
INSERT INTO inventory VALUES (1374,'prime_eligible','mini refrigerator',68.00),(4245,'not_prime','standing lamp',26.40),
 (2452,'prime_eligible','television',85.00),(3255,'not_prime','side table',22.60),(1672,'prime_eligible','laptop',8.50);

CREATE TABLE search_frequency (searches INTEGER, num_users INTEGER);
INSERT INTO search_frequency VALUES (1,2),(2,2),(3,3),(4,1);

CREATE TABLE advertiser (user_id TEXT, status TEXT);
INSERT INTO advertiser VALUES ('bing','NEW'),('yahoo','NEW'),('alibaba','EXISTING'),('baidu','EXISTING'),
 ('target','CHURN'),('tesla','CHURN'),('morgan','RESURRECT'),('chase','RESURRECT');
CREATE TABLE daily_pay (user_id TEXT, paid REAL);
INSERT INTO daily_pay VALUES ('yahoo',45.00),('alibaba',100.00),('target',13.00),('morgan',600.00),('fitdata',25.00);

CREATE TABLE filed_taxes (filing_id INTEGER, user_id INTEGER, filing_date TEXT, product TEXT);
INSERT INTO filed_taxes VALUES (1,1,'2019-04-14','TurboTax Desktop 2019'),(2,1,'2020-04-13','TurboTax Deluxe'),
 (3,1,'2021-04-15','TurboTax Online'),(4,2,'2019-04-15','TurboTax Online'),(5,2,'2021-04-15','TurboTax Online'),
 (6,2,'2022-04-14','TurboTax Online'),(7,3,'2018-04-15','TurboTax Online'),(8,3,'2019-04-15','TurboTax Online'),
 (9,3,'2020-04-15','QuickBooks Desktop Pro'),(10,3,'2021-04-15','TurboTax Online'),(11,4,'2020-04-15','TurboTax Premier'),
 (12,4,'2021-04-15','TurboTax Premier'),(13,4,'2022-04-15','TurboTax Premier'),(14,4,'2023-04-15','TurboTax Premier');

CREATE TABLE crm_contacts (contact_id INTEGER, email TEXT);
INSERT INTO crm_contacts VALUES (1,'andy.markus@att.net'),(2,'rajan.bhatt@capitalone.com'),(3,'lissa_rogers@jetblue.com'),
 (4,'kevinliu@square.com');
CREATE TABLE marketing_touches (event_id INTEGER, contact_id INTEGER, event_type TEXT, event_date TEXT);
INSERT INTO marketing_touches VALUES (1,1,'webinar','2022-03-08'),(2,1,'trial_request','2022-03-15'),
 (3,1,'conference_registration','2022-03-23'),(4,2,'webinar','2022-03-09'),(5,2,'webinar','2022-03-17'),
 (6,2,'trial_request','2022-04-06'),(7,3,'webinar','2022-03-07'),(8,3,'webinar','2022-03-14'),
 (9,3,'conference_registration','2022-03-21'),(10,4,'trial_request','2022-04-04'),(11,4,'webinar','2022-04-14'),
 (12,4,'webinar','2022-04-24');

CREATE TABLE pizza_toppings (topping_name TEXT, ingredient_cost REAL);
INSERT INTO pizza_toppings VALUES ('Pepperoni',0.50),('Sausage',0.70),('Chicken',0.55),('Extra Cheese',0.40),('Mushrooms',0.30);

CREATE TABLE stripe_transactions (transaction_id INTEGER, merchant_id INTEGER, credit_card_id INTEGER, amount REAL, transaction_timestamp TEXT);
INSERT INTO stripe_transactions VALUES (1,101,1,100,'2022-09-25 12:00:00'),(2,101,1,100,'2022-09-25 12:08:00'),
 (3,101,1,100,'2022-09-25 12:28:00'),(4,102,2,300,'2022-09-25 12:00:00'),(6,102,2,400,'2022-09-25 14:00:00'),
 (7,103,3,50,'2022-09-26 10:00:00'),(8,103,3,50,'2022-09-26 10:10:00'),(9,103,3,50,'2022-09-26 10:15:00');

CREATE TABLE user_logins (user_id INTEGER, login_date TEXT);
INSERT INTO user_logins VALUES (1,'2022-01-05'),(1,'2022-03-10'),(2,'2022-01-07'),(2,'2022-02-03'),(2,'2022-04-11'),
 (3,'2022-02-14'),(3,'2022-03-02'),(3,'2022-04-20'),(4,'2022-01-20'),(4,'2022-04-02'),(5,'2022-03-15'),(1,'2022-03-28');

CREATE TABLE g_employees (emp_id INTEGER, emp_name TEXT, manager_id INTEGER);
INSERT INTO g_employees VALUES (1,'Sundar',NULL),(2,'Prabhakar',1),(3,'Kent',1),(4,'Ruth',1),(5,'Kim',2),(6,'Rishi',2),
 (7,'Lior',3),(8,'Shani',7),(9,'Tom',5),(10,'Ann',4);

CREATE TABLE server_utilization (server_id INTEGER, status_time TEXT, session_status TEXT);
INSERT INTO server_utilization VALUES (1,'2022-08-02 10:00:00','start'),(1,'2022-08-04 10:00:00','stop'),
 (1,'2022-08-13 19:00:00','start'),(1,'2022-08-14 01:00:00','stop'),(2,'2022-08-17 10:00:00','start'),
 (2,'2022-08-24 10:00:00','stop'),(3,'2022-08-24 10:00:00','start'),(3,'2022-08-29 22:00:00','stop');

-- ===== LeetCode SQL 50 =====
CREATE TABLE lc_products (product_id INTEGER, low_fats TEXT, recyclable TEXT);
INSERT INTO lc_products VALUES (0,'Y','N'),(1,'Y','Y'),(2,'N','Y'),(3,'Y','Y'),(4,'N','N');

CREATE TABLE lc_customer (id INTEGER, name TEXT, referee_id INTEGER);
INSERT INTO lc_customer VALUES (1,'Will',NULL),(2,'Jane',NULL),(3,'Alex',2),(4,'Bill',NULL),(5,'Zack',1),(6,'Mark',2);

CREATE TABLE lc_world (name TEXT, continent TEXT, area INTEGER, population INTEGER, gdp INTEGER);
INSERT INTO lc_world VALUES ('Afghanistan','Asia',652230,25500100,20343000000),('Albania','Europe',28748,2831741,12960000000),
 ('Algeria','Africa',2381741,37100000,188681000000),('Andorra','Europe',468,78115,3712000000),
 ('Angola','Africa',1246700,20609294,100990000000),('Brazil','South America',8515767,21400000,1609000000000);

CREATE TABLE lc_views (article_id INTEGER, author_id INTEGER, viewer_id INTEGER, view_date TEXT);
INSERT INTO lc_views VALUES (1,3,5,'2019-08-01'),(1,3,6,'2019-08-02'),(2,7,7,'2019-08-01'),(2,7,6,'2019-08-02'),
 (4,7,1,'2019-07-22'),(3,4,4,'2019-07-21'),(3,4,4,'2019-07-21');

CREATE TABLE lc_tweets (tweet_id INTEGER, content TEXT);
INSERT INTO lc_tweets VALUES (1,'Let us Code'),(2,'More than fifteen chars are here!'),(3,'SQL!'),(4,'Exactly 15 char');

CREATE TABLE lc_employees (id INTEGER, name TEXT);
INSERT INTO lc_employees VALUES (1,'Alice'),(7,'Bob'),(11,'Meir'),(90,'Winston'),(3,'Jonathan');
CREATE TABLE lc_employee_uni (id INTEGER, unique_id INTEGER);
INSERT INTO lc_employee_uni VALUES (3,1),(11,2),(90,3);

CREATE TABLE lc_sales (sale_id INTEGER, product_id INTEGER, year INTEGER, quantity INTEGER, price INTEGER);
INSERT INTO lc_sales VALUES (1,100,2008,10,5000),(2,100,2009,12,5000),(7,200,2011,15,9000),(8,200,2011,4,8800),(9,300,2012,6,700);
CREATE TABLE lc_product (product_id INTEGER, product_name TEXT);
INSERT INTO lc_product VALUES (100,'Nokia'),(200,'Apple'),(300,'Samsung');

CREATE TABLE lc_visits (visit_id INTEGER, customer_id INTEGER);
INSERT INTO lc_visits VALUES (1,23),(2,9),(4,30),(5,54),(6,96),(7,54),(8,54);
CREATE TABLE lc_transactions (transaction_id INTEGER, visit_id INTEGER, amount INTEGER);
INSERT INTO lc_transactions VALUES (2,5,310),(3,5,300),(9,5,200),(12,1,910),(13,2,970);

CREATE TABLE lc_weather (id INTEGER, record_date TEXT, temperature INTEGER);
INSERT INTO lc_weather VALUES (1,'2015-01-01',10),(2,'2015-01-02',25),(3,'2015-01-03',20),(4,'2015-01-04',30),(5,'2015-01-06',35);

CREATE TABLE lc_activity (machine_id INTEGER, process_id INTEGER, activity_type TEXT, timestamp REAL);
INSERT INTO lc_activity VALUES (0,0,'start',0.712),(0,0,'end',1.520),(0,1,'start',3.140),(0,1,'end',4.120),
 (1,0,'start',0.550),(1,0,'end',1.550),(1,1,'start',0.430),(1,1,'end',1.420),(2,0,'start',4.100),(2,0,'end',4.512),
 (2,1,'start',2.500),(2,1,'end',5.000);

CREATE TABLE lc_emp (empId INTEGER, name TEXT, supervisor INTEGER, salary INTEGER);
INSERT INTO lc_emp VALUES (3,'Brad',NULL,4000),(1,'John',3,1000),(2,'Dan',3,2000),(4,'Thomas',3,4000);
CREATE TABLE lc_bonus (empId INTEGER, bonus INTEGER);
INSERT INTO lc_bonus VALUES (2,500),(4,2000);

CREATE TABLE lc_students (student_id INTEGER, student_name TEXT);
INSERT INTO lc_students VALUES (1,'Alice'),(2,'Bob'),(13,'John'),(6,'Alex');
CREATE TABLE lc_subjects (subject_name TEXT);
INSERT INTO lc_subjects VALUES ('Math'),('Physics'),('Programming');
CREATE TABLE lc_examinations (student_id INTEGER, subject_name TEXT);
INSERT INTO lc_examinations VALUES (1,'Math'),(1,'Physics'),(1,'Programming'),(2,'Programming'),(1,'Physics'),(1,'Math'),
 (13,'Math'),(13,'Programming'),(13,'Physics'),(2,'Math'),(1,'Math');

CREATE TABLE lc_employee (id INTEGER, name TEXT, department TEXT, managerId INTEGER);
INSERT INTO lc_employee VALUES (101,'John','A',NULL),(102,'Dan','A',101),(103,'James','A',101),(104,'Amy','A',101),
 (105,'Anne','A',101),(106,'Ron','B',101),(107,'Gil','B',106);

CREATE TABLE lc_signups (user_id INTEGER, time_stamp TEXT);
INSERT INTO lc_signups VALUES (3,'2020-03-21 10:16:13'),(7,'2020-01-04 13:57:59'),(2,'2020-07-29 23:09:44'),(6,'2020-12-09 10:39:37');
CREATE TABLE lc_confirmations (user_id INTEGER, time_stamp TEXT, action TEXT);
INSERT INTO lc_confirmations VALUES (3,'2021-01-06 03:30:46','timeout'),(3,'2021-07-14 14:00:00','timeout'),
 (7,'2021-06-12 11:57:29','confirmed'),(7,'2021-06-13 12:58:28','confirmed'),(7,'2021-06-14 13:59:27','confirmed'),
 (2,'2021-01-22 00:00:00','confirmed'),(2,'2021-02-28 23:59:59','timeout');

CREATE TABLE lc_cinema (id INTEGER, movie TEXT, description TEXT, rating REAL);
INSERT INTO lc_cinema VALUES (1,'War','great 3D',8.9),(2,'Science','fiction',8.5),(3,'irish','boring',6.2),
 (4,'Ice song','Fantacy',8.6),(5,'House card','Interesting',9.1);

CREATE TABLE lc_prices (product_id INTEGER, start_date TEXT, end_date TEXT, price INTEGER);
INSERT INTO lc_prices VALUES (1,'2019-02-17','2019-02-28',5),(1,'2019-03-01','2019-03-22',20),(2,'2019-02-01','2019-02-20',15),
 (2,'2019-02-21','2019-03-31',30),(3,'2019-02-21','2019-03-31',30);
CREATE TABLE lc_units_sold (product_id INTEGER, purchase_date TEXT, units INTEGER);
INSERT INTO lc_units_sold VALUES (1,'2019-02-25',100),(1,'2019-03-01',15),(2,'2019-02-10',200),(2,'2019-03-22',30);

CREATE TABLE lc_project (project_id INTEGER, employee_id INTEGER);
INSERT INTO lc_project VALUES (1,1),(1,2),(1,3),(2,1),(2,4);
CREATE TABLE lc_proj_employee (employee_id INTEGER, name TEXT, experience_years INTEGER);
INSERT INTO lc_proj_employee VALUES (1,'Khaled',3),(2,'Ali',2),(3,'John',1),(4,'Doe',2);

CREATE TABLE lc_users (user_id INTEGER, user_name TEXT);
INSERT INTO lc_users VALUES (6,'Alice'),(2,'Bob'),(7,'Alex');
CREATE TABLE lc_register (contest_id INTEGER, user_id INTEGER);
INSERT INTO lc_register VALUES (215,6),(209,2),(208,2),(210,6),(208,6),(209,7),(209,6),(215,7),(208,7),(210,2),(207,2),(210,7);

CREATE TABLE lc_queries (query_name TEXT, result TEXT, position INTEGER, rating INTEGER);
INSERT INTO lc_queries VALUES ('Dog','Golden Retriever',1,5),('Dog','German Shepherd',2,5),('Dog','Mule',200,1),
 ('Cat','Shirazi',5,2),('Cat','Siamese',3,3),('Cat','Sphynx',7,4);

CREATE TABLE lc_txn (id INTEGER, country TEXT, state TEXT, amount INTEGER, trans_date TEXT);
INSERT INTO lc_txn VALUES (121,'US','approved',1000,'2018-12-18'),(122,'US','declined',2000,'2018-12-19'),
 (123,'US','approved',2000,'2019-01-01'),(124,'DE','approved',2000,'2019-01-07');

CREATE TABLE lc_delivery (delivery_id INTEGER, customer_id INTEGER, order_date TEXT, customer_pref_delivery_date TEXT);
INSERT INTO lc_delivery VALUES (1,1,'2019-08-01','2019-08-02'),(2,2,'2019-08-02','2019-08-02'),(3,1,'2019-08-11','2019-08-12'),
 (4,3,'2019-08-24','2019-08-24'),(5,3,'2019-08-21','2019-08-22'),(6,2,'2019-08-11','2019-08-13'),(7,4,'2019-08-09','2019-08-09');

CREATE TABLE lc_game_activity (player_id INTEGER, device_id INTEGER, event_date TEXT, games_played INTEGER);
INSERT INTO lc_game_activity VALUES (1,2,'2016-03-01',5),(1,2,'2016-03-02',6),(2,3,'2017-06-25',1),(3,1,'2016-03-02',0),(3,4,'2018-07-03',5);

CREATE TABLE lc_teacher (teacher_id INTEGER, subject_id INTEGER, dept_id INTEGER);
INSERT INTO lc_teacher VALUES (1,2,3),(1,2,4),(1,3,3),(2,1,1),(2,2,1),(2,3,1),(2,4,1);

CREATE TABLE lc_user_activity (user_id INTEGER, session_id INTEGER, activity_date TEXT, activity_type TEXT);
INSERT INTO lc_user_activity VALUES (1,1,'2019-07-20','open_session'),(1,1,'2019-07-20','scroll_down'),(1,1,'2019-07-20','end_session'),
 (2,4,'2019-07-20','open_session'),(2,4,'2019-07-21','send_message'),(2,4,'2019-07-21','end_session'),
 (3,2,'2019-07-21','open_session'),(3,2,'2019-07-21','send_message'),(3,2,'2019-07-21','end_session'),
 (4,3,'2019-06-25','open_session'),(4,3,'2019-06-25','end_session');

CREATE TABLE lc_courses (student TEXT, class TEXT);
INSERT INTO lc_courses VALUES ('A','Math'),('B','English'),('C','Math'),('D','Biology'),('E','Math'),('F','Computer'),
 ('G','Math'),('H','Math'),('I','Math');

CREATE TABLE lc_followers (user_id INTEGER, follower_id INTEGER);
INSERT INTO lc_followers VALUES (0,1),(1,0),(2,0),(2,1);

CREATE TABLE lc_my_numbers (num INTEGER);
INSERT INTO lc_my_numbers VALUES (8),(8),(3),(3),(1),(4),(5),(6);

CREATE TABLE lc_customer_purchases (customer_id INTEGER, product_key INTEGER);
INSERT INTO lc_customer_purchases VALUES (1,5),(2,6),(3,5),(3,6),(1,6);
CREATE TABLE lc_product_keys (product_key INTEGER);
INSERT INTO lc_product_keys VALUES (5),(6);

CREATE TABLE lc_users_names (user_id INTEGER, name TEXT);
INSERT INTO lc_users_names VALUES (1,'aLice'),(2,'bOB'),(3,'cHARLIE');

CREATE TABLE lc_patients (patient_id INTEGER, patient_name TEXT, conditions TEXT);
INSERT INTO lc_patients VALUES (1,'Daniel','YFEV COUGH'),(2,'Alice',''),(3,'Bob','DIAB100 MYOP'),(4,'George','ACNE DIAB100'),
 (5,'Alain','DIAB201'),(6,'Eve','SADIAB100');

CREATE TABLE lc_person (id INTEGER, email TEXT);
INSERT INTO lc_person VALUES (1,'john@example.com'),(2,'bob@example.com'),(3,'john@example.com'),(4,'bob@example.com'),(5,'ann@example.com');

CREATE TABLE lc_activities (sell_date TEXT, product TEXT);
INSERT INTO lc_activities VALUES ('2020-05-30','Headphone'),('2020-06-01','Pencil'),('2020-06-02','Mask'),('2020-05-30','Basketball'),
 ('2020-06-01','Bible'),('2020-06-02','Mask'),('2020-05-30','T-Shirt');

CREATE TABLE lc_products2 (product_id INTEGER, product_name TEXT, product_category TEXT);
INSERT INTO lc_products2 VALUES (1,'Leetcode Solutions','Book'),(2,'Jewels of Stringology','Book'),(3,'HP','Laptop'),
 (4,'Lenovo','Laptop'),(5,'Leetcode Kit','T-shirt');
CREATE TABLE lc_orders (product_id INTEGER, order_date TEXT, unit INTEGER);
INSERT INTO lc_orders VALUES (1,'2020-02-05',60),(1,'2020-02-10',70),(2,'2020-01-18',30),(2,'2020-02-11',80),(3,'2020-02-17',2),
 (3,'2020-02-24',3),(4,'2020-03-01',20),(4,'2020-03-04',30),(4,'2020-03-04',60),(5,'2020-02-25',50),(5,'2020-02-27',50),
 (5,'2020-03-01',50);

CREATE TABLE lc_mail_users (user_id INTEGER, name TEXT, mail TEXT);
INSERT INTO lc_mail_users VALUES (1,'Winston','winston@leetcode.com'),(2,'Jonathan','jonathanisgreat'),(3,'Annabelle','bella-@leetcode.com'),
 (4,'Sally','sally.come@leetcode.com'),(5,'Marwan','quarz#2020@leetcode.com'),(6,'David','david69@gmail.com'),
 (7,'Shapiro','.shapo@leetcode.com');

CREATE TABLE lc_staff (employee_id INTEGER, name TEXT, reports_to INTEGER, age INTEGER);
INSERT INTO lc_staff VALUES (9,'Hercy',NULL,43),(6,'Alice',9,41),(4,'Bob',9,36),(2,'Winston',NULL,37),(3,'Dana',2,30),(5,'Eli',2,33);

CREATE TABLE lc_employee_dept (employee_id INTEGER, department_id INTEGER, primary_flag TEXT);
INSERT INTO lc_employee_dept VALUES (1,1,'N'),(2,1,'Y'),(2,2,'N'),(3,3,'N'),(4,2,'N'),(4,3,'Y'),(4,4,'N');

CREATE TABLE lc_triangle (x INTEGER, y INTEGER, z INTEGER);
INSERT INTO lc_triangle VALUES (13,15,30),(10,20,15),(3,4,5),(1,2,3);

CREATE TABLE lc_logs (id INTEGER, num INTEGER);
INSERT INTO lc_logs VALUES (1,1),(2,1),(3,1),(4,2),(5,1),(6,2),(7,2),(8,2),(9,3),(10,3);

CREATE TABLE lc_price_changes (product_id INTEGER, new_price INTEGER, change_date TEXT);
INSERT INTO lc_price_changes VALUES (1,20,'2019-08-14'),(2,50,'2019-08-14'),(1,30,'2019-08-15'),(1,35,'2019-08-16'),
 (2,65,'2019-08-17'),(3,20,'2019-08-18');

CREATE TABLE lc_queue (person_id INTEGER, person_name TEXT, weight INTEGER, turn INTEGER);
INSERT INTO lc_queue VALUES (5,'Alice',250,1),(4,'Bob',175,5),(3,'Alex',350,2),(6,'John Cena',400,3),(1,'Winston',500,6),(2,'Marie',200,4);

CREATE TABLE lc_accounts (account_id INTEGER, income INTEGER);
INSERT INTO lc_accounts VALUES (3,108939),(2,12747),(8,87709),(6,91796);

CREATE TABLE lc_emp_mgr (employee_id INTEGER, name TEXT, manager_id INTEGER, salary INTEGER);
INSERT INTO lc_emp_mgr VALUES (3,'Mila',9,60301),(12,'Antonella',NULL,31000),(13,'Emery',NULL,67084),(1,'Kalel',11,21241),
 (9,'Mikaela',NULL,50937),(11,'Joziah',6,28485);

CREATE TABLE lc_movies (movie_id INTEGER, title TEXT);
INSERT INTO lc_movies VALUES (1,'Avengers'),(2,'Frozen 2'),(3,'Joker');
CREATE TABLE lc_mr_users (user_id INTEGER, name TEXT);
INSERT INTO lc_mr_users VALUES (1,'Daniel'),(2,'Monica'),(3,'Maria'),(4,'James');
CREATE TABLE lc_movie_rating (movie_id INTEGER, user_id INTEGER, rating INTEGER, created_at TEXT);
INSERT INTO lc_movie_rating VALUES (1,1,3,'2020-01-12'),(1,2,4,'2020-02-11'),(1,3,2,'2020-02-12'),(1,4,1,'2020-01-01'),
 (2,1,5,'2020-02-17'),(2,2,2,'2020-02-01'),(2,3,2,'2020-03-01'),(3,1,3,'2020-02-22'),(3,2,4,'2020-02-25');

CREATE TABLE lc_customer_visits (customer_id INTEGER, name TEXT, visited_on TEXT, amount INTEGER);
INSERT INTO lc_customer_visits VALUES (1,'Jhon','2019-01-01',100),(2,'Daniel','2019-01-02',110),(3,'Jade','2019-01-03',120),
 (4,'Khaled','2019-01-04',130),(5,'Winston','2019-01-05',110),(6,'Elvis','2019-01-06',140),(7,'Anna','2019-01-07',150),
 (8,'Maria','2019-01-08',80),(9,'Jaze','2019-01-09',110),(1,'Jhon','2019-01-10',130),(3,'Jade','2019-01-10',150);

CREATE TABLE lc_request_accepted (requester_id INTEGER, accepter_id INTEGER, accept_date TEXT);
INSERT INTO lc_request_accepted VALUES (1,2,'2016-06-03'),(1,3,'2016-06-08'),(2,3,'2016-06-08'),(3,4,'2016-06-09');

CREATE TABLE lc_insurance (pid INTEGER, tiv_2015 REAL, tiv_2016 REAL, lat REAL, lon REAL);
INSERT INTO lc_insurance VALUES (1,10,5,10,10),(2,20,20,20,20),(3,10,30,20,20),(4,10,40,40,40);

-- ===== StrataScratch =====
CREATE TABLE fb_employees (id INTEGER, location TEXT, age INTEGER, gender TEXT, is_senior INTEGER);
INSERT INTO fb_employees VALUES (1,'USA',30,'F',0),(2,'USA',45,'M',1),(3,'UK',41,'F',1),(4,'USA',28,'M',0),
 (5,'India',50,'M',1),(6,'USA',33,'F',0),(7,'Israel',26,'F',0),(8,'USA',38,'M',0);

CREATE TABLE playbook_users (user_id INTEGER, created_at TEXT, company_id INTEGER, language TEXT);
INSERT INTO playbook_users VALUES (1,'2014-01-01',10,'english'),(2,'2014-01-02',10,'english'),(3,'2014-01-03',20,'spanish'),
 (4,'2014-01-04',30,'french'),(5,'2014-01-05',10,'english'),(6,'2014-01-06',20,'spanish');
CREATE TABLE playbook_events (user_id INTEGER, occurred_at TEXT, event_type TEXT, event_name TEXT, location TEXT, device TEXT);
INSERT INTO playbook_events VALUES (1,'2014-06-01 10:00:00','engagement','login','United States','macbook pro'),
 (1,'2014-06-01 10:01:00','engagement','home_page','United States','macbook pro'),
 (2,'2014-06-02 11:00:00','engagement','home_page','United States','macbook pro'),
 (3,'2014-06-02 12:00:00','engagement','login','Spain','iphone 5'),
 (3,'2014-06-03 12:00:00','engagement','home_page','Spain','macbook pro'),
 (4,'2014-06-04 09:00:00','engagement','search_autocomplete','France','macbook pro'),
 (5,'2014-06-04 10:00:00','engagement','login','United Kingdom','macbook pro'),
 (6,'2014-06-05 10:00:00','engagement','login','Spain','dell inspiron notebook'),
 (5,'2014-06-05 11:00:00','engagement','search_run','United Kingdom','lenovo thinkpad'),
 (2,'2014-06-06 08:00:00','engagement','login','Canada','iphone 5');

CREATE TABLE yelp_business (business_id TEXT, name TEXT, city TEXT, stars REAL);
INSERT INTO yelp_business VALUES ('b1','Bellagio Buffet','Las Vegas',5),('b2','Lotus of Siam','Las Vegas',5),
 ('b3','Pizza Rock','Las Vegas',5),('b4','Neon Museum','Las Vegas',5),('b5','Strip Diner','Las Vegas',4),
 ('b6','Pizzeria Bianco','Phoenix',5),('b7','Desert Botanical','Phoenix',5),('b8','Matt Big Breakfast','Phoenix',5),
 ('b9','St Lawrence Market','Toronto',5),('b10','Pai Northern Thai','Toronto',5),('b11','Queen St Cafe','Toronto',3.5),
 ('b12','Price Waterhouse Park','Charlotte',5),('b13','Schwartz Deli','Montreal',4),('b14','Olive et Gourmando','Montreal',4);

CREATE TABLE db_dept (id INTEGER, department TEXT);
INSERT INTO db_dept VALUES (1,'engineering'),(2,'human resource'),(3,'operation'),(4,'marketing');
CREATE TABLE db_employee (id INTEGER, first_name TEXT, last_name TEXT, salary INTEGER, department_id INTEGER);
INSERT INTO db_employee VALUES (10301,'Keith','Morgan',27056,2),(10302,'Tyler','Booth',32199,3),(10303,'Clifford','Nguyen',32165,2),
 (10304,'Mary','Jones',49488,3),(10305,'Melissa','Lucero',27024,3),(10306,'Kevin','Ray',45787,1),(10307,'Dana','Shiff',41200,1),
 (10308,'Ruth','Gal',48187,4),(10309,'Ben','Ross',38000,4),(10310,'Noa','Tal',29000,1);

CREATE TABLE tcs_employee (empl_id INTEGER, empl_name TEXT, salary INTEGER);
INSERT INTO tcs_employee VALUES (1,'Arjun',10000),(2,'Priya',6000),(3,'Rahul',5000),(4,'Sneha',9000),(5,'Vikram',3000),
 (6,'Anita',4000),(7,'Kiran',7000),(8,'Meera',4000);
CREATE TABLE tcs_hierarchy (empl_id INTEGER, manager_empl_id INTEGER);
INSERT INTO tcs_hierarchy VALUES (2,1),(3,1),(5,4),(6,4),(8,7);

CREATE TABLE asana_customers (customer_id INTEGER, customer_name TEXT, empl_id INTEGER);
INSERT INTO asana_customers VALUES (1,'Northwind',101),(2,'Contoso',102),(3,'Fabrikam',101),(4,'Tailspin',103),
 (5,'Wingtip',102),(6,'Litware',101),(7,'Proseware',102),(8,'Adatum',103);

CREATE TABLE sw_routes_2022 (origin TEXT, destination TEXT);
INSERT INTO sw_routes_2022 VALUES ('DAL','HOU'),('DAL','AUS'),('HOU','MSY'),('LAS','PHX');
CREATE TABLE sw_routes_2023 (origin TEXT, destination TEXT);
INSERT INTO sw_routes_2023 VALUES ('DAL','HOU'),('LAS','PHX'),('DEN','LAS'),('DEN','LAS');

CREATE TABLE ca_applicants (applicant_id INTEGER, name TEXT);
INSERT INTO ca_applicants VALUES (1,'Rachel'),(2,'Moshe'),(3,'Noa');
CREATE TABLE ca_loans (loan_id INTEGER, applicant_id INTEGER, amount INTEGER);
INSERT INTO ca_loans VALUES (10,1,5000),(11,1,2500),(12,3,8000),(13,4,1200);
`;
