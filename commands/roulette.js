const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
// Hati-hati, jangan mengedit file ini sembarangan ya soalnya ada fitur roulette yang cukup rumit, entah cooldown, chance menang, dan lain-lain yang sudah diatur dengan baik.
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

function getCooldownData() {
    const cooldownPath = path.join(__dirname, '../roulette_cooldown.json');
    if (fs.existsSync(cooldownPath)) {
        return JSON.parse(fs.readFileSync(cooldownPath, 'utf8'));
    }
    return {};
}

function saveCooldownData(data) {
    const cooldownPath = path.join(__dirname, '../roulette_cooldown.json');
    fs.writeFileSync(cooldownPath, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Mainkan roulette melawan bot!')
        .addIntegerOption(option =>
            option.setName('jumlah')
                .setDescription('Jumlah koin yang ingin dipertaruhkan (minimal 10)')
                .setRequired(true)),
    async execute(interaction) {
        const userId = interaction.user.id;
        const jumlah = interaction.options.getInteger('jumlah');
        if (jumlah < 10) {
            await interaction.reply({ content: 'Minimal taruhan adalah 10 koin!', ephemeral: true });
            return;
        }
        // Cek cooldown dan limit harian
        const cooldownData = getCooldownData();
        const now = Date.now();
        const userCooldown = cooldownData[userId] || { last: 0, count: 0, date: new Date().toLocaleDateString() };
        // Reset count jika hari sudah berganti
        const today = new Date().toLocaleDateString();
        if (userCooldown.date !== today) {
            userCooldown.count = 0;
            userCooldown.date = today;
        }
        if (userCooldown.count >= 10) {
            await interaction.reply({ content: 'Batas bermain roulette hari ini sudah tercapai (10x). Coba lagi besok!', ephemeral: true });
            return;
        }
        if (now - userCooldown.last < 6000) {
            const wait = ((6000 - (now - userCooldown.last)) / 1000).toFixed(1);
            await interaction.reply({ content: `Tunggu ${wait} detik sebelum bermain lagi!`, ephemeral: true });
            return;
        }
        userCooldown.last = now;
        userCooldown.count += 1;
        cooldownData[userId] = userCooldown;
        saveCooldownData(cooldownData);
        const data = getData();
        const user = data[userId] || { saldo: 0, lastDaily: 0 };
        if (user.saldo < jumlah) {
            await interaction.reply({ content: 'Saldo kamu tidak cukup untuk bermain!', ephemeral: true });
            return;
        }
        // Fitur Chance Menang
        let userNum, botNum;
        const winChance = Math.random();
        if (winChance < 0.35) { // 35% chance menang
            // User menang: userNum > botNum, userNum != 0, botNum != 0
            botNum = Math.floor(Math.random() * 36) + 1; // 1-36
            userNum = botNum + Math.floor(Math.random() * (37 - botNum)); // userNum > botNum, max 36
            if (userNum > 36) userNum = 36;
        } else if (winChance < 0.36) { // 1% chance userNum=0 (super win)
            userNum = 0;
            botNum = Math.floor(Math.random() * 36) + 1;
        } else if (winChance < 0.38) { // 2% chance botNum=0 (super lose)
            userNum = Math.floor(Math.random() * 36) + 1;
            botNum = 0;
        } else if (winChance < 0.68) { // 30% chance seri
            userNum = Math.floor(Math.random() * 37);
            botNum = userNum;
        } else {
            // User kalah: botNum > userNum, botNum != 0, userNum != 0
            userNum = Math.floor(Math.random() * 36) + 1;
            botNum = userNum + Math.floor(Math.random() * (37 - userNum));
            if (botNum > 36) botNum = 36;
        }
        let resultMsg = `Angka kamu: **${userNum}** | Angka bot: **${botNum}**\n`;

        user.saldo -= jumlah;
        if (userNum === botNum) {
            user.saldo += jumlah;
            resultMsg += 'Seri! Saldo kamu tidak berubah.';
        } else if ((userNum === 0 && botNum !== 0) || (userNum > botNum && userNum !== 0)) {
            let bonus = jumlah;
            if (userNum === 0) bonus = jumlah * 2;
            user.saldo += jumlah + bonus;
            resultMsg += `Kamu menang! Saldo bertambah **${bonus} koin**.`;
        } else if ((botNum === 0 && userNum !== 0) || (botNum > userNum && botNum !== 0)) {
            resultMsg += `Kamu kalah! Saldo berkurang **${jumlah} koin**.`;
        }
        data[userId] = user;
        saveData(data);
        await interaction.reply({ content: resultMsg, ephemeral: false });
    },
};
