class Admin::ToursController < Admin::BaseController
  def index
    @tours = Tour.all
  end

  def show
    @tour = Tour.find(params[:id])
  end

  def new
    @tour = Tour.new
  end

  def create
    @tour = Tour.new(params[:tour])
    if @tour.save
      redirect_to [:admin, @tour], :notice => "Successfully created tour."
    else
      render :action => 'new'
    end
  end

  def edit
    @tour = Tour.find(params[:id])
  end

  def update
    @tour = Tour.find(params[:id])
    if @tour.update_attributes(params[:tour])
      redirect_to [:admin, @tour], :notice  => "Successfully updated tour."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @tour = Tour.find(params[:id])
    @tour.destroy
    redirect_to admin_tours_url, :notice => "Successfully destroyed tour."
  end
end
