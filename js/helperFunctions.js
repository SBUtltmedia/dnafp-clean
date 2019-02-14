function isEqual(a, b) {
    if (a.length && b.length && a.length == b.length) {
        for (i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
    return a == b;
}
function rotate(indent,duration=500) {
  return  [{
    "text-indent": indent
  }, {
    duration: duration,
    step: function(now) {
      $(this).attr("transform", 'rotate('+now+')');
    }
  }]

}
var eventFunctions = {
  commonSide : [
    "#labBench", "#pipetteHolder", "#micropipette0", "#micropipette1", "#micropipette2", "#tipHolder", "#tip1",
    "#tip2", "#tip3", "#tip4", "#tip5", "#tip6", "#tip7", "#tip8", "#tip9", "#tip10", "#tip11", "#tip12",
    "#s0Tube", "#s1Tube", "#s2Tube", "#s3Tube", "#s4Tube", "#s5Tube", "#tubeBlock"
  ],
  commonTop : [
    "#labBenchTop", "gelTopView", "#lidBox", "#lidBase", "#powerSupplyTop", "#microTubeHolderTop", "#tubeTop_0",
    "#tubeTop_1", "#tubeTop_2", "#tubeTop_3", "#tubeTop_4", "#tubeTop_5", "#tubeTop_6", "#tipBoxTop",
  ],
  tipSide:["#sideView", "#pipetteTip1", "#gelWell", "#gelWellBoundary"],
  //step 0
  "liftEnzyme": function() {
    console.log("lift")
    animate("#enzTube", 0, "keyframe", "anim_moveEnz")
  }, //step 1
  "openEnzyme": function() {
    console.log("open")
    animate("#enzTube svg .Cap", 0, "animate", rotate(-120))
    animate("#pipetteTip svg #svgfluid", 0, "animate", [{
      "y": 100
    }])
  },
  "openEnzymePost": function() {
    animate("#micropipette2", 1000, "keyframe", "anim_PrepPipette")
    animate("html", 3000, zoom, [25, 46, 9.5, 1000])
    animate("#micropipette2 *", 3400, "css", [{"display":"block"}])

  }, //step 2

  "setVolume": function() {
    var volume= $("#micropipette2").find("[type='text']").val();
    console.log(volume)
    game.state["volume"] = [volume];
    return false
  },
  "setVolumePost": function() {
    animate(".volumeInput, .volumeButton", 1, "hide")
    animate("#view", 0, zoom, [25, 46, 1, 1000])
    animate("#micropipette2", 1100, "keyframe", "anim_lowerPipette")
    animate("#pipetteTip1", 0, "addClass", "opClass")
    $("#micropipette2").append($("#pipetteTip1"))
  },



  "selectTip": function(evt) {
    var selectedTip = evt.currentTarget.id.split("tip")[1];
    var tipLeft = parseInt($(evt.currentTarget).css("left"))
    var viewWidth = parseFloat($('#view').css("width"));
    var pipetteWidth = parseFloat($('#micropipette2').css("width"));
    var tipWidth = parseFloat($("#pipetteTip1").css("width"));
    var tipPos = (tipLeft+tipWidth/2-(pipetteWidth)/2) / (viewWidth) * 100
    console.log(tipLeft);
    // in event
    if (game.testMode){
      tipPos = "0"
    }
    makePipetteTipAnimation(tipPos);
    animate("#micropipette2", 0, "keyframe", "anim_addTip1")
    animate("#tip" + selectedTip, 0, "keyframe", "anim_hideTip1")

    animate("#pipetteTip1", 500, "removeClass", "opClass")
    console.log($("#pipetteTip1").class);
  }, //step 3
  //step 4
  "openTube": function(evt) {


    game.state["microtubeState"][game.iteration] = 1;
    animate("#s"+game.iteration+"Tube svg .Cap", 1000, "animate", rotate(-120))
    animate("#s"+game.iteration+"Tube", 0, "keyframe", "anim_moveTube")
    // animate("#s0Tube svg .Cap", 0, "animate", rotate.rotateObj)


  }, //step 5
  "addEnzyme": function() {
    $("#s"+game.iteration+"Tube").css("z-index", "5")
    animate("#svgfluid", 10, "animate", [{
      "y": 35.6
    }])
    var viewWidth = parseFloat($('#view').css("width"));
    var tubeLeft = parseFloat($("#s"+game.iteration+"Tube").css("left"))
    var pipLeft = parseFloat($("#micropipette2").css("left"))
    var pipWidth = parseFloat($("#micropipette2").css("width"));
    var tubeWidth = parseFloat($("#s"+game.iteration+"Tube").css("width"));
    var tubePos = (tubeLeft+tubeWidth/2-pipWidth/2) / (viewWidth) * 100
    console.log("Tube Pos: ",tubePos);
    // in event
    if (game.testMode){
      tubePos = "0"
    }
    makePipetteTubeAnimation(tubePos);
    animate("#micropipette2", 0, "keyframe", "anim_pipetteToTube")



    //animate("#enzTube", 1500, "keyframe", "anim_moveEnzBack")

    //animate("#enzTube svg .Cap", 1000, "animate", rotate(0))


  }, //step 6
  "mixContents": function() {
    animate("#view", 0, zoom, [35, 66, 12, 1050])
    for (i = 1; i < 4; i++) {
      animate("#svgfluid", 1000 * i + 500, "animate", [{
        "y": 70
      }, {
        duration: 500,
        step: function(now) {
          $(this).attr("y", now);
        }
      }]);
      animate("#svgfluid", 1000 * (i + 1), "animate", [{
        "y": 35.6
      }, {
        duration: 500,
        step: function(now) {
          $(this).attr("y", now);
        }
      }]);
    };
    animate("#svgfluid", 4500, "animate", [{
      "y": 100
    }])
  },

  "mixContentsPost": function() {

    animate("#view", 5000, zoom, [35, 66, 1, 1000]);


  }, //step 7

  "discardTip": function() {
    animate("#micropipette2", 0, "keyframe", "anim_pipetteToBin")
    animate("#pipetteTip1", 2300, "keyframe", "anim_tipToBin")
    animate("#pipetteTip1", 2700, "keyframe", "anim_tipReset")
    animate("#pipetteTip1", 2700, "addClass", "opClass")



    animate("#micropipette2", 3000, "keyframe", "anim_pipetteFromBinToPrep")
  },
  "closeTube": function() {
    animate("#s"+game.iteration+"Tube svg .Cap", 0, "animate", rotate(0))
    $("#s0Tube").css("z-index", "0")
    game.state["microtubeState"][game.iteration] = 2;
  },
  "flickTube": function() {
    animate("#s"+game.iteration+"Tube", 0, "keyframe", "anim_flickTube");
    game.state["microtubeState"][game.iteration] = 3;
  },
  "tapTube": function() {
    animate("#s"+game.iteration+"Tube", 0, "keyframe", "anim_tapTube")
    game.state["microtubeState"][game.iteration] = 4;
  },
  "tubeRack": function() {
    animate("#s"+game.iteration+"Tube", 0, "keyframe", "anim_tubeDown")
    // for (i = 0; i <= 5; i++) {
    //   animate("#s" + i + "Tube", 1500, "keyframe", "anim_tube" + i + "ToBath");
    // }
  //  animate("#tubeBlock", 1500, "keyframe", "anim_moveBlock");

    game.state["microtubeState"][game.iteration] = 5;
    for (i = 0; i <= 5; i++) {
      animate("#s" + i + "Tube", 0, "addClass", "microTube");
    }

  }, //step 12
  "tubeRackPost": function() {

  },
  "pressTube": function(evt) {
    animate("html", 0, zoom, [35, 65, 4, 1000]);
    var tubeId = evt.currentTarget.id.charAt(1);
    console.log(tubeId)
    if (game.testMode) {
      for (i = 0; i <= 5; i++) {
        animate("#s" + i + "Tube", 0, "keyframe", "anim_pressTube" + i);
      }
    }
    animate("#s" + tubeId + "Tube", 0, "keyframe", "anim_pressTube" + tubeId);
    game.state["microtubeState"][tubeId] = 6
  }, //step 13
  "pressTubePost": function() {
    animate("html", 0, zoom, [35, 65, 1, 1000]);
  },
  "removeLid": function(evt) {
    var top1 = document.getElementsByClassName("topView")
    animate("#waterBathLid", 0, "keyframe", "anim_removeLid")

  }, //step 14
  "checkTemp": function() {
    //        criteriaPassed = true;
    animate("#view", 0, zoom, [65, 21, 10, 1000])
    animate("#view", 3500, zoom, [65, 21, 1, 1000]);
  }, //step 15
  "insertRack": function() {
    animate("#tubeBlock", 0, "keyframe", "anim_insertRack")
    for (i = 0; i <= 5; i++) {
      //animate("#s" + i + "Tube", 0, "addClass", "microTube");
      animate("#s" + i + "Tube", 0, "keyframe", "anim_insertTube" + i);

    }
    animate("#tubeBlock, .microTube", 1750, "hide");


  }, //step 16
  "closeLid": function() {
    animate("#waterBathLid", 0, "keyframe", "anim_replaceLid")
    animate("#view", 1000, zoom, [65, 36, 5, 1500])


  }, //step 17
  "setTimer": function() {
    animate("#waterBathNoLid *", 1000, "show");
    var time= $("#waterBathNoLid").find("[type='text']").val();
    game.state["time"] = [time]
  },
  "setTimerPost": function() {

    animate("#waterBathNoLid *", 1000, "hide");
    animate("#view", 0, zoom, [65, 36, 1, 1000]);
    animate("#bothDays *, #bothDays, #day1 *", 0, "attr", ["style", ""])
    animate("#pipetteTip1", 0, "hide")
    animate("#day1", 1000, "hide");
    animate("#day2, #tubeBlock, .microTube, #gelSideView", 2000, "show")
    animate("#graduatedCylinder, #waterBathNoLid, #waterBathLid, #shelf1, #stainedGel, #stainingTraySide", 0, "hide")

    game.state["microtubeState"] = Array(6).fill(0)

  }, //step 18
  "prepPipette1": function(evt) {
    animate("#volumeButton,#volumeInput", 2400, "show");
    animate("#micropipette2", 0, "keyframe", "anim_PrepPipette")
    animate("#view", 2000, zoom, [25, 46, 9.5, 1000])
  },

  "setDyeVolume": function() {
    game.state["volume"] = $("#volumeInput").val();
  },

  "setDyeVolumePost": function() {
    //updateScore(10);
    animate("#volumeButton,#volumeInput", 1, "hide");
    animate("#view", 0, zoom, [25, 46, 1, 1000])

  }, //step 21

  "openDye": function(evt) {
    animate("#loadDye", 0, "keyframe", "anim_moveLoadingDye")
    animate("#loadDye svg .Cap", 0, "animate", rotate.rotateObj)
    animate("#svgfluid", 0, "animate", [{
      "y": 100
    }])

  }, //step 19
  "openDyePost": function() {},
  "takeDye": function(evt) {
    var tippNum = betterParseInt(evt.target.id);
    var tippLeft = tips[(tippNum - 1)];
    // in event
    makePipetteTippAnimation(tippLeft);
    animate("#micropipette2", 0, "keyframe", "anim_addTipp1")
    animate("#" + evt.target.id, 0, "keyframe", "anim_hideTipp1")
    animate("#pipetteTip1", 700, "show")
    $("#holder").css('z-index', '3');
  }, //step 20

  "openTube1": function(evt) {
    eventFunctions.openTube(evt)
    animate("#svgfluid", 10, "animate", [{
      "y": 50
    }])
  }, //step 22
  "addDye": function() {
    animate("#micropipette2", 0, "keyframe", "anim_addDyeToTube")
    animate("#loadDye svg .Cap", 700, "animate", rotate.reverseRotateObj)
    animate("#loadDye", 1000, "keyframe", "anim_moveLoadingDyeback")
    $("#s0Tube").css("z-index", "5")

  }, //step 23
  "mixContents1": function() {
    eventFunctions.mixContents()
  },
  "mixContents1Post": function() {
    eventFunctions.mixContentsPost()
  }, //step 24
  "replaceTip1": function() {
    eventFunctions.replaceTip()
  }, //step 25
  "closeTube1": function(evt) {
    eventFunctions.closeTube(evt)
  }, //step 26
  "flickTube1": function(evt) {
    eventFunctions.flickTube(evt)
  }, //step 27
  "tapTube1": function() {
    eventFunctions.tapTube()
  }, //step 28
  "tubeRack1": function() {
    animate("#s0Tube", 0, "keyframe", "anim_tubeDown")
    for (i = 0; i <= 5; i++) {
      animate("#s" + i + "Tube", 1000, "keyframe", "anim_tube" + i + "ToBath");
    }
    animate("#tubeBlock", 1000, "keyframe", "anim_moveBlock");
    game.state["microtubeState"][0] = 5;
  }, //step 29
  "openTubes": function(evt) {
    var tubeId = evt.currentTarget.id.charAt(1);
    if (game.testMode) {
      for (i = 0; i <= 5; i++) {
        animate("#s" + i + "Tube svg .Cap", 0, "animate", rotate.rotateObj)
      }
    }
    animate("#s" + tubeId + "Tube svg .Cap", 0, "animate", rotate.rotateObj)
    game.state["microtubeState"][tubeId] = 6
  }, //step 29

  "removeComb": function() {
    animate("#gelComb", 0, "keyframe", "anim_removeComb")
    animate("#gelComb", 1000, "hide")
  }, //step 30

  "toTop": function() {
    animate("#day2, #day2 *", 0, "hide");
    animate("#day1", 0, "hide");
    animate("#bothDays, #bothDays *", 0, "hide");
    animate("#topView, #topView *", 0, "show");
    animate("#sideView, #gelFinalTop, #gelVoltageCover, #micropipetteTopView, #stainingTray, #zoomOutButton2, #lidBox", 0, "hide")
    animate(".bands, .laneFill", 0, "hide");
    $("#sideView").append($('#pipetteTip1'));

  }, //step 31
  "orientGel": function() {
    animate("#arrowDown,#arrowUp", 0, "hide")
    animate("#micropipetteTopView, #gelFinalTop", 0, "show")

  }, //step 32, 37, 42
  "addTipTop": function(evt) {
    // if (evt.currentTarget.classList.contains("st3") == false) {
    //   console.log(selector.classList)
    // }
    var totalRows = 8;
    var totalCols = 16;

    var tip = game.state["tipTray"].indexOf(0)
    console.log(tip)
    var nextColumn = tip % tipTrayCols
    var nextRow = Math.floor(tip / tipTrayCols);
    var nextSelector = "tip" + nextColumn + "_" + nextRow
    if (game.testMode) {
      var [column, row] = [nextColumn, nextRow]
      var currentSelector = nextSelector
    } else {
      var currentSelector = evt.currentTarget.id;
      var [column, row] = currentSelector.split("tip")[1].split("_")
    }

    var selectorTip = "#" + currentSelector + " ellipse,#" + currentSelector + " circle";
    while ($(selectorTip).hasClass("st3")) {
      selectorTip = "#" + nextSelector + " ellipse,#" + nextSelector + " circle";
      [column, row] = [nextColumn, nextRow]
      nextColumn++
      nextSelector = "tip" + nextColumn + "_" + nextRow
    }


    animate(selectorTip, 500, "attr", ["class", "st3"])
    console.log(selectorTip)
    var topMost = 56.6,
      leftMost = 31.2,
      rowHeight = 1.1,
      colWidth = .78
    var micropipetteTopViewLeft = leftMost + (colWidth * column)
    var micropipetteTopViewTop = topMost + (rowHeight * row)
    animate("#micropipetteTopView", 0, "animate", [{ //TopMost left:31.2%, 56.6% left= +=.78%,, top= +=1.1%
      "left": micropipetteTopViewLeft + '%',
      "top": micropipetteTopViewTop + '%'
    }]);
    game.state["tipTray"][column + (row * tipTrayRows)] = 1;;
    console.log(column + (row * tipTrayRows))
  }, //step 33

  "takeMicTube": function(evt) {
    game.state["tubePicked"] = parseInt(evt.currentTarget.id.split("_")[1]);
  }, //step 34
  "takeMicTubePost": function() {
    var tubePickedIndex = game.state["tubePicked"]
    var tubeTopPosition = 17.5
    var tubeTopAdd = 4.5
    var tubeTop = tubeTopPosition + tubeTopAdd * tubePickedIndex

    animate("#micropipetteTopView", 0, "animate", [{
      "left": '36.7%',
      "top": tubeTop + '%'
    }]);
    animate("html", 1000, zoom, [10, 74, 6, 1000])
  }, //step 34

  "toLane": function(evt) {
    game.state["lanePicked"] = parseInt(evt.currentTarget.id.split("_")[1]);
  },
  "toLanePost": function() {
    var laneIndex = game.state["lanePicked"]
    var laneLeftPosition = 10.3
    var laneLeftAdd = 1.4
    var laneLeft = laneLeftPosition + laneLeftAdd * laneIndex
    animate("#micropipetteTopView", 0, "animate", [{
      "left": laneLeft + '%', //+=1.4%
      "top": '71.6%',
    }]);

    animate("html", 1000, zoom, [10, 74, 1, 500]) //zoomout
    animate(".side", 1200, "show")
    animate("#pipetteTip1 *, #pipetteTip1", 0, "show")
    animate("#pipetteTip1", 0, "css", [{
      "width": "15%",
      "height": "121%",
      "left": "42%",
      "top": "-80%",
      "z-index": 100
    }])
    animate("#svgfluid", 0, "animate", [{
      y: "40"
    }])
    $('#pipetteTip1').draggable({
      disabled: false,
      revert: true
    });


  }, //step 35,40
  "insertTip": function(evt) {
    var sideViewWidth = parseFloat($('#sideView').css("width"));
    var sideViewHeight = parseFloat($('#sideView').css("height"));
    var currentBot = parseFloat($('#pipetteTip1').css("bottom")) / sideViewHeight * 100;
    var currentLeft = parseFloat($('#pipetteTip1').css("left")) / sideViewWidth * 100;
    game.state["TipPosition"] = false
    // console.log(currentBot, currentLeft)
    if (currentBot < 53.5) {
      if (currentBot < 12 || currentLeft > 67.8 || currentLeft < 19.5) {
        message("Make sure the tip is not breaching the wall!")
      } else if (currentBot > 40) {
        message("Make sure the tip stays deep enough within the well!")
      } else if (currentBot < 15) {

        message("Your tip is going too deep into the well. Don't risk it to breach the wall!")
      } else {
        game.state["TipPosition"] = true
        $('#pipetteTip1').draggable({
          disabled: true,
          revert: false
        });
      }
      if (game.state["TipPosition"] == false) {
        $('#pipetteTip1').css("top", "-80%")
        $('#pipetteTip1').css("left", "42%")
      }
    }
  }, //step 36

  "insertTipPost": function() {
    animate("#svgfluid", 0, "animate", [{
      y: "100"
    }])
    animate("#gelWellBoundary", 400, "css", [{
      "background-image": "radial-gradient(blue, #5555ff, #5555ff)"
    }])

    animate(".side", 3000, "hide")
    animate("#gelWellBoundary", 3400, "css", [{
      "background-image": "radial-gradient(rgba(59,128,194,.86), rgba(59,128,194,.86), rgba(59,128,194,.86))"
    }])
    var well = game.state["wellPosition"].indexOf(0)
    console.log(well)
    var currentWell = "#well_" + well
    animate(currentWell, 0, "css", [{
      "fill": "#5555ff"
    }])
    game.state["wellPosition"][well] = 1;
    // setTimeout(function () {
    //     $('#pipetteTip1').css("top", "-80%")
    //     $('#pipetteTip1').css("left", "42%")
    // }, 5000)
  },

  "disposeTip": function() {
    animate("#micropipetteTopView", 0, "animate", [{
      "left": '35%',
      "top": '76%'
    }]);
  }, //step 72

  //To Day3

  "clickLid": function() {
    animate("#lidSide, #micropipetteTopView", 0, "hide")
    animate("#lidBox", 0, "show")
    animate(".gelVoltage", 1000, "show")
    animate("#gelVoltageCover, #voltage", 1000, "show")
    animate("#tipBoxTop, #wasteBinTop", 0, "hide")
  }, //step 73
  "setVoltage": function(evt) {
    console.log("fds")
    game.state["voltage"] = $("#voltage").val()

  },
  "setVoltagePost": function() {
    animate("#gelVoltageCover", 1000, "hide")
    animate("#stainingTray", 0, "show")

  }, //step 74
  "removeGelLid": function() {
    animate("#lidBox", 0, "hide")
    animate("#lidSide", 0, "show")

  }, //step 75
  "removeGel": function() {
    animate("#gelFinalTop", 0, "animate", [{
      top: '73.5%',
      left: '30.1%',
    }])

  }, //step 76
  "nudgeGel": function() {
    animate("#day1, #bothDays, #bothDays *, #day1 *", 2000, "attr", ["style", ""])
    animate("#gelFinalTop", 0, "animate", [{
      top: '58.5%',
      left: '30.6%',
    }])
    animate("#topView, #topView *", 2000, "hide")
    animate("#graduatedCylinder, #stainingTraySide", 2000, "show")
    animate("#waterBathNoLid, #waterBathLid, #gelComb, #wasteBasket, #shelf1, #loadDyeCap", 2000, "hide")
    animate("#bothDays, #day2, .day3, .day3 *, .microTube, .microTube *, #graduatedCylinder, #stainingTraySide", 2000, "show")
    animate("#stainedGel", 2000, "css", [{
      opacity: 0 //left it with opacity, because of slowFadeIn animation
    }])

  }, //step 77
  "stainGel": function() {
    animate("#graduatedCylinder", 0, "keyframe", "anim_pourStain")
    animate("#svgcylfluid", 1000, "animate", [{
      "y": -270
    }])

    animate(".bands, .laneFill", 0, "show");
    animate("#stainedGel", 600, "keyframe", "anim_slowFadeIn")
    animate("#graduatedCylinder", 2000, "keyframe", "anim_pourStainRev")
  }, //step 78
  "examineGel": function() {
    var contents = $("#gelFinalTop").contents();
    $("#gelFinalTop").empty();
    $("#gel").append(contents);
    loadSVGLogic();
    animate("#gel, #gel *", 0, "show")

    $("#gel, #gel *").css({
      opacity: 1.0,
      visibility: "visible",
      display: "block"
    }).animate({
      opacity: 1
    }, 200)

  }, //step 79
  "pickLane": function(evt) {
    var studentAnswer = evt.currentTarget.id.split("_")[1];
    console.log(evt.currentTarget.id);
    console.log(answer);
    console.log($("svg [type = 'text/css']")[1])
    game.state["lanePickedNumber"] = studentAnswer
  },
  "pickLanePost": function() {
    animate("#day1, #day1 *, #bothDays, #bothDays *", 0, "show")
    animate("#day2, #day2 *, #timer, #timerButton, #volumeInput, #volumeButton", 0, "hide")
  }

}
function betterParseInt(s) {
  var str = s + "";
  while (isNaN(parseInt(str)) && str.length > 0) {
    str = str.substring(1, str.length);
  }
  return parseInt(str);
}
function animate(selector, delay, method, param, callback = () => {}) {

  var animateDur = 400;
  if (game.testMode) {
    delay = 0
    animateDur = 0;
  }


  // if ($(selector + ':visible').length == 0) {
  //     setTimeout(function () {
  //         $(selector).show();
  //         $(selector).removeClass("opClass");
  //         $(selector).css("visibility", "visible");
  //     }, delay)
  // }

  if (method == "css")

  {
    setTimeout(function() {
      $(selector).css(...param);
      callback();
    }, delay)

    //$(selector).delay(delay).playKeyframe(param, function () {});
  }


  if (method == "keyframe")

  {
    if (game.testMode) {
      var endState = findKeyFrameDef(param.split("_")[1])

      $(selector).css(endState)
      callback();
    }

    //$(selector).attr("style","")
    else {
      setTimeout(function() {
        //          console.log(param)
        //          console.log(animdefs[param])
        $(selector).playKeyframe(animdefs[param], function() {});
        callback();
      }, delay)
    }
    //$(selector).delay(delay).playKeyframe(param, function () {});
  }

  if (method == "addClass")

  {
    setTimeout(function() {
      $(selector).addClass(param);
      callback();
    }, delay)
  }

  if (method == "removeClass") {
    setTimeout(function() {
      $(selector).removeClass(param);
      callback();
    }, delay)
  }

  if (method == "show") {
    console.log(selector)
    setTimeout(function() {
      $("#view").append($(selector));
      callback();
    }, delay)
  }

  if (method == "hide") {
    setTimeout(function() {
      $("#storage").append($(selector));
      callback();
    }, delay)
  }

  if (method == "attr")

  {
    setTimeout(function() {
      $(selector).attr(param[0], param[1]);
      callback();
    }, delay)
  }

  if (method == "animate")

  {
    if (game.testMode) {
      $(selector).css(...param)
    } else {
      setTimeout(function() {
        console.log(param)
        $(selector).animate(...param, function() {

          // if ($(selector).css("opacity") == 0) {
          //     $(selector).css("display", "none")
          //
          // }
          callback();
        });
      }, delay)
    }
    //$(selector).delay(delay).playKeyframe(param, function () {});
  } else if (typeof(method) == "function") {
    if (method.name == "zoom" && game.testMode) {
      zoomInstant(param[0], param[1], param[2])
      callback()
    } else {
      $(selector).delay(delay).queue(function() {
        method(...param, game.testMode)
        $(this).dequeue();
        callback();
      })
    }


  }
}
