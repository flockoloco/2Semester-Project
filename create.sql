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

create table Leaderboard(
    LeaderboardID int AUTO_INCREMENT,
    PlayerID_FK_Leaderboard int,
    Score int,
    primary key (LeaderboardID),
    constraint foreign key(PlayerID_FK_Leaderboard) references Player(PlayerID)
);

create table Answer(
    AnswerID int AUTO_INCREMENT,
    Text varchar(256),
    Wheat int,
    Swords int,
    Gold int,
    Faith int,
    primary key (AnswerID)
);

create table Question(
	TrueID int auto_increment,
    QuestionID int,
    
    PlayerID_FK_Question int,
    Concluded tinyint,
    Reset tinyint,
    Text varchar(512),
    Answer1ID_FK_Question int null,
    Answer2ID_FK_Question int null,
    Answer3ID_FK_Question int null,
    primary key(TrueID),
    constraint foreign key(PlayerID_FK_Question) references Player(PlayerID),
	constraint foreign key(Answer1ID_FK_Question) references Answer(AnswerID),
    constraint foreign key(Answer2ID_FK_Question) references Answer(AnswerID)
);

insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Build a farm!','+20','0','-10','-5');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Pray for the resources! lmao','-15','0','0','+20');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Go to war!','-20','-20','+40','+10');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Stay defensive!','+10','+10','-20','-10');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Propose trading!','+15','0','+20','-25');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Side with the priests!','0','0','-10','+10');
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith) values('Side with the traders!','0','0','+10','-10');