import Image from "next/image";
import AuthForm from "./AuthForm";

export function Dashboard() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <AuthForm />
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
