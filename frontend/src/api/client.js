import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust if needed

export const api = {
    startSession: async () => {
        const response = await axios.post(`${API_URL}/session/start`);
        return response.data;
    },

    getSession: async (sessionId) => {
        const response = await axios.get(`${API_URL}/session/${sessionId}`);
        return response.data;
    },

    resetSession: async (sessionId) => {
        const response = await axios.post(`${API_URL}/session/${sessionId}/reset`);
        return response.data;
    },

    completeTask: async (sessionId, taskId) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/complete-task/${taskId}`);
        return response.data;
    },

    buyItem: async (sessionId, itemId) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/buy/${itemId}`);
        return response.data;
    },

    validateSQL: async (sessionId, query) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/sql/validate`, { query });
        return response.data;
    },

    completeSudoku: async (sessionId) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/sudoku/complete`);
        return response.data;
    },

    unlockVault: async (sessionId) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/vault/unlock`);
        return response.data;
    },

    trespass: async (sessionId, key) => {
        const response = await axios.post(`${API_URL}/game/${sessionId}/trespass`, { key });
        return response.data;
    }
};
