import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum UserRow{
    id="id",
    name="name",
    serialNumber="serialNumber",
}
class WorkInfo extends Model{
    declare id:number;
    declare name:string;
    declare surname:string;
    declare serialNumber:string;
    declare status:string;
    declare time:Date;
    declare zone:string;
}
WorkInfo.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        
        tableName:"work_info",
        sequelize
    }
    )
    WorkInfo.sync()
  export default  WorkInfo;