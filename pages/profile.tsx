import { useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import pf from "@/styles/profile.module.css";
import styles from "@/styles/Home.module.css";
import Header from "@/components/asset/Header";
import Sidebar from "@/components/asset/Sidebar";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileProps {
  username: string;
  fullName: string | null;
  imageURL: string;
}
export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [counter, setCounter] = useState(0);
  const [profile, setProfile] = useState<ProfileProps>({
    username: "",
    fullName: "",
    imageURL: "",
  });

  const [isSidebar, setIsSidebar] = useState(true);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const fetchProfileData = async () => {
    if (isSignedIn) {
      setProfile({
        ...profile,
        fullName: user.fullName,
        imageURL: user.imageUrl,
      });
    }
  };
  const showProfileModal = async () => {
    setIsUserProfile(true);
  };
  const hideProfileModal = async () => {
    setIsUserProfile(false);
  };
  useEffect(() => {
    if (!isLoaded) {
      return;
    } else {
      console.log("Relatalk");
    }
    setCounter((prev) => prev + 1);
    counter === 1 || (isSignedIn && fetchProfileData());
    return () => {
      setCounter(0);
    };
  }, [counter, isSignedIn]);

  return (
    <>
      <Head>
        <title>{profile.fullName} on Relatalk</title>
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
        <div className={pf.profileWrapper}>
          <div className={pf.profileFlex}>
            <div className={pf.profileImage}>
              {profile.imageURL === "" ? (
                <Image
                  src="/v1072-037-c-kvhh08mp.jpg"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <Image
                  src={profile.imageURL}
                  width={200}
                  height={200}
                  alt={"User profile picture"}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              )}
            </div>
            <div className={pf.profileInfo}>
              <div className={pf.standalone}>
                <span>Profile</span>
              </div>
              <h3 id={pf.username}>
                {profile.fullName === "" ? "Anonymous" : profile.fullName}
              </h3>
              <div className={pf.follow_count}>
                <p id={pf.following}>0 following</p>
                <p id={pf.followers}>0 followers</p>
              </div>
              <div className={pf.button_wrapper}>
                <button id={pf.resetFollowCount}>
                  Reset Metrics
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 16H5v5"></path>
                    <path d="M19.418 14.996a8 8 0 0 1-14.332 1.027"></path>
                    <path d="M14 8h5V3"></path>
                    <path d="M4.582 9.003a8 8 0 0 1 14.332-1.027"></path>
                  </svg>
                </button>
                <div className={pf.call_to_action}>
                  <button id={pf.updateProfile} onClick={showProfileModal}>
                    Update profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isUserProfile && (
          <div className={pf.userPfBx}>
            <div className={pf.close} onClick={hideProfileModal}>
              <svg
                width="30"
                height="30"
                fill="#ffffff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path d="M6.226 4.809A1 1 0 0 0 4.81 6.223l5.775 5.774-5.775 5.775a1 1 0 1 0 1.415 1.414L12 13.412l5.775 5.774a1 1 0 0 0 1.414-1.414l-5.774-5.775 5.774-5.774a1 1 0 0 0-1.414-1.414L12 10.583 6.226 4.81Z"></path>
              </svg>
            </div>
            <UserProfile />
          </div>
        )}
        <Sidebar
          styles={styles}
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
        />
      </main>
    </>
  );
}
