import { TxtLabel } from "@/components/util/txt"
import { Input } from "@nextui-org/react"

export const GhostForm = () => {
    return <div className="ghost-form">
        <form>
            <div className="block-field lg">
                <TxtLabel txt={"Lorem ipso dolor sit amet"} />
                <input
                    value={ "" }
                    type="text"
                />
            </div>
            <div className="block-field sm">
                <TxtLabel txt={"Lorem ipso dolor sit amet"} />
                <input
                    value={ "" }
                    type="text"
                />
            </div>
            <div className="block-field md">
                <TxtLabel txt={"Lorem ipso dolor sit amet"} />
                <input
                    value={ "" }
                    type="text"
                />
            </div>
        </form>
    </div>
}

export const SkeletonsComponent = ({children, on}: { children: any; on: boolean;}) => {
    return on ? <GhostForm /> : <>{children}</>
  }