/*
 Navicat MySQL Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : online_medical

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 10/05/2021 11:38:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_source
-- ----------------------------
DROP TABLE IF EXISTS `article_source`;
CREATE TABLE `article_source`  (
  `Source_id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Author` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Type` int NOT NULL,
  PRIMARY KEY (`Source_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_source
-- ----------------------------
INSERT INTO `article_source` VALUES (1, '国家卫健委关于接种新冠疫苗的公告', '管理员', '公告内容1', '2021-04-21 09:53:08', 0);
INSERT INTO `article_source` VALUES (2, '浙大二院对广大市民的呼吁', '管理员', '公告内容2', '2021-04-21 09:53:29', 0);
INSERT INTO `article_source` VALUES (3, '如何科学有效的防范新型冠状病毒', '专家1', '文章内容1', '2021-04-21 09:54:26', 1);
INSERT INTO `article_source` VALUES (4, '热门文章1', '专家1', '文章内容2', '2021-04-21 09:54:57', 2);
INSERT INTO `article_source` VALUES (5, '热门文章2', '专家2', '文章内容3', '2021-04-21 09:55:11', 2);
INSERT INTO `article_source` VALUES (6, '热门文章3', '专家3', '文章内容4', '2021-04-21 09:55:52', 2);
INSERT INTO `article_source` VALUES (7, '权威发布1', '医院1', '发布内容1', '2021-04-21 09:56:18', 3);
INSERT INTO `article_source` VALUES (8, '公告1', '管理员', '公告内容3', '2021-04-21 09:57:36', 4);
INSERT INTO `article_source` VALUES (9, '公告2', '管理员', '公告内容4', '2021-04-21 09:57:47', 4);
INSERT INTO `article_source` VALUES (10, '测试文章', '管理员', '测试内容', '2021-04-21 18:26:36', 0);
INSERT INTO `article_source` VALUES (11, '测试文章2', '管理员', '测试内容2', '2021-04-21 18:26:54', 2);
INSERT INTO `article_source` VALUES (13, '地方撒的', '3241', '34 123 而我却', '2021-04-23 11:19:02', 0);

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `Post_id` int NOT NULL AUTO_INCREMENT,
  `Author_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Title` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Type` int NOT NULL,
  PRIMARY KEY (`Post_id`) USING BTREE,
  INDEX `post_user_idx`(`Author_id`) USING BTREE,
  CONSTRAINT `Post_user` FOREIGN KEY (`Author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (1, 'Agenzy', '2021-04-20 14:36:14', '请问浙大玉泉的校医院可以接种新冠疫苗吗', '最近想去接种', 0);
INSERT INTO `post` VALUES (2, 'Sheep', '2021-04-20 14:39:39', '朋友们，吃坏肚子了有什么好方法缓解疼痛吗', '疼的想死555', 0);
INSERT INTO `post` VALUES (7, 'Agenzy', '2021-04-21 17:18:40', '测试2', '的反对法', 0);

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `Reply_id` int NOT NULL AUTO_INCREMENT,
  `Belong_Post_id` int NOT NULL,
  `Author_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Reply_id`) USING BTREE,
  INDEX `reply_post_idx`(`Belong_Post_id`) USING BTREE,
  INDEX `reply_user`(`Author_id`) USING BTREE,
  CONSTRAINT `reply_post` FOREIGN KEY (`Belong_Post_id`) REFERENCES `post` (`Post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reply_user` FOREIGN KEY (`Author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES (1, 1, 'doctor X', '2021-04-20 14:50:46', '可以的，需要先在浙大钉上进行预约');
INSERT INTO `reply` VALUES (2, 1, 'Sheep', '2021-04-20 14:51:11', '不清楚欸');
INSERT INTO `reply` VALUES (3, 2, 'doctor X', '2021-04-20 14:51:57', '建议先去医院检查，不要乱用药');
INSERT INTO `reply` VALUES (4, 2, 'Agenzy', '2021-04-20 14:52:23', '天气忽冷忽热，注意饮食');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `identity` int NOT NULL,
  `Can_post` int NOT NULL,
  `Can_reply` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('Agenzy', '123456789', 2, 1, 1);
INSERT INTO `user` VALUES ('Sheep', '111111', 0, 0, 1);
INSERT INTO `user` VALUES ('doctor X', '123456', 1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
