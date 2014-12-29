class Actor < ActiveRecord::Base
  attr_accessible :name, :phone, :description, :website, :email, :address, :facebook, :twitter, :contact_name, :contact_email, :contact_phone, :contact_title, :actor_type_id, :polygon_id, :state_id, :city, :user_id, :coords
  belongs_to :state
  belongs_to :actor_type
  validates_presence_of :name, :address, :city, :phone, :email, :coords
end
