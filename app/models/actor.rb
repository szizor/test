class Actor < ActiveRecord::Base
  attr_accessible :name, :phone, :website, :email, :address, :facebook, :twitter, :contact_name, :contact_email, :contact_phone, :contact_title, :actor_type_id, :polygon_id, :state_id, :city, :user_id
  has_and_belongs_to_many :alternatives
end
