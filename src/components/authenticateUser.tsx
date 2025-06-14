"use client";
import React from "react";
import { authenticate, refresh } from "@/repositories/auth";

export default function AuthenticateUser({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const auth = async () => {
      try {
        await authenticate();
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };

    auth();
  }, []);

  if (!isReady) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
