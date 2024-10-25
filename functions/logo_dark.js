const fs = require('fs');
const path = require('path');
const axios = require('axios');  // Stellt sicher, dass axios installiert ist

exports.handler = async (event) => {
  const clientId = event.queryStringParameters.client_id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: 'client_id fehlt'
    };
  }

  // Google Analytics Measurement ID und API Secret
  const measurementId = 'G-EVX82XD4NH';  // Deine Measurement ID
  const apiSecret = 'FVa3v2tYRWei_RLhQLFAmw';  // Dein API-Geheimnis

  // URL für Google Analytics
  const gaUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  // Daten für das Google Analytics-Event
  const gaData = {
    client_id: clientId,
    events: [
      {
        name: 'email_open',
        params: {
          engagement: 'open'
        }
      }
    ]
  };

  // Anfrage an Google Analytics senden
  try {
    await axios.post(gaUrl, gaData);
    console.log(`Erfolgreich an Google Analytics gesendet für client_id: ${clientId}`);
  } catch (error) {
    console.error(`Fehler beim Senden an Google Analytics: ${error}`);
  }

  // Pfad und Inhalt des dunklen Logos
  const logoPath = path.resolve(__dirname, 'logo_dark.png');
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
