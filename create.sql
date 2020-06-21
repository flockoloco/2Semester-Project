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

insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a farm!','+20','0','-10','-5',1,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a church to pray! lmao','-15','0','0','+20',0,0,0,1);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Go to war!','-20','-20','+40','+10','-1',0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Stay defensive!','+10','+10','-20','-10',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the priests!','0','0','-10','+10',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the traders!','0','0','+10','-10',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Who cares? Work more.','0','-10','+10','0',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a barrack and raise more soldiers.','0','+20','-15','0',0,1,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Run for the Farms!','0','0','-15','0',0,0,'-1',0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Run for the Banks!','-15','0','0','0','-1',0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('The army knows right! Off with his head!','-10','+10','0','0',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('The people’s heart knows the truth! Let him live!','+10','-10','0','0',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Give a portion to everyone!','+5','+5','+5','+5',0,0,0,0);
insert into belivers.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Store for a time of need!','0','0','+20','0',0,0,'+1',0);


insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('1',true,'This years production was really low :( \nPeople are hungry but the priests claim God will provide in time of need.','1','2');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('2',true,'Tension between the kingdoms is rising! \nYou have to decide your stance on the future wars.','3','4');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('3',true,'Theres a big fight between the traders and the priests in the court.\nYou need to side with one of them.','5','6');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('4',true,'Your army grows angry and tired. \nLong shifts on the castle walls and few pay isn’t worth the effort.','7','8');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('5',true,'The ground is shaking! Are these the God’s? \nEither way half of your castle broke down, you need to secure the resources!','9','10');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('6',true,'A robber is being convicted but the people believe he was justified. \nYour people want you to take a stance!','11','12');
insert into belivers.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question) values('7',true,'The profits from the last raid were incredibly good! \nWhere do you plan on investing?','13','14');