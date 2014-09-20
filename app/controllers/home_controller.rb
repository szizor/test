class HomeController < ApplicationController
  layout "application"
  def index
    @parents = ParentCategory.all
    @states = State.all
    @polygon = params[:p] ? Polygon.find(params[:p]) : Polygon.first
    @problem = Problem.new
  end

  def dynamic_polygons
    @polygons = Polygon.find_all_by_state_id(params[:id])
    respond_to do |format|
      format.js          
    end
  end

end
