var currentDay = $('#currentDay');
var saveButtons = $('button.save-btn');
var timeBlocks = $('.time-block');
var hourBlocks = timeBlocks.find('.hour');

function renderCurrentDay() {
    var today = moment().format('dddd, MMMM Do');
    currentDay.text(today);
}

function assignColorClasses() {
    var currentTime = moment().format('HH'); 

    $.each(hourBlocks, function() {
        var blockTime = $(this).attr("data-time"); 
        if (blockTime <= currentTime){
            console.log("past");
            $(this).siblings('.row').addClass('past');
        } else if(blockTime >= currentTime){
            console.log("future");
            $(this).siblings('.row').addClass('future');
        } else {
            console.log("present");
            $(this).siblings('.row').addClass('present');
        }
    });

}

saveButtons.on('click', function(event) {
    var buttonClicked = $(event.target);
    console.log('Button Clicked', buttonClicked);
});

function init(){
    renderCurrentDay();
    assignColorClasses();
}

init();