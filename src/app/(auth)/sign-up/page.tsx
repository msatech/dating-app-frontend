import React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="font-bold text-3xl md:text-4xl text-blue-500">Loving-O</h1>
      <h2 className="text-xl md:text-2xl text-gray-800 font-bold mt-4 dark:text-gray-100">
        Create an Account
      </h2>
      <p className="text-gray-400 text-sm mt-2">Welcome back!</p>

      <div className="my-4 flex flex-col space-y-4 max-w-md">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button variant="default"> Create an account </Button>
        <p className="text-gray-500 text-sm">Already have an account? <Link href="/sign-in" className="text-blue-600 hover:underline transition-all duration-150">Login</Link> </p>
      </div>
    </div>
  )
}

export default page
