import _ from 'lodash';

const initialState = {
    categories: [],
    jokes: [],
    favorite: []
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES' :
            return {
                ...state,
                categories: [
                    "",
                    "random",
                    ...action.data
                ]
            };
        case 'GET_JOKE' :
            let jokes = [...state.jokes]
            jokes.push(action.data)
            jokes.length > 10 && jokes.shift()
            return {
                ...state,
                jokes: jokes
            };
        case 'ADD_TO_FAVORITE' :
            if (action.isFavorite) {
                return {
                    ...state,
                    favorite: _.reject(state.favorite, action.joke)
                };
            } else {
                return {
                    ...state,
                    favorite: [
                        ...state.favorite,
                        action.joke
                    ]
                };
            }
        case 'UPDATE_JOKE' :
            let newArr = [action.joke, ...state.favorite];
            let updated = _.uniqBy(newArr, 'id');
            return {
                ...state,
                favorite: updated
            };
        case 'CANCEL_JOKE' :
            return {
                ...state
            };
        default:
            return state;
    }
};

export default app;