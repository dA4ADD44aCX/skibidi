const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const port = 8000;

const client = new Client({
    checkUpdate: false
});

const largeImages = [
    'https://i.ibb.co/QXzgDTD/med1.gif',
    'https://i.ibb.co/R6j0BkW/med2.gif',
    'https://i.ibb.co/26wMwz4/med3.gif',
    'https://i.ibb.co/8rSG8ng/med4.gif'
];

const stateTexts = [
    "꒰ ของดีอยู่ตรงหน้าไอ้ห่าไม่เอา ꒱",
    "꒰ Join My Discord Fr ꒱"
];

const nameTexts = [
    "꒰ ของดีอยู่ตรงหน้าไอ้ห่าไม่เอา ꒱",
    "꒰ Join My Discord Fr ꒱"
];

let currentStateIndex = 0;
let currentLargeImageIndex = 0;
let currentNameTextIndex = 0;

app.get('/', (req, res) => res.send('Server is running successfully'));
app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));

client.on("ready", () => {
    const startedAt = Date.now();
    console.log(`${client.user.username} bot is running successfully!`);

    setInterval(() => {
        updateRichPresence(startedAt);
        rotateIndices();
    }, 10000);
});

function updateRichPresence(startedAt) {
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();

    try {
        const r = new Discord.RichPresence()
            .setApplicationId('1121867777867788309')
            .setType('STREAMING')
            .setURL('https://www.youtube.com/watch?v=uU9Fe-WXew4')
            .setState(stateTexts[currentStateIndex])
            .setName(nameTexts[currentNameTextIndex])
            .setDetails('꒰ ᵔ ᵕ ᵔ ꒱')
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`꒰ ʚ📅 ${currentDate} ♡ 🎲${currentTime}ɞ ꒱`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('My Discord', 'https://discord.gg/charlisy');

        client.user.setActivity(r);
    } catch (error) {
        console.error('Failed to update Rich Presence:', error);
    }
}

function rotateIndices() {
    currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
    currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
    currentNameTextIndex = (currentNameTextIndex + 1) % nameTexts.length;
}

function getCurrentDate() {
    const date = new Date();
    const options = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const date = new Date();
    const options = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return date.toLocaleTimeString("th-TH", options);
}

client.login(process.env.TOKEN);
