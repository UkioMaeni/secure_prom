"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurnalRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var JurnalRow;
(function (JurnalRow) {
    JurnalRow["id"] = "id";
    JurnalRow["kpp"] = "kpp";
    JurnalRow["date"] = "date";
    JurnalRow["time"] = "time";
    JurnalRow["numberPassTS"] = "numberPassTS";
    JurnalRow["numberPassDriver"] = "numberPassDriver";
    JurnalRow["numberPassPassanger"] = "numberPassPassanger";
    JurnalRow["inputObject"] = "inputObject";
    JurnalRow["outputObject"] = "outputObject";
    JurnalRow["errors"] = "errors";
})(JurnalRow || (exports.JurnalRow = JurnalRow = {}));
class Jurnal extends sequelize_1.Model {
}
Jurnal.init({
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
    errors: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "jurnal",
    sequelize: postgresDb_1.default
});
Jurnal.sync();
exports.default = Jurnal;
