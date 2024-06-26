import { HerosComponent } from "@/components/layout/home/hero/HeroSwitcher";
import React from "react";

function Page() {
  return (
    <div>
      <HerosComponent />
      <section className="px-16 py-8">
        <h2 className="font-bold text-4xl">Partys</h2>
        List incoming
      </section>
    </div>
  );
}

export default Page;
