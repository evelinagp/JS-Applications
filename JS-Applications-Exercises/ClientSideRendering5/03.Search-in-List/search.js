import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns as townNames } from './towns.js'

//template:
//unsorted list
//highlight elements based on search result
const listTemplate = (towns) => html `
   <ul>
      ${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
   </ul>`;



//start
//load and parse data
//call update
//add event listener to search field
const towns = townNames.map(t => ({ name: t, match: false }));
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch);

update();

//update
//render template
function update() {
   render(listTemplate(towns), root);
}

//on search:
//read input value
//compare with town names and modify data
//output result
//call update
function onSearch() {
   const match = input.value.trim().toLocaleLowerCase();
   let matches = 0;
   for (let town of towns) {
      if (match && town.name.toLocaleLowerCase().includes(match)){
         town.match = true;
         matches++;
      }else{
         town.match = false;
      }
   }
     output.textContent = `${matches} matches found`

     update();
}