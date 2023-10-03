import { Login } from '@/components'
import isloggedin from '@/utils/Auth'

function page() {
  isloggedin()
  return (
    <Login />
  )
}

export default page