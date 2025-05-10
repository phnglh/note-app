import RegisterContainer from '@/components/auth/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Page',
};
export default function Register() {
  return <RegisterContainer />;
}
