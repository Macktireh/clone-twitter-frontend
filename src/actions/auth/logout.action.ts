import { AnyAction, Dispatch } from "redux";

// import Axios from "@/config/axios";
// import * as Api from "@/config/api";
import * as Types from "@/actions/types";

const logoutAction = () => async (dispatch: Dispatch<AnyAction> | any) => dispatch({ type: Types.LOGOUT });

export default logoutAction;
