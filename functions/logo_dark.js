const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const clientId = event.queryStringParameters.client_id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: 'client_id fehlt'
    };
  }

  // Logge die Anfrage für das dunkle Logo
  console.log(`Dunkles Logo abgerufen für client_id: ${clientId}`);

  // Lade das dunkle Logo
  const logoPath = path.resolve(__dirname, 'logo_dark.png'); // Pfad zum dunklen Logo
  const logo = fs.readFileSync(logoPath);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png'
    },
    body: logo.toString('base64'),
    isBase64Encoded: true
  };
};
