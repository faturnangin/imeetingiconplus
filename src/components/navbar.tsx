"use client"

import * as React from "react"
import {
  Bell, ChevronDown
} from "lucide-react"

import { LogoTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  }
  return (
    <div className="fixed z-[999] w-full bg-gradient-to-r from-[#18A2BA] to-[#296377] h-[68px] flex items-center justify-between py-2 px-6">
      <LogoTrigger className="bg-transparent hover:bg-transparent" />
      <div className="flex items-center justify-center gap-1 md:gap-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <Bell size={18} className="text-white"/>
        </div>
        <div className="hidden md:flex w-10 h-10 bg-white rounded-full items-center justify-center">FN</div>
        <div className="text-[14px] text-white">Fatur</div>
        <div className="w-10 h-10 flex items-center justify-center">
          <ChevronDown size={18} className="text-white"/>
        </div>
      </div>
    </div>
  )
}
