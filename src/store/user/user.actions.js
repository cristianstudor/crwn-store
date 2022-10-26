import { USER_ACTION_TYPES } from "./user.types";
//import { createActionObject } from "../../utils/reducer.utils";

export const setCurrentUser = (user) => {
  return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
};
