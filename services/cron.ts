import { CronJob } from "cron";
import { imapFlowConnect } from "./mailer";

// export const mailWorker = new CronJob(
// 	'* 17/15 * * * *', // cronTime
// 	function () {
// 		imapFlowConnect()
// 	}, // onTick
// 	null, // onComplete
// 	false, // start
// 	'America/Los_Angeles' // timeZone
// );
export const mailWorker = setInterval(()=>{
    imapFlowConnect();
},1000*60);