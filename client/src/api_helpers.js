import axios from 'axios';

export const getCurrPrice = async(symbol)=>{
    const res = await axios.get(`/stock/price/${symbol}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getDayData = async(symbol)=>{
    const res = await axios.get(`/stock/day/${symbol}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getMonthData = async(symbol)=>{
    const res = await axios.get(`/stock/month/${symbol}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getTimeseriesdata = async(values)=>{
    console.log(values);
    const res = await axios.put(`/stock/timeseries`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
};

