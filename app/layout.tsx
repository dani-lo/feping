import { Inter,  Ubuntu } from 'next/font/google'

import {Providers} from "@/app/providers"

import "@/app/globals.css"

import "@/src/styles/assets.scss"
import "@/src/styles/form.scss"
import "@/src/styles/icon.scss"
import "@/src/styles/layout.scss"
import "@/src/styles/list.scss"
import "@/src/styles/responsive.scss"
import '@/src/styles/sidebar.scss'
import "@/src/styles/text.scss"
import "@/src/styles/twoverwrites.scss"
import "@/src/styles/umbrl-txt.scss"
import "@/src/styles/util.scss"
import "@/src/styles/widget.scss"
import "@/src/styles/website/website.scss"

import '@/src/styles/thirdParty/react-datepicker.scss'

const inter = Inter({
  // weight: '400',
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// const interBold = Inter({
//   // weight: '500',
//   subsets: ['latin'], 
//   variable: '--font-inter-b',
//   display: 'swap',
// })

// const interBoldest = Inter({
//   // weight: '600',
//   subsets: ['latin'],
//   variable: '--font-inter-b-plus',
//   display: 'swap',
// })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={`${ inter.variable }`}>
      <body className="min-h-screen">
        <Providers>
          {children}
        </Providers>
        <script src="https://kit.fontawesome.com/cb0ef39314.js" crossOrigin="anonymous" async></script>
      </body>
    </html>
  );
}