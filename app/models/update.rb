class Update < ActiveRecord::Base
  attr_accessible :name, :description, :alternative_id, :user_id
end
