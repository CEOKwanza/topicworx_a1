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
