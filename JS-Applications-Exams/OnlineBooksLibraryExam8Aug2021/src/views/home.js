import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const homeTemplate = (books) => html `
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
            ${books.length > 0
        ? html`<ul class="other-books-list">${books.map(bookPreview)}</ul>` 
        : html` <p class="no-books">No books in database!</p>`}
</section>`;

const bookPreview = (book) => html`<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function homePage(ctx) {
    const books = await getAllBooks();
    /*  if (getUserData()) {
          return ctx.page.redirect('/memes')
      } else {*/
    ctx.render(homeTemplate(books));
}