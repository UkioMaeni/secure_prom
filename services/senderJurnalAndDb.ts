import { Sequelize, Transaction } from "sequelize";
import Jurnal from "../models/jurnal"
import JurnalHistory, { JurnalHistoryRow } from "../models/jurnal_history";
import excel from "./excel";
import sequelize from "../db/postgres/postgresDb";
import { sendBotProcess } from "./tg_bot";

export const sendJurnalAndDb=async()=>{
        
    let transaction:Transaction|null;
    
    try {
        sendBotProcess("Старт процесса отправки журнала");
        const count=await Jurnal.count()
        sendBotProcess("Сейчас в журнале записей- "+count);
        await excel.createJurnalAndDb();
        sendBotProcess("Журнал сформирован и отправлен на почту");
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
        sendBotProcess("История журнала добавлена в таблицу идет очистка основного журнала");
        await Jurnal.truncate({transaction})
        await transaction.commit();
        const countPast=await Jurnal.count()
        sendBotProcess("Журнал очищен.теперь в нем записей - "+countPast);
    } catch (error) {
        sendBotProcess(error);
        console.log(error);
        if(transaction) await transaction.rollback();
    }

}