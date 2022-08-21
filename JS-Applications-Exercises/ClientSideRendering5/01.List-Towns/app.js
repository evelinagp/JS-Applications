import { html, render } from './node_modules/lit-html/lit-html.js';

//on submit
//parse input
//render template
const root = document.getElementById('root');
document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t => t.trim());

    const result = listTemplate(towns);
    render(result, root);
});
//template
//ul with li for each array item

const listTemplate = (towns) => html `
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;