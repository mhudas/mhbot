const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar command bot'),
    async execute(interaction) {
        const commandsPath = path.join(__dirname);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        let desc = '';
        for (const file of commandFiles) {
            if (file === 'help.js') continue;
            const command = require(path.join(commandsPath, file));
            if (command.data && command.data.name && command.data.description) {
                desc += `• /${command.data.name} — ${command.data.description}\n`;
            }
        }
        const embed = new EmbedBuilder()
            .setTitle('Daftar Command')
            .setDescription(desc || 'Tidak ada command.')
            .setColor(0x00BFFF)
            .setFooter({ text: 'MHBOT' });
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
