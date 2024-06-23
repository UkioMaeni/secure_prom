"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailWorker = void 0;
const mailer_1 = require("./mailer");
// export const mailWorker = new CronJob(
// 	'* 17/15 * * * *', // cronTime
// 	function () {
// 		imapFlowConnect()
// 	}, // onTick
// 	null, // onComplete
// 	false, // start
// 	'America/Los_Angeles' // timeZone
// );
exports.mailWorker = setInterval(() => {
    (0, mailer_1.imapFlowConnect)();
}, 1000 * 60);
