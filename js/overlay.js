function Overlay() {
  this.message = function(textMessage, textButton) {
    this.showOverlay()
    $("#messageText").html(textMessage)
    $("#messageButton").html(textButton)
    $('#messageBox').show();
    $('#messageButton').on("click", function() {
      $('#messageBox').hide();
      overlay.hideOverlay()
    })

  }
  this.showOverlay = function() {
    //lockModes();
    // enableClicks(true);
    // Make overlay visible
    $("#overlay").show();
    // Show results screen
    // $("#results").removeClass("anim_exitResults");
    // $("#results").addClass("anim_enterResults");
    // $("#overlayBG").removeClass("anim_fadeOutBG");
    // $("#overlayBG").addClass("anim_fadeInBG");
  }
  this.hideOverlay = function() {
    // Make overlay invisible after it fades out
    setTimeout(function() {
      $("#overlay").hide();
    }, 500);
    // Hide results screen
    // $("#results").removeClass("anim_enterResults");
    // $("#results").addClass("anim_exitResults");
    // $("#overlayBG").removeClass("anim_fadeInBG");
    // $("#overlayBG").addClass("anim_fadeOutBG");
    // $("#challengeButton").removeClass("anim_enterChButton");
    // $("#challengeButton").removeClass("anim_enterChButton2");
    // $("#challengeButton").addClass("anim_exitChButton");
    // $("#challengeScreen").removeClass("anim_enterChallenges");
    // $("#challengeScreen").addClass("anim_exitChallenges");
  }
}
