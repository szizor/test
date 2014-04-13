class ActorsAlternative < ActiveRecord::Base
  attr_accessible :alternative_id, :actor_id
  belongs_to :actor
  belongs_to :alternative
end