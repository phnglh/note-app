import LoginContainer from '@/components/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Page',
};
export default function Login() {
  return <LoginContainer />;
}
