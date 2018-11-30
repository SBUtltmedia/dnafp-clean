var game;
$(function() {
  $.get("json/steps.json", function(data) {

    game = new Game();
    menu = new Menu()


    menu.buildMenu(data.steps, "stepList")
    console.log(JSON.stringify(game.groups))
    console.log(game.getSteps())
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
