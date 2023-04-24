import axios from '../https';

const url = {
    getJdChart: '/api/chart/jd',
    getJdCalculation: '/api/chart/jdCalculation',
};

export async function getJdChart() {
    const { data } = await axios.get(url.getJdChart);
    return data;
}
export async function getJdCalculation() {
    const { data } = await axios.get(url.getJdCalculation);
    return data;
}
