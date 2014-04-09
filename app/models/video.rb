class Video < ActiveRecord::Base
  attr_accessible :name, :visible, :polygon_id, :url
end
