class NotificationsController < WebsocketRails::BaseController
  skip_before_action :authenticate!

  def initialize_session
    controller_store[:message_count] = 0
  end

  def user_notifications
    unseen_notifications = Notification.check_user_notifications(message)
    puts 'test'
    puts unseen_notifications.as_json
    no_notification_message = { message: 'No new notifications' }
    notifications = { notifications: unseen_notifications.as_json }
    if unseen_notifications.present?
      send_message :notifications, notifications
    else
      send_message :no_notifications, no_notification_message
    end
  end

  private

  def user_id_params
    params.require(:user_id)
  end
end
