function Menu() {
  this.buildMenu = function(steps, parent) { //steps.id was coming up blank, added parent variable

    if (steps.length) {
      var parentSelector = "#" + parent;
      for (var step of steps) {
        $(parentSelector).append($("<div>", {
          "id": step.id,
          "class": "stepPanelItem",
          "html": step.shortText,
        }))
        var groupRegEx = /group[0-9]+/i
        if (step.steps) {
          if (step.repeats) {
            $("#" + step.id).addClass("repeats")
            game.addToRepeats(step.id, step.repeats)

          }

          $(parentSelector).append(menu.buildMenu(step.steps, step.id))
        } else {
          game.addToSteps(step)
          game.addToGroup(step.id, parent)
          $("#" + step.id).addClass("baseStep").hide()
        }

      }
    }
  }
  this.setMenuItem = function(stepNumber) {
    var group = game.getGroupMembership(stepNumber)
    if ($("#" + group).hasClass("repeats")) {} else {
      $("#stepList div div").not("#" + group + ">div").hide(500)
    }
    if ($("#" + group + ">div").is(":hidden"))
      $("#" + group + ">div").show(1000)
  }

  this.setItemsCompleted = function(stepNumber) {
    $('#stepList *').removeClass("completed")
    for (i = 0; i < stepNumber; i++) {
      var stepId = game.steps[i].id
      var group = game.getGroupMembership(i)
      $("#" + stepId).addClass("completed")
    }
  }

  this.highlightMenuItem = function(item) {
    $('#stepList *').removeClass("highlight")
    $(`#${item}`).addClass("highlight")
    var group = game.getGroupMembership(item)
    $("#"+group).addClass("activeGroup")
  }

}
