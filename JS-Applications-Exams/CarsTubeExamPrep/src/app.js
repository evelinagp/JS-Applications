import { page, render } from './lib.js'
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from "./api/api.js";
import { getUserData } from "./util.js";
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { searchPage } from './views/searchByYear.js'
import { myListingsPage } from './views/my-listings.js'


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/allListings', catalogPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/myListings', myListingsPage);
page('/byYear', searchPage);

updateUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();
    const profile = document.getElementById('profile');
    if (userData) {
        profile.style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        profile.getElementsByTagName("A")[0].textContent = `Welcome, ${userData.username}`;

    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}