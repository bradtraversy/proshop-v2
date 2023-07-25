async function getPayPalAccessToken() {
  const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';

  const base64Autorization = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString();

  const headers = {
    Accept: 'application/json',
    'Accept-Language': 'en_US',
    Authorization: 'Basic ' + base64Autorization,
  };

  const data = 'grant_type=client_credentials';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }
    const json = await response.json();
    console.log(json);

    return json.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default getPayPalAccessToken;
