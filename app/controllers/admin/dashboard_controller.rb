class Admin::DashboardController < Admin::BaseController

  def index
    @surveys = Survey.all
    @polygons = Polygon.all
  end
end
