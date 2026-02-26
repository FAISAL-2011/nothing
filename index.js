const mineflayer = require('mineflayer');
const config = require('./config.json');

function createBot() {
    const bot = mineflayer.createBot({
        host: config.host,
        port: parseInt(config.port),
        username: config.username,
        version: config.version,
        hideErrors: true
    });

    bot.on('spawn', () => {
        console.log(`✅ [${bot.username}] সার্ভারে এসেছে এবং মরার জন্য প্রস্তুত!`);
        
        // বটকে সচল রাখতে প্রতি ৩০ সেকেন্ডে একটি মেসেজ দিবে
        setInterval(() => {
            console.log("বট সচল আছে এবং রেসপন চেক করছে...");
        }, 30000);
    });

    // বট মারা গেলে সাথে সাথে রেসপন করবে
    bot.on('death', () => {
        console.log("💀 বট মারা গেছে! রেসপন করা হচ্ছে...");
        // রেসপন হতে ১ সেকেন্ড সময় নিবে
        setTimeout(() => {
            bot.respawn();
            console.log("♻️ বট আবার বেঁচে উঠেছে!");
        }, 1000);
    });

    bot.on('end', () => {
        console.log("ডিসকানেক্ট হয়েছে। ১০ সেকেন্ড পর আবার চেষ্টা করছি...");
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('Error:', err.message);
    });
}

createBot();