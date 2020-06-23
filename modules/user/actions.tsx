export enum ActionTypes {
  LOGIN = "LOGIN",
  AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS",
  SET_ROOM = "SET_ROOM",
  SET_LOADING = "SET_LOADING",
  SIGN_UP = "SIGN_UP",
  LOGOUT = "LOGOUT",
  SET_ERROR = "ERROR",
  LOAD_ROOM = "LOAD_ROOM",
  TOGGLE_TASK_STATUS = "TOGGLE_TASK_STATUS",
  ADD_TASK = "ADD_TASK",
  SET_REFRESH_LOADING = "SET_REFRESH_LOADING",
  CREATE_ROOM = "CREATE_ROOM",
}

export interface Login {
  type: ActionTypes.LOGIN;
  payload: {
    email: string;
    password: string;
  };
}

export interface AuthenticateSuccess {
  type: ActionTypes.AUTHENTICATE_SUCCESS;
  payload: {
    userId: string;
    token: string;
    expirationTime: number;
    name: string;
    avatar: string;
  };
}

export interface SetRoom {
  type: ActionTypes.SET_ROOM;
  payload: {
    name: string;
    data: object;
  };
}

export interface SetLoading {
  type: ActionTypes.SET_LOADING;
  payload: {
    loading: boolean;
  };
}

export interface SignUp {
  type: ActionTypes.SIGN_UP;
  payload: {
    email: string;
    password: string;
    name: string;
    image: string;
  };
}

export interface Logout {
  type: ActionTypes.LOGOUT;
}

export interface SetError {
  type: ActionTypes.SET_ERROR;
  payload: {
    error: string;
  };
}

export interface LoadRoom {
  type: ActionTypes.LOAD_ROOM;
  payload: {
    name: string;
    refreshLoading?: boolean;
  };
}

export interface CreateRoom {
  type: ActionTypes.CREATE_ROOM;
  payload: {
    name: string;
  };
}

export interface ToggleTaskStatus {
  type: ActionTypes.TOGGLE_TASK_STATUS;
  payload: {
    tasks: [];
    room: string;
  };
}

export interface AddTask {
  type: ActionTypes.ADD_TASK;
  payload: {
    tasks: object;
    date: string;
    room: string;
  };
}

export interface CreateRoom {
  type: ActionTypes.CREATE_ROOM;
  payload: {
    name: string;
  };
}

export type Actions = Login &
  AuthenticateSuccess &
  SetRoom &
  SetLoading &
  SignUp &
  Logout &
  SetError &
  LoadRoom &
  ToggleTaskStatus &
  AddTask;
