const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const port = 8000;

const client = new Client({
    checkUpdate: false
});

const largeImages = [
    'https://media.discordapp.net/attachments/1248256282817859636/1251724171877285898/med2.gif?ex=666f9e7a&is=666e4cfa&hm=7fee4e2d3cb86bc7b2fb1af43685ddf8d2443d50094888b955a954569412acef&=&width=800&height=445',
    'https://media.discordapp.net/attachments/1248256282817859636/1251724171050877008/med4.gif?ex=666f9e7a&is=666e4cfa&hm=99a0a255489957cadcd2ad6dcb9ba5f140993db3873c157783196a158986db46&=&width=622&height=351'
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
    console.log(`Updated indices - Image: ${currentLargeImageIndex}, State: ${currentStateIndex}, Name: ${currentNameTextIndex}`);
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
