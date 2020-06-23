import React from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const HomeScreen = (props: any) => {
  const user = useSelector((state: any) => state.user);
  let members: any[] = [];
  if (user?.roomData) {
    Object.keys(user.roomData).map((task) => {
      if (user.roomData[task].doneBy) {
        const person = members.findIndex(
          (person) => person.name === user.roomData[task].doneBy
        );
        if (person >= 0) {
          members[person].tasksNumber = members[person].tasksNumber + 1;
        } else {
          members.push({
            name: user.roomData[task].doneBy,
            tasksNumber: 1,
            avatar: user.roomData[task].doneByAvatar,
          });
        }
      }
    });
  }

  console.log("members", members);

  if (user.isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="small" color="#3143ca" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        {members.map((member) => (
          <View style={styles.member} key={member.name}>
            <View style={styles.userAvatar}>
              <Image
                source={{ uri: member.avatar }}
                style={styles.avatarPlaceholder}
              />
              <Text>{member.name}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Completed: {member.tasksNumber}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = (navData: any) => {
  return {
    title: "Room statistic",
    headerTitle: "Family members",
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
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center" },
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
  text: {
    fontSize: 20,
  },
  list: {
    width: "80%",
    marginTop: 40,
  },
  member: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    marginBottom: 25,
  },
  userAvatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default HomeScreen;
