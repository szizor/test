#!/bin/env ruby
# encoding: utf-8
class Survey < ActiveRecord::Base
  attr_accessible :user_id, :conoces, :que_conoces, :email, :como_dejaste, :municipio, :colonia, :calle, :genero, :edad, :solo, :con_quien_vive, :hijos, :ocupacion, :estudia, :horas, :nivel, :grado, :dejo_estudiar, :causa, :regresar, :regresar_porque, :antiguedad, :se_organizan, :participa, :quien_vigila, :conviene, :provoca, :soluciones, :victima, :tipo_delito, :involucrado, :pandillas, :consumo, :acciones, :actividades, :deporte, :tuviera, :reunen, :act_reunen, :jovenes_estudian, :convivencia, :lugares, :agusto, :agusto_porque, :proximo, :visualizacion, :importante, :fumas, :edad_fumar, :frecuencia, :drogas, :como_dejaste, :tipo_droga, :frec_droga, :amigos, :familia, :relacion, :tiempo, :pareja, :rel_sex, :tiempo_relaciones, :primera_vez, :parejas_sexuales, :anticonceptivo, :metodos, :motivos, :grupo, :tipo_grupo, :gustaria_participar, :tipo_gustaria, :porque_no, :necesario, :acciones_comunidad, :ocupacion_otro, :causa_otro, :otro_tipo_delito, :actividades_otro, :act_reunen_otro, :lugares_otro, :proximo_otro, :importante_otro, :frecuencia_otro, :tipo_droga_otro, :amigos_otro, :parejas_sexuales_otro, :metodos_otro, :motivos_otro, :city, :latitude, :longitude, :start_time, :tipo_grupo_otro, :gustaria_participar_otro, :polygon_id
  belongs_to :user
  belongs_to :polygon
  serialize :con_quien_vive
  serialize :quien_vigila
  serialize :tipo_delito
  serialize :pandillas
  serialize :tipo_droga
  serialize :actividades
  serialize :act_reunen
  serialize :lugares
  serialize :proximo
  serialize :importante
  serialize :motivos
  serialize :tipo_grupo
  serialize :gustaria_participar

  def self.to_csv
    names = ["Numero","User Id","Hora de Inicio","Ciudad","Latitud","Longitud","Email","¿Conoces al Instituto Mexicano de la Juventud (IMJUVE)?", "¿Qué conoces de él?", "Municipio", "Colonia", "Género del encuestado", "¿Cuál es su edad?", "¿Con quien vive?", "¿Cuántos hij@s tiene?", "Actualmente, ¿a qué dedica la mayoría de su tiempo?", "Otro", "¿Qué está estudiando?", "¿Cuál es su nivel de estudios máximo terminado?", "¿Tuvo que dejar de estudiar?", "¿Cuál fue la causa?", "Otro", "¿Le gustaría regresar a estudiar?", "¿Cuántos años tienes viviendo en la colonia?", "¿Los vecinos de su cuadra se organizan para realizar algunas actividades?", "¿Usted o algún miembro del hogar participa(n) en algún grupo organizado u organización de vecinos para realizar actividades en favor de la colonia?", "¿Quién o quienes vigilan en tu/su colonia?", "¿A qué cree que se deba la inseguridad en esta colonia?", "Menciona dos propuestas para combatir la inseguridad en esta colonia.", "¿Ha sido víctima de inseguridad dentro de esta colonia?", "¿De qué tipo de delito ha/has sido víctima?", "Otro", "¿Cuáles son las características de Las bandas o pandillas de esta colonia?", "Sobre el consumo de alcohol y drogas en las calles de esta colonia", "¿Qué tipo de drogas se consumen principalmente en la colonia?", "Otro", "¿Qué actividades realiza generalmente en su tiempo libre?","Otro", "¿Qué deporte?", "¿Qué actividades realizan principalmente los jóvenes cuando se reúnen?","Otro", "¿En la colonia hay lugares que promueven la convivencia entre jóvenes?", "¿Qué tipo de lugares?","Otro", "¿Cuáles son tus planes para tu vida en los próximo dos años?","Otro", "Lo más importante en este momento de mi vida es...","Otro", "¿Fumas cigarros?", "¿A qué edad comenzaste a fumar?", "¿Con qué frecuencia consumes alcohol?","Otro", "¿Actualmente consumes drogas?", "¿Cómo las dejaste?", "Considero que en mi familia...", "¿A qué edad tuviste relaciones sexuales por primera vez?", "¿Tus parejas sexuales en este último año han sido…?","Otro", "En tus relaciones sexuales  ¿usas o has usado un método anticonceptivo?", "¿Cuáles fueron los motivos para no usar algún método anticonceptivo?","Otro", "¿Existen grupos que realicen actividades dedicadas a los jóvenes en tu colonia?", "¿Qué tipo de actividades realizan estos grupos?","Otro", "¿En qué tipo de actividades para jóvenes te gustaría participar ?","Otro", "¿Consideras que tu colonia tiene lo necesario para que como joven puedas realizar actividades deportivas y recreativas?", "¿Qué acciones crees pueden realizar ustedes los jóvenes para apoyar a su comunidad?","Creado","Actualizado"]
    CSV.generate do |csv|
      csv << names
      all.each do |survey|
        csv << survey.attributes.values_at(*column_names)
      end
    end
  end

end
