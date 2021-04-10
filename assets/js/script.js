var currentDay = $('#currentDay');
var saveButtons = $('button.save-btn');
var timeBlocks = $('.time-block');
var timeBlockRows = timeBlocks.find('.row');

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

 // Get today from moment and format it appropriately, write to page
function renderCurrentDayDisplay() {
    var today = moment().format('dddd, MMMM Do');
    currentDay.text(today);
}

// Get the current time from moment, figure out if it is past, present or future according to the display time for the schedule blocks
function assignColorClasses() {
    var currentTime = moment().format('HH'); 
    var hourBlocks = timeBlocks.find('.hour');

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

function renderTextareas() {
    var textarea = $('<textarea class="description"/>');
    timeBlockRows.append(textarea);
}

function renderIcons() {
    var icon = $('<i class="fas fa-save"/>');
    saveButtons.append(icon);
}

function renderSchedule() {
    // TODO: get schedule from Local Storage
    var updatedSchedule = JSON.parse(localStorage.getItem("scheduling"));
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
    renderTextareas();
    renderIcons();
    renderSchedule();
}

init();