import { call, delay, put, spawn, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import {
  ActionTypes,
  AddTask,
  CreateRoom,
  LoadRoom,
  Login,
  SetRoom,
  SignUp,
  ToggleTaskStatus,
} from "./actions";
import api, { database } from "./api";
import {
  authenticateSuccess,
  loadRoom,
  logout,
  setError,
  setLoading,
  setRefreshLoading,
  setRoom,
} from "./user";
import { saveDataToStorage } from "../../utils";
import { AsyncStorage } from "react-native";

function* logoutSaga(time: number): SagaIterator {
  yield delay(time);
  yield put(logout());
}

export function* loginSaga({
  payload: { email, password },
}: Login): SagaIterator {
  yield put(setLoading(true));
  try {
    const response = yield call(api.loginUser, email, password);
    if (!response.ok) {
      const errorResData = yield response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
    const resData = yield response.json();
    yield spawn(logoutSaga, parseInt(resData.expiresIn) * 1000);
    const user = yield call(database.getUserInfo, resData.localId);

    yield put(
      authenticateSuccess(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        user.data().name,
        user.data().avatar
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      user.data().name,
      user.data().avatar
    );
  } catch (e) {
    yield put(setError(e.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* signUpSaga({
  payload: { name, email, password, image },
}: SignUp): SagaIterator {
  yield put(setLoading(true));
  try {
    const response = yield call(api.signUp, email, password);
    if (!response.ok) {
      const errorResData = yield response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    const resData = yield response.json();
    yield call(
      database.addUserToDB,
      resData.localId,
      name,
      `data:image/jpeg;base64,${image}`
    );
    yield put(
      authenticateSuccess(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        name,
        `data:image/jpeg;base64,${image}`
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      name,
      `data:image/jpeg;base64,${image}`
    );
  } catch (e) {
    yield put(setError(e.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* loadRoomSaga({
  payload: { name, refreshLoading },
}: LoadRoom): SagaIterator {
  if (!refreshLoading) {
    yield put(setLoading(true));
  } else {
    yield put(setRefreshLoading(true));
  }
  try {
    const doc = yield call(database.getRoom, name);
    if (doc.exists) {
      yield put(setRoom(name.toLowerCase(), doc.data()));
    } else {
      console.log("no such doc");
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (!refreshLoading) {
      yield put(setLoading(false));
    } else {
      yield put(setRefreshLoading(false));
    }
  }
}

export function* toggleTaskStatusSaga({
  payload: { tasks, room },
}: ToggleTaskStatus): SagaIterator {
  try {
    console.log(tasks);
    yield call(database.toggleTaskStatus, tasks, room);
    yield put(loadRoom(room));
  } catch (e) {
    console.log("error", e);
  } finally {
  }
}

export function* addTaskSaga({
  payload: { tasks, room },
}: AddTask): SagaIterator {
  try {
    console.log(room);
    console.log("saga", tasks);
    yield call(database.addTask, tasks, room);
    yield put(loadRoom(room));
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export function* setRoomSaga({ payload: { name } }: SetRoom): SagaIterator {
  AsyncStorage.setItem(
    "room",
    JSON.stringify({
      roomName: name,
    })
  );
}

export function* createRoomSaga({
  payload: { name },
}: CreateRoom): SagaIterator {
  yield put(setLoading(true));
  try {
    yield call(database.createRoom, name);
    yield put(setRoom(name.toLowerCase(), {}));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setLoading(false));
  }
}

export default [
  takeLatest(ActionTypes.LOGIN, loginSaga),
  takeLatest(ActionTypes.SIGN_UP, signUpSaga),
  takeLatest(ActionTypes.TOGGLE_TASK_STATUS, toggleTaskStatusSaga),
  takeLatest(ActionTypes.LOAD_ROOM, loadRoomSaga),
  takeLatest(ActionTypes.ADD_TASK, addTaskSaga),
  takeLatest(ActionTypes.SET_ROOM, setRoomSaga),
  takeLatest(ActionTypes.CREATE_ROOM, createRoomSaga),
];
