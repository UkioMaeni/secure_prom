import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum FullInfoRow{
    id="id",
    kpp="kpp",
    date="date",
    time="time",
    numberPassTS="numberPassTS",
    numberPassDriver="numberPassDriver",
    numberPassPassanger="numberPassPassanger",
    inputObject="inputObject",
    outputObject="outputObject",
}
class FullInfo extends Model{
    declare id:number;
    declare kpp:number;
    declare date:Date;
    declare time:Date;
    declare numberPassTS:string;
    declare numberPassDriver:string;
    declare numberPassPassanger:string;
    declare inputObject:string;
    declare outputObject:string;
}
FullInfo.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        kpp: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
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
        
    },
    {
        
        tableName:"FullInfo",
        sequelize
    }
    )
    FullInfo.sync()
  export default  FullInfo;