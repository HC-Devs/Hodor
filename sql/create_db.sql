--
-- File generated with SQLiteStudio v3.1.1 on mar. juin 12 10:51:58 2018
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: module
CREATE TABLE module (module_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, module_name TEXT NOT NULL UNIQUE, module_type INTEGER NOT NULL);
INSERT INTO module (module_id, module_name, module_type) VALUES (3, 'crunch', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (4, 'enrich', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (5, 'genesis', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (6, 'hydrogenbayextension', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (7, 'miningboost', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (8, 'miningunity', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (9, 'remotemining', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (10, 'purge', 1);
INSERT INTO module (module_id, module_name, module_type) VALUES (11, 'areashield', 2);
INSERT INTO module (module_id, module_name, module_type) VALUES (12, 'deltashield', 2);
INSERT INTO module (module_id, module_name, module_type) VALUES (13, 'mirrorshield', 2);
INSERT INTO module (module_id, module_name, module_type) VALUES (14, 'omegashield', 2);
INSERT INTO module (module_id, module_name, module_type) VALUES (15, 'passiveshield', 2);
INSERT INTO module (module_id, module_name, module_type) VALUES (16, 'barrage', 3);
INSERT INTO module (module_id, module_name, module_type) VALUES (17, 'battery', 3);
INSERT INTO module (module_id, module_name, module_type) VALUES (18, 'duallaser', 3);
INSERT INTO module (module_id, module_name, module_type) VALUES (19, 'laser', 3);
INSERT INTO module (module_id, module_name, module_type) VALUES (20, 'massbattery', 3);
INSERT INTO module (module_id, module_name, module_type) VALUES (21, 'entrust', 4);
INSERT INTO module (module_id, module_name, module_type) VALUES (22, 'alpharocket', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (23, 'barrier', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (24, 'destiny', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (25, 'emp', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (26, 'fortify', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (27, 'impulse', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (28, 'leap', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (29, 'remoterepair', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (30, 'stealth', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (31, 'suppress', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (32, 'teleport', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (33, 'timewarp', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (34, 'unity', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (35, 'vengeance', 5);
INSERT INTO module (module_id, module_name, module_type) VALUES (36, 'cargobayextension', 5);

-- Table: ship
CREATE TABLE ship (ship_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ship_name TEXT, ship_type INTEGER NOT NULL, fk_user_id TEXT REFERENCES user (user_id) NOT NULL);

-- Table: ship_user_module
CREATE TABLE ship_user_module (ship_user_module_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_ship_id INTEGER REFERENCES ship (ship_id) NOT NULL, fk_user_module_id INTEGER REFERENCES user_module (user_module_id) NOT NULL, ship_user_module_last_activation_date DATETIME);

-- Table: ship_ws
CREATE TABLE ship_ws (ship_ws_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_ws_id INTEGER NOT NULL REFERENCES ws (ws_id), fk_ship_id INTEGER REFERENCES ship (ship_id) NOT NULL, ship_ws_destruct_time DATE);

-- Table: task
CREATE TABLE task (task_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_user_id TEXT REFERENCES user (user_id) NOT NULL, fk_user_id_author TEXT REFERENCES user (user_id) NOT NULL, task_content TEXT NOT NULL, task_deadline DATE, task_ack INTEGER, task_type INTEGER NOT NULL);

-- Table: user
CREATE TABLE user (user_id TEXT PRIMARY KEY NOT NULL, user_name TEXT NOT NULL, user_corpo TEXT NOT NULL);

-- Table: user_module
CREATE TABLE user_module (user_module_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_user_id TEXT REFERENCES user (user_id) NOT NULL, fk_module_id INTEGER REFERENCES module (module_id) NOT NULL, user_module_level INTEGER NOT NULL);

-- Table: user_ws
CREATE TABLE user_ws (user_ws_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_ws_id INTEGER REFERENCES ws (ws_id) NOT NULL, fk_user_id TEXT REFERENCES user (user_id) NOT NULL);

-- Table: user_ws_role
CREATE TABLE user_ws_role (user_ws_role__id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, fk_user_ws_id INTEGER REFERENCES user_ws (user_ws_id) NOT NULL, user_ws_role_name TEXT NOT NULL);

-- Table: ws
CREATE TABLE ws (ws_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ws_date DATE NOT NULL, ws_status INTEGER NOT NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
