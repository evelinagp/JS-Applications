import { page, render } from './lib.js';
import { homePage } from './views/home.js';
import { getUserData } from "./util.js";
import { loginPage } from './views/login.js';
import { logout } from "./api/api.js";
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js'
import { catalogPage } from './views/catalog.js';
import { editPage } from './views/edit.js'
import { detailsPage } from './views/details.js'
//import { searchPage } from './search.js';



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
//page('/search', searchPage);


updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
};