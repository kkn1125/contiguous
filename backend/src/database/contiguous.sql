show databases;

use internal_server;

show tables;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema contiguous
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema contiguous
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `contiguous` DEFAULT CHARACTER SET utf8 ;
USE `contiguous` ;

-- -----------------------------------------------------
-- Table `contiguous`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contiguous`.`user` (
  `id` INT NOT NULL,
  `nickname` VARCHAR(200) NULL DEFAULT '',
  `grant` VARCHAR(11) NULL DEFAULT 'guest',
  `pox` FLOAT NULL DEFAULT 0,
  `poy` FLOAT NULL DEFAULT 0,
  `poz` FLOAT NULL DEFAULT 0,
  `roy` FLOAT NULL DEFAULT 0,
  `flag` VARCHAR(11) NULL DEFAULT 'done',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
