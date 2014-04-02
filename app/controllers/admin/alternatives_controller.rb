class Admin::AlternativesController < Admin::BaseController
  def index
    @alternatives = Alternative.all
  end

  def show
    @alternative = Alternative.find(params[:id])
  end

  def new
    @alternative = Alternative.new
  end

  def create
    @alternative = Alternative.new(params[:alternative])
    if @alternative.save
      redirect_to [:admin, @alternative], :notice => "Successfully created alternative."
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
