import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('../components/auth/LoginForm'), { ssr: false });



export default function Home() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
