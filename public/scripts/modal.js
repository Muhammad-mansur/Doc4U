document.addEventListener('DOMContentLoaded', () => {
    const appointmentModal = document.getElementById('appointmentModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = appointmentModal.querySelector('.close');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            appointmentModal.style.display = 'block';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            appointmentModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === appointmentModal) {
            appointmentModal.style.display = 'none';
        }
    });
});
