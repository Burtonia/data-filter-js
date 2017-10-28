// Data Filter JS v1.0.1 (2017-10-28)
// Simple and Flexible Data Filter for Click and Keystroke Events
// The MIT License (MIT)
// Copyright (c) 2017 Alexander Burton
// Last Change: [2017-10-28]
// Uppercase method added to node and search_string to eliminate case sensitivity on keystroke. 
// Case sensitivity will be removed from button search next.

function jQueryDataFilter(config){
  // define variables
  var filterGroup = config.filterGroup;
  var filterNode = config.filterNode;
  var filterButtonGroup = config.filterButtonGroup;
  var transitionSpeed = config.transitionSpeed;
  var filter_group = $(filterGroup);
  var filter_node = $(filterGroup+' > '+filterNode);
  var search_val = $(filterButtonGroup+'> '+'input[type="text"]').value;

  // (Button) Data Filter Function
  $(filterButtonGroup+' > button').on('click', function(e) {
    $(filterNode+'.filter-me').css({"transition":"all "+transitionSpeed+" ease-in-out"})
    var eventFilter = e.currentTarget.attributes[1].nodeValue;
     // Loop through Filter Nodes on Button Click
     $.each(filter_node, function(i, v) {
        if(eventFilter == "show-all") {
          filter_node[i].classList.remove('filter-me');
        } else if(filter_node[i].getAttribute('data-filter').includes(eventFilter) == false) {
          filter_node[i].classList.add('filter-me')
        } else {filter_node[i].classList.remove('filter-me');}
     });
  }); // end click event

  // (Keystroke) Data Filter Function
  $(filterButtonGroup+' > input[type="text"]').on('keypress keydown keyup', function(e, fnd) {
    // Loop through Filter Nodes on Keystroke
    $.each($(filterNode), function(i, v) {
      var node = v.getAttribute("data-filter").toString().toUpperCase();
      var search_string = $(filterButtonGroup+' > '+'input[type="text"]').val().toUpperCase();
      //console.log(node.getAttribute('data-filter'));
      if(node.includes(search_string) == false) {
        v.classList.add('filter-me');
      } else {v.classList.remove('filter-me');}
    }); // end each
  }); // end keypress
}
