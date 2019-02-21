function Item() {
  

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
          defer.resolve("not found")
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
    parent = "#storage",
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


  this.buildAllItems = function(domItems) {
    var defer = $.Deferred();
    var buildItemsRecurse = (domItems, itemIndex = 0) => {
      itemIds = Object.keys(domItems)
      if (itemIndex < itemIds.length) {
        this.buildItemById(itemIds[itemIndex]).then(() => {
          buildItemsRecurse(domItems, itemIndex + 1)
        })
      } else {
        
        defer.resolve("done building item")
      }
    }
    buildItemsRecurse(domItems)
    return defer.promise()
  }
}
