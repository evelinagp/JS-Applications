import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}
export async function getMyCarsListings(userId) {
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createCar(car) {
    return api.post('/data/cars', car);
}
export async function getCarById(id) {
    return api.get('/data/cars/' + id);
}

export async function deleteById(id) {
    return api.del('/data/cars/' + id);
}
export async function editCar(id, car) {
    return api.put('/data/cars/' + id, car);
}
export async function searchCars(query) {
    return api.get(`/data/cars?where=year%3D${query}`);
}