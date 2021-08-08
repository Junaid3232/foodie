import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Bubble } from "react-native-gifted-chat";
import { View, Image, Text } from "react-native";
import OneSignal from "react-native-onesignal";

import DeviceInfo from "react-native-device-info";
import { getUniqueId, getAndroidId } from "react-native-device-info";
import { userSignUp } from "../../utilts/auth";

const Messages = (props) => {
  const thread = props.navigation.getParam("thread");
  let ArrayOfObjects = [{}];
  let arrayWithName = [];
  // let deviceIdArray = [];

  const [messages, setMessages] = useState([]);
  const [firstID, setFirstID] = useState("");
  const [userAvatar, setUserAvatar] = useState();
  const [profileName, setProfileName] = useState("");
  const [deviceIdArray, setDeviceIdArray] = useState([]);

  useEffect(() => {
    DeviceInfo.getAndroidId().then((androidId) => {
      setID(androidId);
    });

    const androidId = DeviceInfo.getUniqueId();

    const unsubscribeListener = firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);

  // componentDidUpdate for profile images
  useEffect(() => {
    const user = auth().currentUser;
    firestore()
      .collection("Users")
      .where("userId", "==", user.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUserAvatar(doc._data.profileImage);
          setProfileName(doc._data.displayName);
        });
      });
  }, [messages]);

  //for checking device ID and blocking notification of own message
  useEffect(() => {
    const androidId = DeviceInfo.getUniqueId();
    firestore()
      .collection("Users")
      .where("deviceID", "not-in", ["", androidId])
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setDeviceIdArray((deviceIdArray) => [
            doc._data.deviceID,
            ...deviceIdArray,
          ]);
        });
      });
  }, []);

  const handleSend = async (messages) => {
    const text = profileName + ":  " + messages[0].text;

    //adding messeges collection to firebase
    firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text,

        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
      });
    //adding a collection in which all messeges is going to store
    await firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
    sendNotification(text);
  };
  //function for sending notification when new message is recieved by user
  const sendNotification = (data, id) => {
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic ZmEwZTQ1MWYtZWUzYS00NWNhLTg3NDYtNzQ0NWIyZDg2YTFk",
    };
    console.log("Device ID Array Called in Function", deviceIdArray);

    let endpoint = "https://onesignal.com/api/v1/notifications";
    let params = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        app_id: "144e700a-cd7d-44c4-a441-0d8d5d596dcd",
        // included_segments: ["Subscribed Users"],
        channel_for_external_user_ids: "push",
        include_external_user_ids: [deviceIdArray],

        headings: { en: profileName },
        contents: { en: data },
      }),
    };
    fetch(endpoint, params).then((res) =>
      console.log("----Response OneSignal----", res)
    );
  };

  const setID = (androidId) => {
    let externalUserId = androidId;
    OneSignal.setExternalUserId(androidId, (results) => {
      // The results will contain push and email success statuses
      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
    });
  };

  const showNames = () => {
    messages &&
      messages.map((message) => {
        firestore()
          .collection("Users")
          .where("userId", "==", message.user._id)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              ArrayOfObjects.push({
                displayName: doc._data.displayName,
              });
              console.log("Map Function Called ");
            });
          });
      });
  };
  const getArrayWithName = () => {
    for (let i = 0; i < messages.length; i++) {
      let items = [...messages];
      let item = { ...items[i] };
      item.text = [
        (messages[i].text =
          ArrayOfObjects[i].displayName + ":" + messages[i].text),
      ];
      items[i] = item;
      setMessages(items);
    }
  };

  // };
  // firestore()
  //   .collection("Users")
  //   .where("userId", "==", user.uid)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       setFirstID(doc._data.userId);
  //       let final = doc._data.displayName;
  //     });
  //   });
  // const GetAvatar = () => {
  //   const user = auth().currentUser;

  //   firestore()
  //     .collection("users")
  //     .doc(user.profileImage)
  //     .then(() => {
  //       console.log("Profile Avatarrrrrrr........", user.profileImage);
  //     });
  // };

  // firestore()
  //   .collection("MESSAGE_THREADS")
  //   .doc("MESSAGES")
  //   .where(user._id, "==", firstID)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log("********2ndddddddddddddddddddddd*********", doc._data);
  //     });
  //   });

  // const isItDoneYet = new Promise((resolve) => {
  //   for (let i = 0; i < messages.length; i++) {
  //     messages[i].text = ArrayOfObjects[i].displayName + ":" + messages[i].text;
  //   }
  //   resolve(messages);
  // });

  // const checkIfItsDone = () => {
  //   isItDoneYet
  //     .then((messages) => {
  //       console.log("Array Returned",messages);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // checkIfItsDone();

  const user = auth().currentUser;

  return (
    //Chat UI implementation
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      infiniteScroll={true}
      showAvatarForEveryMessage={false}
      user={{
        _id: user.uid,
      }}
      loadEarlier={true}
      renderUsernameOnMessage={true}
      renderAvatarOnTop={true}
      renderAvatar={() => {
        return (
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={userAvatar}
            />
          </View>
        );
      }}
      renderBubble={(props) => {
        return (
          //changing color for left and right bubble
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: "white",
              },
              right: {
                backgroundColor: "#00A44B",
              },
            }}
          />
        );
      }}
    />
  );
};
export default Messages;
