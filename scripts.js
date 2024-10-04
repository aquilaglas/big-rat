// Toggle the mobile menu
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Function to switch visible sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    // Hide all sections
    sections.forEach(section => {
        section.hidden = true;
    });

    // Show the selected section
    document.getElementById(sectionId).hidden = false;
    navLinks.classList.toggle('inactive');
}

// Add event listeners to menu links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const sectionId = event.target.getAttribute('data-section');
        showSection(sectionId);
    });
});
