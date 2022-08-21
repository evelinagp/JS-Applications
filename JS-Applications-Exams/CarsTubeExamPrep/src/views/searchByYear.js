import { searchCars } from '../api/data.js';
import { html } from '../lib.js';
//import page from '../node_modules/page/page.mjs'


const searchTemplate = (cars, onSearch, year) =>
    html `<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
    ${cars.length > 0
            ? cars.map(carPreview)
            : html`<p class="no-cars"> No results.</p>`}
</div>
</section>`;

const carPreview = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {
    const year = ctx.querystring.split('=')[1];
    let cars = [];
    if (year) {
        cars = await searchCars(decodeURIComponent(year));
    };
    ctx.render(searchTemplate(cars, onSearch, year));

    function onSearch(event) {
        const year = document.getElementById('search-input').value
        if (year) {
        ctx.page.redirect(`/byYear?year=${year}`)
           
        }
      }     
    }