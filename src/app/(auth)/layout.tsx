import React from "react"

interface RootLayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: RootLayoutProps) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-screen max-h-screen">
      <div className="flex justify-center items-center xl:p-40 p-10">{children}</div>
      <div className="bg-blue-300 h-full md:block hidden"></div>
    </div>
  )
}

export default layout
