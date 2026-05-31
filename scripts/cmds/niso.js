const fs = require("fs-extra");

module.exports = {
  config: {
    name: "farhan_mention",
    version: "7.0.0",
    author: "Farhan-Khan", // ⚠️ এটা change করলে bot বন্ধ হয়ে যাবে
    countDown: 0,
    role: 0,
    shortDescription: "Admin mention reply styled",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 AUTHOR LOCK
    if (this.config.author !== "Farhan-Khan") {
      console.log("⚠️ Author changed! Module stopped.");
      return;
    }

    // 👑 ADMINS
    const admins = [
      {
        uid: "61575407981298",
        names: ["Niso"]
      },
      {
        uid: "61575407981298",
        names: ["niso"]
      }
    ];

    const senderID = String(event.senderID);

    // ❌ Admin নিজে লিখলে reply দিবে না
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase().trim();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    // 🔍 MENTION DETECT
    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      text.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    // 💬 RAW CAPTIONS
    const captions = [
      "Mantion_দিস না _ফাহিম এর বন এর মন মন ভালো নেই আস্কে-!💔🥀",
      "- আমার মেম এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
      "👉আমার মেম এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো মেম ফ্রি হলে আসবে🧡😁😜🐒",
      "মেম কে এত মেনশন না দিয়ে ফাহিম এর ইন বক্স জাও হট করে দিবে🤷‍ঝাং 😘🥒",
      "মেম কে Mantion_দিলে ফাহিম চুম্মাইয়া ঠুটের কালার change কইরা,দিবে💋😾😾🔨",
      "মেম এখন বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
      "মেম কে এতো মেনশন নাহ দিয়া মেম কে একটা জামাই দে 😒 😏",
      "Mantion_না দিয়ে মেম এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
      "মেম কে মেনশন দিসনা পারলে একটা জামাই  দে",
      "বাল পাকনা Mantion_দিস না বস মেম প্রচুর বিজি আছে 🥵🥀🤐",
      "চুমু খাওয়ার বয়স টা আমার মেম চকলেট🍫খেয়ে উড়িয়ে দিল 🤗"
    ];

    const formatCaption = (text) => {
      return `
━━━━━━━━━━━━━━━━━━━━
- ${text}
━━━━━━━━━━━━━━━━━━━━`;
    };

    const rawCaption = captions[Math.floor(Math.random() * captions.length)];
    const styledCaption = formatCaption(rawCaption);

    try {
      await message.reply({
        body: styledCaption
      });
    } catch (err) {
      console.log("Error sending admin reply:", err);
    }
  }
};