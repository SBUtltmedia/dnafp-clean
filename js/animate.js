function animate(selector, delay, method, param, inputs = [], callback = () => {}) {


  var defer = $.Deferred();
  if (game.testMode) {
    delay = 0

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
      defer.resolve("css")
    }, delay)
    defer.resolve(method)
    //$(selector).delay(delay).playKeyframe(param, function () {});
  }


  if (method == "keyframe") {
    var animation = makeAnimation(param, inputs)
    var keyframe = animation.keyframes

    //    $(selector).resetKeyframe(callback);

    var randParam = param + Math.floor(Math.random() * 10000000)
    var animDef = {
      name: randParam,
      ...animation.keyframes
    }
    var propDef = `${randParam} ${animation.props}`

    if (game.testMode) {
      $(selector).css(keyframe["100%"])
      callback();
      defer.resolve("keyframetestmode")
    }
    //$(selector).attr("style","")
    else {
      setTimeout(function() {

        //

        $.keyframe.define(animDef)

        $(selector).playKeyframe(propDef, function() {

          $(selector).css(keyframe["100%"])
          $(selector).resetKeyframe(function() {

            var style = $(selector).attr("style");
            // var keyframe = animation.keyframes
            if (style) {
              style = style.replace(/animation:[^;]*;/g, "")
              $(selector).attr("style", style);

            }
            defer.resolve(method)
          });
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
      defer.resolve(method)
    }, delay)
  }

  if (method == "removeClass") {
    setTimeout(function() {
      $(selector).removeClass(param);
      callback();
      defer.resolve(method)
    }, delay)
  }

  if (method == "show") {

    setTimeout(function() {
      $("#view").append($(selector));
      callback();
      defer.resolve(method)

    }, delay)
  }

  if (method == "hide") {
    setTimeout(function() {
      $("#storage").append($(selector));
      callback();
      defer.resolve(method)
    }, delay)
  }

  if (method == "attr")

  {
    setTimeout(function() {
      $(selector).attr(param[0], param[1]);
      callback();
      defer.resolve(method)
    }, delay)
  }

  if (method == "animate") {
    if (game.testMode) {
      $(selector).css(...param)
    } else {
      setTimeout(function() {
        defer.resolve(method)

        $(selector).animate(...param);
      }, delay)
    }
    //$(selector).delay(delay).playKeyframe(param, function () {});
  } else if (typeof(method) == "function") {
    if (method.name == "zoom" && game.testMode) {
      zoomInstant(param[0], param[1], param[2])
      callback()
      defer.resolve(method)

    } else {
      $(selector).delay(delay).queue(function() {
        method(...param, game.testMode)
        $(this).dequeue();
        callback();
        defer.resolve(method)
      })
    }


  }
  return defer.promise();



}
