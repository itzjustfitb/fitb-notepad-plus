import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

function Header() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });
  const { user } = useUser();

  const settingDefaultTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="w-full flex justify-between items-center h-24">
      <div className="container flex justify-between items-center">
        <h1 className="text-lg sm:text-3xl sm:font-bold dark:text-white">
          FITB Notepad+
        </h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={settingDefaultTheme}
            className="flex justify-center items-center w-3 h-3 p-3 sm:w-5 sm:h-5 sm:p-5 dark:text-white bg-white/20 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm border border-white/30 hover:opacity-60 duration-700"
          >
            <i
              className={`${
                theme !== "light" ? "ri-sun-line" : "ri-moon-fill"
              } sm:text-xl`}
            ></i>
          </button>
          <SignedOut>
            <button className="flex justify-center items-center p-3  sm:p-2 dark:bg-white/20 text-white bg-black  rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm border border-white/30 hover:opacity-60 duration-700">
              <SignInButton />
            </button>
          </SignedOut>
          <SignedIn>
            <div className="flex w-10 h-10 rounded-full border-white border-2 ">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
