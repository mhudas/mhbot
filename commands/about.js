const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Informasi tentang bot ini'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Tentang Bot Ini')
            .setDescription('simple discord bot dibantu AI krn mager!! :)')
            .addFields(
                { name: 'Pemilik', value: '<@868697661308547102>', inline: true },
                { name: 'Source Code', value: 'https://github.com/mhudas/mhbot', inline: true }
            )
            .setColor(0x00BFFF)
            .setFooter({ text: 'MHBOT' });
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
