package school.sptech;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalTime;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Dado {

    @JsonProperty("cpu_freq")
    private Double cpuFreq;

    @JsonProperty("idMaquina")
    private Integer id;

    @JsonProperty("date")
    private LocalDate data;

    @JsonProperty("hour")
    private LocalTime hora;

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

    public Dado(
            @JsonProperty("idMaquina") Integer id,
            @JsonProperty("date") LocalDate data,
            @JsonProperty("hour") LocalTime hora,
            @JsonProperty("cpu_freq") Double cpuFreq,
            @JsonProperty("cpu_usage") Double cpuUso,
            @JsonProperty("memory_usage") Double memUso,
            @JsonProperty("memory_total") Double memTotal,
            @JsonProperty("disk_usage") Double discoLivre,
            @JsonProperty("disk_total") Double discoTotal
    ) {
        this.id = id;
        this.data = data;
        this.hora = hora;
        this.cpuFreq = cpuFreq;
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

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
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
        return "MachineStatus{id=" + id +
                ", data=" + data +
                ", hora=" + hora +
                ", cpuUso=" + cpuUso +
                ", memUso=" + memUso +
                ", memTotal=" + memTotal +
                ", discoLivre=" + discoLivre +
                ", discoTotal=" + discoTotal + "}";
    }


    public Double getCpuFreq() {
        return cpuFreq;
    }

    public void setCpuFreq(Double cpuFreq) {
        this.cpuFreq = cpuFreq;
    }
}