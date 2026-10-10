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
`;
