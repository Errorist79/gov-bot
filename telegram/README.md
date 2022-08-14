## Setup

İnstall nodejs
```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```
clone the repo
```bash
git clone https://github.com/Errorist79/gov-bot.git
cd gov-bot/telegram
```
install modules & start the bot
```bash
npm install
npm run test
```
Ref of these steps: @shivlim

**Get telegram bot and chatid following the process below**

1. To create a free **Telegram account**, download the [app for Android / iPhone](https://telegram.org) and sign up using your phone number.
2. To create a **Telegram bot**, add [@BotFather](https://telegram.me/BotFather) on Telegram, press Start, and follow the below steps:
    1. Send a `/newbot` command and fill in the requested details, including a bot name and username.
    2. Take a note of the API token, which looks something like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`.
    3. Access the link `t.me/<username>` to your new bot given by BotFather and press Start.
    4. Access the link `api.telegram.org/bot<token>/getUpdates`, replacing `<token>` with the bot's API token. This gives a list of the bot's activity, including messages sent to the bot.
    5. The result section should contain at least one message, due to us pressing the Start button. If not, sending a `/start` command to the bot should do the trick. Take a note of the `"id"` number in the `"chat"` section of this message.
    6. One bot is enough for now, but you can repeat these steps to create more bots.
