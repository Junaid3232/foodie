import { db, auth, storage } from "./firebaseConfig";

import { _storeData, _retrieveData } from "./AsyncFuncs";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await db.collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log("No document found!");
    }
  });
  return data;
}

export async function saveData(collection, doc, jsonObject) {
  await db
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}
export async function saveDataWithoutDocId(collection, jsonObject) {
  let docRef = await db.collection(collection).doc();
  docRef.set(jsonObject);
  return docRef;
}

export async function addToArray(collection, doc, array, value) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  } else {
    saveData(collection, doc, { [array]: [value] });
  }
}

export function getData(collection, doc, objectKey) {
  if (objectKey === undefined) {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getDocRefByKeyValue(collection, key, value) {
  return db
    .collection(collection)
    .where(key, "==", value)
    .get()
    .then(function (querySnapshot) {
      return querySnapshot.docs[0];
    });
}

export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await db
    .collection(collection)
    .where(key, "==", value)
    .get();
  await querySnapshot.forEach(function (doc) {
    data.push(doc.data());
  });
  return data;
}
export async function getDocByKeyValueOR(collection, key, value) {
  let data = [];
  let querySnapshot = await db
    .collection(collection)
    .where(key, "in", value)
    .get();
  await querySnapshot.forEach(function (doc) {
    data.push(doc.data());
  });
  return data;
}

export async function updateArray(collection, doc, array, value, index) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index]
        ),
      })
      .then(async () => {
        let docRef1 = await db.collection(collection).doc(doc);
        let docData1 = await docRef1.get();
        if (docData1.exists && docData1.data()[array] != undefined) {
          docRef1.update({
            [array]: firebase.firestore.FieldValue.arrayUnion(value),
          });
        }
      });
  }
}
export async function removeItemfromArray(collection, doc, array, index) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index]
      ),
    });
  }
}

export async function addToArrayUpdate(collection, doc, array, value) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  }
}
export async function downloadImage(folder, imageName) {
  var storageRef = storage.ref();
  var pathRef = storageRef.child(folder + "/" + imageName);

  let url = await pathRef.getDownloadURL();
  return url;
}
export async function uriToBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };
    // this helps us get a blob
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
}
export async function UpdloadImageToDb(response) {
  var today = new Date();
  var mili = today.getMilliseconds();
  let kk = Date.parse(today);
  kk = kk + mili;
  let progress = 0;
  let file = await uriToBlob(response.uri);
  response.fileName = kk + response.fileName;
  let url = null;
  const uploadTask = storage.ref(`StarImage/${response.fileName}`).put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      if (progress == 100) {
        console.log("progress", progress);
      }
    },
    (error) => {
      console.log("error 1", error);
    },
    async () => {
      return await downloadImage("StarImage", response.fileName);
    }
  );
}
