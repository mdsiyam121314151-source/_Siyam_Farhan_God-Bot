module.exports = {
  config: {
      name: "inbox",
          aliases: ["in"],
              version: "1.0",
                  author: "gok gok ",
                      countDown: 10,
                          role: 0,
                              shortDescription: {
                                    en: "hello goatbot inbox no prefix file enjoy the cmmand"
                                        },
                                            longDescription: {
                                                  en: ""
                                                      },
                                                          category: "fun",
                                                              guide: {
                                                                    en: ""
                                                                        }
                                                                          },
                                                                            langs: {
                                                                                en: {
                                                                                      gg: ""
                                                                                          },
                                                                                              id: {
                                                                                                    gg: ""
                                                                                                        }
                                                                                                          },
                                                                                                            onStart: async function({ api, event, args, message }) {
                                                                                                                try {
                                                                                                                      const query = encodeURIComponent(args.join(' '));
                                                                                                                            message.reply("✅ SUCCESSFULLY SEND MSG\n\n🙃জানু তোমার ইনবক্স চেক করো , প্রপোজ করছি,🐸🫣", event.threadID);
                                                                                                                                  api.sendMessage("✅ SUCCESSFULLY ALLOW\n😁 জানু  ইনবক্স এ আসতে বললে কেনো ,কি বলবে বলো 🙂", event.senderID);
                                                                                                                                      } catch (error) {
                                                                                                                                            console.error("Error bro: " + error);
                                                                                                                                                }
                                                                                                                                                  }
                                                                                                                                                  }
