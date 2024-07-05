import * as UmbrlTime from '@/src/util/time';
import { Input } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FieldErrors, FieldValues, UseFormClearErrors, UseFormRegister, UseFormSetError } from "react-hook-form";
import { twNote } from '@/src/styles/text.tailwind';
import { isSameDate } from '@/src/util/is';
import { Patterns, validDateDay, validDateMonth, validDateYear, customDateComponentValidation } from '@/src/util/validators';
import Datepicker from "tailwind-datepicker-react"
import { QuoteOptValidationRule } from '@/src/stores/staticQuoteJourneyDefinition';
import { useHandleClickOff } from '@/src/hooks/useHandleClickOff';
import { debounce } from '@/src/util/debounce';
import { TxtLabel } from '../util/txt';


export const DateInputComponent = ({ onDateChange, selectedDate, label, validationRule, register, setError, clearErrors, errors }: {
  onDateChange: (formattedDate: string) => void;
  selectedDate: string | undefined;
  label?: string;
  validationRule: QuoteOptValidationRule;
  register?: UseFormRegister<FieldValues>;
  setError?: UseFormSetError<FieldValues>;
  clearErrors?: UseFormClearErrors<FieldValues>;
  errors?: FieldErrors<FieldValues>;
}) => {

  const ref = useRef<HTMLDivElement>(null);

  const destructured = UmbrlTime.strDateToDayMonthYear(selectedDate || '');

  const { strDay, strMonth, strYear } = selectedDate && destructured !== null ? destructured : { strDay: null, strMonth: null, strYear: null };

  const [day, setDay] = useState<string | null>(strDay);
  const [month, setMonth] = useState<string | null>(strMonth);
  const [year, setYear] = useState<string | null>(strYear);

  const [open, setOpen] = useState(false)

  useOnDateChange(
    [day, setDay],
    [month, setMonth],
    [year, setYear],
    selectedDate,
    onDateChange,
    validationRule,
    setError,
    clearErrors
  )

  useHandleClickOff(setOpen, ref, ['z-50'])

  const inputStyle = (isError: boolean) => {
    return {
      label: isError ? 'bold ' : 'bold',
      inputWrapper: isError ? "border bg-white input-not-valid" : "border bg-white",
    };
  };

  const onDatepickerChange = () => {

  }

  return <div
    className="dob-widget"
    style={{ position: 'relative' }}
    ref={ref}
  >
    {label ? <div className="mb-2"><TxtLabel txt={label}  /></div> : null}
    <div>
      <div>
        <TxtLabel txt="Day" />
        <Input
          {...(register && register('day',
            {
              required: "This field is required.",
              pattern: Patterns.dateDay,
            }
          ))}
          type="text"
          value={day ?? undefined}
          onChange={(e) => setDay(e.target.value.trim())}
          isRequired={true}
          data-testid="dob-input-day"
          // variant="bordered"
          classNames={inputStyle(!!errors?.day)}
          size="lg" />
      </div>
      <div>
        <TxtLabel txt="Month" />
        <Input
          {...(register && register('month',
            {
              required: "This field is required.",
              pattern: Patterns.dateMonth,
            }
          ))}

          type="text"
          value={month ?? undefined}
          onChange={(e) => setMonth(e.target.value.trim())}
          isRequired={true}
          // variant="bordered"
          data-testid="dob-input-month"
          classNames={inputStyle(!!errors?.month)}
          size="lg" />
      </div>
      <div>
        <TxtLabel txt="Year" />
        <Input
          {
          ...(register && register('year',
            {
              required: "This field is required.",
              pattern: Patterns.dateYear,
            }
          ))
          }
          type="text"
          value={year ?? undefined}
          // variant="bordered"
          onChange={(e) => setYear(e.target.value.trim())}
          isRequired={true}
          data-testid="dob-input-year"
          classNames={inputStyle(!!errors?.year)}
          size="lg"
        />
      </div>
      <div>
        <Datepicker
          value={selectedDate ? UmbrlTime.umbrlStringToJsDate(selectedDate) : undefined}
          classNames='date-picker-wrapper'
          options={datePickerOptions(label, selectedDate)}
          onChange={ debounce((date: Date) => {

              onDateChange(UmbrlTime.jsDateToUmbrlString(date))

              if (setError && clearErrors) {
                
                const validD = customDateComponentValidation(date, validationRule)
                
                if (!validD) {
                  setError('day', { type: 'manual', message: 'Date must be within 30 days' })
                  setError('month', { type: 'manual', message: 'Date must be within 30 days' })
                  setError('year', { type: 'manual', message: 'Date must be within 30 days' })
                }
                else {
                  clearErrors()
                }
              }
            }, 10)
          }
          show={open}
          setShow={() => setOpen(false)}
        >
          <div className='date-picker-container'>
            <label className={`date-picker-hidden-label ${twNote}`}>{'Year'}</label>
            <div className='date-picker' ref={ref} onClick={() => setOpen(true)}>
              <span className="text-default-400 text-medium">
                <i aria-hidden className="fa-regular fa-calendar fa-lg"></i>
              </span>
            </div>
          </div>

        </Datepicker>
      </div>
    </div>
    {
      validationRule === QuoteOptValidationRule.NEXT_30_DAYS ?
        errors?.day || errors?.month || errors?.year ?
          <div className="text-red-500 text-sm">
            {`${errors?.day?.message}`}
          </div> : null
        : null
    }
  </div>;
};



type DatePartsState = [string | null, Dispatch<SetStateAction<string | null>>]


const useOnDateChange = (
  [day, setDay]: DatePartsState,
  [month, setMonth]: DatePartsState,
  [year, setYear]: DatePartsState,
  selectedDate: string | undefined,
  onDateChange: (formattedDate: string) => void,
  validationRule: QuoteOptValidationRule,
  setError: UseFormSetError<FieldValues> | undefined,
  clearErrors: UseFormClearErrors<FieldValues> | undefined,
) => {
  useEffect(() => {

    if (validDateDay(day) && validDateMonth(month) && validDateYear(year)) {

      const newDateStr = UmbrlTime.padDateString(`${year}-${month}-${day}`);

      if (!selectedDate || !isSameDate(selectedDate, newDateStr)) {
        onDateChange(newDateStr);

        if (setError && clearErrors) {
          const validD = customDateComponentValidation(UmbrlTime.umbrlStringToJsDate(newDateStr), validationRule)
          if (!validD) {
            setError('day', { type: 'manual', message: 'Date must be within 30 days' })
            setError('month', { type: 'manual', message: 'Date must be within 30 days' })
            setError('year', { type: 'manual', message: 'Date must be within 30 days' })
          }
          else {
            clearErrors()
          }
        }
      }

    }

  }, [day, month, year]);

  useEffect(() => {
    if (selectedDate) {
      const { strDay, strMonth, strYear } = UmbrlTime.strDateToDayMonthYear(selectedDate) as { strDay: string, strMonth: string, strYear: string };
      setDay(strDay);
      setMonth(strMonth);
      setYear(strYear);
    }

  }, [selectedDate])
}

const datePickerOptions = (label: string | undefined, selectedDate: string | undefined) => {

  const defaultBirthDate = selectedDate ? UmbrlTime.umbrlStringToJsDate(selectedDate) : new Date("1990-01-01");

  return {
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    icons: {
      prev: () => <i className="fa fa-arrow-left" aria-hidden="true"></i>,
      next: () => <i className="fa fa-arrow-right" aria-hidden="true"></i>,
    },
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "text-transparent",
      input: "",
      inputIcon: "",
      selected: "",
    },
    datepickerClassNames: "m-auto left-0 right-0 -top-5 bottom-0",
    defaultDate: label?.localeCompare('Cover Start Date') === 0 ? new Date(Date.now()) : defaultBirthDate,
    language: "en",
  }
}