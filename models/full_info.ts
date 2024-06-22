import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum FullInfoRow{
    id="id",
    fullName="fullName",
    propuskNumber="propuskNumber",
    organization="organization",
    professionals="professionals",
    medical="medical",
    promSecure="promSecure",
    promSecureOblast="promSecureOblast",
    infoSecure="infoSecure",
    workSecure="workSecure",
    medicalHelp="medicalHelp",
    fireSecure="fireSecure",
    electroSecureGroup="electroSecureGroup",
    electroSecure="electroSecure",
    driverPermit="driverPermit",
    winterDriver="winterDriver",
    workInHeight="workInHeight",
    workInHeightGroup="workInHeightGroup",
    GPVPGroup="GPVPGroup",
    GNVPGroup="GNVPGroup",
    VOZTest="VOZTest",
    VOZProfessional="VOZProfessional",
    burAndVSR="burAndVSR",
    KSAndCMP="KSAndCMP",
    transport="transport",
    energy="energy",
    GT="GT",
    PPDU="PPDU",
    CA="CA",
    KP_2="KP_2",
    PB_11="PB_11",
    PB_12="PB_12",
    medicalType="medicalType",
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
    declare professionals:string;

    declare medical:string;
    declare promSecure:string;
    declare promSecureOblast:string;
    declare infoSecure:string;
    declare workSecure:string;
    declare medicalHelp:string;
    declare fireSecure:string;
    declare groupEB:string;
    declare winterDriver:string;
    declare workInHeight:string;
    declare workInHeightGroup:string;
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
        professionals: {
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
        promSecureOblast: {
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
        electroSecureGroup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        electroSecure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        driverPermit: {
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
        workInHeightGroup: {
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
        burAndVSR: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        KSAndCMP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        transport: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        energy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GT: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PPDU: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CA: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        KP_2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PB_11: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PB_12: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        medicalType:{
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