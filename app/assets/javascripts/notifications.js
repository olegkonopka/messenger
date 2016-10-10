ready = function(){
  $('#show-conversation').on("click", function(e){
    e.preventDefault();
    var notification_id = $(this).data('notification-id');
    var dialogue_id = $(this).data('cid');

    $.ajax({
      url: "notifications/link_through",
      data: {notification: notification_id},
      type: "POST"
    })

    $.ajax({
      url: "users/update_notification"
    })
  })
}



$(document).ready(ready);
$(document).on('page:load', ready);