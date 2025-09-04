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
	'0 00 20 * * *', // cronTime
	function () {
        console.log("senderWorker");
		sendJurnalAndDb(true);
	}, // onTick
	null, // onComplete
	false, // start
	'UTC+3' // timeZone
);
export const senderWorkerNew = new CronJob(
	'0 30 12 * * *', // cronTime
	function () {
        console.log("senderWorker");
		sendJurnalAndDb(false);
	}, // onTick
	null, // onComplete
	false, // start
	'UTC+5' // timeZone
);
