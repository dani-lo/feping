import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useHandleClickOff = (
    setOpen: Dispatch<SetStateAction<boolean>>, 
    ref: RefObject<HTMLDivElement>, 
    closableClassnames: string[] | null) => {

  useEffect(() => {

    const handleClickOutside = (event: any) => {

      const clickedOnRef = ref.current && ref.current.contains(event.target)

      let clickedOnClosableCName = false 

      if (closableClassnames !== null && !!closableClassnames.length) {
        const tgtCname = event.target?.getAttribute('class') ?? ''

        clickedOnClosableCName = closableClassnames.some(ccn => tgtCname.indexOf(ccn) !== -1)
      }
     
      if (!clickedOnRef || clickedOnClosableCName) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }

  }, [])
}