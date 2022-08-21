function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    phonebookList.addEventListener('click', onDelete)

    loadContacts();
}

const phonebookList = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

async function onDelete(event) {
    const id = event.target.dataset.id;
    if (id != undefined) {
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}
async function onCreate() {

    const person = personInput.value;
    const phone = phoneInput.value;

    const contact = { person, phone };

    const result = await createContact(contact);
    phonebookList.appendChild(createItem(result));
}
//load and display all messages
async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    phonebookList.replaceChildren(...Object.values(data).map(createItem));

}

function createItem(contact) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id ="${contact._id}">Delete</button>`;
    return liElement;
}

async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    };
    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}
async function deleteContact(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;
    const options = {
        method: 'delete'
    };
    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}