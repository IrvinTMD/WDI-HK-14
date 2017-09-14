class Manager < ActiveRecord::Migration[5.1]
  def change
    create_table :managers do |t|
      t.string :name
      t.string :email
      t.string :office
      t.string :phone_number
      t.string :nickname
      t.timestamps
    end
  end
end
