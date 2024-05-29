import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum AuthRow{
    id="id",
    passHash="passHash",
}
class Auth extends Model{
    declare id:number;
    declare passHash:string;
}
Auth.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        passHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        
        tableName:"auth",
        sequelize,
        createdAt:false,
        updatedAt:false
    }
    )
  export default  Auth;