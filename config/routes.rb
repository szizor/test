Imjuve::Application.routes.draw do
  
  get "home/index"

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  match 'users/subscribe' => redirect('/500.html')
  resources :users
  resources :sessions
  resources :surveys do
	get :export, :on => :collection
  end


  root to: 'home#index'


end
