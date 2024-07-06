
import { atom } from 'jotai';

export enum SidebarEditor {
    'HRIS' = 'HRIS',
    'CLAIMS' = 'CLAIMS',
    'EXCESS' = 'EXCESS'
} 

export const uiStateAboutModal = atom<string | null>(null);
export const uiStateRefreshAtom = atom(0);
export const uiStateSidebar = atom<null | SidebarEditor>(null)
export const uiError = atom<string | null>(null)
export const uiLoading = atom(false)