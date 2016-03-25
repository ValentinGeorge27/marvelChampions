class NotificationsController < ApplicationController

  def user_notifications
    unseen_notifications = Notification.check_user_notifications(user_id_params)
    if unseen_notifications
      render json: {
          notifications: unseen_notifications
      }
    else
      render json: { success: 'There are no new notifications' }
    end
  end

  private

  def user_id_params
    params.require(:user_id)
  end
end
