// makeDate script
// ===============

// this function will make a formatted date for our scraped data
var makeDate = function() {
    // save the current date to d
    var d = new Date();
    // prepare an empty string for our formatted state
    var formattedDate = "";
    // take that string and concatenate the current month of d 
    // (+ 1, since 0 is Jan, Dec is 11, etc.)
    formattedDate = formattedDate + (d.getMonth() + 1) + "_";
    // next get the number of the day in the month from d
    // and concatenate it to the formatted date string.
    formattedDate = formattedDate + d.getDate() + "_";
    // finally, then get the full year, 
    // and add that to the formatted date string
    formattedDate = formattedDate + d.getFullYear();
    // return the formatted date
    return formattedDate;
};

// export the makeDate function so other files in the backend can use it.
module.exports = makeDate;
