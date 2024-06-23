"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var AdminAuthRow;
(function (AdminAuthRow) {
    AdminAuthRow["id"] = "id";
    AdminAuthRow["login"] = "login";
    AdminAuthRow["pass_hash"] = "pass_hash";
})(AdminAuthRow || (exports.AdminAuthRow = AdminAuthRow = {}));
class AdminAuth extends sequelize_1.Model {
}
AdminAuth.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    pass_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "admin_auth",
    sequelize: postgresDb_1.default,
    createdAt: false,
    updatedAt: false
});
exports.default = AdminAuth;
