const currentDaySpan = document.querySelector("#currentDay");
const containerDiv = document.querySelector(".container");

const intTime = moment().format("H")
const inputHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var currentTime = moment().format("h") + moment().format("A");
var currentDate = moment().format("dddd MMMM Do");


//Test if after 5pm then set to next day, and start next day at 9AM, and clear local storage
if (intTime > 17 ) {
   const formatTime = moment().format(moment.HTML5_FMT.DATE); 
   var newTime = moment(formatTime).add(1, 'days');
   currentDate = newTime.format('dddd MMMM Do');
   currentTime = "9AM";
   localStorage.removeItem("dayPlanner");
}
var dateArr = currentDate.split(" ");
//get items from local storage to present
var obj = JSON.parse(localStorage.getItem("dayPlanner"));  


// if current time is earlier than 9AM, then set to 9AM to start the day
currentTime = (intTime < 9) ? "9AM": currentTime;

// if the object hasn't existed before initialize it. 
var dayPlanObj = (!obj) ? new Object : obj;
currentDaySpan.textContent = dateArr[0] + ", " + dateArr[1] + " " + dateArr[2];

var inputHoursIndex = inputHours.indexOf(currentTime);

for(let i = 0; i < inputHours.length;i++){
    let rowDiv = $("<div>");
    $(".container").append(rowDiv)
    rowDiv.addClass("row");

    let hourDiv = $("<div>");
    $(rowDiv).append(hourDiv);
    hourDiv.addClass("hour col-sm-1").text(inputHours[i]);

    let entryDiv = $("<div>");
    $(rowDiv).append(entryDiv);

    console.log(i + " " + inputHoursIndex);
    //determine if it's the past present or current hour
    switch(true){
        case i < inputHoursIndex:
            entryDiv.addClass("past col-sm-8");
            break;
        case i === inputHoursIndex:
            entryDiv.addClass("present  col-sm-8");
            break;
        case i > inputHoursIndex:
            entryDiv.addClass("future  col-sm-8");
            break;
    }

    let textAreaBox = $("<textarea>");
    $(entryDiv).append(textAreaBox);

    let testHour = inputHours[i];
    let entry = (dayPlanObj[testHour]) ? dayPlanObj[testHour] : "";
    textAreaBox.val(entry);


    let saveDiv = $("<div>");
    $(rowDiv).append(saveDiv);
    saveDiv.addClass("col-sm-1 btnDiv");

    let saveBtn = $("<button>");
    $(saveDiv).append(saveBtn);
    $(saveBtn).addClass("saveBtn");
    saveBtn.text("save");

    $(saveBtn).click(function (){
        saveItem(inputHours[i], textAreaBox.val());
    });

}
////////////////////////////////
// function that puts object into local storage only
/////////////////////////////////////////////
function saveItem(clickedHour, textValue) {
    dayPlanObj[clickedHour] = textValue;
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanObj));
}
