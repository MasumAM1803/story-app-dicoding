function formatDate(date) {
    let newDate = new Date(date);

    let day = newDate.getDate();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][newDate.getMonth()];
    let year = newDate.getFullYear();

    let formattedDate = day + " " + month + " " + year

    return formattedDate;
}

export default formatDate