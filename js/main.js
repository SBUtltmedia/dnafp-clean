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
    })
  })
  // setTimeout(function() {$("#next").off()}, 500)
  $(".stepPanelItem").on("click", function() {
    console.log("Hello")
    $(this).addClass("spin")
    setTimeout(function() {
      $(this).removeClass("spin")
    }, 1500)
  })

})




function loadStep(steps) {
  var stepCount = $(".baseStep").length
  console.log(stepCount)


  return
}

function buildStage(initialItemList) {
  initialItems = initialItemList.split(" ")
  console.log(initialItems.length)
  for (i = 0; i < initialItems.length; i++) {
    $("#view").append($(initialItems[i]))
  }
  console.log("Items Added!")
}
