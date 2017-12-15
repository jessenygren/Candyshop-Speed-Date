/*Databasen luonti ja käyttöönotto */
DROP DATABASE IF EXISTS MashleyDB;
CREATE DATABASE MashleyDB;
USE MashleyDB;

/*Tietokantataulu chat-huoneille: 
LobbyID: ID,
Name: Huoneen nimi,
Capacity: Huoneen tilaa kuvaava kenttä ( Vaihtelee 0-6 välillä 
ohjelmassa),
Info: Huoneen kuvaustekstin sisältävä kenttä, 
UserAmount: Käyttäjien määrä huoneessa,
Prefer: Prefer ei ole suuressa roolilla lopullisessa tuotteessa,
mahdollistaa huoneiden luokittelun käyttäjien mieltymysten mukaiseksi,
Timer: huoneen ajastin*/
CREATE TABLE LOBBY (
    LobbyID INT NOT NULL,
    Name VARCHAR (40) NOT NULL, 
    Capacity INT NOT NULL,
    Info VARCHAR (300),
    UserAmount INT ,
    Prefer INT NOT NULL,
    Timer INT,
    PRIMARY KEY (LobbyID)
);

/*Käyttäjätietokanta,
UserID: ID,
Username: käyttäjänimi,
Password: salasana, 
Sex: käyttäjän sukupuoli,
Prefer: käyttäjän mieltymys (0 - 2, ei käytössä suuremmin),
UserSessionID ja SessionID: random generoidut stringit sisältävät
kentät, joita käytetään käyttäjäautentikaatiossa,
LobbyID: jos käyttäjä lobbyssa = lobbyn id,
URL: profiilikuvan url,
Message: chat-viestin kenttä. */
CREATE TABLE USER (
    UserID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR (30) NOT NULL,
    Password VARCHAR (30) NOT NULL,
    Sex VARCHAR (10) NOT NULL,
    Prefer INT NOT NULL, 
    SessionID VARCHAR (40),
    UserSessionID VARCHAR (40),
    LobbyID INT,
    URL VARCHAR (300),
    Message VARCHAR (500),
    PRIMARY KEY (UserID)
    
);





INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("Kikki", "Hiiri", "Hiiri", 0, "Kikki", "Hiiri", "https://babylon.naurunappula.com/200x200/83/06/8306aa014fd6a123/0/727557.jpg");
INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("Matte", "asdsa", "KISSA", 0, "abc", "kissa", "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("KOira ", "kARVAINEN", "KOIRA", 0, "nolis", "rukkanen", "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) VALUES ("Jesse", "Nygren", "Male", 0, "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) VALUES ("Verneri", "Narhi", "Slave", 2, "https://thumbs.gfycat.com/FrightenedCoarseHorsemouse-max-1mb.gif");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) Values ("Mikael", "Kotkavuori", "Female", 1, "img/user.png");

INSERT INTO LOBBY Values (1, "Pappa Nygrens Dining Room", 0,"Place reserved for old farts",0 , 3, NULL);
INSERT INTO LOBBY Values (2, "Young and wild ;)", 0, "For people under age of 24",0 , 3, NULL);
INSERT INTO LOBBY Values (3, "ICT- ENGINEERS", 0,"NO WOMEN ALLOWED!",0 , 3, NULL);
INSERT INTO LOBBY Values (4, "Nurseroom", 0, "These nurses will patch up your bleeding heart!",0 , 3, NULL);
INSERT INTO LOBBY Values (5, "Boothill", 0,"Great atmosphere!",0 , 3, NULL);
INSERT INTO LOBBY Values (6, "Ruttis", 0, "Relaxed minds can gather up here!",0 , 3, NULL);
INSERT INTO LOBBY Values (7, "B-Rappu's boys", 0,"......nerds",0 , 3, NULL);
INSERT INTO LOBBY Values (8, "The Kaljaasi Simulator", 0, "All ABOARD!!! ",0 , 3, NULL);
INSERT INTO LOBBY Values (9, "Verkku's compensation", 0, "...you know ;)",0 , 3, NULL);
