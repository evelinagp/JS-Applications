//load all books
// create a book
// update a book
// delete a book

//handle create form
//handle edit form

//load a book for editing
//handle delete button

//initializatuion

const tbody = document.querySelector('tbody');
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');
document.getElementById('loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);

loadBooks();

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, { author, title });

    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDelete(event.target);
    } else if (event.target.className == 'edit') {
        onEdit(event.target);
    }
}
async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);
    editForm.querySelector('[name="title"]').value = book.title;

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
}
async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteCatch(id);
    button.parentElement.parentElement.remove();
}
async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    if (result != undefined) {
        tbody.appendChild(createRow(result._id, result));
        event.target.reset();
    }
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const res = await fetch(url, options);

    if (res.ok != true) {
        const error = await res.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await res.json();
    return data;
}
async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}
async function loadBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`

    return row;
}

async function createBook(book) {
    try {
        if (Object.values(book).some(f => f == '')) {
            throw new Error('All fields are required!')
        }
        const result = await request('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            body: JSON.stringify(book)
        });
        return result;
    } catch (err) {
        alert(err.message);
    }
}
async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
    return result;
}
async function deleteCatch(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    return result;
}