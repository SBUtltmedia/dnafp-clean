function Item() {


  this.buildItemById = function(itemId) {

    return this.buildItem(Object.assign({}, domItems[itemId], {
      itemId
    }))
  }


  this.buildItem = function({
    parent = "#view",
    itemId,
    css,
    classes = [],
    resources,
  }) {
    //
    var defer = $.Deferred();
    if (resources) {
      $.ajax({
        url: "./resources/" + resources,
        dataType: "text",
        success: function(data) {
          makeDOMItem({
            parent,
            itemId,
            css,
            classes,
            data,
            defer
          })
        },
        error: function() {

          defer.reject("not found")
        }
      })
    }
    else{
      data="";
      makeDOMItem({
        parent ,
        itemId,
        css,
        classes,
        data,
        defer
      })
    }
    return defer.promise();
  }

  function makeDOMItem({
    parent = "#view",
    itemId,
    css,
    classes = [],
    data = "",
    defer
  }) {

    var div = $('<div/>', {
      id: itemId,
      class: [...classes],
      html: data
    }).css(css)

    $(parent).append(div);
    defer.resolve("h")
  }


  this.buildAllItems = function(domItemsIds) {
    var defer = $.Deferred();

    var buildItemsRecurse = (domItemsIds, itemIndex = 0) => {
  //    itemIds = Object.keys(domItems)
      if (itemIndex < domItemsIds.length) {
        // console.log(itemIndex, domItemsIds.length)
        this.buildItemById(domItemsIds[itemIndex]).then(() => {
          buildItemsRecurse(domItemsIds, itemIndex + 1)
        }).fail(()=>{
          defer.resolve("failed")
        console.log("failed")})
      } else {
        // console.log("resolving")
        defer.resolve("done building item")
      }
    }
    buildItemsRecurse(domItemsIds)
    return defer.promise()
  }
}
