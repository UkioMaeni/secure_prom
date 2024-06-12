import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum AuthRow{
    id="id",
    pass_hash="pass_hash",
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
        pass_hash: {
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