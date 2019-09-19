const initialState = {
    user: {},
  
  };
  
  // Constants
  
  const LOAD_USER = 'LOAD_USER';
  
  // Reducer
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USER:
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  const loadUser = user => (dispatch) => {
    dispatch({
      type: LOAD_USER,
      payload: user
    });
  };
  // const loadFilms = (page = 1) => (dispatch) => {
  //   fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8efedc660d998d9e85e631188f90f32d&language=en-US&include_adult=false&include_video=false&page=${page}`)// url api of films
  //     .then(result => result.json())
  //     .then((result) => {
  //       if (result.lenght !== 0) {
  //         dispatch({
  //           type: LOAD_FILMS,
  //           payload: result.results
  //         });
  //       }
  //     }).catch(() => {
  //       throw new Error('Cannot get data from API (API is unavaliable)');
  //     });
  // };
  
  const getState = state => state.user;
  const selectUser = state => getState(state).user;
  
  export default user;
  export {
    //
    // actions
    loadUser,
    // selectors
    selectUser,
  };