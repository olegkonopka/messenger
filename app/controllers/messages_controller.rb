class MessagesController < ApplicationController
  before_filter :authenticate_user!

  def create
    @dialogue = Dialogue.find(params[:dialogue_id])
    @message = @dialogue.messages.build(body: params[:message][:body], user_id: current_user.id, dialogue_id: @dialogue.id)
    create_notification(@message,@dialogue) if @message.save!
    @path = dialogue_path(@dialogue)
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end


  def create_notification(message,dialogue)
    if message.user.id == dialogue.sender.id
      Notification.create(user_id: dialogue.receiver.id,
                          notified_by_id: current_user.id,
                          message_id: message.id,
                          dialogue_id: message.dialogue_id
                          )
    else
      Notification.create(user_id: dialogue.sender.id,
                          notified_by_id: current_user.id,
                          message_id: message.id,
                          dialogue_id: message.dialogue_id
                          )
    end
  end
end
