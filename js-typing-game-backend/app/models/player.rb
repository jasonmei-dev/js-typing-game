class Player < ApplicationRecord
  has_secure_password

  has_many :games

  validates :username, presence: true
  validates :username, uniqueness: true
end
