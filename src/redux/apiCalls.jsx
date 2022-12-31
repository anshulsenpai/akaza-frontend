import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../ReqMethods";
import { notify } from "../notification/Toastify"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        notify("login failed. Invalid input")
        dispatch(loginFailure());
    }
};
