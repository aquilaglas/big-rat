const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.hidden = true;
    });

    document.getElementById(sectionId).hidden = false;
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const sectionId = event.target.getAttribute('data-section');
        showSection(sectionId);
    });
});
