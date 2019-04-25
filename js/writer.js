function postData(score) {
  // str = JSON.stringify(["finished"]);
  // var str = JSON.stringify(studentData);
  // var str2 = JSON.stringify(stats);
  $.ajax({
    type: "POST",
    url: "writer.php",
    data: {
      'studentData': score
      //    , 'stats': str2
    }
  }).done(function(msg) {}).fail(function() {});
}
