const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const userIcon = document.getElementById("user-icon");
const closeButtons = document.querySelectorAll(".close");
const registerBtn = document.getElementById("openRegisterModal");
const loginSubmit = document.getElementById("loginSubmit");
const registerSubmit = document.getElementById("registerSubmit");

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

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 10000);
    });
}

userIcon.addEventListener("click", () => {
    loginModal.style.display = "block";
});

registerBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    });
});

window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    } else if (event.target === registerModal) {
        registerModal.style.display = "none";
    }
});

loginSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    fetch('https://fat-rat.vercel.app/user/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Connexion réussie!');
                loginModal.style.display = 'none';
            } else {
                alert('Erreur de connexion: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});

registerSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const regUsername = document.getElementById("reg-username").value;
    const regEmail = document.getElementById("reg-email").value;
    const regPassword = document.getElementById("reg-password").value;

    const registerData = {
        username: regUsername,
        email: regEmail,
        password: regPassword
    };

    fetch('https://fat-rat.vercel.app/user/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inscription réussie!');
                registerModal.style.display = 'none';
            } else {
                alert('Erreur d\'inscription: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});

function fetchAndDisplayDogImage() {
    const apiUrl = 'https://fat-rat.vercel.app/';

    fetch(apiUrl)
        //.then(response => response.json())
        .then(async data => {
            console.log(data);
            const imgElement = document.getElementById('dogImage');
            if (!imgElement) {
                const newImgElement = document.createElement('p');
                newImgElement.id = 'texte';
                newImgElement.textContent = await data.text();

                document.getElementById('home').appendChild(newImgElement);
            } else {
                imgElement.textContent = data.json();
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'image:', error);
        });
}

fetchAndDisplayDogImage();
