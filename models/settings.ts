import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum SettingsRow{
    id="id",
    name="name",
    value="value",
}
class Settings extends Model{
    declare id:number;
    declare name:string;
    declare value:number;
}
Settings.init(
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
        value: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        
        tableName:"settings",
        sequelize,
        createdAt:false,
        updatedAt:false
    }
    )
  export default  Settings;