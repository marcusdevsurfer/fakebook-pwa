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
        const section = document.getElementById('section');
        const response = await fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
        const data = await response.json();
        data.forEach(user => {
            const userDiv = document.createElement('div');
            const userName = document.createElement('p');
            const activeCircle = document.createElement('div');
            activeCircle.classList.add('active-circle');
            userDiv.classList.add('user');
            userName.innerHTML = user.name;
            userDiv.appendChild(userName);
            userDiv.appendChild(activeCircle);
            section.appendChild(userDiv);
        });
    }
    catch (error) {
        console.log('error', error);
    }
}

const fetchPosts = async () => {
    var requestOptions = {
        method: 'GET',
    };
    try {
        const postsContainer = document.getElementById('posts-container');
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        const data = await response.json();
        data.forEach(post => {
            const postDiv = document.createElement('div');
            const postTitle = document.createElement('p');
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
    fetchPosts();
});