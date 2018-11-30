function Game(steps) {
  this.groups = {}
  this.steps = []
  this.currentStep = 0
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
  this.groups[group] = this.groups[group] || []
  this.groups[group]= [...this.groups[group],id]

  }
  this.getGroupMembership = function(item){

    return Object.keys(this.groups).find((n)=>{

      return this.groups[n].indexOf(this.steps[item].id)!=-1;

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
    menu.setMenuItem(currentStepCount)
  }
  this.getStep = function() {
    return this.currentStep
  }
  this.nextStep = function() {
    console.log(this.currentStep.id)
    menu.highlightMenuItem(this.currentStep.id)
    this.setStep((this.steps.indexOf(this.currentStep)+1)%this.steps.length)
  }
}
