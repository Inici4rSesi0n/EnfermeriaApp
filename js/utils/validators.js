export const validators = {
    isValidDNI: (dni) => /^\d{8}$/.test(dni),
    isValidPhone: (phone) => /^\d{9}$/.test(phone),
    isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isEmpty: (value) => !value || value.trim() === ''
};
