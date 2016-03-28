class CreateTimeAvailabilities < ActiveRecord::Migration
  def change
    create_table :time_availabilities do |t|
      t.json :time, array: true, default: []
      t.references :user, null: false
      t.timestamps null: false
    end
  end
end
