class UsersController < ApplicationController
  before_filter :authorize, only: [:index, :new, :create]
  before_filter :can_edit, only: [:edit, :update]
  # layout "survey"

  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @users }
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      #session[:user_id] = @user.id
      UserMailer.registration_confirmation(@user).deliver
      redirect_to root_url, notice: "Thank you for signing up!"
    else
      render "new"
    end
  end

  def edit
    @user = User.find(params[:id])
  end

   def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(users_url, :notice => 'Usario editado con exito.') }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml { head :ok }
    end
  end

  def can_edit
    unless current_user.is_admin?
      @user = User.find(params[:id])
      redirect_to root_url, alert: "No estas loggeado" if current_user != @user
    end
  end

end
