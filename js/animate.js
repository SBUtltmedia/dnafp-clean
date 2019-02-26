function animate(selector, delay, method, param, inputs = [], callback = () => {}) {
console.log(method)
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
    makeAnimation(param, inputs)
    var keyframe = animations[param].keyframes
    try {
      $(selector).resetKeyframe(callback);
      $.keyframe.define({
        name: param,
        ...animations[param].keyframes
      });
    } catch (error) {
      console.error(error);

    }
    if (game.testMode) {
      $(selector).css(keyframe["100%"])
      callback();
    }
    //$(selector).attr("style","")
    else {
      setTimeout(function() {
    console.log(animations[param].props)
        $(selector).playKeyframe(`${param} ${animations[param].props}`, function() {

          var style = $(selector).attr("style");
          var keyframe = animations[param].keyframes
          if (style) {
            style = style.replace(/animation:[^;]*;/g, "")
            $(selector).attr("style", style);
          }
          $(selector).css(keyframe["100%"])
        });
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

        $(selector).animate(...param);
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
