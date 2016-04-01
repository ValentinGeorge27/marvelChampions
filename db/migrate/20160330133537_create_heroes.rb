class CreateHeroes < ActiveRecord::Migration
  def change
    create_table :heroes do |t|
      t.string :name, null: false
      t.text :description
      t.json :thumbnail

      t.timestamps null: false
    end
  end
end
