class User < ActiveRecord::Base
  has_many :roles_users
  has_many :roles, through: :roles_users
  has_many :time_availabilities

  has_one :alliance_user, dependent: :destroy
  has_one :alliance, through: :alliance_user

  has_many :notifications

  authenticates_with_sorcery!

  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, on: :create
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create

  def generate_auth_token
    payload = { user_id: self.id, exp: 24.hours.from_now.to_i }
    auth_token_gen = TokenProvider.issue_token(payload)
    self.update_attribute('token', auth_token_gen)
    auth_token_gen
  end
end
