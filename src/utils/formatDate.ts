export default function (
  date: Date | string,
  { showDate = true, showHour = true } = {}
): string {
  if (date) {
    if (typeof date === 'string') {
      date = new Date(date)
    }

    let formatedDate = []
    if (showDate) {
      formatedDate.push(
        `${padChar(date.getDate())}/${padChar(
          date.getMonth() + 1
        )}/${date.getFullYear()}`
      )
    }
    if (showHour) {
      formatedDate.push(
        `${padChar(date.getHours())}:${padChar(date.getMinutes())}:${padChar(
          date.getSeconds()
        )}`
      )
    }

    return formatedDate.join(' ')
  }
  return ''
}

function padChar(nr: number, len = 2, chr = `0`) {
  return `${nr}`.padStart(2, chr)
}
