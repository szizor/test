class HomeController < ApplicationController
  layout "application"
  def index
    @parents = ParentCategory.all
    @states = State.all
    @polygon = params[:p] ? Polygon.find(params[:p]) : Polygon.first
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

end
