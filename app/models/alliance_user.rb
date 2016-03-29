class AllianceUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :alliance
  belongs_to :alliance_role

  def self.assign_user_to_alliance(user_id, alliance_id, role_id)
    alliance_user = check_user(user_id, alliance_id)
    if alliance_user.present?
      alliance_user.first.alliance_id = alliance_id
      alliance_user.first.alliance_role_id = role_id
      alliance_user.first.save
    else
      AllianceUser.create(user_id: user_id, alliance_id: alliance_id, alliance_role_id: role_id)
    end
  end

  def self.check_user(user_id, alliance_id)
    AllianceUser.where(user_id: user_id, alliance_id: alliance_id)
  end

  def self.kick_user(user_id, alliance_id)
    alliance_user = check_user(user_id, alliance_id)
    if alliance_user
      if alliance_user.first.delete
        true
      else
        false
      end
    else
      false
    end
  end

  def have_roles?(roles)
    roles.include? self.alliance_role.name
  end

end
