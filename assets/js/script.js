var currentDay = $('#currentDay');
var saveButtons = $('button.save-btn');
var timeBlocks = $('.time-block');
var timeBlockRows = timeBlocks.find('.row');
var hourBlocks = timeBlocks.find('.hour');

var scheduling = {
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: ''
};

function renderCurrentDayDisplay() {
    // Get today from moment and format it appropriately, write to page
    var today = moment().format('dddd, MMMM Do');
    currentDay.text(today);
}

function assignColorClasses() {
    // Get the current time from moment, figure out if it is past, present or future according to the display time for the schedule blocks
    var currentTime = moment().format('HH'); 
    
    $.each(hourBlocks, function() {
        var blockTime = $(this).attr("data-time"); 
        if (blockTime == currentTime) {
            $(this).siblings('.row').addClass('present');
        } else if (blockTime <= currentTime) {
            $(this).siblings('.row').addClass('past');
        } else {
            $(this).siblings('.row').addClass('future');
        } 
    });

}

function renderSchedule() {
    // TODO: get schedule from Local Storage
    var updatedSchedule = JSON.parse(localStorage.getItem("scheduling"));
    var hours = $('.hour');
    var hourValue = hours.attr('data-time');
    for (const [key, value] of Object.entries(scheduling)) {
        console.log(`${key}: ${value}`);
    }   
}

// click event to capture the changes when user clicks Save button.
saveButtons.on('click', function(event) {
    var buttonClicked = $(this);
    // find the row
    var row = buttonClicked.siblings(timeBlockRows);
    // find the textarea and get its value
    var rowTextarea = row.find('textarea');
    var textAreaValue = rowTextarea.val().trim();
    if (textAreaValue.length > 0){
        // find out what hour was saved
        var hourValue = buttonClicked.closest('.time-block').find('.hour').attr('data-time');
        // reference that object key and assign the new description
        scheduling[hourValue] = textAreaValue;
        //  push to local storage
        localStorage.setItem(("scheduling"), JSON.stringify(scheduling));
    }    

    renderSchedule() ;
});

// render the schedule and time display when page loads
function init(){
    renderCurrentDayDisplay();
    assignColorClasses();
    renderSchedule();
}

init();