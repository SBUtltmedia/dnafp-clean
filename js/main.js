var game;

$(function() {
  $.get("json/steps.json", function(data) {
    testdiv= item("body","test",{border:"black solid 1px",width:"100px",height:"100px",position:"absolute"},["class1 class2"])
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
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
