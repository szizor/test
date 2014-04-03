class Problem < ActiveRecord::Base
  attr_accessible :name, :state_id, :city_id, :neighborhood_id, :polygon_id, :description, :cause, :effects, :costs, :frecuency, :affects_to, :houses, :affected_population, :category_id, :user_id, :public, :votes_count
  belongs_to :category
end
