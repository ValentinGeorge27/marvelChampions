Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#angular'

  post 'auth', to: 'auth#login'
  resources :users, only: [:create] do
    collection do
      get :check_email
      get :check_username
    end

    member do
      put :reject_request
      put :accept_request
      post :leave_alliance
    end

    resources :time_availabilities, only: [:create, :index]
  end

  resources :alliances do
    collection do
      get :check_alliance
      get :get_users
    end

    member do
      post :add_user
      delete :kick_user
    end
  end

  resources :notifications, only: [:create] do
    collection do
      get :user_notifications
    end
  end

end
