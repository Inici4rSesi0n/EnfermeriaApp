import { authService } from './services/authService.js';
import { validators } from './utils/validators.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const dni = document.getElementById('dni').value;
        const password = document.getElementById('password').value;

        if (validators.isEmpty(dni) || validators.isEmpty(password)) {
            errorMessage.textContent = 'Por favor, completa todos los campos.';
            errorMessage.classList.add('active');
            return;
        }

        if (!validators.isValidDNI(dni)) {
            errorMessage.textContent = 'El DNI debe tener 8 dígitos.';
            errorMessage.classList.add('active');
            return;
        }

        btnSubmit.textContent = 'Cargando...';
        btnSubmit.disabled = true;
        errorMessage.classList.remove('active');

        try {
            await authService.login(dni, password);
            window.location.href = './dashboard.html';
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.classList.add('active');
        } finally {
            btnSubmit.textContent = 'Entrar al Sistema';
            btnSubmit.disabled = false;
        }
    });
});
