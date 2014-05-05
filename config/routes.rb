Imjuve::Application.routes.draw do

  namespace :api do
    namespace :v1 do
      #################### Reports ###########################
      namespace :reports do
        get '/:id',    to: 'api#get_polygon'
      end
    end
  end
  namespace :admin do
    resources :tours
    resources :events
    resources :votes
    resources :updates
    resources :alternatives
    resources :categories
    resources :polygons do
      resources :images
      resources :problems
      resources :trees
      resources :documents
      resources :videos
      resources :actors
    end
    resources :users
    resources :dashboard, :only => [:index]
    root :to => "dashboard#index"
  end

  get "home/index"

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  match 'users/subscribe' => redirect('/500.html')
  resources :sessions
  resources :surveys do
	get :export, :on => :collection
  end

  root to: 'home#index'


end
