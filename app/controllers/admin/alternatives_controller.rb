class Admin::AlternativesController < Admin::BaseController
  def index
    @alternatives = Alternative.all
  end

  def show
    @alternative = Alternative.find(params[:id])
  end

  def new
    @polygon = Polygon.find(params[:polygon_id])
    @problem = Problem.find(params[:problem_id])
    @alternative = Alternative.new
  end

  def create
    debugger
    @alternative = Alternative.new(params[:alternative])
    if @alternative.save
      polygon = Polygon.find(params[:polygon_id])
      redirect_to edit_admin_polygon_path(polygon), :notice => "Successfully created alternative."
    else
      render :action => 'new'
    end
  end

  def edit
    @alternative = Alternative.find(params[:id])
  end

  def update
    @alternative = Alternative.find(params[:id])
    if @alternative.update_attributes(params[:alternative])
      if params[:actors]
      end
      redirect_to [:admin, @alternative], :notice  => "Successfully updated alternative."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @alternative = Alternative.find(params[:id])
    @alternative.destroy
    redirect_to admin_alternatives_url, :notice => "Successfully destroyed alternative."
  end
end
