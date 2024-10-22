// src/commands/moderation/warn.js
const fs = require('fs');
const path = require('path');

const warningsFilePath = path.join(__dirname, '../warnings.json');

// Load warnings from file
const loadWarnings = () => {
  if (!fs.existsSync(warningsFilePath)) {
    fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf-8');
  }
  return JSON.parse(fs.readFileSync(warningsFilePath, 'utf-8'));
};

// Save warnings to file
const saveWarnings = (warnings) => {
  fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 2), 'utf-8');
};

module.exports = {
  name: 'warn',
  description: 'Warn a user.',
  execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to warn members.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to warn.');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    const warnings = loadWarnings();
    const userId = user.id;

    // Create a new entry or update the existing one
    if (!warnings[userId]) {
      warnings[userId] = { count: 1, reasons: [reason] };
    } else {
      warnings[userId].count += 1;
      warnings[userId].reasons.push(reason);
    }

    saveWarnings(warnings);
    message.channel.send(`${user.tag} has been warned. Reason: ${reason} (Total Warnings: ${warnings[userId].count})`);
  },
};
