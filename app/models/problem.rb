# encoding: utf-8
class Problem < ActiveRecord::Base
  attr_accessible :name, :state_id, :fecha, :hora, :arbol,  :city_id, :neighborhood_id, :polygon_id, :description, :cause, :effects, :costs, :frecuency, :affects_to, :houses, :affected_population, :category_id, :user_id, :public, :votes_count, :coords, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :image
  validates_presence_of :name, :description, :coords#, :cause, :effects, :costs, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :houses, :affected_population
  belongs_to :category
  has_many :alternatives
  belongs_to :polygon
  serialize :coords
  mount_uploader :image, ImageUploader
  mount_uploader :arbol, ImageUploader

  def matority
  	ary = [self.cero_doce, self.doce_catorce, self.quince_diecinueve, self.veinte_veinticuatro, self.veinticinco_veintinueve,self.treinta_cincuentainueve,self.sesenta]
  	max = ary.index(ary.compact.max)
  	case max
	  	when 0
	  		"Mayormente niños de 0 a 12 años"
	  	when 1
	  		"Mayormente jóvenes de 12 a 14 años"
	  	when 2
	  		"Mayormente jóvenes de 15 a 19 años"
	  	when 3
	  		"Mayormente jóvenes de 20 a 24 años"
	  	when 4
	  		"Mayormente jóvenes de 25 a 29 años"
	  	when 5
	  		"Mayormente adultos de 30 a 59 años"
	  	when 6
	  		"Mayormente adultos de 60 años"	
	  	else
	  		"N/D"
    end		
  end
end
