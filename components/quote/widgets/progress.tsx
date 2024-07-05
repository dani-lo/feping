'use client'

import React from "react";
import { Progress } from "@nextui-org/react";
import { twNote, twTitleSub } from "@/src/styles/text.tailwind";
import { TxtNoteEvidence, TxtTitlePage, TxtTitleSection } from "@/components/util/txt";

export const ProgressBarComponent = ({ label, val, title }: { label: string, val: number, title ?: string }) => {

  return <div className="progress">
     {
        title ? <TxtTitleSection txt={ title } /> : null
      }
    <div className="fxrow">
     
      <Progress
        size="sm"
        value={ val }
        color={ 'primary' } 
        disableAnimation={ true }
      />
      <TxtNoteEvidence txt={ label } />
    </div>
  </div>
}