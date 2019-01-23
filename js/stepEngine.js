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
    var composite = function(evt) {
      evt.preventDefault();
      console.log(s)
      console.log(evt)
      window["helperFunctions"][s.logic.eventFunction](evt)
      if (game.testMode && s.logic && s.logic.criteria) {
        game.state[s.logic.criteria.variable] = JSON.parse(JSON.stringify(s.logic.criteria.value)) //returns reference to value, don't touch
      }

      if ((s.logic.criteria && isEqual(game.state[s.logic.criteria.variable], s.logic.criteria.value)) || !s.logic.criteria) {
        highlightObject(false, step.logic.eventSelector);

        $(s.logic.eventSelector).off()
        if (s.logic.postEventFunction) {
          console.log(s.logic.postEventFunction)
          window["helperFunctions"][s.logic.postEventFunction]()
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
    console.log(  $("#enzTube"))
    //    console.log(s)
   $(s.logic.eventSelector).on(s.logic.eventType, composite);
    //$("#enzTube").on("click", composite);
    if (game.testMode) {
    $(s.logic.eventSelector).trigger(s.logic.eventType);

    }

  }
}
