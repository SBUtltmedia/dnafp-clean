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
