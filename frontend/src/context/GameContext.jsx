import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load session from local storage on mount
    useEffect(() => {
        const storedSessionId = localStorage.getItem('birthday_quest_session');
        if (storedSessionId) {
            refreshSession(storedSessionId);
        }
    }, []);

    const refreshSession = async (sessionId) => {
        try {
            setLoading(true);
            const data = await api.getSession(sessionId);
            setSession(data);
        } catch (err) {
            console.error("Failed to restore session", err);
            // If 404, maybe clear local storage?
            if (err.response && err.response.status === 404) {
                localStorage.removeItem('birthday_quest_session');
                setSession(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const startGame = async () => {
        try {
            setLoading(true);
            const newSession = await api.startSession();
            setSession(newSession);
            localStorage.setItem('birthday_quest_session', newSession.session_id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const completeTask = async (taskId) => {
        if (!session) return;
        try {
            await api.completeTask(session.session_id, taskId);
            // Optimistic update or refetch? Refetch relies on backend logic.
            await refreshSession(session.session_id);
        } catch (err) {
            console.error("Task failed", err);
        }
    };

    const buyItem = async (itemId) => {
        if (!session) return;
        try {
            await api.buyItem(session.session_id, itemId);
            await refreshSession(session.session_id);
        } catch (err) {
            console.error("Purchase failed", err);
            throw err; // Let component handle UI feedback
        }
    };

    const validateSQL = async (query) => {
        if (!session) return;
        try {
            const res = await api.validateSQL(session.session_id, query);
            if (res.success) {
                await refreshSession(session.session_id);
                return true;
            }
            return false;
        } catch (err) {
            console.error("SQL failed", err);
            return false;
        }
    }

    const completeSudoku = async () => {
        if (!session) return;
        try {
            const res = await api.completeSudoku(session.session_id);
            await refreshSession(session.session_id);
            return res;
        } catch (err) {
            console.error("Sudoku failed", err);
        }
    }

    const unlockVault = async () => {
        if (!session) return;
        try {
            await api.unlockVault(session.session_id);
            await refreshSession(session.session_id);
        } catch (err) {
            console.error("Vault failed", err);
            throw err;
        }
    }

    const resetGame = async () => {
        if (!session) return;
        await api.resetSession(session.session_id);
        await refreshSession(session.session_id);
    }

    return (
        <GameContext.Provider value={{
            session,
            loading,
            error,
            startGame,
            completeTask,
            buyItem,
            validateSQL,
            completeSudoku,
            unlockVault,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};
