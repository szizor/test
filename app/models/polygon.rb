class Polygon < ActiveRecord::Base
  attr_accessible :name, :coords, :population, :women_pop, :men_pop, :life_span, :ses, :scholarity, :prod_act, :econ_act, :state_id, :city_id, :neighborhood, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :promedio, :rutas
  belongs_to :state
  has_many :tours
  has_many :actors
  has_many :images
  has_many :videos
  has_many :documents
end
