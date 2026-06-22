const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = '<img id="lightbox-img"><span id="lightbox-close">✕</span>';
document.body.appendChild(lightbox);

function initLightbox() {
    document.querySelectorAll('.image-row img').forEach(img => {
        if (img.dataset.lightbox) return; // voorkom dubbele listeners
        img.dataset.lightbox = 'true';
        img.addEventListener('click', () => {
            document.getElementById('lightbox-img').src = img.src;
            lightbox.classList.add('active');
        });
    });
}

document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(initLightbox, 50);
    });
});

document.querySelectorAll('.sub-tab-link').forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(initLightbox, 50);
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

initLightbox();