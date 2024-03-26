import { useContext, useEffect, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const SignupSignIn = () => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setLoggedinUserName, setId } = useContext(UserContext);
  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };
  const apiEndPoint = import.meta.env.BASE_URL
  useEffect(() => {
    console.log(apiEndPoint)
    
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    // register();
    const url =
      activeTab === "sign-in"
        ? `${apiEndPoint}login`
        : `${apiEndPoint}register`;

    const { data } = await axios.post(url, { username, password, email });

    setLoggedinUserName(username);
    setId(data.id);
    // Handle form submission logic here
  };

  const renderInputField = (Icon, typeValue, value, setState, placeholder) => (
    <div className="relative flex items-center mt-8">
      <span className="absolute">
        <Icon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
      </span>

      <input
        type={typeValue}
        value={value}
        onChange={(e) => handleInputChange(e, setState)}
        className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300 ease-in scroll-smooth"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <section className="bg-white dark:bg-gray-900 pattern">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form
          className="w-full max-w-md"
          onSubmit={handleSubmit}
          type="multipart/form-data"
        >
          <div className="flex justify-center mx-auto">
            <Link href="/">
              <img
                className="w-auto h-[150px] sm:h-[150px] md:h-[200px] lg:h-[200px] rounded-full bg-transparent"
                src="/chat-logo.png"
                alt="chat-app logo"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6 transition-all duration-300 ease-in">
            <Link
              href="/signin"
              // href="#"
              className={`w-1/3 pb-4 font-medium text-center capitalize scroll-smooth cursor-pointer ${
                activeTab === "sign-in"
                  ? "text-gray-800 border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                  : "text-gray-500 border-b dark:border-gray-400 dark:text-gray-300 scroll-smooth cursor-pointer"
              }`}
              onClick={() => setActiveTab("sign-in")}
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              // href="#"
              className={`w-1/3 pb-4 font-medium text-center capitalize scroll-smooth cursor-pointer ${
                activeTab === "sign-up"
                  ? "text-gray-800 border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                  : "text-gray-500 border-b dark:border-gray-400 dark:text-gray-300 scroll-smooth cursor-pointer "
              }`}
              onClick={() => setActiveTab("sign-up")}
            >
              Sign Up
            </Link>
          </div>

          {activeTab === "sign-in" ? (
            <>
              {renderInputField(
                User,
                "text",
                username,
                setUserName,
                "Username"
              )}
              {renderInputField(
                Lock,
                "password",
                password,
                setPassword,
                "Password"
              )}
            </>
          ) : (
            <>
              {renderInputField(
                User,
                "text",
                username,
                setUserName,
                "Username"
              )}
              {/* {renderFileInputField(Upload)} */}
              {renderInputField(
                Mail,
                "email",
                email,
                setEmail,
                "Email address"
              )}
              {renderInputField(
                Lock,
                "password",
                password,
                setPassword,
                "Password"
              )}
              {renderInputField(
                Lock,
                "password",
                confirmPassword,
                setConfirmPassword,
                "Confirm Password"
              )}
              {/* password check  */}
              {password !== "" && confirmPassword !== "" ? (
                password === confirmPassword ? (
                  <p className="text-green-500 mt-2">Passwords match</p>
                ) : (
                  <p className="text-red-500 mt-2">Passwords do not match</p>
                )
              ) : password !== "" ? (
                <p className="text-green-500 mt-2">Typing Password</p>
              ) : null}
            </>
          )}

          <div className="mt-6">
            <button
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              type="submit"
            >
              {activeTab === "sign-in" ? "sign In" : "sign Up"}
            </button>

            <div className="mt-6 text-center">
              <a
                // href="#"
                className="cursor-pointer text-sm text-blue-500 hover:underline dark:text-blue-400"
                onClick={() =>
                  setActiveTab(activeTab === "sign-in" ? "sign-up" : "sign-in")
                }
              >
                {activeTab === "sign-in"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupSignIn;
