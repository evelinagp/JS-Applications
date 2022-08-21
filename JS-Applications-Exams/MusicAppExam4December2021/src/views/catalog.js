import { getAllAlbumsByName } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const catalogTemplate = (albulms) =>
    html ` <section id="catalogPage">
<h1>All Albums</h1>
${albulms.length > 0
        ? albulms.map(albumPreview)
        : html` <p>No Albums in Catalog!</p>`}
</section>`

const albumPreview = (album) => html`<div class="card-box">
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
</div>`;

export async function catalogPage(ctx) {
    const userData = getUserData();
    const albulms = await getAllAlbumsByName();
    ctx.render(catalogTemplate(albulms));
}