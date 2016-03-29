class AlliancesController < ApplicationController
  before_action :authenticate!

  def create
    alliance = Alliance.new(alliance_params)
    role = AllianceRole.find_by_name('owner')
    if alliance.save
      AllianceUser.assign_user_to_alliance(user_id_param, alliance.id, role.id)
      render json: {
          alliance: {
              id: alliance.id,
              name: alliance.name,
              description: alliance.description
          }
      }, status: 201
    else
      render json: { error: 'Alliance could not been created' }, status: 422
    end
  end

  def update
    alliance = Alliance.find(params[:id])
    if alliance.update(alliance_params)
      render json: { alliance: alliance }, status: 200
    else
      render json: { error: 'Update failed'}, status: 422
    end
  end

  def check_alliance
    user = User.find(user_id_param)
    if user.alliance.present?
      alliance_user = AllianceUser.where(user_id: user.id).first
      role = AllianceRole.find(alliance_user.alliance_role_id)
      render json: {
          found: true,
          alliance: user.alliance,
          user_role: role.name
      }, status: 200
    else
      render json: {found: false}, status:200
    end
  end

  def get_users
    user = User.find(user_id_param)
    if user.alliance.present?
      alliance = user.alliance
      users = alliance.users.select(:id, :username).as_json
      users.each do |user|
        alliance_user = AllianceUser.where(user_id: user['id']).first
        role = AllianceRole.find(alliance_user.alliance_role_id)
        user['role'] = role.name
      end
      render json: {
          users: users
      }, status: 200
    else
      render json: { error: 'No users found' }, status: 404
    end
  end

  def add_user
    user = User.find_by_username(params[:username])
    alliance = Alliance.find(params[:id])
    if user.alliance.eql?alliance
      render json: { success: 'The user already is in the alliance' }
    elsif Notification.check_request(user.id, alliance.id)
      user.notifications.create(name: 'Alliance invitation', description: alliance.name.to_s + ' has invited to join them', seen: false, alliance_id: alliance.id, types: 'request')
      render json: {success: 'The request has been send'}
    else
      render json: {success: 'You already invited this user '}
    end
  end

  def kick_user
    if AllianceUser.kick_user(user_id_param, params[:id])
      render json: { success: 'User kicked' }
    else
      render json: { error: 'User not kicked, try again later'}
    end
  end

  def promote_user
    requester_user = AllianceUser.check_user(params[:requester_id], params[:id]).first
    alliance_user = AllianceUser.check_user(user_id_param, params[:id]).first

    if requester_user.have_roles? %w(owner leadership)
      if alliance_user.have_roles? %w(member)
        role = AllianceRole.find_by_name('leadership')
        if AllianceUser.assign_user_to_alliance(user_id_param, params[:id], role.id)
          user = User.select(:id, :username).find(alliance_user.user_id).as_json
          user['role'] = role.name
          render json: {
              user: user,
              success: 'User rank updated' }
        else
          render json: { error: "The user couldn't be updated. Please try again later" }
        end
      else
        render json: {error: "The user can't be updated, his rank is higher that member"}
      end
    else
      render json: {error: 'The request does not have permission to upgrade' }
    end
  end

  def demote_user
    requester_user = AllianceUser.check_user(params[:requester_id], params[:id]).first
    alliance_user = AllianceUser.check_user(user_id_param, params[:id]).first

    if requester_user.have_roles? %w(owner leadership)
      if alliance_user.have_roles? %w(leadership)
        role = AllianceRole.find_by_name('member')
        if AllianceUser.assign_user_to_alliance(user_id_param, params[:id], role.id)
          user = User.select(:id, :username).find(alliance_user.user_id).as_json
          user['role'] = role.name
          render json: {
              user: user,
              success: 'User rank updated' }
        else
          render json: { error: "The user couldn't be updated. Please try again later" }
        end
      else
        render json: {error: "The user can't be updated, his rank is lower that leadership"}
      end
    else
      render json: {error: 'The request does not have permission to upgrade' }
    end
  end

  private
  def alliance_params
    params.require(:alliance).permit(:id, :name, :description)
  end

  def user_id_param
    params.require(:user_id)
  end
end
