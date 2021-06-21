const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json').token;

const scrap = require('./scrapper.js');


const prefix = "-";

function handler() {
    console.log('ready! ass! dick!');
}

async function message_handler(message) {
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    console.log('received command ' + command);

    if (command == "hypixel_refresh") {
        // я подключил скрипт))

        message.reply('hypixel scrapping initialized...');

        const data = await scrap();
        message.reply('hypixel progress percentage: ' + data.percent + '%');
    }
}

client.on('ready', handler);
client.on('message', message_handler);


client.login(token);