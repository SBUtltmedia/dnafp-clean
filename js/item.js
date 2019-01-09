function Item() {
  console.log("Test")

  this.buildItemById = function(itemId) {
    return this.buildItem(Object.assign({}, domItems[itemId], {
      itemId
    }))
  }


  this.buildItem = function({
    parent = "#storage",
    itemId,
    css,
    classes = [],
    svg
  }) {
    // console.log(domItems[itemId])
    var defer = $.Deferred();
    if (svg) {
      url = `img/${svg}`
    } else {
      url = `html/${svg}`
    }

    if (css) {
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {
          // console.log(data)
          var div = $('<div/>', {
            id: itemId,
            class: [...classes],
            html: data
          }).css(css)
          $(parent).append(div);

          defer.resolve("h")
        },
        error: function() {
          defer.resolve("not found")

        }
      })
    }


    return defer.promise();
  }

this.buildAllItems = function(domItems) {
  var defer = $.Deferred();
  var buildItemsRecurse =(domItems, itemIndex = 0)=> {
    itemIds = Object.keys(domItems)
    if (itemIndex < itemIds.length) {
      this.buildItemById(itemIds[itemIndex]).then(()=> {
      buildItemsRecurse(domItems, itemIndex+1)
      })
    }else {
      console.log("done")
      defer.resolve("done building item")
    }
  }
  buildItemsRecurse(domItems)
  return defer.promise()
}
}
