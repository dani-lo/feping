import { useEffect, useState } from "react"

export const ScreenContainerComponent = ({ children, to}: { children: any, to?: number }) => {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        if (to) {
            setTimeout(() => {
                setLoaded(true)
            }, 100)
        } else {
            setLoaded(true)
        }
    }, [])

    return <div className={ `screen-container${ loaded ? ' loaded' : '' }`} data-testid="screen-container">
        {
            children
        }
    </div>

}