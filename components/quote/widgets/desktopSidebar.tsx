'use client'

interface DesktopSidebarProps {
  currentStep: number,
  steps: {
    title: string;
    number: number;
  }[] | null
}
export const DesktopSidebar = ({ currentStep, steps }: DesktopSidebarProps) => {

  return (
    <div className='screen-sidebar left numbered-list'>
      {steps &&
        steps.map((step) => {
          return (
            <div key={step.title}>
              <div className="sidebar-icon-container">
                {currentStep > step.number ?
                  <span>
                    <i aria-hidden className={`fa-solid fa-circle-check fa-xl`} />
                  </span>
                  : currentStep === step.number ?
                    <span>
                      <i className="fa fa-arrow-circle-right fa-xl" aria-hidden="true" />
                    </span>
                    : <p>{step.number}</p>
                }
              </div>
              <p className="">{step.title}</p>
            </div>
          )
        })}
    </div>
  )
}