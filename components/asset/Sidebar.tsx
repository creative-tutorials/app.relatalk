import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface PropsTypes {
  styles: {
    readonly [key: string]: string;
  };
  isSidebar: boolean;
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
}
export default function Sidebar({
  styles,
  isSidebar,
  setIsSidebar,
}: PropsTypes) {
  const closeSidebar = () => {
    setIsSidebar(false);
  };
  return (
    <div className={styles.sidebar} id={isSidebar ? styles.open : ""}>
      <div className={styles.sideTop}>
        <button>New Post</button>
        <div className={styles.close} onClick={closeSidebar}>
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#787c88"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 16 8 8"></path>
            <path d="m16 8-8 8"></path>
          </svg>
        </div>
      </div>
      <div className={styles.sideBottom}>
        <div className={styles.Links}>
          <Link href="/">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m19.659 9.374-7-6.125a1 1 0 0 0-1.318 0l-7 6.125a1 1 0 0 0-.341.753v8.872a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8.872a1 1 0 0 0-.341-.753Z"></path>
            </svg>
            Home
          </Link>
          <Link href="/activity">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 20S3 14.988 3 8.972c0-6.015 7-6.516 9-1.81 2-4.706 9-4.205 9 1.81C21 14.988 12 20 12 20Z"></path>
            </svg>
            Activity
          </Link>
          <Link href="/expore=">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
              <path d="m15 15 6 6"></path>
            </svg>
            Explore
          </Link>
          <Link href="/profile">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 21c0-2.761 3.582-5 8-5s8 2.239 8 5"></path>
              <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
            </svg>
            Profile
          </Link>
          <Link href="/groups">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 20c0-1.657 2.239-3 5-3s5 1.343 5 3"></path>
              <path d="M18 14.25c1.766.463 3 1.52 3 2.75"></path>
              <path d="M6 14.25c-1.766.463-3 1.52-3 2.75"></path>
              <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M18 10.236a3 3 0 1 0-4-4.472"></path>
              <path d="M6 10.236a3 3 0 0 1 4-4.472"></path>
            </svg>
            Groups
          </Link>
          <Link href="/messages">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 10a6 6 0 0 1-9.21 5.07L3 16l.93-2.79A6 6 0 1 1 15 10Z"></path>
              <path d="M9.336 15.99a6.003 6.003 0 0 0 8.872 3.08l2.79.93-.93-2.79.142-.236A6 6 0 0 0 14.998 8l-.225.004-.113.006"></path>
            </svg>
            Messages
          </Link>
          <Link href="/trending">
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m20 7-7.385 7.5-3.077-3.125L4 17"></path>
              <path d="M20 13V7h-6"></path>
            </svg>
            Trending
          </Link>
          <Link href="/connect">
            <svg
              width="23"
              height="23"
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 8.89a3 3 0 0 1 1 5.83v5.17h-2v-5.17a3.001 3.001 0 0 1 1-5.83Zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                clipRule="evenodd"
              ></path>
              <path d="M7.05 6.938A6.978 6.978 0 0 0 5 11.887c0 2.177.994 4.122 2.554 5.406l1.423-1.424A4.992 4.992 0 0 1 7 11.887c0-1.38.56-2.63 1.464-3.535L7.05 6.937Z"></path>
              <path d="M15.535 8.352A4.984 4.984 0 0 1 17 11.887c0 1.626-.776 3.07-1.977 3.983l1.423 1.424A6.986 6.986 0 0 0 19 11.887a6.978 6.978 0 0 0-2.05-4.95l-1.415 1.415Z"></path>
              <path d="M1 11.887C1 8.85 2.231 6.1 4.222 4.11l1.414 1.415A8.972 8.972 0 0 0 3 11.887a8.972 8.972 0 0 0 2.636 6.364l-1.414 1.415A10.966 10.966 0 0 1 1 11.887Z"></path>
              <path d="M19.779 19.666A10.965 10.965 0 0 0 23 11.888c0-3.038-1.23-5.788-3.22-7.779l-1.415 1.415A8.972 8.972 0 0 1 21 11.888a8.972 8.972 0 0 1-2.636 6.364l1.415 1.414Z"></path>
            </svg>
            Connect
          </Link>
        </div>
      </div>
    </div>
  );
}
