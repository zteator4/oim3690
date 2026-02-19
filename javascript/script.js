document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('expandDev');
    const content = document.getElementById('devContent');
    const icon = toggle.querySelector('.icon');

    toggle.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
        
        if (isOpen) {
            content.style.maxHeight = '0px';
            icon.textContent = '+';
            toggle.style.background = 'white';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '-';
            toggle.style.background = '#f9f9f9';
        }
    });
});