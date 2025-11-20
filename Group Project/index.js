const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const jokes = [
  "Why do programmers hate nature? It has too many bugs!",
  "Why do Java developers wear glasses? Because they don’t see sharp!",
  "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
];


client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; 

  const args = message.content.split(" ");
  const command = args[0].toLowerCase();

  // Hello command
  if (command === "!hello") {
    message.reply(`👋 Hello ${message.author.username}!`);
  }

  // Time command
  else if (command === "!time") {
    const time = new Date().toLocaleTimeString();
    message.reply(`🕒 Current time is: **${time}**`);
  }

  // Joke command
  else if (command === "!joke") {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(`😂 ${randomJoke}`);
  }

  // User Info command
  else if (command === "!userinfo") {
    message.reply(
      `🙋‍♂️ Username: **${message.author.username}**\n🆔 ID: **${message.author.id}**`
    );
  }

  // Game command: rock-paper-scissors
  else if (command === "!game") {
    const choices = ["rock", "paper", "scissors"];
    const userChoice = args[1]?.toLowerCase();

    if (!userChoice || !choices.includes(userChoice)) {
      return message.reply(
        "🎮 Usage: `!game rock`, `!game paper`, or `!game scissors`"
      );
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (userChoice === botChoice) result = "It's a tie!";
    else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    )
      result = "🎉 You win!";
    else result = "😢 You lose!";

    message.reply(
      `You chose **${userChoice}**, I chose **${botChoice}**. ${result}`
    );
  }
  // Weather command
    else if (command === "!weather") {
        const city = args.slice(1).join(" ");
        if (!city)
            return message.reply("🌦️ Please provide a city. Example: `!weather Toronto`");

        try {
            const apiKey = process.env.WEATHER_API_KEY;
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

            const response = await axios.get(url);
            const data = response.data;

            message.reply(
                `🌤️ Weather in **${data.location.name}, ${data.location.country}**:\n` +
                `Temperature: **${data.current.temp_c}°C**\n` +
                `Condition: **${data.current.condition.text}**\n` +
                `Humidity: **${data.current.humidity}%**\n` +
                `Wind: **${data.current.wind_kph} kph**`
            );
        } catch (error) {
            console.error(error.response?.data || error.message);
            message.reply("❌ Could not find that city. Please try again!");
        }
    }

});

// Login to Discord
client.login(process.env.TOKEN);
