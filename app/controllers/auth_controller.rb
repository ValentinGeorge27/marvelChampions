class AuthController < ApplicationController
  skip_before_action :authenticate!

  def login
    user = User.find_by(email: params[:email])
    if user
      if User.authenticate(params[:email], params[:password])
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
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end

  end

  private

  def login_params
    params.permit(:email, :password)
  end
end