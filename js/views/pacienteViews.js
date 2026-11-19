import { dataService } from '../services/dataService.js';

export const pacienteViews = {
    agendar(user) {
        return `
            <div class="dashboard-header"><h1>Agendar Cita</h1></div>
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Nueva Cita</h3>
                    <form id="formCita">
                        <div class="form-group">
                            <label>Tipo de Cita</label>
                            <select id="tipoCita" required>
                                <option value="Vacunación">Vacunación</option>
                                <option value="Prueba de Sarampión">Prueba de Sarampión</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Fecha Disponible</label>
                            <input type="date" id="fechaCita" required min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Hora</label>
                            <select id="horaCita" required>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="15:00">03:00 PM</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Enviar Cita</button>
                    </form>
                </div>
                <div class="card" style="grid-column: span 2;">
                    <h3>Mis Citas</h3>
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Tipo</th><th>Fecha</th><th>Hora</th><th>Estado</th><th>Acción</th></tr></thead>
                            <tbody id="listaCitas">
                                ${this.renderCitas(user.dni)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },
    renderCitas(dni) {
        const citas = dataService.getAppointments(dni);
        if (citas.length === 0) return `<tr><td colspan="5" style="text-align:center;">No tienes citas registradas.</td></tr>`;
        return citas.map(c => `
            <tr>
                <td data-label="Tipo">${c.type}</td>
                <td data-label="Fecha">${c.date}</td>
                <td data-label="Hora">${c.time}</td>
                <td data-label="Estado"><span class="badge badge-${c.status === 'pendiente' ? 'pending' : c.status === 'atendida' ? 'success' : 'danger'}">${c.status}</span></td>
                <td data-label="Acción">${c.status === 'pendiente' ? `<button class="btn btn-danger cancelar-btn" data-id="${c.id}" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">Cancelar</button>` : '-'}</td>
            </tr>
        `).join('');
    },
    sintomas() {
        const sintomas = ['Fiebre alta', 'Salpullido', 'Tos seca', 'Ojos rojos', 'Congestión nasal'];
        return `
            <div class="dashboard-header"><h1>Autoevaluación de Síntomas</h1></div>
            <div class="card">
                <h3>Toca tus síntomas</h3>
                <p style="margin-bottom: 1rem;">Selecciona los síntomas que presentes para evaluar tu nivel de riesgo.</p>
                <div style="margin-bottom: 2rem;" class="available-symptoms">
                    ${sintomas.map(s => `<div class="symptom-chip" data-symptom="${s}">${s}</div>`).join('')}
                </div>
                <div class="drop-zone" id="dropZone">
                    <p style="color: var(--text-muted);">Los síntomas seleccionados aparecerán aquí</p>
                </div>
                <div id="resultadoRiesgo" class="hidden"></div>
            </div>
        `;
    },
    esquema(user) {
        const vacunasAplicadas = dataService.getVaccines(user.dni);
        return `
            <div class="dashboard-header"><h1>Esquema de Vacunación</h1></div>
            <div style="margin-bottom: 2rem;">
                <div class="dashboard-grid">
                    ${vacunasAplicadas.map(v => `
                        <div class="card" style="border-left: 4px solid var(--success);">
                            <h3 style="color: var(--text-main); font-size: 1.1rem;">${v.name}</h3>
                            <p style="margin-top: 0.5rem;"><strong>Dosis:</strong> ${v.dose}</p>
                            <p style="margin-top: 0.2rem;"><strong>Fecha:</strong> ${v.date}</p>
                            <span class="badge badge-success" style="margin-top: 1rem; display: inline-block;">Aplicada ✅</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    campanas() {
        return `
            <div class="dashboard-header"><h1>Campañas de Salud</h1></div>
            <div class="dashboard-grid">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop" alt="Centro de Salud" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <h3>Jornada de Vacunación</h3>
                    <p><strong>Lugar:</strong> Centro de Salud San Román</p>
                    <p><strong>Fecha:</strong> 25 de Noviembre, 2026</p>
                    <p><strong>Requisitos:</strong> DNI, uso de mascarilla.</p>
                </div>
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" alt="Plaza de Armas" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <h3>Punto Móvil de Pruebas</h3>
                    <p><strong>Lugar:</strong> Plaza de Armas</p>
                    <p><strong>Fecha:</strong> 28 de Noviembre, 2026</p>
                    <p><strong>Requisitos:</strong> Ser mayor de edad, presentar síntomas.</p>
                </div>
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" alt="Campaña Médica" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <h3>Campaña de Concientización</h3>
                    <p><strong>Lugar:</strong> Colegio San Román</p>
                    <p><strong>Fecha:</strong> 05 de Diciembre, 2026</p>
                    <p><strong>Requisitos:</strong> Dirigido a padres de familia.</p>
                </div>
            </div>
        `;
    },
    guias() {
        return `
            <div class="dashboard-header"><h1>Guías de Prevención</h1></div>
            <div class="dashboard-grid" style="grid-template-columns: 1fr;">
                <div class="card" style="display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
                    <img src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=200&auto=format&fit=crop" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
                    <div style="flex: 1; min-width: 200px;">
                        <h3>¿Cómo prevenir el contagio?</h3>
                        <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-muted);">
                            <li>Lávate las manos frecuentemente con agua y jabón.</li>
                            <li>Usa mascarilla en lugares cerrados o concurridos.</li>
                            <li>Evita el contacto cercano con personas enfermas.</li>
                            <li>Asegúrate de tener tus vacunas Triple Viral al día.</li>
                        </ul>
                    </div>
                </div>
                <div class="card" style="display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
                    <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=200&auto=format&fit=crop" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
                    <div style="flex: 1; min-width: 200px;">
                        <h3>Contacto con un caso de Sarampión</h3>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">El sarampión es altamente contagioso. Si estuviste cerca de alguien infectado:</p>
                        <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-muted);">
                            <li>Aíslate preventivamente por 21 días.</li>
                            <li>Monitorea tu temperatura dos veces al día.</li>
                            <li>Si presentas fiebre o sarpullido, agenda una prueba inmediata.</li>
                        </ul>
                    </div>
                </div>
                <div class="card" style="display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
                    <img src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=200&auto=format&fit=crop" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
                    <div style="flex: 1; min-width: 200px;">
                        <h3>Cuidados en casa</h3>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">Si tienes síntomas leves o estás en recuperación:</p>
                        <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: var(--text-muted);">
                            <li>Mantén reposo absoluto y buena ventilación.</li>
                            <li>Hidrátate constantemente.</li>
                            <li>Usa paños fríos para bajar la fiebre (no automedicar).</li>
                            <li>Usa una habitación separada para evitar contagiar a tu familia.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
};
