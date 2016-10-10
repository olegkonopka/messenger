class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :dialogues, dependent: :destroy, foreign_key: :sender_id
  has_many :notifications, dependent: :destroy
  has_many :messages


  def is_admin?
    is_admin == true
  end

  def online?
    if current_sign_in_at.present?
      last_sign_out_at.present? ? current_sign_in_at > last_sign_out_at : true
    else
      false
    end
  end
end
