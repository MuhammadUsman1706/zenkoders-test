"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const setCredentialsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Could've used formik here to make my life easier ~~
  async function authenticationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await axios.post("/api/signup", { user: credentials });
        router.push("/payment");
      } else {
        await axios.post("/api/login", { user: credentials });
        router.push("/news");
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
    setLoading(false);
  }

  return (
    // <button onClick={() => signIn()}>Sign In</button>
    <section className="h-screen max-w-[100%] p-[5%]">
      <h1 className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Hey there! Fellow News Reader!
      </h1>
      <h2 className="text-center text-xl mt-4">Make an account to continue!</h2>
      <div className="h-full">
        <div className="g-2 flex h-full flex-wrap items-center justify-center items-center lg:justify-between mx-auto gap-y-20">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
            <img
              src="/images/auth-decoration.png"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <form onSubmit={authenticationHandler}>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <TextField
                  className="w-full"
                  value={credentials.email}
                  onChange={setCredentialsHandler}
                  type="text"
                  name="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                />
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <TextField
                  className="w-full"
                  value={credentials.password}
                  onChange={setCredentialsHandler}
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                />
              </div>
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="flex justify-center gap-x-2 items-center text-black inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  disabled={loading}
                >
                  {loading && <CircularProgress size={20} />}
                  {isSignUp ? "Register" : "Login"}
                </button>
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold mt-6">
                  Don&apos;t have an account?
                  <a
                    className="cursor-pointer ms-1 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    onClick={(event) => {
                      event.preventDefault();
                      setIsSignUp((prevState) => !prevState);
                    }}
                  >
                    {isSignUp ? "Login" : "Register"}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
