class Polygon < ActiveRecord::Base
  attr_accessible :name, :coords, :population, :women_pop, :men_pop, :life_span, :ses, :scholarity, :prod_act, :econ_act, :state_id, :city_id, :neighborhood
  belongs_to :state
  has_many :tours
end
