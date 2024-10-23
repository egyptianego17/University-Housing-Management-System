
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `announcements` (
  `id` bigint NOT NULL,
  `floor` tinyint NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `date` datetime NOT NULL,
  `managerId` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `attendance` (
  `userId` bigint NOT NULL,
  `date` date NOT NULL,
  `tookBreakfast` tinyint DEFAULT NULL,
  `tookLunch` tinyint DEFAULT NULL,
  `tookDinner` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `attendance_manager` (
  `userId` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `catering_manager` (
  `managerId` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `complaints` (
  `id` bigint NOT NULL,
  `issueDate` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `response` text,
  `responseDate` datetime NOT NULL,
  `solved` tinyint NOT NULL DEFAULT '0',
  `studentId` bigint DEFAULT NULL,
  `managerId` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `floor_manager` (
  `managerId` bigint NOT NULL,
  `floor` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `managed_floors` (
  `managerId` bigint NOT NULL,
  `floorNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `managed_meals` (
  `managerId` bigint NOT NULL,
  `meal` enum('BREAKFAST','LUNCH','DINNER') NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notification` (
  `id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `issuedBy` bigint DEFAULT NULL,
  `userId` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student` (
  `studentId` bigint NOT NULL,
  `address` varchar(255) NOT NULL,
  `faculty` varchar(255) NOT NULL,
  `grade` tinyint NOT NULL,
  `lastYearAcademicGrade` tinyint DEFAULT NULL,
  `disability` tinyint DEFAULT NULL,
  `studentIdImageUrl` varchar(255) DEFAULT NULL,
  `room` varchar(255) NOT NULL,
  `floor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `gender` tinyint NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `mobileNumber` varchar(255) NOT NULL,
  `nationalD` bigint NOT NULL,
  `nationaldImageUrl` varchar(255) DEFAULT NULL,
  `section` enum('MALE','FEMALE','HYBRID') DEFAULT NULL,
  `student_fk` bigint DEFAULT NULL,
  `cateringManager_fk` bigint DEFAULT NULL,
  `attendance_fk` bigint DEFAULT NULL,
  `attendanceManager_fk` bigint DEFAULT NULL,
  `floorManager_fk` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cb58f0983cde4d9d828f6b0642e` (`managerId`);

ALTER TABLE `attendance`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `attendance_manager`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `catering_manager`
  ADD PRIMARY KEY (`managerId`);

ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d3676de8a4c4746e3f9e6357705` (`studentId`),
  ADD KEY `FK_91858bf35c635ecf729950768da` (`managerId`);

ALTER TABLE `floor_manager`
  ADD PRIMARY KEY (`managerId`);

ALTER TABLE `managed_floors`
  ADD PRIMARY KEY (`managerId`);

ALTER TABLE `managed_meals`
  ADD PRIMARY KEY (`managerId`);

ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5e4694a1c7115bfc5218cf51602` (`issuedBy`),
  ADD KEY `FK_1ced25315eb974b73391fb1c81b` (`userId`);

ALTER TABLE `student`
  ADD PRIMARY KEY (`studentId`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `REL_1fb3f882ce954707781145e1f4` (`student_fk`),
  ADD UNIQUE KEY `REL_c3984b5131b924dfe2543920c1` (`cateringManager_fk`),
  ADD UNIQUE KEY `REL_40940fb3becffd0e6558cb1735` (`attendance_fk`),
  ADD UNIQUE KEY `REL_037a098db125a270ea38f59018` (`attendanceManager_fk`),
  ADD UNIQUE KEY `REL_70c6de975b8d2c65ac7e063f7d` (`floorManager_fk`);

ALTER TABLE `announcements`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;


ALTER TABLE `attendance`
  MODIFY `userId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `attendance_manager`
  MODIFY `userId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `catering_manager`
  MODIFY `managerId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `complaints`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `floor_manager`
  MODIFY `managerId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `managed_floors`
  MODIFY `managerId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `managed_meals`
  MODIFY `managerId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `notification`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `student`
  MODIFY `studentId` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `announcements`
  ADD CONSTRAINT `FK_cb58f0983cde4d9d828f6b0642e` FOREIGN KEY (`managerId`) REFERENCES `user` (`id`);

ALTER TABLE `complaints`
  ADD CONSTRAINT `FK_91858bf35c635ecf729950768da` FOREIGN KEY (`managerId`) REFERENCES `floor_manager` (`managerId`),
  ADD CONSTRAINT `FK_d3676de8a4c4746e3f9e6357705` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`) ON DELETE CASCADE;

ALTER TABLE `managed_floors`
  ADD CONSTRAINT `FK_c702394b38fca2f28a7404ae966` FOREIGN KEY (`managerId`) REFERENCES `floor_manager` (`managerId`);

ALTER TABLE `managed_meals`
  ADD CONSTRAINT `FK_c1fa4b24d037aaaa672332188e2` FOREIGN KEY (`managerId`) REFERENCES `catering_manager` (`managerId`);

ALTER TABLE `notification`
  ADD CONSTRAINT `FK_1ced25315eb974b73391fb1c81b` FOREIGN KEY (`userId`) REFERENCES `student` (`studentId`),
  ADD CONSTRAINT `FK_5e4694a1c7115bfc5218cf51602` FOREIGN KEY (`issuedBy`) REFERENCES `user` (`id`);

ALTER TABLE `user`
  ADD CONSTRAINT `FK_037a098db125a270ea38f590188` FOREIGN KEY (`attendanceManager_fk`) REFERENCES `attendance_manager` (`userId`),
  ADD CONSTRAINT `FK_1fb3f882ce954707781145e1f40` FOREIGN KEY (`student_fk`) REFERENCES `student` (`studentId`),
  ADD CONSTRAINT `FK_40940fb3becffd0e6558cb17351` FOREIGN KEY (`attendance_fk`) REFERENCES `attendance` (`userId`),
  ADD CONSTRAINT `FK_70c6de975b8d2c65ac7e063f7da` FOREIGN KEY (`floorManager_fk`) REFERENCES `floor_manager` (`managerId`),
  ADD CONSTRAINT `FK_c3984b5131b924dfe2543920c1d` FOREIGN KEY (`cateringManager_fk`) REFERENCES `catering_manager` (`managerId`);
COMMIT;

