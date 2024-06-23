"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//const sequelize:Sequelize = new Sequelize('postgres://secure:secure@localhost:5432/secure');
const sequelize = new sequelize_1.Sequelize('postgres://postgres:1234@localhost:5432/ohrana', { logging: false });
exports.default = sequelize;
