import React, { ReactNode } from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";

import { twNote, twNoteLg, twParagraph, twTitleSection } from "@/src/styles/text.tailwind";
import { TxtNoteEvidence, TxtPara } from '@/components/util/txt';
import { AccordionItemTitleComponent } from './accordionItemTitle';

const ExpandableSection = ({aria_label, title, subtitle, body, disableAnimation, children } : {
    aria_label: string;
    title: string | null;
    subtitle: string | null;
    body: string[];
    disableAnimation ?: boolean;
    children ?: ReactNode;
}) => {

    return <div className="expandable-section-widget accordion-container">
        <Accordion
            disableAnimation={ !!disableAnimation }
            itemClasses={{
                title: twTitleSection,
                subtitle: twNote,
                content: twParagraph
            }}>
                <AccordionItem
                    key="1"
                    aria-label={aria_label}
                    subtitle={subtitle}
                    data-testid={ `expandable-trigger` }
                    title={ title }
                    indicator={ <i aria-hidden className="fa fa-chevron-circle-down" /> }
                >
                {
                    !children ? body.map((txt, i) => {
                        return <TxtPara
                            key={ i }
                            txt={ txt }
                        />
                    }) : children
                }
                </AccordionItem>
            </Accordion>
        </div>
}

export { ExpandableSection }
