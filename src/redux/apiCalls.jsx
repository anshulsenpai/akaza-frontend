import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../ReqMethods";
import { notify } from "../notification/Toastify"

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        notify("Login Successful")
        navigate("/")
    } catch (err) {
        notify("login failed. Invalid input")
        dispatch(loginFailure());
    }
};
