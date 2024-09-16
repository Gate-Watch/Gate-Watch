package org.example;

public class Desempenho {
    private Integer idDesempenho;
    private String dtHora;
    private Double cpu_usage;
    private Double cpu_freq;
    private Double memory_usage;
    private Double memory_perc;
    private Double disk_usage;
    private Double disk_perc;

    public Desempenho(
        Integer idDesempenho,
        String dtHora,
        Double cpu_usage,
        Double cpu_freq,
        Double memory_usage,
        Double memory_perc,
        Double disk_usage,
        Double disk_perc
    ){
        this.idDesempenho = idDesempenho;
        this.dtHora = dtHora;
        this.cpu_usage = cpu_usage;
        this.cpu_freq = cpu_freq;
        this.memory_usage = memory_usage;
        this.memory_perc = memory_perc;
        this.disk_usage = disk_usage;
        this.disk_perc = disk_perc;
    }

    public Desempenho(){}

    public Integer getIdDesempenho() {
        return idDesempenho;
    }

    public void setIdDesempenho(Integer idDesempenho) {
        this.idDesempenho = idDesempenho;
    }

    public String getDtHora() {
        return dtHora;
    }

    public void setDtHora(String dtHora) {
        this.dtHora = dtHora;
    }

    public Double getCpu_usage() {
        return cpu_usage;
    }

    public void setCpu_usage(Double cpu_usage) {
        this.cpu_usage = cpu_usage;
    }

    public Double getCpu_freq() {
        return cpu_freq;
    }

    public void setCpu_freq(Double cpu_freq) {
        this.cpu_freq = cpu_freq;
    }

    public Double getMemory_usage() {
        return memory_usage;
    }

    public void setMemory_usage(Double memory_usage) {
        this.memory_usage = memory_usage;
    }

    public Double getMemory_perc() {
        return memory_perc;
    }

    public void setMemory_perc(Double memory_perc) {
        this.memory_perc = memory_perc;
    }

    public Double getDisk_usage() {
        return disk_usage;
    }

    public void setDisk_usage(Double disk_usage) {
        this.disk_usage = disk_usage;
    }

    public Double getDisk_perc() {
        return disk_perc;
    }

    public void setDisk_perc(Double disk_perc) {
        this.disk_perc = disk_perc;
    }

    public String toString(){
        String texto = """
            ID do Dado: %d
            Data & Hora: %s
            Porcentagem de Uso da CPU: %.1f
            Frequência da CPU: %.1f MHz
            
            """.formatted();

        return texto;
    }
}
