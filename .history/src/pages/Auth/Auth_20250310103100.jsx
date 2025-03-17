import "./Auth.css";
import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useLocation, useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
import { useEffect } from "react";
//import { Card } from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPassword";
//import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { useSelector } from "react-redux";
import CustomeToast from "@/components/custome/CustomeToast";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  // If user is already authenticated, redirect to home page.
  useEffect(() => {
    if (auth.jwt) {
      navigate("/");
    }
  }, [auth.jwt, navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="authContainer h-screen relative">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50"></div>

      <div
        className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white"
      >
        <CustomeToast show={auth.error} message={auth.error?.error} />

        <h1 className="text-6xl font-bold pb-9">Zosh Trading</h1>

        {location.pathname === "/signup" ? (
          <section className="w-full login">
            <div className="loginBox w-full px-10 space-y-5">
              <SignupForm />
              <div className="flex items-center justify-center">
                <span>{"already have an account?"}</span>
                <Button onClick={() => handleNavigation("/signin")} variant="ghost">
                  Sign in
                </Button>
              </div>
            </div>
          </section>
        ) : location.pathname === "/forgot-password" ? (
          <section className="p-5 w-full">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center mt-5">
              <span>Back To Login?</span>
              <Button onClick={() => navigate("/signin")} variant="ghost">
                Sign in
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full login">
            <div className="loginBox w-full px-10 space-y-5">
              <LoginForm />
              <div className="flex items-center justify-center">
                <span>{"Don't have an account?"}</span>
                <Button onClick={() => handleNavigation("/signup")} variant="ghost">
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={() => navigate("/forgot-password")} variant="outline" className="w-full py-5">
                  Forgot Password?
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
