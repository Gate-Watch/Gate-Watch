package org.example;

public class Totem {
    private String codigo_serie;
    private Integer fkCompanhia;
    private Boolean status_totem;
    private String modelo_totem;

    public Totem(){}

    public Totem(String codigo_serie, Integer fkCompanhia, Boolean status_totem, String modelo_totem){
        this.codigo_serie = codigo_serie;
        this.fkCompanhia = fkCompanhia;
        this.status_totem = status_totem;
        this.modelo_totem = modelo_totem;
    }

    public String getCodigo_serie() {
        return codigo_serie;
    }

    public void setCodigo_serie(String codigo_serie) {
        this.codigo_serie = codigo_serie;
    }

    public Integer getFkCompanhia() {
        return fkCompanhia;
    }

    public void setFkCompanhia(Integer fkCompanhia) {
        this.fkCompanhia = fkCompanhia;
    }

    public Boolean getStatus_totem() {
        return status_totem;
    }

    public void setStatus_totem(Boolean status_totem) {
        this.status_totem = status_totem;
    }

    public String getModelo_totem() {
        return modelo_totem;
    }

    public void setModelo_totem(String modelo_totem) {
        this.modelo_totem = modelo_totem;
    }

    public String toString() {
        return "Totem{" +
                "Código de série = " + codigo_serie +
                ", Modelo = '" + modelo_totem + '\'' +
                ", Status = '" + status_totem + '\'' +
                '}';
    }
}
