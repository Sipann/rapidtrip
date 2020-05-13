-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Trip'
-- 
-- ---

DROP TABLE IF EXISTS `Trip`;
		
CREATE TABLE `Trip` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `destination` INTEGER NULL DEFAULT NULL,
  `admin` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Location'
-- 
-- ---

DROP TABLE IF EXISTS `Location`;
		
CREATE TABLE `Location` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `address` VARCHAR NULL DEFAULT NULL,
  `latitude` DECIMAL NULL DEFAULT NULL,
  `longitude` DECIMAL NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Person'
-- 
-- ---

DROP TABLE IF EXISTS `Person`;
		
CREATE TABLE `Person` (
  `id` VARCHAR NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Participant'
-- 
-- ---

DROP TABLE IF EXISTS `Participant`;
		
CREATE TABLE `Participant` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `person` VARCHAR NULL DEFAULT NULL,
  `trip` INTEGER NULL DEFAULT NULL,
  `departure_location` INTEGER NULL DEFAULT NULL,
  `departure_time` TIMESTAMP NULL DEFAULT NULL,
  `joined` BINARY NULL DEFAULT NULL,
  `car` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Car'
-- 
-- ---

DROP TABLE IF EXISTS `Car`;
		
CREATE TABLE `Car` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `trip` INTEGER NULL DEFAULT NULL,
  `seats` INTEGER NULL DEFAULT NULL,
  `driver` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Trip` ADD FOREIGN KEY (destination) REFERENCES `Location` (`id`);
ALTER TABLE `Trip` ADD FOREIGN KEY (admin) REFERENCES `Participant` (`id`);
ALTER TABLE `Participant` ADD FOREIGN KEY (person) REFERENCES `Person` (`id`);
ALTER TABLE `Participant` ADD FOREIGN KEY (trip) REFERENCES `Trip` (`id`);
ALTER TABLE `Participant` ADD FOREIGN KEY (departure_location) REFERENCES `Location` (`id`);
ALTER TABLE `Participant` ADD FOREIGN KEY (car) REFERENCES `Car` (`id`);
ALTER TABLE `Car` ADD FOREIGN KEY (trip) REFERENCES `Trip` (`id`);
ALTER TABLE `Car` ADD FOREIGN KEY (driver) REFERENCES `Participant` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Trip` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Location` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Person` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Participant` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Car` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Trip` (`id`,`title`,`date`,`destination`,`admin`) VALUES
-- ('','','','','');
-- INSERT INTO `Location` (`id`,`address`,`latitude`,`longitude`) VALUES
-- ('','','','');
-- INSERT INTO `Person` (`id`,`name`,`email`) VALUES
-- ('','','');
-- INSERT INTO `Participant` (`id`,`person`,`trip`,`departure_location`,`departure_time`,`joined`,`car`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Car` (`id`,`trip`,`seats`,`driver`) VALUES
-- ('','','','');