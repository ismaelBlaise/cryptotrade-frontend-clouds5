<template>
    <div class="graphe-container">
        <h2>GRAPHE</h2>
        <canvas id="crypto-chart"></canvas>
    </div>
</template>
  
<script>

    import Chart from 'chart.js/auto';

    export default {
    data() {
        return {
            chart: null,
            prices: [1200, 1250, 1300, 1280, 1350, 1400, 1500],
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
    renderChart() {
        const ctx = document.getElementById('crypto-chart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Prix du Bitcoin ($)',
                        data: this.prices,
                        borderColor: '#E7361A',
                        backgroundColor: 'rgba(231, 54, 26, 0.2)',
                        tension: 0.4,
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        border: {
                            color: 'white'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        },
                        border: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
}

    };
</script>
  
<style scoped>

    .graphe-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    h2 {
        color: white;
        margin-left: auto;
        margin-right: auto;
        font-size: 30px;
    }

    canvas {
        width: 95%;
        max-height: 90%; /* Limite la hauteur */
        margin: 0 auto; /* Centre le canvas */
    }

</style>
    