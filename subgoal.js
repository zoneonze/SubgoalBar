//Code based on @annedorko's work
//SUB GOAL BAR
var maxLevel = 5; // Maximum levels to break through
var fields;
var totalSubs = 5; // The total number of subs
var percent; // Percentage of subs out of a current goal
var goalList;
var level = 1;
var data;
//** LOAD IN INITIAL WIDGET DATA
//*
//*
window.addEventListener('onWidgetLoad', function (obj) {
  // Get base data
  data = obj["detail"]["session"]["data"];
  const fieldData = obj["detail"]["fieldData"];
  fields = fieldData;
  // Set initial goal data
  maxLevel = fieldData["num_goals"];
  steps = fieldData["num_steps"];
  totalSubs = data["subscriber-total"]["count"];
  // Set the 10 goals list
  goalList = [
    [fieldData["level_1_goal"],fieldData["level_1"]],
    [fieldData["level_2_goal"],fieldData["level_2"]],
    [fieldData["level_3_goal"],fieldData["level_3"]],
    [fieldData["level_4_goal"],fieldData["level_4"]],
    [fieldData["level_5_goal"],fieldData["level_5"]],
    [fieldData["level_6_goal"],fieldData["level_6"]],
    [fieldData["level_7_goal"],fieldData["level_7"]],
    [fieldData["level_8_goal"],fieldData["level_8"]],
    [fieldData["level_9_goal"],fieldData["level_9"]],
    [fieldData["level_10_goal"],fieldData["level_10"]],
  ];
  level = getLevel( totalSubs, goalList );
  goal = levelGoal( level, fields );
  label = levelLabel( level, fields );
  // Set goal live
  reloadGoal();
});

//** UPDATE INFO WIDGET INFORMATION
//
//
window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const event = obj["detail"]["event"];
  if ( listener == 'subscriber-latest' ) {
    totalSubs++;
    // Sub bar
    reloadGoal();
    //wait so if we hit 100% it's shown for 5 sec before changing the dynamicSubGoal
    setTimeout(function(){
          goal = levelGoal( level, fields );
          label = levelLabel( level, fields );
          reloadGoal();
  }, 5000);
  }
});


//** CALCULATION FUNCTIONS FOR SUB GOAL BAR
//
//
function reloadGoal() {
  // Set levels
  level = getLevel( totalSubs, goalList );
  // Get goal segment amount*/
  $('#progress .endgame .amount').text( goal );
  // Set percent
  percent = doPercent( totalSubs, goal);
  spercent = calcPercent(totalSubs, goal);
  // Update goal bar
  $('#progress .loading .amount').text( totalSubs );
  $('#progress .percent').text( spercent +"%" );
  var w = document.querySelector('.loading').style.minWidth;
  w = Number(w) + Number(percent) ;
  $('#progress .loading').css(
    {
      'width': w + '%'
    });
  $('#progress #current_goal').text( label );
}

function getLevel( totalSubs, goalList ) {
  while (level < maxLevel && totalSubs >= goalList[level-1][0]){
    level = level+1;
  }
  return level;
}

function levelLabel( level, fields ) {
  var labelName = 'level_' + level;
  var label = fields[labelName];
  return label;
}

function levelGoal( level, fields ) {
  var goalName = 'level_' + level + '_goal';
  var goal = fields[goalName];
  return goal;
}

function doPercent( totalSubs, goal ) {
  var perc = totalSubs / goal;
  if (totalSubs >= goal){
    var perc = 100;
  }
  var amount = perc * 100;
  if ( amount < 0 ) {
    amount = 0;
  }
  if ( amount > 100 ) {
    amount = 100;
  }
  return amount;
}
function calcPercent( totalSubs, goal ) {
  var perce = Math.round(totalSubs / goal * 100);
  if (perce >100) {
    perce=100; }
  return perce;
}