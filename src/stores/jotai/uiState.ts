
import { atom } from 'jotai';

export const uiStateAboutModal = atom<string | null>(null);
export const uiStateRefreshAtom = atom(0);
export const uiError = atom<string | null>(null)
export const uiLoading = atom(false)