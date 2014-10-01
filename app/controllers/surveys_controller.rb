class SurveysController < ApplicationController
  require 'uri'
  require 'iconv'
  require 'net/http'
  before_filter :authorize_admin, :only => [:index, :show, :edit, :update, :destroy]
  before_filter :authorize, :only => [:new, :create]
  layout "_survey"
  def index
    if current_user.is_admin?
      @surveys = Survey.all
    else
      @surveys = current_user.surveys
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @surveys }
    end
  end

  def show
    @survey = Survey.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @survey }
    end
  end

  def new
    # layout "survey"
    @survey = Survey.new
    ipinfo = Net::HTTP.get(URI.parse("http://ipinfo.io/#{request.remote_ip}/geo"))
    @ip = JSON.parse(ipinfo)
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @survey }
    end
  end

  def edit
    ipinfo = Net::HTTP.get(URI.parse("http://ipinfo.io/#{request.remote_ip}/geo"))
    @ip = JSON.parse(ipinfo)
    @survey = Survey.find(params[:id])
  end

  def create
    clean_params = check_others(params)
    @survey = Survey.new(clean_params[:survey])

    respond_to do |format|
      if @survey.save
        format.html { redirect_to new_survey_url, notice: 'Encuesta Creada Satisfactoriamente.' }
        format.json { render json: @survey, status: :created, location: @survey }
      else
        format.html { render action: "new" }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  def check_others(params)
    params[:survey][:ocupacion] = params[:ocupacion_otro] if params[:ocupacion_otro].present?
    params[:survey][:causa] = params[:causa_otro] if params[:causa_otro].present?
    params[:survey][:tipo_delito] = params[:otro_tipo_delito] if params[:otro_tipo_delito].present?
    params[:survey][:actividades] = params[:actividades_otro] if params[:actividades_otro].present?
    params[:survey][:act_reunen] = params[:act_reunen_otro] if params[:act_reunen_otro].present?
    params[:survey][:lugares] = params[:lugares_otro] if params[:lugares_otro].present?
    params[:survey][:proximo] = params[:proximo_otro] if params[:proximo_otro].present?
    params[:survey][:importante] = params[:importante_otro] if params[:importante_otro].present?
    params[:survey][:frecuencia] = params[:frecuencia_otro] if params[:frecuencia_otro].present?
    params[:survey][:tipo_droga] = params[:tipo_droga_otro] if params[:tipo_droga_otro].present?
    params[:survey][:amigos] = params[:amigos_tag] if params[:amigos_tag].present?
    params[:survey][:parejas_sexuales] = params[:parejas_sexuales_otro] if params[:parejas_sexuales_otro].present?
    params[:survey][:metodos] = params[:metodos_otro] if params[:metodos_otro].present?
    params[:survey][:motivos] = params[:motivos_otro] if params[:motivos_otro].present?
    params
  end

  def export
    @surveys = Survey.order(:user_id)
    respond_to do |format|
      format.html
      format.csv { send_data Iconv.conv('UTF-16LE//TRANSLIT//IGNORE', 'utf-8',  @surveys.to_csv),
  :type => 'text/csv; charset=iso-8859-1; header=present',
  :disposition => "attachment; filename=surveys.csv" }
      format.xls # { send_data @products.to_csv(col_sep: "\t") }
    end
  end


  def update
    clean_params = check_others(params)
    @survey = Survey.find(params[:id])

    respond_to do |format|
      if @survey.update_attributes(clean_params[:survey])
        format.html { redirect_to @survey, notice: 'Survey was successfully updated.'}
        format.json { head :no_content }
      else
        format.html { render action: "edit"}
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @survey = Survey.find(params[:id])
    @survey.destroy

    respond_to do |format|
      format.html { redirect_to surveys_url }
      format.json { head :no_content }
    end
  end
end
