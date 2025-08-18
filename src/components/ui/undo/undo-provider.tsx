'use client';
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type UndoableAction = () => Promise<any>;

interface UndoContextType {
    registerUndoAction: (action: UndoableAction) => void;
    executeUndo: () => void;
    canUndo: boolean;
    isToastVisible: boolean;
}

const UndoContext = createContext<UndoContextType | undefined>(undefined);

export const UndoProvider = ({ children }: { children: ReactNode }) => {
    const [undoAction, setUndoAction] = useState<UndoableAction | null>(null);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const dismissToast = useCallback(() => {
        setIsToastVisible(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }, [timeoutId]);

    const registerUndoAction = useCallback((action: UndoableAction) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setUndoAction(() => action);
        setIsToastVisible(true);

        const newTimeoutId = setTimeout(dismissToast, 5000);
        setTimeoutId(newTimeoutId);
    }, [dismissToast, timeoutId]);

    const executeUndo = async () => {
        if (undoAction) {
            await undoAction();
            setUndoAction(null);
            setIsToastVisible(false);
        }
    };

    return (
        <UndoContext.Provider value={{
            registerUndoAction,
            executeUndo,
            canUndo: !!undoAction,
            isToastVisible
        }}>
            {children}
        </UndoContext.Provider>
    );
};

export const useUndo = () => {
    const context = useContext(UndoContext);
    if (!context) {
        throw new Error('useUndo must be used within an UndoProvider');
    }
    return context;
};
