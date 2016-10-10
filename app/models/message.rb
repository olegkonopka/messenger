class Message < ApplicationRecord
  belongs_to :dialogue
  belongs_to :user
  has_many :notifications, dependent: :destroy
  validates_presence_of :body, :dialogue_id, :user_id
end
