class Document < ActiveRecord::Base
  attr_accessible :name, :visible, :polygon_id, :file
  mount_uploader :file, GenericUploader
  validates_presence_of :name, :file
end
