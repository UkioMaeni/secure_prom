import TelegramBot =require("node-telegram-bot-api");
const token = '7607396602:AAENUXFvZ4MAGmSxky-U8euFRC7YORgsj_s'; // Замените на свой токен
const bot = new TelegramBot(token, { polling: true });

let accessCodes : Map<number,string>=new Map();

export const startBotProcess=()=>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        if(accessCodes[chatId]==null){
            bot.sendMessage(chatId, 'Для доступа введите пароль');
            return;
        }
        if (messageText === '020202'){
            accessCodes.set(chatId,"");
            bot.sendMessage(chatId, "Вы авторизованы");
        }
        if (messageText === '/check') {
           return checkAccessCount();
        } else if (messageText === '/help') {
          bot.sendMessage(chatId, '=>');
        } else {
          bot.sendMessage(chatId, 'Ожидайте трекинга');
        }
      });
}

const checkAccessCount=()=>{
    accessCodes.forEach((value: string, key: number) => {
        bot.sendMessage(key, "ВСего подключено пользователей: "+accessCodes.size);
    });
    
}

export const sendBotProcess=(text:string)=>{
    accessCodes.forEach((value: string, key: number) => {
        bot.sendMessage(key, text);
    });
}