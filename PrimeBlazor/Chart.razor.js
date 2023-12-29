import ("/_content/PrimeBlazor/Chart.js/chart.min.js")
var primeCharts = [];
export function mounted(id, canvas, type, data, options) {
    initChart(id, canvas, type, data, options);
}
export function initChart(id, canvas, type, data, options) {
    let chart = new ChartJS(canvas, {
        type: type,
        data: data,
        options: options
    });
    primeCharts.push({ id: id, chart: chart })
}
export function getBase64Image(id) {
    let { chart } = primeCharts.find(c => c.id === id);
    return chart.toBase64Image();
}
export function refresh(id) {
    let { chart } = primeCharts.find(c => c.id === id);
    if (chart) {
        chart.update();
    }
}
export function reinit(id, canvas, type, data, options) {
    let { chart } = primeCharts.find(c => c.id === id);
    if (chart) {
        chart.destroy();
        initChart(id, canvas, type, data, options);
    }
}
export function beforeDestroy(id) {
    let { chart } = primeCharts.find(c => c.id === id);
    if (chart) {
        chart.destroy();
        primeCharts = primeCharts.filter(c => c.id !== id);
    }
}