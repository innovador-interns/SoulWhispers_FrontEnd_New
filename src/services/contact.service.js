import axios from 'axios';

export const sendContactMessage = async (messageData) => {
  try {
    const response = await axios.post(
      'https://qa.api.soulwhispers.live/contacts',
      messageData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};