import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum FullInfoRow{
    id="id",
    fullName="fullName",
    propuskNumber="propuskNumber",
    organization="organization",
    mainProfessional="mainProfessional",
    secondProfessional="secondProfessional",
    firdProfessional="firdProfessional",
    otherProfessional="otherProfessional",
    medical="medical",
    promSecure="promSecure",
    infoSecure="infoSecure",
    workSecure="workSecure",
    medicalHelp="medicalHelp",
    fireSecure="fireSecure",
    groupEB="groupEB",
    winterDriver="winterDriver",
    workInHeight="workInHeight",
    GPVPGroup="GPVPGroup",
    GNVPGroup="GNVPGroup",
    VOZTest="VOZTest",
    VOZProfessional="VOZProfessional",
    lastInputDate="lastInputDate",
    lastInputKPP="lastInputKPP",
    passStatus="passStatus",
    passDate="passDate",
}
class FullInfo extends Model{
    declare id:number;
    declare fullName:string;
    declare propuskNumber:string;
    declare organization:string;
    declare mainProfessional:string;
    declare secondProfessional:string;
    declare firdProfessional:string;
    declare otherProfessional:string;
    declare medical:string;
    declare promSecure:string;
    declare infoSecure:string;
    declare workSecure:string;
    declare medicalHelp:string;
    declare fireSecure:string;
    declare groupEB:string;
    declare winterDriver:string;
    declare workInHeight:string;
    declare GPVPGroup:string;
    declare GNVPGroup:string;
    declare VOZTest:string;
    declare VOZProfessional:string;
    declare lastInputDate:string;
    declare lastInputKPP:string;
    declare passStatus:string;
    declare passDate:string;
}
FullInfo.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        propuskNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        organization: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mainProfessional: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secondProfessional: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firdProfessional: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otherProfessional: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        medical: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        promSecure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        infoSecure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        workSecure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        medicalHelp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fireSecure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        groupEB: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        winterDriver: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        workInHeight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GPVPGroup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GNVPGroup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        VOZTest: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        VOZProfessional: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastInputDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastInputKPP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        
    },
    {
        
        tableName:"full_info",
        sequelize
    }
    )
  export default  FullInfo;