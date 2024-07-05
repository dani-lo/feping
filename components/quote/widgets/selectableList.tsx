import { BtnComponent, BtnComponentB, UmbrlButton } from '@/components/libForm/btn'
import { TxtNoteEvidence, TxtPara } from '@/components/util/txt';
import React from 'react'
import { PillBtnComponent } from './pillBtn';

type Props = {
    items: {label: string, key: string, text ?: string}[];
    onSelectItem: (key: string) => void;
    actionLabel: string;
    selected ?: string | null;
}

export const SelectableListComponent = ({ items, onSelectItem, actionLabel, selected }: Props) => {
    return (
        <ul className="selectable-list">
            {
                items.map((item, i) => {
                    return <li key={ item.key }>
                        <div>
                            <TxtNoteEvidence txt={ item.label } />
                            {
                                item.text ? <TxtPara txt={ item.text } /> : null
                            }
                        </div>
                        {
                            selected === item.key ?
                            <BtnComponentB
                                testid={ `selectable-deselect-${ item.key }` }
                                type={ UmbrlButton.CANCEL }
                                onClick={ () => {
                                    onSelectItem(item.key) 
                                }}
                                label={ 'Unselect' }
                                // size="sm"
                            />:
                            <BtnComponentB
                                testid={ `selectable-select-${ item.key }` }
                                type={ UmbrlButton.CONFIRM }
                                onClick={ () => {
                                    onSelectItem(item.key) 
                                }}
                                label={ actionLabel }
                                // size="sm"
                            />
                        }
                        
                    </li>
                })
            }
        </ul>
    )
}

export const SelectableThingsPillComponent = ({ selectables } : { 
    selectables: {
        id: string;
        title: string;
        text: string;
        icon: string;
        onSelect: (id: string) => void;
    }[]}) => {
        return selectables.map(s => {
            return <PillBtnComponent
                id={ s.id }
                text={ s.text }
                title={ s.title }
                icon={ s.icon }
                onSelect={ s.onSelect }
                key={ s.title }
            />                
        })
}