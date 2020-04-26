-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema all_aboard
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema all_aboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `all_aboard` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `all_aboard` ;

-- -----------------------------------------------------
-- Table `all_aboard`.`Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Player` (
  `Player_ID` INT NOT NULL,
  `Username` VARCHAR(20) NULL,
  `E-mail` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `Population_Points` VARCHAR(45) NULL,
  `Gold_Amount` VARCHAR(45) NULL,
  PRIMARY KEY (`Player_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Settlement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Settlement` (
  `Settlement_ID` INT NOT NULL,
  `Settlement_Name` VARCHAR(45) NULL,
  `Type_Material_Genarate` VARCHAR(45) NULL,
  `Materials_Amount` VARCHAR(45) NULL,
  `Population_Number` VARCHAR(45) NULL,
  `Type_Settlement` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Settlement_ID`, `Player_Player_ID`),
  INDEX `fk_Settlement_Player_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Settlement_Player`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Trade_Market`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Trade_Market` (
  `Trade_ID` INT NOT NULL,
  `Players_ID` VARCHAR(45) NULL,
  `Materials_Type` VARCHAR(45) NULL,
  `Materials_Amount` VARCHAR(45) NULL,
  `Material_Image` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Trade_ID`, `Player_Player_ID`),
  INDEX `fk_Trade_Market_Player1_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Trade_Market_Player1`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Friend_List`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Friend_List` (
  `Friend_ID` INT NOT NULL,
  `Player_ID` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Friend_ID`, `Player_Player_ID`),
  INDEX `fk_Friend_List_Player1_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Friend_List_Player1`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Shop` (
  `Product_ID` INT NOT NULL,
  `Price` VARCHAR(45) NULL,
  `Product_Image` VARCHAR(45) NULL,
  `Minimum_PP` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Product_ID`, `Player_Player_ID`),
  INDEX `fk_Shop_Player1_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Shop_Player1`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Board_Train`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Board_Train` (
  `Board_ID` INT NOT NULL,
  `Train_select` VARCHAR(45) NULL,
  `Material` VARCHAR(45) NULL,
  `Material_Amount` VARCHAR(45) NULL,
  `SettlementEx_ID` VARCHAR(45) NULL,
  `SettlementRe_ID` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Board_ID`, `Player_Player_ID`),
  INDEX `fk_Board_Train_Player1_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Board_Train_Player1`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Train`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Train` (
  `Train_ID` INT NOT NULL,
  `Type_Train` VARCHAR(45) NULL,
  `Train_Capacity` VARCHAR(45) NULL,
  `Train_Availability` VARCHAR(45) NULL,
  `Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Train_ID`, `Player_Player_ID`),
  INDEX `fk_Train_Player1_idx` (`Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Train_Player1`
    FOREIGN KEY (`Player_Player_ID`)
    REFERENCES `all_aboard`.`Player` (`Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Board_Train_has_Train`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Board_Train_has_Train` (
  `Board_Train_Board_ID` INT NOT NULL,
  `Board_Train_Player_Player_ID` INT NOT NULL,
  `Train_Train_ID` INT NOT NULL,
  `Train_Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Board_Train_Board_ID`, `Board_Train_Player_Player_ID`, `Train_Train_ID`, `Train_Player_Player_ID`),
  INDEX `fk_Board_Train_has_Train_Train1_idx` (`Train_Train_ID` ASC, `Train_Player_Player_ID` ASC) VISIBLE,
  INDEX `fk_Board_Train_has_Train_Board_Train1_idx` (`Board_Train_Board_ID` ASC, `Board_Train_Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Board_Train_has_Train_Board_Train1`
    FOREIGN KEY (`Board_Train_Board_ID` , `Board_Train_Player_Player_ID`)
    REFERENCES `all_aboard`.`Board_Train` (`Board_ID` , `Player_Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Board_Train_has_Train_Train1`
    FOREIGN KEY (`Train_Train_ID` , `Train_Player_Player_ID`)
    REFERENCES `all_aboard`.`Train` (`Train_ID` , `Player_Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `all_aboard`.`Settlement_has_Board_Train`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `all_aboard`.`Settlement_has_Board_Train` (
  `Settlement_Settlement_ID` INT NOT NULL,
  `Settlement_Player_Player_ID` INT NOT NULL,
  `Board_Train_Board_ID` INT NOT NULL,
  `Board_Train_Player_Player_ID` INT NOT NULL,
  PRIMARY KEY (`Settlement_Settlement_ID`, `Settlement_Player_Player_ID`, `Board_Train_Board_ID`, `Board_Train_Player_Player_ID`),
  INDEX `fk_Settlement_has_Board_Train_Board_Train1_idx` (`Board_Train_Board_ID` ASC, `Board_Train_Player_Player_ID` ASC) VISIBLE,
  INDEX `fk_Settlement_has_Board_Train_Settlement1_idx` (`Settlement_Settlement_ID` ASC, `Settlement_Player_Player_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Settlement_has_Board_Train_Settlement1`
    FOREIGN KEY (`Settlement_Settlement_ID` , `Settlement_Player_Player_ID`)
    REFERENCES `all_aboard`.`Settlement` (`Settlement_ID` , `Player_Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Settlement_has_Board_Train_Board_Train1`
    FOREIGN KEY (`Board_Train_Board_ID` , `Board_Train_Player_Player_ID`)
    REFERENCES `all_aboard`.`Board_Train` (`Board_ID` , `Player_Player_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
