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
`;
