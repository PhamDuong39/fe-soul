import dayjs from "dayjs"
import vi from "dayjs/locale/vi"
import en from "dayjs/locale/en"

export function localeLanguage(isEn, date) {
  const string = dayjs(date)
    .locale(isEn ? en : vi)
    .format("dddd, DD MMMM, YYYY")

  
  return string.charAt(0).toUpperCase() + string.slice(1)
}
