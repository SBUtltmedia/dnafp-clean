function Menu() {




  this.buildMenu = function(steps, parent) { //steps.id was coming up blank, added parent variable

    if (steps.length) {
      var parentSelector = "#" + parent;
      for (step of steps) {
        $(parentSelector).append($("<div>", {
          "id": step.id,
          "html": step.shortText,
          "class": "stepPanelItem"
        }))
        if (step.steps) {
          if (step.repeats) {
            $("#" + step.id).addClass("repeats")
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
    if($("#"+group).hasClass("repeats")){
    }else{
    $("#stepList div div").not("#"+group+">div").hide(500)}
  //  $("#"+group+" div").removeClass("opClass")
  if($("#"+group+">div").is(":hidden"))
        $("#"+group+">div").show(1000)
  }

 this.highlightMenuItem = function(item) {
   $('#stepList *').removeClass("highlight")
   $(`#${item}`).addClass("highlight")
   console.log($(`#${item}`))

 }

}
