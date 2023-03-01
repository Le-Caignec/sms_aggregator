export function timestampToDateString(timestamp: number) {
    const date = new Date(timestamp * 1000) // convert to milliseconds
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // add 1 because getMonth() returns 0-indexed months
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }