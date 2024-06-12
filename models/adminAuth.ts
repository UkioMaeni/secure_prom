import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum AdminAuthRow{
    id="id",
    login="login",
    pass_hash="pass_hash",
}
class AdminAuth extends Model{
    declare id:number;
    declare login:string;
    declare passHash:string;
}
AdminAuth.init(
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
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        
        tableName:"admin_auth",
        sequelize,
        createdAt:false,
        updatedAt:false
    }
    )
  export default  AdminAuth;