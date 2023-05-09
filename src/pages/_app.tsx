import '@/styles/globals.css'
import '@/styles/swiper.css'
import '@/styles/codeblock.css'
import '@/styles/swipe_animation.scss'
import '@/styles/theme_toggle.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" data-theme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
