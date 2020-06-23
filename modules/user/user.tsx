import { UserState } from "./types";
import {
  Actions,
  ActionTypes,
  AuthenticateSuccess,
  CreateRoom,
  LoadRoom,
  Login,
  SetLoading,
  SignUp,
} from "./actions";
import { AsyncStorage } from "react-native";

const defaultState: UserState = {
  isLoading: false,
};

const reducer = (state: UserState = defaultState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        userId: payload.userId,
        token: payload.token,
        userName: payload.name,
        userAvatar: payload.avatar,
      };
    case ActionTypes.SET_ROOM:
      return {
        ...state,
        roomId: payload.name,
        roomData: payload.data,
      };
    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        isLoading: payload.loading,
      };
    }
    case ActionTypes.LOGOUT:
      return {
        ...defaultState,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...defaultState,
        error: payload.error,
      };
    case ActionTypes.SET_REFRESH_LOADING:
      return {
        ...state,
        isRefreshLoading: payload.loading,
      };
    default:
      return state;
  }
};

export default reducer;

export const login = (email: string, password: string): Login => ({
  type: ActionTypes.LOGIN,
  payload: {
    email,
    password,
  },
});

export const authenticateSuccess = (
  userId: string,
  token: string,
  expirationTime: number,
  name: string,
  avatar: string
): AuthenticateSuccess => ({
  type: ActionTypes.AUTHENTICATE_SUCCESS,
  payload: {
    userId,
    token,
    expirationTime,
    name,
    avatar,
  },
});

export const loadRoom = (name: string, refreshLoading?: boolean): LoadRoom => ({
  type: ActionTypes.LOAD_ROOM,
  payload: {
    name,
    refreshLoading,
  },
});

export const createRoom = (name: string): CreateRoom => ({
  type: ActionTypes.CREATE_ROOM,
  payload: {
    name,
  },
});

export const setLoading = (loading: boolean): SetLoading => ({
  type: ActionTypes.SET_LOADING,
  payload: {
    loading,
  },
});

export const signUp = (
  name: string,
  email: string,
  password: string,
  image: string
): SignUp => ({
  type: ActionTypes.SIGN_UP,
  payload: {
    name,
    email,
    password,
    image,
  },
});

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const setRoom = (name: string, data: object) => ({
  type: ActionTypes.SET_ROOM,
  payload: {
    name,
    data,
  },
});

export const setError = (error: string) => ({
  type: ActionTypes.SET_ERROR,
  payload: {
    error,
  },
});

export const toggleTaskStatus = (tasks: object, room: string) => ({
  type: ActionTypes.TOGGLE_TASK_STATUS,
  payload: {
    tasks,
    room,
  },
});

export const addTask = (tasks: object, room: string) => ({
  type: ActionTypes.ADD_TASK,
  payload: {
    tasks,
    room,
  },
});

export const setRefreshLoading = (loading: boolean) => ({
  type: ActionTypes.SET_REFRESH_LOADING,
  payload: {
    loading,
  },
});
