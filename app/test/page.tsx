'use client'

import { BtnComponentB, UmbrlButton } from '@/components/libForm/btn'
import React from 'react'

const Test = () => {
  return (
    <div className="p-8 txt-test">
      <h2>Get your insurance</h2>
      <h3>Now choose that</h3>
      <p>Lorem ipso dolor sit sabet foobar etiam molto piano, pero melo molto bene bravissimi amet etiam non adipiscit</p>
      <p>Lorem ipso dolor sit amet etiam non testo sapere volere is a siva thing sit amet etiam non testo sapere volere is a siva thing sit amet etiam non testo sapere volere is a siva thing sit amet etiam non testo sapere volere is a siva thing</p>
          <BtnComponentB
              type={ UmbrlButton.GENERIC }
              onClick={ () => void 0}
              label="Gerneric button"
              // grow={ true }
              // disabled={ !canConfirm }
          />
    
    <div className="txt-test">
      <h4>Check out this list</h4>
      <ul>
      <li>We cover this</li>
      <li>We cover something else</li>
      <li>We do not cover that</li>
      </ul>
    </div>
    </div>
  )
}

export default Test