import types from './../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  handleSubmit: false,
  token: null,
  info: {
    username: ''
  },
  hasError: false,
  errorMessage: ''
};

const authReducer= (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...initialState,
        handleSubmit: true
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        handleSubmit: false,
        token: 'token login success',
        info: {
          username: payload.username
        },
        hasError: false,
        errorMessage: ''
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        handleSubmit: false,
        token: null,
        hasError: true,
        errorMessage: payload.errorMessage
      }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
