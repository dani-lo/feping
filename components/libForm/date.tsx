
import DatePicker from 'react-datepicker'

import * as UmbrlTime from '@/src/util/time'
import { Input } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form"

import { QuoteOpt } from "@/src/stores/staticQuoteJourneyDefinition"
import { twNote } from '@/src/styles/text.tailwind';
import { isSameDate } from '@/src/util/is';

const validDayMonth = (d: string | null) => {

    return !!d && d.length === 2 && !isNaN(parseInt(d))
}
const validYear = (d: string | null) => d && d.length === 4 && !isNaN(parseInt(d))

export const DateInputComponent = ({ onDateChange, selectedDate, label }: {
    onDateChange: (formattedDate: string) => void;
    selectedDate: string | null;
    label?: string;
}) => {

    const destructured = UmbrlTime.strDateToDayMonthYear(selectedDate || '')

    const { strDay, strMonth, strYear } = selectedDate && destructured !== null ? destructured : { strDay: null, strMonth: null, strYear: null }

    const [day, setDay] = useState<string | null>(strDay)
    const [month, setMonth] = useState<string | null>(strMonth)
    const [year, setYear] = useState<string | null>(strYear)

    const {
        register,
        formState: {errors}
    } = useForm({
        mode: "onBlur"
    })

    useEffect(() => {

        if (validDayMonth(day) && validDayMonth(month) && validYear(year)) {

            const newDateStr =  UmbrlTime.padDateString(`${ year }-${ month }-${ day }`)

            if (!selectedDate || !isSameDate(selectedDate, newDateStr)) {
                onDateChange(newDateStr)
            }
        }
    }, [day, month, year])

    const inputStyles = {
        label: 'bold',
        inputWrapper: "border bg-white",
    }

    return <div
            className="dob-widget"
            style={{ position: 'relative' }}
        >
        {
            label ? <label className={ twNote }>{ label }</label> : null
        }
        <div>
            <div>
                <label className={ twNote }>day</label>
                <Input
                    {...register('day',
                        {
                            required: "This field is required.",
                            pattern: {value: /[0-9]{1,2}/g, message: "Invalid day."},
                        }
                    )}
                    type="text"
                    value={ day ?? undefined }
                    errorMessage={errors?.day?.message?.toString()}
                    onChange={ (e) => {
                        setDay(e.target.value.trim())
                    }}
                    isRequired={ true }
                    data-testid="dob-input-day"
                    classNames={ inputStyles }
                    size="lg"
                />
            </div>
            <div>
            <label className={ twNote }>month</label>
                <Input
                    {...register('month',
                        {
                            required: "This field is required.",
                            pattern: {value: /[0-9]{1,2}/g, message: "Invalid month."},
                        }
                    )}
                    type="text"
                    value={ month ?? undefined}
                    errorMessage={errors?.month?.message?.toString()}
                    onChange={ (e) => {
                        setMonth(e.target.value.trim())
                    }}
                    isRequired={ true }
                    data-testid="dob-input-month"
                    classNames={ inputStyles }
                    size="lg"
                />
            </div>
            <div>
                <label className={ twNote }>year</label>
                <Input
                    {...register('year',
                        {
                            required: "This field is required.",
                            pattern: {value: /[0-9]{4}/g, message: "Invalid year."},
                        }
                    )}
                    type="text"
                    value={ year ?? undefined }
                    errorMessage={errors?.year?.message?.toString()}
                    onChange={ (e) => {
                        setYear(e.target.value.trim())
                    }}
                    isRequired={ true }
                    data-testid="dob-input-year"
                    classNames={ inputStyles }
                    size="lg"
                />
        </div>
        </div>
    </div>
}


// export const DateInputPopoverComponent = ({ onDateChange, selectedDate, opt }: {
//     onDateChange: (formattedDate: string) => void;
//     selectedDate: string | null;
//     opt: QuoteOpt;
// }) => {

//     const [open, setOpen] = useState(false)

//     const ref = useRef<HTMLDivElement>(null);

//     const {
//         register,
//         formState: {errors}
//     } = useForm({
//         mode: "onBlur"
//     })

//     const test = opt

//     useEffect(() => {
//         const handleClickOutside = (event: any) => {

//           if (ref.current && !ref.current.contains(event.target)) {
//             setOpen(false)
//           }
//         };
        
//         document.addEventListener('click', handleClickOutside, true);

//         return () => {
//           document.removeEventListener('click', handleClickOutside, true);
//         };
//       }, [ setOpen ]);

//     return <div
//             className="dob-popover-widget"
//             style={{ position: 'relative' }}
//             ref={ref}
//         >
//         <div>
//             <Input
//                 {...register(opt.apikey,
//                     {
//                         required: "This field is required.",
//                         // TODO: Use "validate" to check:
//                         // Format is correct, date is not in the future, the person is 18+ years old
//                         pattern: {value: /[0-9]{4}-[0-9]{2}-[0-9]{2}/g, message: "Invalid date of birth."},
//                     }
//                 )}
//                 type="text"
//                 label={ 'Date of Birth' }
//                 value={ selectedDate ?? '' }
//                 errorMessage={errors?.dob?.message?.toString()}
//                 endContent={
//                     <div className="input-icon">
//                         <span className="text-default-400 text-medium">
//                             <i aria-hidden className="fa-regular fa-calendar"></i>
//                         </span>
//                     </div>
//                 }
//                 onChange={ (e) => {
//                     onDateChange(e.target.value)
//                     setOpen(false)
//                 }}
//                 onFocus={ () => setOpen(true) }
//                 onClick={ () => setOpen(true) }
//                 data-testid="dob-input-component-input"
//             />
//         </div>
//         <DatePicker
//             open={ open }
//             selected={  null }
//             onChange={ (date: Date) => {
//                 onDateChange(UmbrlTime.jsDateToUmbrlString(date))
//                 setOpen(false)
//             }}
//         />
//     </div>
// }