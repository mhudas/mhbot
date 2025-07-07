const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../playerdata.json');

function getBalance(userId) {
    let data = {};
    if (fs.existsSync(dataPath)) {
        data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }

    return data[userId] && typeof data[userId].saldo === 'number' ? data[userId].saldo : undefined;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saldo')
        .setDescription('Cek saldo kamu!'),
    async execute(interaction) {
        try {
            const userId = interaction.user.id;
            const saldo = getBalance(userId);
            if (saldo === undefined || saldo === 0) {
                await interaction.reply('maaf anda tidak memiliki saldo');
            } else if (typeof saldo !== 'number' || saldo < 0) {
                await interaction.reply('saldo kamu error atau mengalami minus');
            } else {
                await interaction.reply(`Saldo kamu: ${saldo} koin`);
            }
        } catch (error) {
            await interaction.reply('saldo kamu error atau mengalami minus');
        }
    },
};
