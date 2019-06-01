import guid from '../utils'
const initialValues = {
  alerts: [],
};
// Constants

const ADD_ALERT = 'ADD_ALERT';
const DELETE_ALERT = 'DELETE_ALERT';

// Reducer

const alerts = (state = initialValues, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    case DELETE_ALERT:
      return {
        ...state,
        alerts: [...state.alerts.filter(alert => alert.id !== action.payload.id)]
      }
    default:
      return state;
  }

};

const addAlert = (alertType, alertText) => (dispatch) => {
  dispatch({
    type: ADD_ALERT,
    payload: { id: guid(), type: alertType, text: alertText }
  });
};
const deleteAlert = alert => (dispatch) => {
  dispatch({
    type: DELETE_ALERT,
    payload: alert
  });
};

const getState = state => state.alerts;
const selectAllAlerts = state => getState(state).alerts;

export default alerts;
export {
  // actions
  addAlert,
  deleteAlert,
  // selectors
  selectAllAlerts,
};