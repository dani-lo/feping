import { uiStateSidebar } from "@/src/stores/jotai/uiState";
import { useAtom } from "jotai";
import { useEffect, useState } from "react"

export const SidebarComponent = ({ children }: { children: any; }) => {

    const [sidebar] = useAtom(uiStateSidebar)
    console.log('SIDEBARCOMP =====', sidebar, `umbrl-sidebar${ sidebar ? ' active' : '' }`)
    return <>
        { 
            sidebar ? <div className="modal-bg"></div> : null
        }
        <div className={ `umbrl-sidebar${ sidebar ? ' active' : '' }` }>
            { children }
        </div>
    </>
}