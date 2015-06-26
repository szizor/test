Imjuve::Application.routes.draw do

  namespace :api do
    namespace :v1 do
      #################### Reports ###########################
      namespace :reports do
        get '/:id',    to: 'api#get_survey'
        
        get 'get_polygon/:id', to: 'api#get_polygon'
        get 'get_single_polygon/:id', to: 'api#get_single_polygon'
      end
    end
  end
  namespace :admin do
    resources :events
    resources :votes
    resources :updates
    resources :categories
    resources :polygons do
      resources :images
      resources :problems do
        resources :alternatives
      end
      resources :trees
      resources :documents
      resources :videos
      resources :actors
      resources :groups
      resources :tours
    end
    resources :users
    resources :dashboard, :only => [:index]
    root :to => "dashboard#index"
  end
  resources :events, :only => [:index]

  get "home/index"

  post 'signup', to: 'users#create', as: 'signup'
  post 'messages' => 'messages#create_message'
  post 'save_problem' => "home#save_problem"
  post 'create_alternative' => "home#create_alternative"
  get 'login', to: 'sessions#new', as: 'login'
  get 'indicadores_globales' => "home#graphs"
  get 'indicadores' => "home#single_graphs"
  get 'logout', to: 'sessions#destroy', as: 'logout'
  post "dynamic_polygons/:id" => "home#dynamic_polygons"
  match 'users/subscribe' => redirect('/500.html')
  resources :sessions
  resources :surveys do
	get :export, :on => :collection
  end

  root to: 'home#index'


end
