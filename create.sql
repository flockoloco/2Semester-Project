CREATE SCHEMA `belivers` ;

USE `belivers`;

CREATE TABLE `belivers`.`bank` (
  `idbank` INT NOT NULL,
  PRIMARY KEY (`idbank`));

CREATE TABLE `belivers`.`barracks` (
  `idbarracks` INT NOT NULL,
  PRIMARY KEY (`idbarracks`));

CREATE TABLE `belivers`.`church` (
  `idchurch` INT NOT NULL,
  PRIMARY KEY (`idchurch`));

CREATE TABLE `belivers`.`farms` (
  `idfarms` INT NOT NULL,
  PRIMARY KEY (`idfarms`));

CREATE TABLE `belivers`.`friend_list` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `player_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  PRIMARY KEY (`id`, `player_id`, `friend_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `belivers`.`questions` (
  `idquestions` INT NOT NULL,
  PRIMARY KEY (`idquestions`));
  
CREATE TABLE `belivers`.`castle` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `posX` INT NOT NULL,
  `posY` INT NOT NULL,
  `player_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `player_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `belivers`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `player_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

CREATE TABLE `belivers`.`player` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `belivers`.`posicao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `posX` INT NOT NULL,
  `posY` INT NOT NULL,
  `player_id` INT UNSIGNED NOT NULL,
  `availability` TINYINT NOT NULL,
  PRIMARY KEY (`id`, `player_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
