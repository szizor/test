class HomeController < ApplicationController
  layout "application"
  def index
    @message = Message.new
    @parents = ParentCategory.all
    @states = State.all
    @polygon = params[:p] ? Polygon.find(params[:p]) : Polygon.first
    @polygons = Polygon.find_all_by_state_id(@polygon.state_id)
    @problem = Problem.new
    @events =
      Event.order('start_date DESC').all.map do |u|
        # if !u.user.nil? && !u.listing.name.nil?
          {
              "id"          => u.id,
              "title"       => u.name,
              "start"       => u.start_date,
              "end"         => u.end_date,
              # "listing"     => u.listing.name,
              # "url"         => u.listing.slug+'?event='+u.id.to_s,
              "description"  => u.description
          }
        # end
      end
  end

  def dynamic_polygons
    @polygons = Polygon.find_all_by_state_id(params[:id])
    respond_to do |format|
      format.js
    end
  end

  def save_problem
    @problem = Problem.new(params[:problem])
    if @problem.save
      respond_to do |format|
        format.html { redirect_to root_path(p: params[:problem][:polygon_id]), notice: 'Problema creado satisfactoriamente.' }
        format.json { render json: @problem, status: :created, location: @problem }
      end
    else
      render :action => 'new'
    end
  end

  def create_alternative
    debugger
    @alternative = Alternative.new(params[:alternative])
    if @alternative.save
      respond_to do |format|
        format.html { redirect_to root_path(p: params[:alternative][:polygon_id]), notice: 'Solucion creada satisfactoriamente.' }
        format.json { render json: @alternative, status: :created, location: @alternative }
      end
    else
      render :action => 'new'
    end
  end

end
