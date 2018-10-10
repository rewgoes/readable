export function timeToString(time = Date.now()) {
  return (new Intl.DateTimeFormat('en-US', {
    hour12: true,
    hour: 'numeric',
    dayperiod: true,
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })).format(new Date(time), 'hour12')
}