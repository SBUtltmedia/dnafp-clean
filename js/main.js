var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
    item = new Item()
    overlay = new Overlay()
    resizeWindow()
    menu.buildMenu(data.steps, "stepList")
    menu.hideGroups()
    overlay.message("Click \"OK\" to start the lab", "OK")
    item.buildAllItems(domItems).then(function() {
      buildStage(0)
      game.setStep(0)
    })
    menu.hideGroups()


  })
  // setTimeout(function() {$("#next").off()}, 500)
  $(".stepPanelItem").on("click", function() {

    $(this).addClass("spin")
    setTimeout(function() {
      $(this).removeClass("spin")
    }, 1500)
  })
})




function loadStep(steps) {
  var stepCount = $(".baseStep").length



  return
}

function buildStage(stepNumber) {
  itemsAdded = game.steps[stepNumber].itemsAdded.split(" ")
  itemsRemoved = game.steps[stepNumber].itemsRemoved.split(" ")
  for (i of itemsAdded) {
    $("#view").append($(i))
  }
  for (j of itemsRemoved) {
    $("#storage").append($(j))
  }

}
