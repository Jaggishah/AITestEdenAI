"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from "@/context/AuthContext";

export function Provider({
  children
}: Readonly<{
  children: React.ReactNode;}>) {
    const [ user, setUser ] = React.useState(null);
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT ?? ""}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
                <ConvexProvider client={convex}>
                    <AuthContext.Provider value={{ user, setUser }}>
                        {children}
                    </AuthContext.Provider>
            </ConvexProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
 
}
