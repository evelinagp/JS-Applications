const section = document.getElementById('homePage');
section.remove();
const form = section.querySelector('#getStartedLink');
form.addEventListener('click', (ev) => {
    ev.preventDefault();
    ctx.goTo('catalog')
});
let ctx = null;

//display logic
export function showHomePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section); //showView
}