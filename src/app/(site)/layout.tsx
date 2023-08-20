import { NextAuthProvider } from "@/lib/providers";
import React from "react";

export const metadata = {
  title: "Loving O",
  description: "Dating app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: RootLayoutProps) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default layout;
