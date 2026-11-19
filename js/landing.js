document.addEventListener('DOMContentLoaded', () => {
    const logoTrigger = document.getElementById('logoTrigger');
    const statsModal = document.getElementById('statsModal');
    const closeModal = document.getElementById('closeModal');

    if(logoTrigger) logoTrigger.addEventListener('click', () => statsModal.classList.add('active'));
    if(closeModal) closeModal.addEventListener('click', () => statsModal.classList.remove('active'));
    if(statsModal) statsModal.addEventListener('click', (e) => {
        if (e.target === statsModal) statsModal.classList.remove('active');
    });
});
