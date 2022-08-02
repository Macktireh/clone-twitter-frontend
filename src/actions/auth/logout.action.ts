import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";

const logout = () => async (dispatch: Dispatch<AnyAction> | any) =>
  dispatch({ type: Types.LOGOUT });

export default logout;
