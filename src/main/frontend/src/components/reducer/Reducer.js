export const initialState = {
    count: localStorage.getItem('count') ? Number(localStorage.getItem('count')) : 1
};

const reducer = (state, action) => {
    switch (action.type) {
        case '1':
            localStorage.setItem('count', 1);
            return { count: 1 };
        case '2':
            localStorage.setItem('count', 2);
            return { count: 2 };
        case '3':
            localStorage.setItem('count', 3);
            return { count: 3 };
        default:
            return state;
    }
};

export default reducer;