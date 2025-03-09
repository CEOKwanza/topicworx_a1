# 🦠 COVID-19 Data Visualization

## 📌 Overview

This project is a **Ruby on Rails 8** application that visualizes COVID-19 data using **StimulusJS** and **Chart.js**.  
The dataset is stored as a JSON file (`covid.json`) inside the `db` folder. The app reads this data, processes it, and displays it as a **line graph** using Chart.js in the frontend.

---

## 📌 Installation & Setup

### 🔧 **Prerequisites**

Ensure you have the following installed:

- **Ruby 3.4+**
- **Rails 8+**
- **Node.js & Yarn** (for managing JavaScript dependencies)
- **PostgreSQL**

### 🚀 **Steps to Run the Project**

1. **Clone the Repository**

```sh
git clone <repo-url>
cd <project-folder>
```

2. **Install Dependencies**

```sh
1. bundle install
2. yarn install
3. rails db:create
4. rails db:migrate
5. rails s
```

### 📌 How the Code Works

1. **Backend (Rails)**

The CovidController reads the covid.json file from the db folder and returns it as JSON.

```sh
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
```

2. **Frontend (Stimulus + ChartJS)**

A StimulusJS controller (covid_chart_controller.js) fetches the JSON data and visualizes it using Chart.js.

```sh
import { Controller } from "@hotwired/stimulus";
import Chart from "chart.js/auto";

export default class extends Controller {
  static targets = ["chart"];

  connect() {
    this.fetchCovidData();
  }

  async fetchCovidData() {
    try {
      const response = await fetch("/covid_data");
      const covidData = await response.json();

      this.createChart(covidData);
    } catch (error) {
      console.error("Error fetching COVID data:", error);
    }
  }

  createChart(data) {
    const ctx = this.chartTarget.getContext("2d");

    const labels = data.map((entry) => entry["Date"]);
    const total_confirmed_cases = data.map((entry) =>
      parseInt(entry["Total Confirmed Cases"])
    );
    const total_deaths = data.map((entry) => parseInt(entry["Total Deaths"]));
    const total_recovered = data.map((entry) =>
      parseInt(entry["Total Recovered"])
    );
    const active_cases = data.map((entry) => parseInt(entry["Active Cases"]));
    const daily_deaths = data.map((entry) => parseInt(entry["Daily  deaths"]));
    const daily_confirmed_cases = data.map((entry) =>
      parseInt(entry["Daily Confirmed Cases"])
    );

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Confirmed Cases",
            data: total_confirmed_cases,
            hidden: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Total Deaths",
            data: total_deaths,
            hidden: true,
            borderColor: "rgb(89, 192, 75)",
            backgroundColor: "rgba(75, 192, 102, 0.2)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Total Recovered",
            data: total_recovered,
            hidden: true,
            borderColor: "rgb(192, 149, 75)",
            backgroundColor: "rgba(192, 176, 75, 0.2)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Active Cases",
            data: active_cases,
            hidden: true,
            borderColor: "rgb(192, 75, 75)",
            backgroundColor: "rgba(192, 75, 75, 0.2)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Daily Deaths",
            data: daily_deaths,
            hidden: true,
            borderColor: "rgb(255, 119, 0)",
            backgroundColor: "rgba(250, 129, 0, 0.2)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Daily Confimed Cases",
            data: daily_confirmed_cases,
            hidden: true,
            borderColor: "rgb(151, 75, 192)",
            backgroundColor: "rgba(162, 71, 174, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              labels: {
                font: [
                  {
                    color: "rgb(255, 255, 255)",
                  },
                ],
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Count",
              },
            },
          ],
        },
      },
    });
  }
}
```

3. **View File (HTML for Chart Display)**
   The view file (index.html.erb) contains a <canvas> element where the chart is rendered.

```sh
<div class="w-full max-w-8xl mx-auto justify-center">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-500">2020 COVID Data Visualization</h1>
    <h3 class="text-lg font-semibold text-center mb-8 text-gray-500">Click Label To Toggle Data</h3>
  <canvas data-controller="covid-chart" data-covid-chart-target="chart" height="120"></canvas>
</div>
```

### 🔹 **Summary of How It Works:**

✅ The Rails backend serves JSON data from db/covid.json.
✅ The Stimulus controller fetches the data when the page loads.
✅ The JSON data is processed to extract dates (labels) and case numbers (values).
✅ Chart.js generates an interactive line chart displaying COVID-19 case trends.
