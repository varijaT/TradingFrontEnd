import axios from "axios";
import * as actionTypes from "./ActionTypes"
import api, { API_BASE_URL } from "@/Api/api";

// Fetch user profile from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user });
      console.log("Fetched user profile:", user);
    } catch (error) {
      dispatch({ type: actionTypes.GET_USER_FAILURE, payload: null });
    }
  };
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      mobile: userData.mobile,
      dateOfBirth: userData.dateOfBirth,
      nationality: userData.nationality,
      address: userData.address,
      city: userData.city,
      postcode: userData.postcode,
      country: userData.country,
    });
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    console.log("Registered user:", user);
    userData.navigate("/");
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user.jwt });
  } catch (error) {
    console.log("Registration error:", error);
    dispatch({
      type: actionTypes.REGISTER_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.twoFactorAuthEnabled) {
      userData.navigate(`/two-factor-auth/${user.session}`);
    } else if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      // Dispatch LOGIN_SUCCESS and update authentication state
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user.jwt });
      // Fetch user profile immediately so that auth state is complete
      await dispatch(getUser(user.jwt));
      userData.navigate("/");
    }
  } catch (error) {
    console.log("Login error:", error);
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

export const twoStepVerification =
  ({ otp, session, navigate }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_TWO_STEP_REQUEST });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/two-factor/otp/${otp}`,
        {},
        { params: { id: session } }
      );
      const user = response.data;
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
        console.log("Two-factor verified:", user);
        navigate("/");
      }
      dispatch({
        type: actionTypes.LOGIN_TWO_STEP_SUCCESS,
        payload: user.jwt,
      });
    } catch (error) {
      console.log("Two-step verification error:", error);
      dispatch({
        type: actionTypes.LOGIN_TWO_STEP_FAILURE,
        payload: error.response?.data ? error.response.data : error,
      });
    }
  };

// ... (other actions remain unchanged)

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt"); // Remove token from storage
    dispatch({ type: actionTypes.LOGOUT }); // Use the LOGOUT action type defined in ActionTypes
  };
};


