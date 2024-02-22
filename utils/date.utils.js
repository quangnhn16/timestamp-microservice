function isValidDateString(dateString) {
  let date = new Date(dateString);
  return !isNaN(date.getTime());
}

function isValidUnixString(string) {
  // Regex pattern for a valid Unix milliseconds string
  const pattern = /^\d+$/;

  // Check if the string matches the pattern
  if (!pattern.test(string)) {
    return false;
  }

  // Check if the integer value is within the valid range
  try {
    const value = parseInt(string, 10);
    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
}

module.exports = { isValidDateString, isValidUnixString };
