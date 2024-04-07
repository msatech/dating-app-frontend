"use client";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { axiosAuth } from "@/lib/axios";
import { useEffect } from "react";

export default function IndexPage() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get('/users');
        console.log(response)
        // Process the response data here if needed
      } catch (error) {
        // Handle errors here
      }
    };
  
    fetchData(); // Call the async function
  
    // Optionally, you can return a cleanup function here if needed
    return () => {
      // Cleanup logic (if applicable)
    };
  }, []);

  return (
    <section className=""> 
      <div>
        <SiteHeader />
      </div>
    </section>
  )
}
