import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import PostBox from "@/components/post/postBx";
import Header from "@/components/asset/Header";
import Sidebar from "@/components/asset/Sidebar";
import PostContent from "@/components/post/home/postContent";
import Loader from "@/components/animation/loader";
import styles from "@/styles/Home.module.css";
import { useRef, useState, useEffect, Fragment, use } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Client, Storage, ID } from "appwrite";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Profile {
  user_id: string;
  fullName: string | null;
  profileImg: string;
  state: boolean;
  loggedIn: boolean;
}
interface Post {
  content: string;
  imageURL: string;
}

interface Posts {
  pid: string;
  content: string;
  imageURL: string;
  profileImg: string;
  username: string;
  interactions: {
    likes: string;
    comments: string;
  };
}

const devapi = process.env.NEXT_PUBLIC_DEV_API;
const prodAPI = process.env.NEXT_PUBLIC_PROD_API;
const ProjectID: any = process.env.NEXT_PUBLIC_PROJECT_ID;
const BucketID: any = process.env.NEXT_PUBLIC_BUCKET_ID;

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [counter, setCounter] = useState(0);
  const [profile, setProfile] = useState<Profile>({
    user_id: "",
    fullName: "",
    profileImg: "",
    state: false,
    loggedIn: false,
  });
  const [toast, setToast] = useState({
    isHidden: true,
    message: "Hello World",
    type: "",
  });
  const [isSidebar, setIsSidebar] = useState(true);
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(ProjectID);

  const storage = new Storage(client);

  const textareaRef = useRef(null);
  const [text, setText] = useState("");

  const [post, setPost] = useState<Post>({
    content: "",
    imageURL: "",
  });

  const [posts, setPosts] = useState([]);

  const [isPosting, setIsPosting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState({
    state: false,
    text: "Fetching post...",
  });

  const handleChange = (event: any) => {
    const { value } = event.target;
    setText(value);
    setPost((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
    adjustTextAreaHeight();
  };

  const adjustTextAreaHeight = () => {
    const textarea: any = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const getProfileData = async () => {
    if (isSignedIn) {
      const userData = user;
      setProfile((prev: Profile) => {
        return {
          ...prev,
          user_id: userData.id,
          profileImg: userData.profileImageUrl,
          fullName: userData.fullName,
          state: true,
          loggedIn: true,
        };
      });
      await fetchPost();
    }
  };

  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && getProfileData();

    return () => {
      setCounter(0);
    };
  }, [counter, isSignedIn]);

  const uploadImage = async (e: any) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
    setIsUploading(true);
    const promise = storage.createFile(BucketID, ID.unique(), file);
    promise.then(
      async function (response) {
        fileInput.value = null;
        await getFile(response.$id);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  async function getFile(fileID: string) {
    const result = storage.getFilePreview(BucketID, fileID);
    if (!result) {
      throw new Error("no preview");
    }

    console.info("Image uploaded sucessfully");
    setIsUploading(false);
    setToast((prev) => {
      return {
        ...prev,
        isHidden: false,
        message: "Image uploaded sucessfully",
        type: "success",
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
    setPost((prev) => {
      return {
        ...prev,
        imageURL: result.href,
      };
    });
  }

  /**
   * The function `handlePost` is used to create a post by sending a request to the server with the
   * post content, user information, and image URL, and then displaying a success or error message.
   */
  const handlePost = async () => {
    if (!profile.loggedIn || !profile.fullName) {
      throw new Error("not ready to post");
    }
    setIsPosting(true);
    axios
      .post(`${prodAPI}/create/post`, {
        content: post.content,
        username: profile.fullName,
        profileImg: profile.profileImg,
        imageURL: post.imageURL,
        user_id: profile.user_id,
      })
      .then(function (response) {
        setIsPosting(false);
        setToast((prev) => {
          return {
            ...prev,
            isHidden: false,
            message: response.data.message,
            type: "success",
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
          router.reload();
        }, 3500);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsPosting(false);
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

  async function fetchPost() {
    setIsFetching({ ...isFetching, state: true, text: "Fetching post..." });
    axios
      .get(`${prodAPI}/get/posts`)
      .then(function (response) {
        setPosts(response.data);
        setIsFetching({ ...isFetching, state: false, text: "" });
      })
      .catch(function (error) {
        console.log(error.response);
        setIsFetching({ ...isFetching, state: false, text: "" });
      });
  }

  /**
   * The function `routeToPost` is used to navigate to a specific post page by appending the post ID to
   * the URL.
   * @param {string} postid - The `postid` parameter is a string that represents the unique identifier
   * of a post.
   */
  const routeToPost = (postid: string) => {
    router.push(`/post/${postid}`);
  };
  return (
    <>
      <Head>
        <title>Feed - Relatalk</title>
        <meta
          name="description"
          content="Relatalk - Connect, Play, and Share"
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
        <div className={styles.content}>
          <PostBox
            textareaRef={textareaRef}
            text={text}
            handleChange={handleChange}
            uploadImage={uploadImage}
            isPosting={isPosting}
            isUploading={isUploading}
            handlePost={handlePost}
            profile={profile}
          />
          {isFetching.state ? (
            <Loader isFetching={isFetching} />
          ) : (
            <div className={styles.wrapper}>
              <>
                {posts.map((item: Posts, index) => {
                  return (
                    <Fragment key={index}>
                      <PostContent
                        profile={profile}
                        item={item}
                        routeToPost={routeToPost}
                        styles={styles}
                      />
                      ;
                    </Fragment>
                  );
                })}
              </>
            </div>
          )}
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
