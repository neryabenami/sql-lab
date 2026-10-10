// מסד הנתונים לתרגול: סכמה ונתוני דוגמה (SQLite)

const SCHEMA_INFO = {
  departments: {
    desc: 'מחלקות בחברה',
    columns: [['id', 'INTEGER'], ['name', 'TEXT'], ['location', 'TEXT']],
  },
  employees: {
    desc: 'עובדים. manager_id מצביע על עובד אחר בטבלה',
    columns: [['id', 'INTEGER'], ['name', 'TEXT'], ['department_id', 'INTEGER'], ['manager_id', 'INTEGER'],
      ['salary', 'INTEGER'], ['hire_date', 'TEXT'], ['city', 'TEXT']],
  },
  customers: {
    desc: 'לקוחות עסקיים',
    columns: [['id', 'INTEGER'], ['name', 'TEXT'], ['city', 'TEXT'], ['country', 'TEXT'], ['signup_date', 'TEXT']],
  },
  products: {
    desc: 'קטלוג מוצרים',
    columns: [['id', 'INTEGER'], ['name', 'TEXT'], ['category', 'TEXT'], ['price', 'REAL']],
  },
  orders: {
    desc: "הזמנות. status: completed / cancelled / pending",
    columns: [['id', 'INTEGER'], ['customer_id', 'INTEGER'], ['order_date', 'TEXT'], ['status', 'TEXT']],
  },
  order_items: {
    desc: 'שורות בהזמנה: מוצר, כמות ומחיר ליחידה',
    columns: [['order_id', 'INTEGER'], ['product_id', 'INTEGER'], ['quantity', 'INTEGER'], ['unit_price', 'REAL']],
  },
  users: {
    desc: 'משתמשים באפליקציה',
    columns: [['id', 'INTEGER'], ['name', 'TEXT'], ['country', 'TEXT'], ['signup_date', 'TEXT']],
  },
  logins: {
    desc: 'כניסות יומיות של משתמשים (שורה אחת לכל יום כניסה)',
    columns: [['user_id', 'INTEGER'], ['login_date', 'TEXT']],
  },
  events: {
    desc: "אירועים באתר. event_type: view / add_to_cart / purchase",
    columns: [['user_id', 'INTEGER'], ['event_type', 'TEXT'], ['event_date', 'TEXT']],
  },
  transactions: {
    desc: 'תשלומים של משתמשים',
    columns: [['id', 'INTEGER'], ['user_id', 'INTEGER'], ['amount', 'REAL'], ['txn_date', 'TEXT']],
  },
};

const SEED_SQL = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, location TEXT);
INSERT INTO departments VALUES
 (1,'Engineering','Tel Aviv'),(2,'Sales','Haifa'),(3,'Marketing','Tel Aviv'),
 (4,'HR','Jerusalem'),(5,'Finance','Jerusalem'),(6,'Legal','Haifa');

CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department_id INTEGER, manager_id INTEGER,
  salary INTEGER, hire_date TEXT, city TEXT);
INSERT INTO employees VALUES
 (1,'Dana Levi',1,NULL,42000,'2015-03-01','Tel Aviv'),
 (2,'Yossi Cohen',1,1,31000,'2017-06-15','Tel Aviv'),
 (3,'Noa Mizrahi',1,1,28000,'2019-01-10','Haifa'),
 (4,'Amit Peretz',1,2,22000,'2021-09-01','Tel Aviv'),
 (5,'Shira Biton',1,2,24500,'2022-02-20','Ramat Gan'),
 (6,'Eitan Friedman',2,1,30000,'2016-11-05','Haifa'),
 (7,'Maya Avraham',2,6,18000,'2020-04-12','Haifa'),
 (8,'Omer Katz',2,6,19500,'2021-07-01','Tel Aviv'),
 (9,'Tamar Shapiro',2,6,16000,'2023-03-15','Netanya'),
 (10,'Lior Dahan',3,1,27000,'2018-08-20','Tel Aviv'),
 (11,'Gal Ohana',3,10,17000,'2022-10-01','Ramat Gan'),
 (12,'Rotem Azulay',3,10,21000,'2020-12-01','Tel Aviv'),
 (13,'Yael Golan',4,1,23000,'2017-02-14','Jerusalem'),
 (14,'Ido Ben David',4,13,14000,'2023-06-01','Jerusalem'),
 (15,'Hila Malka',5,1,29000,'2016-05-30','Jerusalem'),
 (16,'Ron Segal',5,15,21000,'2019-09-09','Jerusalem'),
 (17,'Michal Tal',5,15,21000,'2021-01-17','Tel Aviv'),
 (18,'Avi Hadad',1,2,26000,'2020-07-07','Haifa'),
 (19,'Neta Rosen',2,6,19500,'2024-01-08','Haifa'),
 (20,'Ben Sasson',NULL,NULL,15000,'2024-05-01','Tel Aviv');

CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT, country TEXT, signup_date TEXT);
INSERT INTO customers VALUES
 (1,'Acme Ltd','Tel Aviv','Israel','2023-01-05'),
 (2,'Blue Ocean','Haifa','Israel','2023-02-11'),
 (3,'Cedar Group','New York','USA','2023-02-20'),
 (4,'Delta Foods','London','UK','2023-03-03'),
 (5,'Echo Tech','Tel Aviv','Israel','2023-04-18'),
 (6,'Falcon Inc','Boston','USA','2023-05-22'),
 (7,'Green Leaf','Berlin','Germany','2023-06-30'),
 (8,'Horizon','Jerusalem','Israel','2023-08-14'),
 (9,'Iris Design','London','UK','2023-09-01'),
 (10,'Jade Systems','New York','USA','2023-11-11'),
 (11,'Kite Labs','Berlin','Germany','2024-01-09'),
 (12,'Lotus Retail','Haifa','Israel','2024-02-27');

CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL);
INSERT INTO products VALUES
 (1,'Laptop Pro','Electronics',5200),(2,'Wireless Mouse','Electronics',120),
 (3,'4K Monitor','Electronics',1800),(4,'USB-C Hub','Electronics',250),
 (5,'Office Chair','Furniture',950),(6,'Standing Desk','Furniture',2400),
 (7,'Bookshelf','Furniture',600),(8,'Coffee Beans','Grocery',65),
 (9,'Green Tea','Grocery',30),(10,'Notebook Pack','Stationery',45),
 (11,'Gel Pens','Stationery',25),(12,'Desk Lamp','Furniture',180);

CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, order_date TEXT, status TEXT);
INSERT INTO orders VALUES
 (1,1,'2024-01-03','completed'),(2,2,'2024-01-07','completed'),(3,1,'2024-01-15','completed'),
 (4,3,'2024-01-20','cancelled'),(5,4,'2024-02-02','completed'),(6,5,'2024-02-05','completed'),
 (7,3,'2024-02-14','completed'),(8,6,'2024-02-21','completed'),(9,1,'2024-03-01','completed'),
 (10,7,'2024-03-04','pending'),(11,2,'2024-03-10','completed'),(12,8,'2024-03-15','completed'),
 (13,9,'2024-03-22','cancelled'),(14,5,'2024-04-02','completed'),(15,10,'2024-04-09','completed'),
 (16,3,'2024-04-15','completed'),(17,4,'2024-04-28','completed'),(18,1,'2024-05-05','completed'),
 (19,6,'2024-05-12','pending'),(20,8,'2024-05-20','completed'),(21,2,'2024-06-01','completed'),
 (22,9,'2024-06-08','completed'),(23,5,'2024-06-15','completed'),(24,10,'2024-06-22','cancelled'),
 (25,7,'2024-06-29','completed');

CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price REAL);
INSERT INTO order_items VALUES
 (1,1,1,5200),(1,2,2,120),(2,8,10,65),(2,9,5,30),(3,3,2,1800),(4,6,1,2400),
 (5,5,4,950),(5,10,20,45),(6,1,2,5200),(6,4,2,250),(7,7,3,600),(8,2,5,120),(8,11,30,25),
 (9,6,2,2400),(9,5,2,950),(10,8,6,65),(11,3,1,1800),(11,4,1,250),(12,1,1,5200),
 (13,10,10,45),(14,9,12,30),(14,8,8,65),(15,1,3,5200),(15,3,3,1800),(16,5,1,950),
 (17,11,40,25),(17,10,15,45),(18,2,1,120),(18,4,3,250),(19,7,2,600),(20,6,1,2400),
 (21,8,20,65),(22,3,1,1800),(22,2,1,120),(23,1,1,5200),(23,5,1,950),(24,9,4,30),
 (25,7,1,600),(25,11,10,25);

CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, country TEXT, signup_date TEXT);
INSERT INTO users VALUES
 (1,'alice','Israel','2024-01-01'),(2,'bob','USA','2024-01-01'),(3,'carol','UK','2024-01-02'),
 (4,'dave','Israel','2024-01-03'),(5,'erin','USA','2024-01-03'),(6,'frank','Germany','2024-01-05'),
 (7,'grace','Israel','2024-01-06'),(8,'heidi','UK','2024-01-08');

CREATE TABLE logins (user_id INTEGER, login_date TEXT);
INSERT INTO logins VALUES
 (1,'2024-01-01'),(1,'2024-01-02'),(1,'2024-01-03'),(1,'2024-01-04'),(1,'2024-01-06'),(1,'2024-01-07'),(1,'2024-01-10'),
 (2,'2024-01-01'),(2,'2024-01-05'),(2,'2024-01-06'),
 (3,'2024-01-02'),(3,'2024-01-03'),(3,'2024-01-04'),(3,'2024-01-05'),(3,'2024-01-06'),(3,'2024-01-08'),
 (4,'2024-01-03'),(4,'2024-01-04'),
 (5,'2024-01-03'),
 (6,'2024-01-05'),(6,'2024-01-06'),(6,'2024-01-07'),(6,'2024-01-12'),
 (7,'2024-01-06'),(7,'2024-01-07'),(7,'2024-01-08'),(7,'2024-01-09'),(7,'2024-01-10'),(7,'2024-01-11'),
 (8,'2024-01-08');

CREATE TABLE events (user_id INTEGER, event_type TEXT, event_date TEXT);
INSERT INTO events VALUES
 (1,'view','2024-02-01'),(1,'view','2024-02-02'),(1,'add_to_cart','2024-02-02'),(1,'purchase','2024-02-03'),
 (2,'view','2024-02-01'),(2,'add_to_cart','2024-02-04'),
 (3,'view','2024-02-02'),(3,'add_to_cart','2024-02-02'),(3,'purchase','2024-02-02'),
 (4,'view','2024-02-03'),(4,'view','2024-02-05'),(4,'add_to_cart','2024-02-06'),
 (5,'view','2024-02-03'),
 (6,'view','2024-02-04'),(6,'add_to_cart','2024-02-04'),(6,'purchase','2024-02-07'),
 (7,'view','2024-02-05'),(7,'add_to_cart','2024-02-05'),(7,'purchase','2024-02-05'),(7,'purchase','2024-02-09'),
 (8,'view','2024-02-06');

CREATE TABLE transactions (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, txn_date TEXT);
INSERT INTO transactions VALUES
 (1,1,120.00,'2024-01-03'),(2,2,75.50,'2024-01-05'),(3,1,60.00,'2024-01-12'),(4,3,200.00,'2024-01-15'),
 (5,4,35.25,'2024-01-20'),(6,1,90.00,'2024-02-02'),(7,5,150.00,'2024-02-08'),(8,3,80.00,'2024-02-10'),
 (9,2,40.00,'2024-02-18'),(10,6,310.00,'2024-02-25'),(11,7,55.00,'2024-03-01'),(12,1,130.00,'2024-03-05'),
 (13,3,95.00,'2024-03-11'),(14,8,20.00,'2024-03-19'),(15,2,160.00,'2024-03-27'),(16,4,45.00,'2024-04-02'),
 (17,7,220.00,'2024-04-09'),(18,1,70.00,'2024-04-15'),(19,6,85.00,'2024-04-22'),(20,3,110.00,'2024-04-30');
`;
