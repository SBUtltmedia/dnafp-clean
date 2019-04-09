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
  })


  {
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
            data
          })



            defer.resolve("resource")

        },
        error: function() {

      defer.resolve("no found")
        }
      })
    } else {
      data = "";
      makeDOMItem({
        parent,
        itemId,
        css,
        classes,
        data

      })
            defer.resolve("no resource")
    }
    return defer.promise();
  }

  function makeDOMItem({
    parent = "#view",
    itemId,
    css,
    classes = [],
    data = ""

  }) {

    var div = $('<div/>', {
      id: itemId,
      class: [...classes],
      html: data
    }).css(css)

    $(parent).append(div);

  }


  this.buildAllItems = function(domItemsIds) {
    var defer = $.Deferred();
    var _this = this;

    function buildItemsRecurse(domItemsIds, itemIndex = 0) {
      //    itemIds = Object.keys(domItems)
      if (itemIndex < domItemsIds.length) {
        //
          _this.buildItemById(domItemsIds[itemIndex]).then(() => {

            buildItemsRecurse(domItemsIds, itemIndex + 1)
          }).fail(() => {
            defer.resolve("failed")
          })

      } else {
        //
        defer.resolve("done building item")
      }
    }
    buildItemsRecurse(domItemsIds)
    return defer.promise()
  }
}
