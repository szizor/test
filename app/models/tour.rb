class Tour < ActiveRecord::Base
  attr_accessible :name, :description, :coordinates, :polygon_id, :start_date
  validates_presence_of :name, :description, :coordinates
  belongs_to :polygon
end
