const { createCanvas, loadImage } = require("canvas");
const GIFEncoder = require("gif-encoder-2");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "owner3",
    version: "11.0",
    author: "Siyam Ultra Premium (Optimized)",
    countDown: 10,
    role: 2, // 🔒 heavy cmd protection
    shortDescription: "Ultra Premium Owner Card",
    category: "utility"
  },

  onStart: async function ({ message, api }) {
    try {

      // 🔁 SAFE CARD CYCLE (no global conflict)
      if (!global.ownerCardIndex) global.ownerCardIndex = 0;
      const cardIndex = global.ownerCardIndex;
      global.ownerCardIndex = (global.ownerCardIndex + 1) % 3;

      // ⚡ FAST LOADING (short)
      const loadingMsg = await message.reply("⚡ Generating Premium Card...");
      await new Promise(r => setTimeout(r, 1500));
      try { await api.unsendMessage(loadingMsg.messageID); } catch {}

      // ⏱️ uptime
      const up = process.uptime();
      const h = Math.floor(up / 3600);
      const m = Math.floor((up % 3600) / 60);

      // 🖼️ avatar safe load
      let avatar;
      try {
        avatar = await loadImage("https://i.imgur.com/lx061ey.jpeg");
      } catch {
        avatar = await loadImage("https://i.imgur.com/2WZtOD6.png");
      }

      // 📏 optimized size
      const width = 800;
      const height = 450;

      const encoder = new GIFEncoder(width, height);

      // ⚡ unique file (no conflict)
      const filePath = path.join(__dirname, `owner3_${Date.now()}.gif`);

      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(110);
      encoder.setQuality(10);

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // ⭐ optimized stars
      const stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        speed: Math.random() * 0.4 + 0.2
      }));

      function drawStars(frame) {
        ctx.fillStyle = "#fff";
        stars.forEach(s => {
          let y = (s.y + frame * s.speed) % height;
          ctx.beginPath();
          ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      function nebula(frame) {
        const g = ctx.createRadialGradient(
          width / 2 + Math.sin(frame * 0.05) * 120,
          height / 2,
          50,
          width / 2,
          height / 2,
          400
        );

        const colors = [
          "rgba(255,0,102,0.4)",
          "rgba(0,255,255,0.4)",
          "rgba(255,215,0,0.4)"
        ];

        g.addColorStop(0, colors[cardIndex]);
        g.addColorStop(1, "rgba(0,0,0,0.9)");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      function premiumText(t, x, y, size, colors, glow = true) {
        const grad = ctx.createLinearGradient(x, y - size, x + 300, y);

        colors.forEach((c, i) => {
          grad.addColorStop(i / (colors.length - 1), c);
        });

        ctx.font = `bold ${size}px Arial`;
        ctx.fillStyle = grad;

        if (glow) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = colors[0];
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.strokeText(t, x, y);

        ctx.fillText(t, x, y);

        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      }

      // 🎬 optimized frames (60 → 30)
      for (let i = 0; i < 30; i++) {

        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, width, height);

        drawStars(i);
        nebula(i);

        // FRAME
        const borderColors = ["#ff4d6d","#00ffff","#ffd700"];
        ctx.lineWidth = 5;
        ctx.strokeStyle = borderColors[cardIndex];
        ctx.strokeRect(15, 15, width - 30, height - 30);

        // WATERMARK
        ctx.globalAlpha = 0.05;
        premiumText("UDAY HASAN SIYAM", 200, 80, 50, ["#ffffff","#888"], false);
        ctx.globalAlpha = 1;

        // PROFILE ROTATION
        const cx = 140;
        const cy = height / 2;
        const angle = (i % 20) * (Math.PI * 2 / 20);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.arc(0, 0, 65, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(avatar, -65, -65, 130, 130);
        ctx.restore();

        // RING LIGHT
        for (let k = 0; k < 6; k++) {
          const a = angle + (k * Math.PI / 3);
          const x = cx + Math.cos(a) * 90;
          const y = cy + Math.sin(a) * 90;

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = ["#ff4d6d","#00ffff","#ffd700","#00ff99","#ff00ff","#ffffff"][k];
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }

        // TEXT
        const titleColors = [
          ["#ffd700","#fff8dc","#ffd700"],
          ["#00ffff","#ffffff","#00ffff"],
          ["#ff4d6d","#ff99aa","#ff4d6d"]
        ];

        premiumText("𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐒𝐈𝐘𝐀𝐌", 240, 110, 26, titleColors[cardIndex]);

        premiumText("Name : Uday Hasan Siyam", 250, 160, 16, ["#ffffff","#cbd5f5"]);
        premiumText("Home : Kishoreganj", 250, 190, 16, ["#ffffff","#cbd5f5"]);
        premiumText("Study : Class 10", 250, 220, 16, ["#ffffff","#cbd5f5"]);
        premiumText("Status : Single 😎", 250, 250, 16, ["#ffffff","#cbd5f5"]);

        premiumText(`Running : ${h}h ${m}m`, 250, 290, 16, ["#38bdf8","#0ea5e9"]);

        premiumText("NIJHUM BOT ⚡", 250, 330, 20, ["#22c55e","#4ade80","#22c55e"]);

        encoder.addFrame(ctx);
      }

      encoder.finish();
      fs.writeFileSync(filePath, encoder.out.getData());

      // 📤 send
      await message.reply({
        body: `🔥 Premium Card ${cardIndex + 1}/3`,
        attachment: fs.createReadStream(filePath)
      });

      // 🧹 delete after send
      fs.unlinkSync(filePath);

    } catch (e) {
      return message.reply("❌ Error: " + e.message);
    }
  }
};
