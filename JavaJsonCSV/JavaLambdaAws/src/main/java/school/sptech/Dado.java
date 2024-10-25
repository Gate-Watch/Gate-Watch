package school.sptech;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Dado {


    @JsonProperty("idMaquina")
    private Integer id;

    @JsonProperty("cpu_freq")
    private Double cpuFreq;

    // @JsonProperty("date")
    //private LocalDate data;

    //@JsonProperty("hour")
    //private LocalTime hora;

    @JsonProperty("momento")
    private LocalDateTime dataHora;

    @JsonProperty("cpu_usage")
    private Double cpuUso;

    @JsonProperty("memory_usage")
    private Double memUso;

    @JsonProperty("memory_total")
    private Double memTotal;

    @JsonProperty("disk_usage")
    private Double discoLivre;

    @JsonProperty("disk_total")
    private Double discoTotal;

    public Dado(){

    }

    public Dado(@JsonProperty("idMaquina") Integer id,
                @JsonProperty("cpu_freq") Double cpuFreq,
                @JsonProperty("momento") LocalDateTime dataHora,
                @JsonProperty("cpu_usage") Double cpuUso,
                @JsonProperty("memory_usage") Double memUso,
                @JsonProperty("memory_total") Double memTotal,
                @JsonProperty("disk_usage") Double discoLivre,
                @JsonProperty("disk_total") Double discoTotal) {
        this.id = id;
        this.cpuFreq = cpuFreq;
        this.dataHora = dataHora;
        this.cpuUso = cpuUso;
        this.memUso = memUso;
        this.memTotal = memTotal;
        this.discoLivre = discoLivre;
        this.discoTotal = discoTotal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getCpuFreq() {
        return cpuFreq;
    }

    public void setCpuFreq(Double cpuFreq) {
        this.cpuFreq = cpuFreq;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Double getCpuUso() {
        return cpuUso;
    }

    public void setCpuUso(Double cpuUso) {
        this.cpuUso = cpuUso;
    }

    public Double getMemUso() {
        return memUso;
    }

    public void setMemUso(Double memUso) {
        this.memUso = memUso;
    }

    public Double getMemTotal() {
        return memTotal;
    }

    public void setMemTotal(Double memTotal) {
        this.memTotal = memTotal;
    }

    public Double getDiscoLivre() {
        return discoLivre;
    }

    public void setDiscoLivre(Double discoLivre) {
        this.discoLivre = discoLivre;
    }

    public Double getDiscoTotal() {
        return discoTotal;
    }

    public void setDiscoTotal(Double discoTotal) {
        this.discoTotal = discoTotal;
    }

    @Override
    public String toString() {
        return "MachineStatus{" +
                "id=" + id +
                ", cpuFreq=" + cpuFreq +
                ", data=" + getData() +
                ", hora=" + getHora() +
                ", cpuUso=" + cpuUso +
                ", memUso=" + memUso +
                ", memTotal=" + memTotal +
                ", discoLivre=" + discoLivre +
                ", discoTotal=" + discoTotal +
                '}';
    }

    public LocalDate getData () {
        LocalDateTime fusoAjustado = dataHora.minusHours(3);
        return fusoAjustado.toLocalDate();
    }

    public LocalTime getHora() {
        LocalDateTime fusoAjustado = dataHora.minusHours(3);
        return fusoAjustado.toLocalTime();
    }

    public Double converterByteParaGB(Double medidaComponente){
        if (medidaComponente == null) {
            return null;
        } else {
            Double formatadoEmGB = medidaComponente / 1024.0 / 1024.0 / 1024.0;

            return Double.valueOf(String.format("%.2f", formatadoEmGB));
        }
    }

    public Double converterMhzParaGhz(Double medidaComponente) {
        if (medidaComponente == null) {
            return null;
        } else {
            Double formatadoEmGhz = medidaComponente / 1000;

            return Double.valueOf(String.format("%.2f", formatadoEmGhz));
        }
    }
}