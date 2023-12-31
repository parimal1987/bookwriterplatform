import { Register } from '@/components'
import isloggedin from '@/utils/Auth'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Generated by create next app',
}

function register() {
  isloggedin()
  return (
    <Register />
  )
}

export default register