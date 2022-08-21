//initialization
//- find relevant section

import { showView } from './dom.js';
import { showLogin } from './login.js';
import { showHome } from './home.js';


// - detach section from DOM

// document.getElementById('addForm').addEventListener('submit', onCreateSubmit);

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onAddSubmit);
section.remove();

//display logic
export function showCreate() {
    showView(section);
}

async function onAddSubmit(event) {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        window.location = showLogin();
        return;
    }

    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});


    try {
        if (Object.values(data).some(f => f == '')) {
            throw new Error('All fields are required!')
        }
        const res = await fetch('http://localhost:3030/data/movies ', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}