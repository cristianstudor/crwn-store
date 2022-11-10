import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { User, AuthError, AuthErrorCodes } from "firebase/auth";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
  UpdateUserData,
  UpdateUserOrdersHistory
} from "./user.actions";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  updateUserDocument,
  AdditionalInfo
} from "../../utils/firebase.utils";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalInfo?: AdditionalInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password }
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    if (
      (error as AuthError).code === AuthErrorCodes.USER_DELETED ||
      AuthErrorCodes.INVALID_PASSWORD
    ) {
      alert("Email or password wrong!");
    }
    console.error("email or password wrong");
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName }
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      alert("Cannot create user, email already in use!");
    }
    console.error("user creation encountered an error", error);
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalInfo }
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* updateUser({ payload: { updatedInfo } }: UpdateUserData) {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (userAuth) {
      yield* call(updateUserDocument, userAuth, updatedInfo);
      alert("Update user data successful!");
      yield* call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (error) {
    alert("Update user data unsuccessful!");
    console.error("error updating the user data", error);
  }
}

export function* updateUserHistory({
  payload: { updatedHistory }
}: UpdateUserOrdersHistory) {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (userAuth) {
      yield* call(updateUserDocument, userAuth, updatedHistory);
      yield* call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (error) {
    console.error("error adding order to the user data", error);
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onUpdateUserData() {
  yield* takeLatest(USER_ACTION_TYPES.UPDATE_USER_DATA, updateUser);
}

export function* onUpdateUserHistory() {
  yield* takeLatest(
    USER_ACTION_TYPES.UPDATE_USER_ORDERS_HISTORY,
    updateUserHistory
  );
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onUpdateUserData),
    call(onUpdateUserHistory)
  ]);
}
