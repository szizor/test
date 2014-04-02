class Tour < ActiveRecord::Base
  attr_accessible :name, :description, :coordinates, :polygon_id, :start_date
end
