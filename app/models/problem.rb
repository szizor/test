class Problem < ActiveRecord::Base
  attr_accessible :name, :state_id, :city_id, :neighborhood_id, :polygon_id, :description, :cause, :effects, :costs, :frecuency, :affects_to, :houses, :affected_population, :category_id, :user_id, :public, :votes_count, :coords, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta
  validates_presence_of :name, :description, :cause, :effects, :costs, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :houses, :affected_population
  belongs_to :category
  has_many :alternatives
  belongs_to :polygon
  serialize :coords
end
