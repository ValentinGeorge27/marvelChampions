require 'json'

class TimeAvailabilitiesController < ApplicationController
  before_action :authenticate!

  def index
    user = User.includes(:time_availabilities).find(params[:user_id])
    if user.time_availabilities.present?
      render json: {
          time: user.time_availabilities.first.time
      }, status: 200
    else
      render json: { error: 'Time is not set'}
    end

  end

  def create
    user = User.includes(:time_availabilities).find(params[:user_id])

    if user.time_availabilities.blank?
      time_availability = user.time_availabilities.new(user_id: params[:user_id],time: params[:time_availability][:time])
      if time_availability.save
        render json: {success: 'Time created'}, status: 201
      else
        render json: {error: 'Time not saved' }, status: 422
      end
    else
      if user.time_availabilities.first.update_attributes(time: params[:time_availability][:time])
        render json: {success: 'Time updated'}, status: 200
      else
        render json: {error: 'Time not updated'}, status: 422
      end
    end
    end
end