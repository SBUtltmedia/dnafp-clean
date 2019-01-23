// All references of pipet have been changes to pipette, must convert when taking from dnafp
// Additional changes: holder is now tipHolder, gelSideView is now electroBox
domItems = {
  "labBench": {
    css: {
      width: "100%",
      height: "60%",
      left: "0%",
      top: "67%",
      position: "absolute",
      "background-image": "../resources/img/equipment/labBench2.svg",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "pointer-events": "none !important",
      "z-index": "-1",
    },
  },
  "shelf1": {
    css: {
      width: "18%",
      height: "3%",
      left: "60%",
      top: "40%",
      position: "absolute",
      "background-image": "../resources/img/equipment/shelf.svg",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "-1",
    },
  },
  "shelf2": {
    css: {
      width: "18%",
      height: "3%",
      left: "2.5%",
      top: "31%",
      position: "absolute",
      "background-image": "../resources/img/equipment/shelf.svg",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "-1",
    },
  },
  "enzTube": {
    css: {
      width: "5%",
      height: "11%",
      left: "85.5%",
      top: "62.7%",
      position: "absolute",
      "background-image": "../resources/img/equipment/csTube.svg",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "transform-origin": "100% 0%",
      "z-index": "0",
    },
    classes: ["clearTube"],
  },
  "iceBucket": {
    css: {
      width: "20%",
      height: "12%",
      left: "80%",
      top: "67.1%",
      position: "absolute",
      "background-image": "../resources/img/equipment/ice_bucket.svg",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      visibility: "visible",
      "z-index": "1",
    },
  },
  "pipetteHolder": {
    css: {
      width: "22%",
      height: "29%",
      left: "-0.25%",
      top: "50%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
      "z-index": "-1",
    },
    resources: "../resources/img/equipment/pipetteHolder.svg"
  },
  "micropipette0": {
    css: {
      width: "4.6%",
      height: "23%",
      left: "0.5%",
      top: "52%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/micropipette.svg"
  },
  "micropipette1": {
    css: {
      width: "4.6%",
      height: "23%",
      left: "7.5%",
      top: "52%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/micropipette.svg"
  },
  "micropipette2": {
    css: {
      width: "4.6%",
      height: "23%",
      left: "14.5%",
      top: "52%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "1",
    },
    resources: "../resources/img/equipment/micropipette20.svg"
  },
  "tipHolder": {
    css: {
      width: "10%",
      height: "7.5%",
      left: "20.4%",
      top: "70%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
      "z-index": "1",
    },
    resources: "../resources/img/equipment/tipHolder.svg"
  },
  "tip1": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "20.8%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip2": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "21.6%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip3": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "22.4%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip4": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "23.2%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip5": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "24%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip6": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "24.8%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip7": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "25.6%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip8": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "26.4%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip9": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "27.2%",
      top: "68.5%",

    },
    classes: ["tip"],
  },
  "tip10": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "28%",
      top: "68.5%",
      "z-index": "0",
    },
    classes: ["tip"],
  },
  "tip11": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "28.8%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tip12": {
    css: {
      width: "0.7%",
      height: "7%",
      left: "29.6%",
      top: "68.5%",
    },
    classes: ["tip"],
  },
  "tubeBlock": {
    css: {
      width: "17%",
      height: "4.8%",
      left: "35.2%",
      top: "73.0%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
      "z-index": "2",
    },
    resources: "../resources/img/equipment/tubeBlock.svg"
  },
  "s0Tube": {
    css: {
      left: "35.5%",
      "z-index": "1",
    },
    classes: ["microTube s0TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "s1Tube": {
    css: {
      left: "38%",
      "z-index": "1",
    },
    classes: ["microTube s1TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "s2Tube": {
    css: {
      left: "40.5%",
      "z-index": "1",
    },
    classes: ["microTube s2TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "s3Tube": {
    css: {
      left: "43%",
      "z-index": "1",
    },
    classes: ["microTube s3TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "s4Tube": {
    css: {
      left: "45.5%",
      "z-index": "1",
    },
    classes: ["microTube s4TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "s5Tube": {
    css: {
      left: "48%",
      "z-index": "1",
    },
    classes: ["microTube s5TubeColor"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "wasteBasket": {
    css: {
      width: "11.5%",
      height: "14%",
      left: "55%",
      top: "63.5%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "z-index": "1",
    },
    resources: "../resources/img/equipment/waste_basket.svg"
  },
  "waterBathNoLid": {
    css: {
      width: "18%",
      height: "26%",
      left: "60%",
      top: "14.8%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "2",
    },
    resources: "../resources/img/equipment/water_bath_no_lid.svg"
  },
  "waterBathLid": {
    css: {
      width: "16%",
      height: "6%",
      left: "60.75%",
      top: "21%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "3",
    },
    resources: "../resources/img/equipment/water_bath_lid.svg"
  },
  "dyeRack": {
    css: {
      width: "10%",
      height: "7%",
      left: "6.5%",
      top: "24%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "z-index": "1",
    },
    resources: "../resources/img/equipment/dyeRack.svg"
  },
  "loadDye": {
    css: {
      width: "5%",
      height: "15%",
      left: "8%",
      top: "19.2%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "transform-origin": "100% 0%",
    },
    classes: ["clearTube"],
    resources: "../resources/img/equipment/csTube.svg"
  },
  "gelTray": {
    css: {
      width: "13%",
      height: "8%",
      left: "69%",
      top: "71.8%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/gelTray.svg"
  },
  "gelComb": {
    css: {
      width: "11%",
      height: "8%",
      left: "70%",
      top: "70%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/gelComb.svg"
  },
  "electroBoxSide": {
    css: {
      width: "20%",
      height: "6%",
      left: "82%",
      top: "72.5%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/electroBoxSide.svg"
  },
  "stainingTraySide": {
    css: {
      width: "10%",
      height: "4%",
      left: "88%",
      top: "74.5%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/stainingTraySide.svg"
  },
  "stainedGel": {
    css: {
      width: "10%",
      height: "4%",
      left: "88%",
      top: "74.5%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/stainedGel.svg"
  },
  "graduatedCylinder": {
    css: {
      width: "2%",
      height: "14%",
      left: "84%",
      top: "63.7%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/graduatedCylinder.svg"
  },
  "labBenchTop": {
    css: {
      width: "85%",
      height: "175%",
      left: "-21%",
      top: "-25%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/labBenchTop.svg"
  },
  "gelTopView": {
    css: {
      width: "20%",
      height: "30%",
      left: "7%",
      top: "55%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/gelTopView.svg"
  },
  "lidBox": {
    css: {
      width: "35%",
      height: "45%",
      left: "-5.5%",
      top: "40%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/lidBox.svg"
  },
  "lidBase": {
    css: {
      width: "35%",
      height: "45%",
      left: "-5.5%",
      top: "40%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/lidBase.svg"
  },
  "lidSide": {
    css: {
      width: "36%",
      height: "30%",
      left: "-2%",
      top: "20.3%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      visibility: "visible",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/lidSide.svg"
  },
  "arrowUp": {
    css: {
      width: "5%",
      height: "16%",
      left: "60%",
      top: "10%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/arrowUp.svg"
  },
  "arrowDown": {
    css: {
      width: "5%",
      height: "16%",
      left: "55%",
      top: "10%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/arrowDown.svg"
  },
  "powerSupplyTop": {
    css: {
      width: "15%",
      height: "30%",
      left: "-3.9%",
      top: "19.4%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      visibility: "visible",
    },
    resources: "../resources/img/equipment/powerSupplyTop.svg"
  },
  "microTubeHolderTop": {
    css: {
      width: "8%",
      height: "30%",
      left: "35%",
      top: "23%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-size": "contain",
      "background-position": "center center",
      visibility: "visible",
    },
    resources: "../resources/img/equipment/microtubeHolderTop.svg"
  },
  "tubeTop_0": {
    css: {
      top: "20%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/ladderTop.svg"
  },
  "tubeTop_1": {
    css: {
      top: "24.5%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/csTop.svg"
  },
  "tubeTop_2": {
    css: {
      top: "29%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/s1Top.svg"
  },
  "tubeTop_3": {
    css: {
      top: "33.5%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/s2Top.svg"
  },
  "tubeTop_4": {
    css: {
      top: "38%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/s3Top.svg"
  },
  "tubeTop_5": {
    css: {
      top: "42.5%",
    },
    classes: ["tubeTop"],
    resources: "../resources/img/equipment/s4Top.svg"
  },
  "tipBoxTop": {
    css: {
      width: "10%",
      height: "10%",
      left: "33%",
      top: "60%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "visibility": "visible",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/tipBoxTop.svg"
  },
  "wasteBinTop": {
    css: {
      wwidth: "10% ",
      height: "10% ",
      left: "33% ",
      top: "75% ",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "visibility": "visible",
    },
    resources: "../resources/img/equipment/wasteBinTop.svg"
  },
  "micropipetteTopView": {
    css: {
      width: "5%",
      height: "7%",
      left: "-10.5%",
      top: "71.6%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/micropipetteTopView.svg"
  },
  "sideView": {
    css: {
      width: "45%",
      height: "60%",
      left: "55%",
      top: "25%",
      position: "absolute",
      overflow: "hidden",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
      "visibility": "visible",
      "z-index": "0",
    },
    resources: "../resources/img/equipment/sideBackground.svg"
  },
  "pipetteTip1": {
    css: {
      width: "15%",
      height: "22.5%",
      left: "54%",
      top: "96%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center",
    },
    class: ["tip"],

  },
  "gelWell": {
    css: {
      width: "98%",
      height: "53%",
      left: "1%",
      top: "46%",
      position: "absolute",
      background: "rgba(59, 128, 194, .46)",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      visibility: "visible",
    },
  },
  "gelWellBoundary": {
    css: {
      width: "60%",
      height: "80%",
      left: "20%",
      top: "0%",
      background: "rgba(59, 128, 194, .86)",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "visibility": "visible",
    },
  },
  "gelFinalTop": {
    css: {
      width: "9.9%",
      height: "11%",
      left: "12%",
      top: "65.5%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
      "visibility": "visible",
      "z-index": "0",
    },
  },
  "stainingTray": {
    css: {
      width: "15%",
      height: "18%",
      left: "28%",
      top: "55%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center",
    },
    resources: "../resources/img/equipment/stainingTray.svg"
  },
  "volumeButton1": {
    css: {
      width: "2%",
      height: "1.6%",
      left: "25.7%",
      top: "14%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "font-size": ".25rem",
      "outline-width": "0",
    },
    resources: "../resources/img/UI/check.svg",

  },
  "volumeInput1": {
    css: {
      "-webkit-appearance": "none",
      margin: "0",
      padding: "0",
      width: "1.6%",
      height: "1.3%",
      left: "23.2%",
      top: "14%",
      position: "absolute",
      border: ".1rem",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "font-size": ".25rem",
      "outline-width": "0",
    },
    input: "input",
    type: "text",
    name: "volume",
    form: "volumeInput1Form"
  },
  "volumeButton": {
    css: {
      width: "2%",
      height: "1.6%",
      left: "29.1%",
      top: "47.2%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "font-size": ".25rem",
      "outline-width": "0",
    },
    resources: "../resources/img/UI/check.svg",
    input: "input",
    type: "submit",
    name: "volumeButton",
    form: "volumeInputForm"
  },
  "volumeInput": {
    css: {
      "-webkit-appearance": "none",
      width: "1.6%",
      height: "1.8%",
      margin: "0",
      padding: "0",
      border: ".1rem",
      left: "26.5%",
      top: "47%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "font-size": ".25rem",
      "z-index": "10",
      "outline-width": "0",
    },
    input: "input",
    type: "text",
    name: "volume",
    form: "volumeInputForm"
  },
  "timer": {
    css: {
      width: "2.2%",
      height: "2.0%",
      left: "61.3%",
      top: "36.4%",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      margin: "0",
      padding: "0",
      border: "20rem",
      "font-size": ".35rem",
      "z-index": "0",
    },
    input: "input",
    type: "text",
    name: "timer",
    form: "timerForm"
  },
  "timerButton": {
    css: {
      width: "3.5%",
      height: "2.8%",
      left: "64%",
      top: "36%",
      padding: "0",
      border: "20rem",
      "font-size": ".25rem",
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "z-index": "0",
    },
    resources: "../resources/img/UI/check.svg",
    input: "input",
    type: "submit",
    name: "timerButton",
    form: "timerForm"
  },
}

function highlightObject(highlight, selector) {
  if (highlight) {
    animate(selector, 0, "addClass", "highLighted")
  } else {
    animate(selector, 0, "removeClass", "highLighted")
  }

}
