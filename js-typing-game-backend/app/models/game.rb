class Game < ApplicationRecord
  belongs_to :player

  def highest_score
    self.maximum(:score)
  end
end
