function Step() {
  this.startStep = function(step) {
    
    //window.location.hash = step.id;
    //highlightObject(true,step.logic.s.logic.eventSelector);
    var s = jQuery.extend(true, {}, step);
    var clicked = false;
    
    s.logic.eventSelector= s.logic.eventSelector.replace("$iter$", game.iteration)
    $("#headerText").text(s.longText);
    $("#footerText").text(s.bottomText);
    // $("#view").off()
    // $("#view").on("click", function() {
    //   //updateScore(-1);
    //   
    //   
    // });

    highlightObject(true,s.logic.eventSelector);

    var composite = function(evt) {
      evt.preventDefault();
      
      
      window["eventFunctions"][s.logic.eventFunction](evt)
      if (game.testMode && s.logic && s.logic.criteria) {
        var criteriaVar = game.state[s.logic.criteria.variable]
        criteriaVar[game.iteration] = JSON.parse(JSON.stringify(s.logic.criteria.value)) //returns reference to value, don't touch
      }
      if (s.logic.criteria) {
        var criteriaVar = game.state[s.logic.criteria.variable]

      }
      
      if ((s.logic.criteria && isEqual(criteriaVar[game.iteration], s.logic.criteria.value)) || !s.logic.criteria) {
        highlightObject(false, s.logic.eventSelector);

        $(s.logic.eventSelector).off()
        if (s.logic.postEventFunction) {
          
          window["eventFunctions"][s.logic.postEventFunction]()
          //s.logic.postEventFunction()
        }
        game.score = 0
        //updateScore(11);
        
        game.nextStep()

        //$("#headerText").fadeTo(300, 0.25);
      } else if (s.logic.criteria.messageWrong) {
        game.state[s.logic.criteria.variable] = undefined;
        message(s.logic.criteria.messageWrong);
        //updateScore(-5);
        
      }
    }
    //    
   $(s.logic.eventSelector).on(s.logic.eventType, composite);
    //$("#enzTube").on("click", composite);
    
    if (game.testMode && s.id!=game.hash) {
    $(s.logic.eventSelector).trigger(s.logic.eventType);
    }
    if (game.testMode && s.id==game.hash) {
    game.testMode = false
    }

  }
}
