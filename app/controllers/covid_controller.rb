class CovidController < ApplicationController
    def index
      file_path = Rails.root.join("db", "covid.json")
  
      # Read and parse the JSON file
      json_data = JSON.parse(File.read(file_path))
  
      # Render the view, not JSON, since we want to display a chart on the page
      # This would render the index.html.erb
    end
  
    def data
      # Serving the data at a separate route
      file_path = Rails.root.join("db", "covid.json")
      json_data = JSON.parse(File.read(file_path))
      render json: json_data
    end
  end
  