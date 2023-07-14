import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/asset/Header";
import Sidebar from "@/components/asset/Sidebar";
import styles from "@/styles/Home.module.css";
import posts from "@/styles/posts.module.css";
import Loader from "@/components/animation/loader";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";

interface Post {
  content: string;
  username: string;
  profileImg: string;
  date: string;
  imageURL: string;
  interactions: {
    likes: number;
    comments: number;
  };
}

export default function Post() {
  // get api url
  const devAPI = process.env.NEXT_PUBLIC_DEV_API;
  // get params
  const router = useRouter();
  const { id } = router.query;
  // userObject
  const { isLoaded, isSignedIn, user } = useUser();
  const [isFetching, setIsFetching] = useState({
    state: false,
    text: "Fetching post...",
  });
  const [isSidebar, setIsSidebar] = useState(true);
  const [counter, setCounter] = useState(0);
  const [post, setPost] = useState<Post>({
    content: "",
    username: "",
    profileImg: "",
    date: "",
    imageURL: "",
    interactions: {
      likes: 0,
      comments: 0,
    },
  });
  const [comments, setComments] = useState([]);
  const [toast, setToast] = useState({
    isHidden: true,
    message: "Hello World",
    type: "",
  });
  const fetchPost = async (id: string | string[]) => {
    setIsFetching({ ...isFetching, state: true, text: "Fetching post..." });
    axios
      .get(`${devAPI}/get/posts/${id}`)
      .then(function (response) {
        setPost(response.data);
        setIsFetching({ ...isFetching, state: false, text: "" });
      })
      .catch(function (error) {
        console.error(error.response);
        setToast((prev) => {
          return {
            ...prev,
            isHidden: false,
            message: error.response.data.error,
            type: "error",
          };
        });
        setTimeout(() => {
          setToast((prev) => {
            return {
              ...prev,
              isHidden: true,
              message: "",
              type: "",
            };
          });
        }, 3500);
        setIsFetching({ ...isFetching, state: false, text: "" });
      });
  };
  const incrementLikeCount = async () => {
    axios
      .post(`${devAPI}/update/interactions/${id}`)
      .then(function (response) {
        console.log(response.data);
        setTimeout(() => {
          router.reload();
        }, 2500);
      })
      .catch(function (error) {
        console.error(error.response);
        setToast((prev) => {
          return {
            ...prev,
            isHidden: false,
            message: error.response.data.error,
            type: "error",
          };
        });
        setTimeout(() => {
          setToast((prev) => {
            return {
              ...prev,
              isHidden: true,
              message: "",
              type: "",
            };
          });
        }, 3500);
      });
  };
  const twitterShare = () => {
    const url =
      "https://twitter.com/compose/tweet?text=" +
      encodeURIComponent(post.content);
    router.push(url);
  };
  const deletePost = async () => {
    if (!isSignedIn) {
      throw new Error("You must be signed in to delete a post");
    }
    const userID = user?.id;
    axios
      .delete(`${devAPI}/delete/post/${userID}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
        setToast((prev) => {
          return {
            ...prev,
            isHidden: false,
            message: error.response.data.error,
            type: "error",
          };
        });
        setTimeout(() => {
          setToast((prev) => {
            return {
              ...prev,
              isHidden: true,
              message: "",
              type: "",
            };
          });
        }, 3500);
      });
  };
  useEffect(() => {
    if (!id) {
      return;
    } else {
      console.log("Relatalk");
    }
    setCounter((prev) => prev + 1);
    counter === 1 || (id && fetchPost(id));
    return () => {
      setCounter(0);
    };
  }, [counter, id]);

  return (
    <>
      <Head>
        <title>Post - {post.username} on Relatalk</title>
        <meta
          name="description"
          content="Relatalk - Connect with the loved ones"
        />
        <meta property="og:site_name" content="Relatalk" />
        <meta content="Feed - Relatalk" property="og:title" data-rh="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="/app/apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/app/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/app/favicon-16x16.png"
        />
        <link rel="manifest" href="/app/site.webmanifest" />
        <link rel="icon" href="/app/favicon.ico" />
      </Head>
      <main id={styles.mainApp}>
        <Header setIsSidebar={setIsSidebar} styles={styles} />
        <div className={posts.container}>
          {isFetching.state ? (
            <Loader isFetching={isFetching} />
          ) : (
            <div className={posts.post}>
              <div className={posts.topUser}>
                <div className={posts.profile}>
                  <div className={posts.profileImg}>
                    {post.profileImg === "" ? (
                      <Image
                        src={"/v1072-037-c-kvhh08mp.jpg"}
                        width={48}
                        height={48}
                        alt="Picture of the author"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <Image
                        src={post.profileImg}
                        width={48}
                        height={48}
                        alt="Picture of the author"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                  <div className={posts.userName}>
                    <p>{post.username}</p>
                  </div>
                </div>
              </div>
              <div className={posts.postContent}>
                <div className={posts.text}>
                  <p>{post.content}</p>
                </div>
                {post.imageURL !== "" && (
                  <div className={posts.uploadImage}>
                    <Image
                      src={post.imageURL}
                      width={500}
                      height={600}
                      alt="Picture of the author"
                    />
                  </div>
                )}
                <div className={posts.postInteractions}>
                  <div className={posts.like}>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#444C5B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ cursor: "pointer" }}
                      onClick={incrementLikeCount}
                    >
                      <path d="M12 20S3 14.988 3 8.972c0-6.015 7-6.516 9-1.81 2-4.706 9-4.205 9 1.81C21 14.988 12 20 12 20Z"></path>
                    </svg>
                    <span>{post.interactions.likes}</span>
                  </div>
                  <div className={posts.comment}>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#444C5B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M21 12a9 9 0 0 1-13.815 7.605L3 21l1.395-4.185A9 9 0 1 1 21 12Z"></path>
                    </svg>
                    <span>{post.interactions.comments}</span>
                  </div>
                  <div className={posts.share}>
                    <svg
                      width="20"
                      height="20"
                      fill="#444C5B"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ cursor: "pointer" }}
                      onClick={twitterShare}
                    >
                      <path d="M22.5 5.677c-.287.43-.614.834-.975 1.204a9.09 9.09 0 0 1-1.179 1.02c.014.189.02.377.021.566 0 .86-.091 1.711-.276 2.553a12.695 12.695 0 0 1-.801 2.44 12.664 12.664 0 0 1-1.896 3.06 11.65 11.65 0 0 1-2.58 2.282 11.753 11.753 0 0 1-3.143 1.425c-1.16.332-2.361.498-3.568.493a12.264 12.264 0 0 1-3.44-.487A11.881 11.881 0 0 1 1.5 18.78a8.643 8.643 0 0 0 6.378-1.785 4.262 4.262 0 0 1-3.41-1.785 4.32 4.32 0 0 1-.61-1.2c.136.02.272.039.405.052.515.05 1.035.005 1.533-.133a4.213 4.213 0 0 1-1.389-.543 4.412 4.412 0 0 1-1.092-.95 4.259 4.259 0 0 1-.975-2.733v-.05a4.175 4.175 0 0 0 1.959.544 4.414 4.414 0 0 1-1.404-1.56 4.432 4.432 0 0 1-.38-.974 4.417 4.417 0 0 1 .011-2.18 3.86 3.86 0 0 1 .441-1.039 11.886 11.886 0 0 0 1.824 1.82 12.323 12.323 0 0 0 4.512 2.287c.83.223 1.683.355 2.542.395a3.224 3.224 0 0 1-.087-.488 4.9 4.9 0 0 1-.025-.496c0-.596.112-1.155.339-1.677a4.338 4.338 0 0 1 2.292-2.292 4.18 4.18 0 0 1 1.675-.338 4.27 4.27 0 0 1 3.149 1.364 8.55 8.55 0 0 0 2.727-1.047 4.223 4.223 0 0 1-1.887 2.379 8.556 8.556 0 0 0 2.472-.674v-.001Z"></path>
                    </svg>
                  </div>
                  <div className={posts.delete}>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#f31414c7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ cursor: "pointer" }}
                      onClick={deletePost}
                    >
                      <path d="M14 10v7"></path>
                      <path d="M10 10v7"></path>
                      <path d="M18 6H6v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6Z"></path>
                      <path d="M4 6h16"></path>
                      <path d="M15 3H9a1 1 0 0 0-1 1v2h8V4a1 1 0 0 0-1-1Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={posts.comments}>
            <div className={posts.user}>
              <div className={posts.profile}>
                <div className={posts.profileImg}>
                  <Image
                    src="/v1072-037-c-kvhh08mp.jpg"
                    width={48}
                    height={48}
                    alt="Picture of the author"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className={posts.userName}>
                  <p>Anonymous</p>
                </div>
              </div>
            </div>
            <div className={posts.comment_}>
              <div className={posts.text}>
                <p>This is a comment</p>
              </div>
              <div className={posts.postInteractions}>
                <div className={posts.like}>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#444C5B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 20S3 14.988 3 8.972c0-6.015 7-6.516 9-1.81 2-4.706 9-4.205 9 1.81C21 14.988 12 20 12 20Z"></path>
                  </svg>
                  <span>0</span>
                </div>
                <div className={posts.comment}>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#444C5B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 12a9 9 0 0 1-13.815 7.605L3 21l1.395-4.185A9 9 0 1 1 21 12Z"></path>
                  </svg>
                  <span>0</span>
                </div>
                <div className={posts.share}>
                  <svg
                    width="20"
                    height="20"
                    fill="#444C5B"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                  >
                    <path d="M22.5 5.677c-.287.43-.614.834-.975 1.204a9.09 9.09 0 0 1-1.179 1.02c.014.189.02.377.021.566 0 .86-.091 1.711-.276 2.553a12.695 12.695 0 0 1-.801 2.44 12.664 12.664 0 0 1-1.896 3.06 11.65 11.65 0 0 1-2.58 2.282 11.753 11.753 0 0 1-3.143 1.425c-1.16.332-2.361.498-3.568.493a12.264 12.264 0 0 1-3.44-.487A11.881 11.881 0 0 1 1.5 18.78a8.643 8.643 0 0 0 6.378-1.785 4.262 4.262 0 0 1-3.41-1.785 4.32 4.32 0 0 1-.61-1.2c.136.02.272.039.405.052.515.05 1.035.005 1.533-.133a4.213 4.213 0 0 1-1.389-.543 4.412 4.412 0 0 1-1.092-.95 4.259 4.259 0 0 1-.975-2.733v-.05a4.175 4.175 0 0 0 1.959.544 4.414 4.414 0 0 1-1.404-1.56 4.432 4.432 0 0 1-.38-.974 4.417 4.417 0 0 1 .011-2.18 3.86 3.86 0 0 1 .441-1.039 11.886 11.886 0 0 0 1.824 1.82 12.323 12.323 0 0 0 4.512 2.287c.83.223 1.683.355 2.542.395a3.224 3.224 0 0 1-.087-.488 4.9 4.9 0 0 1-.025-.496c0-.596.112-1.155.339-1.677a4.338 4.338 0 0 1 2.292-2.292 4.18 4.18 0 0 1 1.675-.338 4.27 4.27 0 0 1 3.149 1.364 8.55 8.55 0 0 0 2.727-1.047 4.223 4.223 0 0 1-1.887 2.379 8.556 8.556 0 0 0 2.472-.674v-.001Z"></path>
                  </svg>
                </div>
                <div className={posts.delete}>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#f31414c7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 10v7"></path>
                    <path d="M10 10v7"></path>
                    <path d="M18 6H6v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6Z"></path>
                    <path d="M4 6h16"></path>
                    <path d="M15 3H9a1 1 0 0 0-1 1v2h8V4a1 1 0 0 0-1-1Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.toast}
          id={toast.isHidden ? styles.hidden : ""}
          data-type={toast.type === "error" ? "error" : "success"}
        >
          <span>{toast.message}</span>
        </div>
        <Sidebar
          styles={styles}
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
        />
      </main>
    </>
  );
}
