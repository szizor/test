class Polygon < ActiveRecord::Base
  attr_accessible :name, :coords, :population, :women_pop, :men_pop, :life_span, :ses, :scholarity, :prod_act, :econ_act, :state_id, :city_id, :neighborhood, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :promedio, :rutas
  validates_presence_of :name, :population, :city_id, :men_pop, :women_pop, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :scholarity, :prod_act, :econ_act, :rutas
  belongs_to :state
  has_many :tours
  has_many :actors
  has_many :images
  has_many :videos
  has_many :documents
  has_many :problems
  has_many :trees
end
