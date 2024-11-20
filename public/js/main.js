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
            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`, requestOptions)
                .then(response => response.json())
                .then(user => {
                    const postDiv = document.createElement('div');
                    const postTitle = document.createElement('h2');
                    const postBody = document.createElement('p');
                    const postAuthor = document.createElement('p');
                    postDiv.classList.add('post');
                    postAuthor.innerHTML = `${user.name}:`;
                    postTitle.innerHTML = post.title;
                    postBody.innerHTML = post.body;
                    postDiv.appendChild(postAuthor);
                    postDiv.appendChild(postTitle);
                    postDiv.appendChild(postBody);
                    postsContainer.appendChild(postDiv);
                });
        });
    }
    catch (error) {
        console.log('error', error);
    }
};

const subscribeToNotifications = () => {
    const notifyBtn = document.getElementById('notify-btn');
    notifyBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            alert('Notificaciones ya están activadas, aparecerán cada 10 segundos');
            showNotificationWithInterval();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permiso concedido');
                    showNotificationWithInterval();
                }
            });
        }
    });
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}


const revokeNotificationPermission = () => {
    const revokeBtn = document.getElementById('revoke-notify-btn');
    revokeBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            Notification.permission = 'denied';
            alert('Notificaciones apagadas');
            alert('Se va a recargar la página');
            window.location.reload();
        } else {
            console.warn('Notification permission is not granted');
        }
    });
}


const showNotificationWithInterval = () => {
    setInterval(async () => {
        if (Notification.permission !== 'granted') {
            return;
        }
        try {
            const randomUserId = getRandomInt(10) + 1;
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomUserId}`);
            const data = await response.json();
            new Notification(`${data.name} ha publicado algo nuevo!`);
        } catch (error) {
            console.error('Error fetching user data for notification:', error);
        }
    }, 10000);
}


document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const homeScreen = document.getElementById('home-screen');
    setTimeout(() => {
        splashScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    }, 3000);
    fetchUsers();
    fetchPosts();
    subscribeToNotifications()
    revokeNotificationPermission();
});