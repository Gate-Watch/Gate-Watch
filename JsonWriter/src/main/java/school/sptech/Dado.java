package school.sptech;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class Dado {

    @JsonProperty("idMaquina")
    private Integer id;

    @JsonProperty("cpu_freq")
    private Double cpuFreq;

    @JsonProperty("momento")
    private LocalDateTime momento;

    @JsonProperty("cpu_usage")
    private Double cpuUsage;

    @JsonProperty("memory_usage")
    private Double memoryUsage;

    @JsonProperty("memory_total")
    private Double memoryTotal;

    @JsonProperty("disk_usage")
    private Double diskUsage;

    @JsonProperty("disk_total")
    private Double diskTotal;

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

    public LocalDateTime getMomento() {
        return momento;
    }

    public void setMomento(LocalDateTime momento) {
        this.momento = momento;
    }

    public Double getCpuUsage() {
        return cpuUsage;
    }

    public void setCpuUsage(Double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }

    public Double getMemoryUsage() {
        return memoryUsage;
    }

    public void setMemoryUsage(Double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }

    public Double getMemoryTotal() {
        return memoryTotal;
    }

    public void setMemoryTotal(Double memoryTotal) {
        this.memoryTotal = memoryTotal;
    }

    public Double getDiskUsage() {
        return diskUsage;
    }

    public void setDiskUsage(Double diskUsage) {
        this.diskUsage = diskUsage;
    }

    public Double getDiskTotal() {
        return diskTotal;
    }

    public void setDiskTotal(Double diskTotal) {
        this.diskTotal = diskTotal;
    }
}
