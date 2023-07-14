const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');
const express = require ('express');
const app = express ();
app.get('/', (req, res)=>{
  res.send ('first test of API')
});
app.get('/link', (res)=>{
  res.send('link webpage')
});

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" }),
    puppeteer: {
      args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      ]
    }
 
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });

  client.on('ready', () => {
    console.log('Client is ready!');
    const text = "Alright";
    const chatId = '2348130135975@c.us';
    const groupId = '120363045867794165@g.us';
    //client.getChatById(groupId).then(chat=>console.log(chat));
    async function getChatHistory(client) {
      try {
        const chatThread = await client.getChatById(chatId);
        //Logger.log(allChats)
        console.log(chatThread);
      } catch (e) {
        console.error(e);
      }
    };
    getChatHistory(client);
    setInterval(() => {
      client.sendMessage(chatId, text).then(msg=>console.log('message sent'));
    }, 6000);
    //getUnreadMsg(client);
});

client.on("auth_failure", (session) => {
    console.log("WHATSAPP WEB => Auth Failure");
  });
  
  client.on("disconnected", (reason) => {
    console.log("WHATSAPP WEB => Disconnected");
  });
  
/*client.on('message', message => {
	console.log(message.body);
});*/
async function getUnreadMsg(client) {
  try {
    const allChats = await client.getChats();
    //Logger.log(allChats)
    console.log('check chat log');
  } catch (e) {
    console.error(e);
  }
}


client.initialize();
 

