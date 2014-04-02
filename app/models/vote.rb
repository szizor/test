class Vote < ActiveRecord::Base
  attr_accessible :ip_address, :problem_id, :user_id
end
