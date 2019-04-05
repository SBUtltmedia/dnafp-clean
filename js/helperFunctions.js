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

var eventFunctions = {
  commonSide: [
    "#labBench", "#pipetteHolder", "#micropipette0", "#micropipette1", "#micropipette2", "#tipHolder", "#tip1",
    "#tip2", "#tip3", "#tip4", "#tip5", "#tip6", "#tip7", "#tip8", "#tip9", "#tip10", "#tip11", "#tip12",
    "#s0Tube", "#s1Tube", "#s2Tube", "#s3Tube", "#s4Tube", "#s5Tube", "#tubeBlock"
  ],
  commonTop: [
    "#labBenchTop", "gelTopView", "#lidBox", "#lidBase", "#powerSupplyTop", "#microTubeHolderTop", "#tubeTop_0",
    "#tubeTop_1", "#tubeTop_2", "#tubeTop_3", "#tubeTop_4", "#tubeTop_5", "#tubeTop_6", "#tipBoxTop",
  ],
  tipSide: ["#sideView", "#pipetteTip1", "#gelWell", "#gelWellBoundary"],
  //step 0
  "liftEnzyme": function() {

    return animate("#enzTube", 0, "keyframe", "moveEnz")
  }, //step 1
  "openEnzyme": function() {
    animate("#enzTube svg .Cap", 0, "keyframe", "rotateCap", -120)
    var foo = animate("#pipetteTip svg #svgfluid", 0, "animate", [{
      "y": 100
    }])

    return foo
  },
  "openEnzymePost": function() {
    animate("#micropipette2", 800, "keyframe", "PrepPipette")

    animate("#micropipette2 *", 2500, "removeClass", "opClass")
    return animate("html", 2000, zoom, [25, 46, 9.5, 1000])

  }, //step 2

  "setVolume": function() {
    var volume = $("#micropipette2").find("[type='text']").val();
    game.state["volume"] = volume;
    return animate("html", 0, "null", "null")
  },
  "setVolumePost": function() {
    $("#micropipette2").append($("#pipetteTip1"))
    animate(".volumeInput, .volumeButton", 1, "addClass", "opClass")
    animate("#view", 0, zoom, [25, 46, 1, 1000])
    return animate("#pipetteTip1", 0, "addClass", "opClass")

  },



  "selectTip": function(evt) {
    var selector = evt.currentTarget.id
    // in event
    if (game.testMode) {
      tipPos = "0"
    }
    // makeDynamicAnimation("addTip1", selector)
    animate("#micropipette2", 0, "keyframe", "addTip1", selector)
    animate("#" + selector, 740, "storage")
    return animate("#pipetteTip1", 750, "removeClass", "opClass")

  }, //step 3
  //step 4
  "openTube": function(evt) {
    game.state["microtubeState"] = 1;
    // animate("#enzTube svg .Cap", 0, "keyframe", "rotateCap", -120)
    animate("#s" + game.iteration + "Tube svg .Cap", 1000, "keyframe", "rotateCap", -120)
    return animate("#s" + game.iteration + "Tube", 0, "keyframe", "moveTube")
    // animate("#s0Tube svg .Cap", 0, "animate", rotate.rotateObj)
  }, //step 5
  "addEnzyme": function() {
    animate("#svgfluid", 10, "animate", [{
      "y": 35.6
    }])
    if (game.iteration == 5) {

      animate("#enzTube svg .Cap", 1000, "keyframe", "rotateCap", 0)
      animate("#enzTube", 500, "keyframe", "moveEnzBack")
      //   .then(function(){animate("#enzTube", 500, "keyframe", "moveEnzBack")})
    }
    return animate("#micropipette2", 0, "keyframe", "pipetteToTube", game.iteration)

  }, //step 6
  "mixContents": function() {
    $(".micropipette").css("z-index", "-1")
    var zoomLeft = 35 + 3 * (game.iteration)
    animate("#view", 0, zoom, [zoomLeft, 68, 12, 1050])
    return animate("#svgfluid", 1000, "keyframe", "mixFluid")
    // function loop(i) {
    //
    //   animate("#svgfluid", 1000 * i + 500, "animate", [{
    //     "y": 70
    //   }, {
    //     duration: 500,
    //     step: function(now) {
    //       $(this).attr("y", now);
    //     }
    //   }]);
    //   animate("#svgfluid", 1000 * (i + 1), "animate", [{
    //     "y": 35.6
    //   }, {
    //     duration: 500,
    //     step: function(now) {
    //       $(this).attr("y", now);
    //     }
    //   }]);
    //   if (i < 4) {
    //     loop(i + 1)
    //   } else {
    //     asd = animate("#svgfluid", 4500, "animate", [{
    //       "y": 100
    //     }])
    //
    //     return asd
    //   }
    // }
    //
    //
    // loop(1)

  },

  "mixContentsPost": function() {
    var zoomLeft = 35 + 3 * (game.iteration)
    animate("#view", 200, zoom, [zoomLeft, 68, 1, 500]);


  }, //step 7

  "discardTip": function() {
    $(".micropipette").css("z-index", "4")
    $("#wasteBasket").css("z-index", "4")
    // in event

    if (game.testMode) {
      return animate("#micropipette2", 0, "keyframe", "pipetteFromBinToOrigin")
    } else {
      return animate("#micropipette2", 0, "keyframe", "pipetteToBin", game.iteration)
        .then(function() {
          animate("#pipetteTip1", 0, "keyframe", "tipToBin")
            .then(function() {
              animate("#pipetteTip1", 0, "addClass", "opClass")
                .then(function() {
                  $("#pipetteTip1").resetKeyframe(() => {})
                  $("#pipetteTip1").css("top", "96%")
                  $("#wasteBasket").css("z-index", "1")
                })
                .then(function() {
                  if (game.iteration == 5) {
                    animate("#micropipette2", 0, "keyframe", "pipetteFromBinToOrigin")
                  } else {
                    animate("#micropipette2", 0, "keyframe", "pipetteFromBinToPrep")
                  }
                })
            })
        })
    }

  },
  "closeTube": function(evt) {

    $("#s" + game.iteration + "Tube").css("z-index", "0")
    game.state["microtubeState"] = 2;
    return animate("#s" + game.iteration + "Tube svg .Cap", 0, "keyframe", "rotateCap", 0)
  },
  "flickTube": function() {
    game.state["microtubeState"] = 3;
    return animate("#s" + game.iteration + "Tube", 0, "keyframe", "flickTube");
  },
  "tapTube": function() {
    game.state["microtubeState"] = 4;
    return animate("#s" + game.iteration + "Tube", 0, "keyframe", "tapTube")
  },
  "tubeRack": function() {
    game.state["microtubeState"] = 5;
    return animate("#s" + game.iteration + "Tube", 0, "keyframe", "tubeDown")
  }, //step 12
  "tubeRackPost": function() {
    if (game.iteration == 5) {
      animate("html", 0, zoom, [35, 65, 1, 1000]);
      for (i = 0; i <= 5; i++) {
        animate("#s" + i + "Tube", 1500, "keyframe", "tube" + i + "ToBath");
        animate("#s" + i + "Tube", 0, "addClass", "microTube")
      }
      return animate("#tubeBlock", 1500, "keyframe", "moveBlock");
    }
  },
  "pressTubes": function(evt) {
    var tubeId = evt.currentTarget.id.charAt(1);
    $(`#${ evt.currentTarget.id}`).off();

    game.state["totalTubesPressed"]++;

    if (game.testMode) {
      for (i = 0; i <= 5; i++) {
        animate("#s" + i + "Tube", 0, "keyframe", "pressTube" + i);
        game.state["totalTubesPressed"]++;
      }
    }
    else {
    animate("#s" + tubeId + "Tube", 0, "keyframe", "pressTube" + tubeId);
    }
    return animate("html", 100, "null")

  }, //step 13
  "pressTubePost": function() {
    game.state["totalTubesPressed"] = 0;
  },
  "removeLid": function(evt) {
    var top1 = document.getElementsByClassName("topView")
    return animate("#waterBathLid", 0, "keyframe", "removeLid")

  }, //step 14
  "checkTemp": function() {
    //        criteriaPassed = true;
    animate("#view", 0, zoom, [65, 21, 10, 1000])
    return animate("#view", 3500, zoom, [65, 21, 1, 1000]);
  }, //step 15
  "insertRack": function() {
    animate("#tubeBlock", 0, "keyframe", "insertRack")
    for (i = 0; i <= 5; i++) {
      //animate("#s" + i + "Tube", 0, "addClass", "microTube");
      animate("#s" + i + "Tube", 0, "keyframe", "insertTube" + i);

    }
    animate("#tubeBlock, .microTube", 1750, "storage");
    return animate("html", 500, "null")



  }, //step 16
  "closeLid": function() {
    animate("#waterBathLid", 0, "keyframe", "replaceLid")
    animate("#view", 1000, zoom, [65, 36, 5, 1500])
    animate("#waterBathNoLid *", 2500, "removeClass", "opClass")
    return animate("html", 500, "null")


  }, //step 17
  "setTimer": function() {
    animate("#tubeBlock", -500, "keyframe", "resetTubeBlock")
    for (i = 0; i <= 5; i++) {
      //animate("#s" + i + "Tube", 0, "addClass", "microTube");
      animate("#s" + i + "Tube", -500, "keyframe", "resetTube" + i);

    }
    var time = $("#waterBathNoLid").find("[type='text']").val();

    game.state["time"] = time
    return animate("html", 500, "null")
  },
  "setTimerPost": function() {
    animate("#waterBathNoLid *", 1000, "addClass", "opClass");
    animate("#view", 0, zoom, [65, 36, 1, 1000]);
    animate(".microTube, .tip, #tubeBlock", 0, "view")
    game.state["microtubeState"] = 0
    animate("#loadDye", 1000, "removeClass", "opClass"); //For somereason, we cannot add loadDye by adding a line to itemsAdded
                                                        // Don't know the reason why, and Joochan added opClass to the item itself
                                                        // and added a removeclass here to show.                    (domitems)

  }, //step 18
  "prepPipette1": function(evt) {
    animate("#micropipette2", 0, "keyframe", "PrepPipette")
    animate("#view", 2000, zoom, [25, 46, 9.5, 1000])
    animate(".volumeInput, .volumeButton", 2000, "removeClass", "opClass")
    return animate("html", 500, "null")

  },

  "setDyeVolume": function() {
    var volume = $("#micropipette2").find("[type='text']").val();

    game.state["volume"] = volume;
    return animate("html", 0, "null")
  },

  "setDyeVolumePost": function() {
    //updateScore(10);
    animate(".volumeInput, .volumeButton", 0, "addClass", "opClass")
    animate("#view", 0, zoom, [25, 46, 1, 1000])
    return animate(".tip", 0, "removeClass", "opClass")

  }, //step 21

  "openDye": function(evt) {
    animate("#loadDye", 0, "keyframe", "moveLoadingDye")
    animate("#loadDye svg .Cap", 1500, "keyframe", "rotateCap", -120)
    return animate("#svgfluid", 2000, "animate", [{
      "y": 100
    }])

  }, //step 19
  "selectTip1": function(evt) {
    var selector = evt.currentTarget.id
    // in event
    if (game.testMode) {
      tipPos = "0"
    }
    animate("#micropipette2", 0, "keyframe", "addTip2", selector)
    animate("#" + selector, 740, "addClass", "opClass")
    return animate("#pipetteTip1", 750, "removeClass", "opClass")
  }, //step 20

  "openTube1": function(evt) {
    return eventFunctions.openTube(evt)

  }, //step 22
  "addDye": function() {
    animate("#svgfluid", 00, "animate", [{
      "y": 50
    }])

    animate("#micropipette2", 400, "keyframe", "addDyeToTube", game.iteration)

    if (game.iteration == 5) {
      animate("#loadDye svg .Cap", 1100, "keyframe", "rotateCap", 0)
      animate("#loadDye", 1350, "keyframe", "moveLoadingDyeback")
    }
    return animate("html", 2000, "null")
  }, //step 23
  // REPEATING STEPS~~~~~~~~~~~~~~~~~~~~~~~~~~
  "mixContents2": function() {
    $(".micropipette").css("z-index", "-1")
    var zoomLeft = 35 + 3 * (game.iteration)
    animate("#view", 0, zoom, [zoomLeft, 68, 12, 1050])
    return animate("#svgfluid", 1000, "keyframe", "mixFluid2")
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~REAPEATING STEPS
  "openTubes": function(evt) {
    if(game.state["totalTubesPressed"] == 0) {
      $(`.Cap`).attr("style","")
    }

    var tubeId = evt.currentTarget.id.charAt(1);
        console.log($(`#${evt.currentTarget.id} .Cap`).attr("style"))
    if(!$(`#${evt.currentTarget.id} .Cap`).attr("style")){
    game.state["totalTubesPressed"]++;
    }
    console.log(game.state["totalTubesPressed"])
    if (game.testMode) {
      for (i = 0; i < 5; i++) {
        animate("#s" + i + "Tube svg .Cap", 0, "keyframe", "rotateCap", -120)
        game.state["totalTubesPressed"]++;

      }
    }
    else {
    animate("#s" + tubeId + "Tube svg .Cap", 0, "keyframe", "rotateCap", -120)
    }
    return animate("html", 2000, "null")

  }, //step 29

  "removeComb": function() {
    animate("#gelComb", 0, "keyframe", "removeComb")
    return animate("#gelComb", 1000, "storage")
  }, //step 30

  "toTop": function() {
    animate("#arrowDown", 0, "removeClass", "opClass")

    // animate("#day1, #day2, #day2 *", 0, "hide");
    // animate("#bothDays, #bothDays *", 0, "hide");
    // animate("#topView, #topView *", 0, "show");
    // animate(".bands, .laneFill", 0, "hide");
    // $("#sideView").append($('#pipetteTip1'));
    return animate("html", 0, "null")

  }, //step 31
  "orientGel": function() {
    animate("#arrowDown, #arrowUp", 0, "addClass", "opClass")
    return animate("#micropipetteTopView, #gelFinalTop", 0, "view")

  }, //step 32, 37, 42
  "addTipTop": function(evt) {
    // if (evt.currentTarget.classList.contains("st3") == false) {
    //
    // }
    var totalRows = 8;
    var totalCols = 12;

    var tip = game.state["tipTray"].indexOf(0)
    $(`#${evt.currentTarget.id}`).removeClass("tipTop")
    var nextColumn = tip % totalCols
    var nextRow = Math.floor(tip / totalRows);
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

    var topMost = 56.6,
      leftMost = 32.8,
      rowHeight = 1.1,
      colWidth = .78
    var micropipetteTopViewLeft = leftMost + (colWidth * column)
    var micropipetteTopViewTop = topMost + (rowHeight * row)
    animate("#micropipetteTopView", 0, "animate", [{ //TopMost left:31.2%, 56.6% left= +=.78%,, top= +=1.1%
      "left": micropipetteTopViewLeft + '%',
      "top": micropipetteTopViewTop + '%'
    }]);
    game.state["tipTray"][column + (row * totalRows)] = 1;;
    return animate("html", 100, "null")
  }, //step 33

  "takeMicTube": function(evt) {
    animate("#micropipetteTopView", 0, "keyframe", "pipetteTopToTube", game.iteration);
    return animate("html", 1000, zoom, [10, 74, 6, 1000])
  }, //step 34

  "toLane": function(evt) {
    animate("#micropipetteTopView", 0, "keyframe", "pipetteTopToLane", game.iteration);
    return animate("html", 1000, zoom, [10, 74, 1, 500]) //zoomout
  }, //step 35,40
  "toLanePost": function() {
    while(!($('#sideView').length)){
    $("#view").append($("<div/>",{id:"sideView"}))
  }
      $("#sideView").append($("#pipetteTip1"), $("#gelWell"), $("#gelWellBoundary"))
      $("#sideView, #sideView *").removeClass("opClass")


  //   animate("#sideView", 0, "view")

    //$("#pipetteTip1").removeClass("opClass")
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
    $('#gelWell').droppable({
      tolerance: "touch"
    });
    $('#pipetteTip1').draggable({
      disabled: false,
      revert: true
    });
  },
  "insertTip": function(evt) {
    var sideViewWidth = parseFloat($('#sideView').css("width"));
    var sideViewHeight = parseFloat($('#sideView').css("height"));
    var currentBot = parseFloat($('#pipetteTip1').css("bottom")) / sideViewHeight * 100;
    var currentLeft = parseFloat($('#pipetteTip1').css("left")) / sideViewWidth * 100;
    game.state["TipPosition"] = false
    if (currentBot < 68) {
      if (currentBot < 12 || currentLeft > 67.8 || currentLeft < 19.5) {
        overlay.message("Make sure the tip is not breaching the wall!")
      } else if (currentBot > 40) {
        overlay.message("Make sure the tip stays deep enough within the well!")
      } else if (currentBot < 15) {
        overlay.message("Your tip is going too deep into the well. Don't risk it to breach the wall!")
      } else {
        game.state["TipPosition"] = true
        $('#pipetteTip1').draggable({
          disabled: true,
          revert: false
        });
      }
      if (game.state["TipPosition"] == 0) {
        $('#pipetteTip1').css("top", "-80%")
        $('#pipetteTip1').css("left", "42%")
      }
    }
    return animate("html", 0, "null")
  }, //step 36

  "insertTipPost": function() {
    animate("#svgfluid", 0, "animate", [{
      y: "100"
    }])
    animate("#gelWellBoundary", 400, "css", [{
      "background-image": "radial-gradient(blue, #5555ff, #5555ff)"
    }])

    animate(".side", 3000, "storage")
    animate("#gelWellBoundary", 3400, "css", [{
      "background-image": "radial-gradient(rgba(59,128,194,.86), rgba(59,128,194,.86), rgba(59,128,194,.86))"
    }])
    var well = game.state["wellPosition"].indexOf(0)

    var currentWell = "#well_" + well
    animate(currentWell, 0, "css", [{
      "fill": "#5555ff"
    }])
    game.state["wellPosition"][well] = 1;
    setTimeout(function() {
      $("#sideView").addClass("opClass")
    }, 1500)
    // setTimeout(function () {
    //     $('#pipetteTip1').css("top", "-80%")
    //     $('#pipetteTip1').css("left", "42%")
    // }, 5000)
  },

  "disposeTip": function() {
    return animate("#micropipetteTopView", 0, "animate", [{
      "left": '37%',
      "top": '5.3%'
    }]);
  }, //step 72

  //To Day3

  "clickLid": function() {
    animate("#lidSide, #micropipetteTopView", 0, "storage")
    animate("#lidBox", 0, "view")
    animate(".gelVoltage", 1000, "view")
    animate("#tipBoxTop, #wasteBinTop", 0, "storage")
    return animate("#gelVoltageCover, #voltage", 1000, "view")
  }, //step 73
  "setVoltage": function(evt) {
    game.state["voltage"] = $("#voltage").val()
    return animate("html", 0, "null")
  },
  "setVoltagePost": function() {
    animate("#stainingTray", 0, "view")
    return animate("#gelVoltageCover", 1000, "storage")
  }, //step 74
  "removeGelLid": function() {
    animate("#lidBox", 0, "storage")
    return animate("#lidSide", 0, "view")

  }, //step 75
  "removeGel": function() {
    return animate("#gelFinalTop", 0, "animate", [{
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
    animate("#topView, #topView *", 2000, "storage")
    animate("#graduatedCylinder, #stainingTraySide", 2000, "view")
    animate("#waterBathNoLid, #waterBathLid, #gelComb, #wasteBasket, #shelf1, #loadDyeCap", 2000, "storage")
    animate("#bothDays, #day2, .day3, .day3 *, .microTube, .microTube *, #graduatedCylinder, #stainingTraySide", 2000, "view")
    return animate("#stainedGel", 2000, "css", [{
      opacity: 0 //left it with opacity, because of slowFadeIn animation
    }])

  }, //step 77
  "stainGel": function() {
    animate("#graduatedCylinder", 0, "keyframe", "pourStain")
    return animate("#svgcylfluid", 1000, "animate", [{
      "y": -270
    }])

    animate(".bands, .laneFill", 0, "view");
    animate("#stainedGel", 600, "keyframe", "slowFadeIn")
    return animate("#graduatedCylinder", 2000, "keyframe", "pourStainRev")
  }, //step 78
  "examineGel": function() {
    var contents = $("#gelFinalTop").contents();
    $("#gelFinalTop").empty();
    $("#gel").append(contents);
    loadSVGLogic();


    $("#gel, #gel *").css({
      opacity: 1.0,
      visibility: "visible",
      display: "block"
    }).animate({
      opacity: 1
    }, 200)
    return animate("html", 300, "null")

  }, //step 79
  "pickLane": function(evt) {
    var studentAnswer = evt.currentTarget.id.split("_")[1];



    game.state["lanePickedNumber"] = studentAnswer
    return animate("html", 300, "null")
  },
  "pickLanePost": function() {}

}

function betterParseInt(s) {
  var str = s + "";
  while (isNaN(parseInt(str)) && str.length > 0) {
    str = str.substring(1, str.length);
  }
  return parseInt(str);
}
