class Game < ApplicationRecord
  belongs_to :player

  def self.highest_score
    self.maximum(:score)
  end
end
