"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/api/useUsers";

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [logs, setLogs] = useState({ email: "", password: "" });

  return (
    <div className="flex items-center justify-center py-12 h-full">
      <form className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={logs.email}
              onChange={(e) => setLogs({ ...logs, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              value={logs.password}
              onChange={(e) => setLogs({ ...logs, password: e.target.value })}
              id="password"
              type="password"
              placeholder="*****"
              required
            />
          </div>
          <Button type="button" onClick={() => signIn(logs)} className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
