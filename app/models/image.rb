class Image < ActiveRecord::Base
  attr_accessible :name, :image, :visible, :polygon_id, :remote_image_url
  mount_uploader :image, ImageUploader
end
