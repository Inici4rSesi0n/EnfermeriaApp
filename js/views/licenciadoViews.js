import { dataService } from '../services/dataService.js';

export const licenciadoViews = {
    agenda() {
        return `
            <div class="dashboard-header"><h1>Agenda del Día</h1></div>
            <div class="card">
                <h3>Lista de Citas</h3>
                <div class="table-container">
                    <table>
                        <thead><tr><th>Paciente</th><th>DNI</th><th>Tipo</th><th>Fecha/Hora</th><th>Estado</th><th>Acciones</th></tr></thead>
                        <tbody id="tablaAgenda">
                            ${this.renderAgenda()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-overlay" id="modalReprogramar">
                <div class="login-form-container" style="max-width: 400px; padding: 2rem;">
                    <h3 style="margin-bottom: 1.5rem; color: var(--primary);">Reprogramar Cita</h3>
                    <input type="hidden" id="repId">
                    <div class="form-group">
                        <label>Nueva Fecha</label>
                        <input type="date" id="repDate" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Nueva Hora</label>
                        <select id="repTime" required>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="15:00">03:00 PM</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button class="btn btn-outline btn-full" id="btnCancelRep">Cancelar</button>
                        <button class="btn btn-primary btn-full" id="btnSaveRep">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    },
    renderAgenda() {
        const citas = dataService.getAppointments();
        return citas.map(c => `
            <tr>
                <td>${c.name}</td>
                <td>${c.dni}</td>
                <td>${c.type}</td>
                <td>${c.date} - ${c.time}</td>
                <td><span class="badge badge-${c.status === 'pendiente' ? 'pending' : c.status === 'atendida' ? 'success' : 'danger'}">${c.status}</span></td>
                <td>
                    ${c.status === 'pendiente' ? `
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-outline btn-reprogramar" data-id="${c.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Reprogramar</button>
                            <button class="btn btn-danger btn-cancelar" data-id="${c.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Cancelar</button>
                        </div>
                    ` : '-'}
                </td>
            </tr>
        `).join('');
    },
    registro() {
        return `
            <div class="dashboard-header"><h1>Registro de Atención</h1></div>
            <div class="card">
                <h3>Validar Cita</h3>
                <div class="form-group">
                    <input type="text" id="inputDni" placeholder="Ingresa DNI del paciente" maxlength="8">
                </div>
                <button class="btn btn-primary" id="btnBuscarPaciente">Buscar Cita Pendiente</button>
                <div id="resultadoBusqueda" style="margin-top: 2rem;"></div>
            </div>
        `;
    },
    historial() {
        return `
            <div class="dashboard-header"><h1>Historial de Atenciones</h1></div>
            <div class="card">
                <div class="form-group">
                    <input type="text" id="inputBuscarHistorial" placeholder="Buscar por DNI o Nombre...">
                </div>
                <div class="table-container">
                    <table>
                        <thead><tr><th>Paciente</th><th>DNI</th><th>Procedimiento</th><th>Fecha</th></tr></thead>
                        <tbody id="tablaHistorial">
                            ${this.renderHistorial()}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    renderHistorial(filtro = '') {
        const citas = dataService.getAppointments().filter(c => c.status === 'atendida' && (c.name.toLowerCase().includes(filtro.toLowerCase()) || c.dni.includes(filtro)));
        if (citas.length === 0) return `<tr><td colspan="4" style="text-align:center;">No hay registros.</td></tr>`;
        return citas.map(c => `
            <tr>
                <td>${c.name}</td>
                <td>${c.dni}</td>
                <td>${c.type}</td>
                <td>${c.date}</td>
            </tr>
        `).join('');
    }
};
