// src/commands/moderation/viewWarnings.js
const fs = require('fs');
const path = require('path');

const warningsFilePath = path.join(__dirname, '../warnings.json');

const loadWarnings = () => {
  if (!fs.existsSync(warningsFilePath)) {
    fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf-8');
  }
  return JSON.parse(fs.readFileSync(warningsFilePath, 'utf-8'));
};

module.exports = {
  name: 'viewWarnings',
  description: 'View the number of warnings a user has received.',
  execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to view their warnings.');
    }

    const warnings = loadWarnings();
    const userId = user.id;

    if (warnings[userId]) {
      const { count, reasons } = warnings[userId];
      message.channel.send(`${user.tag} has ${count} warning(s). Reasons: ${reasons.join(', ')}`);
    } else {
      message.channel.send(`${user.tag} has no warnings.`);
    }
  },
};
