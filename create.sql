create database belivers;
use belivers;

create table User(
    UserID int auto_increment not null,
    UserName varchar(32) not null, 
    UserPassword varchar(100) not null,
    Email varchar(64), 
    primary key (UserID)
);

create table Player(
    PlayerID int auto_increment not null,
    UserID_FK_Player int,
    Concluded tinyint,
    CurrentQuestion int null,
    Wheat int,
    Swords int,
    Gold int,
    Faith int,
    Score int,
    KingdomName varchar(32),
    PlayerName varchar(32),
    primary key (PlayerID),
    constraint foreign key (UserID_FK_Player) references User(UserID)
);

create table Building(
    BuildingID int AUTO_INCREMENT,
    Type varchar(16),
    PosX int,
    PosY int,
    PlayerID_FK_Building int,
    primary key (BuildingID),
    constraint foreign key (PlayerID_FK_Building) references Player(PlayerID)
);

create table Tile(
    TileID int AUTO_INCREMENT,
    Type varchar(20),
    PosX int,
    PosY int,
    PlayerID_FK_Tile int,
    primary key (TileID),
    constraint foreign key(PlayerID_FK_Tile) references Player(PlayerID)
);

create table Answer(
    AnswerID int AUTO_INCREMENT,
    Text varchar(256),
    Wheat int,
    Swords int,
    Gold int,
    Faith int,
    BuildingWheat int,
    BuildingSwords int,
    BuildingGold int,
    BuildingFaith int,
    primary key (AnswerID)
);

create table Question(
    QuestionID int auto_increment,
    Reset tinyint,
    Text varchar(512),
    Answer1ID_FK_Question int null,
    Answer2ID_FK_Question int null,
    primary key(QuestionID),
	constraint foreign key(Answer1ID_FK_Question) references Answer(AnswerID),
    constraint foreign key(Answer2ID_FK_Question) references Answer(AnswerID)
);

create table Player_Question(
	PlayerID_FK_Player_Question int,
    Concluded tinyint,
    QuestionID_FK_Player_Question int,
    constraint foreign key(PlayerID_FK_Player_Question) references Player(PlayerID),
    constraint foreign key(QuestionID_FK_Player_Question) references Question(QuestionID)

);

ALTER TABLE Player add constraint foreign key (CurrentQuestion) references Player_Question(QuestionID_fk_Player_Question);

insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a farm!','+20','0','-10','-5',1,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a church to pray! lmao','-15','0','0','+20',0,0,0,1);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Go to war!','-20','-20','+40','+10','-1',0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Stay defensive!','+10','+10','-20','-10',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the priests!','0','0','-10','+10',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the traders!','0','0','+10','-10',0,0,0,0);

insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('1',true,'This years production was really low :( People are hungry but the priests claim god will provide in time of need.','1','2');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('2',true,'Tension between the kingdoms is rising! You have to decide your stance on the future wars.','3','4');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('3',true,'Theres a big fight between the traders and the priests in the court, you need to side with one of them.','5','6');