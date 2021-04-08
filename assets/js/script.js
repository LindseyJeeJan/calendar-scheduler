var currentDay = $('#currentDay');
var saveButtons = $('button.save-btn');
var timeBlocks = $('.time-block');
var timeBlockRows = timeBlocks.find('.row');
var hourBlocks = timeBlocks.find('.hour');

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
}

// click event to capture the changes when user clicks Save button.
saveButtons.on('click', function(event) {
    var buttonClicked = $(this);
    // find the row
    var row = buttonClicked.siblings('.row');
    // find the textarea and get its value
    var rowTextarea = row.find('textarea');
    var textAreaValue = rowTextarea.val();
    // write the textarea value to the description container
    var rowDescription = row.find('.description');
    rowDescription.text(textAreaValue);
    // TODO: add the description to local storage
    // remove the textarea
    rowTextarea.remove();
});

// click event to convert row to textarea
timeBlockRows.on('click', function(event) {
    var rowClicked = $(this);
    // Only create a textarea if one does not already exist
    var existingTextarea = rowClicked.find('textarea'); 
    if (!$(existingTextarea).length){
        // Display existing description message in the textarea
        var existingDesc = rowClicked.find('.description');
        var existingDescText = existingDesc.text();
        var textAreaToDisplay = $("<textarea></textarea>");
        textAreaToDisplay.val(existingDescText);
        existingDesc.empty();
        
        // put new text area into the row
        $(this).append(textAreaToDisplay);
        textAreaToDisplay.focus();

        // if the textarea is empty, destroy it
        textAreaToDisplay.on('blur', function(){
            if (textAreaToDisplay.val() == ''){
                textAreaToDisplay.remove();
            }
        });
    }

});

// render the schedule and time display when page loads
function init(){
    renderCurrentDayDisplay();
    assignColorClasses();
    renderSchedule();
}

init();