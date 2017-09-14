class AddDownloadsToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :downloads, :string
  end
end
