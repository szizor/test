class Admin::ToursController < Admin::BaseController
  def index
    @tours = Tour.all
  end

  def show
    @tour = Tour.find(params[:id])
  end

  def new
    @tour = Tour.new
  end

  def create
    @tour = Tour.new(params[:tour])
    if @tour.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Recorrido creado satisfactoriamente.' }
        format.json { render json: @tour, status: :created, location: @tour }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @tour = Tour.find(params[:id])
  end

  def update
    @tour = Tour.find(params[:id])
    if @tour.update_attributes(params[:tour])
      respond_to do |format|
        polygon = Polygon.find(params[:tour][:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'El recorrido fue editado.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @tour = Tour.find(params[:id])
    @tour.destroy
    redirect_to admin_tours_url, :notice => "Successfully destroyed tour."
  end
end
