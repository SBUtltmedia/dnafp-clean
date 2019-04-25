function StepEngine() {
  this.startStep = function(stepIndex, prevCalled = 0) {
    game.state["stepStartTime"] = Date.now()
    $(".item").not(".ui-draggable").off()
    step = game.steps[stepIndex];


    //window.location.hash = step.id;
    //highlightObject(true,step.logic.s.logic.eventSelector);
    var s = jQuery.extend(true, {}, step);

    var clicked = false;
    var nextStepIndex;

    if (s.logic.preEventFunction) {
      window["eventFunctions"][s.logic.preEventFunction]()
    }
    s.logic.eventSelector = s.logic.eventSelector.replace("$iter$", game.iteration)
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
    // setInterval(()=>console.log($(s.logic.eventSelector).is(':animated')),1000)
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
          game.updateScore(s.id,10)
          console.log(game.scoreHistory)
      //  game.state["score"] = game.state["score"] + 10
        if (game.testMode) {
          game.state[criteria.variable] = criteria.value
          highlightObject(false, s.logic.eventSelector)
        }


        if (game.state[criteria.variable] == criteria.value) {
          console.log((Date.now() - game.state["stepStartTime"])>= game.state["penaltyTime"])
          if ((Date.now() - game.state["stepStartTime"]) >= game.state["penaltyTime"]) {
            game.updateScore(s.id,-1)
          }
          highlightObject(false, s.logic.eventSelector);

          $(s.logic.eventSelector).off()
          if (s.logic.postEventFunction) {
            window["eventFunctions"][s.logic.postEventFunction]()
          }

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
          if (nextStepIndex < game.steps.length) {
            game.nextStep(nextStepIndex)
          }

        } else {
          $(s.logic.eventSelector).on(s.logic.eventType, composite);
          if (s.logic.criteria.messageWrong) {
            game.updateScore(s.id,-15)
            // game.state[s.logic.criteria.variable] = "fd";
            overlay.message(s.logic.criteria.messageWrong, "OK");
          }
        }
        return false;
      })
    }

    if ($(s.logic.eventSelector).length) {
      // $(".item").on("click", function() {
      //   if ($(`#${this.id}`).hasClass("highLighted")) { //
      //     console.log(this.id)
      //       game.updateScore(s.id,-1)
      // //    game.state["score"] = game.state["score"] - 1
      //   }
      // })
      $(s.logic.eventSelector).on(s.logic.eventType, composite);
    }


    if (game.testMode) {
      if (s.id != game.hash) {
        // if (game.groups[game.getGroupMembership(s.id)].repeats) {
        //   game.iteration = game.groups[game.getGroupMembership(s.id)].repeats - 1
        // }
        if ($(s.logic.eventSelector).length) {
          $(s.logic.eventSelector).trigger(s.logic.eventType);
        }
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
