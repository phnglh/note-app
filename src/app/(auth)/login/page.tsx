import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login Page"
} 
export default function Login() { 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <p className="text-lg mb-8">Please log in to continue.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login with Google</button>
    </div>
  )
}
