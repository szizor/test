class Admin::ImagesController < Admin::BaseController

  def index
    @polygon = Polygon.find(params[:polygon_id])
  end

  def show
    @image = Image.find(params[:id])
  end

  def new
    @image = Image.new(:polygon_id => params[:polygon_id])
  end

  def create
    @image = Image.new(params[:image])
    if @image.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to admin_polygon_images_path(polygon), notice: 'Image was successfully created.' }
        format.json { render json: @image, status: :created, location: @image }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @image = Image.find(params[:id])
  end

  def update
    @image = Image.find(params[:id])
    if @image.update_attributes(params[:image])
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to admin_polygon_images_path(polygon), notice: 'Image was successfully updated.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    redirect_to :back, :notice => "Successfully destroyed image."
  end
end
