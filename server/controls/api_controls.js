import https from 'https';
const http = https;

export const api_getAllSymbols = async(req, res, next)=>{
    const options = {
        "method": "GET",
        "hostname": "api.twelvedata.com",
        "port": null,
        "path": `https://api.twelvedata.com/stocks`
    };
    let body;
    try {
        const requ = http.request(options, function (resp) {
            const chunks = [];
            resp.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            resp.on("end", function () {
                body = Buffer.concat(chunks);
                //console.log(body.toString());
                res.send(JSON.parse(body));
                //res.render("../views/symbols.ejs", JSON.parse(body));
            });

        });
        requ.on('error', (error) => {
            console.error('Connection error:', error);
            res.status(500).send('Error fetching data from server');
        });
        requ.end();
    }catch(e){
        console.log(e);
    }
    return res;
};

export const api_getASymbol = async(req, res, next)=>{
    const symbol = req.params.symbol
    const options = {
        "method": "GET",
        "hostname": "api.twelvedata.com",
        "port": null,
        "path": `https://api.twelvedata.com/stocks?symbol=${symbol}`
    };
    let body;
    try {
        const requ = http.request(options, function (resp) {
            const chunks = [];
            resp.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            resp.on("end", function () {
                body = Buffer.concat(chunks);
                //console.log(body.toString());
                res.send(JSON.parse(body));
                //res.render("../views/symbols.ejs", JSON.parse(body));
            });

            
        });
        requ.on('error', (error) => {
            console.error('Connection error:', error);
            res.status(500).send('Error fetching data from server');
        });
        requ.end();
    }catch(e){
        console.log(e);
    }
    return res;
};


export const api_getTimeseriesdata = async(req, res, next)=>{
    let {start, end, interval} = req.body;
    const symbol = req.params.symbol;
    if (end == undefined){
        end = "";
    }
    if (interval == undefined || interval==""){
        interval = "30min";
    }
    const options = {
        "method": "GET",
        "hostname": "api.twelvedata.com",
        "port": null,
        "path": `https://api.twelvedata.com/time_series?symbol=${symbol}&start_date=${start}&end_date=${end}&interval=${interval}&apikey=${process.env.API_KEY}&source=docs`
    };
    let body;
    if (start==undefined  || symbol==undefined){
        return res.status(500).json({"message":"undefined data given"});
    }
    try {
        const requ = http.request(options, function (resp) {
            const chunks = [];
        
            resp.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            resp.on("end", function () {
                body = Buffer.concat(chunks);
                //console.log(body.toString());
                res.send(JSON.parse(body));
                //res.render("../views/timeseries.ejs", JSON.parse(body));
            });
        });
        requ.on('error', (error) => {
            console.error('Connection error:', error);
            res.status(500).send('Error fetching data from server');
        });
        requ.end();
    }catch(e){
        console.log(e);
    }
    return res;
};


export const api_getRealTimePrice = async(req, res, next)=>{
    const symbol = req.params.symbol
    const options = {
        "method": "GET",
        "hostname": "api.twelvedata.com",
        "port": null,
        "path": `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.API_KEY}`
    };
    let body;
    try {
        const requ = http.request(options, function (resp) {
            const chunks = [];
            resp.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            resp.on("end", function () {
                body = Buffer.concat(chunks);
                //console.log(body.toString());
                res.send(JSON.parse(body));
                //res.render("../views/symbols.ejs", JSON.parse(body));
            });

            
        });
        requ.on('error', (error) => {
            console.error('Connection error:', error);
            res.status(500).send('Error fetching data from server');
        });
        requ.end();
    }catch(e){
        console.log(e);
    }
    return res;
};