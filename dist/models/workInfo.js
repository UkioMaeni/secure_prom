"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var UserRow;
(function (UserRow) {
    UserRow["id"] = "id";
    UserRow["name"] = "name";
    UserRow["serialNumber"] = "serialNumber";
})(UserRow || (exports.UserRow = UserRow = {}));
class WorkInfo extends sequelize_1.Model {
}
WorkInfo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    zone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "work_info",
    sequelize: postgresDb_1.default
});
WorkInfo.sync();
exports.default = WorkInfo;
