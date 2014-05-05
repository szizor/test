class Video < ActiveRecord::Base
  attr_accessible :name, :visible, :polygon_id, :url
  validates_presence_of :name, :url
end
