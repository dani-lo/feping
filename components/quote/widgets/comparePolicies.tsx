'use  client'

import { TxtPara, TxtTitleSection, TxtTitleUmbrl } from "@/components/util/txt";
import { formatCurrency } from "@/src/util/currency";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import { useAtom } from "jotai";
import { useState } from "react";

export const ComparePoliciesComponent = ({ isOpen, setIsOpen}: { isOpen: boolean; setIsOpen: (d: boolean) => void; }) => {

    

    return <Modal 
        isOpen={isOpen} 
        placement="center"
        size="4xl"
        onOpenChange={ () => setIsOpen(!isOpen)} 
        isDismissable={ false }
      >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Policies Comparison</ModalHeader>
              <ModalBody>
              <div className="grid-container">
                <div>
                    <TxtTitleUmbrl txt="Flex" />
                </div>
                <div>
                    <TxtTitleUmbrl txt="Max" />
                </div>
               
                <div>
                    <TxtTitleSection txt="Buildings Cover" />
                </div>
                <div>&nbsp;</div>

                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(120000, 'FROM_CURRENCY')} />
                </div>
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(200000, 'FROM_CURRENCY')} />
                </div>

                <div>
                    <TxtTitleSection txt="Alternative Accommodation" />
                </div>
                <div>&nbsp;</div>

                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(1200, 'UP_TO_CURRENCY')} />
                </div>
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(5000, 'UP_TO_CURRENCY')} />
                </div>

                <div>
                    <TxtTitleSection txt="Contents Cover" />
                </div>
                <div>&nbsp;</div>
                
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(50000, 'UP_TO_CURRENCY')} />
                </div>
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(200000, 'UP_TO_CURRENCY')} />
                </div>

                <div>
                    <TxtTitleSection txt="Money From Home" />
                </div>
                <div>&nbsp;</div>
                
                <div className="grid-cell">
                    <TxtPara txt="No cover" />
                </div>
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(100, 'UP_TO_CURRENCY')} />
                </div>

                <div>
                    <TxtTitleSection txt="High Risk Items" />
                </div>
                <div>&nbsp;</div>
                
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(6000, 'UP_TO_CURRENCY')} />
                </div>
                <div className="grid-cell">
                    <TxtPara txt={ formatCurrency(3000, 'UP_TO_CURRENCY')} />
                </div>
           </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => setIsOpen(!isOpen)}>
                  Ok
                </Button>
              </ModalFooter>
        </ModalContent>
    </Modal>
}