import { SignUp } from "@clerk/nextjs";
import Head from "next/head";
import ath from "@/styles/auth.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign up - Relatalk</title>
        <meta
          name="description"
          content="Relatalk - Connect with the loved ones"
        />
        <meta property="og:site_name" content="Relatalk" />
        <meta content="Feed - Relatalk" property="og:title" data-rh="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={ath.wrapper}>
        <SignUp />
      </div>
    </>
  );
}
