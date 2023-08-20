"use client";

import { SiteHeader } from "@/components/site-header";
import { useSession } from "next-auth/react";

export default function IndexPage() {

  const { data: session } = useSession();

  return (
    <section className="">
      <div>
        <SiteHeader />
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </section>
  )
}
