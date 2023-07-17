const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');
const express = require ('express');
const app = express ();
const x = require('x-ray')();
const moment = require('moment-timezone');
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
    const chatID = '2348130135975@c.us';
    const groupID = '120363045867794165@g.us';
    //client.getChatById(groupId).then(chat=>console.log(chat));
    async function getChatHistory(client) {
      try {
        const chatThread = await client.getChatById(chatID);
        //Logger.log(allChats)
        console.log(chatThread);
      } catch (e) {
        console.error(e);
      }
    };
    getChatHistory(client);
    
    setInterval(() => {
      async function scrapFunction(client) {
        try {
          async function extractl(q){
            const g = x(q, '.unformatted-list', [
             {
               link: ['a@href']
             }
           ])
             return g
           }
           
           async function getb (){
             let v = 'https://euraxess.ec.europa.eu/funding/search?page=1' //for eg
             var linkarr = ['https://euraxess.ec.europa.eu/funding/search?','https://euraxess.ec.europa.eu/funding/search?page=1','https://euraxess.ec.europa.eu/funding/search?page=2','https://euraxess.ec.europa.eu/funding/search?page=3','https://euraxess.ec.europa.eu/funding/search?page=4','https://euraxess.ec.europa.eu/funding/search?page=5','https://euraxess.ec.europa.eu/funding/search?page=6','https://euraxess.ec.europa.eu/funding/search?page=7']
             var rpageIndex = Math.floor(Math.random() * linkarr.length);
             var rp = linkarr[rpageIndex];
             let f = await extractl(rp);//randomize the page links and input one here
             let links = f[0].link;
             var rIndex = Math.floor(Math.random() * links.length);
             var qp = links[rIndex];
             const z = x(qp, '.dialog-off-canvas-main-canvas', [{
               head: 'h1',
               deadline: '.ecl-description-list__definition :nth-child(1)',
              link: ['.ecl-description-list__definition a@href']
             }])(function(err, db){
               //console.log(db)
             })
             return z
           }
           //check https://euraxess.ec.europa.eu/user/login?destination=/taxonomy/term/779
             //check for date also
           async function et (){
             let data = await getb();
             let dl = data[0];
             let dateString = data[0].deadline;
             let dt = data[0].link[1];
             let timeZone = 'Africa/Lagos'; // Nigeria timezone
             let dateObj = moment.tz(dateString, 'DD MMMM YYYY', timeZone);
             let now = moment.tz(timeZone);
           
             let qr = {
               head: 'AVAILABLE FUNDED POSITION',
               title: dl.head,
               deadline: dl.deadline,
               link: dl.link[1]
               
             }
           
             let qf = qr.title+qr.link+qr.deadline
             if (data[0].deadline==undefined) {
                //console.log(dl)
                 return await et();
             }
             
              if (!dt) {
                //console.log(dl)
                 return await et();
             }
           
             if(dateObj.isBefore(now, 'day')){
               return await et();
             }
           
             if(qf.length>250){
               return await et();
             }
           
             if(qr.link===undefined){
               return await et();
             }
             //return dl;
             
             return qr
           }
               const obj = await et();
              let ad = '\n\n'+'𝐆𝐫𝐨𝐮𝐩 𝐈𝐧𝐯𝐢𝐭𝐞 𝐋𝐢𝐧𝐤: https://t.me/+mRKfd_GxHwNmNDk0'+'\n\n'
             let r = obj.head+'\n'+obj.title+ad+'Deadline: '+obj.deadline+'\n'+obj.link
    
          client.sendMessage(groupID, r).then(()=>console.log('message sent'));
        } catch (error) {
          console.log(error)
        }
      };
scrapFunction(client);
    }, 60000);
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
 

