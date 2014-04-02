class Admin::UpdatesController < Admin::BaseController
  def index
    @updates = Update.all
  end

  def show
    @update = Update.find(params[:id])
  end

  def new
    @update = Update.new
  end

  def create
    @update = Update.new(params[:update])
    if @update.save
      redirect_to [:admin, @update], :notice => "Successfully created update."
    else
      render :action => 'new'
    end
  end

  def edit
    @update = Update.find(params[:id])
  end

  def update
    @update = Update.find(params[:id])
    if @update.update_attributes(params[:update])
      redirect_to [:admin, @update], :notice  => "Successfully updated update."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @update = Update.find(params[:id])
    @update.destroy
    redirect_to admin_updates_url, :notice => "Successfully destroyed update."
  end
end
