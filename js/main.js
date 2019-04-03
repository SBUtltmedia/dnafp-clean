var game;

$(function() {
  $.get("json/steps.json", function(data) {
    game = new Game(data.steps);
    menu = new Menu()
    step = new Step()
    item = new Item()
    overlay = new Overlay()
    resizeWindow()
    menu.buildMenu(data.steps, "stepList").then(() => {
      menu.hideGroups()
    })
    //  menu.hideGroups()
    overlay.message("Click \"OK\" to start the lab", "OK")
    buildStage(0).then(() => {
      game.setStep(0)
    })
    // item.buildAllItems(domItems).then(function() {
    //   buildStage(0)
    //   game.setStep(0)
    // })



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
  var defer = $.Deferred();
  var itemsDetached = [];

  itemsAdded =  game.steps[stepNumber].itemsAdded.split(" ")
  itemsRemoved = game.steps[stepNumber].itemsRemoved.split(" ")
  console.log(itemsRemoved[0])
  item.buildAllItems(itemsAdded).then(()=>{


  //   for (i of itemsAdded) {
  //
  // item.buildItemById(i.split("#")[1])
  //
  //     //$("#view").append($(i))
  //   }
console.log(itemsRemoved[0])
if(itemsRemoved[0] !=""){

  for (j of itemsRemoved) {    //$(j).detach().appendTo("#storage")
    $(`#${j}`).remove();
    console.log(j)
    //  $(j).remove()
  }
}

  defer.resolve("Stage built")
  })
  return defer.promise();
  // $("#storage").prepend(...itemsDetached)
  // setTimeout(function(){
  //
  //
  //
  // },1)
  //
  //$("#storage").hide();


}
