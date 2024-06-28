"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TableEvents from "@/components/layout/profile/TableEvents";
import { PartysForm } from "@/components/forms/PartysForm";
import FilterEvents from "@/components/layout/profile/FilterEvents";
import PaginantionEvents from "@/components/layout/profile/PaginantionEvents";
import { useUserEvents } from "@/hooks/api/useEvents";
import { Loader } from "lucide-react";

export default function Component() {
  const { userEvents, userEventsError, userEventsLoading } = useUserEvents();

  if (userEventsError?.response?.data.statusCode === 401) {
    return <div>You need to login to view this page</div>;
  }

  if (userEventsError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Manage your events and view participant details.
            </CardDescription>
          </CardHeader>
          {userEventsLoading ? (
            <CardContent className="w-full h-full flex justify-center items-center">
              <Loader className="animate-spin" />
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <FilterEvents />
                <PartysForm />
              </div>
              <TableEvents {...userEvents} />
            </CardContent>
          )}
          <CardFooter>
            <PaginantionEvents />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
