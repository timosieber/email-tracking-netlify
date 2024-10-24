const axios = require('axios');
const path = require('path');
const fs = require('fs');

exports.handler = async (event, context) => {
  const clientId = event.queryStringParameters.client_id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: 'client_id fehlt'
    };
  }

  // URL für Google Analytics (mit deiner Measurement-ID und API-Schlüssel)
  const postUrl = `https://www.google-analytics.com/mp/collect?measurement_id=G-EVX82XD4NH&api_secret=FVa3v2tYRWei_RLhQLFAmw`;

  const postData = {
    "client_id": clientId,
    "events": [
      {
        "name": "email_open",
        "params": {
          "engagement": "open"
        }
      }
    ]
  };

  try {
    // Anfrage an Google Analytics senden
    const response = await axios.post(postUrl, postData);
    console.log("Google Analytics Response: ", response.data);

    // Tracking erfolgreich -> Sende das transparente Pixel-Bild zurück
    const pixelPath = path.join(__dirname, 'transparent_pixel.png');
    const pixelBuffer = fs.readFileSync(pixelPath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png'
      },
      body: pixelBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Fehler beim Tracking:', error.message);  // Detaillierte Fehlermeldung ausgeben
    console.error('Fehler Stacktrace:', error.stack);        // Stacktrace für mehr Details
    return {
      statusCode: 500,
      body: 'Fehler beim Tracking: ' + error.message
    };
  }
};
