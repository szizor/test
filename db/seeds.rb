#encoding: utf-8
if User.count == 0
  user = User.create(username: 'Admin', email: 'test@imjuve.com', password: '12345678', password_confirmation: '12345678', is_admin: true)
  user = User.create(username: 'capacitador', email: 'test+capacitador@imjuve.com', password: '12345678', password_confirmation: '12345678', movil: "3314351686", municipio: "Guadalajara", estado: "Jalisco", user_type_id: 2)
  user = User.create(username: 'encuestador', email: 'test+encuestador@imjuve.com', password: '12345678', password_confirmation: '12345678', movil: "3314351686", municipio: "Guadalajara", estado: "Jalisco", user_type_id: 3)
  user = User.create(username: 'juanperez', email: 'test+usuario@imjuve.com', password: '12345678', password_confirmation: '12345678', movil: "3314351686", municipio: "Guadalajara", estado: "Jalisco", user_type_id: 4)
  user = User.create(username: 'Soriana', email: 'test+soriana@imjuve.com', password: '12345678', password_confirmation: '12345678', movil: "3314351686", municipio: "Guadalajara", estado: "Jalisco", user_type_id: 4)
end

if UserType.count == 0
  UserType.create(name: 'Admin')
  UserType.create(name: 'Capacitador')
  UserType.create(name: 'Encuestador')
  UserType.create(name: 'Usuario')
end

if ParentCategory.count == 0
  servicios = ParentCategory.create(:name => "Servicios Públicos")
  familias = ParentCategory.create(:name => "Familias")
  otros = ParentCategory.create(:name => "Otros")
  demo = Category.create(:name => "Agua potable y saneamiento", :parent_category_id => servicios.id)
end
if Category.count == 0
  Category.create(:name => "Alcantarillado", :parent_category_id => servicios.id)
  Category.create(:name => "Residuos Sólidos", :parent_category_id => servicios.id)
  Category.create(:name => "Calles, vialidades y accesos", :parent_category_id => servicios.id)
  Category.create(:name => "Alumbrado público", :parent_category_id => servicios.id)
  Category.create(:name => "Energía eléctrica", :parent_category_id => servicios.id)
  Category.create(:name => "Espacios públicos, parques y jardines (infraestructura)", :parent_category_id => servicios.id)
  Category.create(:name => "Seguridad Pública y tránsito", :parent_category_id => servicios.id)
  Category.create(:name => "Asistencia médica", :parent_category_id => servicios.id)
  Category.create(:name => "Infraestructura educativa", :parent_category_id => servicios.id)
  Category.create(:name => "Rezago educativo", :parent_category_id => servicios.id)
  Category.create(:name => "Integración familiar", :parent_category_id => familias.id)
  Category.create(:name => "Violencia intrafamiliar", :parent_category_id => familias.id)
  Category.create(:name => "Planificación familiar", :parent_category_id => familias.id)
  Category.create(:name => "Equidad de género", :parent_category_id => familias.id)
  Category.create(:name => "Empleo y planeación socioeconómica", :parent_category_id => otros.id)
  Category.create(:name => "Vivienda", :parent_category_id => otros.id)
  Category.create(:name => "Salud, higiene, prevención y combate a las adicciones", :parent_category_id => otros.id)
  Category.create(:name => "Medio ambiente", :parent_category_id => otros.id)
  Category.create(:name => "Alimentación y nutrición", :parent_category_id => otros.id)
  Category.create(:name => "Participación ciudadana y vecinal", :parent_category_id => otros.id)
  Category.create(:name => "Deporte y atención a la juventud con programas sociales, culturales y recreativos", :parent_category_id => otros.id)
  Category.create(:name => "Transferencia o desarrollo de tecnología", :parent_category_id => otros.id)
end

if Polygon.count == 0
  3.times{Polygon.create!({name: "test1", coords: '[{"k":20.67751888431853,"A":-103.28543186187744},{"k":20.674708298693588,"A":-103.29002380371094},{"k":20.670733238771756,"A":-103.29156875610352},{"k":20.66748083962362,"A":-103.28972339630127},{"k":20.66715961123732,"A":-103.28204154968262},{"k":20.669006665180913,"A":-103.27517509460449},{"k":20.675190117067377,"A":-103.27650547027588}]', population: 12000, women_pop: 7000, men_pop: 5000, life_span: 60, ses: "Medio", scholarity: "secundaria", prod_act: "Productivas", econ_act: "economicas", state_id: nil, city_id: nil, neighborhood: nil, promedio: 35, cero_doce: 1200, doce_catorce: 1200, quince_diecinueve: 1500, veinte_veinticuatro: 2000, veinticinco_veintinueve: 2500, treinta_cincuentainueve: 3000, sesenta: 6000, rutas: "centro a periferico", colors: "#e9571e"})}
end
if Problem.count == 0
  3.times{Problem.create!({name: "problema 1", state_id: nil, city_id: nil, neighborhood_id: nil, polygon_id: nil, description: "Descripcion Problema 1", cause: "Esta causa", effects: "Este efecto", costs: 120000, frecuency: "Estacional (todo el año)", affects_to: 0, houses: 300, affected_population: 456, category_id: 2, user_id: nil, public: nil, votes_count: nil, cero_doce: 0, doce_catorce: 0, quince_diecinueve: 0, veinte_veinticuatro: 0, veinticinco_veintinueve: 0, treinta_cincuentainueve: 0, sesenta: 0, coords: '{"k":20.689824621443048,"A":-103.36192846298218}', colors: "#FF1493"})}
end
if Alternative.count == 0
  3.times{Alternative.create!({name: "test", category_id: demo.id, description: "test desc", user_id: user.id})}
end