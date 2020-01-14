function dateToFormattedString(dateObject) {
    const year = dateObject.getFullYear();  // YYYY
    let month = dateObject.getMonth() + 1;  // MM
    if (month < 10) {
        month = `0${month}`;
    }
    let day = dateObject.getDate();         // DD
    if (day < 10) {
        day = `0${day}`;
    }
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}

module.exports = {
    dateToFormattedString
};