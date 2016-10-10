var chatboxFocus = new Array();
var chatBoxes = new Array();

var ready = function () {

    chatBox = {

        chatWith: function (dialogue_id) {

            chatBox.createChatBox(dialogue_id);
            $("#chatbox_" + dialogue_id + " .chatboxtextarea").focus();
        },

        close: function (dialogue_id) {
            $('#chatbox_' + dialogue_id).css('display', 'none');
            chatBox.restructure();
        },

        notify: function () {
            var audioplayer = $('#chatAudio')[0];
            audioplayer.play();
        },

        restructure: function () {
            align = 0;
            for (x in chatBoxes) {
                chatbox_id = chatBoxes[x];

                if ($("#chatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#chatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#chatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
            }
        },

        createChatBox: function (dialogue_id, minimizeChatBox) {
            if ($("#chatbox_" + dialogue_id).length > 0) {
                if ($("#chatbox_" + dialogue_id).css('display') == 'none') {
                    $("#chatbox_" + dialogue_id).css('display', 'block');
                    chatBox.restructure();
                }
                $("#chatbox_" + dialogue_id + " .chatboxtextarea").focus();
                return;
            }

            $("body").append('<div id="chatbox_' + dialogue_id + '" class="chatbox"></div>')

            $.get("dialogues/" + dialogue_id, function (data) {
                $('#chatbox_' + dialogue_id).html(data);
                $("#chatbox_" + dialogue_id + " .chatboxcontent").scrollTop($("#chatbox_" + dialogue_id + " .chatboxcontent")[0].scrollHeight);
            }, "html");

            $("#chatbox_" + dialogue_id).css('bottom', '0px');

            chatBoxeslength = 0;

            for (x in chatBoxes) {
                if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
                    chatBoxeslength++;
                }
            }

            if (chatBoxeslength == 0) {
                $("#chatbox_" + dialogue_id).css('right', '20px');
            } else {
                width = (chatBoxeslength) * (280 + 7) + 20;
                $("#chatbox_" + dialogue_id).css('right', width + 'px');
            }

            chatBoxes.push(dialogue_id);

            if (minimizeChatBox == 1) {
                minimizedChatBoxes = new Array();

                if ($.cookie('chatbox_minimized')) {
                    minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
                }
                minimize = 0;
                for (j = 0; j < minimizedChatBoxes.length; j++) {
                    if (minimizedChatBoxes[j] == dialogue_id) {
                        minimize = 1;
                    }
                }

                if (minimize == 1) {
                    $('#chatbox_' + dialogue_id + ' .chatboxcontent').css('display', 'none');
                    $('#chatbox_' + dialogue_id + ' .chatboxinput').css('display', 'none');
                }
            }

            chatboxFocus[dialogue_id] = false;

            $("#chatbox_" + dialogue_id + " .chatboxtextarea").blur(function () {
                chatboxFocus[dialogue_id] = false;
                $("#chatbox_" + dialogue_id + " .chatboxtextarea").removeClass('chatboxtextareaselected');
            }).focus(function () {
                chatboxFocus[dialogue_id] = true;
                $('#chatbox_' + dialogue_id + ' .chatboxhead').removeClass('chatboxblink');
                $("#chatbox_" + dialogue_id + " .chatboxtextarea").addClass('chatboxtextareaselected');
            });

            $("#chatbox_" + dialogue_id).click(function () {
                if ($('#chatbox_' + dialogue_id + ' .chatboxcontent').css('display') != 'none') {
                    $("#chatbox_" + dialogue_id + " .chatboxtextarea").focus();
                }
            });

            $("#chatbox_" + dialogue_id).show();

        },

        checkInputKey: function (event, chatboxtextarea, dialogue_id) {
            if (event.keyCode == 13 && event.shiftKey == 0) {
                event.preventDefault();

                message = chatboxtextarea.val();

                message = message.replace(/^\s+|\s+$/g, "");

                if (message != '') {
                    $('#dialogue_form_' + dialogue_id).submit();
                    $(chatboxtextarea).val('');
                    $(chatboxtextarea).focus();
                    $(chatboxtextarea).css('height', '44px');
                }
            }

            var adjustedHeight = chatboxtextarea.clientHeight;
            var maxHeight = 94;

            if (maxHeight > adjustedHeight) {
                adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
                if (maxHeight)
                    adjustedHeight = Math.min(maxHeight, adjustedHeight);
                if (adjustedHeight > chatboxtextarea.clientHeight)
                    $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
            } else {
                $(chatboxtextarea).css('overflow', 'auto');
            }

        },

        toggleChatBoxGrowth: function (dialogue_id) {
            if ($('#chatbox_' + dialogue_id + ' .chatboxcontent').css('display') == 'none') {

                var minimizedChatBoxes = new Array();

                if ($.cookie('chatbox_minimized')) {
                    minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
                }

                var newCookie = '';

                for (i = 0; i < minimizedChatBoxes.length; i++) {
                    if (minimizedChatBoxes[i] != dialogue_id) {
                        newCookie += dialogue_id + '|';
                    }
                }

                newCookie = newCookie.slice(0, -1)


                $.cookie('chatbox_minimized', newCookie);
                $('#chatbox_' + dialogue_id + ' .chatboxcontent').css('display', 'block');
                $('#chatbox_' + dialogue_id + ' .chatboxinput').css('display', 'block');
                $("#chatbox_" + dialogue_id + " .chatboxcontent").scrollTop($("#chatbox_" + dialogue_id + " .chatboxcontent")[0].scrollHeight);
            } else {

                var newCookie = dialogue_id;

                if ($.cookie('chatbox_minimized')) {
                    newCookie += '|' + $.cookie('chatbox_minimized');
                }


                $.cookie('chatbox_minimized', newCookie);
                $('#chatbox_' + dialogue_id + ' .chatboxcontent').css('display', 'none');
                $('#chatbox_' + dialogue_id + ' .chatboxinput').css('display', 'none');
            }

        }
    }

    jQuery.cookie = function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();

            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
}
}

$(document).ready(ready);
$(document).on("turbolinks:load", ready);
