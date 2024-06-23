"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurnalHistoryRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var JurnalHistoryRow;
(function (JurnalHistoryRow) {
    JurnalHistoryRow["id"] = "id";
    JurnalHistoryRow["kpp"] = "kpp";
    JurnalHistoryRow["date"] = "date";
    JurnalHistoryRow["time"] = "time";
    JurnalHistoryRow["numberPassTS"] = "numberPassTS";
    JurnalHistoryRow["numberPassDriver"] = "numberPassDriver";
    JurnalHistoryRow["numberPassPassanger"] = "numberPassPassanger";
    JurnalHistoryRow["inputObject"] = "inputObject";
    JurnalHistoryRow["outputObject"] = "outputObject";
})(JurnalHistoryRow || (exports.JurnalHistoryRow = JurnalHistoryRow = {}));
class JurnalHistory extends sequelize_1.Model {
}
JurnalHistory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    kpp: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    numberPassTS: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numberPassDriver: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numberPassPassanger: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    inputObject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    outputObject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "JurnalHistory",
    sequelize: postgresDb_1.default
});
JurnalHistory.sync();
exports.default = JurnalHistory;
