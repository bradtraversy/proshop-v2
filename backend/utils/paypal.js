import fetch from 'node-fetch';

const base = 'https://api-m.sandbox.paypal.com';

export const paypal = {
  createOrder: async function createOrder(price) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  },
  capturePayment: async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(response);
  },
};

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString(
    'base64'
  );
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
