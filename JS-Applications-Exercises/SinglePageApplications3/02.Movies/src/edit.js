//initialization
//- find relevant section

import { showDetails } from './details.js';
import { showView } from './dom.js';
import { showLogin } from './login.js';

// - detach section from DOM

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onEditSubmit);
section.remove();

//display logic
export function showEdit(id) {
    showView(section);

}
async function onEditSubmit(event, id) {
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

        const res = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'put',
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
        showDetails();
    } catch (err) {
        alert(err.message);
    }
}