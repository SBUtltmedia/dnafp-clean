function StepEngine() {
  this.startStep = function(stepIndex) {

    step = game.steps[stepIndex];

    //window.location.hash = step.id;
    //highlightObject(true,step.logic.s.logic.eventSelector);
    var s = jQuery.extend(true, {}, step);

    var clicked = false;
    var nextStepIndex;


    s.logic.eventSelector = s.logic.eventSelector.replace("$iter$", game.iteration)
        console.log(s)
        // if(!$(s.logic.eventSelector).length){
        //
        //     item = new Item()
        //   }
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

 function composite(evt) {
      $(s.logic.eventSelector).off()
      evt.preventDefault();
      var bar = window["eventFunctions"][s.logic.eventFunction]
      //

      bar(evt).then(function() {

        if (game.testMode) {
          game.state[criteria.variable] = criteria.value
          highlightObject(false, s.logic.eventSelector)
        }
        if (game.state[criteria.variable] == criteria.value) {
          highlightObject(false, s.logic.eventSelector);

          $(s.logic.eventSelector).off()
          if (s.logic.postEventFunction) {
            window["eventFunctions"][s.logic.postEventFunction]()
          }
          game.score = 0

          var currentGroupId = game.getGroupMembership(stepIndex)

          var currentGroup = game.groups[currentGroupId]
          var currentRepeats = game.groups[currentGroupId].repeats



          if (currentGroup.steps.indexOf(s.id) + 1 == currentGroup.steps.length) {


            if (game.iteration + 1 < currentRepeats) {
              // for (i = 1; i < currentGroup.steps.length; i++) {
              //   this.steps[stepIndex - i].completed = "false"
              // }
              nextStepIndex = stepIndex - currentGroup.steps.length + 1
              game.iteration++;
              menu.resetRepeatGroup(nextStepIndex)
            } else {
              game.iteration = 0;
              menu.setGroupCompleted(currentGroupId)
              nextStepIndex = stepIndex + 1


            }
          } else {
            nextStepIndex = stepIndex + 1;
          }
          game.nextStep(nextStepIndex)

        } else {
          $(s.logic.eventSelector).on(s.logic.eventType, composite);
          if (s.logic.criteria.messageWrong) {
            // game.state[s.logic.criteria.variable] = "fd";
            overlay.message(s.logic.criteria.messageWrong, "OK");
          }
        }
        return false;
      })
    }
    $(s.logic.eventSelector).on(s.logic.eventType, composite);


    if (game.testMode) {
      if (s.id != game.hash) {
        if(game.groups[game.getGroupMembership(s.id)].repeats){
          game.iteration = game.groups[game.getGroupMembership(s.id)].repeats - 1
        }
        $(s.logic.eventSelector).trigger(s.logic.eventType);
      } else {
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
