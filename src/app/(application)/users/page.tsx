"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/hooks/api/useUsers";
import { Loader } from "lucide-react";
import React from "react";

function Page() {
  const { users, usersLoading, usersError } = useUsers();

  if (usersError) {
    return <div>Error</div>;
  }

  if (usersLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-20 py-12">
      {users?.data.map((user) => (
        <Card key={user.id} className="hover:shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Page;
