const initialState = {
  proxies: [],

};

// Constants

const LOAD_PROXY = 'LOAD_PROXY';

// Reducer

const proxies = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROXY:
      if(state.proxies.includes(action.payload)){
        return {
          ...state,
         proxies: [...state.proxies.filter(proxy => proxy.id !== action.payload.id)]
        }
      }else{
        return {
          ...state,
          proxies: [...state.proxies, action.payload]
        };
      }
     
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

const getState = state => state.proxies;
const selectProxy = state => getState(state).proxies;

const sendProxiesToServer = state => console.log(state);

export default proxies;
export {
  //
  // actions
  loadProxy,
  // selectors
  selectProxy,
  sendProxiesToServer
};