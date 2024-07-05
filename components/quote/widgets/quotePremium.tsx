import { TxtPara, TxtTitleUmbrl } from "@/components/util/txt";
import { QuoteOffer } from "@/src/models/offer";
import { LocalState } from "@/src/stores/contexts/localStateContext";

export const QuotePremiumComponent = ({ offer, localState } : {offer: QuoteOffer, localState: LocalState }) => {
    
    const tot = offer.product.name === 'flex' ? offer.formattedPremiumWithFlexSelections(localState) : offer.formattedPremium()
    const title = `UMBRL ${ offer.title() }`
    
    // console.log(JSON.stringify(offer.boost_selection))
    // console.log(JSON.stringify(offer.addons_selection))

    return <div className="quote-data fxrow">
        <TxtTitleUmbrl txt={ title } />
        { tot ? <TxtPara txt={ `${ tot } ` }/> : null }
    </div>
}