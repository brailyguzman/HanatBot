import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = dotenv.DISCORD_TOKEN;
const PREFIX = '!';

// Here, we create a new client and specify what the bot will be able to access.
export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// When the bot starts, we are going to log to the console.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    // If the message is sent by a Bot, it will be ignored.
    // If the messages does not start with the prefix at the beginning, it will be ignored. Ex: "!ping"
    if (message.author.bot || !message.content[0] === PREFIX) {
        console.log('returning');
        return;
    }

    /*
     This will remove the Prefix at the beginning in order to know the command.
     It will store the text starting at the index of 1
    */
    const command = message.content.slice(1);

    switch (command) {
        // When the ping command is sent, we reply with "pong!"
        case 'ping':
            await message.reply('pong!');
            break;

        // When the date command is sent, we reply with the current Date
        case 'date':
            const currentDate = new Date();

            await message.reply(`${currentDate}`);
            break;

        default:
            return;
    }
});

client.login(TOKEN);
