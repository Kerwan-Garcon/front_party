import { CookiesProvider } from "next-client-cookies/server";

export default function CookieProvider({ children }: any) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
