Array.prototype.containsByProp = function(propName, value){
  for (var i = this.length - 1; i > -1; i--) {
    var propObj = this[i];
      if(propObj[propName] === value) {
        return true;
    }
  }
return false;
} 	
