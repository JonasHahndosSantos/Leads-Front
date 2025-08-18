
export const corFonteText = (fonte: string | null) => {
    switch (fonte?.toLowerCase()) {
        case 'instagram':
            return 'text-purple-500 dark:text-purple-500';
        case 'facebook':
            return 'text-blue-500 dark:text-blue-500';
        case 'google':
            return 'text-green-500 dark:text-green-500 ';
        default:
            return 'text-transparent ';
    }
};