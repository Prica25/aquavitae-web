export default function (
  date: Date | string,
  { showDate = true, showHour = true, hideSeconds = false } = {}
): string {
  let parsedDate: Date

  if (typeof date === 'string') {
    if (date.includes('T') && date.includes(':')) {
      parsedDate = new Date(date)
    } else if (date.includes(':')) {
      const [timePart] = date.split('+')
      const [hourPart, minutePart, secondPart] = timePart.split(':')

      parsedDate = new Date()
      parsedDate.setUTCHours(parseInt(hourPart, 10))
      parsedDate.setUTCMinutes(parseInt(minutePart, 10))
      parsedDate.setUTCSeconds(parseInt(secondPart, 10))

      showDate = false
    } else {
      parsedDate = new Date(date)
    }
  } else {
    parsedDate = date
  }

  if (parsedDate instanceof Date) {
    let formatedDate = []

    if (showDate) {
      formatedDate.push(
        `${padChar(parsedDate.getDate())}/${padChar(
          parsedDate.getMonth() + 1
        )}/${parsedDate.getFullYear()}`
      )
    }

    if (showHour) {
      if (hideSeconds) {
        formatedDate.push(
          `${padChar(parsedDate.getHours())}:${padChar(
            parsedDate.getMinutes()
          )}`
        )
      } else {
        formatedDate.push(
          `${padChar(parsedDate.getHours())}:${padChar(
            parsedDate.getMinutes()
          )}:${padChar(parsedDate.getSeconds())}`
        )
      }
    }

    return formatedDate.join(' ').trim()
  }

  return ''
}

function padChar(nr: number, len = 2, chr = `0`) {
  return `${nr}`.padStart(2, chr)
}
