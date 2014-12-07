class Polygon < ActiveRecord::Base
  attr_accessible :name, :coords, :population, :women_pop, :men_pop, :life_span, :ses, :scholarity, :prod_act, :econ_act, :state_id, :city_id, :neighborhood, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :promedio, :rutas
  validates_presence_of :name, :population, :city_id, :men_pop, :women_pop, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :scholarity, :prod_act, :econ_act, :rutas
  belongs_to :state
  has_many :tours
  has_many :events
  has_many :actors
  has_many :groups
  has_many :images
  has_many :videos
  has_many :documents
  has_many :problems
  has_many :trees
  serialize :coords

  def population
    total = women_pop + men_pop
    total
  end

  def women_perc
    (women_pop.to_f * 100 / population).round
  end

  def men_perc
    (men_pop.to_f * 100 / population).round
  end

  def rangos_low
    ((doce_catorce+ quince_diecinueve + veinte_veinticuatro + veinticinco_veintinueve).to_f * 100  / population).round
  end

  def rangos_high
    ((treinta_cincuentainueve + sesenta).to_f * 100  / population).round
  end

end
