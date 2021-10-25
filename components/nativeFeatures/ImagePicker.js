import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import storage from "@react-native-firebase/storage";
import { Entypo } from "@expo/vector-icons";
import { firebaseConfig } from "../../firebase";
import Colors from "../../constants/Colors";

const ImgPicker = (props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [pickedImage, setPickedImage] = useState();
  const [uploading, setUploading] = useState(false);
  const takeImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(image);
    uploadImage(image.uri, props.imageName);
  };

  const uploadImage = async (imageUri, imageName) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(imageName);
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          setPickedImage(url);
          props.imgTaken(url);
          console.log("download url :", url);
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <View style={styles.imagePicker}>
      {uploading ? (
        <ActivityIndicator size="large" color={Colors.darkGrey} />
      ) : (
        <TouchableOpacity style={styles.takePhoto} onPress={takeImageHandler}>
          <Entypo name="camera" size={30} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.imgStatus}>
        {!pickedImage ? (
          <Text style={styles.statusError}>There is no Image has picked!</Text>
        ) : (
          <Text style={styles.status}>Image has picked!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    margin: 15,
    flexDirection: "row",
  },
  takePhoto: {
    backgroundColor: Colors.darkGrey,
    padding: 15,
    width: 60,
    borderRadius: 30,
  },
  imgStatus: {
    marginTop: 18,
    marginLeft: 10,
  },
  status: {
    fontFamily: "open-sans",
    color: "green",
  },
  statusError: {
    fontFamily: "open-sans",
    color: Colors.redOrange,
  },
});

export default ImgPicker;
