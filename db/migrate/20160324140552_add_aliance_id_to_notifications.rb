class AddAlianceIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :alliance_id, :integer, null: false
    add_column :notifications, :types, :integer, null: false
  end
end
