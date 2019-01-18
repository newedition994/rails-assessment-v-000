Rails.application.routes.draw do
  
  #get 'users/index'

  #get 'users/new'

  #get 'users/create'

  #get 'users/show'

  #get 'users/edit'

  #get 'users/update'

  #get 'sessions/destroy'

  #get 'sessions/new'

  #get 'sessions/create'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'users/registrations' }
  resources :packages, only: [:index, :show] do
    collection do
      get :popular
    end
  end
  
  #get 'pictures/show'

  root 'static_pages#login'

  get '/home', to: "static_pages#home"

  resources :appointments, only: [:index] do
    collection do
      get :recent
    end
  end
  resources :users do
    resources :appointments
  end
  resources :sessions

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
