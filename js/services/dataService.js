import { CONFIG } from '../config.js';

const getInitialData = () => ({
    citas: [
        { id: 1, dni: '12345678', name: 'Paciente Demo', type: 'Vacunación', date: '2026-11-20', time: '09:00', status: 'pendiente' },
        { id: 2, dni: '12345678', name: 'Paciente Demo', type: 'Prueba de Sarampión', date: '2026-11-15', time: '10:30', status: 'atendida' }
    ],
    vacunas: [
        { id: 1, dni: '12345678', name: 'BCG', dose: '1ra Dosis (Al nacer)', date: '2000-01-01', status: 'aplicada' },
        { id: 2, dni: '12345678', name: 'Hepatitis B', dose: '1ra Dosis (Al nacer)', date: '2000-01-01', status: 'aplicada' },
        { id: 3, dni: '12345678', name: 'Triple Viral', dose: '1ra Dosis (12 meses)', date: '2001-01-01', status: 'aplicada' },
        { id: 4, dni: '12345678', name: 'Triple Viral', dose: '2da Dosis (18 meses)', date: '2001-07-01', status: 'aplicada' },
        { id: 5, dni: '12345678', name: 'Refuerzo Sarampión', dose: 'Refuerzo (4 años)', date: '2004-01-01', status: 'aplicada' }
    ],
    notificaciones: []
});

const getData = () => {
    let data = null;
    try {
        const raw = localStorage.getItem(CONFIG.DATA_KEY);
        if (raw) data = JSON.parse(raw);
    } catch (e) {
        data = null;
    }
    
    if (!data || !Array.isArray(data.citas) || !Array.isArray(data.vacunas) || !Array.isArray(data.notificaciones)) {
        data = getInitialData();
        localStorage.setItem(CONFIG.DATA_KEY, JSON.stringify(data));
    }
    return data;
};

const saveData = (data) => localStorage.setItem(CONFIG.DATA_KEY, JSON.stringify(data));

export const dataService = {
    getAppointments(dni = null) {
        const data = getData();
        return dni ? data.citas.filter(c => c.dni === dni) : data.citas;
    },
    createAppointment(cita) {
        const data = getData();
        cita.id = Date.now();
        cita.status = 'pendiente';
        data.citas.push(cita);
        saveData(data);
    },
    cancelAppointment(id) {
        const data = getData();
        const cita = data.citas.find(c => c.id === id);
        if (cita) {
            cita.status = 'cancelada';
            data.notificaciones.push({ 
                id: Date.now(), 
                dni: cita.dni, 
                message: `Su cita de ${cita.type} para el ${cita.date} fue cancelada.`, 
                read: false 
            });
            saveData(data);
        }
    },
    updateAppointmentDate(id, newDate, newTime) {
        const data = getData();
        const cita = data.citas.find(c => c.id === id);
        if (cita) {
            cita.date = newDate;
            cita.time = newTime;
            data.notificaciones.push({ 
                id: Date.now(), 
                dni: cita.dni, 
                message: `Su cita de ${cita.type} fue reprogramada para el ${newDate} a las ${newTime}.`, 
                read: false 
            });
            saveData(data);
        }
    },
    attendAppointment(id) {
        const data = getData();
        const cita = data.citas.find(c => c.id === id);
        if (cita) {
            cita.status = 'atendida';
            if (cita.type === 'Vacunación') {
                data.vacunas.push({ 
                    id: Date.now(), 
                    dni: cita.dni, 
                    name: 'Triple Viral', 
                    dose: 'Dosis Adicional', 
                    date: new Date().toISOString().split('T')[0], 
                    status: 'aplicada' 
                });
                data.notificaciones.push({ 
                    id: Date.now(), 
                    dni: cita.dni, 
                    message: `¡Su vacunación contra el Sarampión ha sido validada exitosamente!`, 
                    read: false 
                });
            }
            saveData(data);
        }
    },
    getVaccines(dni) {
        const data = getData();
        let vacunas = data.vacunas.filter(v => v.dni === dni);
        if (vacunas.length === 0 && dni !== '12345678') {
            const base = [
                { id: Date.now()+1, dni, name: 'BCG', dose: '1ra Dosis (Al nacer)', date: 'Nacimiento', status: 'aplicada' },
                { id: Date.now()+2, dni, name: 'Hepatitis B', dose: '1ra Dosis (Al nacer)', date: 'Nacimiento', status: 'aplicada' },
                { id: Date.now()+3, dni, name: 'Triple Viral', dose: '1ra Dosis (12 meses)', date: '12 meses', status: 'aplicada' },
                { id: Date.now()+4, dni, name: 'Triple Viral', dose: '2da Dosis (18 meses)', date: '18 meses', status: 'aplicada' },
                { id: Date.now()+5, dni, name: 'Refuerzo Sarampión', dose: 'Refuerzo (4 años)', date: '4 años', status: 'aplicada' }
            ];
            data.vacunas.push(...base);
            saveData(data);
            return base;
        }
        return vacunas;
    },
    getNotifications(dni) {
        return getData().notificaciones.filter(n => n.dni === dni);
    },
    markNotificationsAsRead(dni) {
        const data = getData();
        let changed = false;
        data.notificaciones.forEach(n => { 
            if (n.dni === dni && !n.read) {
                n.read = true; 
                changed = true;
            }
        });
        if (changed) saveData(data);
    }
};
