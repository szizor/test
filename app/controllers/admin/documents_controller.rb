class Admin::DocumentsController < Admin::BaseController
  def index
    @polygon = Polygon.find(params[:polygon_id])
  end

  def show
    @document = Document.find(params[:id])
  end

  def new
    @document = Document.new(:polygon_id => params[:polygon_id])
  end

  def create
    @document = Document.new(params[:document])
    if @document.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Documento creado con exito.' }
        format.json { render json: @image, status: :created, location: @image }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @document = Document.find(params[:id])
  end

  def update
    @document = Document.find(params[:id])
    if @document.update_attributes(params[:document])
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to admin_polygon_documents_path(polygon), notice: 'Documento editado con exito.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @document = Document.find(params[:id])
    @document.destroy
    redirect_to :back, :notice => "documento destruido."
  end
end
