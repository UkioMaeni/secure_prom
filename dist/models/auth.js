"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var AuthRow;
(function (AuthRow) {
    AuthRow["id"] = "id";
    AuthRow["pass_hash"] = "pass_hash";
})(AuthRow || (exports.AuthRow = AuthRow = {}));
class Auth extends sequelize_1.Model {
}
Auth.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    pass_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "auth",
    sequelize: postgresDb_1.default,
    createdAt: false,
    updatedAt: false
});
exports.default = Auth;
