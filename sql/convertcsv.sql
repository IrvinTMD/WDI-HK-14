DROP TABLE IF EXISTS people;
CREATE TABLE IF NOT EXISTS people(
   id      INTEGER  NOT NULL PRIMARY KEY AUTO_INCREMENT
  ,name    VARCHAR(20) NOT NULL
  ,age     INTEGER  NOT NULL
  ,address VARCHAR(50) NOT NULL
);
INSERT INTO people(id,name,age,address) VALUES (1,'bill',20,'the town house, HK');
INSERT INTO people(id,name,age,address) VALUES (2,'bob',21,'23 bigroad, Singapore');
INSERT INTO people(id,name,age,address) VALUES (3,'bertie',22,'12 smallroad, Shanghai');
INSERT INTO people(id,name,age,address) VALUES (4,'brenda',23,'2 the lane, UK');
INSERT INTO people(id,name,age,address) VALUES (5,'boris',34,'2323 chicago, USA');
INSERT INTO people(id,name,age,address) VALUES (6,'bob',21,'23 bigroad, Singapore');
INSERT INTO people(id,name,age,address) VALUES (7,'bob',45,'15 uberstrasse, Germanyany');
