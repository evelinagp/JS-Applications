function lockedProfile() {
    createElement();

    document.getElementById('main').addEventListener('click', onClick);

    function onClick(event) {
        const btn = event.target;
        const profile = btn.parentNode;
        const moreInfo = profile.getElementsByTagName('div')[0];
        const status = profile.querySelector('input[type="radio"]:checked').value;

        if (btn.textContent === 'Hide it') {
            moreInfo.style.display = 'none';
            btn.textContent = 'Show more';
        } else if (status === 'unlock') {
            if (btn.textContent === 'Show more') {
                moreInfo.style.display = 'inline-block';
                btn.textContent = 'Hide it';
            }
        }
    }
}

const main = document.getElementById('main');

async function getProfiles() {
    const urlProfiles = 'http://localhost:3030/jsonstore/advanced/profiles';

    const res = await fetch(urlProfiles);
    const data = await res.json();

    return data;
}

async function createElement() {
    main.replaceChildren();

    const data = await getProfiles();

    Object.entries(data).forEach(profile => {

        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        let name = profile[1].username;
        let age = profile[1].age;
        let email = profile[1].email;

        profileDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user1Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user1Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user1Username" value="${name}" disabled readonly />
<div id="user1HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user1Email" value="${email}" disabled readonly />
<label>Age:</label>
<input type="email" name="user1Age" value="${age}" disabled readonly />
</div>
<button>Show more</button>`;

        main.appendChild(profileDiv);
    });

}