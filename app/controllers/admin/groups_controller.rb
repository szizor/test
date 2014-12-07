class Admin::GroupsController < Admin::BaseController
  def index
    @groups = Group.all
  end

  def show
    @group = Group.find(params[:id])
  end

  def new
    @polygon = Polygon.find(params[:polygon_id])
    @group = Group.new
  end

  def create
    @polygon = Polygon.find(params[:polygon_id])
    @group = Group.new(params[:group])
    if @group.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Grupo creado satisfactoriamente.' }
        format.json { render json: @group, status: :created, location: @group }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @polygon = Polygon.find(params[:polygon_id])
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    @polygon = Polygon.find(params[:group][:polygon_id])
    if @group.update_attributes(params[:group])
      respond_to do |format|
        format.html { redirect_to edit_admin_polygon_path(@polygon), notice: 'El Grupo fue editado.' }
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_admin_polygon_path(@polygon), notice: @group.errors.full_messages }
      end
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    redirect_to :back, :notice => "Grupo eliminado exitosamente."
  end
end
