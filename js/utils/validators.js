export const validators = {
    isValidEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    isEmpty: (value) => {
        return !value || value.trim() === '';
    }
};
