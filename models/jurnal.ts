import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum JurnalRow{
    id="id",
    kpp="kpp",
    date="date",
    time="time",
    numberPassTS="numberPassTS",
    numberPassDriver="numberPassDriver",
    numberPassPassanger="numberPassPassanger",
    inputObject="inputObject",
    ttn="ttn",
    outputObject="outputObject",
    errors="errors",
    deviceId="deviceId"
}
class Jurnal extends Model{
    declare id:number;
    declare kpp:number;
    declare date:Date;
    declare time:Date;
    declare numberPassTS:string;
    declare numberPassDriver:string;
    declare numberPassPassanger:string;
    declare inputObject:string;
    declare outputObject:string;
    declare errors:string;
    declare ttn:string;
    declare deviceId:string;
}
Jurnal.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        kpp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberPassTS: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberPassDriver: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberPassPassanger: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inputObject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        outputObject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        errors: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ttn: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deviceId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        
    },
    {
        
        tableName:"jurnal",
        sequelize
    }
    )
    Jurnal.sync()
  export default  Jurnal;