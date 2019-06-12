const initialState = {
    proxy: {},
  
  };
  
  // Constants
  
  const LOAD_PROXY = 'LOAD_PROXY';
  
  // Reducer
  
  const proxy = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_PROXY:
        return {
          ...state,
         proxy: action.payload
        };
      default:
        return state;
    }
  };
  
  const loadProxy = proxy => (dispatch) => {
    dispatch({
      type: LOAD_PROXY,
      payload: proxy
    });
  };
    
  const getState = state => state.proxy;
  const selectProxy = state => getState(state).proxy;
  
  export default proxy;
  export {
    //
    // actions
    loadProxy,
    // selectors
    selectProxy,
  };