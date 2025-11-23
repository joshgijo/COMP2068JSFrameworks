Discord Bot
A simple and beginner-friendly Discord bot built using Node.js, discord.js, and axios.
This bot provides basic commands such as greeting, current time, weather, jokes, rock-paper-scissors game, and user information.

Features / Commands
!hello - Bot greets the user
!time - Shows current server time
!weather <city> - Fetches real-time weather using WeatherAPI
!joke - Gives a random joke
!game <choice> - Play Rock-Paper-Scissors with the bot. Choices: rock, paper, scissors
!userinfo - Displays information about the user who typed the command

Installation & Setup
Download the project
npm init -y

Install required dependencies
npm install discord.js axios dotenv

Configure .env file
Create a .env file in your bot folder and add:
DISCORD_TOKEN=your_discord_bot_token_here
WEATHER_API_KEY=your_weatherapi_key_here

Open the Developer Portal: https://discord.com/developers/applications
Click New Application → give it a name → Create.
In the left menu click Bot → click Add Bot → confirm.

On the Bot page, find Token (or Click to Reveal Token).
Click Reset Token if you want a new one, then Copy the token.

On the Bot page, find Privileged Gateway Intents.
Turn ON:
Message Content Intent
Server Members Intent 
Click Save Changes.

In Developer Portal → OAuth2 → URL Generator.
Under SCOPES check:
bot 
applications.commands
Under BOT PERMISSIONS select at least:
Send Messages
Read Message History
View Channels
Copy the generated URL at the bottom and open it in your browser

Open Discord app or web client.
Left sidebar → Click + → Create My Own → follow prompts → name server.
You automatically have Manage Server permission for that server, so it will appear in the invite dropdown.

If you own or manage a server it will appear in the “Add to Server” dropdown.
If you don’t have any servers, create one (see step 6).
Select the server → Continue → Authorize → complete CAPTCHA.
The bot will be added (may show offline until you run the code).