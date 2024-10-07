import { Sequelize, Transaction } from "sequelize";
import Jurnal from "../models/jurnal"
import JurnalHistory, { JurnalHistoryRow } from "../models/jurnal_history";
import excel from "./excel";
import sequelize from "../db/postgres/postgresDb";

export const sendJurnalAndDb=async()=>{
        
    let transaction:Transaction|null;
    try {
        await excel.createJurnalAndDb();
        transaction = await sequelize.transaction();
        const jurnal=await Jurnal.findAll();
        for(let element of jurnal){
            await JurnalHistory.create({
                [JurnalHistoryRow.date]:element.date,
                [JurnalHistoryRow.kpp]:element.kpp,
                [JurnalHistoryRow.inputObject]:element.inputObject,
                [JurnalHistoryRow.numberPassDriver]:element.numberPassDriver,
                [JurnalHistoryRow.numberPassPassanger]:element.numberPassPassanger,
                [JurnalHistoryRow.numberPassTS]:element.numberPassTS,
                [JurnalHistoryRow.outputObject]:element.outputObject,
                [JurnalHistoryRow.time]:element.time,
                [JurnalHistoryRow.deviceId]:element.deviceId,
            },{ transaction })
        }
        await Jurnal.truncate({transaction})
        await transaction.commit();
    } catch (error) {
        console.log(error);
        
        if(transaction) await transaction.rollback();
    }

}