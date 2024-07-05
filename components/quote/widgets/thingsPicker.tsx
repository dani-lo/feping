
import { useState } from "react"

import { 
    Accordion, 
    AccordionItem, 
    Button, 
    Checkbox, 
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    Switch} from "@nextui-org/react"
import { StepMode } from "@/src/types";
import { ellypse } from "@/src/util/txt";
import {SelectableListComponent, SelectableThingsPillComponent} from "./selectableList";
import { TxtLabel, TxtNoteEvidence, TxtTitleSub } from "@/components/util/txt";
import { formatCurrency } from "@/src/util/currency";
import { AccordionItemTitleComponent } from "./accordionItemTitle";
import { Thing, ThingDoc } from "@/src/models/thing";
import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn";
import { InfoBlockComponent } from "./infoBlock";
import { PillBtnComponent } from "./pillBtn";
import { PillComponent } from "./pill";


export interface CategoriesTree {
    id: string;
    name: string;
    subcategories: {
        id: string;
        name: string;
    }[];
}

export const thingsCategories = {
    'JEWELLERY': {
        id: 'JEWELLERY',
        title: 'Jewellery',
        icon: 'fa fa-cloud',
        text: `Individual pieces of jewellery over ${ formatCurrency(1500) }. `
    },
    'WATCHES': {
        id: 'WATCHES',
        title: 'Watches',
        icon: 'fa fa-life-ring',
        text: `Individual watches over ${ formatCurrency(1500) }. `
    },
    'BIKES': {
        id: 'BIKES',
        title: 'Bikes',
        icon: 'fa fa-cloud',
        text: `Bikes over ${ formatCurrency(350) }. `
    },
    'LAPTOPS': {
        id: 'LAPTOPS',
        title: 'Laptops',
        icon: 'fa fa-shopping-basket',
        text: `Laptops over ${ formatCurrency(1500) }. `
    },
    'OTHER': {
        id: 'OTHER',
        title: 'Other',
        icon: 'fa fa-shower',
        text: `Collections, musical instruments, and other over ${ formatCurrency(1500) }.`
    }
}

export const SelectedThingsComponent = ( { selectedThings, onDeleteThing, mode, onSetOutside }: { 
        selectedThings:  string | ThingDoc[];
        onDeleteThing: ((thing: ThingDoc) => void) | null;
        mode: StepMode;
        onSetOutside ?: ((thing: ThingDoc) => void) | null;
    }) => {

    if (!Array.isArray(selectedThings) || !selectedThings?.length) {
        return null
    }

    return <div className={ mode === StepMode.RESUME ? 'selected-things-list resume' : 'selected-things-list' }>
        {
            selectedThings.map((thing, i) => {

                return <PillComponent
                        key={ `${ thing.category }-${ i }` }
                        title={  `${ thing.category.toLowerCase() }: ${ ellypse(thing.description ?? '', 30) }`  }
                        icons={{
                            title: 'fa fa-check-circle',
                            action: onDeleteThing ? 'fa fa-times' : null
                        }}
                        onAction={ 
                            onDeleteThing ? 
                                () => onDeleteThing(thing) : 
                                () => void 0
                        }
                        expanded={  false }
                        // className={ ` ${ thing.insideAndOutside ? 'is-outside pill-widget' : 'pill-widget'}`  }  
                    >
                    {/* <div className="thing-detail fxrow">
                        <TxtNoteEvidence txt={ `${ thing.category.toLowerCase() }: ${ ellypse(thing.description ?? '', 30) }` } />
                        <TxtNoteEvidence txt={ formatCurrency(thing.value ?? 0) } />
                        <div className="action-icon">
                            {
                                onDeleteThing?
                                <i aria-hidden className="fa fa-times" onClick={() => onDeleteThing(thing) } />:
                                null
                            }
                        </div>
                    </div>     */}
                    <div className="py-4">
                        <Switch 
                            defaultSelected={ false }
                            isSelected={ !!thing.insideAndOutside }
                            onChange={ () => onSetOutside && onSetOutside(thing)}
                            size="sm"
                            data-testid="edit-picked-thing-inclusion"
                        >
                            Cover this item away-from-home
                        </Switch>
                    </div>
                </PillComponent>
            })
        }
    </div>
}

export const ThingsPickerComponent = ({ onSaveThing, disableAnimation, forceOutside }: { 
    // categories: CategoriesTree[];
    onSaveThing: (t: ThingDoc) => void;
    disableAnimation ?: boolean;
    forceOutside ?: boolean;
}) => {

    

    const [editThing, setEditThing] = useState<Thing | null>(null)
    
    return <div className="things-picker-widget accordion-container"> 
        <TxtTitleSub
            txt="Add high risk items"
        />
         {/* <SelectableListComponent
            items={ Object.values(thingsCategories).map(sub => ({ label: sub.title, text: sub.text, key: sub.id })) }
            onSelectItem={ (key: any) => {
                setEditThing(new Thing({
                    category: key,
                    insideAndOutside: forceOutside ? true : false,
                }))
            }}
            actionLabel="Add"
        /> */}
        {
            Object.values(thingsCategories).map(tc => {
                return <PillBtnComponent
                    id={ tc.id }
                    text={ tc.text }
                    title={ tc.title }
                    icon={ tc.icon }
                    onSelect={ (id: string) => {
                        setEditThing(new Thing({
                            category: id,
                            insideAndOutside: forceOutside ? true : false,
                        }))
                    } }
                    key={ tc.id }
                />  
            })
        }
        {/* <SelectableThingsPillComponent
            selectables={ 
                Object.values(thingsCategories).map(tc => {
                    return {
                        title: '',
                        icon: '',
                        text: '',
                        onSelect: (id: string) => {
                            setEditThing(new Thing({
                                category: id,
                                insideAndOutside: forceOutside ? true : false,
                            }))
                        }
                    }
                }) 
        }
        /> */}
        <Modal
            isOpen={ !!editThing } 
            placement="center"
            onOpenChange={ () => setEditThing(null) } 
            isDismissable={ true }
            disableAnimation={ disableAnimation }
            data-testid="edit-picked-thing"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Please add some details for your item</ModalHeader>
                <ModalBody>
                    <ThingEditorComponent
                        thing={ editThing }
                        catLabel={ editThing?.category?.toLowerCase() ?? ''}
                        onEditSave={ (t: ThingDoc) => {

                            setEditThing(null)

                            if (t.description && t.value) {
                                onSaveThing(t)
                            }
                        }}
                        onEditCancel={ () => {
                            setEditThing(null)
                        }}
                    />
                </ModalBody>
                
            </ModalContent>
        </Modal>
        {/* <BtnComponent */}
            
    </div>
}

const ThingEditorComponent = ({ catLabel, thing, onEditSave, onEditCancel }: { 
    thing: ThingDoc | null;
    catLabel: string;
    onEditCancel: () => void;
    onEditSave: (t: ThingDoc) => void;
}) => {

    const [outside, setOutside] = useState(false)
    const [desc, setDesc] = useState('')
    const [val, setVal] = useState(0)

    if (thing === null) {
        return null
    }

    return <div className="thing-editor-widget">
        <TxtTitleSub txt={ catLabel } capitalize={ true } />
        <div>
            <TxtLabel txt="Item description" />
            <Input
                value={ desc }
                type="text"
                onChange={ (e) => setDesc(e.target.value)}
                data-testid="edit-picked-thing-description"
            />
            <InfoBlockComponent info="Please provide clear and detailed description, e.g. brand, model name, or colour." />
        </div>
        <div>
            <TxtLabel txt="Add item value (£)" />
            <Input
                type="number"
                onChange={ (e) => setVal(Number(e.target.value))}
                data-testid="edit-picked-thing-value"
            />
            <InfoBlockComponent info={ `Add current market value of the item. Remember to only specify individual jewellery items over ${ formatCurrency(1500) }. ` } />
        </div>
        <div>
            <Switch 
                defaultSelected={ false }
                isSelected={ !!outside }
                onChange={ () => setOutside(!outside)}
                size="sm"
                data-testid="edit-picked-thing-inclusion"
            >
                Cover this item away-from-home
            </Switch>
            <InfoBlockComponent info="If you're planning to carry this item away-from-home, consider to cover it." />
        </div>
        <ModalFooter>
            <div>
                <BtnComponentB
                    type={ UmbrlButton.CANCEL }
                    onClick={() => onEditCancel() }
                    label="Cancel"
                    data-testid="edit-picked-thing-cancel"
                />
                <BtnComponentB
                    type={ UmbrlButton.CONFIRM }
                    onClick={() => onEditSave({
                        ...thing,
                        description: desc,
                        value: val,
                        insideAndOutside: outside
                    })}
                    label="Ok"
                    data-testid="edit-picked-thing-save"
                    disabled={ !desc || !val || val === 0 }
                />
            </div>
        </ModalFooter>
    </div>

}