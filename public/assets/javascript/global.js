// Front-end JS code for homework solution
// =======================================

// when the document is ready
$(document).ready(function() {

  // immediately hide the container class
  $('.container').hide();

  // run the fetch data function, which will scrape our data
  fetchData();

  // hide these sections before anything else
  $("#seek-box").hide();
  $("#input-area").hide();
  $("#saved-text").hide();
  $("#saved-area").hide();

  // when the visitor clicks on the #seek-box
  $("#seek-box").click(function() {

    // grab whatever article data has been scraped into our db
    // and populate the proper sections.
    populate();

    // with that done, reveal the container
    $('.container').show();

    // hide the initial seek box from view
    $("#seek-box").hide();
  });

});

// set up these global variables
var mongoData;
var dataCount = 0;
var dataDate;

// these variables let the fancy cube on our the page function properly
var state = 0;
var cubeRotateAry = ['show-front', 'show-back', 'show-right', 'show-left', 'show-top', 'show-bottom'];
var sideAry = ['back', 'right', 'left', 'top', 'bottom', 'front'];

// ajax get news data function
var populate = function() {

  // jQuery AJAX call for JSON to grab all articles scraped to our db
  $.getJSON('/check', function(data) {

    // save the articles object data to our mongoData variable
    mongoData = data;

    // save the latest article's date and save it to dataDate
    dataDate = mongoData[mongoData.length - 1].date;
  })
  // when that's done
  .done(function() {
    // running clickBox and saveNote functions
    clickBox();
    saveNote();
  });
};

// ajax get notes data
var gather = function() {

  // find the article's current id
  var idCount = dataCount - 1;

  // jQuery AJAX call for JSON data of notes
  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/gather',
    data: {
      id: mongoData[idCount]._id
    }
  })

  // with that done, post the current Notes to the page
  .done(function(currentNotes) {
    postNote(currentNotes);
  })

  // if something went wrong, tell the user
  .fail(function() {
    console.log("Sorry. Server unavailable.");
  });
};

// render notes from data in the last function
var postNote = function(currentNotes) {

  // remove inputs from the note box
  $("#note-box").val("");

  // make an empty placeholder var for a note
  var note = "";

  // for each of the notes
  for (var i = 0; i < currentNotes.length; i++) {

    // make the note variable equal to itself, 
    // plus the new note and a new line
    note = note + currentNotes[i].noteText + '\n';
  }
  // put the current collection of notes into the notebox
  $("#note-box").val(note);
};

// function containing listener to save notes and clear note taking area
var saveNote = function() {

  // when someone clicks the note button
  $("#note-button").on('click', function() {

    // grab the value from the input box
    var text = $("#input-box").val();

    // grab the current article's id
    var idCount = dataCount - 1;

    // ajax call to save the note
    $.ajax({
      type: "POST",
      dataType: "json",
      url: '/save',
      data: {
        id: mongoData[idCount]._id, // article id
        date: dataDate, // date of article's last update
        note: text // date of note
      }
    })
    // with that done
    .done(function() {

      // empty the input box
      $("#input-box").val("");

      // grab the notes again because we just saved a new note
      gather();
    })
    // if it fails, give the user an error message
    .fail(function() {
      console.log("Sorry. Server unavailable.");
    });

  });
};

// function containing listener to delete notes and clear note taking area
var deleteNote = function() {

  // when user clicks delete button
  $("#delete-button").on('click', function() {

    // make the idCount equal the current article
    var idCount = dataCount - 1;

    // send an ajax call to delete
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: '/delete',
      data: {
        id: mongoData[idCount]._id,
      }
    })
    // with that done, empty the note-box input
    .done(function() {
      $("#note-box").val("");
    })
    // if it fails, tell the user
    .fail(function() {
      console.log("Sorry. Server unavailable.");
    });

  });
};

// This function handles typing animations
var typeIt = function() {
  $("#typewriter-headline").remove();
  $("#typewriter-summary").remove();
  var h = 0;
  var s = 0;
  var newsText;

  if (state > 0) {
    side = state - 1;
  } else {
    side = 5;
  }

  $("." + sideAry[side]).append("<div id='typewriter-headline'></div>");
  $("." + sideAry[side]).append("<div id='typewriter-summary'></div>");

  // cycle to different story
  console.log(mongoData);
  var headline = mongoData[dataCount].headline;
  var summary = mongoData[dataCount].summary;
  dataCount++;
  // type animation for new summary
  (function type() {
    //console.log(newsText);
    printHeadline = headline.slice(0, ++h);
    printSummary = summary.slice(0, ++s);


    // put in the text via javascript
    $("#typewriter-headline").text(printHeadline);
    $("#typewriter-summary").text(printSummary);

    // return stop when text is equal to the writeTxt
    if (printHeadline.length === headline.length && printSummary.length === summary.length) {
      return;
    }
    setTimeout(type, 35);
  }());
};

// render the headline headline
var headline = function() {
  // create the text related to the number of the current article
  var show = "|| Article:" + (dataCount + 1) + " ||";
  // place it in the text box
  $("#headline").text(show);
  // fade the headline in
  $("#headline").fadeIn()
    // and add these style properties to it
    .css({
      position: 'relative',
      'text-align':'center',
      top:100
    })
    .animate({
      position:'relative',
      top: 0
    });
};

// This function handles what happens when the cube is clicked
var clickBox = function() {
  $("#cube").on("click", function() {
    // rotate cycle
    if (state <= 5) {
      state++;
    } else {
      state = 0;
    }
    // add the proper states to the cube based on where it's clicked
    $('#cube').removeClass().addClass(cubeRotateAry[state]);

    //animate headline
    headline();

    //animate text
    typeIt();

    //render notes
    gather();

    //enable delete click listener
    deleteNote();

    //show the note boxes
    $("#input-area").show();
    $("#saved-area").show();
  });
};

// ajax call to do the scrape
var fetchData = function() {
  // call Fetch with AJAX
  $.ajax({
    type: "POST",
    url: '/fetch'
  }).done(function() {
    // show the seek box if it worked
    $("#seek-box").show();
  }).fail(function() {
    // otherwise tell the user an issue has occurred
    alert("Sorry. Server unavailable.");
  });
};
