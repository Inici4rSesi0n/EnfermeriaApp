export const Notifications = {
    render(user) {
        const unread = user.unreadCount || 0;
        return `
            <div class="notif-container" id="notifContainer">
                <button class="notif-btn" id="notifBtn">
                    <span style="font-size: 1.5rem;">🔔</span>
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
