class Group < ActiveRecord::Base
  attr_accessible :name, :phone, :cell_phone, :gender, :email, :age, :profesion, :tipo, :polygon_id
  validates_presence_of :name, :phone, :email
end
