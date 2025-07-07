const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Menghitung ping...', fetchReply: true });
        const ms = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`ping, ${ms}ms`);
    },
};
