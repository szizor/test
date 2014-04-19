class Admin::TreesController < Admin::BaseController
  def index
    @polygon = Polygon.find(params[:polygon_id])
  end

  def show
    @tree = Tree.find(params[:id])
  end

  def new
    @tree = Tree.new(:polygon_id => params[:polygon_id])
  end

  def create
    @tree = Tree.new(params[:tree])
    if @tree.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Arbol creado con exito' }
        format.json { render json: @image, status: :created, location: @image }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @tree = Tree.find(params[:id])
  end

  def update
    @tree = Tree.find(params[:id])
    if @tree.update_attributes(params[:tree])
      redirect_to @tree, :notice  => "Successfully updated tree."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @tree = Tree.find(params[:id])
    @tree.destroy
    redirect_to trees_url, :notice => "Successfully destroyed tree."
  end
end
