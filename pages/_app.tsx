import "@/styles/globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{ baseTheme: dark }}
      {...pageProps}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
