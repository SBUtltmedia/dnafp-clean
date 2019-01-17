function Game(steps) {
  this.groups = {}
  this.steps = []
  this.currentStep = 0
  this.currentGroup = 0
  this.iteration = 0
  this.testMode = true
  this.state = stateInit()
  this.score = 0

  function stateInit() {
    const tipTrayRows = 8,
      tipTrayCols = 12;
    var state = {
      firstStep: 23,
      buttonPress: [0, 0, 0, 0, 0, 0],
      microtubeState: [0, 0, 0, 0, 0, 0],
      TipPosition: false,
      tipTray: Array(tipTrayRows * tipTrayCols).fill(0),
      wellPosition: Array(7).fill(0),
      voltage: 0,
      volume: 0,
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

  }

  this.getSteps = function() {
    return this.steps
  };

  this.setStep = function(currentStepCount) {
    this.currentStep = this.steps[currentStepCount]
    this.currentGroupId = this.getGroupMembership(currentStepCount)
    this.currentRepeats = this.repeats
    menu.setMenuItem(currentStepCount)
    console.log(currentStepCount)
    menu.highlightMenuItem(currentStepCount)
    menu.setItemsCompleted(currentStepCount)
    step.startStep(this.currentStep)


    item.buildItemById("#enzTube").then(function() {})
  }
  this.getStep = function() {
    return this.currentStep
  }
  this.nextStep = function() {
    var nextStepNum = (this.steps.indexOf(this.currentStep) + 1) % this.steps.length
    var currentGroup = this.groups[this.currentGroupId]
    if (currentGroup.steps.indexOf(this.currentStep.id) == currentGroup.steps.length - 1) {
      if (this.iteration < currentGroup.repeats - 1) {
        nextStepNum -= currentGroup.steps.length;
        this.iteration++;
      } else {
        this.iteration = 0;
      }
    }



    this.setStep(nextStepNum)

  }
}
