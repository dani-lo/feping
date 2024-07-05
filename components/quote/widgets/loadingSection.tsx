'use client'

import { TxtTitlePage } from "@/components/util/txt";
import { twTitleSub } from "@/src/styles/text.tailwind"
import { CircularProgress } from "@nextui-org/react";

const LoadingSection = (props: { notitle ?: boolean; }) => {
  return (
    <div className="screen">
        { !props.notitle ? <TxtTitlePage txt="Loading..." /> : null }
        <div className="loading-widget">
          <CircularProgress />
        </div>
    </div>
  )
}

const DataLoadingComponent = () => {
    return <div className="data-loading-widget" style={{ zIndex: 10000 }}>
      <div>
      <CircularProgress />
      </div>
    </div>
}

export { LoadingSection, DataLoadingComponent }
