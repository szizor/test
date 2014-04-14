class Actor < ActiveRecord::Base
  attr_accessible :name, :phone, :website, :email, :address, :facebook, :twitter, :contact_name, :contact_email, :contact_phone, :contact_title, :actor_type_id, :polygon_id, :state_id, :city, :user_id
  has_many :alternatives, :through => :actors_alternatives
  has_many :actors_alternatives
  belongs_to :state
end
