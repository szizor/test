#encoding: utf-8
user = User.create(username: 'Admin', email: 'test@imjuve.com', password: '12345678', password_confirmation: '12345678', is_admin: true)
UserType.create(name: 'Admin')
UserType.create(name: 'Capacitador')
UserType.create(name: 'Encuestador')
UserType.create(name: 'Usuario')
servicios = ParentCategory.create(:name => "Servicios Públicos")
familias = ParentCategory.create(:name => "Familias")
otros = ParentCategory.create(:name => "Otros")
demo = Category.create(:name => "Agua potable y saneamiento", :parent_category_id => servicios.id)
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


3.times{Polygon.create!({name: "test1", coords: "[{\"k\":20.691031414379818,\"A\":-103.3650958538783},{\"...", population: 12000, women_pop: 7000, men_pop: 5000, life_span: 60, ses: "Medio", scholarity: "secundaria", prod_act: "Productivas", econ_act: "economicas", state_id: nil, city_id: nil, neighborhood: nil, promedio: 35, cero_doce: 1200, doce_catorce: 1200, quince_diecinueve: 1500, veinte_veinticuatro: 2000, veinticinco_veintinueve: 2500, treinta_cincuentainueve: 3000, sesenta: 6000, rutas: "centro a periferico", colors: "#e9571e"})}
3.times{Problem.create!({name: "problema 1", state_id: nil, city_id: nil, neighborhood_id: nil, polygon_id: nil, description: "Descripcion Problema 1", cause: "Esta causa", effects: "Este efecto", costs: 120000, frecuency: "Estacional (todo el año)", affects_to: 0, houses: 300, affected_population: 456, category_id: 2, user_id: nil, public: nil, votes_count: nil, cero_doce: 0, doce_catorce: 0, quince_diecinueve: 0, veinte_veinticuatro: 0, veinticinco_veintinueve: 0, treinta_cincuentainueve: 0, sesenta: 0, coords: "[{\"k\":20.690860788358275,\"A\":-103.36533188827161},{...", colors: "#FF1493"})}
3.times{Alternative.create!({name: "test", category_id: demo.id, description: "test desc", user_id: user.id})}

