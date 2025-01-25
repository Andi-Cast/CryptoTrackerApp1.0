import type { AppProps } from 'next/app';
import '../app/styles/globals.css';  
import Header from '@/app/components/Header';
import { AuthProvider } from '@/app/context/AuthProvider';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <div className='flex flex-col w-full h-full mt-0 justify-center items-center'>
          <Header/>
          <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default MyApp;
