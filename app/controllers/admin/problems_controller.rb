class Admin::ProblemsController < Admin::BaseController
  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
  end

  def new
    @problem = Problem.new
  end

  def create
    @problem = Problem.new(params[:problem])
    if @problem.save
      redirect_to [:admin, @problem], :notice => "Successfully created problem."
    else
      render :action => 'new'
    end
  end

  def edit
    @problem = Problem.find(params[:id])
    @alternatives = Alternative.all
  end

  def update
    @problem = Problem.find(params[:id])
    if @problem.update_attributes(params[:problem])
      redirect_to [:admin, @problem], :notice  => "Successfully updated problem."
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
