class UsersController < ApplicationController
  skip_before_action :authenticate!, only: [:create]

  def create
    user = User.new(users_params)
    if user.save
      render json: {
          user: {
              id: user.id,
              email: user.email,
              username: user.username
          },
          auth_token: user.generate_auth_token
      }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  #TODO server email verification
  def check_email

  end

  def check_username
    user = User.find_by_username(params[:username])
    if user
      render json: { found: true }
    else
      render json: { found: false }
    end
  end

  def reject_request
    if Notification.delete_notification(notification_id_param)
      render json: {success: 'Request rejected'}
    else
      render json: { error: "Request couldn't be processed, please try again later" }
    end
  end

  def accept_request
    if Notification.accept_notification(notification_id_param)
      alliance = Alliance.find(Notification.find(notification_id_param).alliance_id)
      Notification.delete_notification(notification_id_param)
      render json: {
          success: 'Congrats',
          alliance: alliance
      }
    else
      render json: { error: 'We could not add you to alliance. Please try again later' }
    end
  end

  def leave_alliance
    if AllianceUser.kick_user(params[:id], params[:alliance_id])
      render json: { success: 'You left alliance' }
    else
      render json: { error: 'There was a problem, please try again later' }
    end
  end

  private

  def users_params
    params.require(:user).permit(:email,:username,:password)
  end

  def notification_id_param
    params.require 'notification_id'
  end

end
