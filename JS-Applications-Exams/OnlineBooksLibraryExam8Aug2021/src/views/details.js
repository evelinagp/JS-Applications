import { html } from '../lib.js';
import { deleteById, getBookById, getLikesByBookId, getMyLikeByBookId, likeBook } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeBtn, onLike) =>
    html `<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null};
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${(showLikeBtn) ? html`<a @click=${onLike} class="button" href="javascript: void(0)">Like</a>` : null};
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>

        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`


export async function detailsPage(ctx) {
    //const book = getBookById(ctx.params.id) - only this without likes
    const userData = getUserData();

    const [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && book._ownerId == userData.id
    const showLikeBtn = userData != null && hasLike == false && isOwner == false;
    console.log('like');
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete the item?');
        if (choise) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
    async function onLike() {
        await likeBook(ctx.params.id);
        ctx.page.redirect(/details/ + ctx.params.id)
    }
}