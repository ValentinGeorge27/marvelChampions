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

  def self.change_role(requester_id, user_id, alliance_id, role, new_role)
    requester_user = AllianceUser.check_user(requester_id, alliance_id).first
    alliance_user = AllianceUser.check_user(user_id, alliance_id).first

    if requester_user.have_roles? %w(owner leadership)
      if alliance_user.have_roles? [role.name]
        if AllianceUser.assign_user_to_alliance(user_id, alliance_id, new_role.id)
          user = User.select(:id, :username).find(alliance_user.user_id).as_json
          user['role'] = new_role.name
            return {
                success: 'User updated',
                user: user}
        else
          return {error: "The user couldn't be updated. Please try again later" }
        end
      else
        return {error: "The user can't be updated, can't modify to that rank"}
      end
    else
      return {error: 'The request does not have permission to upgrade' }
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
