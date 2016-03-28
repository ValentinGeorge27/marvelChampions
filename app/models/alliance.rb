class Alliance < ActiveRecord::Base
  has_many :alliance_user, dependent: :destroy
  has_many :users, through: :alliance_user

  has_many :notifications
end
