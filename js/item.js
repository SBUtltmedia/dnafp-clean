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
    console.log(domItems[itemId])
    var defer = $.Deferred();
    if (svg) {
      url = `img/${svg}`
    } else {
      url = `html/${svg}`
    }

    if (svg) {
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
  this.buildAllItems = function(domItems, itemIndex = 0) {
    itemIds = Object.keys(domItems)
    console.log(itemIds[itemIndex])
    if (itemIndex < itemIds.length) {
      this.buildItemById(itemIds[itemIndex]).then(()=> {console.log("called")
        this.buildAllItems(domItems, itemIndex+1)
      })
    }
  }
}
