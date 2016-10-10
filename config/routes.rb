Rails.application.routes.draw do
  devise_for :user

  resources :users, only: [:new,:create,:edit, :update, :destroy]
  resources :notifications
  authenticated :user do
    root 'users#index'
    get  'users/refresh_part' => 'users#refresh_part'
    get  'users/destroy_session' => 'users#destroy_session'
    post 'notifications/link_through', to: 'notifications#link_through'
    get 'users/update_notification', to: 'users#update_notification'
  end

  unauthenticated :user do
    devise_scope :user do
      get "/" => "devise/sessions#new"
    end
  end

  resources :dialogues do
    resources :messages
  end
end
