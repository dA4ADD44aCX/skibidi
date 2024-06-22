const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const port = 8000;

const client = new Client({
    checkUpdate: false
});

const largeImages = [
    'https://cdn.discordapp.com/banners/877171082799505490/a_986b218f3434e3516b441e1aa7be72de.gif?size=1024'
];

const stateTexts = [
    "꒰ ถ้าไม่คิดจะสู้ ก็จงอุดอู้อยู่กับคำว่าแพ้ ꒱",
    "꒰ ความทุกข์คือครูที่ยิ่งใหญ่ที่สุด ꒱",
    "꒰ เวลาคือของขวัญที่มีค่าที่สุด ꒱",
    "꒰ จงคิดบวก และโลกจะดูสดใสขึ้น ꒱",
    "꒰ อย่าหยุดจนกว่าคุณจะภูมิใจ ꒱",
    "꒰ ชีวิตมันสั้น จงมีความสุข ꒱",
    "꒰ ล้ม แล้ว ลุก ทุกข์ แล้ว ยิ้ม ꒱",
    "꒰ ความเป็นไปได้ไม่มีที่สิ้นสุด ดังนั้นอย่าหยุดฝัน ꒱"
];

const nameTexts = [
    "꒰ ถ้าไม่คิดจะสู้ ก็จงอุดอู้อยู่กับคำว่าแพ้ ꒱",
    "꒰ ความทุกข์คือครูที่ยิ่งใหญ่ที่สุด ꒱",
    "꒰ เวลาคือของขวัญที่มีค่าที่สุด ꒱",
    "꒰ จงคิดบวก และโลกจะดูสดใสขึ้น ꒱",
    "꒰ อย่าหยุดจนกว่าคุณจะภูมิใจ ꒱",
    "꒰ ชีวิตมันสั้น จงมีความสุข ꒱",
    "꒰ ล้ม แล้ว ลุก ทุกข์ แล้ว ยิ้ม ꒱",
    "꒰ ความเป็นไปได้ไม่มีที่สิ้นสุด ดังนั้นอย่าหยุดฝัน ꒱"
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
    }, 10000); // Update every 10 seconds
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
            .setDetails('꒰⸝⸝⸝⸝⸝⸝> 𝙲𝙷𝙰𝚁𝙻𝙸𝚂𝚈 <⸝⸝⸝⸝⸝⸝꒱')
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
