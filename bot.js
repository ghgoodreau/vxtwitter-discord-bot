require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const twitterLinkRegex = /https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+(?:\?[^\s]+)?/g;

  if (twitterLinkRegex.test(message.content)) {
    console.log('Twitter link detected:', message.content);

    const modifiedMessage = message.content.replace(twitterLinkRegex, (match) => {
      return match.replace('twitter.com', 'vxtwitter.com');
    });

    await message.reply(`Original message from ${message.author}:\n---------------------------------------------\n${modifiedMessage}`);

    try {
      await message.delete();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
});

client.login(token);