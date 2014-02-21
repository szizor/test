class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.integer :user_id
      t.datetime :start_time
      t.string :city
      t.decimal :latitude, {:precision=>10, :scale=>6}
      t.decimal :longitude, {:precision=>10, :scale=>6}
      t.string :email
      t.string :conoces
      t.text   :que_conoces
      t.string :municipio
      t.string :colonia
      t.string :genero
      t.string :edad
      t.text   :con_quien_vive
      t.string :hijos
      t.string :ocupacion
      t.string :ocupacion_otro
      t.string :estudia
      t.string :nivel
      t.string :dejo_estudiar
      t.string :causa
      t.string :causa_otro
      t.string :regresar
      t.string :antiguedad
      t.string :se_organizan
      t.string :participa
      t.text   :quien_vigila
      t.text   :provoca
      t.text   :soluciones
      t.string :victima
      t.string :tipo_delito
      t.string :otro_tipo_delito
      t.text   :pandillas
      t.string :consumo
      t.string :tipo_droga
      t.string :tipo_droga_otro
      t.text   :actividades
      t.string :actividades_otro
      t.text   :deporte
      t.text   :act_reunen
      t.string :act_reunen_otro
      t.string :convivencia
      t.text   :lugares
      t.string :lugares_otro
      t.string :proximo
      t.string :proximo_otro
      t.text   :importante
      t.string :importante_otro
      t.string :fumas
      t.string :edad_fumar
      t.string :frecuencia
      t.string :frecuencia_otro
      t.string :drogas
      t.text   :como_dejaste
      t.string :familia
      t.string :primera_vez
      t.string :parejas_sexuales
      t.string :parejas_sexuales_otro
      t.string :anticonceptivo
      t.text   :motivos
      t.string :motivos_otro
      t.string :grupo
      t.text   :tipo_grupo
      t.string :tipo_grupo_otro
      t.text   :gustaria_participar
      t.string :gustaria_participar_otro
      t.string :necesario
      t.string :acciones_comunidad

      t.timestamps
    end
  end
end
