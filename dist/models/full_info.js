"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullInfoRow = void 0;
const postgresDb_1 = require("../db/postgres/postgresDb");
const sequelize_1 = require("sequelize");
var FullInfoRow;
(function (FullInfoRow) {
    FullInfoRow["id"] = "id";
    FullInfoRow["fullName"] = "fullName";
    FullInfoRow["propuskNumber"] = "propuskNumber";
    FullInfoRow["organization"] = "organization";
    FullInfoRow["professionals"] = "professionals";
    FullInfoRow["medical"] = "medical";
    FullInfoRow["promSecure"] = "promSecure";
    FullInfoRow["promSecureOblast"] = "promSecureOblast";
    FullInfoRow["infoSecure"] = "infoSecure";
    FullInfoRow["workSecure"] = "workSecure";
    FullInfoRow["medicalHelp"] = "medicalHelp";
    FullInfoRow["fireSecure"] = "fireSecure";
    FullInfoRow["electroSecureGroup"] = "electroSecureGroup";
    FullInfoRow["electroSecure"] = "electroSecure";
    FullInfoRow["driverPermit"] = "driverPermit";
    FullInfoRow["winterDriver"] = "winterDriver";
    FullInfoRow["workInHeight"] = "workInHeight";
    FullInfoRow["workInHeightGroup"] = "workInHeightGroup";
    FullInfoRow["GPVPGroup"] = "GPVPGroup";
    FullInfoRow["GNVPGroup"] = "GNVPGroup";
    FullInfoRow["VOZTest"] = "VOZTest";
    FullInfoRow["VOZProfessional"] = "VOZProfessional";
    FullInfoRow["burAndVSR"] = "burAndVSR";
    FullInfoRow["KSAndCMP"] = "KSAndCMP";
    FullInfoRow["transport"] = "transport";
    FullInfoRow["energy"] = "energy";
    FullInfoRow["GT"] = "GT";
    FullInfoRow["PPDU"] = "PPDU";
    FullInfoRow["CA"] = "CA";
    FullInfoRow["KP_2"] = "KP_2";
    FullInfoRow["PB_11"] = "PB_11";
    FullInfoRow["PB_12"] = "PB_12";
    FullInfoRow["medicalType"] = "medicalType";
    FullInfoRow["lastInputDate"] = "lastInputDate";
    FullInfoRow["lastInputKPP"] = "lastInputKPP";
    FullInfoRow["passStatus"] = "passStatus";
    FullInfoRow["passDate"] = "passDate";
})(FullInfoRow || (exports.FullInfoRow = FullInfoRow = {}));
class FullInfo extends sequelize_1.Model {
}
FullInfo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    propuskNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    organization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    professionals: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    medical: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    promSecure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    promSecureOblast: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    infoSecure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    workSecure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    medicalHelp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fireSecure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    electroSecureGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    electroSecure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    driverPermit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    winterDriver: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    workInHeight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    workInHeightGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    GPVPGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    GNVPGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    VOZTest: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    VOZProfessional: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    burAndVSR: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    KSAndCMP: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    transport: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    energy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    GT: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PPDU: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    CA: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    KP_2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PB_11: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    PB_12: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    medicalType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastInputDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastInputKPP: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    passStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    passDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "full_info",
    sequelize: postgresDb_1.default
});
exports.default = FullInfo;
