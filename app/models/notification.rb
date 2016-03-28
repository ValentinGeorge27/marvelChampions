class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :alliance

  bitmask :types, :as => [:request, :accepted_request, :alliance_action, :leave]

  def self.check_request(user_id, alliance_id)
    notification = Notification.where(user_id: user_id, alliance_id: alliance_id).first
    if notification
      if notification.types?(:request)
        return false
      else
        return true
      end
    else
      return true
    end

  end

  def self.check_user_notifications(user_id)
    Notification.where(user_id: user_id, seen: false)
  end

  def self.delete_notification(notification_id)
    notification = Notification.find(notification_id)
    if notification
      if notification.delete
        return true
      else
        return false
      end
    end
  end

  def self.accept_notification(notification_id)
    notification = Notification.find(notification_id)
    if notification
      role = AllianceRole.find_by_name('member')
      AllianceUser.assign_user_to_alliance(notification.user_id, notification.alliance_id, role.id)
      return true
    else
      return false
    end

  end

end
