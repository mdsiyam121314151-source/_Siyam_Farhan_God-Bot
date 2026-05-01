const { createCanvas, loadImage } = require("canvas");
const GIFEncoder = require("gif-encoder-2");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "owne2",
    version: "7.0",
    author: "Siyam Ultra Premium",
    countDown: 10,
    role: 2, // 🔒 restrict heavy cmd
    shortDescription: "Galaxy Premium Owner Card",
    category: "utility"
  },

  onStart: async function ({ message }) {
    try {

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

      // ⚡ unique file
      const filePath = path.join(__dirname, `owner_${Date.now()}.gif`);

      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(120); // একটু smooth
      encoder.setQuality(10);

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // ⭐ stars optimized
      const stars = Array.from({ length: 80 }, () => ({
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
        g.addColorStop(0, "rgba(147,51,234,0.4)");
        g.addColorStop(0.5, "rgba(59,130,246,0.2)");
        g.addColorStop(1, "rgba(0,0,0,0.9)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      function text(t, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px Arial`;
        ctx.fillText(t, x, y);
      }

      // 🎬 frames optimized (60 → 30)
      for (let i = 0; i < 30; i++) {

        const mode = i % 3;

        // 🌌 bg
        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, width, height);
        drawStars(i);
        nebula(i);

        // 🎨 border
        const colors = ["#00f7ff", "#ff4d6d", "#ffd700"];
        ctx.strokeStyle = colors[mode];
        ctx.lineWidth = 4;
        ctx.strokeRect(15, 15, width - 30, height - 30);

        // 💎 glass
        let glass = ctx.createLinearGradient(30, 30, width - 30, height - 30);
        glass.addColorStop(0, "rgba(255,255,255,0.05)");
        glass.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = glass;
        ctx.fillRect(30, 30, width - 60, height - 60);

        // ✨ shine
        const shineX = (i * 20) % width;
        const shine = ctx.createLinearGradient(shineX - 150, 0, shineX, height);
        shine.addColorStop(0, "rgba(255,255,255,0)");
        shine.addColorStop(0.5, "rgba(255,255,255,0.12)");
        shine.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = shine;
        ctx.fillRect(30, 30, width - 60, height - 60);

        // 🔄 avatar rotate
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

        // 💡 ring
        for (let k = 0; k < 6; k++) {
          const a = angle + (k * Math.PI / 3);
          const x = cx + Math.cos(a) * 90;
          const y = cy + Math.sin(a) * 90;

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = ["#00ffff","#ff00ff","#00ff00","#ffff00","#ff8800","#ffffff"][k];
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }

        // 👑 title
        text("BOT OWNER SIYAM", 250, 100, 24, "#ffffff");

        // 📄 info
        const color = "#e2e8f0";
        text("Name : Uday Hasan Siyam", 260, 150, 18, color);
        text("Home : Kishoreganj", 260, 180, 18, color);
        text("Study : Class 10", 260, 210, 18, color);
        text("Age : 17+", 260, 240, 18, color);
        text("Status : Single 😎", 260, 270, 18, color);

        // ⏱️ uptime
        text(`Running : ${h}h ${m}m`, 260, 310, 18, "#38bdf8");

        // 🚀 footer
        text("NIJHUM BOT ⚡", 260, 350, 20, "#22c55e");

        encoder.addFrame(ctx);
      }

      encoder.finish();
      fs.writeFileSync(filePath, encoder.out.getData());

      // 📤 send
      await message.reply({
        body: "🔥 Ultra Galaxy Owner Card Ready",
        attachment: fs.createReadStream(filePath)
      });

      // 🧹 auto delete
      fs.unlinkSync(filePath);

    } catch (e) {
      return message.reply("❌ Error: " + e.message);
    }
  }
};
