class UsersController < ApplicationController
  skip_before_action :authenticate!, only: [:create]

  def create
    user = User.new(users_params)
    if user.save
      render json: {
          user: {
              email: user.email,
              username: user.username
          },
          auth_token: user.generate_auth_token
      }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def users_params
    params.require(:user).permit(:email,:username,:password)
  end

end
