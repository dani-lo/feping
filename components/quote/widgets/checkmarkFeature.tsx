import { TxtPara, TxtTitleSection } from '@/components/util/txt'
import { Checkmark } from '@/components/quote/widgets/checkmark'
import { PiCouchLight } from "react-icons/pi"
import { FaPeopleRoof } from "react-icons/fa6";
import { PiHouseLineLight } from "react-icons/pi";

export default function CheckmarkFeature({ text, icon }: { text: string; icon: 'bld' | 'ppl' | 'cnt' }) {
  return (
    <div className="checkmark-section fxrow">
      <div className="checkmark-done">
        <Checkmark
          size='xLarge'
        />
        <TxtPara txt='All Done.' />
      </div>
      <div className="checkmark-confirm">
        {
          icon === 'bld' ?  <PiHouseLineLight size='40px' /> : null
        }
         {
          icon === 'ppl' ?  <FaPeopleRoof size='40px' /> : null
        }
         {
          icon === 'cnt' ?  <PiCouchLight size='40px' /> : null
        }
        <TxtPara txt={text} />
      </div>
    </div>
  )
}
