class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :username, :email, :password, :password_confirmation, :is_admin, :movil, :municipio, :estado
  validates_uniqueness_of :email
  belongs_to :user_type
  has_many :surveys
end
