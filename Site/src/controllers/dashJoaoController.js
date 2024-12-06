var dashJoaoModel = require("../models/dashJoaoModel");

function dashCpu(req, res) {
    try {
        dashJoaoModel.dashJoaoCpu()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const cpuUsage = data[0].cpu_usage;
                    const dtHora = data[0].dtHora;

                    if (cpuUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de CPU:", cpuUsage, "Data/Hora:", dtHora);
                        // Retorne ambos os valores em uma única resposta
                        return res.json({ usage: cpuUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de CPU:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de CPU:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
    }
}

function dashCpu2(req, res) {
    try {
        dashJoaoModel.dashJoaoCpu2()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const cpuUsage = data[0].cpu_usage;
                    const dtHora = data[0].dtHora;

                    if (cpuUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de CPU:", cpuUsage, "Data/Hora:", dtHora);
                        // Retorne ambos os valores em uma única resposta
                        return res.json({ usage: cpuUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de CPU:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de CPU:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
    }
}

function dashCpu3(req, res) {
    try {
        dashJoaoModel.dashJoaoCpu3()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const cpuUsage = data[0].cpu_usage;
                    const dtHora = data[0].dtHora;

                    if (cpuUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de CPU:", cpuUsage, "Data/Hora:", dtHora);
                        // Retorne ambos os valores em uma única resposta
                        return res.json({ usage: cpuUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de CPU:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de CPU:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de CPU' });
    }
}

function dashRam(req, res) {
    try {
        dashJoaoModel.dashJoaoRam3()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const ramUsage = data[0].memory_perc;
                    const dtHora = data[0].dtHora;

                    if (ramUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de ram:", ramUsage, "Data/Hora:", dtHora);
                        
                        return res.json({ percent: ramUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Ram:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Ram:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
    }
}
function dashRam2(req, res) {
    try {
        dashJoaoModel.dashJoaoRam2()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const ramUsage = data[0].memory_perc;
                    const dtHora = data[0].dtHora;

                    if (ramUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de ram:", ramUsage, "Data/Hora:", dtHora);
                        
                        return res.json({ percent: ramUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Ram:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Ram:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
    }
}
function dashRam3(req, res) {
    try {
        dashJoaoModel.dashJoaoRam3()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const ramUsage = data[0].memory_perc;
                    const dtHora = data[0].dtHora;

                    if (ramUsage !== undefined && dtHora !== undefined) {
                        console.log("Uso de ram:", ramUsage, "Data/Hora:", dtHora);
                        
                        return res.json({ percent: ramUsage, dtHora: dtHora });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Ram:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Ram:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Ram' });
    }
}

function dashDisco(req, res) {
    try {
        dashJoaoModel.dashDisco()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const diskUsage = data[0].disk_usage;
                    const diskTotal = data[0].disk_total;

                    if (diskUsage !== undefined && diskTotal !== undefined) {
                        console.log("Total de Disco:", diskTotal, "Uso de Disco", diskUsage);
                        
                        return res.json({ total: diskTotal, usage: diskUsage });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Disco:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Disco:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
    }
}
function dashDisco2(req, res) {
    try {
        dashJoaoModel.dashDisco2()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const diskUsage = data[0].disk_usage;
                    const diskTotal = data[0].disk_total;

                    if (diskUsage !== undefined && diskTotal !== undefined) {
                        console.log("Total de Disco:", diskTotal, "Uso de Disco", diskUsage);
                        
                        return res.json({ total: diskTotal, usage: diskUsage });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Disco:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Disco:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
    }
}
function dashDisco3(req, res) {
    try {
        dashJoaoModel.dashDisco3()
            .then(function(data) {
                console.log("Dados recebidos:", data); 

                if (data && data.length > 0) {
                    const diskUsage = data[0].disk_usage;
                    const diskTotal = data[0].disk_total;

                    if (diskUsage !== undefined && diskTotal !== undefined) {
                        console.log("Total de Disco:", diskTotal, "Uso de Disco", diskUsage);
                        
                        return res.json({ total: diskTotal, usage: diskUsage });
                    }
                }
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Disco:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Disco:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Disco' });
    }
}

function alerta(req, res) {
    try {
        dashJoaoModel.alerta()
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(error) {
                console.error("Erro ao buscar dados de Alerta:", error);
                res.status(500).json({ error: 'Erro ao buscar dados de Alerta' });
            });
    } catch (error) {
        console.error('Erro ao buscar dados de Alerta:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de Alerta' });
    }
}
module.exports = {
    dashCpu,
    dashCpu2,
    dashCpu3,
    dashRam,
    dashRam2,
    dashRam3,
    dashDisco,
    dashDisco2,
    dashDisco3,
    alerta
};
