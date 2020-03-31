export const dateToStr = (date) => {
    let year = date.getFullYear().toString();

    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;

    let day = date.getDate().toString();
    day = day.length === 1 ? '0' + day : day;

    const fullDate = [year, month, day];
    
    return fullDate.join("-");
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const deserialize = serializedJavascript => {
    return eval('(' + serializedJavascript + ')');
}

export const changeDateFormat = (dateStr) => {
    const dateElements = dateStr.split("-");
    let mon;
    switch(dateElements[1]) {
        case "01":
            mon = "Jan"; break;
        case "02":
            mon = "Feb"; break;
        case "03":
            mon = "Mar"; break;
        case "04":
            mon = "Apr"; break;
        case "05":
            mon = "May"; break;
        case "06":
            mon = "Jun"; break;
        case "07":
            mon = "Jul"; break;
        case "08":
            mon = "Aug"; break;
        case "09":
            mon = "Sep"; break;
        case "10":
            mon = "Oct"; break;
        case "11":
            mon = "Nov"; break;
        case "12":
            mon = "Dec"; break;
        default:
            mon = "NAN";
    }
    return dateElements[2] + " " + mon + ", " + dateElements[0];
}