/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : localhost:3306
 Source Schema         : timetabler

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 18/04/2023 04:54:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for academic_session
-- ----------------------------
DROP TABLE IF EXISTS `academic_session`;
CREATE TABLE `academic_session`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `academicSession` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of academic_session
-- ----------------------------
INSERT INTO `academic_session` VALUES (2, 'Spring 2022');
INSERT INTO `academic_session` VALUES (3, 'Fall 2023');
INSERT INTO `academic_session` VALUES (5, 'Spring 2023');
INSERT INTO `academic_session` VALUES (6, 'Fall 2022');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `academic_session` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `instructor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `section` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES (20, '666', 'Lec', '08/02-09/15', 'Mon_11:00am-12:50pm', '111', 'Fall 2022', '123', '123', '123');
INSERT INTO `events` VALUES (21, '555', 'Lec', '08/02-09/15', 'Mon_01:00pm-02:00pm', '112', 'Fall 2022', NULL, NULL, NULL);
INSERT INTO `events` VALUES (22, '666', 'Lec', '08/02-09/15', 'Mon_08:00am-09:00am', '113', 'Fall 2022', '233', '13', NULL);
INSERT INTO `events` VALUES (24, '666', 'Lec', '08/02-09/15', 'Mon_08:00am-10:00am', '110', 'Fall 2022', '13', '13', NULL);
INSERT INTO `events` VALUES (25, '123', 'Lab', '08/02-09/15', 'Tues_08:00am-09:00am', '111', 'Fall 2022', NULL, NULL, NULL);
INSERT INTO `events` VALUES (26, '111', 'lab', '08/10-09/07', 'Mon_08:00am-09:00am', '120', 'Fall 2023', NULL, NULL, NULL);
INSERT INTO `events` VALUES (27, '111', 'lec', '08/02-09/15', 'Tues_08:00am-09:00am', '111', 'Fall 2023', NULL, NULL, NULL);
INSERT INTO `events` VALUES (28, '166', 'lab', '08/11-09/06', 'Mon_08:00am-09:00am', '102', 'Fall 2022', NULL, NULL, NULL);
INSERT INTO `events` VALUES (29, '555', 'lab', '08/10-09/10', 'Tues_08:00am-09:00am', '111', 'Fall 2022', NULL, NULL, NULL);
INSERT INTO `events` VALUES (32, '3131', 'lab', '04/14-05/18', 'Mon_08:30am-09:26am', '333', 'Fall 2023', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `isAdmin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `courseIds` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjEyMyIsImlhdCI6MTY4MTY5MzU4NX0.Hexc8Hlwvqt0tmgiTX-TbkXJFhNkqYTa21n1FAsfKi0', NULL, '[26,29,24,27]');
INSERT INTO `user` VALUES (2, 'admin', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNjgxNjkzNTU5fQ.hJVuVFgtoCqFN1MeFVxhn0wBjdKepMri4MJ69ub_RGY', '1', NULL);
INSERT INTO `user` VALUES (4, '1123', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjExMjMiLCJpYXQiOjE2ODE0ODkwNzh9.uA-Y8Twnp9jQS4p_fJeWR5HV1ZqWamfEif8Yt_kcoZE', NULL, '[21,25,27]');

SET FOREIGN_KEY_CHECKS = 1;
