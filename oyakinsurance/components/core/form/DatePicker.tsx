/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
/* eslint-disable default-case */
import { Image } from "@chakra-ui/react";
import {
  addMonths,
  addYears,
  format,
  getDay,
  getDaysInMonth,
  isEqual,
  subMonths,
  subYears,
} from "date-fns";
import { tr } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { checkDate, maskDate } from "utils/string.utils";

export const REG_DIGIT = new RegExp(/^\d+$/);

export const SHORT_WEEK_DAYS = [
  "general_general_monday_text",
  "general_general_tuesday_text",
  "general_general_wednesday_text",
  "general_general_thursday_text",
  "general_general_friday_text",
  "general_general_saturday_text",
  "general_general_sunday_text",
];

export const BIRTHDATE_MIN_DATE = "1900-01-01";
export const BACKSPACE_KEY = "Backspace";
export const DOT = ".";
export const TWO_DOT = "..";

type DatepickerType = "date" | "month" | "year";

interface DatePickerProps {
  name: string;
  value?: any;
  onChange?: (value: Date | undefined) => void;
}

const DatePicker = ({ name, value, onChange }: DatePickerProps) => {
  const calendarRef = useRef<any>(null);
  const calendarIconRef = useRef<any>(null);
  const datePickerModalRef = useRef<any>(null);
  const t = useTranslations();
  const [ manualInput, setManualInput ] = useState<string | undefined>();
  const [ dayCount, setDayCount ] = useState<Array<number>>([]);
  const [ blankDays, setBlankDays ] = useState<Array<number>>([]);
  const [ showDatepicker, setShowDatepicker ] = useState(false);
  const [ datepickerHeaderDate, setDatepickerHeaderDate ] = useState(new Date());
  const [ selectedDate, setSelectedDate ] = useState<Date | undefined>();
  const [ type, setType ] = useState<DatepickerType>("date");

  useEffect(() => {
    setSelectedDate(value);

    setShowDatepicker(false);

    if (manualInput) {
      setManualInput(undefined);
    }
  }, [ value ]);

  useEffect(() => {
    if (showDatepicker) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [ showDatepicker ]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      !datePickerModalRef?.current?.contains(event.target) &&
      !calendarIconRef?.current?.contains(event.target) &&
      !calendarRef?.current?.contains(event.target)
    ) {
      setShowDatepicker(false);
    }
  };

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date: number) =>
    selectedDate
      ? isEqual(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
        selectedDate,
      )
      : false;

  const setDateValue = (date: number) => () => {
    const currentSelectedDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date,
    );

    onChange?.(currentSelectedDate);
  };

  const getDayCount = (date: Date) => {
    const daysInMonth: number = getDaysInMonth(date);
    const dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    const blankdaysArray: number[] = [];

    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray: number[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    selectedDate
      ? isEqual(
        new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
        selectedDate,
      )
      : false;

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate(),
      ),
    );
    setType("date");
  };

  const years = useMemo((): number[] => {
    const _years: number[] = [];

    for (let year = new Date().getFullYear(); year > 1930; year--) {
      _years.push(year);
    }

    return _years;
  }, []);

  const setYearValue = (year: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        year,
        datepickerHeaderDate.getMonth() - 1,
        datepickerHeaderDate.getDate(),
      ),
    );
    setType("month");
  };

  const isSelectedYear = (year: number) =>
    selectedDate
      ? isEqual(
        new Date(year, selectedDate.getMonth() - 1, selectedDate.getDate()),
        selectedDate,
      )
      : false;

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);
  const showMonthPicker = () => setType("month");
  const showYearPicker = () => setType("year");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [ datepickerHeaderDate ]);

  const handleInputChange = (value?: string) => {
    const maskedValue = maskDate(value);

    setManualInput(maskedValue);

    onChange?.(checkDate(maskedValue));
    setShowDatepicker(false);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (event.key === BACKSPACE_KEY && value.endsWith(DOT)) {
      setManualInput(value.slice(0, -1));
    }

    if (event.key === BACKSPACE_KEY && selectedDate) {
      setSelectedDate(undefined);
    }
  };

  return (
    <>
      <input name="date" type="hidden" />
      <input
        autoComplete="off"
        className="block py-1.5 px-0 w-full text-base font-bold bg-transparent rounded-none border-0 border-b-2 border-basic-four appearance-none focus:outline-none focus:ring-0 peer cursor-default"
        id={name}
        maxLength={10}
        onChange={(val) => {
          handleInputChange(val.target.value);
        }}
        onClick={toggleDatepicker}
        onKeyDown={handleOnKeyDown}
        placeholder=" "
        ref={calendarRef}
        type="text"
        value={selectedDate ? format(selectedDate, "dd.MM.yyyy") : manualInput}
      />
      <div
        className="cursor-pointer absolute top-0 right-0 py-1.5 px-0"
        onClick={toggleDatepicker}
        ref={calendarIconRef}
      >
        <Image src="/images/svg/calendar.svg" />
      </div>
      {showDatepicker && (
        <div
          className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-10"
          ref={datePickerModalRef}
          style={{ width: "20rem" }}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <button
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                onClick={decrement}
                type="button"
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>
            {type === "date" && (
              <div
                className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
                onClick={showMonthPicker}
              >
                <p className="text-center">
                  {format(datepickerHeaderDate, "MMMM", { locale: tr })}
                </p>
              </div>
            )}
            <div
              className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
              onClick={showYearPicker}
            >
              <p className="text-center">
                {format(datepickerHeaderDate, "yyyy", { locale: tr })}
              </p>
            </div>
            <div>
              <button
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                onClick={increment}
                type="button"
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={`${type === "date" ? "block" : "hidden"}`}>
            <div className="flex flex-wrap mb-3 -mx-1">
              {SHORT_WEEK_DAYS.map((day: any, i: any) => (
                <div className="px-1" key={i} style={{ width: "14.26%" }}>
                  <div className="text-gray-800 font-medium text-center text-xs">
                    {t(day)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap -mx-1">
              {blankDays.map((_, i) => (
                <div
                  className="text-center border p-1 border-transparent text-sm"
                  key={i}
                  style={{ width: "14.26%" }}
                />
              ))}
              {dayCount.map((d, i) => (
                <div className="px-1 mb-1" key={i} style={{ width: "14.26%" }}>
                  <div
                    className={`cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ${
                      isToday(d)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-200"
                    }`}
                    onClick={setDateValue(d)}
                  >
                    {d}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-wrap -mx-1 ${
              type === "month" ? "block" : "hidden"
            }`}
          >
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  onClick={setMonthValue(i)}
                  style={{ width: "25%" }}
                >
                  <div
                    className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                      isSelectedMonth(i)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-200"
                    }`}
                  >
                    {format(
                      new Date(
                        datepickerHeaderDate.getFullYear(),
                        i,
                        datepickerHeaderDate.getDate(),
                      ),
                      "MMM",
                      { locale: tr },
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div
            className={`flex flex-wrap -mx-1 h-[250px] overflow-y-auto ${
              type === "year" ? "block" : "hidden"
            }`}
          >
            {years.map((year) => (
              <div
                className="flex justify-centers items-center"
                key={year}
                onClick={setYearValue(year)}
                style={{ width: "25%" }}
              >
                <div
                  className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                    isSelectedYear(year)
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-200"
                  }`}
                >
                  {format(
                    new Date(
                      year,
                      datepickerHeaderDate.getMonth() - 1,
                      datepickerHeaderDate.getDate(),
                    ),
                    "yyyy",
                    { locale: tr },
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DatePicker;
