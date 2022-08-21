import { showSection } from '../dom.js';
import { login } from '../api/data.js';
import { e } from './dom.js';
import { showHome } from './home.js';

//initialization
//- find relevant section
// - detach section from DOM
const section = document.getElementById('loginPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
let ctx = null;

//display logic
export function showLoginPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section); //showView
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    await login(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
};
/*try {
    const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (res.ok == false) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const data = await res.json();
    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        id: data._id,
        token: data.accessToken
    }));
   } catch (err) {
alert(err.message);  */