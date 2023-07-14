import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { MutableRefObject } from "react";
interface Profile {
  fullName: string | null;
  profileImg: string;
  state: boolean;
  loggedIn: boolean;
}
interface Props {
  textareaRef: MutableRefObject<null>;
  text: string;
  handleChange: (event: any) => void;
  uploadImage: (event: any) => void;
  isPosting: boolean;
  isUploading: boolean;
  handlePost: () => Promise<void>;
  profile: Profile;
}
export default function PostBox({
  textareaRef,
  text,
  handleChange,
  uploadImage,
  isPosting,
  isUploading,
  handlePost,
  profile,
}: Props) {
  return (
    <div className={styles.post_box}>
      <div className={styles.post_box_flex}>
        <div className={styles.pst_left}>
          <div className={styles.pst_img}>
            {profile.state ? (
              <Image
                src={profile.profileImg}
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
        </div>
        <div className={styles.pst_right}>
          <textarea
            ref={textareaRef}
            name=""
            id=""
            placeholder="Say something..."
            maxLength={500}
            value={text}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className={styles.pbBottom}>
        <div className={styles.pbImage} id={isUploading ? styles.disabled : styles.enabled}>
          <label htmlFor="upload-image">
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
              style={{
                cursor: "pointer",
              }}
            >
              <path d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"></path>
              <path d="m3 17 5.23-6.102a1 1 0 0 1 1.527.01l3.542 4.25a1 1 0 0 0 1.475.067l1.436-1.435a1 1 0 0 1 1.488.082L21 18"></path>
              <path d="M14 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
            </svg>
          </label>
          <input
            type="file"
            name=""
            id="upload-image"
            accept=".avif, .jpeg, .png, .jpg"
            onChange={uploadImage}
            hidden
          />
        </div>
        <div className={styles.pbBtn}>
          <button
            id={text === "" ? styles.disabled : styles.enabled}
            data-status={isPosting ? "disabled" : "enabled"}
            onClick={handlePost}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
