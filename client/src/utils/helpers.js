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

export function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}