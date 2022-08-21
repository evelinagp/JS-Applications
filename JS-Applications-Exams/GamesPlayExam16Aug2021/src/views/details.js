import { html } from '../lib.js';
import { deleteById, getAllCommentsByGameId, getGameById, createNewCommentByGameId } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, comments, showCommentBtn, onComment) => html `<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length > 0
        ? comments.map(commentPreview)
        : html`<p class="no-comment">No comments.</p>`}
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            ${isOwner ? html`<a href="/edit/${game._id}" class="button">Edit</a>
            <a href="#" @click=${onDelete} class="button">Delete</a>` : null}
        </div>
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->



  
    ${(showCommentBtn) 
            ? html `
            <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onComment}class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
            </form>  
            </article>`
            : null}

</section>`

const commentPreview = (comment) => html`
<ul>
    <li class="comment">
        <p>Content: ${comment}</p>
    </li>
</ul>`
  

export async function detailsPage(ctx) {
    const userData = getUserData();

    const [game, comments] = await Promise.all([
        getGameById(ctx.params.id),
        getAllCommentsByGameId(ctx.params.id)
    ]);

    const isOwner = userData && game._ownerId == userData.id
    const showCommentBtn = userData != null && isOwner == false;

    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, showCommentBtn, onComment));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete the item?');
        if (choise) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
    async function onComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = formData.get('comment').trim();
        if (comment == ''){
            return alert ('Field can not be empty!');
        }
        await createNewCommentByGameId(ctx.params.id, comment);
        ctx.page.redirect(/details/ + ctx.params.id)
    }
}