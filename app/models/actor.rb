class Actor < ActiveRecord::Base
  attr_accessible :name, :phone, :website, :email, :address, :facebook, :twitter, :contact_name, :contact_email, :contact_phone, :contact_title, :actor_type_id, :polygon_id, :state_id, :city, :user_id, :coords
  belongs_to :state
  validates_presence_of :name, :address, :city, :phone, :email, :coords
end
