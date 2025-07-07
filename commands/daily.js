const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../playerdata.json');

function getData() {
    if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    return {};
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('harian')
        .setDescription('Claim saldo harian (setiap 24 jam sekali)'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const now = Date.now();
        const data = getData();
        const user = data[userId] || { saldo: 0, lastDaily: 0 };
        if (user.lastDaily && now - user.lastDaily < 24 * 60 * 60 * 1000) {
            const nextClaim = new Date(user.lastDaily + 24 * 60 * 60 * 1000);
            await interaction.reply(`Kamu sudah claim hari ini! Coba lagi pada: <t:${Math.floor(nextClaim.getTime()/1000)}:F>`);
            return;
        }
        const reward = Math.floor(Math.random() * 20) + 1;
        user.saldo = (typeof user.saldo === 'number' ? user.saldo : 0) + reward;
        user.lastDaily = now;
        data[userId] = user;
        saveData(data);
        await interaction.reply(`Kamu mendapatkan ${reward} koin! Saldo sekarang: ${user.saldo} koin.`);
    },
};
