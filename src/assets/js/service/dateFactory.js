App.factory('DateFactory', function () {
    var DateFactory = {};

    DateFactory.getDateDiff = function (date) {
        if (date) {
            var date = new Date(date).getTime();
            let temp = Number(date)
            date = (typeof temp !== 'number') ?
                new Date(date).getTime() :
                temp;
            var currentDateObj = new Date();
            var endOfTheMonth = new Date(currentDateObj.getFullYear(),
                currentDateObj.getMonth() + 1, 0);
            endOfTheMonth = endOfTheMonth.getDate()
            var dateConversion = {
                oneSecond: 1000,
            }
            //configure number of days
            dateConversion.oneMin = 60 * dateConversion.oneSecond;
            dateConversion.oneHour = 60 * dateConversion.oneMin;
            dateConversion.oneDay = 24 * dateConversion.oneHour;
            dateConversion.oneWeek = 7 * dateConversion.oneDay;
            dateConversion.oneMonth = endOfTheMonth * dateConversion.oneDay;
            dateConversion.oneYear = dateConversion.oneDay * 364;

            var now = currentDateObj.getTime();
            var dateDiff = Math.abs(now - date);

            if (dateDiff >= dateConversion.oneYear) {
                dateDiff = '30d+'
            } else if (dateDiff >= dateConversion.oneMonth) {
                dateDiff = '30d+'
            } else if (dateDiff >= dateConversion.oneDay) {
                dateDiff = Math.round(dateDiff / dateConversion.oneDay) + 'd';
            } else if (dateDiff >= dateConversion.oneHour) {
                dateDiff = Math.round(dateDiff / dateConversion.oneHour) + 'h';
            } else if (dateDiff >= dateConversion.oneMin) {
                dateDiff = Math.round(dateDiff / dateConversion.oneMin) + 'm'
            } else if (dateDiff >= dateConversion.oneSecond) {
                dateDiff = Math.round(dateDiff / dateConversion.oneSecond) + 's'
            } else {
                dateDiff = 'Just now';
            } 

            /* OLD
            if (dateDiff >= dateConversion.oneYear) {
                dateDiff = Math.round(dateDiff / dateConversion.oneYear) + ' yr ago'
            }
            else if (dateDiff >= dateConversion.oneMonth) {
                dateDiff = Math.round(dateDiff / dateConversion.oneMonth) + ' mos ago'
            }
            else if (dateDiff >= dateConversion.oneWeek) {
                dateDiff = Math.round(dateDiff / dateConversion.oneWeek) + ' wk ago'
            }
            else if (dateDiff >= dateConversion.oneDay) {
                dateDiff = Math.round(dateDiff / dateConversion.oneDay) + ' day ago';
            }
            else if (dateDiff >= dateConversion.oneHour) {
                dateDiff = Math.round(dateDiff / dateConversion.oneHour) + ' hrs ago';
            }
            else if (dateDiff >= dateConversion.oneMin) {
                dateDiff = Math.round(dateDiff / dateConversion.oneMin) + ' mins ago'
            }
            else if (dateDiff >= dateConversion.oneSecond) {
                dateDiff = Math.round(dateDiff / dateConversion.oneSecond) + ' sec ago'
            }
            else {
                dateDiff = 'Just now';
            } */
            return dateDiff;
        }
    }

    // with ago
    DateFactory.getDateDiffwAgo = function (date) {
        if (date) {
            var date = new Date(date).getTime();
            let temp = Number(date)
            date = (typeof temp !== 'number') ?
                new Date(date).getTime() :
                temp;
            var currentDateObj = new Date();
            var endOfTheMonth = new Date(currentDateObj.getFullYear(),
                currentDateObj.getMonth() + 1, 0);
            endOfTheMonth = endOfTheMonth.getDate()
            var dateConversion = {
                oneSecond: 1000,
            }
            //configure number of days
            dateConversion.oneMin = 60 * dateConversion.oneSecond;
            dateConversion.oneHour = 60 * dateConversion.oneMin;
            dateConversion.oneDay = 24 * dateConversion.oneHour;
            dateConversion.oneWeek = 7 * dateConversion.oneDay;
            dateConversion.oneMonth = endOfTheMonth * dateConversion.oneDay;
            dateConversion.oneYear = dateConversion.oneDay * 364;

            var now = currentDateObj.getTime();
            var dateDiff = Math.abs(now - date);
            if (dateDiff >= dateConversion.oneYear) {
                dateDiff = Math.round(dateDiff / dateConversion.oneYear) + ' year ago'
            }
            else if (dateDiff >= dateConversion.oneMonth) {
                dateDiff = Math.round(dateDiff / dateConversion.oneMonth) + ' months ago'
            }
            else if (dateDiff >= dateConversion.oneWeek) {
                dateDiff = Math.round(dateDiff / dateConversion.oneWeek) + ' weeks ago'
            }
            else if (dateDiff >= dateConversion.oneDay) {
                dateDiff = Math.round(dateDiff / dateConversion.oneDay) + ' days ago';
            }
            else if (dateDiff >= dateConversion.oneHour) {
                dateDiff = Math.round(dateDiff / dateConversion.oneHour) + ' hrs ago';
            }
            else if (dateDiff >= dateConversion.oneMin) {
                dateDiff = Math.round(dateDiff / dateConversion.oneMin) + ' minutes ago'
            }
            else if (dateDiff >= dateConversion.oneSecond) {
                dateDiff = Math.round(dateDiff / dateConversion.oneSecond) + ' sec ago'
            }
            else {
                dateDiff = 'Just now';
            }
            return dateDiff;
        }
    }

    DateFactory.getBetweenDays = function (startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(startDate);
        const secondDate = new Date(endDate);

        dateDiff = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return dateDiff;
    }


    DateFactory.dateDifference = function (actualDate) {
        // Calculate time between two dates:
        var date_expired = new Date(actualDate);
        const date1 = date_expired; // the date you already commented/ posted
        const date2 = new Date(); // today

        if(date1 < date2){
            return `Closed`;
        }

        let r = {}; // object for clarity
        let message;

        const diffInSeconds = Math.abs(date2 - date1) / 1000;
        const days = Math.floor(diffInSeconds / 60 / 60 / 24);
        const hours = Math.floor(diffInSeconds / 60 / 60 % 24);
        const minutes = Math.floor(diffInSeconds / 60 % 60);
        const seconds = Math.floor(diffInSeconds % 60);
        const milliseconds =
            Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);

        const months = Math.floor(days / 31);
        const years = Math.floor(months / 12);

        // the below object is just optional 
        // if you want to return an object instead of a message
        r = {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
        };

        // check if difference is in years or months
        if (years === 0 && months === 0) {
            // show in days if no years / months
            if (days > 0) {
                if (days === 1) {
                    message = days + ' day left';
                } else { message = days + ' days left'; }
            } else if (hours > 0) {
                if (hours === 1) {
                    message = hours + ' hour left';
                } else {
                    message = hours + ' hours left';
                }
            } else {
                // show in minutes if no years / months / days
                if (minutes === 1) {
                    message = minutes + ' minute left';
                } else { message = minutes + ' minutes left'; }
            }
        } else if (years === 0 && months > 0) {
            // show in months if no years
            if (months === 1) {
                message = months + ' month left';
            } else { message = months + ' months left'; }
        } else if (years > 0) {
            // show in years if years exist
            if (years === 1) {
                message = years + ' year';
            } else { message = years + ' years'; }
        }

        return `${message} remaining` ;

        // this is the message a user see in the view
    }


    DateFactory.dateShort = function (actualDate) {
        // Calculate time between two dates:
        var date_expired = new Date(actualDate);
        const date1 = date_expired; // the date you already commented/ posted
        const date2 = new Date(); // today

        let r = {}; // object for clarity
        let message;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


        const diffInSeconds = Math.abs(date2 - date1) / 1000;
        const days = Math.floor(diffInSeconds / 60 / 60 / 24);
        const hours = Math.floor(diffInSeconds / 60 / 60 % 24);
        const minutes = Math.floor(diffInSeconds / 60 % 60);
        const seconds = Math.floor(diffInSeconds % 60);

        const months = Math.floor(days / 31);
        const years = Math.floor(months / 12);

 

        // the below object is just optional 
        // if you want to return an object instead of a message
        r = {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };

        // check if difference is in years or months
        if (years === 0 && months === 0) {
            // show in days if no years / months
            if (days > 0) {
                var weekday = date_expired.getDay()
                message = weekNames[weekday] + ` ● ${moment(actualDate).format('ll')}`;
            } else if (hours > 0) {
                message = formatAMPM(date_expired)
            } else {
                // show in minutes if no years / months / days
                if (minutes === 1) {
                    message = minutes + ' minute ago';
                } else { message = minutes + ' minutes ago'; }
            }
        } else if (years === 0 && months > 0) {
            // show in months if no years
            if (months === 1) {
                message = months + ' month' + ` ● ${moment(actualDate).format('ll')}`;
            } else { message = months + ' months' + ` ● ${moment(actualDate).format('ll')}`; }
        } else if (years > 0) {
            // show in years if years exist
            if (years === 1) {
                message = years + ' year' + ` ● ${moment(actualDate).format('ll')}`;
            } else { message = years + ' years' + ` ● ${moment(actualDate).format('ll')}`; }
        }

        return message;
        // this is the message a user see in the view
    }


    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return DateFactory;
})