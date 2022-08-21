import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js';


const searchTemplate = (albums, onSearch) => html `
       <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click=${onSearch}>Search</button>
            </div>

            <h2>Results:</h2>
        
            <!--Show after click Search button-->
            <div class="search-result">
            ${albums.length > 0
            ? albums.map(albumPreview)
            : html`<p class="no-result">No result.</p>`}            
            </div>
        </section>`

const albumPreview = (album) => html `<div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>
        </div>
    </div>`

export async function searchPage(ctx) {
    const name = ctx.querystring.split('=')[1];
    let albums = [];
    if (name) {
        albums = await searchAlbums(decodeURIComponent(name));
    };
    ctx.render(searchTemplate(albums, onSearch));

    function onSearch() {
        const name = document.getElementById('search-input').value
        if (name) {
            ctx.page.redirect(`/search?name=${name}`)

        }
    }
}