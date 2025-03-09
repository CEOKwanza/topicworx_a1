require 'json'

file_path = Rails.root.join('db', 'covid.json')
covid_data = JSON.parse(File.read(file_path))

puts "Loaded #{covid_data.size} records from covid.json"
