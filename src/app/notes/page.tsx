import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notes Page",
  description: ""
}
export default function Notes() { 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Notes</h1>
      </div>
  )
}
