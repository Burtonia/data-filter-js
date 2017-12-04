// Data Filter JS v1.0.3 (2017-12-04)
// Simple and Flexible Data Filter for Click and Keystroke Events
// The MIT License (MIT)
// Copyright (c) 2017 Alexander Burton
// Last Change: [2017-12-04]
// Uppercase method added to node and search_string to eliminate case sensitivity on keystroke.
// Case sensitivity will be removed from button search next.
// Masonry Optional with a simple boolean in the config object.

function DataFilterJS(config){
  // define variables
  var filterGroup = config.filterGroup;
  var filterNode = config.filterNode;
  var filterButtonGroup = config.filterButtonGroup;
  var transitionSpeed = config.transitionSpeed;
  var filter_group = $(filterGroup);
  var filter_node = $(filterGroup+' > '+filterNode);
  var search_val = $(filterButtonGroup+'> '+'input[type="text"]').value;

  // Init Masonry if Input is Empty
  if(config.masonry == true && typeof search_value == "undefined") {
    $(filterGroup).masonry({itemSelector: filterNode, columnWidth: config.columnWidth});
  }

  // (Button) Data Filter Function
  $(filterButtonGroup+' > button').on('click', function(e) {
    $(filterNode+'.filter-me').css({"transition":"all "+transitionSpeed+" ease-in-out"})
    var eventFilter = e.currentTarget.attributes[1].nodeValue;
     // Loop through Filter Nodes on Button Click
     $.each(filter_node, function(i, v) {
        if(eventFilter == "*") {
          filter_node[i].classList.remove('filter-me');
        } else if(filter_node[i].getAttribute('data-filter').includes(eventFilter) == false) {
          filter_node[i].classList.add('filter-me')
        } else {filter_node[i].classList.remove('filter-me');}
     });
     // Masonry JS Scripts
     initMasonry();
  }); // end click event

  // (Keystroke) Data Filter Function
  $(filterButtonGroup+' > input[type="text"]').on('keypress keydown keyup', function(e, fnd) {
    // Loop through Filter Nodes on Keystroke
    $.each(filter_node, function(i, v) {
      var node = v.getAttribute("data-filter").toString().toUpperCase();
      var search_string = $(filterButtonGroup+' > '+'input[type="text"]').val().toUpperCase();
      //console.log(node.getAttribute('data-filter'));
      if(node.includes(search_string) == false) {
        v.classList.add('filter-me');
      } else {
        v.classList.remove('filter-me');
      }
    }); // end each
    // Masonry JS Scripts
    initMasonry();
  }); // end keypress listener

  // Init Masonry Function
  function initMasonry() {
    if(config.masonry == true) {
      $(filterGroup).masonry({itemSelector: filterNode+':not(.filter-me)', columnWidth: config.columnWidth});
    }
  }
}

// var example = new DataFilterJS({
//   filterGroup: '.grid-selector',
//   filterNode: '.node-selector',
//   filterButtonGroup: '.filter-button-group',
//   transitionSpeed: '0.5s',
//   masonry: true,
//   columnWidth: 150
// });
