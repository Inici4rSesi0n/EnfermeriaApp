export const Sidebar = {
    render(user) {
        const menu = user.role === 'paciente' ? this.pacienteMenu() : this.licenciadoMenu();
        return `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-brand" id="sidebarBrand" style="cursor: pointer;">SRP EXPRESS</div>
                <div class="role-switcher">
                    <p>Rol Actual</p>
                    <span class="role-badge" style="margin-bottom: 0.5rem; display: block;">${user.role === 'paciente' ? 'Paciente' : 'Licenciado'}</span>
                    <button class="btn btn-outline" id="btnSwitchRole" style="padding: 0.4rem; font-size: 0.8rem; width: 100%;">Cambiar Rol</button>
                </div>
                <div class="nav-section">
                    ${menu}
                </div>
                <button class="btn btn-outline btn-full" id="btnLogout" style="margin-top: auto;">Cerrar Sesión</button>
            </aside>
        `;
    },
    pacienteMenu() {
        return `
            <p class="nav-section-title">Mi Salud</p>
            <div class="nav-item" data-view="agendar">📅 Agendar Cita</div>
            <div class="nav-item" data-view="sintomas">🩺 Consultar Síntomas</div>
            <p class="nav-section-title" style="margin-top: 1rem;">Prevención</p>
            <div class="nav-item" data-view="esquema">💉 Esquema de Vacunación</div>
            <div class="nav-item" data-view="campanas">📍 Campañas de Salud</div>
            <div class="nav-item" data-view="guias">📖 Guías de Prevención</div>
        `;
    },
    licenciadoMenu() {
        return `
            <p class="nav-section-title">Atención de Citas</p>
            <div class="nav-item" data-view="agenda">📋 Agenda del Día</div>
            <div class="nav-item" data-view="registro">✅ Registro de Atención</div>
            <p class="nav-section-title" style="margin-top: 1rem;">Seguimientos</p>
            <div class="nav-item" data-view="historial">🗂️ Historial de Atenciones</div>
        `;
    }
};
