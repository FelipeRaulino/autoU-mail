'use server';

export async function getEmailHistory() {
  const baseUrl = process.env.BASE_URL;
  const url = baseUrl + '/v1/history';

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Error on getting email classification');
  }

  const data = await response.json();
  return data;
}
