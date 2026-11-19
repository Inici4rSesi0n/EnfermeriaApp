import { validators } from '../utils/validators.js';
import { authService } from '../services/authService.js';

export const LoginForm = {
    elements: {
        form: null,
        email: null,
        password: null,
        btnSubmit: null,
        errorMessage: null
    },

    init() {
        this.elements.form = document.getElementById('loginForm');
        this.elements.email = document.getElementById('email');
        this.elements.password = document.getElementById('password');
        this.elements.btnSubmit = document.getElementById('btnSubmit');
        this.elements.errorMessage = document.getElementById('errorMessage');

        this.elements.form.addEventListener('submit', this.handleSubmit.bind(this));
    },

    async handleSubmit(event) {
        event.preventDefault();
        
        const email = this.elements.email.value;
        const password = this.elements.password.value;

        if (validators.isEmpty(email) || validators.isEmpty(password)) {
            this.showError('Por favor, completa todos los campos.');
            return;
        }

        if (!validators.isValidEmail(email)) {
            this.showError('Por favor, ingresa un correo válido.');
            return;
        }

        this.setLoadingState(true);
        this.hideError();

        try {
            const response = await authService.login(email, password);
            console.log('Login exitoso:', response);
            alert(`¡Bienvenido ${response.user.name}! (Simulación de redirección)`);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoadingState(false);
        }
    },

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.classList.remove('hidden');
    },

    hideError() {
        this.elements.errorMessage.classList.add('hidden');
    },

    setLoadingState(isLoading) {
        if (isLoading) {
            this.elements.btnSubmit.textContent = 'Cargando...';
            this.elements.btnSubmit.disabled = true;
        } else {
            this.elements.btnSubmit.textContent = 'Iniciar Sesión';
            this.elements.btnSubmit.disabled = false;
        }
    }
};
