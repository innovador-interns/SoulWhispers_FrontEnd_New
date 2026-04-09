import axios from 'axios';

export const getChatResponse = async(message) => {
    try {
        const response = await axios.post(
            'https://chat.osquare.live/ask-zeeko-soulwhisper-advance/',
            message,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error('Error getting chat response:', error);
        throw error;
    }
}