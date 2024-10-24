const axios = require('axios');

exports.handler = async (event, context) => {
  const clientId = event.queryStringParameters.client_id;

  if (!clientId) {
    return {
      statusCode: 400,
      body: 'client_id fehlt'
    };
  }

  // Google Analytics URL für das Tracking Event
  const postUrl = `https://www.google-analytics.com/mp/collect?measurement_id=G-EVX82XD4NH&api_secret=FVa3v2tYRWei_RLhQLFAmw`;

  const postData = {
    "client_id": clientId,
    "events": [
      {
        "name": "email_open",
        "params": {
          "client_id": clientId, // Die Referenznummer wird als client_id an GA gesendet
          "engagement": "open"
        }
      }
    ]
  };

  try {
    // Anfrage an Google Analytics senden
    await axios.post(postUrl, postData);

    // Webhook URL zu deinem Google Apps Script (für die Status-Aktualisierung)
    const webhookUrl = `https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec?client_id=${clientId}`;

    // Webhook ausführen, um den Status im Sheet zu aktualisieren
    await axios.get(webhookUrl);

    // Base64-String für das transparente 1x1 Bild (PNG)
    const transparentPixelBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAp8xXAAA'
                                 + 'AAAASUVORK5CYII=';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png'
      },
      body: transparentPixelBase64,
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Fehler beim Tracking:', error.message);
    return {
      statusCode: 500,
      body: 'Fehler beim Tracking: ' + error.message
    };
  }
};
