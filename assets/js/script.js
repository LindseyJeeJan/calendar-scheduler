var currentDay = $('#currentDay');
var saveButtons = $('button.save-btn');
var timeBlocks = $('.time-block');
var timeBlockRows = timeBlocks.find('.row');
var feedback = $('#feedback');
var scheduling = {};

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

// Display textareas for the user to input notes in each time block
function renderTextareas() {
    var textarea = $('<textarea class="description"/>');
    timeBlockRows.append(textarea);
}

// Display file icons inside each button
function renderIcons() {
    var icon = $('<i class="fas fa-save"/>');
    saveButtons.append(icon);
}

// Print the schedule to the page from Local Storage
function renderSchedule() {
    // Clear schedule textarea elements
    var textareas = $('textarea').val('');

    // loop over schedule object once for each key/value pair, find the matching data-hour attribute and write the value to it's textarea
        $.each(scheduling, function(key, value) {
            var makeString = 'div[data-time="' + key + '"]';
            var match = $(makeString);
            match.siblings('.row').find('textarea').val(value);
        });
}

// Click event to capture the changes when user clicks Save button.
saveButtons.on('click', function(event) {
    event.preventDefault();
    var buttonClicked = $(this);
   // find the textarea and get its value
    var row = buttonClicked.siblings(timeBlockRows);
    var textAreaValue = row.find('textarea').val().trim();

    if (textAreaValue.length > 0){
        // find out what hour was saved
        var hourValue = buttonClicked.closest('.time-block').find('.hour').attr('data-time');
        // reference that object key and assign the new description
        scheduling[hourValue] = textAreaValue;
        //  push to local storage
        localStorage.setItem("scheduling", JSON.stringify(scheduling));
         // show feedback
        feedback.show();
        setTimeout(function() {
            feedback.hide();
            // hide feedback again
        },1000);      
    }    

    renderSchedule() ;
});

// render the schedule and time display when page loads
function init(){
    renderCurrentDayDisplay();
    assignColorClasses();
    renderTextareas();
    renderIcons();

    // Get schedule from localStorage
  var storedScheduling = JSON.parse(localStorage.getItem("scheduling"));
  // If schedule appointments were retrieved from localStorage, update the scheduling object to it
  if (storedScheduling !== null) {
    scheduling = storedScheduling;
  }

  // Render schedule to the DOM
    renderSchedule();
}

init();