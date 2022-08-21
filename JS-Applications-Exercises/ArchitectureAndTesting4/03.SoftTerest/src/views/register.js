//initialization
//- find relevant section
import { register } from '../api/data.js';
import { showHome } from './home.js';
import { updateNav } from './app.js';
import { showView } from './dom.js';

// - detach section from DOM

const section = document.getElementById('registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;
//display logic

export function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section); //showView
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPassword = formData.get('repeatPassword').trim();

    if (email === '' || password === '') {
        alert('All fields are requered!');
        return;
    }
    if (password !== repeatPassword) {
        alert('Passwords don\'t match!');
        return;
    }
    if (password.length < 6) {
        alert('Passwords must be at least 6 characters!');
        return;
    }

    await register(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
};
/* try {
     const res = await fetch('http://localhost:3030/users/register', {
         method: 'post',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
     });

     if (res.ok != true) {
         const error = await res.json();
         throw new Error(error.message);
     }

     const data = await res.json();
     const userData = {
         username: data.username,
         id: data._id,
         token: data.accessToken,
         movieId: data.movieId
     };
     sessionStorage.setItem('userData', JSON.stringify(userData));
 } catch (err) {
     alert(err.message);
 }*/