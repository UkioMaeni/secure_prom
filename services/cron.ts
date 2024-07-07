import { CronJob } from "cron";
import { imapFlowConnect } from "./mailer";
import excel from "./excel";
import {sendJurnalAndDb} from "./senderJurnalAndDb"
export const mailWorker = new CronJob(
	'0 * * * * *', // cronTime
	function () {
		imapFlowConnect()
	}, // onTick
	null, // onComplete
	false, // start
	'UTC+5' // timeZone
);

export const senderWorker = new CronJob(
	'0 45 16 * * *', // cronTime
	function () {
        console.log("senderWorker");
		sendJurnalAndDb();
	}, // onTick
	null, // onComplete
	false, // start
	'UTC+5' // timeZone
);
