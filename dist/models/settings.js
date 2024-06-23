"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var SettingsRow;
(function (SettingsRow) {
    SettingsRow["id"] = "id";
    SettingsRow["name"] = "name";
    SettingsRow["value"] = "value";
})(SettingsRow || (exports.SettingsRow = SettingsRow = {}));
class Settings extends sequelize_1.Model {
}
Settings.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: "settings",
    sequelize: postgresDb_1.default,
    createdAt: false,
    updatedAt: false
});
exports.default = Settings;
