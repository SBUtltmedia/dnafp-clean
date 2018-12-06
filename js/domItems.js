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
    classes: ["item"],
    svg: "equipment/csTube.svg"
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
