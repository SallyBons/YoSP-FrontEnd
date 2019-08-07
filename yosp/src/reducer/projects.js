const initialValues = {
    project: {},
  };
  // Constants
  
   const LOAD_PROJECT = 'LOAD_PROJECT';
  
  // Reducer
  
  const project = (state = initialValues, action) => {
    switch (action.type) {
      case LOAD_PROJECT:
          return {
            ...state,
            project: action.payload
          };
      default:
        return state;
    }
  
  };
  
    const loadProject = project => (dispatch) => {
    dispatch({
      type: LOAD_PROJECT,
      payload: project
    });
  };
  
  const getState = state => state.project;
  const selectProject = state => getState(state).project;
  
  export default project;
  export {
    // actions
    loadProject,
    // selectors
    selectProject,
  };