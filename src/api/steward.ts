import axios from '../https';

const url = {
    getJdChart: '/api/chart/jd',
    getJdCalculationChart: '/api/chart/jdCalculation',
    getAllJdCalculation: `/api/table/jd`,
    getJdCalculationById: `/api/v2/getJdCalculation`,
    getJdGoods: `/api/monito/jd/getgoods`,
    delJdGoods: `/api/monito/jd/delgoods`,
    addJdGoods: `/api/monito/jd/addgoods`,
    getJdGoodsById: `/api/v2/JdGoodsInfo`,
    getTmChart: '/api/chart/tm',
    getTmCalculationChart: '/api/chart/tmCalculation',
    getAllTmCalculation: `/api/table/tm`,
    getTmCalculationById: `/api/v2/getTmCalculation`,
    getTmGoods: `/api/monito/tm/getgoods`,
    delTmGoods: `/api/monito/tm/delgoods`,
    addTmGoods: `/api/monito/tm/addgoods`,
    getTmGoodsById: `/api/v2/TmGoodsInfo`,
};

export async function getJdChart() {
    const { data } = await axios.get(url.getJdChart);
    return data;
}
export async function getJdCalculation() {
    const { data } = await axios.get(url.getJdCalculationChart);
    return data;
}

export async function getAllJdCalculation() {
    const { data } = await axios.post(url.getAllJdCalculation);
    return data;
}

export async function getJdCalculationById(id: string) {
    const { data } = await axios.get(url.getJdCalculationById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getJdGoods() {
    const { data } = await axios.get(url.getJdGoods);
    return data;
}

export async function delJdGoods(id: any) {
    const { data } = await axios.delete(url.delJdGoods, {
        data: { id },
    });
    return data;
}

export async function addJdGoods(add: string) {
    const { data } = await axios.get(url.addJdGoods, {
        params: {
            url: add,
        },
    });
    return data;
}

export async function getJdGoodsById(id: any) {
    const { data } = await axios.get(url.getJdGoodsById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getTmChart() {
    const { data } = await axios.get(url.getTmChart);
    return data;
}
export async function getTmCalculation() {
    const { data } = await axios.get(url.getTmCalculationChart);
    return data;
}

export async function getAllTmCalculation() {
    const { data } = await axios.post(url.getAllTmCalculation);
    return data;
}

export async function getTmCalculationById(id: string) {
    const { data } = await axios.get(url.getTmCalculationById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getTmGoods() {
    const { data } = await axios.get(url.getTmGoods);
    return data;
}

export async function delTmGoods(id: any) {
    const { data } = await axios.delete(url.delTmGoods, {
        data: { id },
    });
    return data;
}

export async function addTmGoods(add: string) {
    const { data } = await axios.get(url.addTmGoods, {
        params: {
            url: add,
        },
    });
    return data;
}

export async function getTmGoodsById(id: any) {
    const { data } = await axios.get(url.getTmGoodsById, {
        params: {
            id,
        },
    });
    return data;
}
