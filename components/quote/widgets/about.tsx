'use  client'

import { useAtom } from "jotai"

import { uiStateAboutModal } from "@/src/stores/jotai/uiState"
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button } from "@nextui-org/react";

const AboutMetaData ={
    'BUILDINGS_AND_CONTENTS_POLICY': [
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'BUILDINGS_POLICY': [
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'CONTENTS_POLICY': [
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'BUILDINGS_LIMIT_BOOST': [
        'Buildings Limit Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'SAFETY_BOOST':[
        'Safety Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ], 
    'GARDEN_BOOST': [
        'Garden Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ], 
    'EMERGENCY_BOOST': [
        'Emergency Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ], 
    'AWAY_FROM_HOME_BOOST': [
        'Away From Home Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ], 
    'CONTENTS_LIMIT_BOOST': [
        'Contents Limit Boost',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'CONTENTS_EXCESS': [
        'Contents Cover Excess',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'BUILDINGS_EXCESS': [
        'Buildings Cover Excess',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'BUILDINGS_AD': [
        'Buildings Accidental Damage',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'CONTENTS_AD': [
        'Contents Accidental Damage',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'HOME_EMERGENCY':[
        'Home Emergency',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'LEGAL_EXPENSES':[
        'Legal Expenses',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
    'SPECIFIED_HIGH_RISK_ITEMS':[
        'Specified high risk items',
        'Lorem ipso dolor sita amet',
        'Etiam non adepiscit balach blahh'
    ],
}

type AboutSection = keyof typeof AboutMetaData

export const AboutComponent = () => {

    const [aboutModal, setAboutModal] = useAtom(uiStateAboutModal)

    const arrText = aboutModal ? AboutMetaData[aboutModal as AboutSection] : null

    if (arrText === null) {
        return null
    }

    const title = arrText === null ? 'About this section' : arrText[0]

    return <Modal 
        isOpen={!!aboutModal} 
        placement="top-center"
        onOpenChange={ () => setAboutModal(null)} 
        isDismissable={ false }
      >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">{ title }</ModalHeader>
              <ModalBody>
                 { 
                    (arrText ?? []).map((infoStr: string, i: number) => {

                        return i === 0 ? null : <p key={ infoStr }>{ infoStr }</p>
                    }) 
                 }
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => setAboutModal(null)}>
                  Ok
                </Button>
              </ModalFooter>
        </ModalContent>
    </Modal>
}
