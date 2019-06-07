const initialState = {
    userAgents: {},
  
  };
  
  // Constants
  
  const LOAD_USERAGENT = 'LOAD_USERAGENT';
  
  // Reducer
  
  const userAgents = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USERAGENT:
        return {
          ...state,
          userAgents: action.payload
        };
      default:
        return state;
    }
  };
  
  const loadUserAgent = userAgent => (dispatch) => {
    dispatch({
      type: LOAD_USERAGENT,
      payload: userAgent

    });
  };
    
  const getState = state => state.userAgents;
  const selectUserAgent = state => getState(state).userAgents;
  
  export default userAgents;
  export {
    //
    // actions
    loadUserAgent,
    // selectors
    selectUserAgent,
  };