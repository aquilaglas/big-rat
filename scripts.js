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

function fetchAndDisplayDogImage() {
    const apiUrl = 'https://fat-rat.vercel.app/';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imgElement = document.getElementById('dogImage');
            if (!imgElement) {
                const newImgElement = document.createElement('p');
                newImgElement.id = 'texte';
                newImgElement.textContent = data.message;

                document.getElementById('home').appendChild(newImgElement);
            } else {
                imgElement.src = data.message;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'image:', error);
        });
}

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 10000);
    });
}

fetchAndDisplayDogImage();
