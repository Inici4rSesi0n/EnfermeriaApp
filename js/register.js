import { authService } from './services/authService.js';
import { validators } from './utils/validators.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            dni: document.getElementById('dni').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        if (Object.values(data).some(validators.isEmpty)) {
            errorMessage.textContent = 'Todos los campos son obligatorios.';
            errorMessage.classList.add('active');
            return;
        }

        if (!validators.isValidDNI(data.dni)) {
            errorMessage.textContent = 'El DNI debe tener 8 dígitos.';
            errorMessage.classList.add('active');
            return;
        }

        if (!validators.isValidPhone(data.phone)) {
            errorMessage.textContent = 'El teléfono debe tener 9 dígitos.';
            errorMessage.classList.add('active');
            return;
        }

        if (!validators.isValidEmail(data.email)) {
            errorMessage.textContent = 'Ingresa un correo válido.';
            errorMessage.classList.add('active');
            return;
        }

        btnSubmit.textContent = 'Procesando...';
        btnSubmit.disabled = true;
        errorMessage.classList.remove('active');

        try {
            await authService.register(data);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = './login.html';
        } catch (error) {
            errorMessage.textContent = 'Error al registrar.';
            errorMessage.classList.add('active');
        } finally {
            btnSubmit.textContent = 'Registrarse';
            btnSubmit.disabled = false;
        }
    });
});
