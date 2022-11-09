import { USER_ACTION_TYPES } from "./user.types";
import {
  CurrentUser,
  AdditionalInfo,
  UpdatedUserInfo,
  UpdatedOrdersHistory
} from "../../utils/firebase.utils";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher
} from "../../utils/reducer.utils";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
// export type SetCurrentUser =ActionWithPayload<
//   USER_ACTION_TYPES.SET_CURRENT_USER,
//   CurrentUser
// >;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  CurrentUser
>;
export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;
export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: string; additionalInfo: AdditionalInfo }
>;
export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export type UpdateUserData = ActionWithPayload<
  USER_ACTION_TYPES.UPDATE_USER_DATA,
  { currentUser: CurrentUser; updatedInfo: UpdatedUserInfo }
>;
export type UpdateUserOrdersHistory = ActionWithPayload<
  USER_ACTION_TYPES.UPDATE_USER_ORDERS_HISTORY,
  { currentUser: CurrentUser; updatedHistory: UpdatedOrdersHistory }
>;

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);
// export const setCurrentUser = withMatcher(
//   (currentUser: CurrentUser): SetCurrentUser =>
//     createAction(USER_ACTION_TYPES.CHECK_USER_SESSION, currentUser)
// );

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);
export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);
export const signInSuccess = withMatcher(
  (user: CurrentUser): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);
export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName
    })
);
export const signUpSuccess = withMatcher(
  (user: string, additionalInfo: AdditionalInfo): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInfo })
);
export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);
export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

export const updateUserData = withMatcher(
  (currentUser: CurrentUser, updatedInfo: UpdatedUserInfo): UpdateUserData =>
    createAction(USER_ACTION_TYPES.UPDATE_USER_DATA, {
      currentUser,
      updatedInfo
    })
);
export const updateUserOrdersHistory = withMatcher(
  (
    currentUser: CurrentUser,
    updatedHistory: UpdatedOrdersHistory
  ): UpdateUserOrdersHistory =>
    createAction(USER_ACTION_TYPES.UPDATE_USER_ORDERS_HISTORY, {
      currentUser,
      updatedHistory
    })
);
