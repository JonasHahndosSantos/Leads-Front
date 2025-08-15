'use client'
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type UndoableAction = () => Promise<any>;

interface UndoContextType {
    isVisible: boolean;
    showUndo: (action: UndoableAction) => void;
    hideUndo: () => void;
    executeUndo: () => void;
}

const UndoContext = createContext<UndoContextType | undefined>(undefined);

export const UndoProvider = ({ children }: { children: ReactNode }) => {
    const [undoAction, setUndoAction] = useState<UndoableAction | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const hideUndo = useCallback(() => {
        setIsVisible(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setUndoAction(null);
    }, [timeoutId]);

    const showUndo = useCallback((action: UndoableAction) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setUndoAction(() => action);
        setIsVisible(true);

        const newTimeoutId = setTimeout(hideUndo, 7000);
        setTimeoutId(newTimeoutId);
    }, [hideUndo, timeoutId]);

    const executeUndo = async () => {
        if (undoAction) {
            await undoAction();
            hideUndo();
        }
    };

    return (
        <UndoContext.Provider value={{ isVisible, showUndo, hideUndo, executeUndo }}>
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