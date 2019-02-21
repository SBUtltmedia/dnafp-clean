var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
    item = new Item()
    resizeWindow()
    menu.buildMenu(data.steps, "stepList")
    item.buildAllItems(domItems).then(function() {
      buildStage(game.steps[0].itemsAdded)
      game.setStep(0)
      // console.log(makeDynamicAnimation(dynamicDefs[0], 3))
    })


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

function buildStage(initialItemList) {
  initialItems = initialItemList.split(" ")

  for (i = 0; i < initialItems.length; i++) {
    $("#view").append($(initialItems[i]))
  }

}
