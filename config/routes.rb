Imjuve::Application.routes.draw do

  namespace :admin do
    resources :tours
    resources :events
    resources :votes
    resources :updates
    resources :alternatives
    resources :categories
    resources :problems
    resources :polygons do
      resources :images
      resources :documents
      resources :videos
    end
    resources :users
    resources :actors
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
