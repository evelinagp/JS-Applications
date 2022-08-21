export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    return sessionStorage.removeItem('userData');
}

/*export function loadMovie(ctx, next) {
    sessionStorage.removeItem('userData');
    const moviePromise = getMovieById(ctx.params.id);
    ctx.moviePromise = moviePromise;
    next();
}*/