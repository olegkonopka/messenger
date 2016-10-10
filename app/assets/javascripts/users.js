var ready = function() {

    $('.start-dialogue').click(function (e) {
        e.preventDefault();

        var sender_id = $(this).data('sender-id');
        var receiver_id = $(this).data('receiver-id');

        $.post("/dialogues", { sender_id: sender_id, receiver_id: receiver_id }, function (data) {
            chatBox.chatWith(data.dialogue_id);
        });
    });

    $(document).on('click', '.toggleChatBox', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });

    $(document).on('click', '.closeChat', function (e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.close(id);
    });

    $(document).on('keydown', '.chatboxtextarea', function (event) {

        var id = $(this).data('cid');
        chatBox.checkInputKey(event, $(this), id);
    });

    $('.conversation').click(function (e) {
        e.preventDefault();
        var conversation_id = $(this).data('cid');
        chatBox.chatWith(conversation_id);
    });
}

$(document).ready(ready);
$(document).on("page:load", ready);
