'use server';

export async function getEmailClassification(text: string, file?: File) {
  const baseUrl = process.env.BASE_URL;
  const url = baseUrl + '/v1/classify';

  try {
    const formData = new FormData();

    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error on getting email classification');
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}
