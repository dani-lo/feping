export const ScreenContainerComponent = ({ children, to }: { children: any, to?: number }) => {

    return <div className="screen-container  loaded">
        {
            children
        }
    </div>

}