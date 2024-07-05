
import { twWsParagraph } from "@/src/styles/text.tailwind"
import Image from "next/image"

export default function Home() {
  
  return <div className="website">
      <div>
      <Image 
        src="/bg_abstract v2-mobile-top-left.svg"
        width={109}
        height={210}
        alt="bg img mob left top"
        id="bg-img-mob-top-left"
        className="bg-img-mob"
      />
      <Image 
        src="/bg_abstract v2-mobile-top-right.svg"
        width={162}
        height={188}
        alt="bg img mob right top"
        id="bg-img-mob-top-right"
        className="bg-img-mob"
      />
      <Image 
        src="/bg_abstract v2-mobile-bottom-right.svg"
        width={148}
        height={162}
        alt="bg img mob right bottom"
        id="bg-img-mob-bottom-right"
        className="bg-img-mob"
      />
      <Image 
        src="/bg_abstract v2-mobile-bottom-left.svg"
        width={127}
        height={238}
        alt="bg img mob left bottom"
        id="bg-img-mob-bottom-left"
        className="bg-img-mob"
      />
      </div>
    <main className="min-h-screen">
      <div className="container">
        <Image 
          src="/bg_abstract-lhs.svg"
          width={247}
          height={663}
          alt="bg asbtract left"
          id="bg-img-lhs"
        />
        <Image 
          src="/bg_abstract-rhs.svg"
          width={234}
          height={663}
          alt="bg asbtract right"
          id="bg-img-rhs"
        />
        <div className="content">
          <Image 
            src="/umbrl-logo.svg"
            width={200}
            height={200}
            alt="Umbrl Logo"
            id="logo-img"
          />
          <Image 
            src="/umbrl-logo.svg"
            width={150}
            height={150}
            alt="Umbrl Logo Mobile"
            id="logo-img-mob"
          />
          <h1>hassle-free cover<br />for your home</h1>
          <p className={ `${ twWsParagraph } descript mob` }>
            Buying insurance shouldn&apos;t be complicated. That&apos;s why we&apos;ve made it simple, clear and above all, quick.
          </p>
          <p className={ `${ twWsParagraph } descript` }>
            Buying insurance shouldn&apos;t be complicated.<br />
            That&apos;s why we&apos;ve made it simple, clear and <br /> 
            above all, quick.
          </p>
          <div className="evidence-block">
            <p className={ twWsParagraph }>Launching summer &apos;24</p>
          </div>
          <p className={ twWsParagraph }>
            <a href="https://linkedin.com/company/umbrl/">
              <span className="mr-2">Follow us for careers with Umbrl and other news</span>
              <i aria-hidden className="fa-brands fa-linkedin-in widget-linkedin"></i>
            </a> 
          </p>
        </div>
      </div>
    </main>
  </div>
}