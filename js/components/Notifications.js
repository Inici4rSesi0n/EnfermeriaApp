export const Notifications = {
    render(user) {
        const unread = user.unreadCount || 0;
        return `
            <div class="notif-container" id="notifContainer">
                <button class="notif-btn" id="notifBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    ${unread > 0 ? `<span class="notif-badge">${unread}</span>` : ''}
                </button>
                <div class="notif-dropdown" id="notifDropdown">
                    <div class="notif-header">Notificaciones</div>
                    <div class="notif-list" id="notifList">
                        ${user.notifications.length > 0 ? user.notifications.map(n => `
                            <div class="notif-item" style="${!n.read ? 'background: rgba(88, 0, 255, 0.05); font-weight: 600;' : ''}">
                                ${n.message}
                            </div>
                        `).join('') : '<div class="notif-item" style="text-align:center;">No tienes notificaciones.</div>'}
                    </div>
                </div>
            </div>
        `;
    }
};
