if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const fetchUsers = async () => {

    var requestOptions = {
        method: 'GET',
    };

    try {
        const posts = document.getElementById('users-list');
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        const data = await response.json();
        data.forEach(post => {
            const postLi = document.createElement('li');
            postLi.innerHTML = `Titulo: ${post.title} | Cuerpo: ${post.body}`;
            posts.appendChild(postLi);
        });
        // const dogImage = document.getElementById('dog-image');
        // // const dogImage2 = document.getElementById('dog-image-2');
        // dogImage.src = data[0].url;
        // // dogImage2.src = data[1].url;
    }

    catch (error) {
        console.log('error', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const homeScreen = document.getElementById('home-screen');
    setTimeout(() => {
        splashScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    }, 3000);
    const notifyBtn = document.getElementById('notify-btn');
    notifyBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            new Notification('Hello from PWA!');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Hello from PWA!');
                }
            });
        }
    });
    fetchUsers();
});