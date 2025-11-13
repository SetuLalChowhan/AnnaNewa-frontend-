"use client"
import { useEmailStore } from '@/providers/useState'
import React from 'react'

const page = () => {

  const email =useEmailStore((state) => state.email);

  console.log(email);
  return (
    <div>page</div>
  )
}

export default page