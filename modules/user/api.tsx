import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBGVPbPlo9Uwqhr3Zs5L-U6okiFbbGb36U",
  authDomain: "house-chores-app.firebaseapp.com",
  projectId: "house-chores-app",
});

const db = firebase.firestore();

export const database = {
  getRoom: (name: string) =>
    db.collection("rooms").doc(name.toLowerCase()).get(),
  toggleTaskStatus: (tasks: object, room: string) =>
    db.collection("rooms").doc(room.toLowerCase()).set(tasks),
  addUserToDB: (userId: string, userName: string, image: string) =>
    db.collection("users").doc(userId).set({
      name: userName,
      avatar: image,
    }),
  createRoom: (roomName: string) =>
    db.collection("rooms").doc(roomName.toLowerCase()).set({}),
  getUserInfo: (userId: string) => db.collection("users").doc(userId).get(),
  addTask: (tasks: object, room: string) =>
    db.collection("rooms").doc(room).set(tasks),
};

export default {
  loginUser: (email: string, password: string) =>
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGVPbPlo9Uwqhr3Zs5L-U6okiFbbGb36U",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    ),
  signUp: (email: string, password: string) =>
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGVPbPlo9Uwqhr3Zs5L-U6okiFbbGb36U",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    ),
};
