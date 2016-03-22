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

  def check_alliance
    user = User.find(user_id_param)
    if user.alliance.present?
      render json: {
          found: true,
          alliance: user.alliance
      }, status: 200
    else
      render json: {found: false}, status:200
    end
  end

  private
  def alliance_params
    params.require(:alliance).permit(:name, :description)
  end

  def user_id_param
    params.require(:user_id)
  end
end
