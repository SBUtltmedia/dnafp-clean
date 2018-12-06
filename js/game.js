function Game(steps) {
  this.groups = {}
  this.steps = []
  this.currentStep = 0
  this.currentGroup = 0
  this.iteration = 0
  this.testMode = true
  // this.setStepList = function(steps, stepNames) {
  //   for (i of stepNames.length) {
  //     if (step.id == stepName[i]) {
  //       this.steps.push(step.steps)
  //     }
  //   }
  //
  //   this.stepList = steps
  // };

  this.addToGroup=function(id,group){
    this.groups[group]= this.groups[group] || {repeats:0,steps:[]}
    this.groups[group].steps= [...this.groups[group].steps,id]

  }
  this.addToRepeats = function(group,repeats){
    this.groups[group]={repeats:repeats,steps:[]}
  }
  this.getGroupMembership = function(item){

    return Object.keys(this.groups).find((n)=>{

      return this.groups[n].steps.indexOf(this.steps[item].id)!=-1;

    }  )
  }


 this.addToSteps=function(item){

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
    menu.highlightMenuItem(this.currentStep.id)
    step.startStep(this.currentStep)
    item.buildItem(domItems["#enzTube"])
    item.buildItem(domItems["#iceBucket"])
  }
  this.getStep = function() {
    return this.currentStep
  }
  this.nextStep = function() {
    var nextStepNum = (this.steps.indexOf(this.currentStep)+1)%this.steps.length
    var currentGroup = this.groups[this.currentGroupId]
    if(currentGroup.steps.indexOf(this.currentStep.id) == currentGroup.steps.length-1){
      if(this.iteration < currentGroup.repeats-1){
        nextStepNum-=currentGroup.steps.length;
        this.iteration++;
      }else{
      this.iteration =0;
      }
    }



    this.setStep(nextStepNum)
    console.log(step,this.step)

  }
}
