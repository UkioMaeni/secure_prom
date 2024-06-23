"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhiteEmailListRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var WhiteEmailListRow;
(function (WhiteEmailListRow) {
    WhiteEmailListRow["id"] = "id";
    WhiteEmailListRow["email"] = "email";
})(WhiteEmailListRow || (exports.WhiteEmailListRow = WhiteEmailListRow = {}));
class WhiteEmailList extends sequelize_1.Model {
}
WhiteEmailList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "white_email_list",
    sequelize: postgresDb_1.default,
    createdAt: false,
    updatedAt: false
});
exports.default = WhiteEmailList;
