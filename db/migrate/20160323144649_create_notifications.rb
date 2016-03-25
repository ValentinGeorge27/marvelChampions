class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.boolean :seen, null: false
      t.references :user, null: false
      t.timestamps null: false
    end
  end
end
