export const LABEL_DAYS = ["S", "M", "T", "W", "T", "F", "S"];
export const LABEL_MONTHS = [
  { title: "January", days_count: 31 },
  { title: "February", days_count: 28 },
  { title: "March", days_count: 31 },
  { title: "April", days_count: 30 },
  { title: "May", days_count: 31 },
  { title: "June", days_count: 30 },
  { title: "July", days_count: 31 },
  { title: "August", days_count: 31 },
  { title: "September", days_count: 30 },
  { title: "October", days_count: 31 },
  { title: "November", days_count: 30 },
  { title: "December", days_count: 31 },
];

export function validate(dateString) {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[/](0?[1-9]|1[0-2])[/]\d{4}$/;
  // Match the date format through regular expression
  if (dateString.match(dateformat)) {
    let operator = dateString.split("/");
    // Extract the string into month, date and year
    let datepart = [];
    if (operator.length > 1) {
      datepart = dateString.split("/");
    }
    let month = parseInt(datepart[0]);
    let day = parseInt(datepart[1]);
    let year = parseInt(datepart[2]);
    // Create list of days of a month
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        ///This check is for Confirming that the date is not out of its range
        return false;
      }
    } else if (month == 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) {
        leapYear = true;
      }
      if (leapYear == false && day >= 29) {
        return false;
      } else if (leapYear == true && day > 29) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}
