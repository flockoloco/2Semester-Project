create database fightthypath;
use fightthypath;

create table User(
    UserID int auto_increment not null,
    UserName varchar(32) not null, 
    UserPassword varchar(100) not null,
    Email varchar(64), 
    primary key (UserID)
);

create table CauseOfDeath(
	CauseOfDeathID int auto_increment,
    Text varchar(512),
    primary key(CauseOFDeathID)
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
    Theme int,
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

create table Leaderboard(
	PlayerID_FK_Leaderboard int,
    Score_FK_Leaderboard int,
    CauseOfDeathID_FK_Leaderboard int,
	constraint foreign key(CauseOfDeathID_FK_Leaderboard) references CauseOfDeath(CauseOfDeathID),
    constraint foreign key(PlayerID_FK_Leaderboard) references Player(PlayerID)
);

delimiter //

create procedure GetCauseOfDeath(
	in UserID int
)
begin
    select Text from CauseOfDeath where CauseOfDeathID = (
		select * from leaderboard where PlayerID_FK_Leaderboard = (
			select PlayerID from Player where UserID_FK_Player = @UserID and Concluded = true order by PlayerID desc limit 1
		)
    );
end //

create procedure AddNewPlayer(## ONLY DO THIS AFTER LAST RUN IS CONCLUDED!
	in UserIDToAdd int
)
begin
	declare NewPlayerID int;
	insert into player(UserID_FK_Player, Concluded, Wheat, Swords, Gold, Faith, Score) values(UserIDToAdd, false, '50', '50', '50', '50', '0');
	set NewPlayerID = (select PlayerID from player where UserID_FK_Player = UserIDToAdd and Concluded = false);
    
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,1);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,2);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,3);
	insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,4);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,5);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,6);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,7);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,8);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,9);
    insert into fightthypath.Player_Question(PlayerID_FK_Player_Question,Concluded,QuestionID_FK_Player_Question) values(NewPlayerID,false,10);
    
    INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleNW', '3', '3', NewPlayerID);
	INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleNE', '3', '4', NewPlayerID);
    INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleSW', '4', '3', NewPlayerID);
    INSERT INTO fightthypath.building(Type, PosX, PosY, PlayerID_FK_Building) VALUES ('CastleSE', '4', '4', NewPlayerID);
    
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '1', NewPlayerID);
	INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '2', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '1', '3', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '1', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '2', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '2', '3', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '1', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Farm', '3', '2', NewPlayerID);
    
	INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '4', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '1', '6', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '4', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '2', '6', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Barrack', '3', '6', NewPlayerID);
    
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '1', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '4', '2', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '1', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '2', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '5', '3', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '1', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '2', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Bank', '6', '3', NewPlayerID);
    
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '4', '6', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '4', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '5', '6', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '4', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '5', NewPlayerID);
    INSERT INTO fightthypath.tile(Type, PosX, PosY, PlayerID_FK_Tile) VALUES ('Church', '6', '6', NewPlayerID);
				
end //


create procedure AddLeaderboardDeath(
	in Stat varchar(31),
    in ValueOfStat varchar(31),
    in DeadPlayerID int
)
begin
declare IDToInsert int;
declare PlayerScore int;
if Stat = 'Wheat' then
	if ValueOfStat < 0 then
		set IDToInsert = 1;
    elseif ValueOFStat > 100 then
		set IDToInsert = 2;
    end if;
elseif Stat = 'Swords' then
	if ValueOfStat < 0 then
		set IDToInsert = 3;
    elseif ValueOFStat > 100 then
		set IDToInsert = 4;
    end if;
elseif Stat = 'Gold' then
	if ValueOfStat < 0 then
		set IDToInsert = 5;
    elseif ValueOFStat > 100 then
		set IDToInsert = 6;
    end if;
elseif Stat = 'Faith' then
	if ValueOfStat < 0 then
		set IDToInsert = 7;
    elseif ValueOFStat > 100 then
		set IDToInsert = 8;
    end if;

end if;
set PlayerScore = (select Score from Player where PlayerID = DeadPlayerID);

	
	insert into Leaderboard(PlayerID_FK_Leaderboard,Score_FK_Leaderboard,CauseOfDeathID_FK_Leaderboard) values(DeadPlayerID,PlayerScore,IDToInsert);
end //

delimiter ;


insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a farm!','+20','0','-10','-5','+1','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a church to pray! lmao','-15','0','0','+20','0','0','0','+1');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Go to war!','-20','-20','+40','+10','-1','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Stay defensive!','+10','+10','-20','-10','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the priests!','0','0','-10','+10','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Side with the traders!','0','0','+10','-10','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Who cares? Work more.','0','-10','+10','0','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Build a barrack and raise more soldiers.','0','+20','-15','0','0','+1','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Run for the Farms!','0','0','-15','0','0','0','-1','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Run for the Banks!','-15','0','0','0','-1','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('The army knows right! Off with his head!','-10','+10','0','0','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('The people’s heart knows the truth! Let him live!','+10','-10','0','0','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Give a portion to everyone!','+5','+5','+5','+5','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Store for a time of need!','0','0','+20','0','0','0','+1','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('Pay for the renovations!','+5','0','-10','+5','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values('This is a waste of recourses!','+5','0','+5','-10','0','0','0','-1');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values("He's benefiting the kingdom! Let him be!",'0','+10','+5','-15','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values("Make this man check his morals before God!",'0','-10','-5','+15','0','0','0','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values("We won't survive the battle, follow their demands!",'0','0','-10','-10','0','0','-1','0');
insert into fightthypath.Answer(Text,Wheat,Swords,Gold,Faith,BuildingWheat,BuildingSwords,BuildingGold,BuildingFaith) values("Not this time! To battle!",'-10','-10','0','0','0','0','0','0');


insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('1',true,'This years production was really low :( \nPeople are hungry but the priests claim God will provide in time of need.','1','2','0');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('2',true,'Tension between the kingdoms is rising! \nYou have to decide your stance on the future wars.','3','4','1');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('3',true,'Theres a big fight between the traders and the priests in the court.\nYou need to side with one of them.','5','6','2');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('4',true,'Your army grows angry and tired. \nLong shifts on the castle walls and few pay isn’t worth the effort.','7','8','1');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('5',true,'The ground is shaking! Are these the God’s? \nEither way half of your castle broke down, you need to secure the resources!','9','10','3');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('6',true,'A robber is being convicted but the people believe he was justified. \nYour people want you to take a stance!','11','12','4');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('7',true,'The profits from the last raid were incredibly good! \nWhere do you plan on investing?','13','14','5');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('8',true,"Your churches are crumbling in need of renovation. \nThe priests are eager to blame it on your lack of help.",'15','16','2');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('9',true,"The priests want to condemn a general for his irreverent actions, \nwhich if concluded would bring great wealth to the army and bourgeoise.","17","18",'6');
insert into fightthypath.Question(QuestionID,Reset,Text,Answer1ID_FK_Question,Answer2ID_FK_Question,Theme) values('10',true,"The enemies are at our door! \nThey demand money to leave us alone, the priests say we can't give in to heretics! \nThey have the numbers advantage and we will lose many soldiers and farmers in a battle against them!",'19','20','1');


insert into fightthypath.causeofdeath(text) values('As your poluation grew, \nthey slowly separated into multiple groups and a democracy was raised.');
insert into fightthypath.causeofdeath(text) values("With your population starving, \npeople's desperation took over and they revolted against the kingdom, killing you.");
insert into fightthypath.causeofdeath(text) values('As your armies grows with no bounds, \nyour best general comes to tell you with his army behind him, unfortunately, he is taking over.');
insert into fightthypath.causeofdeath(text) values('With your army weak and undermanned, \nneighboring kingdoms saw your weakness and charged into your walls.');
insert into fightthypath.causeofdeath(text) values("With your kingdom growing and with huge riches in your treasury, \nyou go to sleep one night and the last thing you see is an assassin looking at you.");
insert into fightthypath.causeofdeath(text) values("With your kingdom completely broke, \nnot even the population stayed to see where the kingdom was heading. You are left alone.");
insert into fightthypath.causeofdeath(text) values("As the church grows more and more, \nit sees no more use to you and claims the throne from your hands.");
insert into fightthypath.causeofdeath(text) values("After being proclaimed a heretic by the clerics,\nyou are taken outside and burned alive in a public setting.");
