function Game(steps) {
  this.groups = {}
  this.steps = []
  this.currentStep = {}
  this.currentGroup = 0
  this.iteration = 0
  this.testMode = false
  this.state = stateInit()
  this.score = 0
  this.hash = location.hash.split("#")[1];

  if (this.hash) {
      this.testMode = true;
  }


  function stateInit() {
    const tipTrayRows = 8,
      tipTrayCols = 12;
    var state = {
      buttonPress: [0, 0, 0, 0, 0, 0],
      microtubeState: [0, 0, 0, 0, 0, 0],
      //state numbers for reference [0:"untouched", 1:"opened", 2:"closed", 3:"flicked", 4:"tapped", 5:"returned", 6:"exposed"]
      TipPosition: false,
      tipTray: Array(tipTrayRows * tipTrayCols).fill(0),
      wellPosition: Array(7).fill(0),
      voltage: [0],
      volume: [0],
      time: [0],
      tip: [0],
      // tipPositions: ,
    }
    $("#micropipette2").append($('#pipetteTip1'));
    $("pipetteTip1").addClass(".opClass")
    return state;
  }
  this.addToGroup = function(id, group) {
    this.groups[group] = this.groups[group] || {
      repeats: 0,
      steps: []
    }
    this.groups[group].steps = [...this.groups[group].steps, id]

  }
  this.addToRepeats = function(group, repeats) {
    this.groups[group] = {
      repeats: repeats,
      steps: []
    }

  }
  this.getGroupMembership = function(item) {
    if (typeof item == "number") {
      return Object.keys(this.groups).find((n) => {

        return this.groups[n].steps.indexOf(this.steps[item].id) != -1;

      })
    } else if (typeof item == "string") {
      var groupNames = Object.keys(game.groups)
      for (i = 0; i < groupNames.length; i++) {
        if (game.groups[groupNames[i]].steps.includes(item)) {
          return groupNames[i]
        }
      }
    }
  }


  this.addToSteps = function(item) {
    this.steps.push(item)
    this.steps[this.steps["length"] - 1].completed = "false"
  }

  this.getSteps = function() {
    return this.steps
  };

  this.setStep = function(currentStepCount) {
    this.currentStep = this.steps[currentStepCount]
    this.currentGroupId = this.getGroupMembership(currentStepCount)
    this.currentRepeats = this.groups[this.currentGroupId].repeats
    console.log(  this.currentStep.logic.eventSelector)
    menu.setMenuItem(currentStepCount)
    console.log(currentStepCount)
    menu.highlightMenuItem(currentStepCount)
    step.startStep(this.currentStep)

  }



  this.getStep = function() {
    return this.currentStep
  }
  this.nextStep = function() {
    var currentStepNumber = this.steps.indexOf(this.currentStep)
    menu.setItemCompleted(currentStepNumber)
    game.steps[currentStepNumber].completed = "true"
    var nextStepNum = ((this.steps.indexOf(this.currentStep) + 1) % this.steps.length)
    console.log("NextStep: "+nextStepNum)
    var currentGroup = this.groups[this.currentGroupId]
    if (currentGroup.steps.indexOf(this.currentStep.id) == currentGroup.steps.length - 1) {
      if (this.iteration < this.currentRepeats - 1) {
        for (i = 1; i < currentGroup.steps.length; i++) {
          this.steps[nextStepNum - i].completed = "false"
        }
        nextStepNum -= currentGroup.steps.length
        this.iteration++;
        menu.resetRepeatGroup(nextStepNum)
      } else {
        this.iteration = 0;
        menu.setGroupCompleted(this.currentGroupId)
      }
    }
    if (nextStepNum == 0) {
      this.restartGame()
    }

    this.setStep(nextStepNum)

  }
  this.restartGame = function() {
    $('#stepList *').removeClass("activeGroup")
    $('#stepList *').removeClass("completed")
    for (i = 0; i < this.steps.length; i++) {
      this.steps[i].completed = "false"
    }
  }
}
