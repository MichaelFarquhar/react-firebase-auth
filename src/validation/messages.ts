export const required = (input: string) => {
    return `${input} is required.`;
};

export const tooShort = (input: string) => {
    return `${input} is too short.`;
};

export const tooLong = (input: string) => {
    return `${input} is too long.`;
};
