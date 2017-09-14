class RemoveDownloadsFromSongs < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :downloads, :string
  end
end
