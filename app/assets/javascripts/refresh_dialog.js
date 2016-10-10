ready = function() {
  setInterval(refreshDialog , 1000*60*10);
  $('#refresh_part').on("click", function(e){
    e.preventDefault();
    refreshDialog();
  })
};

refreshDialog = function(){
  $.ajax({
    url: "users/refresh_part"
  })
};

$(document).ready(ready);
$(document).on('turbolinks:load', ready);