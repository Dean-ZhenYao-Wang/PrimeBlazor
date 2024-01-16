var primeCharts = [];

export default class Chart {
    static primeCharts = [];
    static mounted(id, canvas, type, data, options) {
        Chart.initChart(id, canvas, type, data, options);
    }
    static initChart(id, canvas, type, data, options) {
        let chart = new ChartJs(canvas, {
            type: type,
            data: data,
            options: options
        });
        Chart.primeCharts.push({ id: id, chart: chart })
    }
    static getBase64Image(id) {
        let { chart } = Chart.primeCharts.find(c => c.id === id);
        return chart.toBase64Image();
    }
    static refresh(id) {
        let { chart } = Chart.primeCharts.find(c => c.id === id);
        if (chart) {
            chart.update();
        }
    }
    static reinit(id, canvas, type, data, options) {
        let { chart } = Chart.primeCharts.find(c => c.id === id);
        if (chart) {
            chart.destroy();
            Chart.initChart(id, canvas, type, data, options);
        }
    }
    static beforeDestroy(id) {
        let { chart } = Chart.primeCharts.find(c => c.id === id);
        if (chart) {
            chart.destroy();
            Chart.primeCharts = Chart.primeCharts.filter(c => c.id !== id);
        }
    }
}
window.Chart = Chart;