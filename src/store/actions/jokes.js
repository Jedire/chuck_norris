export function getCategories(data) {
    return {
        type: "SET_CATEGORIES",
        data
    }
}

export function getCategoriesAsync() {
    return (dispatch) => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then(response => {
                return response.json();
            })
            .then(res => {
                return dispatch(getCategories(res));
            })
            .catch(error => {
                console.log('Request failed', error)
            });
    };
}

export function getJoke(data) {
    return {
        type: "GET_JOKE",
        data
    }
}

export function getJokeAsync(category) {
    let query = category !== 'random' ? `category=${category}` : "";
    return (dispatch) => {
        fetch(`https://api.chucknorris.io/jokes/random?${query}`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                return dispatch(getJoke(res));
            })
            .catch(error => {
                console.log('Request failed', error)
            });
    };
}

export function addToFavorite(joke, isFavorite) {
    return {
        type: "ADD_TO_FAVORITE",
        joke,
        isFavorite
    }
}

export function updateJoke(joke) {
    return {
        type: "UPDATE_JOKE",
        joke
    }
}

export function cancelJoke() {
    return {
        type: "CANCEL_JOKE",
    }
}