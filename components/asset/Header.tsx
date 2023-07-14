import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
interface stylesProp {
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
  styles: {
    readonly [key: string]: string;
  };
}
export default function Header({ setIsSidebar, styles }: stylesProp) {
  return (
    <header>
      <div className={styles.header_menu}>
        <svg
          width="25"
          height="25"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            cursor: "pointer",
          }}
          onClick={() => setIsSidebar(true)}
        >
          <path d="M5 17h14"></path>
          <path d="M5 12h14"></path>
          <path d="M5 7h8"></path>
        </svg>
      </div>
      <div className={styles.header_cols}>
        <div className={styles.header_col_2}>
          <Link href="/">For you</Link>
        </div>
        <div className={styles.header_col_3}>
          <Link href="/following">Following</Link>
        </div>
      </div>
    </header>
  );
}
