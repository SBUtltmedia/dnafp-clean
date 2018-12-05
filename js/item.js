function item(parent,itemId,css,classes){

var div=$('<div/>',{id:itemId,class:[...classes]}).css(css)
$(parent).append(div);
}
