"use client"

import React, { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    })
  }

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="font-bold text-3xl md:text-4xl text-blue-500">Loving-O</h1>
      <h2 className="text-xl md:text-2xl text-gray-800 font-bold mt-4 dark:text-gray-100">
        Log in to your Account
      </h2>
      <p className="text-gray-400 text-sm mt-2">Welcome back!</p>

      <form onSubmit={handleSubmit}>
        <div className="my-4 flex flex-col space-y-4 max-w-md">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button variant="default" type="submit">
            {" "}
            Login{" "}
          </Button>
        </div>
      </form>
      <p className="text-gray-500 text-sm">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="text-blue-600 hover:underline transition-all duration-150"
        >
          Create an account
        </Link>{" "}
      </p>
    </div>
  )
}

export default page
