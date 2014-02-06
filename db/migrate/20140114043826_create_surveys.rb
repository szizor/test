class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.integer :user_id
      t.string :conoces
      t.text    :que_conoces
      t.string :municipio
      t.string :colonia
      t.string  :calle
      t.string :genero
      t.string :edad
      t.string :solo
      t.text    :con_quien_vive
      t.string  :hijos
      t.string  :ocupacion
      t.string :estudia
      t.string :horas
      t.string  :nivel
      t.string  :grado
      t.string :dejo_estudiar
      t.string  :causa
      t.string :regresar
      t.string  :regresar_porque
      t.string :antiguedad
      t.string :se_organizan
      t.string :participa
      t.string  :quien_vigila
      t.string :conviene
      t.text  :provoca
      t.text  :soluciones
      t.string :victima
      t.string  :tipo_delito
      t.string :involucrado
      t.text    :pandillas
      t.string :consumo
      t.string  :acciones
      t.text    :actividades
      t.text  :deporte
      t.string  :tuviera
      t.text    :reunen
      t.text    :act_reunen
      t.string :jovenes_estudian
      t.string :convivencia
      t.text    :lugares
      t.string :agusto
      t.string  :agusto_porque
      t.string  :proximo
      t.text  :visualizacion
      t.text    :importante
      t.string :fumas
      t.string :edad_fumar
      t.string  :frecuencia
      t.string :drogas
      t.text  :como_dejaste
      t.string  :tipo_droga
      t.string :frec_droga
      t.string  :amigos
      t.string :familia
      t.string :relacion
      t.string :tiempo
      t.string :pareja
      t.string :rel_sex
      t.string :tiempo_relaciones
      t.string :primera_vez
      t.string :parejas_sexuales
      t.string :anticonceptivo
      t.text    :metodos
      t.text    :motivos
      t.string :grupo
      t.string  :tipo_grupo
      t.string :gustaria_participar
      t.string  :tipo_gustaria
      t.string  :porque_no
      t.string :necesario
      t.string  :acciones_comunidad



      t.timestamps
    end
  end
end
