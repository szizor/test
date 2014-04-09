class Document < ActiveRecord::Base
  attr_accessible :name, :visible, :polygon_id, :file
  mount_uploader :file, ImageUploader
end
