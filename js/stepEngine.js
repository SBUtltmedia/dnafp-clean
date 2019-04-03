function Step() {
  this.startStep = function(step) {

    //window.location.hash = step.id;
    //highlightObject(true,step.logic.s.logic.eventSelector);
    var s = jQuery.extend(true, {}, step);
    var clicked = false;



    s.logic.eventSelector = s.logic.eventSelector.replace("$iter$", game.iteration)
    s.longText = s.longText.replace("$iter$", game.iteration + 1)
    s.bottomText = s.bottomText.replace("$iter$", game.iteration + 1)
    $("#headerText").text(s.longText);
    $("#footerText").text(s.bottomText);
    // $("#view").off()
    // $("#view").on("click", function() {
    //   //updateScore(-1);
    //
    //
    // });

    highlightObject(true, s.logic.eventSelector);
    var criteria;

    if (!s.logic.criteria) {
      criteria = {
        variable: "noCriteria",
        value: 0
      }
    } else {
      criteria = s.logic.criteria
    }

    var composite = function(evt) {
      evt.preventDefault();
      console.log(s.logic.eventFunction)
      var bar = window["eventFunctions"][s.logic.eventFunction](evt)
      console.log(window["eventFunctions"][s.logic.eventFunction])
      console.log(bar)
      bar.then(function() {

          if (game.testMode) {
            game.state[criteria.variable] = criteria.value
          }
          if (game.state[criteria.variable] == criteria.value) {
            highlightObject(false, s.logic.eventSelector);

            $(s.logic.eventSelector).off()
            if (s.logic.postEventFunction) {
              window["eventFunctions"][s.logic.postEventFunction]()
            }
            game.score = 0
            game.nextStep()

          } else if (s.logic.criteria.messageWrong) {
            // game.state[s.logic.criteria.variable] = "fd";
            overlay.message(s.logic.criteria.messageWrong, "OK");
          }
        return false;
      })
    }

    $(s.logic.eventSelector).on(s.logic.eventType, composite);

    if (game.testMode) {
      if (s.id != game.hash) {
        $(s.logic.eventSelector).trigger(s.logic.eventType);
      } else {
        console.log("DSRg")
        game.testMode = false
      }
      // if (game.hashLoop) {
      //   game.iteration = game.hashLoop - 1
      // } else {
      //   game.iteration = game.groups[game.getGroupMembership(s.id)].repeats - 1
      // }
    }

  }
}
