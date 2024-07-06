import { uiStateSidebar } from "@/src/stores/jotai/uiState";
import { useAtom } from "jotai";
import { useEffect, useState } from "react"
import { SidebarEditor } from "../../src/stores/jotai/uiState";

export const SidebarComponent = ({ children, sidebarEditorId }: { children: any; sidebarEditorId: SidebarEditor }) => {

    const [sidebar] = useAtom(uiStateSidebar)
    const isActive = sidebar === sidebarEditorId

    return <>
        { 
            isActive ? <div className="modal-bg"></div> : null
        }
        <div className={ `umbrl-sidebar${ isActive ? ' active' : '' }` }>
            { children }
        </div>
    </>
}