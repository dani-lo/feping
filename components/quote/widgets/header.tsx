'use client'

import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { useAtom } from "jotai"

import { uiLoading, uiStateAboutModal } from "@/src/stores/jotai/uiState"
import { twBtnIcon } from '@/src/styles/text.tailwind'
import Image from 'next/image';
import { TxtTitleUmbrlLarge, TxtTitleUmbrl } from '@/components/util/txt';
import { DataLoadingComponent } from './loadingSection';
import { AboutComponent } from './about';

const AppHeader = ({ logoTxt, withBackBtn }: { logoTxt: 'full' | 'mini' | 'none'; withBackBtn ?: boolean; }) => {

    const [loading, _] = useAtom(uiLoading)

    const pathname = usePathname()
    const showMenu = pathname.indexOf('quote') !== -1

    return <>
      <AboutComponent />
      <Navbar shouldHideOnScroll>
      {/* <NavbarBrand>
        <Image src="/umbrl-logo-v5.svg" alt="umbrl logo" width="90" height="50" />
      </NavbarBrand> */}
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Our Policies
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Regulation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent>
        <div className="navbar-content fxrow">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
              <div className="action-icon">
              <i
                  aria-hidden
                  onClick={ () => setInfoModal(!infoModal) }
                  className={ ` ${ twBtnIcon } ${ !showMenu ? 'excluded' : '' } fa fa-bars` }
              />
          </div>
          </NavbarItem>*/}
          {
            withBackBtn === false ?
            <span className="text-lg" style={{ visibility: 'hidden' }}>-</span> :
            <span className="text-lg"><i className="fa fa-caret-left" /> back</span>

          }

          {
            // logoTxt === 'full' ? <TxtTitleUmbrlLarge txt="UMBRL" /> : null
            logoTxt === 'full' ? <Image src="/umbrl-logo-v5.svg" alt="umbrl logo" width="100" height="60" /> : null
          }
          {
            // logoTxt === 'mini' ? <TxtTitleUmbrl txt="UMBRL" /> : null
            logoTxt === 'mini' ? <Image src="/umbrl-logo-v5.svg" alt="umbrl logo" width="90" height="50" /> : null
          }
          <div className="action-icon">
              <i
                  aria-hidden
                  onClick={ () => void 0 }
                  className={ ` ${ twBtnIcon } ${ !showMenu ? 'excluded' : '' } fa fa-bars` }
              />
          </div>

        </div>
      </NavbarContent>

    </Navbar>
    {
      loading ? <DataLoadingComponent /> : null
    }

    </>
}

export const AppHeaderComponent = React.memo(AppHeader)