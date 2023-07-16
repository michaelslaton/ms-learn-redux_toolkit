const redux = require('redux');
const reduxLogger = require('redux-logger');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  users: [],
  error: "",
}

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED  = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  }
}

const fetchUsersFailed = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      }
  }
}

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        //response.data is the users
        const users = response.data.map((user) => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        //error.message is the error message
        dispatch(fetchUsersFailed(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));


const unsubscribe = store.subscribe(()=>{})
store.dispatch(fetchUsers());
unsubscribe();