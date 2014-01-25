class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.integer :user_id
      t.boolean :conoces
      t.text    :que_conoces
      t.integer :municipio
      t.integer :colonia
      t.string  :calle
      t.integer :genero
      t.integer :edad
      t.boolean :solo
      t.text    :con_quien_vive
      t.string  :hijos
      t.string  :ocupacion
      t.integer :estudia
      t.integer :horas
      t.integer  :nivel
      t.string  :grado
      t.boolean :dejo_estudiar
      t.string  :causa
      t.integer :regresar
      t.string  :regresar_porque
      t.integer :antiguedad
      t.boolean :se_organizan
      t.integer :participa
      t.string  :quien_vigila
      t.integer :conviene
      t.string  :provoca
      t.string  :soluciones
      t.boolean :victima
      t.string  :tipo_delito
      t.integer :involucrado
      t.text    :pandillas
      t.integer :consumo
      t.string  :acciones
      t.text    :actividades
      t.string  :deporte
      t.string  :tuviera
      t.text    :reunen
      t.text    :act_reunen
      t.integer :jovenes_estudian
      t.boolean :convivencia
      t.text    :lugares
      t.boolean :agusto
      t.string  :agusto_porque
      t.string  :proximo
      t.string  :visualizacion
      t.text    :importante
      t.boolean :fumas
      t.integer :edad_fumar
      t.string  :frecuencia
      t.integer :drogas
      t.string  :como_dejaste
      t.string  :tipo_droga
      t.integer :frec_droga
      t.string  :amigos
      t.integer :familia
      t.boolean :relacion
      t.integer :tiempo
      t.boolean :pareja
      t.integer :rel_sex
      t.integer :tiempo_relaciones
      t.integer :primera_vez
      t.integer :parejas_sexuales
      t.integer :anticonceptivo
      t.text    :metodos
      t.text    :motivos
      t.boolean :grupo
      t.string  :tipo_grupo
      t.boolean :gustaria_participar
      t.string  :tipo_gustaria
      t.string  :porque_no
      t.boolean :necesario
      t.string  :acciones_comunidad



      t.timestamps
    end
  end
end
