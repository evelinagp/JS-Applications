let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
    } else {
        document.getElementById('user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadCatches);
    document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
    const updateBtn = document.querySelector('.update');
    updateBtn.addEventListener('click', onUpdateSubmit);
    document.querySelector('.delete').addEventListener('click', onDeleteSubmit);


});
async function onCreateSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = '/login.html';
        return
    }

    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});


    try {
        if (Object.values(data).some(f => f == '')) {
            throw new Error('All fields are required!')
        }
        const res = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        loadCatches();
    } catch (err) {
        alert(err.message);
    }

}
async function onUpdateSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = '/login.html';
        return
    }

    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});


    try {
        if (Object.values(data).some(f => f == '')) {
            throw new Error('All fields are required!')
        }

        const result = await updateCatch(id, { angler, weight, species, location, bait, captureTime });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        loadCatches();
    } catch (err) {
        alert(err.message);
    }
}
async function onDeleteSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = '/login.html';
        return
    }

    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});


    try {
        if (Object.values(data).some(f => f == '')) {
            throw new Error('All fields are required!')
        }
        const result = await deleteCatch(id);
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        loadCatches();
    } catch (err) {
        alert(err.message);
    }
}

function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDelete(event.target);
    } else if (event.target.className == 'update') {
        onUpdate(event.target);
    }
}
async function onUpdate(button) {
    const id = button.parentElement.dataset.id;
    const catchObj = await loadcatchObjById(id);

}
async function loadcatchObjById(id) {
    const object = await request('http://localhost:3030/data/catches/' + id);
    return object;
}
async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteCatch(id);
    button.parentElement.parentElement.remove();
}

async function loadCatches() {
    const res = await fetch('http://localhost:3030/data/catches')
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item) {

    const isOwner = (userData && item._ownerId == userData.id);

    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML =
        `<label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
    <button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return element;
}

async function updateCatch(id, catchObj) {
    const result = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(
            catchObj)
    });
    return result;
}
async function deleteCatch(id) {
    const result = await request('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
    });
    return result;
}