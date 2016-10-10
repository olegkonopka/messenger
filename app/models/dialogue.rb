class Dialogue < ApplicationRecord
  validates_uniqueness_of :sender_id, scope: :receiver_id
  belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
  belongs_to :receiver, foreign_key: :receiver_id, class_name: 'User'

  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy

  scope :involving,-> (user) do
    where("dialogues.sender_id=? OR dialogues.receiver_id=?", user.id, user.id)
  end

  scope :between, -> (sender_id, receiver_id) do
    where("(dialogues.sender_id=? AND dialogues.receiver_id=?) OR (dialogues.sender_id=? AND dialogues.receiver_id=?)", sender_id, receiver_id, receiver_id, sender_id)
  end
end
