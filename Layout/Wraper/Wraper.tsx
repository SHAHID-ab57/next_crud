"use client"
import dynamic from 'next/dynamic'
import React from 'react'

let Header = dynamic(()=>import("@/Layout/Header/Header"))
let Footer = dynamic(()=>import("@/Layout/Footer/Footer"))
const Wraper = ({children}:any) => {
  return (
    <div>
       <Header />
        {children}
        <Footer />
    </div>
  )
}

export default Wraper
