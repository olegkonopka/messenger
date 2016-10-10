class DialoguesController < ApplicationController
  before_filter :authenticate_user!

  layout false

  def create
    if Dialogue.between(params[:sender_id],params[:receiver_id]).present?
      @dialogue = Dialogue.between(params[:sender_id],params[:receiver_id]).first
    else
      @dialogue = Dialogue.create!(conversation_params)
    end

    render json: { dialogue_id: @dialogue.id }
  end

  def show
    @dialogue = Dialogue.find(params[:id])
    @reciever = interlocutor(@dialogue)
    @messages = @dialogue.messages.order("created_at ASC")
    @message = Message.new
  end


  private
  def conversation_params
    params.permit(:sender_id, :receiver_id)
  end

  def interlocutor(dialogue)
    current_user == dialogue.receiver ? dialogue.sender : dialogue.receiver
  end
end
