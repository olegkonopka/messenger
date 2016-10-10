ready = function() {
  $('#destroy_session').on("click", function(e){
    e.preventDefault();
    markOffline();
  })
};

markOffline = function(){
  $.ajax({
    url: "users/destroy_session"
  })
};

$(document).ready(ready);
$(document).on('turbolinks:load', ready);