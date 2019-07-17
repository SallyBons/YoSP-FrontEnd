const initialState = {
    currentRoute: "dashboard",

};

// Constants

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Reducer

const ui = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            // TODO: Check this code for state duplication and rerenders
            return {
                ...state,
                currentRoute: action.payload
            };
        default:
            return state;
    }
};

const setCurrentPage = value => (dispatch) => {
    dispatch({
        type: SET_CURRENT_PAGE,
        payload: value
    });
};

const getState = state => state.ui;
const selectCurrentState = state => getState(state).currentRoute;

export default ui;
export {
    //
    // actions
    setCurrentPage,
    // selectors
    getState,
    selectCurrentState
};