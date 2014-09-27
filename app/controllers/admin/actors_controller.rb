class Admin::ActorsController < Admin::BaseController
  def index
    @actors = Actor.all
  end

  def show
    @actor = Actor.find(params[:id])
  end

  def new
    @actor = Actor.new
  end

  def create
    @actor = Actor.new(params[:actor])
    if @actor.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Actor creado satisfactoriamente.' }
        format.json { render json: @actor, status: :created, location: @actor }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @actor = Actor.find(params[:id])
  end

  def update
    @actor = Actor.find(params[:id])
    if @actor.update_attributes(params[:actor])
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'El Actor fue editado.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @actor = Actor.find(params[:id])
    @actor.destroy
    redirect_to :back, :notice => "Actor eliminado exitosamente."
  end
end
