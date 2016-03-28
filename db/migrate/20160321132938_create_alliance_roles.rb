class CreateAllianceRoles < ActiveRecord::Migration
  def change
    create_table :alliance_roles do |t|
      t.string :name, null: false
      t.timestamps null: false
    end
  end
end
