import { authService } from './services/authService.js';
import { Sidebar } from './components/Sidebar.js';
import { Notifications } from './components/Notifications.js';
import { pacienteViews } from './views/pacienteViews.js';
import { licenciadoViews } from './views/licenciadoViews.js';
import { dataService } from './services/dataService.js';
import { CONFIG } from './config.js';

const initDashboard = (baseUser) => {
    const loadDashboard = () => {
        const user = authService.getCurrentUser();
        if (!user) {
            window.location.href = './login.html';
            return;
        }

        const allNotifs = dataService.getNotifications(user.dni);
        const unreadCount = allNotifs.filter(n => !n.read).length;
        user.notifications = allNotifs;
        user.unreadCount = unreadCount;

        document.body.innerHTML = `
            <div class="mobile-header">
                <div class="sidebar-brand" style="margin: 0;">SRP EXPRESS</div>
                <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
            </div>
            ${user.role === 'paciente' ? Notifications.render(user) : ''}
            <div class="sidebar-overlay" id="sidebarOverlay"></div>
            <div class="app-container">
                ${Sidebar.render(user)}
                <main class="main-content" id="mainContent"></main>
            </div>
        `;

        const mainContent = document.getElementById('mainContent');
        const navItems = document.querySelectorAll('.nav-item');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const mobileBtn = document.getElementById('mobileMenuBtn');

        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                sidebar.classList.add('open');
                overlay.classList.add('active');
            });
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        const loadView = (viewName) => {
            navItems.forEach(i => i.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
            if (activeNav) activeNav.classList.add('active');

            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }

            try {
                if (user.role === 'paciente') {
                    if (viewName === 'agendar') {
                        mainContent.innerHTML = pacienteViews.agendar(user);
                        initAgendarForm(user);
                    }
                    else if (viewName === 'sintomas') {
                        mainContent.innerHTML = pacienteViews.sintomas();
                        initDragAndDrop();
                    }
                    else if (viewName === 'esquema') mainContent.innerHTML = pacienteViews.esquema(user);
                    else if (viewName === 'campanas') mainContent.innerHTML = pacienteViews.campanas();
                    else if (viewName === 'guias') mainContent.innerHTML = pacienteViews.guias();
                } else {
                    if (viewName === 'agenda') {
                        mainContent.innerHTML = licenciadoViews.agenda();
                        initAgendaActions(user);
                    }
                    else if (viewName === 'registro') {
                        mainContent.innerHTML = licenciadoViews.registro();
                        initRegistroAtencion();
                    }
                    else if (viewName === 'historial') {
                        mainContent.innerHTML = licenciadoViews.historial();
                        initHistorialBusqueda();
                    }
                }
            } catch (error) {
                mainContent.innerHTML = `<div class="alert alert-error active">Error al cargar la vista: ${error.message}</div>`;
            }
        };

        navItems.forEach(item => {
            item.addEventListener('click', () => loadView(item.dataset.view));
        });

        document.getElementById('btnLogout').addEventListener('click', () => {
            authService.logout();
            window.location.href = './login.html';
        });

        document.getElementById('btnSwitchRole').addEventListener('click', () => {
            user.role = user.role === 'paciente' ? 'licenciado' : 'paciente';
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ dni: user.dni, name: user.name, role: user.role }));
            loadDashboard();
        });

        const defaultView = user.role === 'paciente' ? 'agendar' : 'agenda';
        loadView(defaultView);

        if (user.role === 'paciente') {
            const notifBtn = document.getElementById('notifBtn');
            const notifDropdown = document.getElementById('notifDropdown');
            const notifContainer = document.getElementById('notifContainer');

            if (notifBtn) {
                notifBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    notifDropdown.classList.toggle('active');
                    if (notifDropdown.classList.contains('active') && user.unreadCount > 0) {
                        dataService.markNotificationsAsRead(user.dni);
                        setTimeout(() => {
                            const badge = notifBtn.querySelector('.notif-badge');
                            if (badge) badge.remove();
                            document.querySelectorAll('.notif-item').forEach(el => el.style.cssText = '');
                        }, 2000);
                    }
                });

                document.addEventListener('click', (e) => {
                    if (!notifContainer.contains(e.target)) {
                        notifDropdown.classList.remove('active');
                    }
                });
            }
        }

        function initAgendarForm(currentUser) {
            const form = document.getElementById('formCita');
            if (!form) return;
            
            form.onsubmit = (e) => {
                e.preventDefault();
                const type = document.getElementById('tipoCita').value;
                const date = document.getElementById('fechaCita').value;
                const time = document.getElementById('horaCita').value;
                dataService.createAppointment({ dni: currentUser.dni, name: currentUser.name, type, date, time });
                loadView('agendar');
            };

            mainContent.addEventListener('click', (e) => {
                if (e.target.classList.contains('cancelar-btn')) {
                    if(confirm('¿Seguro que deseas cancelar esta cita?')) {
                        dataService.cancelAppointment(parseInt(e.target.dataset.id));
                        loadView('agendar');
                    }
                }
            });
        }

        function initAgendaActions(currentUser) {
            const tabla = document.getElementById('tablaAgenda');
            const modal = document.getElementById('modalReprogramar');
            if (!tabla || !modal) return;

            tabla.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-cancelar')) {
                    if(confirm('¿Cancelar esta cita permanentemente?')) {
                        dataService.cancelAppointment(parseInt(e.target.dataset.id));
                        loadView('agenda');
                    }
                }
                if (e.target.classList.contains('btn-reprogramar')) {
                    const id = e.target.dataset.id;
                    document.getElementById('repId').value = id;
                    modal.classList.add('active');
                }
            });

            document.getElementById('btnCancelRep').onclick = () => {
                modal.classList.remove('active');
            };

            document.getElementById('btnSaveRep').onclick = () => {
                const id = parseInt(document.getElementById('repId').value);
                const newDate = document.getElementById('repDate').value;
                const newTime = document.getElementById('repTime').value;
                if (newDate && newTime) {
                    dataService.updateAppointmentDate(id, newDate, newTime);
                    modal.classList.remove('active');
                    loadView('agenda');
                } else {
                    alert("Por favor complete la fecha y hora.");
                }
            };
        }

        function initDragAndDrop() {
            const chips = document.querySelectorAll('.symptom-chip');
            const dropZone = document.getElementById('dropZone');
            const resultDiv = document.getElementById('resultadoRiesgo');
            let droppedSymptoms = [];

            chips.forEach(chip => {
                chip.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', chip.dataset.symptom);
                });
            });

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                const symptom = e.dataTransfer.getData('text/plain');
                
                if (symptom && !droppedSymptoms.includes(symptom)) {
                    droppedSymptoms.push(symptom);
                    dropZone.innerHTML = droppedSymptoms.map(s => `<span class="symptom-chip" style="cursor: default;">${s}</span>`).join('');
                    evaluateRisk(droppedSymptoms);
                }
            });

            const evaluateRisk = (symptoms) => {
                resultDiv.classList.remove('hidden');
                if (symptoms.includes('Fiebre alta') && symptoms.includes('Salpullido')) {
                    resultDiv.className = 'risk-high';
                    resultDiv.innerHTML = `
                        <h3>⚠️ Riesgo Alto</h3>
                        <p>Los síntomas indican una alta probabilidad de Sarampión. Por favor, acuda inmediatamente a urgencias o agende una Prueba de Sarampión.</p>
                        <button class="btn btn-danger" style="margin-top: 1rem;" onclick="document.querySelector('[data-view=\\'agendar\\']').click()">Agendar Cita de Urgencia</button>
                    `;
                } else if (symptoms.length >= 2) {
                    resultDiv.className = 'risk-mid';
                    resultDiv.innerHTML = `
                        <h3>⚠️ Riesgo Moderado</h3>
                        <p>Presenta síntomas compatibles. Le recomendamos agendar una cita para evaluación médica preventiva.</p>
                        <button class="btn btn-primary" style="margin-top: 1rem;" onclick="document.querySelector('[data-view=\\'agendar\\']').click()">Agendar Cita</button>
                    `;
                } else {
                    resultDiv.className = 'risk-low';
                    resultDiv.innerHTML = `
                        <h3>✅ Riesgo Bajo</h3>
                        <p>Sus síntomas parecen leves. Manténgase hidratado y monitoree su temperatura.</p>
                    `;
                }
            };
        }

        function initRegistroAtencion() {
            const btn = document.getElementById('btnBuscarPaciente');
            const input = document.getElementById('inputDni');
            const res = document.getElementById('resultadoBusqueda');

            const renderPending = (dni) => {
                const citas = dataService.getAppointments(dni).filter(c => c.status === 'pendiente');
                
                if (citas.length === 0) {
                    res.innerHTML = `<div class="alert alert-success active">Atención registrada. No hay más citas pendientes para este DNI.</div>`;
                    input.value = '';
                    return;
                }

                res.innerHTML = citas.map(c => `
                    <div class="card" style="margin-bottom: 1rem; background: var(--bg-input);">
                        <h3>${c.name} - ${c.type}</h3>
                        <p>Programada para: ${c.date} a las ${c.time}</p>
                        <button class="btn btn-primary btn-atender" data-id="${c.id}" data-dni="${dni}" data-type="${c.type}" style="margin-top: 1rem;">Marcar como Atendida y Registrar</button>
                    </div>
                `).join('');
            };

            btn.addEventListener('click', () => {
                const dni = input.value.trim();
                if(dni) renderPending(dni);
            });

            res.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-atender')) {
                    const id = parseInt(e.target.dataset.id);
                    const dni = e.target.dataset.dni;
                    
                    dataService.attendAppointment(id);
                    renderPending(dni);
                }
            });
        }

        function initHistorialBusqueda() {
            const input = document.getElementById('inputBuscarHistorial');
            const tbody = document.getElementById('tablaHistorial');
            input.addEventListener('input', (e) => {
                tbody.innerHTML = licenciadoViews.renderHistorial(e.target.value);
            });
        }
    };

    loadDashboard();

    window.addEventListener('storage', (e) => {
        if (e.key === CONFIG.DATA_KEY) {
            const user = authService.getCurrentUser();
            if (user && user.role === 'paciente') {
                loadDashboard();
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const user = authService.getCurrentUser();
    if (!user) {
        window.location.href = './login.html';
        return;
    }
    initDashboard(user);
});
