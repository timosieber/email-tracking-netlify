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

  // Logge die Anfrage für das helle Logo
  console.log(`Helles Logo abgerufen für client_id: ${clientId}`);

  // Lade das helle Logo
  const logoPath = path.resolve(__dirname, 'logo_light.png'); // Pfad zum hellen Logo
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
