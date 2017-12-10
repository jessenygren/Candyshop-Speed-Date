DROP DATABASE IF EXISTS MashleyDB;
CREATE DATABASE MashleyDB;
USE MashleyDB;


CREATE TABLE LOBBY (
    LobbyID INT NOT NULL,
    Name VARCHAR (40) NOT NULL, 
    Capacity INT NOT NULL,
    Info VARCHAR (300),
    UserAmount INT ,
    Prefer INT NOT NULL,
    PRIMARY KEY (LobbyID)
);


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
    PRIMARY KEY (UserID)
    
);



/* Prefer 0 = Both 1 = Boys 2 = Grills */

INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("Kikki", "Hiiri", "Hiiri", 0, "Kikki", "Hiiri", "https://babylon.naurunappula.com/200x200/83/06/8306aa014fd6a123/0/727557.jpg");
INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("Matte", "asdsa", "KISSA", 0, "abc", "kissa", "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, SessionID, UserSessionID, URL) VALUES ("KOira ", "kARVAINEN", "KOIRA", 0, "nolis", "rukkanen", "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) VALUES ("Jesse", "Nygren", "Male", 0, "img/user.png");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) VALUES ("Verneri", "Narhi", "Slave", 2, "https://thumbs.gfycat.com/FrightenedCoarseHorsemouse-max-1mb.gif");
INSERT INTO USER(Username, Password, Sex, Prefer, URL) Values ("Mikael", "Kotkavuori", "Female", 1, "img/user.png");

INSERT INTO LOBBY Values (1, "SEKSILUOLA!", 0,"FOR SEX HUNGRY PPL",0 , 3);
INSERT INTO LOBBY Values (2, "Luolaseksi", 0, "TEEN PERSEESTA VENEEN!",0 , 3);
INSERT INTO LOBBY Values (3, "SEKSI!!!!!", 0,"SEXSEXSEXSEX",0 , 3);
INSERT INTO LOBBY Values (4, "Perspanoja", 0, "PERKELEEE",0 , 3);
INSERT INTO LOBBY Values (5, "SUOMI100", 0,"KURWA BLYAT",0 , 3);
INSERT INTO LOBBY Values (6, "Luolaseksi", 0, "TEEN PERSEESTA VENEEN!",0 , 3);
INSERT INTO LOBBY Values (7, "B-Rapun pojat", 0,"nerds",0 , 3);
INSERT INTO LOBBY Values (8, "Kuumat sinkkuaidit", 0, "TEEN PERSEESTA VENEEN!",0 , 3);
INSERT INTO LOBBY Values (9, "Kaikki saa", 0,"FOR SEX HUNGRY PPL",0 , 3);
INSERT INTO LOBBY Values (10, "Peniksesi kasvaa 15cm yossa", 0, "TEEN PERSEESTA VENEEN!",0 , 3);
