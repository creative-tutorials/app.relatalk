import Image from "next/image";
interface Profile {
  user_id: string;
  fullName: string | null;
  profileImg: string;
  state: boolean;
  loggedIn: boolean;
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
interface TypeProps {
  profile: Profile;
  item: Posts;
  routeToPost: (postid: string) => void;
  styles: {
    readonly [key: string]: string;
  };
}
export default function PostContent({
  profile,
  item,
  routeToPost,
  styles,
}: TypeProps) {
  return (
    <div
      className={styles.post}
      style={{
        cursor: "pointer",
      }}
      onClick={() => routeToPost(item.pid)}
    >
      <div className={styles.top}>
        <div className={styles.profileImage}>
          {profile.state ? (
            <Image
              src={item.profileImg}
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
              src="/v1072-037-c-kvhh08mp.jpg"
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
        <div className={styles.profileName}>
          <span>{profile.state ? item.username : "Anonymous"}</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.text}>
          <p>{item.content}</p>
        </div>
        {item.imageURL !== "" && (
          <div className={styles.uploadImage}>
            <Image
              src={item.imageURL}
              width={500}
              height={600}
              alt="Picture of the author"
            />
          </div>
        )}
        <div className={styles.interactions}>
          <div className={styles.like} id={styles.interact}>
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
            <span>{item.interactions.likes}</span>
          </div>
          <div className={styles.comment} id={styles.interact}>
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
            <span>{item.interactions.comments}</span>
          </div>
          <div className={styles.share} id={styles.interact}>
            <svg
              width="20"
              height="20"
              fill="#444C5B"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.5 5.677c-.287.43-.614.834-.975 1.204a9.09 9.09 0 0 1-1.179 1.02c.014.189.02.377.021.566 0 .86-.091 1.711-.276 2.553a12.695 12.695 0 0 1-.801 2.44 12.664 12.664 0 0 1-1.896 3.06 11.65 11.65 0 0 1-2.58 2.282 11.753 11.753 0 0 1-3.143 1.425c-1.16.332-2.361.498-3.568.493a12.264 12.264 0 0 1-3.44-.487A11.881 11.881 0 0 1 1.5 18.78a8.643 8.643 0 0 0 6.378-1.785 4.262 4.262 0 0 1-3.41-1.785 4.32 4.32 0 0 1-.61-1.2c.136.02.272.039.405.052.515.05 1.035.005 1.533-.133a4.213 4.213 0 0 1-1.389-.543 4.412 4.412 0 0 1-1.092-.95 4.259 4.259 0 0 1-.975-2.733v-.05a4.175 4.175 0 0 0 1.959.544 4.414 4.414 0 0 1-1.404-1.56 4.432 4.432 0 0 1-.38-.974 4.417 4.417 0 0 1 .011-2.18 3.86 3.86 0 0 1 .441-1.039 11.886 11.886 0 0 0 1.824 1.82 12.323 12.323 0 0 0 4.512 2.287c.83.223 1.683.355 2.542.395a3.224 3.224 0 0 1-.087-.488 4.9 4.9 0 0 1-.025-.496c0-.596.112-1.155.339-1.677a4.338 4.338 0 0 1 2.292-2.292 4.18 4.18 0 0 1 1.675-.338 4.27 4.27 0 0 1 3.149 1.364 8.55 8.55 0 0 0 2.727-1.047 4.223 4.223 0 0 1-1.887 2.379 8.556 8.556 0 0 0 2.472-.674v-.001Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
