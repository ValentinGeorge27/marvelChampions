class CreateAllianceUsers < ActiveRecord::Migration
  def change
    create_table :alliance_users do |t|
      t.references :alliance, null:false
      t.references :user, null: false
      t.references :alliance_role, null: false
      t.timestamps null: false
    end
  end
end
