"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const links = [{ name: "profile", path: "/profile" }];

export const NavLinks = () => {
  const params = useParams<{ platform: string; feature: string }>();

  return (
    <>
      {links.map((link) => (
        <Button
          key={link.path}
          variant="link"
          size="lg"
          className="px-0"
          asChild
        >
          <Link href={link.path}>{link.name}</Link>
        </Button>
      ))}
    </>
  );
};
