import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum PbListRow{
    id="id",
    login="login",
    passHash="passHash",
}
class PbList extends Model{
    declare id:number;
    declare login:string;
    declare passHash:string;
}
PbList.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        
        tableName:"pb_list",
        sequelize,
        createdAt:false,
        updatedAt:false
    }
    )
  export default  PbList;