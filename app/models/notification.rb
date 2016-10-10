class Notification < ApplicationRecord
  belongs_to :notified_by, class_name: 'User'
  belongs_to :user
  belongs_to :message
  belongs_to :dialogue
  validates :user_id, :notified_by_id, :message_id, :dialogue_id, presence: true
end
