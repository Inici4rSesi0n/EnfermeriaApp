import { CONFIG } from '../config.js';

export const authService = {
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'paciente@test.com' && password === '123456') {
                    resolve({ 
                        success: true, 
                        token: 'fake-jwt-token-12345',
                        user: { name: 'Paciente de Prueba' }
                    });
                } else {
                    reject(new Error('Correo o contraseña incorrectos.'));
                }
            }, CONFIG.MOCK_DELAY);
        });
    }
};
