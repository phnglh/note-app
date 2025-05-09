'use client'
import { auth } from "@/config/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"

const scheme = z.object({
  email: z.string().email({message: "Email không hợp lệ!"}),
  password: z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự"})
})

type RegisterForm = z.infer<typeof scheme>

export default function Register() {

  const router = useRouter()
  const {register,handleSubmit,formState: {errors}} = useForm<RegisterForm>({
    resolver: zodResolver(scheme)
  }
  )



  const handleRegister = async (data: RegisterForm) => {
    try {
      const {email,password} = data
      const result = await createUserWithEmailAndPassword(auth, email, password); 
      console.log("result", result)
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (<main>
    <form onSubmit={handleSubmit(handleRegister)}>
    <div>
        <label>Email:</label>
        <input className="border" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input className="border" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button className="border rounded" type="submit">Đăng ký</button>
    </form>
  </main>)
}
