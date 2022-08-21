import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';
import { render } from './utility.js';

//main module:
//init modules with dependencies
//-rendering
//-communication between modules

const root = document.body;

const ctx = {
    update
};

update();

function update() {
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root);
}