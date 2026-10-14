// טבלאות לשאלות שנוספות כל יום על ידי המשימה המתוזמנת.
// כל יום מוסיפים בסוף המחרוזת הערה עם התאריך, ואחריה CREATE TABLE ו-INSERT לטבלאות החדשות.
const SEED_SQL_DAILY = `
-- 2026-10-10
CREATE TABLE d1010_rides (ride_id INTEGER, driver_id INTEGER, rider_id INTEGER, region TEXT, city TEXT, ride_date TEXT, fare REAL, rating INTEGER, status TEXT);
INSERT INTO d1010_rides VALUES
(1, 101, 201, 'North', 'Haifa', '2026-08-03', 25, 5, 'completed'),
(2, 101, 202, 'North', 'Haifa', '2026-08-03', 18.5, 4, 'completed'),
(3, 101, 201, 'North', 'Haifa', '2026-08-04', 32, NULL, 'completed'),
(4, 101, 203, 'North', 'Haifa', '2026-09-01', 15, 5, 'completed'),
(5, 101, 204, 'North', 'Haifa', '2026-09-02', NULL, NULL, 'cancelled'),
(6, 102, 201, 'North', 'Haifa', '2026-08-10', 40, 4, 'completed'),
(7, 102, 205, 'North', 'Haifa', '2026-08-11', 21, 3, 'completed'),
(8, 102, 207, 'North', 'Haifa', '2026-09-05', 19, 4, 'completed'),
(9, 102, 206, 'North', 'Haifa', '2026-09-06', NULL, NULL, 'cancelled'),
(10, 103, 202, 'Center', 'Tel Aviv', '2026-08-15', 12, 5, 'completed'),
(11, 103, 203, 'Center', 'Tel Aviv', '2026-08-16', 45, 5, 'completed'),
(12, 103, 201, 'Center', 'Tel Aviv', '2026-09-10', 30, 4, 'completed'),
(13, 103, 201, 'Center', 'Tel Aviv', '2026-09-11', 26, 5, 'completed'),
(14, 103, 201, 'Center', 'Tel Aviv', '2026-09-12', 20.5, 5, 'completed'),
(15, 103, 207, 'Center', 'Tel Aviv', '2026-09-12', 35, 3, 'completed'),
(16, 103, 207, 'Center', 'Tel Aviv', '2026-09-14', NULL, NULL, 'cancelled'),
(17, 104, 208, 'Center', 'Tel Aviv', '2026-08-20', 60, 2, 'completed'),
(18, 104, 208, 'Center', 'Tel Aviv', '2026-08-21', 55, 1, 'completed'),
(19, 104, 202, 'Center', 'Tel Aviv', '2026-09-20', 24, 4, 'completed'),
(20, 104, 203, 'Center', 'Tel Aviv', '2026-09-21', 27, NULL, 'completed'),
(21, 105, 204, 'South', 'Beer Sheva', '2026-07-02', 18, 5, 'completed'),
(22, 105, 204, 'South', 'Beer Sheva', '2026-08-05', 23, 4, 'completed'),
(23, 105, 207, 'South', 'Beer Sheva', '2026-09-15', 31, 4, 'completed'),
(24, 105, 206, 'South', 'Beer Sheva', '2026-09-16', NULL, NULL, 'cancelled'),
(25, 106, 206, 'South', 'Beer Sheva', '2026-08-08', 29, 3, 'completed'),
(26, 106, 207, 'South', 'Beer Sheva', '2026-09-22', 33, 5, 'completed'),
(27, 106, 207, 'South', 'Beer Sheva', '2026-09-23', 36, 5, 'completed'),
(28, 106, 208, 'South', 'Beer Sheva', '2026-09-24', NULL, NULL, 'cancelled'),
(29, 107, 201, 'South', 'Beer Sheva', '2026-06-12', 50, 5, 'completed'),
(30, 107, 202, 'South', 'Beer Sheva', '2026-09-30', 41, 4, 'completed'),
(31, 101, 201, 'North', 'Haifa', '2026-09-03', 27.5, 5, 'completed'),
(32, 101, 201, 'North', 'Haifa', '2026-09-04', 19, 4, 'completed'),
(33, 108, 203, 'North', 'Haifa', '2026-09-07', 20, 4, 'completed'),
(34, 108, 204, 'North', 'Haifa', '2026-09-08', 25, 5, 'completed'),
(35, 109, 203, 'North', 'Haifa', '2026-09-08', 19, 3, 'completed'),
(36, 110, 202, 'North', 'Haifa', '2026-09-09', 5, 4, 'completed'),
(37, 111, 207, 'Center', 'Tel Aviv', '2026-09-10', 10, 5, 'completed'),
(38, 111, 208, 'Center', 'Tel Aviv', '2026-09-11', 10, 4, 'completed');
CREATE TABLE d1010_drivers (driver_id INTEGER, region TEXT, start_date TEXT, end_date TEXT);
INSERT INTO d1010_drivers VALUES
(101, 'North', '2026-01-10', NULL),
(102, 'North', '2026-01-20', '2026-03-01'),
(103, 'Center', '2026-02-01', NULL),
(104, 'Center', '2026-02-15', '2026-09-30'),
(105, 'South', '2026-03-05', '2026-05-20'),
(106, 'South', '2026-03-10', NULL),
(107, 'South', '2026-04-01', '2026-06-30'),
(108, 'North', '2026-05-01', NULL),
(109, 'North', '2026-05-15', '2026-07-10'),
(110, 'North', '2026-06-01', '2026-08-31'),
(111, 'Center', '2026-06-20', NULL);
CREATE TABLE d1010_scores (player TEXT, game TEXT, score INTEGER, played_on TEXT);
INSERT INTO d1010_scores VALUES
('noa', 'tetris', 1200, '2026-09-01'),
('noa', 'tetris', 1500, '2026-09-03'),
('avi', 'tetris', 900, '2026-09-02'),
('dana', 'tetris', 1500, '2026-09-04'),
('noa', 'chess', 15, '2026-09-01'),
('avi', 'chess', 22, '2026-09-02'),
('lior', 'snake', 40, '2026-09-05'),
('lior', 'snake', 55, '2026-09-06'),
('maya', 'snake', 30, '2026-09-06'),
('dana', 'puzzle', 300, '2026-09-07'),
('avi', 'puzzle', 280, '2026-09-08'),
('tal', 'puzzle', 310, '2026-09-08'),
('maya', 'puzzle', 310, '2026-09-09'),
('noa', 'puzzle', 100, '2026-09-10');
CREATE TABLE d1010_subs (sub_id INTEGER, customer TEXT, plan TEXT, mrr INTEGER, started_on TEXT, canceled_on TEXT);
INSERT INTO d1010_subs VALUES
(1, 'acme', 'pro', 50, '2026-01-05', NULL),
(2, 'beta', 'pro', 50, '2026-02-10', '2026-06-01'),
(3, 'cargo', 'basic', 20, '2026-02-15', NULL),
(4, 'delta', 'basic', 20, '2026-03-01', '2026-04-01'),
(5, 'echo', 'basic', 20, '2026-03-20', NULL),
(6, 'fox', 'team', 120, '2026-04-02', '2026-08-15'),
(7, 'gamma', 'team', 120, '2026-04-12', '2026-09-01'),
(8, 'hotel', 'pro', 50, '2026-05-01', NULL),
(9, 'indigo', 'enterprise', 400, '2026-05-20', NULL),
(10, 'juno', 'enterprise', 400, '2026-06-01', NULL);
CREATE TABLE d1010_tree (id INTEGER, p_id INTEGER);
INSERT INTO d1010_tree VALUES (1, NULL), (2, 1), (3, 1), (4, 2), (5, 2), (6, 3), (7, 6), (8, 6);
CREATE TABLE d1010_bank_tx (tx_id INTEGER, tx_ts TEXT, amount REAL);
INSERT INTO d1010_bank_tx VALUES
(1, '2026-09-01 08:15:00', 120.0),
(2, '2026-09-01 17:40:00', -35.5),
(3, '2026-09-01 12:05:00', 60.0),
(4, '2026-09-02 09:00:00', 15.0),
(5, '2026-09-03 23:59:59', -200.0),
(6, '2026-09-03 00:00:01', 500.0),
(7, '2026-09-03 14:30:00', -40.0),
(8, '2026-09-05 10:10:10', 75.25),
(9, '2026-09-05 10:10:11', 10.0);
CREATE TABLE d1010_trip_users (user_id INTEGER, banned TEXT, role TEXT);
INSERT INTO d1010_trip_users VALUES
(1, 'No', 'client'), (2, 'Yes', 'client'), (3, 'No', 'client'), (4, 'No', 'client'),
(11, 'No', 'driver'), (12, 'No', 'driver'), (13, 'Yes', 'driver');
CREATE TABLE d1010_trips (id INTEGER, client_id INTEGER, driver_id INTEGER, status TEXT, request_at TEXT);
INSERT INTO d1010_trips VALUES
(1, 1, 11, 'completed', '2026-09-01'),
(2, 2, 12, 'completed', '2026-09-01'),
(3, 3, 12, 'cancelled_by_driver', '2026-09-01'),
(4, 4, 11, 'completed', '2026-09-01'),
(5, 1, 13, 'cancelled_by_client', '2026-09-02'),
(6, 3, 11, 'completed', '2026-09-02'),
(7, 4, 12, 'completed', '2026-09-02'),
(8, 1, 12, 'cancelled_by_client', '2026-09-03'),
(9, 3, 11, 'cancelled_by_driver', '2026-09-03'),
(10, 2, 11, 'cancelled_by_client', '2026-09-03'),
(11, 4, 11, 'completed', '2026-09-04'),
(12, 1, 11, 'cancelled_by_client', '2026-08-31');
CREATE TABLE d1010_stadium (id INTEGER, visit_date TEXT, people INTEGER);
INSERT INTO d1010_stadium VALUES
(1, '2026-07-01', 80), (2, '2026-07-02', 120), (3, '2026-07-03', 150), (4, '2026-07-04', 60),
(5, '2026-07-06', 100), (6, '2026-07-07', 130), (7, '2026-07-08', 100), (8, '2026-07-12', 250),
(9, '2026-07-13', 99), (10, '2026-07-14', 200), (11, '2026-07-15', 300);
CREATE TABLE d1010_people (name TEXT, occupation TEXT);
INSERT INTO d1010_people VALUES
('Dana', 'Doctor'), ('Avi', 'Doctor'), ('Noa', 'Doctor'),
('Yoni', 'Professor'), ('Ben', 'Professor'),
('Lior', 'Singer'), ('Maya', 'Singer'), ('Tal', 'Singer'), ('Eden', 'Singer'),
('Ori', 'Actor');
-- 2026-10-11
CREATE TABLE d1011_streams (stream_id INTEGER, artist TEXT, track TEXT, seconds_played INTEGER);
INSERT INTO d1011_streams VALUES
(1,'Nova','Aurora',210),(2,'Nova','Aurora',200),(3,'Nova','Drift',180),(4,'Nova','Drift',240),(5,'Nova','Glow',300),
(6,'Echo','Wave',250),(7,'Echo','Wave',260),(8,'Echo','Pulse',190),(9,'Echo','Pulse',220),(10,'Echo','Pulse',230),
(11,'Lumen','Sky',200),(12,'Lumen','Sky',210),(13,'Lumen','Rain',400),(14,'Lumen','Rain',180),
(15,'Vera','One',300),(16,'Vera','One',280),(17,'Vera','Two',320),
(18,'Orbit','Moon',150),(19,'Orbit','Moon',160),(20,'Orbit','Mars',170),
(21,'Pike','Fish',200),(22,'Pike','Fish',210),(23,'Sol','Day',240),(24,'Sol','Night',260);
CREATE TABLE d1011_listings (listing_id INTEGER, host_id INTEGER, n_reviews INTEGER, price INTEGER);
INSERT INTO d1011_listings VALUES
(1,10,0,80),(2,11,3,95),(3,12,5,120),(4,13,6,70),(5,14,15,150),(6,15,16,200),(7,16,22,110),
(8,17,40,90),(9,18,41,300),(10,19,75,250),(11,20,2,60),(12,21,8,130),(13,22,100,180);
CREATE TABLE d1011_tickets (ticket_id INTEGER, category TEXT, priority TEXT, reporter_email TEXT, opened_on TEXT, closed_on TEXT, hours_spent REAL);
INSERT INTO d1011_tickets VALUES
(1,'Billing','High','dana@gmail.com','2026-09-01','2026-09-02',3.5),
(2,'Billing','Low','avi@corp.co.il','2026-09-03','2026-09-10',1.0),
(3,'Billing','High','dana@gmail.com','2026-09-05',NULL,NULL),
(4,'Login','High','noa@startup.io','2026-09-06','2026-09-06',0.5),
(5,'Login','Medium','yoni@gmail.com','2026-09-07','2026-09-09',2.0),
(6,'Login','Low','ben@corp.co.il','2026-09-08',NULL,NULL),
(7,'Login','High','noa@startup.io','2026-09-09','2026-09-10',1.5),
(8,'Export','Medium','lior@uni.ac.il','2026-09-10','2026-09-15',6.0),
(9,'Export','Medium','maya@gmail.com','2026-09-11',NULL,NULL),
(10,'Export','Low','lior@uni.ac.il','2026-09-12','2026-09-13',2.5),
(11,'Mobile','High','tal@mail.net','2026-09-13',NULL,NULL),
(12,'Mobile','Low','eden@gmail.com','2026-09-14','2026-09-20',4.0),
(13,'Billing','Medium','ori@corp.co.il','2026-09-15','2026-09-16',2.0),
(14,'Login','Medium','yoni@gmail.com','2026-09-16',NULL,NULL);
CREATE TABLE d1011_reviews (review_id INTEGER, listing_id INTEGER, submit_date TEXT, stars INTEGER);
INSERT INTO d1011_reviews VALUES
(1,101,'2026-01-05',4),(2,101,'2026-01-20',5),(3,101,'2026-02-03',3),(4,102,'2026-01-11',2),
(5,102,'2026-02-14',4),(6,102,'2026-02-28',5),(7,102,'2026-02-28',4),(8,103,'2026-03-01',5),
(9,101,'2025-12-30',1),(10,103,'2026-03-15',4),(11,103,'2026-03-31',3),(12,101,'2026-03-09',5);
CREATE TABLE d1011_hackers (hacker_id INTEGER, name TEXT);
INSERT INTO d1011_hackers VALUES (1,'Rina'),(2,'Omer'),(3,'Shir'),(4,'Guy'),(5,'Hila'),(6,'Zohar');
CREATE TABLE d1011_submissions (submission_id INTEGER, hacker_id INTEGER, challenge_id INTEGER, score INTEGER);
INSERT INTO d1011_submissions VALUES
(1,1,10,20),(2,1,10,50),(3,1,11,30),(4,2,10,50),(5,2,11,30),(6,2,11,10),(7,3,10,0),
(8,3,11,0),(9,4,12,40),(10,4,12,40),(11,5,10,30),(12,5,12,10),(13,5,12,25);
CREATE TABLE d1011_properties (property_id INTEGER, is_active INTEGER);
INSERT INTO d1011_properties VALUES (1,1),(2,1),(3,0),(4,1),(5,1);
CREATE TABLE d1011_bookings (booking_id INTEGER, property_id INTEGER, checkin TEXT, checkout TEXT);
INSERT INTO d1011_bookings VALUES
(1,1,'2025-03-01','2025-03-09'),(2,1,'2025-12-28','2026-01-05'),(3,2,'2024-12-30','2025-01-03'),
(4,3,'2025-05-01','2025-06-01'),(5,4,'2025-07-01','2025-07-13'),(6,4,'2025-08-01','2025-08-04');
CREATE TABLE d1011_host_reg (host_id INTEGER, registered_on TEXT);
INSERT INTO d1011_host_reg VALUES
(1,'2022-03-01'),(2,'2022-09-15'),
(3,'2023-01-10'),(4,'2023-05-05'),(5,'2023-11-30'),
(6,'2024-02-02'),(7,'2024-04-18'),(8,'2024-08-08'),(9,'2024-12-31'),
(10,'2025-01-01'),(11,'2025-03-03'),(12,'2025-06-06'),(13,'2025-10-10'),
(14,'2026-01-15'),(15,'2026-02-20'),(16,'2026-04-04'),(17,'2026-05-05'),(18,'2026-07-07'),(19,'2026-09-09');
CREATE TABLE d1011_bank_ops (op_id INTEGER, user_id INTEGER, op_time TEXT, op_type TEXT, amount INTEGER);
INSERT INTO d1011_bank_ops VALUES
(1,1,'2026-09-01 10:00:00','withdrawal',100),(2,1,'2026-09-01 10:00:10','withdrawal',100),
(3,2,'2026-09-01 10:00:00','withdrawal',50),(4,2,'2026-09-01 10:00:10','deposit',50),(5,2,'2026-09-01 10:00:20','withdrawal',50),
(6,3,'2026-09-01 11:59:55','withdrawal',200),(7,3,'2026-09-01 12:00:05','withdrawal',200),
(8,4,'2026-09-01 09:00:00','withdrawal',20),(9,4,'2026-09-01 09:00:09','withdrawal',20),(10,4,'2026-09-01 09:00:20','withdrawal',20),
(11,5,'2026-09-01 08:00:00','withdrawal',70),(12,5,'2026-09-02 08:00:10','withdrawal',70),
(13,6,'2026-09-03 13:00:00','withdrawal',30),(14,6,'2026-09-03 13:00:05','withdrawal',30),(15,6,'2026-09-03 13:00:15','withdrawal',30);
CREATE TABLE d1011_logins (user_id INTEGER, login_date TEXT);
INSERT INTO d1011_logins WITH RECURSIVE n(i) AS (SELECT 0 UNION ALL SELECT i+1 FROM n WHERE i<9), r(u,s,l) AS (VALUES (1,'2026-09-01',7),(1,'2026-09-09',3),(2,'2026-09-02',4),(2,'2026-09-07',5),(3,'2026-09-01',4),(3,'2026-09-06',4),(4,'2026-09-10',5),(4,'2026-09-20',7)) SELECT u, date(s, '+' || i || ' day') FROM r JOIN n ON i < l;
INSERT INTO d1011_logins VALUES (2,'2026-09-07');
CREATE TABLE d1011_activity (user_id INTEGER, event_time TEXT);
INSERT INTO d1011_activity VALUES
(1,'2026-09-01 08:00:00'),(1,'2026-09-01 17:30:00'),(1,'2026-09-02 09:00:00'),(1,'2026-09-04 10:00:00'),(1,'2026-09-05 11:00:00'),(1,'2026-09-05 12:00:00'),(1,'2026-09-06 07:00:00'),
(2,'2026-09-01 10:00:00'),(2,'2026-09-03 10:00:00'),(2,'2026-09-05 10:00:00'),
(3,'2026-09-30 23:50:00'),(3,'2026-10-01 00:10:00'),(3,'2026-10-05 12:00:00'),
(4,'2026-09-10 06:00:00'),(4,'2026-09-11 06:00:00'),(4,'2026-09-12 06:00:00'),(4,'2026-09-14 06:00:00'),(4,'2026-09-15 06:00:00');
CREATE TABLE d1011_contests (contest_id INTEGER, hacker_id INTEGER, name TEXT);
INSERT INTO d1011_contests VALUES (101,501,'Ofer'),(102,502,'Tamar'),(103,503,'Yuval'),(104,504,'Keren'),(105,505,'Dvir');
CREATE TABLE d1011_colleges (college_id INTEGER, contest_id INTEGER);
INSERT INTO d1011_colleges VALUES (11,101),(12,101),(13,102),(14,103),(15,104),(16,105),(17,105);
CREATE TABLE d1011_challenges (challenge_id INTEGER, college_id INTEGER);
INSERT INTO d1011_challenges VALUES (21,11),(22,11),(23,12),(24,13),(25,13),(26,14),(27,15),(28,16),(29,16),(30,17);
CREATE TABLE d1011_view_stats (challenge_id INTEGER, total_views INTEGER, total_unique_views INTEGER);
INSERT INTO d1011_view_stats VALUES (21,100,50),(21,40,20),(22,30,10),(24,50,25),(25,0,0),(26,0,0),(28,20,5),(28,10,5);
CREATE TABLE d1011_sub_stats (challenge_id INTEGER, total_submissions INTEGER, total_accepted_submissions INTEGER);
INSERT INTO d1011_sub_stats VALUES (21,10,4),(22,5,2),(23,7,3),(24,12,6),(25,3,0),(26,0,0),(26,0,0),(28,4,1),(29,6,6),(29,1,0);
CREATE TABLE d1011_purchases (purchase_id INTEGER, user_id INTEGER, created_at TEXT, amount REAL, status TEXT);
INSERT INTO d1011_purchases VALUES
(1,1,'2026-01-05',120.0,'completed'),(2,2,'2026-01-20',80.0,'completed'),(3,3,'2026-01-25',50.0,'cancelled'),
(4,1,'2026-02-03',200.0,'completed'),(5,2,'2026-02-14',60.0,'refunded'),(6,4,'2026-02-18',40.5,'completed'),
(7,3,'2026-03-02',150.0,'completed'),(8,1,'2026-03-22',90.0,'completed'),(9,2,'2026-03-28',30.0,'refunded'),
(10,4,'2026-04-10',310.0,'completed'),(11,5,'2026-04-11',25.0,'cancelled'),
(12,1,'2026-05-01',95.0,'completed'),(13,3,'2026-05-19',45.0,'completed'),(14,2,'2026-05-20',20.0,'refunded'),
(15,5,'2026-06-07',260.0,'completed'),(16,4,'2026-06-30',140.0,'completed'),(17,1,'2026-06-30',70.0,'refunded');
CREATE TABLE d1011_pageviews (user_id INTEGER, ts TEXT);
INSERT INTO d1011_pageviews VALUES
(1,'2026-10-01 10:00:00'),(1,'2026-10-01 10:10:00'),(1,'2026-10-01 10:25:00'),(1,'2026-10-01 11:10:00'),(1,'2026-10-01 11:30:00'),
(2,'2026-10-01 09:00:00'),(2,'2026-10-01 09:30:00'),(2,'2026-10-01 10:01:00'),
(3,'2026-10-01 23:50:00'),(3,'2026-10-02 00:10:00'),(3,'2026-10-02 12:00:00');
-- 2026-10-12
CREATE TABLE d1012_bst (n INTEGER, p INTEGER);
INSERT INTO d1012_bst VALUES (1,2),(3,2),(6,8),(9,8),(2,5),(8,5),(5,NULL);
CREATE TABLE d1012_staff (emp_id INTEGER, name TEXT, dept TEXT, salary INTEGER, bonus INTEGER, hire_date TEXT);
INSERT INTO d1012_staff VALUES
(1,'Dana','Sales',9000,500,'2022-03-01'),(2,'Omer','Sales',8000,NULL,'2023-01-15'),(3,'Lior','Sales',7000,1000,'2021-11-20'),
(4,'Noa','Support',6000,NULL,'2024-02-01'),(5,'Itay','Support',6500,200,'2023-06-10'),
(6,'Gal','Dev',15000,2000,'2020-05-05'),(7,'Shir','Dev',14000,NULL,'2021-09-09'),(8,'Eli','Dev',16000,1500,'2019-12-01'),(9,'Maya','Dev',12000,NULL,'2024-07-01'),
(10,'Tal','HR',8000,300,'2022-08-18'),(11,'Rina','HR',7500,NULL,'2023-03-03'),
(12,'Yoav','Ops',9500,NULL,'2021-04-12'),(13,'Hila','Ops',9000,400,'2022-10-10'),(14,'Ben','Ops',8800,NULL,'2023-12-25');
CREATE TABLE d1012_tickets (ticket_id INTEGER, channel TEXT, priority TEXT, opened_at TEXT, closed_at TEXT);
INSERT INTO d1012_tickets VALUES
(1,'email','high','2026-09-01 09:00','2026-09-01 15:00'),(2,'email','low','2026-09-02 10:00',NULL),(3,'email','low','2026-09-03 11:00','2026-09-05 11:00'),
(4,'chat','high','2026-09-04 08:00',NULL),(5,'chat','low','2026-09-04 09:00',NULL),(6,'chat','low','2026-09-05 12:00','2026-09-05 12:30'),(7,'chat','high','2026-09-06 13:00','2026-09-06 14:00'),
(8,'phone','high','2026-09-07 09:00','2026-09-07 09:20'),(9,'phone','low','2026-09-08 09:00','2026-09-08 10:00'),(13,'phone','high','2026-09-09 09:00','2026-09-09 09:45'),
(10,'web','low','2026-09-09 10:00',NULL),(11,'web','high','2026-09-10 10:00',NULL),(12,'web','low','2026-09-11 10:00',NULL);
CREATE TABLE d1012_matches (match_id INTEGER, player TEXT, game TEXT, score INTEGER, played_on TEXT);
INSERT INTO d1012_matches VALUES
(1,'Avi','chess',420,'2026-07-05'),(2,'Avi','chess',510,'2026-08-11'),(3,'Avi','go',NULL,'2026-08-20'),
(4,'Bar','go',300,'2026-06-30'),(5,'Bar','go',350,'2026-07-01'),(6,'Bar','chess',610,'2026-09-30'),
(7,'Gil','chess',700,'2026-10-01'),(8,'Gil','go',200,'2026-09-15'),(12,'Gil','go',NULL,'2026-09-16'),
(9,'Dana','chess',480,'2026-07-22'),(10,'Dana','go',480,'2026-08-02'),(11,'Dana','go',90,'2026-09-12');
CREATE TABLE d1012_shipments (shipment_id INTEGER, carrier TEXT, shipped_on TEXT, delivered_on TEXT);
INSERT INTO d1012_shipments VALUES
(1,'FastGo','2026-09-01','2026-09-03'),(2,'FastGo','2026-09-02','2026-09-09'),(3,'FastGo','2026-09-05',NULL),
(4,'Speedy','2026-09-01','2026-09-02'),(5,'Speedy','2026-09-03','2026-09-04'),(6,'Speedy','2026-09-10','2026-09-15'),
(7,'Roadie','2026-09-01','2026-09-06'),(8,'Roadie','2026-09-07',NULL),(9,'Roadie','2026-09-08','2026-09-14'),(10,'Roadie','2026-09-09','2026-09-11');
CREATE TABLE d1012_seats (id INTEGER, student TEXT);
INSERT INTO d1012_seats VALUES (1,'Abbot'),(2,'Doris'),(3,'Emerson'),(4,'Green'),(5,'Jeames');
CREATE TABLE d1012_friend_accepts (requester_id INTEGER, accepter_id INTEGER, accept_date TEXT);
INSERT INTO d1012_friend_accepts VALUES (1,2,'2026-06-01'),(1,3,'2026-06-02'),(2,3,'2026-06-03'),(3,4,'2026-06-10'),(4,5,'2026-06-11'),(2,4,'2026-06-12');
CREATE TABLE d1012_biz_events (business_id INTEGER, event_type TEXT, occurrences INTEGER);
INSERT INTO d1012_biz_events VALUES
(1,'reviews',7),(3,'reviews',3),(4,'reviews',9),(1,'ads',11),(2,'ads',7),(3,'ads',6),(4,'ads',8),(1,'page views',3),(2,'page views',12),(4,'page views',9);
CREATE TABLE d1012_price_changes (product_id INTEGER, new_price INTEGER, change_date TEXT);
INSERT INTO d1012_price_changes VALUES (1,20,'2026-08-14'),(1,30,'2026-08-20'),(2,50,'2026-08-18'),(3,15,'2026-08-10'),(3,25,'2026-08-16'),(4,5,'2026-07-01'),(4,8,'2026-09-01');
CREATE TABLE d1012_deliveries (delivery_id INTEGER, customer_id INTEGER, order_date TEXT, preferred_date TEXT);
INSERT INTO d1012_deliveries VALUES
(1,1,'2026-09-01','2026-09-01'),(2,1,'2026-09-10','2026-09-12'),
(3,2,'2026-09-02','2026-09-05'),(4,3,'2026-09-03','2026-09-03'),
(5,4,'2026-09-04','2026-09-06'),(6,4,'2026-09-09','2026-09-09'),
(7,5,'2026-09-05','2026-09-05'),(8,6,'2026-09-06','2026-09-08'),(9,7,'2026-09-07','2026-09-10'),(10,7,'2026-09-08','2026-09-08');
CREATE TABLE d1012_ok_days (day TEXT);
INSERT INTO d1012_ok_days VALUES ('2026-08-31'),('2026-09-01'),('2026-09-02'),('2026-09-03'),('2026-09-06'),('2026-09-07'),('2026-09-08'),('2026-09-09'),('2026-09-14');
CREATE TABLE d1012_failed_days (day TEXT);
INSERT INTO d1012_failed_days VALUES ('2026-09-04'),('2026-09-05'),('2026-09-10'),('2026-09-11'),('2026-09-12'),('2026-09-13'),('2026-09-15'),('2026-09-16');
CREATE TABLE d1012_tasks (task_id INTEGER, start_date TEXT, end_date TEXT);
INSERT INTO d1012_tasks VALUES
(1,'2026-10-01','2026-10-02'),(2,'2026-10-02','2026-10-03'),(3,'2026-10-03','2026-10-04'),(4,'2026-10-04','2026-10-05'),
(5,'2026-10-13','2026-10-14'),(6,'2026-10-14','2026-10-15'),
(7,'2026-10-24','2026-10-25'),(8,'2026-10-20','2026-10-21');
CREATE TABLE d1012_bus_queue (person_id INTEGER, person_name TEXT, weight INTEGER, turn INTEGER);
INSERT INTO d1012_bus_queue VALUES (5,'Alice',250,1),(4,'Bob',300,2),(3,'Dina',200,3),(6,'Eitan',250,4),(1,'Fay',120,5),(2,'Gaya',10,6);
CREATE TABLE d1012_user_products (user_id INTEGER, product TEXT);
INSERT INTO d1012_user_products VALUES
(1,'Bread'),(1,'Milk'),(1,'Eggs'),(1,'Milk'),
(2,'Bread'),(2,'Milk'),(2,'Butter'),
(3,'Bread'),(3,'Milk'),(3,'Jam'),(3,'Eggs'),
(4,'Eggs'),(4,'Butter'),
(5,'Bread'),(5,'Butter'),(5,'Jam'),
(6,'Milk'),(6,'Eggs');
CREATE TABLE d1012_city_orders (order_id INTEGER, city TEXT, amount INTEGER);
INSERT INTO d1012_city_orders VALUES
(1,'Haifa',40),(2,'Haifa',15),(3,'Haifa',90),(4,'Haifa',25),(5,'Haifa',60),
(6,'TLV',10),(7,'TLV',20),(8,'TLV',30),(9,'TLV',40),(10,'TLV',50),(11,'TLV',100),
(12,'Eilat',70),(13,'Eilat',70),(14,'Eilat',20),(15,'Eilat',30),(16,'Jerusalem',55);
-- 2026-10-13
CREATE TABLE d1013_station (id INTEGER, city TEXT, state TEXT);
INSERT INTO d1013_station VALUES
(1,'Haifa','North'),(2,'Netanya','Center'),(3,'Eilat','South'),(4,'Netanya','Center'),(5,'Ashdod','South'),
(6,'Haifa','North'),(7,'Tiberias','North'),(8,'Be''er Sheva','South'),(9,'Rehovot','Center'),(10,'Netanya','Center'),
(11,'Safed','North'),(12,'Eilat','South');
CREATE TABLE d1013_game (player_id INTEGER, device_id INTEGER, event_date TEXT, games_played INTEGER);
INSERT INTO d1013_game VALUES
(1,2,'2026-03-05',5),(1,2,'2026-03-01',0),(1,3,'2026-06-25',1),
(2,3,'2026-07-11',6),(2,3,'2026-07-02',2),
(3,1,'2026-05-20',4),(3,4,'2026-05-20',9),(3,1,'2026-05-23',1),
(4,5,'2026-01-09',3);
CREATE TABLE d1013_salaries (emp_id INTEGER, salary INTEGER);
INSERT INTO d1013_salaries VALUES (1,5000),(2,7000),(3,7000),(4,6000),(5,6000),(6,4000),(7,7000);
CREATE TABLE d1013_stocks (stock_name TEXT, operation TEXT, operation_day INTEGER, price INTEGER);
INSERT INTO d1013_stocks VALUES
('Masks','Buy',1,1000),('Books','Buy',2,10),('Masks','Sell',5,1500),('Books','Sell',6,15),
('Masks','Buy',8,1200),('Masks','Sell',12,1100),('Chairs','Buy',3,500),('Chairs','Sell',9,380),
('Lamps','Buy',4,70),('Books','Buy',10,20),('Books','Sell',15,60),('Lamps','Sell',11,90);
CREATE TABLE d1013_movies (movie_id INTEGER, title TEXT, genre TEXT, rating REAL, release_year INTEGER);
INSERT INTO d1013_movies VALUES
(1,'Dawn','Drama',8.1,2019),(2,'Dusk','Drama',7.4,2021),(3,'Chase','Action',6.2,2020),(4,'Blast','Action',NULL,2022),
(5,'Giggle','Comedy',7.0,2018),(6,'Laugh','Comedy',7.6,2023),(7,'Orbit','SciFi',8.8,2024),(8,'Echo','Drama',NULL,2025),
(9,'Raid','Action',5.8,2017),(10,'Nova','SciFi',NULL,2025),(11,'Joke','Comedy',6.4,2016);
CREATE TABLE d1013_students (id INTEGER, name TEXT, marks INTEGER);
INSERT INTO d1013_students VALUES
(1,'Maya',92),(2,'Noam',85),(3,'Lior',67),(4,'Dana',100),(5,'Yossi',45),(6,'Avi',88),(7,'Tal',67),(8,'Rina',23),(9,'Omer',79),(10,'Shir',91),(11,'Ben',59),(12,'Gal',81);
CREATE TABLE d1013_grades (grade INTEGER, min_mark INTEGER, max_mark INTEGER);
INSERT INTO d1013_grades VALUES (1,0,9),(2,10,19),(3,20,29),(4,30,39),(5,40,49),(6,50,59),(7,60,69),(8,70,79),(9,80,89),(10,90,100);
CREATE TABLE d1013_hackers (hacker_id INTEGER, name TEXT);
INSERT INTO d1013_hackers VALUES (10,'Rachel'),(11,'Sam'),(12,'Tamar'),(13,'Uri'),(14,'Vered'),(15,'Wes');
CREATE TABLE d1013_difficulty (difficulty_level INTEGER, max_score INTEGER);
INSERT INTO d1013_difficulty VALUES (1,20),(2,30),(3,40);
CREATE TABLE d1013_chal (challenge_id INTEGER, difficulty_level INTEGER);
INSERT INTO d1013_chal VALUES (100,1),(101,1),(102,2),(103,2),(104,3);
CREATE TABLE d1013_subs (submission_id INTEGER, hacker_id INTEGER, challenge_id INTEGER, score INTEGER);
INSERT INTO d1013_subs VALUES
(1,10,100,20),(2,10,101,20),(3,10,102,30),(4,10,100,20),
(5,11,100,20),(6,11,102,25),(7,11,103,30),(8,11,103,30),
(9,12,104,40),(10,12,100,10),(11,12,102,30),
(12,13,101,20),(13,13,102,5),
(14,14,100,20),(15,14,101,20),(16,14,104,39),
(17,15,103,12);
CREATE TABLE d1013_functions (x INTEGER, y INTEGER);
INSERT INTO d1013_functions VALUES
(20,20),(20,21),(21,20),(22,23),(23,22),(5,9),(7,7),(7,7),(30,31),(31,30),(31,30),(12,3),(3,12),(40,41),(41,42);
CREATE TABLE d1013_users (user_id INTEGER, name TEXT, signup_date TEXT);
INSERT INTO d1013_users VALUES (1,'Ariel','2026-01-10'),(2,'Boaz','2026-02-11'),(3,'Carmel','2026-03-05'),(4,'Dvir','2026-03-20'),(5,'Efrat','2026-04-01'),(6,'Fadi','2026-05-17');
CREATE TABLE d1013_orders (order_id INTEGER, user_id INTEGER, order_date TEXT, amount INTEGER, status TEXT);
INSERT INTO d1013_orders VALUES
(1,1,'2026-02-01',120,'completed'),(2,2,'2026-02-15',80,'cancelled'),(3,2,'2026-03-01',60,'cancelled'),
(4,3,'2026-04-02',200,'completed'),(5,5,'2026-04-10',30,'refunded'),(6,1,'2026-05-05',45,'completed'),(7,4,'2026-06-01',99,'cancelled');
CREATE TABLE d1013_visits (visit_id INTEGER, patient_id INTEGER, clinic TEXT, visit_date TEXT, fee INTEGER, paid INTEGER);
INSERT INTO d1013_visits VALUES
(1,101,'North','2026-09-01',200,1),(2,102,'North','2026-09-02',150,0),(3,103,'North','2026-09-03',300,1),
(4,104,'South','2026-09-01',180,0),(5,105,'South','2026-09-04',220,0),(6,106,'South','2026-09-05',100,1),(7,101,'South','2026-09-09',250,1),
(8,107,'Center','2026-09-02',400,1),(9,108,'Center','2026-09-06',120,0),(10,102,'North','2026-09-12',90,1);
CREATE TABLE d1013_dept (id INTEGER, name TEXT);
INSERT INTO d1013_dept VALUES (1,'IT'),(2,'Sales'),(3,'Legal');
CREATE TABLE d1013_employee (id INTEGER, name TEXT, salary INTEGER, dept_id INTEGER);
INSERT INTO d1013_employee VALUES
(1,'Joe',85000,1),(2,'Henry',80000,2),(3,'Sam',60000,2),(4,'Max',90000,1),(5,'Janet',69000,1),(6,'Randy',85000,1),(7,'Will',70000,1),
(8,'Lea',75000,2),(9,'Nir',75000,2),(10,'Ofra',50000,3),(11,'Pini',50000,3);
CREATE TABLE d1013_scores (id INTEGER, score REAL);
INSERT INTO d1013_scores VALUES (1,3.50),(2,3.65),(3,4.00),(4,3.85),(5,4.00),(6,3.65),(7,2.90);
CREATE TABLE d1013_artists (artist_id INTEGER, artist_name TEXT);
INSERT INTO d1013_artists VALUES (1,'Luna'),(2,'Orion'),(3,'Pax'),(4,'Quill'),(5,'Rue'),(6,'Sol'),(7,'Tide');
CREATE TABLE d1013_songs (song_id INTEGER, artist_id INTEGER, song_name TEXT);
INSERT INTO d1013_songs VALUES (1,1,'L1'),(2,1,'L2'),(3,2,'O1'),(4,3,'P1'),(5,3,'P2'),(6,4,'Q1'),(7,5,'R1'),(8,6,'S1'),(9,7,'T1'),(10,2,'O2');
CREATE TABLE d1013_chart (chart_day TEXT, pos INTEGER, song_id INTEGER);
INSERT INTO d1013_chart VALUES
('2026-09-01',1,1),('2026-09-01',2,3),('2026-09-01',3,4),('2026-09-01',4,2),('2026-09-01',5,6),('2026-09-01',11,9),
('2026-09-02',1,1),('2026-09-02',2,4),('2026-09-02',3,5),('2026-09-02',4,10),('2026-09-02',5,7),('2026-09-02',12,8),
('2026-09-03',1,1),('2026-09-03',2,3),('2026-09-03',3,6),('2026-09-03',4,7),('2026-09-03',5,2),('2026-09-03',15,9),
('2026-09-04',1,2),('2026-09-04',2,4),('2026-09-04',3,3),('2026-09-04',4,8),('2026-09-04',14,6);
CREATE TABLE d1013_plays (play_id INTEGER, song TEXT, country TEXT, play_date TEXT);
INSERT INTO d1013_plays VALUES
(1,'Wave','IL','2026-10-04'),(2,'Wave','IL','2026-10-05'),(3,'Wave','IL','2026-10-10'),(4,'Pulse','IL','2026-10-06'),(5,'Pulse','IL','2026-10-07'),
(6,'Drift','IL','2026-10-08'),(7,'Drift','IL','2026-10-09'),(8,'Haze','IL','2026-10-09'),(9,'Haze','IL','2026-10-10'),(10,'Old','IL','2026-10-03'),
(11,'Old','IL','2026-10-03'),(12,'Old','IL','2026-10-02'),(13,'Neon','IL','2026-10-10'),
(14,'Wave','US','2026-10-05'),(15,'Neon','US','2026-10-05'),(16,'Neon','US','2026-10-06'),(17,'Haze','US','2026-10-07'),(18,'Pulse','US','2026-10-08'),
(19,'Pulse','US','2026-10-08'),(20,'Pulse','US','2026-10-11'),(21,'Drift','US','2026-10-03'),
(22,'Wave','FR','2026-10-06'),(23,'Wave','FR','2026-10-07'),(24,'Neon','FR','2026-10-08');
CREATE TABLE d1013_cinema (seat_id INTEGER, free INTEGER);
INSERT INTO d1013_cinema VALUES (1,1),(2,0),(3,1),(4,1),(5,1),(6,0),(7,1),(9,1),(10,0),(11,1),(12,1),(14,1);

-- 2026-10-14
CREATE TABLE d1014_customer (id INTEGER, name TEXT, referee_id INTEGER);
INSERT INTO d1014_customer VALUES (1,'Will',NULL),(2,'Jane',NULL),(3,'Alex',2),(4,'Bill',NULL),(5,'Zack',1),(6,'Mark',2),(7,'Dana',3),(8,'Omer',2),(9,'Lior',NULL);
CREATE TABLE d1014_nums (num INTEGER);
INSERT INTO d1014_nums VALUES (8),(8),(3),(3),(1),(5),(6),(6),(4);
CREATE TABLE d1014_cust_orders (order_id INTEGER, customer_number INTEGER);
INSERT INTO d1014_cust_orders VALUES (1,3),(2,1),(3,3),(4,2),(5,3),(6,2),(7,3),(8,4);
CREATE TABLE d1014_queries (query_name TEXT, result TEXT, position INTEGER, rating INTEGER);
INSERT INTO d1014_queries VALUES ('Dog','Golden Retriever',1,5),('Dog','German Shepherd',2,5),('Dog','Mule',200,1),('Cat','Shirazi',5,2),('Cat','Siamese',3,3),('Cat','Sphynx',7,4),('Bird','Owl',1,4),('Bird','Eagle',4,2);
CREATE TABLE d1014_fees (txn_id INTEGER, currency TEXT, amount REAL, fee REAL);
INSERT INTO d1014_fees VALUES (1,'USD',100,2.5),(2,'USD',250,NULL),(3,'USD',40,1),(4,'EUR',80,NULL),(5,'EUR',300,4.5),(6,'EUR',20,NULL),(7,'ILS',500,7),(8,'ILS',120,NULL),(9,'USD',60,0);
CREATE TABLE d1014_catalog (product_key INTEGER);
INSERT INTO d1014_catalog VALUES (1),(2),(3);
CREATE TABLE d1014_purchases (customer_id INTEGER, product_key INTEGER);
INSERT INTO d1014_purchases VALUES (1,1),(1,2),(1,3),(2,1),(2,2),(3,1),(3,2),(3,3),(3,1),(4,3);
CREATE TABLE d1014_neighborhoods (neighborhood_id INTEGER, name TEXT);
INSERT INTO d1014_neighborhoods VALUES (1,'Old Town'),(2,'Harbor'),(3,'Hills'),(4,'Market'),(5,'Park');
CREATE TABLE d1014_nb_users (user_id INTEGER, neighborhood_id INTEGER);
INSERT INTO d1014_nb_users VALUES (101,1),(102,1),(103,2),(104,2),(105,2),(106,4),(107,NULL);
CREATE TABLE d1014_emp (employee_id INTEGER, name TEXT, manager_id INTEGER, salary INTEGER);
INSERT INTO d1014_emp VALUES (1,'Kalinda',NULL,40000),(2,'Joziah',11,25000),(3,'Henry',9,12000),(4,'Ayelet',1,20000),(5,'Roi',12,28000),(6,'Neta',1,35000),(7,'Gil',NULL,29000),(8,'Tal',10,31000),(9,'Yoav',6,27000),(13,'Eden',14,30000);
CREATE TABLE d1014_wm_users (user_id INTEGER, primary_address TEXT);
INSERT INTO d1014_wm_users VALUES (1,'A1'),(2,'B1'),(3,'C1'),(4,'D1'),(5,'E1');
CREATE TABLE d1014_wm_txns (txn_id INTEGER, user_id INTEGER, ship_address TEXT);
INSERT INTO d1014_wm_txns VALUES (1,1,'A1'),(2,1,'A1'),(3,1,'A1'),(4,1,'X9'),(5,2,'B1'),(6,2,'Y8'),(7,2,'Y8'),(8,3,'C1'),(9,3,'Z7'),(10,5,'E1'),(11,5,'E1');
CREATE TABLE d1014_models (model_code TEXT, release_year INTEGER, discontinued INTEGER);
INSERT INTO d1014_models VALUES ('M1',2020,0),('M2',2021,0),('M3',2021,1),('M4',2022,0),('M5',2020,0);
CREATE TABLE d1014_gadgets (gadget_id INTEGER, model_code TEXT, price INTEGER, speed INTEGER);
INSERT INTO d1014_gadgets VALUES (1,'M1',50,5),(2,'M2',40,5),(3,'M3',10,5),(4,'M5',45,5),(5,'M4',90,7),(6,'M4',80,7),(7,'M1',70,7),(8,'M2',95,3);
CREATE TABLE d1014_plays (player_id INTEGER, device_id INTEGER, event_date TEXT, games_played INTEGER);
INSERT INTO d1014_plays VALUES (1,1,'2026-03-01',5),(1,1,'2026-03-02',6),(2,2,'2026-06-25',1),(2,2,'2026-07-03',3),(3,3,'2026-03-02',1),(3,4,'2026-03-02',4),(4,5,'2026-02-28',2),(4,5,'2026-03-01',3),(5,6,'2026-01-10',1),(5,6,'2026-01-11',2),(5,6,'2026-01-12',9),(6,7,'2026-05-01',1),(6,7,'2026-05-02',1),(6,7,'2026-05-09',1),(7,8,'2026-04-05',2),(7,8,'2026-04-07',2);
CREATE TABLE d1014_notif_variants (user_id INTEGER, variant TEXT);
INSERT INTO d1014_notif_variants VALUES (1,'control'),(2,'control'),(3,'control'),(4,'test'),(5,'test'),(6,'test'),(7,'test');
CREATE TABLE d1014_notif_events (user_id INTEGER, created_at TEXT, action TEXT);
INSERT INTO d1014_notif_events VALUES
(1,'2026-08-03','login'),(1,'2026-08-10','login'),(1,'2026-09-02','login'),(1,'2026-09-12','nologin'),
(2,'2026-08-05','login'),(2,'2026-08-20','nologin'),(2,'2026-09-03','login'),(2,'2026-09-15','login'),
(3,'2026-08-07','nologin'),(3,'2026-09-09','login'),
(4,'2026-08-04','login'),(4,'2026-08-18','login'),(4,'2026-09-05','nologin'),(4,'2026-09-06','unsubscribe'),
(5,'2026-08-06','login'),(5,'2026-08-21','nologin'),(5,'2026-09-07','nologin'),(5,'2026-09-20','nologin'),
(6,'2026-08-09','nologin'),(6,'2026-09-10','login'),(6,'2026-09-11','unsubscribe'),
(7,'2026-08-12','login'),(7,'2026-09-13','nologin'),(7,'2026-09-14','nologin'),(7,'2026-09-22','unsubscribe');
CREATE TABLE d1014_ppl (id INTEGER, name TEXT);
INSERT INTO d1014_ppl VALUES (1,'Ben'),(2,'Sara'),(3,'Moshe'),(4,'Dana'),(5,'Yael'),(6,'Omri'),(7,'Noa'),(8,'Eli');
CREATE TABLE d1014_ppl_buddy (id INTEGER, buddy_id INTEGER);
INSERT INTO d1014_ppl_buddy VALUES (1,2),(2,3),(3,4),(4,5),(5,1),(6,7),(7,8),(8,6);
CREATE TABLE d1014_ppl_pay (id INTEGER, salary INTEGER);
INSERT INTO d1014_ppl_pay VALUES (1,60),(2,75),(3,70),(4,90),(5,85),(6,50),(7,55),(8,55);
CREATE TABLE d1014_policies (pid INTEGER, tiv_2015 REAL, tiv_2016 REAL, lat REAL, lon REAL);
INSERT INTO d1014_policies VALUES (1,10,5.5,10,10),(2,20,20,20,20),(3,10,30,20,20),(4,10,40,40,40),(5,50,25,30,30),(6,20,15.25,50,50);
CREATE TABLE d1014_clicks (user_id INTEGER, ts TEXT);
INSERT INTO d1014_clicks VALUES
(1,'2026-10-05 09:00:00'),(1,'2026-10-05 09:10:00'),(1,'2026-10-05 09:40:00'),(1,'2026-10-05 10:30:00'),(1,'2026-10-05 10:35:00'),
(2,'2026-10-01 08:00:00'),(2,'2026-10-01 08:31:00'),(2,'2026-10-01 20:00:00'),
(3,'2026-10-02 12:00:00'),(3,'2026-10-02 12:20:00'),(3,'2026-10-02 12:45:00'),(3,'2026-10-02 13:10:00'),(3,'2026-10-02 13:30:00');
`;
