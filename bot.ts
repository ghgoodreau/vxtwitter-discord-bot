// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('message', (message) => {
  const twitterLinkRegex = /https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/status\/\d+(?:\?[^\s]+)?/g;

  if (twitterLinkRegex.test(message.content)) {
    const modifiedMessage = message.content.replace(twitterLinkRegex, (match) => {
      return match.replace('twitter.com', 'vxtwitter.com');
    });

    // Reply to the original message with the modified link
    message.reply(modifiedMessage);
  }
});

// Log in to Discord with your client's token
client.login(token);