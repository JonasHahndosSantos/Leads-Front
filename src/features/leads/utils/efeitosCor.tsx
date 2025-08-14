export const corFonteBg = (fonte: string | null) => {
    switch (fonte?.toLowerCase()) {
        case 'instagram':
            return 'bg-purple-100';
        case 'facebook':
            return 'bg-blue-100';
        case 'google':
            return 'bg-green-100 ';
        default:
            return 'bg-transparent ';
    }
};

export const corFonteText = (fonte: string | null) => {
    switch (fonte?.toLowerCase()) {
        case 'instagram':
            return 'text-purple-500';
        case 'facebook':
            return 'text-blue-500';
        case 'google':
            return 'text-green-500 ';
        default:
            return 'text-transparent ';
    }
};