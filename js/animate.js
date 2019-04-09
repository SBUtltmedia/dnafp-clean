function animate(selector, delay, method, param, inputs = [], callback = () => {}) {


  return new Promise((resolve, reject) => {
    if (game.testMode) {
      delay = 0
    }

    if (method == "keyframe") {
      var animation = makeAnimation(param, inputs)
      var keyframe = animation.keyframes

      //    $(selector).resetKeyframe(callback);

      if (game.testMode) {
        $(selector).css(keyframe["100%"])
        //  callback();

        resolve("keyframetestmode")

      }
      // if ($(selector + ':visible').length == 0) {
      //     setTimeout(function () {
      //         $(selector).show();
      //         $(selector).removeClass("opClass");
      //         $(selector).css("visibility", "visible");
      //     }, delay)
      // }
      else {



        var randParam = param + Date.now();
        var animDef = {
          name: randParam,
          ...animation.keyframes
        }
        var propDef = `${randParam} ${animation.props}`



        setTimeout(function() {
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
              resolve(method)
            });
          });
          // callback();
        }, delay)
      }
    } else if (method == "null") {
      resolve(method)
    } else if (method == "css") {
      setTimeout(function() {
        $(selector).css(...param);
        // callback();
        resolve("css")
      }, delay)
      resolve(method)
      //$(selector).delay(delay).playKeyframe(param, function () {});
    }




    //$(selector).attr("style","")

    //$(selector).delay(delay).playKeyframe(param, function () {});
    else if (method == "addClass" || method == "removeClass") {
      setTimeout(function() {
        $(selector)[method](param);
        // callback();
        resolve(method)
      }, delay)
    } else if (method == "attr") {
      setTimeout(function() {
        $(selector).attr(param[0], param[1]);
        // callback();
        resolve(method)
      }, delay)
    } else if (method == "animate") {
      if (game.testMode) {
        $(selector).css(...param)
        resolve(method)
      } else {
        setTimeout(function() {
          resolve(method)

          $(selector).animate(...param);
        }, delay)
      }
      //$(selector).delay(delay).playKeyframe(param, function () {});
    } else if (method == "show") {
      setTimeout(function() {
        $(selector).show();
        callback();
        resolve(method)
      }, delay)
    } else if (method == "hide") {
      setTimeout(function() {
        $(selector).hide();
        callback();
        resolve(method)
      }, delay)
    } else if (typeof(method) == "function") {
      if (method.name == "zoom" && game.testMode) {
        zoomInstant(param[0], param[1], param[2])
        // callback()
        resolve(method)

      } else {
        $(selector).delay(delay).queue(function() {
          method(...param, game.testMode)
          $(this).dequeue();
          // callback();
          resolve(method)
        })
      }


    }




  })
}
