import { DatePicker } from "@fluentui/react"
import { useFormik } from "formik";
import { useCallback } from 'react';
import moment from 'moment'

export function ClaimDatePicker({ formik }: { formik: ReturnType<typeof useFormik> }) {
  const lastSixMonths = moment().subtract(6, 'months').format('YYYY-MM-DD').toString()
  const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD').toString()
  const dateHandler = useCallback((date?: Date | null) => {
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD').toString()
      formik.setFieldValue('incidentDate', formattedDate)
    }
  }, [])

  return (
    <DatePicker
      onSelectDate={dateHandler}
      minDate={new Date(lastSixMonths)}
      maxDate={new Date(yesterday)}
    />
  )
}