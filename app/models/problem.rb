class Problem < ActiveRecord::Base
  attr_accessible :name, :state_id, :city_id, :neighborhood_id, :polygon_id, :description, :cause, :effects, :costs, :frecuency, :affects_to, :houses, :affected_population, :category_id, :user_id, :public, :votes_count, :coords, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta
  belongs_to :category
  belongs_to :polygon
end
