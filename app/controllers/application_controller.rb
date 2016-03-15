class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def validate_token!
    begin
      TokenProvider.valid?(token)
    rescue
      error!('Unauthorized', 401)
    end
  end

  def authenticate!
    begin
      payload, header = TokenProvider.valid?(token)
      @current_user = User.find_by(id: payload['user_id'])
    rescue
      error!('Unauthorized', 401)
    end
  end

  def current_user
    @current_user ||= authenticate!
  end

  def token
    request.headers['Authorization'].split(' ').last
  end

end
