'use client';
 
import { BtnComponent, UmbrlButton } from '@/components/libForm/btn';
import { AppHeaderComponent } from '@/components/quote/widgets/header';
import { TxtPara, TxtTitleError, TxtTitlePage, TxtTitleSection } from '@/components/util/txt';
import { UmbrlError } from '@/src/types';
import {
  ErrorGenericError,
  ErrorMalformedError,
  ErrorUserUnderage,
  ErrorBadRequest,
  ErrorUnauthorized,
  ErrorNotFound,
  ErrorBusinessRuleValidation,
  ErrorUnderwritingGuideline,
  ErrorTooManyRooms,
  ErrorInternalServerError,
} from '@/src/util/customError';

 
export default function Error({
  error,
  reset,
}: {
  error: UmbrlError & { digest?: string };
  reset: () => void;
}) {

  // console.log(error)

  return <>

    {
      error instanceof ErrorUserUnderage ? <ErrorUnderAgeComponent /> : null 
    }
    {
      error instanceof ErrorGenericError ? <ErrorGenericComponent /> : null 
    }
    {
      error instanceof ErrorMalformedError ? <ErrorMalformedComponent /> : null 
    }
    {
      error instanceof ErrorBadRequest ? <ErrorBadRequestComponent /> : null
    }
    {
      error instanceof ErrorUnauthorized ? <ErrorUnauthorizedComponent /> : null
    }
    {
      error instanceof ErrorNotFound ? <ErrorNotFoundComponent /> : null
    }
    {
      error instanceof ErrorBusinessRuleValidation ? <ErrorBusinessRuleValidationComponent /> : null
    }
    {
      error instanceof ErrorUnderwritingGuideline ? <ErrorUnderwritingGuidelineComponent /> : null
    }
    {
      error instanceof ErrorTooManyRooms ? <ErrorTooManyRoomsComponent /> : null
    }
    {
      error instanceof ErrorInternalServerError ? <ErrorInternalServerErrorComponent /> : null
    }

  </>
}

const ErrorUnderAgeComponent = () => {
  return <div className="screen mt-10">
  
  <div className="block-generic">
    <TxtPara txt="We are sorry - you have provided a value for your age which is not in line with regulation." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
        onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
  
</div>
}

const ErrorGenericComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorMalformedComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Your request was in line with our specification but somewhere along the request processing our system panicked." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          
          // Send user somewhere else 

          () => void 0
        }
      />
  </div>
</div>
}

const ErrorBadRequestComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Bad request." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorUnauthorizedComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Unauthorized request." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorNotFoundComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Not found." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorBusinessRuleValidationComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Business rule validation failed." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorUnderwritingGuidelineComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Underwriting guideline." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorTooManyRoomsComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Too many rooms." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}

const ErrorInternalServerErrorComponent = () => {
  return <div className="screen mt-10">
  <TxtTitleError txt="We are sorry an error occurred" />
  <div className="block-generic">
    <TxtPara txt="We are sorry - something went wrong. Internal server error." />
  </div>
  <div className="block-centered mt-10">
    <BtnComponent
      type={ UmbrlButton.GENERIC }
      size='lg'
      label='Back to Safety'
      onClick={
          // Send user somewhere else 
          () => void 0
        }
      />
  </div>
</div>
}