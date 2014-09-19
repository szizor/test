class Admin::ProblemsController < Admin::BaseController
  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
  end

  def new
    @polygon = Polygon.find(params[:polygon_id])
    @problem = Problem.new
  end

  def create
    @problem = Problem.new(params[:problem])
    if @problem.save
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'Problema creado satisfactoriamente.' }
        format.json { render json: @problem, status: :created, location: @problem }
      end
    else
      render :action => 'new'
    end
  end

  def edit
    @polygon = Polygon.find(params[:polygon_id])
    @problem = Problem.find(params[:id])
    @alternatives = Alternative.all
  end

  def update
    @problem = Problem.find(params[:id])
    if @problem.update_attributes(params[:problem])
      respond_to do |format|
        polygon = Polygon.find(params[:polygon_id])
        format.html { redirect_to edit_admin_polygon_path(polygon), notice: 'El problema fue editado.' }
      end
    else
      render :action => 'edit'
    end
  end

  def destroy
    @problem = Problem.find(params[:id])
    @problem.destroy
    redirect_to admin_problems_url, :notice => "Successfully destroyed problem."
  end
end
