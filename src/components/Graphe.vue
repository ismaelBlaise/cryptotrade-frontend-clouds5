<template>
  <div class="graphe-container">
    <h2>{{ cryptoName }}</h2>

    <!-- Inputs pour le filtrage des dates -->
    <div class="date-filters">
      <label
        >De : <input type="date" v-model="startDate" @change="filterData"
      /></label>
      <label
        >À : <input type="date" v-model="endDate" @change="filterData"
      /></label>
    </div>

    <canvas id="crypto-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import api from "@/services/axios";

export default {
  data() {
    return {
      chart: null,
      prices: [],
      labels: [],
      cryptoName: "",
      rawData: [], // Données brutes pour le filtrage
      startDate: "", // Date de début du filtre
      endDate: "", // Date de fin du filtre
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchCryptoData(id);
  },
  methods: {
    fetchCryptoData(id) {
      api
        .get("/historiqueprixs/cours/" + id)
        .then((response) => {
          const data = response.data;

          if (data.length > 0) {
            this.cryptoName = data[0].cryptomonnaie.nom || "Nom Inconnu";
          }

          this.rawData = data; // Stockage des données brutes
          this.updateChartData(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    },

    updateChartData(data) {
      this.prices = data.map((item) => item.prix);
      this.labels = data.map((item) => {
        const date = new Date(item.dateChangement);
        return isNaN(date)
          ? "Date Invalide"
          : date.toLocaleString("fr-FR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
      });
      this.renderChart();
    },

    filterData() {
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      const filteredData = this.rawData.filter((item) => {
        const itemDate = new Date(item.dateChangement);
        return (!start || itemDate >= start) && (!end || itemDate <= end);
      });

      this.updateChartData(filteredData);
    },

    renderChart() {
      const ctx = document.getElementById("crypto-chart").getContext("2d");
      if (this.chart) this.chart.destroy();

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: `Prix de ${this.cryptoName} ($)`,
              data: this.prices,
              borderColor: "#E7361A",
              backgroundColor: "rgba(231, 54, 26, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 20,
              bottom: 10,
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
                autoSkip: true,
                maxTicksLimit: 10,
              },
              grid: {
                color: "#444",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "white",
                maxTicksLimit: 8,
              },
              grid: {
                color: "#444",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.graphe-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  color: white;
  font-size: 30px;
  margin: 20px 0;
}

.date-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.date-filters label {
  color: white;
  font-size: 14px;
}

canvas {
  width: 95%;
  max-height: 500px;
  margin: 0 auto;
}
</style>
