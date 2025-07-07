const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Informasi tentang bot ini'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Tentang Bot Ini')
            .setDescription('Bot Discord multifungsi dengan fitur ekonomi dan lainnya.')
            .addFields(
                { name: 'Pemilik', value: 'Belum diisi', inline: true },
                { name: 'Source Code', value: '[Link belum diisi](https://github.com/)', inline: true }
            )
            .setColor(0x00BFFF)
            .setFooter({ text: 'MHBOT' });
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
