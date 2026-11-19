export const welcomeView = {
    render(user) {
        return `
            <div class="dashboard-header" style="text-align: center; margin-bottom: 3rem; flex-direction: column; gap: 1rem;">
                <h1 style="color: var(--primary); font-size: 2.5rem;">¡Bienvenido/a, ${user.name}!</h1>
                <p style="font-size: 1.2rem; color: var(--text-muted);">Nos alegra tenerte en SRP Express. Tu salud y bienestar son nuestra prioridad.</p>
            </div>
            
            <div class="dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); text-align: center; margin-bottom: 2rem;">
                <div class="card" style="border-top: 4px solid var(--primary);">
                    <h3 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0;">25+</h3>
                    <p style="font-weight: 600;">Años de Experiencia</p>
                </div>
                <div class="card" style="border-top: 4px solid var(--primary);">
                    <h3 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0;">150+</h3>
                    <p style="font-weight: 600;">Médicos Especialistas</p>
                </div>
                <div class="card" style="border-top: 4px solid var(--primary);">
                    <h3 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0;">300+</h3>
                    <p style="font-weight: 600;">Licenciadas de Enfermería</p>
                </div>
                <div class="card" style="border-top: 4px solid var(--primary);">
                    <h3 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0;">10K+</h3>
                    <p style="font-weight: 600;">Pacientes Atendidos</p>
                </div>
            </div>

            <div class="card" style="padding: 2rem; display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; background: linear-gradient(135deg, rgba(88, 0, 255, 0.03) 0%, rgba(212, 137, 255, 0.05) 100%); border: 1px solid var(--border-glass);">
                <div style="flex: 1; min-width: 280px;">
                    <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 1rem;">Comprometidos con tu salud</h3>
                    <p style="color: var(--text-main); font-size: 1rem; line-height: 1.6; margin-bottom: 1rem;">
                        En SRP Express, contamos con la tecnología y el equipo humano más preparado para la vigilancia, prevención y control del sarampión en nuestra comunidad.
                    </p>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">
                        Navega por el menú lateral para acceder a todas nuestras funcionalidades diseñadas especialmente para ti. <strong>${user.role === 'paciente' ? 'Agenda tus citas y consulta tus resultados al instante.' : 'Gestiona las citas y el historial clínico de tus pacientes de forma rápida y segura.'}</strong>
                    </p>
                </div>
                <img src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=400&auto=format&fit=crop" alt="Equipo médico" style="width: 100%; max-width: 300px; height: 200px; object-fit: cover; border-radius: var(--border-radius); box-shadow: var(--shadow-md);">
            </div>
        `;
    }
};
