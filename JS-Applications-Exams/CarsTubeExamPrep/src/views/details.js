import { html } from '../lib.js';
import { deleteById, getCarById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (car, isOwner, onDelete) =>
    html `<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>

    <div class="listings-buttons">
        ${isOwner 
            ? html`<a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="button-list">Delete</a>` 
            : null}
     </div>
</div>
</section>`

export async function detailsPage(ctx) {
    const userData = getUserData();

    const car = await getCarById(ctx.params.id);      
    const isOwner = userData && car._ownerId == userData.id
    //const showCommentBtn = userData != null && isOwner == false;

    ctx.render(detailsTemplate(car, isOwner, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete the item?');
        if (choise) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/allListings');
        }
    }
}