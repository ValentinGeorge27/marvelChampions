class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def angular
    render 'layouts/application'
  end

  def validate_token!
    begin
      TokenProvider.valid?(token)
    rescue
      render json: {error: 'Unauthorized'}, status: 401
    end
  end

  def authenticate!
    begin
      payload, header = TokenProvider.valid?(token)
      @current_user = User.find_by(id: payload['user_id'])
    rescue
      render json: {error: 'Unauthorized'}, status: 401
    end
  end

  def current_user
    @current_user
  end

  def token
    request.headers['Authorization'].split(' ').last
  end

end
