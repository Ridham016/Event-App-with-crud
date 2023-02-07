CREATE TABLE IF NOT EXISTS userDetails(id INTEGER PRIMARY KEY AUTOINCREMENT,Fullname TEXT,Email VARCHAR(20),Password VARCHAR(30),TypeofEvent TEXT);
INSERT or IGNORE INTO userDetails VALUES (1,'RIdham','noob@mail.com','hello123','Team Building Events');


CREATE TABLE IF NOT EXISTS eventDetails(id INTEGER PRIMARY KEY AUTOINCREMENT,Title TEXT,DateNTime TEXT,Duration NUMBER,Description TEXT,TypeofEvent TEXT,Venue VARCHAR(30));
INSERT or IGNORE INTO eventDetails(id,Title,DateNTime,Duration,Description,TypeofEvent,Venue) VALUES (1,'Noob','2023/2/6',4,'this is shit','Team Building Events','Discord');

