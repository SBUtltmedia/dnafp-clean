function Step() {
  this.startStep = function(step) {
    console.log("Hello", step)
    //window.location.hash = step.id;
    //highlightObject(true,step.logic.eventSelector);
    var s = jQuery.extend(true, {}, step);
    var clicked = false;
    $("#headerText").text(s.longText);
    $("#footerText").text(s.bottomText);
    // $("#view").off()
    // $("#view").on("click", function() {
    //   //updateScore(-1);
    //   console.log("Score: " + game.score)
    //   console.log("Test")
    // });
    var eventSelector=s.logic.eventSelector.replace("$iter$", game.iteration)
    console.log("iteration: ",game.iteration)
    console.log("eventSelector: ",eventSelector, s.logic.eventSelector)
    var composite = function(evt) {
      evt.preventDefault();
      console.log(s.id)
      console.log(evt)
      window["eventFunctions"][s.logic.eventFunction](evt)
      if (game.testMode && s.logic && s.logic.criteria) {
        var criteriaVar = game.state[s.logic.criteria.variable]
        criteriaVar[game.iteration] = JSON.parse(JSON.stringify(s.logic.criteria.value)) //returns reference to value, don't touch
      }
      if (s.logic.criteria) {
        var criteriaVar = game.state[s.logic.criteria.variable]

      }
      console.log("Volume: ",game.state.volume)
      if ((s.logic.criteria && isEqual(criteriaVar[game.iteration], s.logic.criteria.value)) || !s.logic.criteria) {
        highlightObject(false, eventSelector);

        $(eventSelector).off()
        if (s.logic.postEventFunction) {
          console.log(s.logic.postEventFunction)
          window["eventFunctions"][s.logic.postEventFunction]()
          //s.logic.postEventFunction()
        }
        game.score = 0
        //updateScore(11);
        console.log("Score: " + game.score)
        game.nextStep()

        //$("#headerText").fadeTo(300, 0.25);
      } else if (s.logic.criteria.messageWrong) {
        game.state[s.logic.criteria.variable] = undefined;
        message(s.logic.criteria.messageWrong);
        //updateScore(-5);
        console.log("Score: " + game.score)
      }
    }
    //    console.log(s)
   $(eventSelector).on(s.logic.eventType, composite);
    //$("#enzTube").on("click", composite);
    console.log(game.id,game.hash)
    if (game.testMode && s.id!=game.hash) {
    $(eventSelector).trigger(s.logic.eventType);
    }
    if (game.testMode && s.id==game.hash) {
    game.testMode = false
    }

  }
}
