class NotificationsController < ApplicationController
  def link_through
    @notification = Notification.find(params[:notification])
    @notification.update read: true
  end
end
