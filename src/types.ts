export enum ScreenMode  {
    "REVIEW" = "REVIEW",
    "NORMAL" = "NORMAL"
}

export enum StepMode  {
    "RESUME" = "RESUME",
    "DISPLAY" = "DISPLAY",
    "EDIT" = 'EDIT'
}


export interface UmbrlError {
    message: string;
    error: true;
    errorCode: number | string;
}