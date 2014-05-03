class Api::V1::SurveysReportController < ActionController::Base
  def get_polygon
    @polygonId = params[:id]
    debugger
    puts @polygonId
  end
end