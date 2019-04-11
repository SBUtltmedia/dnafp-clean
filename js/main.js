var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    item = new Item()
    overlay = new Overlay()
    resizeWindow()
    menu.buildMenu(data.steps, "stepList").then(() => {
      menu.hideGroups()
    })
    overlay.message("Click \"OK\" to start the lab", "OK")
    game.nextStep(0)

  })
})





function buildStage(stepNumber) {
  var defer2 = $.Deferred();
  if (game.steps[stepNumber].itemsRemoved) {
    console.log(game.steps[stepNumber].itemsRemoved)
    for (j of game.steps[stepNumber].itemsRemoved) {
      $(`#${j}`).remove();
    }
  }

  if (game.steps[stepNumber].itemsAdded) {
    item.buildAllItems(game.steps[stepNumber].itemsAdded).then(() => {
      defer2.resolve("Stage built")

    })
  } else {
    setTimeout(() => defer2.resolve("Stage built"), 10);
  }
  return defer2.promise();

}
