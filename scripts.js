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

// Fonction pour récupérer une image de chien aléatoire depuis l'API et l'afficher
function fetchAndDisplayDogImage() {
    // URL de l'API
    const apiUrl = 'https://dog.ceo/api/breeds/image/random';

    // Utilisation de fetch pour récupérer les données de l'API
    fetch(apiUrl)
        .then(response => response.json())  // Convertir la réponse en JSON
        .then(data => {
            // Créer ou sélectionner l'élément image
            const imgElement = document.getElementById('dogImage');
            if (!imgElement) {
                // Si l'image n'existe pas encore, la créer
                const newImgElement = document.createElement('img');
                newImgElement.id = 'dogImage';  // Donner un id à l'image
                newImgElement.src = data.message;  // Récupérer l'URL de l'image dans la réponse API
                newImgElement.alt = 'Image aléatoire de chien';
                newImgElement.style.width = '300px';  // Optionnel: régler la taille de l'image

                // Ajouter l'image à la section Accueil (ou un autre conteneur)
                document.getElementById('home').appendChild(newImgElement);
            } else {
                // Si l'image existe déjà, mettre à jour la source
                imgElement.src = data.message;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'image:', error);
        });
}

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 10000); // Convertir les secondes en millisecondes
    });
}

// Appeler la fonction quand vous accédez à la section Accueil
fetchAndDisplayDogImage();
wait(10).then(() => {
    console.log("10 secondes se sont écoulées !");
});
fetchAndDisplayDogImage();
