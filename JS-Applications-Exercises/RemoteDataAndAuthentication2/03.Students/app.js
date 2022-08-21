const tbody = document.querySelector('tbody');
const createForm = document.getElementById('form');
document.getElementById('results').addEventListener('click', loadStudents);
createForm.addEventListener('submit', onCreate);

loadStudents();

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    const result = await createStudent({ firstName, lastName, facultyNumber, grade });
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
async function loadStudents() {
    const students = await request('http://localhost:3030/jsonstore/collections/students');

    const result = Object.entries(students).map(([id, student]) => createRow(id, student));
    tbody.replaceChildren(...result);

}

function createRow(id, student) {
    const row = document.createElement('tr');
    row.innerHTML =
        `<td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.facultyNumber}</td>
    <td>${student.grade}</td>
    <td data-id=${id}></td>`

    return row;
}
async function createStudent(student) {
    try {
        if (Object.values(student).some(f => f == '')) {
            throw new Error('All fields are required!')
        }
        const result = await request('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            body: JSON.stringify(student)
        });
        return result;

    } catch (err) {
        alert(err.message);
    }
}