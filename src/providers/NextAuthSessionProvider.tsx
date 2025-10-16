"use client";

import { SessionProvider } from "next-auth/react";

function NextAuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchOnWindowFocus={false} refetchInterval={10 * 60}>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;
