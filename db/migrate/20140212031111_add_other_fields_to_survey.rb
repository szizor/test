class AddOtherFieldsToSurvey < ActiveRecord::Migration
  def change
  	add_column :surveys, :ocupacion_otro, :string, :after => :ocupacion
  	add_column :surveys, :causa_otro, :string, :after => :causa
  	add_column :surveys, :otro_tipo_delito, :string, :after => :tipo_delito
  	add_column :surveys, :actividades_otro, :string, :after => :actividades
  	add_column :surveys, :act_reunen_otro, :string, :after => :act_reunen
  	add_column :surveys, :lugares_otro, :string, :after => :lugares
  	add_column :surveys, :proximo_otro, :string, :after => :proximo
  	add_column :surveys, :importante_otro, :string, :after => :importante
  	add_column :surveys, :frecuencia_otro, :string, :after => :frecuencia
  	add_column :surveys, :tipo_droga_otro, :string, :after => :tipo_droga
  	add_column :surveys, :amigos_otro, :string, :after => :amigos
  	add_column :surveys, :parejas_sexuales_otro, :string, :after => :parejas_sexuales
  	add_column :surveys, :metodos_otro, :string, :after => :metodos
  	add_column :surveys, :motivos_otro, :string, :after => :motivos
  end
end
