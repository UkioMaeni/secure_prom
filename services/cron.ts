import { CronJob } from "cron";
import { imapFlowConnect } from "./mailer";
import excel from "./excel";

export const mailWorker = new CronJob(
	'0 * * * * *', // cronTime
	function () {
		imapFlowConnect()
	}, // onTick
	null, // onComplete
	false, // start
	'America/Los_Angeles' // timeZone
);

export const senderWorker = new CronJob(
	'0 42 18 * * *', // cronTime
	function () {
        console.log("senderWorker");
        
		excel.createJurnalAndDb();
	}, // onTick
	null, // onComplete
	false, // start
	'UTC+5' // timeZone
);
