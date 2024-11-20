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
        const postsContainer = document.getElementById('posts-container');
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        const data = await response.json();
        data.forEach(post => {
            const postDiv = document.createElement('div');
            const postTitle = document.createElement('h2');
            const postBody = document.createElement('p');

            postDiv.classList.add('post');

            postTitle.innerHTML = post.title;   
            postBody.innerHTML = post.body; 

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postBody);

            postsContainer.appendChild(postDiv);
        });
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