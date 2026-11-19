import { CONFIG } from '../config.js';

const getUsers = () => {
    let users = localStorage.getItem('srp_users');
    if (!users) {
        users = [
            { dni: '12345678', name: 'Paciente Demo', password: '123456', role: 'paciente' },
            { dni: '87654321', name: 'Licenciada Demo', password: '123456', role: 'licenciado' }
        ];
        localStorage.setItem('srp_users', JSON.stringify(users));
    } else {
        users = JSON.parse(users);
    }
    return users;
};

export const authService = {
    async login(dni, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getUsers();
                const user = users.find(u => u.dni === dni && u.password === password);
                
                if (user) {
                    const sessionUser = { dni: user.dni, name: user.name, role: user.role };
                    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(sessionUser));
                    resolve(sessionUser);
                } else {
                    reject(new Error('DNI o contraseña incorrectos.'));
                }
            }, CONFIG.MOCK_DELAY);
        });
    },
    logout() {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
    },
    getCurrentUser() {
        const userStr = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (!userStr) return null;
        try {
            const user = JSON.parse(userStr);
            if (!user.dni || !user.role) return null;
            return user;
        } catch (e) {
            return null;
        }
    },
    async register(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getUsers();
                if (users.find(u => u.dni === data.dni)) {
                    reject(new Error('El DNI ya está registrado.'));
                    return;
                }
                users.push({
                    dni: data.dni,
                    name: data.name,
                    password: data.password,
                    role: 'paciente'
                });
                localStorage.setItem('srp_users', JSON.stringify(users));
                resolve({ success: true });
            }, CONFIG.MOCK_DELAY);
        });
    }
};
