var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
    item = new Item()
    resizeWindow()
    console.log(data.steps[0].steps)
    menu.buildMenu(data.steps, "stepList")
    item.buildAllItems(domItems).then(function() {buildStage(game.currentStep.itemsAdded)})



  }).then(function(){game.setStep(0)})
$("#next").on("click", function(){
  game.nextStep()
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
