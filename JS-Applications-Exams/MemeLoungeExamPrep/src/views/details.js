import { html } from '../lib.js';
import { deleteById, getMemeById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete) =>
    html `<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : null}

        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const meme = await getMemeById(ctx.params.id);

    const userData = getUserData();
    const isOwner = userData && meme._ownerId == userData.id
    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete the item?');
        if (choise) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/memes');
        }
    }
}


/*async function loadItem(id, onDelete) {
    const item = await getById(id);

    const userData = getUserData();
    const isOwner = userData.id == item._ownerId;

    return itemTemplate(item, isOwner, onDelete);
} */