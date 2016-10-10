module UsersHelper
  def dialogue_interlocutor(dialogue)
    if current_user.is_admin
      dialogue.receiver == current_user ? dialogue.receiver : dialogue.sender
    else
      dialogue.receiver == current_user ? dialogue.sender : dialogue.receiver
    end
  end
end
