import { auth } from "./firebaseConfig";
// import { saveData, uriToBlob, downloadImage } from './utility';

export async function userSignUp(email, password) {
  let userData = null;
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (user) => {
      userData = user;
    })
    .catch((error) => {
      alert(error.message);
    });
  return userData;
}
export async function signInWithEmail(email, password) {
  let success = true;
  await auth
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      success = false;
      console.log(error.code + ": " + error.message);
      alert(error.message);
    });
  return success;
}
export async function signInWithPhoneNumber(phoneNo, password) {
  let success = true;
  await auth
    .signInWithEmailAndPassword(phoneNo, password)
    .catch(function (error) {
      success = false;
      alert(error.code + ": " + error.message);
    });
  return success;
}
export async function getCurrentUserId() {
  var user = auth.currentUser;
  if (user != null) {
    return user.uid;
  }
}

export async function getCurrentUser() {
  return auth.currentUser;
}

export async function logout() {
  await auth.signOut().catch((error) => alert(error.code, " ", error.message));
}
