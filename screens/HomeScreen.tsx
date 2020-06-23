import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

import {
  addTask,
  createRoom,
  loadRoom,
  toggleTaskStatus,
} from "../modules/user/user";
import HeaderButton from "../components/HeaderButton";
import ToDoItem from "../components/ToDoItem";
import AddItemModal from "../components/AddItemModal";

const HomeScreen = (props: any) => {
  const { navigation } = props;
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format("DD-MM-YY"));
  const [isRoomSearching, setIsRoomSearching] = useState(true);
  const todayTasks = user?.roomData
    ? Object.keys(user.roomData).map((task) => {
        if (
          moment(user.roomData[task].date.seconds * 1000).format("DD-MM-YY") ===
          selectedDate
        ) {
          return { ...user.roomData[task], id: task };
        }
      })
    : [];

  useEffect(() => {
    navigation.setParams({ roomId: user.roomId || "Home" });
    navigation.setParams({ showAddModal: () => setIsModalDisplayed(true) });
  }, [user.roomId]);

  useEffect(() => {
    const checkRoomInStorage = async () => {
      const room = await AsyncStorage.getItem("room");
      if (room) {
        const transformedData = JSON.parse(room);
        const { roomName } = transformedData;
        if (roomName) {
          dispatch(loadRoom(roomName));
        }
      }
      setIsRoomSearching(false);
    };
    checkRoomInStorage();
  }, []);

  // useEffect(() => {
  //   if (!user.userId) {
  //     console.log("redirect from home screen effect");
  //     navigation.navigate("Auth");
  //   }
  // }, [user.userId]);

  const joinRoomAlert = () => {
    Alert.prompt("Please enter room name", undefined, (roomName) => {
      dispatch(loadRoom(roomName));
    });
  };

  const createRoomAlert = () => {
    Alert.prompt("Please enter new room name", undefined, (roomName) => {
      dispatch(createRoom(roomName));
    });
  };

  const toggleTask = (id: string, status: boolean) => {
    const selectedTask = user.roomData[id];
    dispatch(
      toggleTaskStatus(
        {
          ...user.roomData,
          [id]: {
            ...selectedTask,
            done: !status,
            doneBy: !status ? user.userName : "",
            doneByAvatar: !status ? user.userAvatar : "",
          },
        },
        user.roomId
      )
    );
  };

  const addNewItem = (task: string): void => {
    dispatch(
      addTask(
        {
          ...user.roomData,
          ["_" + Math.random().toString(16).slice(2)]: {
            name: task,
            done: false,
            doneBy: "",
            date: { seconds: moment(selectedDate, "DD-MM-YY").unix() },
          },
        },
        user.roomId
      )
    );
    setIsModalDisplayed(false);
  };

  const deleteItem = (id: number): void => {
    const tasks = user.roomData;
    delete user.roomData[id];
    dispatch(addTask(tasks, user.roomId));
    setIsModalDisplayed(false);
  };

  const selectNextDate = () => {
    setSelectedDate((date) =>
      moment(date, "DD-MM-YY").add(1, "days").format("DD-MM-YY")
    );
  };

  const selectPrevDate = () => {
    setSelectedDate((date) =>
      moment(date, "DD-MM-YY").subtract(1, "days").format("DD-MM-YY")
    );
  };

  if (isRoomSearching) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="small" color="#3143ca" />
      </View>
    );
  }

  if (!user.roomId && !user.isLoading) {
    return (
      <View style={styles.screen}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.joinButton }}
          onPress={joinRoomAlert}
        >
          <Text style={styles.text}>Join existing family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={createRoomAlert}>
          <Text style={styles.text}>Create new family</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={user.isRefreshLoading}
            onRefresh={() => dispatch(loadRoom(user.roomId, true))}
          />
        }
        style={{ flex: 1 }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AddItemModal
            open={isModalDisplayed}
            onClose={() => setIsModalDisplayed(false)}
            onSubmit={addNewItem}
          />
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={selectPrevDate}>
              <MaterialIcons
                name="chevron-left"
                size={32}
                onPress={selectPrevDate}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>
              {selectedDate === moment().format("DD-MM-YY")
                ? "Today"
                : selectedDate}
            </Text>
            <TouchableOpacity onPress={selectNextDate}>
              <MaterialIcons name="chevron-right" size={32} />
            </TouchableOpacity>
          </View>
        </View>
        {!user.isLoading && (
          <View style={styles.list}>
            {todayTasks?.map(
              (task) =>
                task &&
                !task.done && (
                  <ToDoItem
                    key={task.id}
                    id={task.id}
                    toggleStatus={toggleTask}
                    deleteItem={deleteItem}
                    done={task.done}
                    text={task.name}
                    doneBy={task.doneBy}
                  />
                )
            )}
            {todayTasks?.map(
              (task) =>
                task &&
                task.done && (
                  <ToDoItem
                    key={task.id}
                    id={task.id}
                    toggleStatus={toggleTask}
                    deleteItem={deleteItem}
                    done={task.done}
                    text={task.name}
                    doneBy={task.doneBy}
                  />
                )
            )}
          </View>
        )}
        {user.isLoading && (
          <View style={styles.loadingScreen}>
            <ActivityIndicator size="small" color="#3143ca" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = (navData: any) => {
  const roomId = navData.navigation.getParam("roomId");
  return {
    headerTitle: roomId,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: roomId !== "Home" && (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="ios-add"
          onPress={navData.navigation.getParam("showAddModal")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  loadingScreen: {
    flex: 1,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4DFC7",
  },
  joinButton: {
    backgroundColor: "#FEF6C9",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  dateContainer: {
    marginTop: 25,

    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
