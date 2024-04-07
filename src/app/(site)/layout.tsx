import { NextAuthProvider } from "@/lib/providers";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: RootLayoutProps) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default layout;
