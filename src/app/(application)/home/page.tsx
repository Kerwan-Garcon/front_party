"use client";

import PartyCards from "@/components/cards/PartyCards";
import { HerosComponent } from "@/components/layout/home/hero/HeroSwitcher";
import { useEvents } from "@/hooks/api/useEvents";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";

function Page() {
  const { events, eventsError, eventsLoading } = useEvents();
  const { get } = useCookies();

  const router = useRouter();

  if (eventsError?.response?.data.statusCode === 401 || !get("token")) {
    toast.error("You need to login to view this page", {
      duration: 5000,
    });
    return router.push("/");
  }
  const eventsData = events?.data || [];

  return (
    <div>
      <HerosComponent />
      <section className="px-16 py-8">
        <h2 className="font-bold text-4xl text-primary">Parties</h2>
        <main className="grid grid-cols-2 lg:grid-cols-5 w-full gap-8 py-8">
          {eventsLoading ? "Loading..." : <PartyCards partys={eventsData} />}
        </main>
      </section>
    </div>
  );
}

export default Page;
