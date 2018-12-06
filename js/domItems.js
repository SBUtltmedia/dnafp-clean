domItems = {
  "#enzTube": {
    css: {
      width: "5%",
      height: "11%",
      left: "85.5%",
      top: "62.7%" ,
      position: "absolute",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "transform-origin": "100% 0%",
    },
    classes: ["item clearTube"],
    svg: "equipment/csTube.svg"
  },
  "#iceBucket": {
    css: {
      width: "20%",
        height: "12%",
        left: "80%",
        top: "66.57%",
        position: "absolute",
        "background-repeat": "no-repeat",
        "background-size": "contain",
        "background-position": "center center",
        visibility: "visible",
        "z-index": "0",
    },
    svg: "equipment/ice_bucket.svg"
  },
  "pipetteHolder": {
    css: {
      width: "22%",
    height: "29%",
    left: "-0.25%",
    top: "51%",
    position: "absolute",
    "background-repeat": "no-repeat",
    "background-size": "cover",
    "background-position": "center center",
    },
    svg: "equipment/pipetteHolder.svg"
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
},
svg: "equipment/micropipette.svg"
  }
}
function highlightObject(highlight,selector) {
  if (highlight){
    animate(selector, 0, "addClass", "highLighted")
  }
  else {
    animate(selector, 0, "removeClass", "highLighted")
  }

}
