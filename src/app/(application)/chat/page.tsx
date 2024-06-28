"use client";

import Chat from "@/components/chat/Chat";
import { Card } from "@/components/ui/card";
import { useUser, useUsers } from "@/hooks/api/useUsers";
import { Loader } from "lucide-react";
import React from "react";

function Page() {
  const { users, usersLoading, usersError } = useUsers();

  const { user, userError } = useUser(1);

  if (usersError) {
    return <div>Error</div>;
  }

  console.log(users);

  return (
    <section className="flex gap-4 h-screen overflow-hidden">
      <aside className="w-1/5 text-white bg-primary p-4 space-y-4">
        {usersLoading ? (
          <Loader className="animate-spin" />
        ) : (
          users?.data.map((user) => {
            if (!user.isOrganizer) return null;

            return (
              <Card
                className="flex flex-col items-start justify-center p-2 hover:bg-slate-200 cursor-pointer"
                key={user.id}
              >
                {user.name}
                <p className="flex flex-col gap-2">
                  <span>Managing those events: </span>
                  {user.events?.map((event: any) => (
                    <span className="pl-4" key={event.id}>
                      {" "}
                      - {event.name}
                    </span>
                  ))}
                </p>
              </Card>
            );
          })
        )}
        TIME LEFT PAS FINI
      </aside>
      <Chat />
    </section>
  );
}

export default Page;
