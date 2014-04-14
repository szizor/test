class Admin::VideosController < Admin::BaseController
  def index  
    @videos = Video.all
  end

  def show
    @video = Video.find(params[:id])
  end

  def new
    @video = Video.new(:polygon_id => params[:polygon_id])
  end

  def create
    @video = Video.new(params[:video])
    if @video.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Video was successfully created.' }
        format.json { render json: @image, status: :created, location: @image }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @video = Video.find(params[:id])
  end

  def update
    @video = Video.find(params[:id])
    if @video.update_attributes(params[:video])
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to admin_polygon_videos_path(polygon), notice: 'Video was successfully updated.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    redirect_to :back, :notice => "Successfully destroyed video."
  end
end
