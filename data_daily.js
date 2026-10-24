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
-- 2026-10-15
CREATE TABLE d1015_ms_events (event_id INTEGER, customer_id INTEGER, client_id TEXT, user_id INTEGER, event_date TEXT);
INSERT INTO d1015_ms_events VALUES (1,1,'mobile',101,'2026-08-03'),(2,1,'mobile',101,'2026-08-20'),(3,1,'mobile',102,'2026-09-01'),(4,1,'mobile',103,'2026-09-15'),(5,1,'desktop',101,'2026-08-05'),(6,2,'mobile',201,'2026-08-11'),(7,2,'desktop',201,'2026-08-12'),(8,2,'desktop',202,'2026-09-02'),(9,2,'web',202,'2026-09-03'),(10,3,'mobile',301,'2026-09-09'),(11,3,'desktop',302,'2026-08-30'),(12,3,'desktop',302,'2026-09-30'),(13,4,'mobile',401,'2026-08-14'),(14,4,'mobile',402,'2026-09-14'),(15,4,'web',401,'2026-09-20'),(16,5,'mobile',501,'2026-08-01'),(17,5,'mobile',502,'2026-08-01'),(18,5,'mobile',501,'2026-09-05'),(19,6,'desktop',601,'2026-09-06'),(20,6,'web',602,'2026-09-07'),(21,1,'web',104,'2026-08-31');
CREATE TABLE d1015_station (id INTEGER, city TEXT);
INSERT INTO d1015_station VALUES (1,'Rome'),(2,'Oslo'),(3,'Lima'),(4,'Jerusalem'),(5,'Amsterdam'),(6,'Johannesburg'),(7,'Kuala Lumpur'),(8,'Tel Aviv'),(9,'Haifa');
CREATE TABLE d1015_shop_orders (order_id INTEGER, customer TEXT, category TEXT, amount INTEGER, status TEXT, order_date TEXT);
INSERT INTO d1015_shop_orders VALUES (1,'Dan','books',45,'completed','2026-09-01'),(2,'Dan','toys',80,'cancelled','2026-09-02'),(3,'Eve','books',60,'completed','2026-09-03'),(4,'Eve','toys',120,'completed','2026-09-04'),(5,'Gal','garden',30,'completed','2026-09-05'),(6,'Gal','garden',25,'returned','2026-09-06'),(7,'Hen','toys',55,'completed','2026-09-07'),(8,'Hen','books',20,'completed','2026-09-08'),(9,'Ivy','garden',70,'completed','2026-09-09'),(10,'Ivy','kitchen',90,'completed','2026-09-10'),(11,'Jon','kitchen',15,'cancelled','2026-09-11'),(12,'Jon','books',10,'completed','2026-09-12'),(13,'Mor','toys',35,'cancelled','2026-09-13');
CREATE TABLE d1015_cust (name TEXT, city TEXT);
INSERT INTO d1015_cust VALUES ('Dan','Haifa'),('Eve','Eilat'),('Gal','Haifa'),('Hen','Tel Aviv'),('Ivy','Eilat'),('Jon','Haifa'),('Kai','Tel Aviv'),('Lia','Eilat'),('Mor','Haifa');
CREATE TABLE d1015_emps (emp_id INTEGER, name TEXT, dept TEXT, salary INTEGER, bonus INTEGER);
INSERT INTO d1015_emps VALUES (1,'Avi','Sales',4000,1500),(2,'Bat','Sales',3500,NULL),(3,'Cal','Support',4800,300),(4,'Dor','Support',4200,NULL),(5,'Eli','Dev',9000,500),(6,'Fay','Sales',3000,2000),(7,'Gil','Support',5000,NULL),(8,'Hod','Sales',4500,500);
CREATE TABLE d1015_products (pid INTEGER, name TEXT, price REAL);
INSERT INTO d1015_products VALUES (1,'Cable',12.5),(2,'Mouse',39.99),(3,'Keyboard',40),(4,'Monitor',199),(5,'Dock',100),(6,'Hub',99.99),(7,'Pad',5),(8,'Webcam',65),(9,'Lamp',25);
CREATE TABLE d1015_company (company_code TEXT, founder TEXT);
INSERT INTO d1015_company VALUES ('C1','Lorence'),('C2','Mira'),('C3','Noam');
CREATE TABLE d1015_lead (lead_code TEXT, company_code TEXT);
INSERT INTO d1015_lead VALUES ('L1','C1'),('L2','C1'),('L3','C2');
CREATE TABLE d1015_senior (senior_code TEXT, lead_code TEXT, company_code TEXT);
INSERT INTO d1015_senior VALUES ('S1','L1','C1'),('S2','L1','C1'),('S3','L2','C1'),('S4','L3','C2'),('S4','L3','C2');
CREATE TABLE d1015_mgr (manager_code TEXT, senior_code TEXT, lead_code TEXT, company_code TEXT);
INSERT INTO d1015_mgr VALUES ('M1','S1','L1','C1'),('M2','S1','L1','C1'),('M3','S2','L1','C1'),('M4','S3','L2','C1'),('M5','S4','L3','C2');
CREATE TABLE d1015_emp (employee_code TEXT, manager_code TEXT, senior_code TEXT, lead_code TEXT, company_code TEXT);
INSERT INTO d1015_emp VALUES ('E1','M1','S1','L1','C1'),('E2','M1','S1','L1','C1'),('E3','M2','S1','L1','C1'),('E4','M3','S2','L1','C1'),('E5','M4','S3','L2','C1'),('E6','M4','S3','L2','C1'),('E7','M5','S4','L3','C2');
CREATE TABLE d1015_reports (emp_name TEXT, mgr_name TEXT);
INSERT INTO d1015_reports VALUES ('Tali','Boaz'),('Tali','Cohen'),('Udi','Boaz'),('Udi','Boaz'),('Vera','Cohen'),('Vera','Dina'),('Vera','Boaz'),('Waz',NULL),('Waz','Dina'),('Xen',NULL);
CREATE TABLE d1015_players (player_id INTEGER, group_id INTEGER);
INSERT INTO d1015_players VALUES (1,1),(2,1),(3,1),(4,2),(5,2),(6,2),(7,3),(8,3);
CREATE TABLE d1015_matches (match_id INTEGER, first_player INTEGER, second_player INTEGER, first_score INTEGER, second_score INTEGER);
INSERT INTO d1015_matches VALUES (1,1,2,15,20),(2,1,3,30,5),(3,2,3,10,40),(4,4,5,8,8),(5,6,4,12,2),(6,5,6,5,7),(7,7,8,0,0);
CREATE TABLE d1015_pmatches (player_id INTEGER, match_no INTEGER, result TEXT);
INSERT INTO d1015_pmatches VALUES (1,1,'W'),(1,2,'W'),(1,3,'L'),(1,4,'W'),(1,5,'W'),(1,6,'W'),(1,7,'L'),(2,1,'W'),(2,2,'W'),(2,3,'W'),(2,4,'W'),(2,5,'L'),(2,6,'W'),(3,1,'L'),(3,2,'L'),(3,3,'W'),(4,1,'W'),(4,2,'L'),(4,3,'W'),(4,4,'W'),(5,1,'L');
CREATE TABLE d1015_txn (txn_id INTEGER, user_id INTEGER, txn_date TEXT, status TEXT);
INSERT INTO d1015_txn VALUES (1,1,'2026-10-01','success'),(2,1,'2026-10-01','success'),(3,1,'2026-10-02','success'),(4,1,'2026-10-03','success'),(5,1,'2026-10-04','failed'),(6,1,'2026-10-05','success'),(7,1,'2026-10-06','success'),(8,2,'2026-09-28','success'),(9,2,'2026-09-29','success'),(10,2,'2026-09-30','success'),(11,2,'2026-10-01','success'),(12,2,'2026-10-02','failed'),(13,3,'2026-10-01','success'),(14,3,'2026-10-03','success'),(15,3,'2026-10-05','success'),(16,4,'2026-10-01','failed'),(17,4,'2026-10-02','failed');
CREATE TABLE d1015_views (view_id INTEGER, user_id INTEGER, country TEXT, genre TEXT, watched_at TEXT);
INSERT INTO d1015_views VALUES
(1,101,'IL','drama','2026-09-05'),
(2,102,'IL','drama','2026-09-08'),
(3,103,'IL','drama','2026-09-11'),
(4,104,'IL','drama','2026-09-14'),
(5,105,'IL','comedy','2026-09-17'),
(6,106,'IL','comedy','2026-09-20'),
(7,107,'IL','comedy','2026-09-23'),
(8,108,'IL','thriller','2026-09-26'),
(9,100,'IL','thriller','2026-09-02'),
(10,101,'IL','documentary','2026-09-05'),
(11,102,'IL','documentary','2026-09-08'),
(12,103,'IL','anime','2026-09-11'),
(13,104,'US','action','2026-09-14'),
(14,105,'US','action','2026-09-17'),
(15,106,'US','action','2026-09-20'),
(16,107,'US','comedy','2026-09-23'),
(17,108,'US','comedy','2026-09-26'),
(18,100,'US','drama','2026-09-02'),
(19,101,'US','drama','2026-09-05'),
(20,102,'US','horror','2026-09-08'),
(21,103,'FR','drama','2026-09-11'),
(22,104,'FR','drama','2026-09-14'),
(23,105,'FR','romance','2026-09-17'),
(24,150,'FR','comedy','2026-08-31'),
(25,151,'FR','comedy','2026-08-31'),
(26,152,'FR','comedy','2026-10-01'),
(27,153,'IL','anime','2026-10-01'),
(28,154,'IL','anime','2026-08-30');
CREATE TABLE d1015_sub_events (user_id INTEGER, event_type TEXT, event_date TEXT);
INSERT INTO d1015_sub_events VALUES (1,'start','2026-06-03'),(1,'pause','2026-06-20'),(1,'resume','2026-07-05'),(2,'start','2026-06-10'),(2,'cancel','2026-07-10'),(3,'start','2026-06-15'),(4,'start','2026-06-28'),(4,'pause','2026-07-30'),(5,'start','2026-07-02'),(5,'cancel','2026-08-02'),(5,'start','2026-09-15'),(6,'start','2026-07-12'),(6,'cancel','2026-07-30'),(7,'start','2026-07-20'),(8,'start','2026-08-05'),(8,'cancel','2026-09-05'),(9,'start','2026-08-18'),(9,'pause','2026-09-01'),(9,'cancel','2026-09-20'),(10,'start','2026-08-25');
-- 2026-10-16
CREATE TABLE d1016_staff (id INTEGER, name TEXT, months INTEGER, salary INTEGER);
INSERT INTO d1016_staff VALUES (1,'Ada',12,3000),(2,'Ben',24,1500),(3,'Cy',10,4000),(4,'Dana',20,2000),(5,'Eli',5,7000),(6,'Fay',36,1000),(7,'Gil',3,5000),(8,'Hod',18,2200);
CREATE TABLE d1016_units (id INTEGER, units INTEGER);
INSERT INTO d1016_units VALUES (1,1050),(2,2000),(3,340),(4,700),(5,1203),(6,50),(7,909),(8,15);
CREATE TABLE d1016_regions (name TEXT, population INTEGER, area_sqkm REAL);
INSERT INTO d1016_regions VALUES ('Galilee',1200000,4500),('Negev',650000,12000),('Sharon',1800000,1100),('Dan',3900000,700),('Jerusalem Hills',1100000,650),('Arava',20000,3000);
CREATE TABLE d1016_support (ticket_id INTEGER, channel TEXT, priority TEXT, resolved_hours REAL);
INSERT INTO d1016_support VALUES (1,'email','low',5.5),(2,'email','high',2.0),(3,'email','low',NULL),(4,'email','medium',9.0),(5,'email','low',12.0),(6,'chat','high',0.5),(7,'chat','medium',1.5),(8,'chat','low',NULL),(9,'chat','low',1.0),(10,'phone','high',0.75),(11,'phone','medium',NULL),(12,'phone','low',3.0),(13,'social','low',20.0),(14,'social','high',NULL);
CREATE TABLE d1016_devices (device_id INTEGER, model TEXT, battery_pct INTEGER);
INSERT INTO d1016_devices VALUES (1,'A1',95),(2,'A1',12),(3,'B2',49),(4,'B2',50),(5,'B2',NULL),(6,'C3',19),(7,'C3',20),(8,'C3',77),(9,'A1',3),(10,'B2',NULL),(11,'C3',64),(12,'A1',35);
CREATE TABLE d1016_depts (id INTEGER, name TEXT);
INSERT INTO d1016_depts VALUES (1,'Sales'),(2,'Dev'),(3,'HR'),(4,'Legal');
CREATE TABLE d1016_workers (id INTEGER, name TEXT, salary INTEGER, dept_id INTEGER, manager_id INTEGER);
INSERT INTO d1016_workers VALUES (1,'Noa',12000,2,NULL),(2,'Omer',9000,2,1),(3,'Pia',9500,2,2),(4,'Ron',7000,1,NULL),(5,'Shai',7000,1,4),(6,'Tal',7600,1,4),(7,'Uri',5000,3,NULL),(8,'Vered',4000,1,5),(9,'Yoni',7600,1,4);
CREATE TABLE d1016_pay (emp TEXT, salary INTEGER);
INSERT INTO d1016_pay VALUES ('a',5000),('b',8000),('c',8000),('d',6500),('e',9000),('f',9000),('g',4000),('h',6500),('i',7000);
CREATE TABLE d1016_cust (id INTEGER, name TEXT, city TEXT);
INSERT INTO d1016_cust VALUES (1,'Alma','Haifa'),(2,'Bar','Eilat'),(3,'Chen','Haifa'),(4,'Dvir','Tel Aviv'),(5,'Efrat','Eilat'),(6,'Gadi','Haifa'),(7,'Hila','Tel Aviv');
CREATE TABLE d1016_ord (id INTEGER, cust_id INTEGER, amount INTEGER);
INSERT INTO d1016_ord VALUES (1,1,120),(2,1,80),(3,3,45),(4,NULL,300),(5,5,60),(6,7,15),(7,3,90);
CREATE TABLE d1016_ppl (name TEXT, occupation TEXT);
INSERT INTO d1016_ppl VALUES ('Samantha','Doctor'),('Julia','Actor'),('Maria','Actor'),('Meera','Singer'),('Ashley','Professor'),('Ketty','Professor'),('Christeen','Professor'),('Jane','Actor'),('Jenny','Doctor'),('Priya','Singer'),('Dan','Professor'),('Zed','Doctor');
CREATE TABLE d1016_gameplay (player_id INTEGER, event_date TEXT, games_played INTEGER);
INSERT INTO d1016_gameplay VALUES (1,'2026-06-25',1),(1,'2026-05-01',5),(1,'2026-05-02',6),(2,'2026-03-01',0),(2,'2026-07-03',5),(3,'2026-03-02',1),(3,'2026-03-03',0),(3,'2026-03-04',4),(3,'2026-03-10',2);
CREATE TABLE d1016_deliv_times (city TEXT, minutes INTEGER);
INSERT INTO d1016_deliv_times VALUES ('Haifa',22),('Haifa',35),('Haifa',28),('Haifa',41),('Haifa',30),('Eilat',18),('Eilat',25),('Eilat',31),('Eilat',40),('Tel Aviv',20),('Tel Aviv',20),('Tel Aviv',25),('Tel Aviv',33),('Tel Aviv',33),('Tel Aviv',50),('Ashdod',15),('Ashdod',22),('Kfar Saba',44);
CREATE TABLE d1016_rest_rev (restaurant_id INTEGER, name TEXT, revenue INTEGER);
INSERT INTO d1016_rest_rev VALUES (1,'Pita Palace',41000),(2,'Sushi Bar',56000),(3,'Burger Barn',33500),(4,'Falafel King',29800),(5,'Pasta Casa',47200),(6,'Taco Town',38800),(7,'Grill House',87500),(8,'Salad Stop',21000),(9,'Noodle Nest',52300),(10,'Steak Spot',98000),(11,'Pizza Pit',61000),(12,'Shawarma Shack',87500),(13,'Vegan Vibes',27400),(14,'Curry Corner',44100),(15,'Bagel Bay',19900),(16,'Hummus Hub',35600),(17,'Kebab Kingdom',50500),(18,'Dim Sum Den',58900),(19,'Wrap World',24300),(20,'Soup Stop',31200);
CREATE TABLE d1016_params (rows_n INTEGER);
INSERT INTO d1016_params VALUES (6);
CREATE TABLE d1016_clicks (user_id INTEGER, ts TEXT);
INSERT INTO d1016_clicks VALUES (1,'2026-10-01 10:00:00'),(1,'2026-10-01 10:10:00'),(1,'2026-10-01 10:40:00'),(1,'2026-10-01 11:11:00'),(1,'2026-10-01 11:20:00'),(1,'2026-10-01 15:00:00'),(2,'2026-10-01 09:00:00'),(2,'2026-10-01 09:05:00'),(2,'2026-10-01 09:50:00'),(2,'2026-10-01 09:55:00'),(2,'2026-10-01 10:00:00'),(2,'2026-10-01 10:20:00'),(3,'2026-10-01 23:50:00'),(3,'2026-10-02 00:10:00'),(3,'2026-10-02 12:00:00');
-- 2026-10-17
CREATE TABLE d1017_customers (customer_id INTEGER, name TEXT, signup_date TEXT, country TEXT, email TEXT);
INSERT INTO d1017_customers VALUES (1,'Noa','2026-01-05','IL','noa@gmail.com'),(2,'Omer','2026-01-12','IL','omer@walla.co.il'),(3,'Dana','2026-02-03','US','dana@gmail.com'),(4,'Eli','2026-02-20','IL','eli@walla.co.il'),(5,'Maya','2026-03-08','US','maya@yahoo.com'),(6,'Tal','2026-03-15','IL','tal@gmail.com'),(7,'Yoav','2026-04-01','DE','yoav@gmx.de'),(8,'Lior','2026-04-22','IL','lior@gmail.com');
CREATE TABLE d1017_orders (order_id INTEGER, customer_id INTEGER, order_date TEXT, status TEXT, channel TEXT, amount REAL);
INSERT INTO d1017_orders VALUES (1,1,'2026-01-10','delivered','web',120),(2,1,'2026-02-14','delivered','app',80),(3,2,'2026-01-20','delivered','web',200),(4,2,'2026-02-02','cancelled','web',150),(5,3,'2026-02-10','delivered','app',60),(6,3,'2026-03-05','delivered','app',90),(7,3,'2026-03-25','returned','web',70),(8,4,'2026-03-02','delivered','store',300),(9,5,'2026-03-18','delivered','web',110),(10,5,'2026-04-04','delivered','app',130),(11,6,'2026-03-30','cancelled','app',40),(12,1,'2026-03-12','delivered','web',100),(13,2,'2026-04-09','delivered','store',250),(14,8,'2026-04-28','cancelled','web',55);
CREATE TABLE d1017_sales (sale_id INTEGER, product TEXT, category TEXT, qty INTEGER, price REAL);
INSERT INTO d1017_sales VALUES (1,'Cable','Accessories',30,10),(2,'Case','Accessories',12,25),(3,'Charger','Accessories',8,40),(4,'Phone','Devices',3,500),(5,'Tablet','Devices',2,400),(6,'Watch','Devices',2,600),(7,'Novel','Books',20,15),(8,'Atlas','Books',4,60),(9,'Comics','Books',40,10);
CREATE TABLE d1017_emp (emp_id INTEGER, name TEXT, dept TEXT, salary INTEGER, bonus INTEGER);
INSERT INTO d1017_emp VALUES (1,'Avi','Eng',20000,2000),(2,'Bar','Eng',24000,NULL),(3,'Gal','Eng',18000,1000),(4,'Dor','Sales',15000,3000),(5,'Hila','Sales',14000,NULL),(6,'Ido','HR',13000,NULL),(7,'Keren','Data',22000,4000),(8,'Lev','Data',21000,NULL);
CREATE TABLE d1017_tickets (ticket_id INTEGER, priority TEXT, opened_at TEXT, closed_at TEXT);
INSERT INTO d1017_tickets VALUES (1,'high','2026-05-01','2026-05-03'),(2,'high','2026-05-02',NULL),(3,'low','2026-05-02','2026-05-09'),(4,'low','2026-05-04',NULL),(5,'low','2026-05-05',NULL),(6,'med','2026-05-03','2026-05-04'),(7,'med','2026-05-06','2026-05-10'),(8,'high','2026-05-07','2026-05-08');
CREATE TABLE d1017_fr_sent (sender_id INTEGER, send_to_id INTEGER, request_date TEXT);
INSERT INTO d1017_fr_sent VALUES (1,2,'2026-06-01'),(1,3,'2026-06-01'),(1,3,'2026-06-02'),(2,3,'2026-06-03'),(3,4,'2026-06-03'),(4,1,'2026-06-04'),(5,1,'2026-06-05'),(5,2,'2026-06-05');
CREATE TABLE d1017_fr_acc (requester_id INTEGER, accepter_id INTEGER, accept_date TEXT);
INSERT INTO d1017_fr_acc VALUES (1,2,'2026-06-02'),(1,3,'2026-06-03'),(1,3,'2026-06-04'),(2,3,'2026-06-05'),(5,1,'2026-06-06');
CREATE TABLE d1017_accounts (id INTEGER, name TEXT);
INSERT INTO d1017_accounts VALUES (1,'Ana'),(2,'Ben'),(3,'Cal'),(4,'Dina'),(5,'Eyal');
CREATE TABLE d1017_acct_logins (id INTEGER, login_date TEXT);
INSERT INTO d1017_acct_logins VALUES (1,'2026-06-01'),(1,'2026-06-02'),(1,'2026-06-02'),(1,'2026-06-03'),(1,'2026-06-04'),(2,'2026-06-01'),(2,'2026-06-02'),(2,'2026-06-03'),(2,'2026-06-05'),(2,'2026-06-06'),(2,'2026-06-07'),(3,'2026-06-10'),(3,'2026-06-11'),(3,'2026-06-12'),(3,'2026-06-13'),(3,'2026-06-20'),(4,'2026-06-01'),(4,'2026-06-03'),(4,'2026-06-05'),(4,'2026-06-07'),(5,'2026-05-29'),(5,'2026-05-30'),(5,'2026-05-31'),(5,'2026-06-01'),(5,'2026-06-02');
CREATE TABLE d1017_plays (player_id INTEGER, event_date TEXT, games INTEGER);
INSERT INTO d1017_plays VALUES (1,'2026-07-01',3),(1,'2026-07-02',2),(1,'2026-07-05',1),(2,'2026-07-01',4),(2,'2026-07-03',2),(3,'2026-07-01',1),(3,'2026-07-02',5),(4,'2026-07-02',2),(4,'2026-07-03',3),(5,'2026-07-02',1),(6,'2026-07-03',2),(7,'2026-07-03',1),(7,'2026-07-04',2);
-- 2026-10-18
CREATE TABLE d1018_courses (course_id INTEGER, title TEXT, category TEXT, price INTEGER, rating REAL, published TEXT);
INSERT INTO d1018_courses VALUES (1,'SQL Basics','data',0,4.5,'2026-01-10'),(2,'Advanced SQL Window Functions','data',120,4.8,'2026-02-15'),(3,'Python for Analysts','data',80,NULL,'2026-03-01'),(4,'UX Fundamentals','design',60,4.2,'2025-11-20'),(5,'Figma Masterclass','design',45,4.0,'2026-04-05'),(6,'Intro to Marketing','business',30,3.9,'2025-09-12'),(7,'Negotiation Skills','business',90,NULL,'2026-05-18'),(8,'Data Storytelling','data',70,4.6,'2026-06-01'),(9,'Brand Design','design',110,4.4,'2026-02-02'),(10,'Excel Sql Tricks','data',0,3.7,'2025-12-30');
CREATE TABLE d1018_enroll (course_id INTEGER, student TEXT, enrolled_on TEXT, paid INTEGER);
INSERT INTO d1018_enroll VALUES (1,'Ari','2026-02-01',0),(1,'Bella','2026-02-03',0),(2,'Ari','2026-03-01',120),(2,'Cody','2026-03-04',120),(2,'Cody','2026-03-20',120),(3,'Dana','2026-04-01',80),(4,'Bella','2026-01-15',60),(4,'Eli','2026-01-20',55),(5,'Eli','2026-05-01',45),(8,'Ari','2026-07-01',70),(8,'Dana','2026-07-02',70),(8,'Bella','2026-07-09',63),(9,'Cody','2026-05-05',110);
CREATE TABLE d1018_wands (id INTEGER, code INTEGER, coins_needed INTEGER, power INTEGER);
INSERT INTO d1018_wands VALUES (1,1,3688,8),(2,1,3010,8),(3,1,5000,9),(4,2,1500,5),(5,2,1200,5),(6,2,900,3),(7,3,100,5),(8,3,200,3),(9,4,700,9),(10,4,650,9),(11,4,800,2),(12,5,50,9),(13,6,400,7),(14,6,350,7),(15,6,500,2);
CREATE TABLE d1018_wand_props (code INTEGER, age INTEGER, is_evil INTEGER);
INSERT INTO d1018_wand_props VALUES (1,45,0),(2,40,0),(3,40,1),(4,10,0),(5,10,1),(6,25,0);
CREATE TABLE d1018_visits (visit_id INTEGER, customer_id INTEGER, visit_date TEXT);
INSERT INTO d1018_visits VALUES (1,101,'2026-03-01'),(2,102,'2026-03-01'),(3,101,'2026-03-02'),(4,103,'2026-03-03'),(5,104,'2026-03-03'),(6,104,'2026-03-04'),(7,104,'2026-03-05'),(8,102,'2026-03-06'),(9,105,'2026-03-06');
CREATE TABLE d1018_txns (txn_id INTEGER, visit_id INTEGER, amount INTEGER);
INSERT INTO d1018_txns VALUES (1,1,50),(2,2,0),(3,5,120),(4,8,15),(5,9,40),(6,5,20);
CREATE TABLE d1018_friends (user1 INTEGER, user2 INTEGER);
INSERT INTO d1018_friends VALUES (1,2),(3,1),(1,4),(2,5),(6,1);
CREATE TABLE d1018_likes (user_id INTEGER, page_id INTEGER);
INSERT INTO d1018_likes VALUES (1,88),(1,23),(2,88),(2,23),(2,24),(3,24),(3,56),(4,23),(4,77),(5,99),(6,77),(6,12),(7,50);
CREATE TABLE d1018_user_visits (user_id INTEGER, visit_date TEXT);
INSERT INTO d1018_user_visits VALUES (1,'2026-05-01'),(1,'2026-05-09'),(1,'2026-06-20'),(2,'2026-06-01'),(2,'2026-06-30'),(3,'2026-02-14'),(4,'2026-06-10'),(4,'2026-06-10'),(4,'2026-06-25');
CREATE TABLE d1018_hackers (hacker_id INTEGER, name TEXT);
INSERT INTO d1018_hackers VALUES (1,'Ana'),(2,'Ben'),(3,'Cy'),(4,'Dor'),(5,'Eli'),(6,'Fay'),(7,'Gil'),(8,'Hod'),(9,'Ivy');
CREATE TABLE d1018_chals (challenge_id INTEGER, hacker_id INTEGER);
INSERT INTO d1018_chals VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,3),(14,3),(15,3),(16,3),(17,3),(18,4),(19,4),(20,4),(21,4),(22,4),(23,5),(24,5),(25,5),(26,5),(27,6),(28,6),(29,6),(30,7),(31,7),(32,7),(33,8),(34,8),(35,9);
CREATE TABLE d1018_logs (log_id INTEGER);
INSERT INTO d1018_logs VALUES (1),(2),(3),(7),(8),(10),(11),(12),(15),(20),(21);
CREATE TABLE d1018_acct_events (account_id TEXT, user_id INTEGER, event_date TEXT);
INSERT INTO d1018_acct_events VALUES ('A1',1,'2026-03-05'),('A1',1,'2026-04-10'),('A1',2,'2026-03-12'),('A1',3,'2026-03-20'),('A1',3,'2026-04-02'),('A1',3,'2026-04-28'),('A1',4,'2026-04-03'),('A2',5,'2026-03-01'),('A2',5,'2026-03-31'),('A2',6,'2026-04-15'),('A2',7,'2026-03-15'),('A3',8,'2026-02-10'),('A3',8,'2026-04-05'),('A4',9,'2026-03-09'),('A4',9,'2026-04-30');
CREATE TABLE d1018_clicks (user_id INTEGER, ts TEXT);
INSERT INTO d1018_clicks VALUES (1,'2026-09-01 09:00:00'),(1,'2026-09-01 09:10:00'),(1,'2026-09-01 09:40:00'),(1,'2026-09-01 10:20:00'),(1,'2026-09-01 10:25:00'),(1,'2026-09-02 08:00:00'),(2,'2026-09-01 23:50:00'),(2,'2026-09-02 00:10:00'),(3,'2026-09-01 12:00:00');
CREATE TABLE d1018_user_activity (username TEXT, activity TEXT, start_date TEXT, end_date TEXT);
INSERT INTO d1018_user_activity VALUES ('Alice','Travel','2026-02-12','2026-02-20'),('Alice','Dancing','2026-02-21','2026-02-23'),('Alice','Travel','2026-02-24','2026-02-28'),('Bob','Travel','2026-02-11','2026-02-18'),('Cara','Swim','2026-01-05','2026-01-06'),('Cara','Run','2026-01-10','2026-01-11'),('Dan','Read','2026-03-01','2026-03-02'),('Dan','Read','2026-03-05','2026-03-06'),('Dan','Chess','2026-03-09','2026-03-09');
CREATE TABLE d1018_gscores (player_name TEXT, gender TEXT, day TEXT, score_points INTEGER);
INSERT INTO d1018_gscores VALUES ('Ayala','F','2026-04-01',3),('Bella','F','2026-04-03',7),('Cora','F','2026-04-04',2),('Dina','F','2026-04-09',5),('Omer','M','2026-04-02',6),('Noam','M','2026-04-03',4),('Ron','M','2026-04-05',9),('Tal','M','2026-04-07',1);
-- 2026-10-19
CREATE TABLE d1019_biz_trips (trip_id INTEGER, driver_id INTEGER, purpose TEXT, miles REAL);
INSERT INTO d1019_biz_trips VALUES (1,11,'Meeting',12.5),(2,11,'Meeting',8),(3,12,'Airport',30.2),(4,12,'Airport',NULL),(5,13,'Meeting',5.5),(6,13,'Training',20),(7,14,'Client Visit',14),(8,14,'Client Visit',16),(9,15,'Training',10),(10,15,'Errand',3.4);
CREATE TABLE d1019_pay (emp_id INTEGER, dept TEXT, salary INTEGER, bonus INTEGER);
INSERT INTO d1019_pay VALUES (1,'Sales',8000,500),(2,'Sales',7000,NULL),(3,'Sales',9000,1000),(4,'Dev',15000,NULL),(5,'Dev',14000,2000),(6,'HR',6000,NULL),(7,'Ops',7500,300),(8,'Ops',7200,NULL),(9,'Ops',6800,200);
CREATE TABLE d1019_customers (cust_id INTEGER, name TEXT, email TEXT, city TEXT, signup_date TEXT);
INSERT INTO d1019_customers VALUES (1,'Dana','dana@gmail.com','Haifa','2026-01-10'),(2,'Eli','eli@walla.co.il','Tel Aviv','2026-02-14'),(3,'Gal','gal@mail.com',NULL,'2026-03-02'),(4,'Hila','hila@bezeq.co.il','Haifa','2025-12-30'),(5,'Itay','itay@corp.co.il',NULL,'2026-05-20'),(6,'Lior','lior@gmail.com','Eilat','2026-06-01'),(7,'Maya','maya@co.il.example.com','Tel Aviv','2026-07-07'),(8,'Noa','noa@yahoo.co.il','Eilat','2026-08-15');
CREATE TABLE d1019_orders (order_id INTEGER, cust_id INTEGER, status TEXT, amount INTEGER, order_date TEXT);
INSERT INTO d1019_orders VALUES (1,1,'delivered',150,'2026-02-01'),(2,1,'delivered',200,'2026-03-01'),(3,1,'cancelled',500,'2026-03-05'),(4,2,'delivered',100,'2026-03-10'),(5,2,'delivered',120,'2026-04-10'),(6,2,'delivered',90,'2026-05-10'),(7,3,'returned',300,'2026-04-01'),(8,5,'delivered',900,'2026-06-01'),(9,6,'cancelled',80,'2026-06-15'),(10,8,'delivered',60,'2026-09-01'),(11,8,'delivered',50,'2026-09-20');
CREATE TABLE d1019_weather (id INTEGER, record_date TEXT, temp INTEGER);
INSERT INTO d1019_weather VALUES (1,'2026-03-01',10),(2,'2026-03-02',15),(3,'2026-03-03',12),(4,'2026-03-04',14),(5,'2026-03-06',20),(6,'2026-03-07',19),(7,'2026-03-08',25);
CREATE TABLE d1019_prod_sales (sale_id INTEGER, product_id INTEGER, year INTEGER, quantity INTEGER, price INTEGER);
INSERT INTO d1019_prod_sales VALUES (1,100,2024,10,500),(2,100,2025,12,600),(3,200,2025,5,800),(4,200,2026,7,800),(5,300,2023,3,100),(6,300,2023,4,110),(7,300,2024,9,120);
CREATE TABLE d1019_seq_log (id INTEGER, num INTEGER);
INSERT INTO d1019_seq_log VALUES (1,5),(2,5),(3,5),(4,7),(5,5),(6,8),(7,8),(8,8),(9,8),(10,5),(11,7),(12,7);
CREATE TABLE d1019_basket (txn_id INTEGER, product TEXT);
INSERT INTO d1019_basket VALUES (1,'Milk'),(1,'Bread'),(1,'Eggs'),(2,'Milk'),(2,'Bread'),(3,'Bread'),(3,'Eggs'),(4,'Milk'),(4,'Eggs'),(4,'Bread'),(5,'Tea');
CREATE TABLE d1019_user_tx (tx_id INTEGER, user_id INTEGER, spend REAL, tx_date TEXT);
INSERT INTO d1019_user_tx VALUES (1,111,100.5,'2026-01-08'),(2,111,55,'2026-01-12'),(3,111,89.6,'2026-02-05'),(4,111,20,'2026-03-01'),(5,222,40,'2026-01-03'),(6,222,60,'2026-01-03'),(7,222,15.25,'2026-01-03'),(8,333,70,'2026-02-02'),(9,333,30,'2026-02-09'),(10,444,12,'2026-02-11'),(11,444,18,'2026-02-12'),(12,444,22,'2026-02-12');
CREATE TABLE d1019_charge_log (session_id INTEGER, station_id INTEGER, day TEXT, minutes INTEGER);
INSERT INTO d1019_charge_log VALUES (1,1,'2026-05-01',40),(2,1,'2026-05-01',35),(3,1,'2026-05-02',50),(4,1,'2026-05-04',90),(5,1,'2026-05-04',10),(6,2,'2026-05-01',60),(7,2,'2026-05-03',20),(8,2,'2026-05-03',45),(9,3,'2026-05-02',30);
CREATE TABLE d1019_rest_visits (customer_id INTEGER, visited_on TEXT, amount INTEGER);
INSERT INTO d1019_rest_visits VALUES (1,'2026-06-01',100),(2,'2026-06-01',50),(3,'2026-06-02',120),(4,'2026-06-03',80),(5,'2026-06-04',200),(1,'2026-06-05',90),(6,'2026-06-06',110),(7,'2026-06-07',60),(2,'2026-06-07',40),(8,'2026-06-08',150),(3,'2026-06-09',70),(9,'2026-06-10',130);
CREATE TABLE d1019_mail (id INTEGER, sender TEXT, receiver TEXT, sent_day INTEGER);
INSERT INTO d1019_mail VALUES (1,'avi','dana',1),(2,'avi','eli',1),(3,'avi','gal',2),(4,'dana','avi',2),(5,'dana','eli',3),(6,'dana','gal',3),(7,'eli','avi',3),(8,'gal','eli',4),(9,'gal','dana',4),(10,'hila','avi',5),(11,'bar','avi',5),(12,'bar','dana',6),(13,'eli','gal',6);
CREATE TABLE d1019_driver_trips (trip_id INTEGER, driver_id INTEGER, trip_date TEXT, earnings INTEGER);
INSERT INTO d1019_driver_trips VALUES (1,1,'2026-01-10',100),(2,2,'2026-01-15',150),(3,1,'2026-02-03',50),(4,2,'2026-02-20',120),(5,3,'2026-02-25',90),(6,1,'2026-03-09',200),(7,3,'2026-03-14',400),(8,2,'2026-04-02',300),(9,3,'2026-04-18',10);
-- 2026-10-20
CREATE TABLE d1020_acct_tx (tx_id INTEGER, account_id INTEGER, amount REAL, tx_type TEXT);
INSERT INTO d1020_acct_tx VALUES (1,101,100.5,'Deposit'),(2,101,40,'Withdrawal'),(3,102,300,'Deposit'),(4,101,25,'Deposit'),(5,102,350,'Withdrawal'),(6,103,80,'Deposit'),(7,103,80,'Withdrawal'),(8,104,15.25,'Deposit'),(9,102,120,'Deposit'),(10,105,60,'Withdrawal'),(11,105,10,'Deposit');
CREATE TABLE d1020_jobs (job_id INTEGER, company_id INTEGER, title TEXT, description TEXT);
INSERT INTO d1020_jobs VALUES (1,10,'Data Analyst','Analyze sales data'),(2,10,'Data Analyst','Analyze sales data'),(3,10,'Data Analyst','Build dashboards'),(4,20,'Data Analyst','Analyze sales data'),(5,30,'Engineer','Write backend code'),(6,30,'Engineer','Write backend code'),(7,30,'Engineer','Write backend code'),(8,40,'Designer','Design UI'),(9,40,'Designer','Design logos'),(10,50,'Engineer','Write backend code'),(11,50,'Analyst','Write backend code');
CREATE TABLE d1020_orders (order_id INTEGER, customer TEXT, amount REAL, discount REAL, status TEXT);
INSERT INTO d1020_orders VALUES (1,'noa',120,20,'completed'),(2,'noa',80,NULL,'completed'),(3,'noa',60,NULL,'cancelled'),(4,'avi',200,50,'completed'),(5,'dana',45,NULL,'completed'),(6,'dana',90,10,'completed'),(7,'dana',30,NULL,'completed'),(8,'lior',150,NULL,'completed'),(9,'lior',70,5,'cancelled'),(10,'maya',40,NULL,'completed'),(11,'maya',35,5,'completed');
CREATE TABLE d1020_products (product_id INTEGER, name TEXT, category TEXT, price REAL, stock INTEGER);
INSERT INTO d1020_products VALUES (1,'lamp','home',60,5),(2,'sofa','home',900,0),(3,'mug','home',12,40),(4,'pen','office',3,200),(5,'desk','office',250,0),(6,'chair','office',120,8),(7,'cable','tech',10,0),(8,'mouse','tech',25,60),(9,'laptop','tech',1500,3),(10,'monitor','tech',400,0),(11,'tape','office',2,0),(12,'vase','home',55,0);
CREATE TABLE d1020_members (member_id INTEGER, email TEXT, plan TEXT, joined TEXT);
INSERT INTO d1020_members VALUES (1,'noa@mail.co.il','free','2026-01-05'),(2,'avi@gmail.com','free','2026-01-09'),(3,'dana@walla.co.il','pro','2026-02-01'),(4,'lior@corp.com','pro','2026-02-14'),(5,'maya@mail.co.il','pro','2026-03-03'),(6,'tal@proton.me','team','2026-03-20'),(7,'gal@gmail.com','team','2026-04-02'),(8,'ron@uni.ac.il','free','2026-04-11'),(9,'eli@x.co.il','free','2026-05-01'),(10,'hila@co.il.example.com','pro','2026-05-09');
CREATE TABLE d1020_trans (trans_id INTEGER, country TEXT, state TEXT, amount INTEGER, trans_date TEXT);
INSERT INTO d1020_trans VALUES (1,'US','approved',1000,'2026-07-18'),(2,'US','declined',2000,'2026-07-19'),(3,'US','approved',2000,'2026-08-02'),(4,'IL','approved',300,'2026-08-05'),(5,'IL','declined',150,'2026-08-31'),(6,'IL','declined',500,'2026-08-31'),(7,'US','approved',500,'2026-08-31'),(8,NULL,'approved',70,'2026-08-10'),(9,NULL,'declined',30,'2026-08-11'),(10,'IL','approved',400,'2026-09-01'),(11,'US','declined',90,'2026-07-01');
CREATE TABLE d1020_snap_users (user_id INTEGER, age_bucket TEXT);
INSERT INTO d1020_snap_users VALUES (1,'21-25'),(2,'21-25'),(3,'26-30'),(4,'26-30'),(5,'31-35'),(6,'31-35'),(7,'36-40');
CREATE TABLE d1020_snap_activity (activity_id INTEGER, user_id INTEGER, activity_type TEXT, time_spent REAL, activity_date TEXT);
INSERT INTO d1020_snap_activity VALUES (1,1,'send',4.5,'2026-08-01'),(2,1,'open',3.5,'2026-08-01'),(3,2,'send',2.2,'2026-08-02'),(4,2,'chat',30,'2026-08-02'),(5,2,'open',6,'2026-08-03'),(6,3,'send',10,'2026-08-01'),(7,3,'open',5,'2026-08-02'),(8,4,'open',5,'2026-08-03'),(9,4,'chat',12,'2026-08-03'),(10,5,'send',7,'2026-08-01'),(11,6,'send',5,'2026-08-02'),(12,6,'open',9,'2026-08-02'),(13,6,'chat',3,'2026-08-03'),(14,7,'chat',20,'2026-08-03'),(15,7,'chat',5,'2026-08-04');
CREATE TABLE d1020_user_activity (user_id INTEGER, activity_month TEXT);
INSERT INTO d1020_user_activity VALUES (1,'2026-07'),(1,'2026-08'),(1,'2026-09'),(1,'2026-09'),(2,'2026-08'),(2,'2026-09'),(3,'2026-09'),(3,'2026-09'),(4,'2026-06'),(4,'2026-09'),(5,'2026-07'),(5,'2026-08'),(6,'2026-09'),(7,'2026-10'),(8,'2026-08'),(8,'2026-09'),(9,'2026-09'),(10,'2026-05');
CREATE TABLE d1020_call_events (event_id INTEGER, user_id INTEGER, client_id TEXT, event_type TEXT);
INSERT INTO d1020_call_events VALUES (1,1,'ios','call_start'),(2,1,'ios','call_end'),(3,1,'ios','message'),(4,2,'ios','call_start'),(5,2,'ios','message'),(6,2,'ios','message'),(7,3,'web','call_drop'),(8,3,'web','call_start'),(9,4,'web','message'),(10,4,'web','call_end'),(11,5,'android','call_start'),(12,5,'android','call_end'),(13,6,'android','call_end'),(14,6,'android','message'),(15,7,'android','call_end'),(16,8,'web','call_start'),(17,8,'web','message'),(18,8,'web','message'),(19,9,'ios','search'),(20,9,'ios','call_start');
CREATE TABLE d1020_staff (staff_id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO d1020_staff VALUES (1,'Orit','eng',30000,NULL),(2,'Boaz','eng',22000,1),(3,'Chen','eng',18000,2),(4,'Dor','eng',18000,2),(5,'Efrat','sales',15000,NULL),(6,'Fadi','sales',9000,5),(7,'Gili','sales',12000,5),(8,'Hadar','ops',11000,1),(9,'Itay','ops',11000,8),(10,'Yael','ops',14000,1);
CREATE TABLE d1020_meas (measurement_id INTEGER, measurement_value REAL, measurement_time TEXT);
INSERT INTO d1020_meas VALUES (9001,115.5,'2026-07-10 09:00:00'),(9002,300.25,'2026-07-10 08:00:00'),(9003,1,'2026-07-10 11:00:00'),(9004,2.5,'2026-07-10 10:30:00'),(9005,20,'2026-07-10 14:00:00'),(9006,35.75,'2026-07-10 12:15:00'),(9007,10,'2026-07-11 07:00:00'),(9008,7.5,'2026-07-11 06:00:00'),(9009,100,'2026-07-12 13:00:00'),(9010,4,'2026-07-12 05:00:00'),(9011,6,'2026-07-12 22:00:00');
CREATE TABLE d1020_spend (txn_id INTEGER, product_id INTEGER, spend REAL, txn_date TEXT);
INSERT INTO d1020_spend VALUES (1,1,100,'2023-03-01'),(2,1,50,'2023-11-20'),(3,1,200,'2024-01-15'),(4,1,100,'2025-06-30'),(5,1,160,'2025-09-09'),(6,2,500,'2023-05-05'),(7,2,250,'2025-02-02'),(8,2,300,'2025-12-12'),(9,3,80,'2024-04-04'),(10,3,40,'2024-08-08'),(11,3,60,'2025-01-01'),(12,1,40,'2024-12-31');
CREATE TABLE d1020_tweets (user_id INTEGER, tweet_date TEXT, tweet_count INTEGER);
INSERT INTO d1020_tweets VALUES (111,'2026-06-01',2),(111,'2026-06-02',1),(111,'2026-06-03',3),(111,'2026-06-04',4),(111,'2026-06-07',5),(111,'2026-06-08',2),(112,'2026-06-02',6),(112,'2026-06-03',2),(112,'2026-06-05',4),(113,'2026-06-04',7);
CREATE TABLE d1020_sessions (session_id INTEGER, user_id INTEGER, start_sec INTEGER, end_sec INTEGER);
INSERT INTO d1020_sessions VALUES (1,1,0,100),(2,1,0,60),(3,2,0,200),(4,2,0,50);
CREATE TABLE d1020_views (view_id INTEGER, session_id INTEGER, post_id INTEGER, view_start INTEGER, view_end INTEGER);
INSERT INTO d1020_views VALUES (1,1,10,5,30),(2,1,11,20,45),(3,1,12,45,50),(4,1,13,70,90),(5,2,10,0,10),(6,2,14,10,20),(7,3,15,10,190),(8,3,16,50,100),(9,3,17,60,70);
CREATE TABLE d1020_wallet (tx_id INTEGER, user_name TEXT, tx_date TEXT, amount INTEGER);
INSERT INTO d1020_wallet VALUES (1,'noa','2026-09-01',100),(2,'noa','2026-09-03',-60),(3,'noa','2026-09-05',-70),(4,'noa','2026-09-07',200),(5,'noa','2026-09-09',-300),(6,'avi','2026-09-02',50),(7,'avi','2026-09-04',-50),(8,'avi','2026-09-06',20),(9,'dana','2026-09-01',-10),(10,'dana','2026-09-01',30),(11,'dana','2026-09-02',-5),(12,'lior','2026-09-03',10),(13,'lior','2026-09-03',-20),(14,'lior','2026-09-08',40);
-- 2026-10-21
CREATE TABLE d1021_payments (id INTEGER, user_email TEXT, amount INTEGER, discount INTEGER, payment_method TEXT);
INSERT INTO d1021_payments VALUES (1,'a@x.com',1200,200,'card'),(2,'b@x.com',1000,NULL,'card'),(3,'c@x.com',500,50,'paypal'),(4,'d@x.com',800,NULL,NULL),(5,'e@x.com',2000,300,NULL),(6,'f@x.com',650,0,'bank'),(7,'g@x.com',900,100,'paypal');
CREATE TABLE d1021_subs (id INTEGER, user_email TEXT, plan TEXT, status TEXT, monthly_price INTEGER);
INSERT INTO d1021_subs VALUES (1,'a@x.com','Basic','active',10),(2,'b@x.com','Basic','canceled',10),(3,'c@x.com','Basic','paused',10),(4,'d@x.com','Premium','canceled',40),(5,'e@x.com','Premium','canceled',40),(6,'f@x.com','Pro','active',25),(7,'g@x.com','Pro','active',25),(8,'h@x.com','Pro','paused',25),(9,'i@x.com','Basic','active',10);
CREATE TABLE d1021_lines (id INTEGER, category TEXT, quantity INTEGER, unit_price REAL);
INSERT INTO d1021_lines VALUES (1,'Electronics',4,1500.0),(2,'Electronics',2,2000.0),(3,'Books',50,19.9),(4,'Books',30,35.0),(5,'Home',10,500.0),(6,'Home',5,1000.0),(7,'Toys',20,45.5),(8,'Clothing',100,99.9),(9,'Clothing',5,100.0),(10,'Toys',3,120.0);
CREATE TABLE d1021_items (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO d1021_items VALUES (1,'Coffee Beans 1kg','Grocery',890),(2,'Iced Coffee Bottle','Grocery',15),(3,'Coffee Table','Furniture',7500),(4,'Manual Grinder','Kitchen',1290),(5,'Coffee Maker Deluxe','Kitchen',5990),(6,NULL,'Kitchen',100),(7,'Coffee Filters','Grocery',890),(8,'Tea Bags','Grocery',20),(9,'Coffee Mug','Kitchen',45);
CREATE TABLE d1021_catalog (id INTEGER, title TEXT, price INTEGER, in_stock INTEGER);
INSERT INTO d1021_catalog VALUES (1,'Laptop X',89990,1),(2,'Laptop Y',89990,0),(3,'Phone',49990,1),(4,'Cable',NULL,1),(5,'Mouse',150,1),(6,'Dock',89990,1);
CREATE TABLE d1021_prod (product_id INTEGER, name TEXT, price INTEGER, stock INTEGER);
INSERT INTO d1021_prod VALUES (1,'Notebook',20,100),(2,'Pen',5,500),(3,'Stapler',35,40),(4,'Marker',8,0),(5,'Folder',12,70),(6,'Tape',9,15);
CREATE TABLE d1021_oi (order_item_id INTEGER, order_id INTEGER, product_id INTEGER, qty INTEGER);
INSERT INTO d1021_oi VALUES (1,100,1,2),(2,100,2,10),(3,101,2,5),(4,102,NULL,1),(5,103,4,3),(6,103,1,1);
CREATE TABLE d1021_posts (post_id INTEGER, user_id INTEGER, likes INTEGER);
INSERT INTO d1021_posts VALUES (1,100,10),(2,100,40),(3,100,10),(4,200,20),(5,200,20),(6,200,50),(7,300,5),(8,400,8),(9,400,8),(10,100,22);
CREATE TABLE d1021_usage (usage_date TEXT, account_id INTEGER, api_calls INTEGER);
INSERT INTO d1021_usage VALUES ('2026-06-01',100,100),('2026-06-02',100,100),('2026-06-03',100,400),('2026-06-04',100,100),('2026-06-05',100,100),('2026-06-01',200,50),('2026-06-02',200,60),('2026-06-03',200,40),('2026-06-04',200,50),('2026-06-01',400,100),('2026-06-02',400,100),('2026-06-03',400,300),('2026-06-04',400,300),('2026-06-05',400,100),('2026-06-06',400,100);
CREATE TABLE d1021_custs (customer_id INTEGER, name TEXT);
INSERT INTO d1021_custs VALUES (1,'Anna'),(2,'Boris'),(3,'Vera'),(4,'Gleb'),(5,'Dina');
CREATE TABLE d1021_ords (order_id INTEGER, customer_id INTEGER, ordered_at TEXT, amount INTEGER);
INSERT INTO d1021_ords VALUES (1,1,'2026-07-10',100),(2,1,'2026-01-05',50),(3,2,'2026-06-16',70),(4,2,NULL,30),(5,3,'2026-06-17',90),(6,5,'2026-05-01',10),(7,5,'2026-07-18',40);
CREATE TABLE d1021_users2 (id INTEGER, name TEXT, city TEXT);
INSERT INTO d1021_users2 VALUES (1,'Anna','Moscow'),(2,'Boris','Moscow'),(3,'Viktor','Moscow'),(4,'Galina','Kazan'),(5,'Dmitry','Kazan'),(6,'Igor','Sochi'),(7,'Lena',NULL),(8,'Oleg',NULL);
CREATE TABLE d1021_funnel (user_id INTEGER, step TEXT, event_date TEXT);
INSERT INTO d1021_funnel VALUES (1,'view','2026-05-01'),(1,'cart','2026-05-01'),(1,'checkout','2026-05-02'),(1,'purchase','2026-05-02'),(2,'view','2026-05-01'),(2,'view','2026-05-03'),(2,'cart','2026-05-03'),(3,'view','2026-05-02'),(3,'cart','2026-05-02'),(3,'checkout','2026-05-02'),(3,'checkout','2026-05-04'),(4,'view','2026-05-04'),(5,'view','2026-05-05'),(5,'cart','2026-05-05'),(5,'checkout','2026-05-06'),(5,'purchase','2026-05-06'),(6,'view','2026-05-06'),(6,'cart','2026-05-06'),(6,'cart','2026-05-07');
CREATE TABLE d1021_pay (segment TEXT, amount INTEGER);
INSERT INTO d1021_pay VALUES ('retail',100),('retail',200),('retail',900),('retail',150),('retail',200),('vip',1000),('vip',2000),('vip',3000),('vip',9000),('smb',500),('smb',500),('smb',700),('smb',300),('smb',2500),('smb',400),('solo',75);
CREATE TABLE d1021_cust_changes (customer_id INTEGER, segment TEXT, changed_at TEXT);
INSERT INTO d1021_cust_changes VALUES (1,'Bronze','2026-01-01'),(1,'Bronze','2026-02-10'),(1,'Silver','2026-04-01'),(1,'Gold','2026-10-01'),(2,'Silver','2026-03-15'),(3,'Bronze','2026-01-20'),(3,NULL,'2026-05-01'),(3,NULL,'2026-06-01'),(3,'Gold','2026-08-01'),(3,'Gold','2026-09-01');
CREATE TABLE d1021_touches (touch_id INTEGER, user_id INTEGER, touch_time TEXT, channel TEXT);
INSERT INTO d1021_touches VALUES (1,10,'2026-03-01 09:00','email'),(2,10,'2026-03-05 10:00','paid_social'),(3,20,'2026-03-02 12:00','paid_social'),(4,30,'2026-03-03 08:00','organic'),(5,30,'2026-03-03 08:00','email'),(6,40,'2026-03-04 14:00','organic'),(7,40,'2026-03-01 14:00','organic'),(8,60,'2026-03-06 11:00','email');
CREATE TABLE d1021_convs (conv_id INTEGER, user_id INTEGER, conv_time TEXT, revenue INTEGER);
INSERT INTO d1021_convs VALUES (1,10,'2026-03-10',300),(2,20,'2026-03-11',200),(3,30,'2026-03-12',90),(4,40,'2026-03-13',50),(5,40,'2026-03-14',60),(6,50,'2026-03-15',50),(7,70,'2026-03-16',120);
CREATE TABLE d1021_sessions (player_id INTEGER, play_date TEXT);
INSERT INTO d1021_sessions VALUES (1,'2026-03-01'),(2,'2026-03-01'),(1,'2026-03-02'),(3,'2026-03-03'),(4,'2026-03-03'),(4,'2026-03-04'),(5,'2026-03-07'),(1,'2026-03-07'),(2,'2026-03-10'),(3,'2026-03-10'),(6,'2026-03-12'),(1,'2026-03-12');
-- 2026-10-22
CREATE TABLE d1022_listings (listing_id INTEGER, host_id INTEGER, city TEXT, beds INTEGER);
INSERT INTO d1022_listings VALUES (1,101,'Paris',2),(2,101,'Paris',1),(3,102,'Rome',4),(4,103,'Rome',2),(5,103,'Milan',NULL),(6,103,'Milan',2),(7,104,'Paris',3),(8,104,'Berlin',1),(9,105,'Berlin',4),(10,106,'Rome',1),(11,102,'Rome',NULL),(12,107,'Paris',3);
CREATE TABLE d1022_messages (msg_id INTEGER, sender_id INTEGER, receiver_id INTEGER, sent_at TEXT);
INSERT INTO d1022_messages VALUES (1,1,2,'2026-08-09 23:59'),(2,1,3,'2026-08-10 00:00'),(3,1,2,'2026-08-12 10:15'),(4,2,1,'2026-08-12 10:20'),(5,3,1,'2026-08-15 09:00'),(6,1,4,'2026-08-20 23:59'),(7,2,3,'2026-08-21 00:00'),(8,2,4,'2026-08-18 18:00'),(9,4,1,'2026-08-19 12:00'),(10,2,1,'2026-08-19 12:30'),(11,3,2,'2026-08-11 08:00'),(12,3,4,'2026-08-13 08:00'),(13,3,1,'2026-08-14 08:00');
CREATE TABLE d1022_calls (call_id INTEGER, caller_id INTEGER, callee_id INTEGER, duration INTEGER);
INSERT INTO d1022_calls VALUES (1,1,2,70),(2,2,1,30),(3,1,3,20),(4,3,1,45),(5,3,1,10),(6,2,3,60),(7,4,2,15),(8,2,4,25);
CREATE TABLE d1022_rides (ride_id INTEGER, city TEXT, fare REAL, status TEXT);
INSERT INTO d1022_rides VALUES (1,'Tel Aviv',25.5,'completed'),(2,'Tel Aviv',30,'completed'),(3,'Tel Aviv',19.5,'completed'),(4,'Tel Aviv',40,'cancelled'),(5,'Haifa',18,'completed'),(6,'Haifa',22,'completed'),(7,'Haifa',50,'cancelled'),(8,'Jerusalem',35,'completed'),(9,'Jerusalem',28.5,'completed'),(10,'Jerusalem',31,'completed'),(11,'Jerusalem',29.5,'completed'),(12,'Beer Sheva',15,'completed'),(13,'Beer Sheva',17,'completed'),(14,'Beer Sheva',16,'completed');
CREATE TABLE d1022_tickets (ticket_id INTEGER, priority TEXT, created_at TEXT, resolved_at TEXT);
INSERT INTO d1022_tickets VALUES (1,'high','2026-09-01','2026-09-02'),(2,'high','2026-09-02',NULL),(3,'high','2026-09-03','2026-09-03'),(4,'high','2026-09-04','2026-09-06'),(5,'medium','2026-09-01',NULL),(6,'medium','2026-09-02','2026-09-05'),(7,'medium','2026-09-03',NULL),(8,'medium','2026-09-04','2026-09-04'),(9,'medium','2026-09-05',NULL),(10,'low','2026-09-01','2026-09-09'),(11,'low','2026-09-02','2026-09-03'),(12,'low','2026-09-03','2026-09-07');
CREATE TABLE d1022_users (user_id INTEGER, city TEXT);
INSERT INTO d1022_users VALUES (1,'Boston'),(2,'Boston'),(3,'Denver'),(4,'Austin'),(5,'Austin'),(6,'Seattle'),(7,'Seattle'),(8,'Miami'),(9,'San Francisco'),(10,'San Francisco');
CREATE TABLE d1022_trades (order_id INTEGER, user_id INTEGER, status TEXT);
INSERT INTO d1022_trades VALUES (1,9,'Completed'),(2,10,'Completed'),(3,9,'Completed'),(4,10,'Completed'),(5,9,'Cancelled'),(6,1,'Completed'),(7,2,'Completed'),(8,1,'Completed'),(9,2,'Cancelled'),(10,4,'Completed'),(11,5,'Completed'),(12,4,'Cancelled'),(13,6,'Completed'),(14,7,'Cancelled'),(15,3,'Completed'),(16,8,'Cancelled'),(17,8,'Cancelled');
CREATE TABLE d1022_accounts (account_id INTEGER, income INTEGER);
INSERT INTO d1022_accounts VALUES (1,19999),(2,20000),(3,35000),(4,50000),(5,8000),(6,48000),(7,12000),(8,20001);
CREATE TABLE d1022_customers (customer_id INTEGER, name TEXT);
INSERT INTO d1022_customers VALUES (1,'Noa'),(2,'Omer'),(3,'Pnina'),(4,'Roni'),(5,'Shai'),(6,'Tal');
CREATE TABLE d1022_orders (order_id INTEGER, customer_id INTEGER, order_date TEXT, amount INTEGER);
INSERT INTO d1022_orders VALUES (1,1,'2026-08-31',120),(2,1,'2026-08-15',80),(3,2,'2026-09-01',60),(4,3,'2026-07-04',200),(5,3,'2026-06-01',90),(6,4,'2026-09-20',45),(7,5,'2026-08-01',70);
CREATE TABLE d1022_dlv (delivery_id INTEGER, restaurant TEXT, promised_min INTEGER, actual_min INTEGER);
INSERT INTO d1022_dlv VALUES (1,'Pizza Roma',30,25),(2,'Pizza Roma',30,35),(3,'Pizza Roma',30,30),(4,'Pizza Roma',30,40),(5,'Pizza Roma',30,NULL),(6,'Sushi Bar',40,38),(7,'Sushi Bar',40,45),(8,'Sushi Bar',40,36),(9,'Falafel King',20,25),(10,'Falafel King',20,NULL),(11,'Burger Hub',25,20),(12,'Burger Hub',25,22),(13,'Burger Hub',25,24),(14,'Burger Hub',25,25),(15,'Burger Hub',25,18);
CREATE TABLE d1022_web_signups (email TEXT, signup_date TEXT);
INSERT INTO d1022_web_signups VALUES ('Dana@Mail.com','2026-03-05'),('eli@mail.com','2026-03-07'),('Fay@mail.com','2026-03-09'),('eli@mail.com','2026-03-20'),('gil@mail.com','2026-04-01');
CREATE TABLE d1022_app_signups (email TEXT, signup_date TEXT);
INSERT INTO d1022_app_signups VALUES ('dana@mail.com','2026-03-02'),('hen@mail.com','2026-03-10'),('FAY@mail.com','2026-03-09'),('ido@mail.com','2026-04-05');
CREATE TABLE d1022_dd (delivery_id INTEGER, driver_id INTEGER, start_time TEXT, end_time TEXT);
INSERT INTO d1022_dd VALUES (1,1,'2026-03-01 10:00:00','2026-03-01 10:30:00'),(2,1,'2026-03-01 12:00:00','2026-03-01 12:20:00'),(3,1,'2026-03-02 09:00:00','2026-03-02 09:40:00'),(4,2,'2026-03-01 10:00:00','2026-03-01 10:25:00'),(5,2,'2026-03-01 14:00:00','2026-03-01 14:25:00'),(6,2,'2026-03-02 11:00:00','2026-03-02 11:30:00'),(7,3,'2026-03-01 08:00:00','2026-03-01 08:15:00'),(8,3,'2026-03-02 08:00:00','2026-03-02 08:30:00'),(9,3,'2026-03-02 09:00:00',NULL);
CREATE TABLE d1022_members (member_id INTEGER, name TEXT);
INSERT INTO d1022_members VALUES (1,'a'),(2,'b'),(5,'c'),(6,'d'),(9,'e'),(12,'f');
CREATE TABLE d1022_salary (emp_id INTEGER, dept TEXT, pay_month TEXT, amount INTEGER);
INSERT INTO d1022_salary VALUES (1,'A','2026-01',3000),(2,'A','2026-01',5000),(3,'B','2026-01',4000),(4,'B','2026-01',4000),(5,'C','2026-01',6000),(1,'A','2026-02',5000),(2,'A','2026-02',3000),(3,'B','2026-02',6000),(4,'B','2026-02',4000),(5,'C','2026-02',2000),(1,'A','2026-03',5000),(3,'B','2026-03',3000);
CREATE TABLE d1022_guest_msgs (guest_id INTEGER, host_id INTEGER, n_messages INTEGER);
INSERT INTO d1022_guest_msgs VALUES (1,10,5),(1,11,3),(2,10,8),(3,12,4),(3,10,3),(4,11,2),(5,13,8),(6,12,1),(7,10,2),(5,10,0);
CREATE TABLE d1022_no1 (chart_date TEXT, song TEXT);
INSERT INTO d1022_no1 VALUES ('2026-03-01','A'),('2026-03-02','A'),('2026-03-03','A'),('2026-03-04','B'),('2026-03-05','B'),('2026-03-06','A'),('2026-03-07','A'),('2026-03-09','A'),('2026-03-10','A'),('2026-03-11','A'),('2026-03-12','A'),('2026-03-13','C');
-- 2026-10-23
CREATE TABLE d1023_watch (user_id INTEGER, series TEXT, episode INTEGER, watched_at TEXT);
INSERT INTO d1023_watch VALUES (1,'Dark Harbor',1,'2026-04-01'),(1,'Dark Harbor',2,'2026-04-02'),(1,'Pixel Kings',1,'2026-04-02'),(1,'Salt Road',1,'2026-04-03'),(1,'Salt Road',2,'2026-04-04'),(2,'Dark Harbor',1,'2026-04-01'),(2,'Dark Harbor',2,'2026-04-01'),(2,'Dark Harbor',3,'2026-04-02'),(2,'Pixel Kings',1,'2026-04-03'),(3,'Dark Harbor',1,'2026-04-02'),(3,'Pixel Kings',1,'2026-04-02'),(3,'Salt Road',1,'2026-04-05'),(3,'Last Orchard',1,'2026-04-06'),(3,'Last Orchard',2,'2026-04-07'),(4,'Salt Road',1,'2026-04-01'),(4,'Salt Road',2,'2026-04-02'),(4,'Salt Road',3,'2026-04-03'),(5,'Pixel Kings',1,'2026-04-04'),(5,'Last Orchard',1,'2026-04-04'),(5,'Salt Road',1,'2026-04-05'),(6,'Dark Harbor',1,'2026-04-06');
CREATE TABLE d1023_apple_events (event_id INTEGER, user_id INTEGER, device TEXT, event_name TEXT);
INSERT INTO d1023_apple_events VALUES (1,101,'MacBook Pro','play'),(2,101,'MacBook Pro','pause'),(3,102,'iPhone','play'),(4,103,'MacBook Pro','play'),(5,103,'MacBook Pro','like'),(6,104,'MacBook Air','play'),(7,101,'MacBook Pro','play'),(8,105,'MacBook Pro','share'),(9,105,'MacBook Pro','like'),(10,103,'MacBook Pro','like'),(11,106,'iPad','like'),(12,102,'iPhone','pause'),(13,107,'MacBook Pro','pause'),(14,107,'MacBook Pro','play'),(15,104,'MacBook Air','like');
CREATE TABLE d1023_speakers (country TEXT, region TEXT, language TEXT, speakers INTEGER);
INSERT INTO d1023_speakers VALUES ('Spain','Madrid','Spanish',6500000),('Spain','Catalonia','Catalan',4200000),('Spain','Catalonia','Spanish',3100000),('Mexico','North','Spanish',31000000),('Mexico','South','Spanish',45000000),('Mexico','South','Nahuatl',1500000),('Canada','Quebec','French',6900000),('Canada','Ontario','English',11000000),('Canada','Quebec','English',650000),('USA','West','English',90000000),('USA','South','Spanish',20000000),('USA','South','English',70000000),('France','North','French',40000000),('France','South','Occitan',500000),('Belgium','Wallonia','French',3400000),('Belgium','Flanders','Dutch',6300000);
CREATE TABLE d1023_inventory (sku TEXT, warehouse TEXT, qty INTEGER, reorder_level INTEGER);
INSERT INTO d1023_inventory VALUES ('A100','North',5,10),('A100','South',12,10),('B200','North',0,NULL),('B200','South',3,NULL),('C300','North',10,10),('C300','South',9,10),('D400','North',0,5),('E500','South',7,NULL),('F600','North',2,3);
CREATE TABLE d1023_visits (visit_id INTEGER, clinic TEXT, patient_id INTEGER, visit_date TEXT, fee REAL, status TEXT);
INSERT INTO d1023_visits VALUES (1,'Haifa',11,'2026-05-02',200,'done'),(2,'Haifa',12,'2026-05-03',350,'done'),(3,'Haifa',11,'2026-05-09',150,'cancelled'),(4,'Haifa',13,'2026-05-11',NULL,'done'),(5,'Eilat',14,'2026-05-02',400,'done'),(6,'Eilat',15,'2026-05-04',100,'no_show'),(7,'Eilat',14,'2026-05-20',250,'done'),(8,'Eilat',16,'2026-05-21',300,'done'),(9,'Tel Aviv',17,'2026-05-05',500,'done'),(10,'Tel Aviv',18,'2026-05-06',120,'cancelled'),(11,'Tel Aviv',19,'2026-05-07',90,'cancelled'),(12,'Beer Sheva',20,'2026-05-08',180,'done'),(13,'Beer Sheva',21,'2026-05-09',220,'done');
CREATE TABLE d1023_signups (user_id INTEGER, signup_date TEXT);
INSERT INTO d1023_signups VALUES (1,'2026-06-01'),(2,'2026-06-02'),(3,'2026-06-03'),(4,'2026-06-05'),(5,'2026-06-08'),(6,'2026-06-10'),(7,'2026-06-11');
CREATE TABLE d1023_purchases (user_id INTEGER, purchase_date TEXT, amount REAL);
INSERT INTO d1023_purchases VALUES (1,'2026-06-01',20),(1,'2026-06-20',35),(2,'2026-06-09',15),(3,'2026-06-11',40),(3,'2026-06-04',10),(4,'2026-06-13',22),(5,'2026-06-07',18),(5,'2026-06-30',60),(6,'2026-06-25',12),(9,'2026-06-02',50);
CREATE TABLE d1023_tx (tx_id INTEGER, customer_id INTEGER, tx_date TEXT, amount REAL);
INSERT INTO d1023_tx VALUES (1,1,'2026-02-01',80),(2,1,'2026-02-10',20),(3,2,'2026-02-03',30),(4,2,'2026-02-04',90),(5,3,'2026-02-05',50),(6,3,'2026-02-05',10),(7,3,'2026-03-01',70),(8,4,'2026-02-07',49.99),(9,5,'2026-02-08',120),(10,4,'2026-02-09',200),(11,6,'2026-01-30',60),(12,6,'2026-02-15',65),(13,6,'2026-03-02',5);
CREATE TABLE d1023_views (user_id INTEGER, title TEXT, minutes INTEGER, view_date TEXT);
INSERT INTO d1023_views VALUES (1,'Dark Harbor',120,'2026-03-02'),(1,'Pixel Kings',300,'2026-03-15'),(1,'Salt Road',90,'2026-04-01'),(2,'Dark Harbor',500,'2026-03-10'),(2,'Salt Road',100,'2026-02-28'),(3,'Last Orchard',200,'2026-03-31'),(3,'Pixel Kings',250,'2026-03-01'),(4,'Salt Road',410,'2026-03-20'),(5,'Dark Harbor',60,'2026-03-05'),(5,'Pixel Kings',45,'2026-03-06'),(6,'Last Orchard',450,'2026-03-12'),(7,'Salt Road',600,'2026-04-02'),(7,'Dark Harbor',30,'2026-03-30'),(8,'Pixel Kings',410,'2026-03-25');
CREATE TABLE d1023_cust (customer_id INTEGER, name TEXT);
INSERT INTO d1023_cust VALUES (1,'Dana'),(2,'Omer'),(3,'Noa'),(4,'Yossi'),(5,'Lior');
CREATE TABLE d1023_prod (product_id INTEGER, price INTEGER);
INSERT INTO d1023_prod VALUES (10,20),(20,25),(30,30),(40,100);
CREATE TABLE d1023_ord (order_id INTEGER, customer_id INTEGER, product_id INTEGER, order_date TEXT, quantity INTEGER);
INSERT INTO d1023_ord VALUES (1,1,10,'2026-06-10',5),(2,1,20,'2026-07-01',4),(3,2,10,'2026-06-12',2),(4,2,20,'2026-07-02',3),(5,3,30,'2026-06-30',4),(6,3,30,'2026-07-31',3),(7,4,40,'2026-06-05',1),(8,4,40,'2026-08-01',2),(9,5,20,'2026-06-01',2),(10,5,20,'2026-06-15',2),(11,5,10,'2026-07-20',5),(12,2,10,'2026-07-15',2);
CREATE TABLE d1023_hr_emp (emp_id INTEGER, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO d1023_hr_emp VALUES (1,'Avi','Management',30000,NULL),(2,'Bat','Eng',22000,1),(3,'Gil','Eng',16000,2),(4,'Dor','Eng',9000,2),(5,'Hila','Eng',16000,6),(6,'Tal','Sales',18000,1),(7,'Yair','Sales',10000,6),(8,'Keren','Sales',12000,6),(9,'Lia','Sales',17000,2),(10,'Mor','Support',8000,6),(11,'Nir','Support',9500,1);
CREATE TABLE d1023_cust_years (customer_id INTEGER, industry TEXT, active_year INTEGER);
INSERT INTO d1023_cust_years VALUES (1,'Retail',2023),(1,'Retail',2024),(1,'Retail',2025),(2,'Retail',2023),(2,'Retail',2024),(3,'Retail',2023),(3,'Retail',2025),(4,'Retail',2024),(4,'Retail',2025),(5,'Retail',2024),(6,'Food',2023),(6,'Food',2024),(7,'Food',2023),(8,'Food',2023),(8,'Food',2024),(8,'Food',2025),(9,'Food',2024),(10,'Food',2025);
CREATE TABLE d1023_shop_orders (customer_id INTEGER, order_date TEXT);
INSERT INTO d1023_shop_orders VALUES (1,'2026-01-05'),(1,'2026-01-20'),(1,'2026-02-11'),(1,'2026-04-02'),(2,'2026-01-15'),(2,'2026-02-02'),(2,'2026-02-25'),(3,'2026-01-30'),(4,'2026-02-03'),(4,'2026-03-04'),(4,'2026-04-04'),(5,'2026-02-10'),(5,'2026-04-15'),(6,'2026-02-20'),(6,'2026-03-01'),(7,'2026-03-05'),(8,'2026-03-10'),(8,'2026-04-01'),(9,'2026-03-22');
CREATE TABLE d1023_cust_orders (order_id INTEGER, customer_id INTEGER, order_date TEXT, amount REAL);
INSERT INTO d1023_cust_orders VALUES (1,1,'2026-01-03',100),(2,1,'2026-01-15',150),(3,1,'2026-02-01',90),(4,1,'2026-02-20',200),(5,2,'2026-01-10',50),(6,2,'2026-01-10',70),(7,2,'2026-01-22',60),(8,3,'2026-01-05',300),(9,4,'2026-01-06',40),(10,4,'2026-02-06',40),(11,4,'2026-03-06',45),(12,3,'2026-03-01',310);
CREATE TABLE d1023_daily_rev (day TEXT, revenue INTEGER);
INSERT INTO d1023_daily_rev VALUES ('2026-05-01',100),('2026-05-02',200),('2026-05-04',300),('2026-05-05',150),('2026-05-08',90),('2026-05-09',60),('2026-05-10',240),('2026-05-12',120);
CREATE TABLE d1023_ad_events (user_id INTEGER, campaign TEXT, event_type TEXT, event_ts TEXT);
INSERT INTO d1023_ad_events VALUES (1,'spring','impression','2026-04-01 10:00'),(1,'spring','click','2026-04-01 10:05'),(1,'spring','purchase','2026-04-01 11:00'),(2,'spring','impression','2026-04-01 12:00'),(2,'spring','click','2026-04-01 12:30'),(3,'spring','click','2026-04-02 09:00'),(3,'spring','impression','2026-04-02 09:10'),(3,'spring','purchase','2026-04-02 09:20'),(4,'spring','impression','2026-04-03 08:00'),(4,'spring','impression','2026-04-03 08:30'),(5,'spring','impression','2026-04-03 15:00'),(5,'spring','click','2026-04-03 15:10'),(5,'spring','purchase','2026-04-04 10:00'),(6,'summer','impression','2026-07-01 10:00'),(6,'summer','click','2026-07-01 10:02'),(6,'summer','click','2026-07-01 10:03'),(7,'summer','impression','2026-07-01 11:00'),(7,'summer','purchase','2026-07-01 11:05'),(8,'summer','impression','2026-07-02 12:00'),(8,'summer','click','2026-07-02 12:01'),(8,'summer','purchase','2026-07-02 12:09'),(1,'summer','impression','2026-07-03 09:00'),(1,'summer','click','2026-07-03 09:10');
-- 2026-10-24
CREATE TABLE d1024_stations (id INTEGER, city TEXT, lat_n REAL, long_w REAL);
INSERT INTO d1024_stations VALUES (1,'Aville',38.7891,70.2145),(2,'Bburg',45.1263,121.8307),(3,'Cton',32.4417,88.5521),(4,'Dford',40.9054,66.3379),(5,'Eport',35.6620,101.9183),(6,'Fdale',44.3318,75.0046);
CREATE TABLE d1024_receipts (receipt_id INTEGER, user_id INTEGER, store TEXT, total INTEGER, receipt_date TEXT);
INSERT INTO d1024_receipts VALUES (1,101,'FreshMart',54,'2026-10-01'),(2,101,'FreshMart',54,'2026-10-01'),(3,101,'FreshMart',54,'2026-10-02'),(4,102,'CornerShop',20,'2026-10-03'),(5,102,'CornerShop',20,'2026-10-03'),(6,102,'CornerShop',20,'2026-10-03'),(7,103,'FreshMart',54,'2026-10-01'),(8,103,'CornerShop',20,'2026-10-03'),(9,104,'MegaStore',210,'2026-10-05'),(10,104,'MegaStore',210,'2026-10-05'),(11,104,'MegaStore',180,'2026-10-05');
CREATE TABLE d1024_products (product_id INTEGER, name TEXT, category TEXT, price INTEGER, stock INTEGER);
INSERT INTO d1024_products VALUES (1,'Desk Lamp','home',45,12),(2,'Sofa','home',899,0),(3,'Rug','home',120,5),(4,'Mug','kitchen',12,100),(5,'Pan','kitchen',35,0),(6,'Knife Set','kitchen',89,8),(7,'Kettle','kitchen',49,20),(8,'Pen','office',3,500),(9,'Notebook','office',9,0),(10,'Chair','office',250,4),(11,'Stapler','office',15,30),(12,'Candle','home',18,60),(13,'Hose','garden',30,7),(14,'Shovel','garden',40,0);
CREATE TABLE d1024_tasks (task_id INTEGER, assignee TEXT, due_date TEXT, done_date TEXT);
INSERT INTO d1024_tasks VALUES (1,'Dana','2026-09-10',NULL),(2,'Dana','2026-09-20','2026-09-18'),(3,'Dana','2026-09-25',NULL),(4,'Eli','2026-09-15',NULL),(5,'Eli','2026-10-15',NULL),(6,NULL,'2026-08-30',NULL),(7,NULL,'2026-09-02',NULL),(8,'Noa','2026-09-28','2026-10-02'),(9,'Noa','2026-09-30',NULL),(10,'Gil','2026-10-01',NULL);
CREATE TABLE d1024_country (code TEXT, name TEXT, continent TEXT);
INSERT INTO d1024_country VALUES ('EG','Egypt','Africa'),('KE','Kenya','Africa'),('FR','France','Europe'),('JP','Japan','Asia'),('NG','Nigeria','Africa'),('BR','Brazil','South America');
CREATE TABLE d1024_city (id INTEGER, name TEXT, country_code TEXT, population INTEGER);
INSERT INTO d1024_city VALUES (1,'Cairo','EG',9500000),(2,'Alexandria','EG',5200000),(3,'Nairobi','KE',4400000),(4,'Mombasa','KE',1200000),(5,'Nakuru','KE',570000),(6,'Paris','FR',2100000),(7,'Lyon','FR',520000),(8,'Tokyo','JP',13900000),(9,'Lagos','NG',14800000),(10,'Sao Paulo','BR',12300000),(11,'Atlantis','XX',3000000);
CREATE TABLE d1024_members (member_id INTEGER, join_date TEXT);
INSERT INTO d1024_members VALUES (1,'2024-03-12'),(2,'2025-01-05'),(3,'2025-06-20'),(4,'2023-11-30'),(5,'2025-09-01');
CREATE TABLE d1024_mkt_orders (order_id INTEGER, order_date TEXT, member_id INTEGER);
INSERT INTO d1024_mkt_orders VALUES (1,'2025-02-10',1),(2,'2025-08-15',1),(3,'2024-12-31',1),(4,'2025-12-31',2),(5,'2026-01-01',2),(6,'2025-06-21',3),(7,'2025-07-01',3),(8,'2025-07-02',3),(9,'2024-05-05',4);
CREATE TABLE d1024_submissions (sub_id INTEGER, parent_id INTEGER);
INSERT INTO d1024_submissions VALUES (10,NULL),(20,NULL),(10,NULL),(30,NULL),(40,NULL),(11,10),(12,10),(12,10),(13,10),(21,20),(22,20),(23,21),(31,30);
CREATE TABLE d1024_flights (flight_id INTEGER, origin TEXT, destination TEXT);
INSERT INTO d1024_flights VALUES (1,'Dallas','Seattle'),(2,'Seattle','Dallas'),(3,'Dallas','Seattle'),(4,'Boston','Miami'),(5,'Denver','Boston'),(6,'Miami','Boston'),(7,'Austin','Denver');
CREATE TABLE d1024_user_moods (user_id INTEGER, mood TEXT, ts TEXT);
INSERT INTO d1024_user_moods VALUES (1,'Bored','2026-10-01 10:00:00'),(1,'Excited','2026-10-05 10:00:00'),(2,'Neutral','2026-10-01 11:00:00'),(2,'Excited','2026-10-03 09:00:00'),(3,'Excited','2026-10-01 08:00:00'),(3,'Neutral','2026-10-04 08:00:00'),(4,'Excited','2026-10-02 12:00:00'),(5,'Excited','2026-10-02 13:00:00'),(5,'Excited','2026-10-06 13:00:00'),(6,'Bored','2026-10-01 14:00:00');
CREATE TABLE d1024_friend_pairs (user_a INTEGER, user_b INTEGER);
INSERT INTO d1024_friend_pairs VALUES (1,2),(5,3);
CREATE TABLE d1024_rsvp (user_id INTEGER, event_id INTEGER, event_type TEXT, status TEXT);
INSERT INTO d1024_rsvp VALUES (1,100,'private','going'),(2,100,'private','going'),(3,100,'private','maybe'),(4,100,'private','not_going'),(5,100,'private','going'),(1,101,'private','going'),(2,101,'private','maybe'),(3,101,'private','going'),(5,101,'private','going'),(1,102,'public','going'),(2,102,'public','going'),(3,102,'public','going'),(1,103,'private','going'),(3,103,'private','going'),(3,103,'private','going'),(2,104,'private','going'),(4,104,'private','going');
CREATE TABLE d1024_web_log (user_id INTEGER, ts TEXT, action TEXT);
INSERT INTO d1024_web_log VALUES (1,'2026-10-01 09:00:00','page_load'),(1,'2026-10-01 09:30:00','page_load'),(1,'2026-10-01 09:45:00','page_exit'),(1,'2026-10-01 10:00:00','page_exit'),(1,'2026-10-02 12:00:00','page_load'),(1,'2026-10-02 12:01:40','page_exit'),(2,'2026-10-01 08:00:00','page_load'),(2,'2026-10-01 07:50:00','page_exit'),(2,'2026-10-03 14:00:00','page_load'),(2,'2026-10-03 14:10:00','page_exit'),(3,'2026-10-01 11:00:00','page_load'),(3,'2026-10-02 11:05:00','page_exit'),(4,'2026-10-04 20:00:00','page_load'),(4,'2026-10-04 20:00:30','page_exit'),(5,'2026-10-05 10:00:00','page_load'),(5,'2026-10-05 10:20:00','page_load'),(5,'2026-10-05 10:10:00','page_exit'),(5,'2026-10-05 10:30:00','page_exit');
CREATE TABLE d1024_signups (user_id INTEGER, created_at TEXT);
INSERT INTO d1024_signups VALUES (1,'2026-09-29 08:10:00'),(2,'2026-09-29 17:45:00'),(3,'2026-09-30 09:00:00'),(4,'2026-10-01 07:30:00'),(5,'2026-10-01 12:00:00'),(6,'2026-10-01 23:59:00'),(7,'2026-10-03 10:15:00'),(8,'2026-10-04 06:00:00'),(9,'2026-10-04 18:20:00'),(10,'2026-10-31 13:00:00'),(11,'2026-11-01 00:05:00'),(12,'2026-11-01 15:00:00'),(13,'2026-11-02 09:30:00');
CREATE TABLE d1024_prod (product_id INTEGER, price INTEGER);
INSERT INTO d1024_prod VALUES (1,100),(2,50),(3,25),(4,10);
CREATE TABLE d1024_sales (sale_id INTEGER, product_id INTEGER, user_id INTEGER, quantity INTEGER);
INSERT INTO d1024_sales VALUES (1,1,1,1),(2,2,1,1),(3,2,1,1),(4,3,1,2),(5,3,2,4),(6,4,2,3),(7,4,3,2),(8,4,3,1),(9,3,3,1),(10,1,4,2),(11,2,4,1);
CREATE TABLE d1024_invoices (invoice_id INTEGER, customer TEXT, amount INTEGER);
INSERT INTO d1024_invoices VALUES (1,'Alpha',100),(2,'Alpha',200),(3,'Beta',120),(4,'Beta',80),(5,'Gamma',200),(6,'Delta',50),(7,'Delta',100),(8,'Epsilon',150);
`;
