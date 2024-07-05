import { formatCurrency } from "@/src/util/currency";

import {
    TxtListItem,
    TxtNoteEvidence,
    TxtOfferListItem,
    TxtPara,
    TxtTitlePremium,
     TxtTitleSection,
     TxtTitleUmbrl } from "@/components/util/txt"

import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn";
import { QuoteOffer } from "@/src/models/offer"
import { PolicyType } from "@/src/models/policy";

export const OfferDetailFlexComponent = ({ offer, onSelectOffer, selectedPolicy, isSelected, productUid } : {
    offer: QuoteOffer;
    isSelected: boolean;
    onSelectOffer: (d: string | null) => void;
    selectedPolicy: PolicyType;
    productUid: string | null;
}) => {

    return <div className={ `${ isSelected ? 'quote-offer-widget  pill-widget flex-pill selected' : 'quote-offer-widget  pill-widget flex-pill' }` }>
        <div className="flex-offer">
            <div className="with-icon">
                {
                    isSelected ? <i className="fa fa-check" style={{ fontSize: '2rem', color: 'green'}} /> : null
                }
                <TxtTitleUmbrl
                    txt="UMBRL flex"
                />
            </div>
            <TxtPara txt="Tailor your policy and pay only for what you need." />
        </div>
        <div>
            <TxtNoteEvidence txt="Starting from" />
            <TxtTitlePremium txt={ offer?.premium ? formatCurrency(offer.premium) + ' per year' : '' } />
            <TxtTitleSection
                txt="You'll enjoy:"
            />
            <ul className="list-check">
            {
                offer.features(selectedPolicy).map((feat, i) => {
                    return <TxtOfferListItem
                        txt={ feat }
                        key={ i }
                        icon="fa-solid fa-circle-check"
                    />
                })
            }
            </ul>
            <div className="mt-6 block-centered pill-btn">
                {
                    isSelected ?
                    null :
                    <BtnComponentB
                        type={ UmbrlButton.CONTINUE }
                        label="Select flex"
                        onClick={ () => onSelectOffer(productUid) }
                    />
                }
            </div>
        </div>
    </div>
}


export const OfferDetailMaxComponent = ({ offer, onSelectOffer, selectedPolicy, isSelected, productUid } : {
    offer: QuoteOffer;
    isSelected: boolean;
    onSelectOffer: (d: string | null) => void;
    selectedPolicy: PolicyType;
    productUid: string | null;
}) => {
    return <div className={ `${ isSelected ? 'quote-offer-widget pill-widget max-pill selected' : 'quote-offer-widget  pill-widget max-pill' }` }>
        <div className="max-offer">
            <div className="with-icon">
                {
                    isSelected ? <i className="fa fa-check" style={{ fontSize: '2rem', color: 'green'}} /> : null
                }
                <TxtTitleUmbrl
                    txt="UMBRL max"
                />
            </div>
            <TxtPara txt="Maximum and all-around protection." />
        </div>
        <div>
            <TxtNoteEvidence txt="Starting from" />
            <TxtTitlePremium txt={ offer?.premium ? formatCurrency(offer.premium) + ' per year' : '' } />
            <TxtTitleSection
                txt="You'll enjoy:"
            />
            <ul className="list-check">
            {
                offer.features(selectedPolicy).map((feat, i) => {
                    return <TxtOfferListItem
                        txt={ feat }
                        key={ i }
                        icon="fa-solid fa-circle-check"
                    />
                })
            }
            </ul>
            <div className="mt-6 block-centered">
            {
                    isSelected ?
                    null :
                    <BtnComponentB
                        type={ UmbrlButton.CONTINUE }
                        label="Select max"
                        onClick={ () => onSelectOffer(productUid) }
                        asSecondary={ true }
                    />
                }
            </div>
        </div>
    </div>
}