window.addEventListener('load', solution);

async function solution() {

    let url = 'http://localhost:3030/jsonstore/advanced/articles/list'
    const res = await fetch(url);
    const articlesList = await res.json();

    articlesList.forEach(v => {
        let id = v._id;
        createArticle(id);
    })

    button();
}

async function createArticle(id) {

    let url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id
    const res = await fetch(url);
    const article = await res.json();


    const mainSection = document.getElementById('main')

    mainSection.innerHTML = mainSection.innerHTML +
        `   <div class="accordion">
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id=${article._id}>More</button>
            </div>
            <div class="extra">
                <p>${article.content}</p>
            </div>
        </div>`

}

function button() {
    const main = document.getElementById('main');
    main.addEventListener("click", onClick);

    function onClick(e) {
        let button = e.target;
        if (button.tagName !== 'BUTTON') {
            return
        }

        const div = button.parentNode.parentNode.querySelector('.extra');
        div.style.display = div.style.display == 'inline' ? 'none' : 'inline';

        if (button.textContent === 'More') {
            button.textContent = 'Less'
        } else {
            button.textContent = 'More'
        }
    }
}