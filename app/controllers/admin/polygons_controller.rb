class Admin::PolygonsController < Admin::BaseController
  def index
    @polygons = Polygon.all
  end

  def show
    @polygon = Polygon.find(params[:id])
  end

  def new
    @polygon = Polygon.new
  end

  def create
    @polygon = Polygon.new(params[:polygon])
    if @polygon.save
      redirect_to admin_polygons_url, :notice => "Successfully created polygon."
    else
      render :action => 'new'
    end
  end

  def edit
    @polygon = Polygon.find(params[:id])
  end

  def update
    @polygon = Polygon.find(params[:id])
    if @polygon.update_attributes(params[:polygon])
      redirect_to admin_polygons_url, :notice  => "Successfully updated polygon."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @polygon = Polygon.find(params[:id])
    @polygon.destroy
    redirect_to admin_polygons_url, :notice => "Successfully destroyed polygon."
  end
end
