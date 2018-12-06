var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
    item = new Item()
    menu.buildMenu(data.steps, "stepList")
    game.setStep(0)


  })
$("#next").on("click", function(){
  game.nextStep()
})


})




function loadStep(steps) {
  var stepCount = $(".baseStep").length
  console.log(stepCount)


  return
}
