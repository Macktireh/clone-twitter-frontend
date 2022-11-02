import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";

const logoutAction = () => async (dispatch: Dispatch<AnyAction> | any) =>
  dispatch({ type: Types.LOGOUT });

export default logoutAction;
