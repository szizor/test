class Api::V1::Reports::ApiController < ActionController::Base
  def get_survey
    @survey
    polygon_id = params[:id]

    if polygon_id == 'todos'
      @survey = Survey.all
    else
      @survey = Survey.where(:polygon_id => polygon_id)
    end

    render(:json => {:survey => @survey})

  end

  def get_polygon
    catorce = Polygon.created_in(2014).map do |polygon|
      { :id               => polygon.id, 
        :contemplado      => polygon.get_presupuesto, 
        :gestionado       => polygon.get_gestionado,
        :actores          => polygon.get_actores,
        :poblacion        => polygon.population,
        :beneficiada      => polygon.get_beneficiarios,
        :soluciones       => polygon.get_soluciones,
        :usuarios         => polygon.get_publics,
        :alternatives     => polygon.alterna,
        :eventos          => polygon.events.count
      }
    end
    quince = Polygon.created_in(2015).map do |polygon|
      { :id => polygon.id, 
        :contemplado      => polygon.get_presupuesto, 
        :gestionado       => polygon.get_gestionado,
        :actores          => polygon.get_actores,
        :poblacion        => polygon.population,
        :beneficiada      => polygon.get_beneficiarios,
        :soluciones       => polygon.get_soluciones,
        :usuarios         => polygon.get_publics,
        :alternatives     => polygon.alterna,
        :eventos          => polygon.events.count
      }
    end
    actores = Actor.all.map do |actor|
      {:tipo => actor.actor_type.name}
    end
    proyectos_planeados = Polygon.created_in(Time.now.year).map do |polygon|
      {:label => polygon.name, :value => polygon.total_problems}
    end
    proyectos_ejecucion = Polygon.created_in(Time.now.year).map do |polygon|
      {:label => polygon.name, :value => polygon.ejecucion_problems}
    end
    proyectos_finalizados = Polygon.created_in(Time.now.year).map do |polygon|
      {:label => polygon.name, :value => polygon.finalizados_problems}
    end
    categorias = ParentCategory.all.map do |category|
      {:label => category.name, :value => category.total_problems}
    end
    subcategorias = Category.all.map do |category|
      {:label => category.name, :value => category.total_problems}
    end
    data = {}
    data["2014"] = catorce
    data["2015"] = quince
    data["actores"] = actores
    data["categorias"] = categorias
    data["subcategorias"] = subcategorias
    data["problemas_planeados"] = proyectos_planeados
    data["problemas_ejecucion"] = proyectos_ejecucion
    data["problemas_finalizados"] = proyectos_finalizados
    render :json => data.to_json
  end 

  def get_single_polygon
    polygon = Polygon.find(params[:id])
    catorce = 
      { :id               => polygon.id, 
        :eficacia         => polygon.get_eficacia(2014),
        :gestion          => polygon.get_gestion(2014),
        :poblacion        => polygon.get_beneficiados(2014),
        :distribucion     => polygon.get_distribucion(2014),
        :actores          => polygon.get_single_actores(2014),
        :problemas        => polygon.get_problems(2014),
        :eventos          => polygon.get_events(2014),
        :admin            => polygon.get_admin(2014),
        :convoca          => polygon.get_convocados(2014),
        :projects         => polygon.get_projects(2014),
        :planeados        => polygon.get_planeados(2014),
        :execution        => polygon.get_execution(2014),
        :finalized        => polygon.get_finalized(2014),
        :finalizacion     => polygon.get_finalizacion(2014)
      }
    quince =
      { :id               => polygon.id, 
        :eficacia         => polygon.get_eficacia(2015),
        :gestion          => polygon.get_gestion(2015),
        :poblacion        => polygon.get_beneficiados(2015),
        :distribucion     => polygon.get_distribucion(2015),
        :actores          => polygon.get_single_actores(2015),
        :problemas        => polygon.get_problems(2015),
        :eventos          => polygon.get_events(2015),
        :admin            => polygon.get_admin(2015),
        :convoca          => polygon.get_convocados(2015),
        :projects         => polygon.get_projects(2015),
        :planeados        => polygon.get_planeados(2015),
        :execution        => polygon.get_execution(2015),
        :finalized        => polygon.get_finalized(2015),
        :finalizacion     => polygon.get_finalizacion(2015)
      }
    subcat_actor = ActorType.all.map do |actor|
      {:label => actor.name, :value => actor.actors.count}
    end
    categorias = ParentCategory.all.map do |category|
      {:label => category.name, :value => category.total_single_problems(polygon)}
    end
    subcategorias = Category.all.map do |category|
      {:label => category.name, :value => category.total_single_problems(polygon)}
    end
    events =[ 
      {:label => "Deportiva", :value => polygon.events.where(:tipo => "deportiva").count },
      {:label => "Artistica", :value => polygon.events.where(:tipo => "artistica").count },
      {:label => "Religiosa", :value => polygon.events.where(:tipo => "religiosa").count },
      {:label => "Ambiental", :value => polygon.events.where(:tipo => "ambiental").count },
      {:label => "Otro",      :value => polygon.events.where(:tipo => "otro").count }
    ]  
    data = {}
    data["2014"] = catorce
    data["2015"] = quince
    data["distribucion"] = subcat_actor
    data["categorias"] = categorias
    data["subcategorias"] = subcategorias
    data["events"] = events
    
    render :json => data.to_json
  end 
end