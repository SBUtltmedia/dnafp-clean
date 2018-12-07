function Item() {
  console.log("Test")

  this.buildItemById = function(itemId) {
    this.buildItem(Object.assign({}, domItems[itemId], {
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
