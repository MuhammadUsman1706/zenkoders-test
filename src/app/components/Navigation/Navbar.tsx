"use client";
import { FC, Fragment, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigationList } from "../../models/navigationModel";
import clsx from "clsx";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { page } from "../../models/navigationModel";
import axios from "axios";

const Navbar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<Boolean>(false);

  const openDrawer = () => {
    setShowMenu(true);
    document.documentElement.style.overflowY = "hidden";
  };
  const closeDrawer = () => {
    setShowMenu(false);
    document.documentElement.style.overflowY = "auto";
  };

  const logoutHandler = async () => {
    await axios.post("/api/logout");
    router.push("/");
  };

  if (pathname === "/") return null;

  return (
    <Fragment>
      <nav className="border-gray-200 dark:bg-gray-900 relative z-50 mb-10">
        <div
          id="backdrop"
          onClick={closeDrawer}
          className={`${
            showMenu ? "" : "hidden"
          } backdrop-blur-sm absolute w-[100vw] h-[100vh] bg-gray-400/50 max-[900px]:z-50`}
        />
        <div className="max-lg:max-w-[95%] max-w-[90%] flex flex-wrap items-center justify-between mx-auto p-4 ">
          <a href="http://localhost:3000" className="flex items-center">
            <img
              src="/images/zenbulletin-logo.png"
              className="h-8 mr-3"
              alt="ZenBulletin Logo"
            />
            <span className="self-center text-2xl whitespace-nowrap dark:text-white">
              ZenBulletin
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[900px]:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={openDrawer}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full min-[900px]:block min-[900px]:w-auto max-[900px]:z-50"
            id="navbar-default"
          >
            <ul className="font-small flex flex-col p-4 min-[900px]:p-0 mt-4 border border-gray-100 rounded-lg min-[900px]:flex-row min-[900px]:space-x-14 min-[900px]:mt-0 min-[900px]:border-0 dark:bg-gray-800 min-[900px]:dark:bg-gray-900 dark:border-gray-700">
              {navigationList.map((page: page) => (
                <li key={page.text}>
                  <a
                    href={page.href}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 min-[900px]:hover:bg-transparent min-[900px]:border-0 min-[900px]:hover:text-blue-700 min-[900px]:p-0 dark:text-white min-[900px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[900px]:dark:hover:bg-transparent"
                  >
                    {page.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden min-[900px]:block ">
            <button
              onClick={logoutHandler}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-small  text-sm px-5 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div
          id="drawer-navigation"
          className={`${
            showMenu ? "left-[250px]" : "left-[0px]"
          } transition-[left] fixed top-0 h-screen overflow-y-auto -translate-x-full bg-white w-64 dark:bg-gray-800 z-50 `}
          tabIndex={-1}
          aria-labelledby="drawer-navigation-label"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <img
                src="/images/zenbulletin-logo.png"
                className="h-8"
                alt="ZenBulletin"
              />
              <h5
                id="drawer-navigation-label"
                className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
              >
                ZenBulletin
              </h5>
            </div>
            <button
              type="button"
              data-drawer-hide="drawer-navigation"
              aria-controls="drawer-navigation"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeDrawer}
            >
              <KeyboardArrowLeftIcon />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="overflow-y-auto py-2">
            <ul className="space-y-2 font-medium">
              {navigationList.map((page: page) => (
                <li
                  className={clsx("px-3 py-2 !mt-0", {
                    "bg-gray-300": pathname === page.href,
                  })}
                  key={page.text}
                >
                  <a
                    href={page.href}
                    className={clsx(
                      "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-md",
                      {
                        "text-blue-700": pathname === page.href,
                      },
                      {
                        "text-gray-500": pathname !== page.href,
                      }
                    )}
                  >
                    {page.icon}
                    <span
                      className={clsx(
                        "ml-3 text-md",
                        {
                          "text-blue-700": pathname === page.href,
                        },
                        {
                          "text-black": pathname !== page.href,
                        }
                      )}
                    >
                      {page.text}
                    </span>
                  </a>
                </li>
              ))}
              <li className="px-6 py-2 !mt-0 flex justify-between">
                <button
                  type="button"
                  className="py-4 px-5 mr-2 mb-2 text-sm font-small focus:outline-none rounded-lg bg-gray-100 text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={logoutHandler}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
