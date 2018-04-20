
  //Delete row 
  function rowdeleteFn(current){
    var r = confirm("You won\'t be able to undo the operation");
    if(r == true){
      console.log("r is true");
      var _csrf = $(current).attr("data-csrf");
      var id = $(current).attr("data-id");
      console.log("_csrf:"+_csrf);
      console.log("id:"+id);
      $('<form action="delete" method="POST"/>')
      .append($('<input type="hidden" name="id" value="' + id + '">'))
      .append($('<input type="hidden" name="_csrf" value="' + _csrf + '">'))
      .appendTo($(document.body))
      .submit();      
    }
  }

  //Update Row
  function rowUpdateFn(current){
    var r = confirm("Are you sure you want to update");
    if(r == true){
      console.log("r is true");
      var _csrf = $(current).attr("data-csrf");
      var id = $(current).attr("data-id");
      console.log("_csrf:"+_csrf);
      console.log("id:"+id);
      $('<form action="/crud/update" method="POST"/>')
      .append($('<input type="hidden" name="id" value="' + id + '">'))
      .append($('<input type="hidden" name="_csrf" value="' + _csrf + '">'))
      .appendTo($(document.body))
      .submit();      
    }
  }
