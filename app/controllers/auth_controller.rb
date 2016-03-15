class AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email])
    if User.authenticate(login_params)
      render json: { user: user, auth_token: user.generate_auth_token }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end