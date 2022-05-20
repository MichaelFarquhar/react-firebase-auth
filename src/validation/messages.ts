export const required = (input: string) => {
    return `${input} is required.`;
};

export const tooShort = (input: string) => {
    return `${input} is too short.`;
};

export const tooLong = (input: string) => {
    return `${input} is too long.`;
};

export const badEmail = () => {
    return `Please enter a valid email.`;
};
export const noSpaces = (input: string) => {
    return `${input} cannot contain spaces.`;
};
