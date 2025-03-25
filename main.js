import makeWASocket { DisconnectReason, } from 'baileys'
import P from 'pino'


const groupCache = new NodeCache({ /* ... */ })

async function main () {

  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const Owner: string  = "String";
  const sock = makeWASocket({
    auth: state, // auth state of your choosing,
    logger: P(), // you can configure this as much as you want, even including streaming the logs to a ReadableStream for upload or saving to a file
    cachedGroupMetadata: async (jid) => groupCache.get(jid)
  })


  sock.ev.on('connection.update', async (update) => {
  const {connection, lastDisconnect, qr } = update
  if (connection == "connecting" || !!qr) { // your choice
     const code = await sock.requestPairingCode(Owner);
      // send the pairing code somewhere
   }
  })

    sock.ev.on("creds.update", saveCreds);

   sock.ev.on('messages.upsert', ({type, messages}) => {
  if (type == "notify") { // new messages
    for (const message of messages) {
      // messages is an array, do not just handle the first message, you will miss messages
    }
  } else { // old already seen / handled messages
    // handle them however you want to
  }
  })




} 
main();


