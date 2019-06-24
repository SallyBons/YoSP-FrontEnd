import guid from '../utils'
const initialValues = {
  alerts: [],
};
// Constants

const ADD_ALERT = 'ADD_ALERT';
const DELETE_ALERT = 'DELETE_ALERT';
const LOAD_ALERTS = 'LOAD_ALERTS';

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
      case LOAD_ALERTS:
        return {
          ...state,
          alerts: action.payload
        };
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
const loadAlerts = alert => (dispatch) => {
  dispatch({
    type: LOAD_ALERTS,
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
  loadAlerts,
  // selectors
  selectAllAlerts,
};