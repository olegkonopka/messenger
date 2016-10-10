class UsersController < ApplicationController
  before_filter :authenticate_user!
  before_filter :find_user, only: [:edit, :update, :destroy]

  def new
    @user = User.new
  end

  def index
    @users = User.where.not("id=?", current_user.id).where("is_admin !=?", true).order("created_at DESC")
    @dialogues = Dialogue.involving(current_user).order("created_at DESC")
    @notifications = current_user.notifications.where(read: false)
  end

  def create
    @user = User.create!(user_params)
    redirect_to root_path
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      redirect_to root_path
    else
      render "edit"
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end

  def refresh_part
    @dialogues = Dialogue.involving(current_user).order("created_at DESC")
    respond_to do |format|
      format.js
    end
  end

  def destroy_session
    current_user.update_attributes(last_sign_out_at: Time.now)
  end

  def update_notification
    @notifications = current_user.notifications.where(read: false)
    respond_to do |format|
      format.js
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def find_user
      @user = User.find(params[:id])
    end
end
