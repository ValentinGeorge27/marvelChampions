class CreateRolesUsers < ActiveRecord::Migration
  def change
    create_table :roles_users do |t|
      t.references :user, null: false
      t.references :role, null: false
    end
  end
end
