import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum WhiteEmailListRow{
    id="id",
    email="email",
}
class WhiteEmailList extends Model{
    declare id:number;
    declare email:string;
}
WhiteEmailList.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        
        tableName:"white_email_list",
        sequelize,
        createdAt:false,
        updatedAt:false
    }
    )
  export default  WhiteEmailList;