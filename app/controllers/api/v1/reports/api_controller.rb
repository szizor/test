class Api::V1::Reports::ApiController < ActionController::Base
  def get_polygon
    polygon_id = params[:id]
    debugger
    puts polygon_id
  end
end