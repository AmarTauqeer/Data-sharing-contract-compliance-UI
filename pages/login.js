"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
// import "bootstrap/dist/css/bootstrap.css";
// import "./login.css"

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    router.push("/dashboard");
  };

  const onRegister = (data) => {
    console.log(data);
    router.push("/login");
    window.location.reload(false);
  };
  return (
    <>
      <Head>
        <script src="../js/loginscreen.js" defer></script>
      </Head>
      <div className="login-div">
        <div class="login-container" id="login-container">
          <div class="form-container sign-up-container">
            <form key={2} onSubmit={handleSubmit(onRegister)}>
              <h2 className="mb-5">Create Account</h2>
              <div className="input-group mb-3">
                <input
                  placeholder="enter email"
                  name="email"
                  {...register2("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors2.email?.type === "required" && "email is required"}
                {errors2.email?.type === "pattern" && "email is invalid"}
              </error>
              <div className="input-group mb-3">
                <input
                  placeholder="enter password"
                  type="password"
                  {...register2("password", {
                    required: true,
                    minLength: 4,
                  })}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors2.password?.type === "required" &&
                  "password is required"}
                {errors2.password?.type === "minLength" &&
                  "password length must be greator or equal 4"}
              </error>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleSubmit2(onRegister)}
                  style={{ borderRadius: "25px" }}
                >
                  SIGN UP
                </button>
              </div>
            </form>
            <button>Sign Up</button>
          </div>
          <div class="form-container sign-in-container">
            <form key={1} onSubmit={handleSubmit(onSubmit)}>
              <h2 className="mb-5">Sign in</h2>
              <div className="input-group mb-3">
                <input
                  placeholder="enter email"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors.email?.type === "required" && "email is required"}
                {errors.email?.type === "pattern" && "email is invalid"}
              </error>
              <div className="input-group mb-3">
                <input
                  placeholder="enter password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                  })}
                />
              </div>
              <error className="mb-2" style={{ color: "red" }}>
                {errors.password?.type === "required" && "password is required"}
                {errors.password?.type === "minLength" &&
                  "password length must be greator or equal 4"}
              </error>
              <div className="d-grid gap-2 mt-5">
                <button
                  onClick={handleSubmit(onSubmit)}
                  style={{ borderRadius: "25px" }}
                >
                  LOGIN
                </button>
              </div>
            </form>
            {/* <a href="#">Forgot your password?</a>
          <button>Sign In</button> */}
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  style={{ borderRadius: "25px" }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  style={{ borderRadius: "25px" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
