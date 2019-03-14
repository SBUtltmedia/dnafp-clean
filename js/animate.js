function animate(selector, delay, method, param, inputs = [], callback = () => {}) {


  return new Promise((resolve, reject) => {
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

        if (method == "css"){
          setTimeout(function() {
            $(selector).css(...param);
            callback();
            resolve("css")
          }, delay)
          resolve(method)
          //$(selector).delay(delay).playKeyframe(param, function () {});
        }


        if (method == "keyframe") {
          var animation = makeAnimation(param, inputs)
          var keyframe = animation.keyframes

          //    $(selector).resetKeyframe(callback);

          var randParam = param + Date.now();
          var animDef = {
            name: randParam,
            ...animation.keyframes
          }
          var propDef = `${randParam} ${animation.props}`

          if (game.testMode) {
            $(selector).css(keyframe["100%"])
            callback();

            resolve("keyframetestmode")

          }

          //$(selector).attr("style","")
          else {
            setTimeout(function() {
              console.log(randParam, delay)
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
                  resolve(method)
                });
              });
              callback();


            }, delay)
          }
        }
        //$(selector).delay(delay).playKeyframe(param, function () {});



        if (method == "addClass" ||method == "removeClass"){
          setTimeout(function() {
            $(selector)[method](param);
            callback();
            resolve(method)
          }, delay)
        }

        if (method == "view" || method == "storage") {
          setTimeout(function() {
            $(`#${method}`).append($(selector));
            callback();
            resolve(method)
          }, delay)
        }

        if (method == "attr") {
          setTimeout(function() {
            $(selector).attr(param[0], param[1]);
            callback();
            resolve(method)
          }, delay)
        }

        if (method == "animate") {
          if (game.testMode) {
            $(selector).css(...param)
          } else {
            setTimeout(function() {
              resolve(method)

              $(selector).animate(...param);
            }, delay)
          }
          //$(selector).delay(delay).playKeyframe(param, function () {});
        } else if (typeof(method) == "function") {
          if (method.name == "zoom" && game.testMode) {
            zoomInstant(param[0], param[1], param[2])
            callback()
            resolve(method)

          } else {
            $(selector).delay(delay).queue(function() {
              method(...param, game.testMode)
              $(this).dequeue();
              callback();
              resolve(method)
            })
          }


        }




      }
    )}
