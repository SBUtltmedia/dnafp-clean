function Item() {
  console.log("Test")
  this.buildItem = function({
    parent = "#view",
    itemId,
    css,
    classes = [],
    svg
  }) {

    if (svg) {
      $.ajax({url:`img/${svg}`, dataType: "text", success: function(data) {
        console.log(data)
          var div = $('<div/>', {
            id: itemId,
            class: [...classes],
            html: data
          }).css(css)
          $(parent).append(div);
        }
      })
  }



}
}
