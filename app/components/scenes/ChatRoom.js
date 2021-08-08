import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import Modal from "react-native-modal";
import ThemeStyle from "../../styles/Theme";
import Theme from "../../styles/Theme";
const avatar1 = require("../../src/avatar/avatar1.png");
const avatar2 = require("../../src/avatar/avatar2.png");
const avatar3 = require("../../src/avatar/avatar3.png");
const avatar4 = require("../../src/avatar/avatar4.png");
const avatar5 = require("../../src/avatar/avatar5.png");
const avatar6 = require("../../src/avatar/avatar6.png");

const avatarUri1 = Image.resolveAssetSource(avatar1).uri;

const avatarArray = [
  { image: avatar1, imageTitle: require("../../src/avatar/avatar1.png") },
  { image: avatar2, imageTitle: require("../../src/avatar/avatar2.png") },
  { image: avatar3, imageTitle: require("../../src/avatar/avatar3.png") },
  { image: avatar4, imageTitle: require("../../src/avatar/avatar4.png") },
  { image: avatar5, imageTitle: require("../../src/avatar/avatar5.png") },
  { image: avatar6, imageTitle: require("../../src/avatar/avatar6.png") },
];

const ChatRoom = (props) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(require("../../src/avatar/avatar1.png"));
  const [title, setTitle] = useState("");
  const [firstTime, setFirstTime] = useState("Yes");
  const [firstTimeDialog, setFirstTimeDialog] = useState("Yes");
  const [isModalVisible, setModalVisible] = useState(true);

  const setAppLaunched = () => {
    AsyncStorage.setItem("firstTime", "No").then(setFirstTime("No"));
  };
  const setAppLaunchedDialog = () => {
    AsyncStorage.setItem("firstTimeDialog", "No").then(
      setFirstTimeDialog("No")
    );
  };

  const getPostAxios = () => {
    axios({
      method: "get",
      timeout: 1000,
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((response) => {});
  };

  useEffect(() => {
    getPostAxios();
    const unsubscribe = firestore()
      .collection("MESSAGE_THREADS")
      .orderBy("latestMessage.createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,

            name: "",
            latestMessage: { text: "" },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });
    //

    return () => unsubscribe();
  }, []);
  // getting that user is first time using chat or not
  useEffect(() => {
    AsyncStorage.getItem("firstTime").then((firstTime) => {
      setFirstTime(firstTime);
    });
    AsyncStorage.getItem("firstTimeDialog").then((firstTimeDialog) => {
      setFirstTimeDialog(firstTimeDialog);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#555" />;
  }
  const setDeviceID = () => {
    const user = auth().currentUser;
    firestore().collection("Users").doc(user.uid).update({
      deviceID: DeviceInfo.getUniqueId(),
    });
  };
  const removeDeviceID = () => {
    const user = auth().currentUser;
    firestore().collection("Users").doc(user.uid).update({
      deviceID: "",
    });
  };

  const UploadAvatar = (title) => {
    const user = auth().currentUser;
    console.log("Userrr from Auth*******", user.uid);
    firestore().collection("Users").doc(user.uid).update({
      profileImage: title,
    });
    // Alert.alert("Do You Want Notifications?", "", [
    //   {
    //     text: "NO",
    //     onPress: () => removeDeviceID(),
    //   },
    //   { text: "YES", onPress: () => setDeviceID() },
    // ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Messages", { thread: item })
            }
          >
            <View style={styles.roomStyle}>
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.header}>
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={styles.contentText}>
                    {item.latestMessage.text.slice(0, 90)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {firstTime == "Yes" || firstTimeDialog == "Yes" ? (
        //condition if user has already set his avatar
        <>
          <Modal
            transparent
            overlayBackgroundColor={"rgba(0,0,0,.9)"}
            style={{
              borderTopLeftRadius: 50,
              height: "30%",
              alignSelf: "center",
            }}
            isVisible={isModalVisible}
            swipeDirection={["up"]}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            onRequestClose={() => {}}
            width={"80%"}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {"Do You Want Notifications?"}
              </Text>

              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.buttonModel}
                  onPress={() => {
                    setDeviceID();
                    setModalVisible(false);
                    setAppLaunchedDialog("Yes");
                  }}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => {
                    removeDeviceID();
                    setModalVisible(false);
                    setAppLaunchedDialog("Yes");
                  }}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
            <Text style={styles.avatarText}>Select Avatar</Text>

            <TouchableOpacity style={styles.avatarSelect}>
              <Image style={styles.selectedAvatar} source={avatar} />
            </TouchableOpacity>
            <FlatList
              data={avatarArray}
              keyExtractor={(item) => item.index}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => {
                return (
                  <View style={styles.avatarContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setAvatar(item.image), setTitle(item.imageTitle);
                      }}
                    >
                      <Image style={styles.avatar} source={item.image} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                UploadAvatar(title);
                setAppLaunched();
              }}
            >
              <Text style={styles.itemtext1}>Upload Avatar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 85,
  },
  avatarContainer: {
    flex: 1,
  },
  avatarText: {
    fontSize: 25,
    textAlign: "center",
    color: "gray",
    padding: 15,
    fontFamily: "Lato-Bold",
  },
  avatarSelect: {
    marginVertical: 15,
    alignSelf: "center",
  },
  selectedAvatar: {
    width: 120,
    height: 130,
  },
  button: {
    height: 40,
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    width: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    elevation: 5,
    top: 350,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonModel: {
    height: 60,
    width: "50%",
    backgroundColor: Theme.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "grey",
    borderBottomLeftRadius: 20,
  },
  button1: {
    height: 60,
    width: "50%",
    backgroundColor: Theme.tabBarBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Lato-Bold",
  },
  itemtext1: {
    fontSize: 15,
    fontFamily: "Lato-Bold",
    color: "#fff",
  },

  container: {},
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
  },
  row: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexShrink: 1,
  },
  header: {
    flexDirection: "row",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Lato-Bold",
    marginTop: 40,
    alignSelf: "center",
    width: "80%",
    textAlign: "center",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginLeft: 5,
  },
  dateText: {},
  contentText: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  roomStyle: {
    backgroundColor: ThemeStyle.tabBarBackgroundColor,
    margin: 10,
    borderRadius: 5,
    elevation: 8,
  },
  modalView: {
    backgroundColor: "white",
    height: "23%",
    borderRadius: 20,
    alignItems: "center",

    // height:'30%'
  },
  buttonView: {
    marginTop: "20%",
    flexDirection: "row",
    width: "100%",
  },
});
export default ChatRoom;
