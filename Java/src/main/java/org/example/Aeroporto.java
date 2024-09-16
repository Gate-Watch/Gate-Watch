package org.example;

public class Aeroporto {
    private Integer idAeroporto;
    private String nome_aero;
    private String codigo_icao;
    private String codigo_iata;

    public  Aeroporto(){}

    public Aeroporto(Integer idAeroporto, String codigo_icao, String codigo_iata, String nome_aero) {
        this.idAeroporto = idAeroporto;
        this.codigo_icao = codigo_icao;
        this.codigo_iata = codigo_iata;
        this.nome_aero = nome_aero;
    }

    public Integer getIdAeroporto() {
        return idAeroporto;
    }

    public void setIdAeroporto(Integer idAeroporto) {
        this.idAeroporto = idAeroporto;
    }

    public String getCodigo_iata() {
        return codigo_iata;
    }

    public void setCodigo_iata(String codigo_iata) {
        this.codigo_iata = codigo_iata;
    }

    public String getCodigo_icao() {
        return codigo_icao;
    }

    public void setCodigo_icao(String codigo_icao) {
        this.codigo_icao = codigo_icao;
    }

    public String getNome_aero() {
        return nome_aero;
    }

    public void setNome_aero(String nome_aero) {
        this.nome_aero = nome_aero;
    }

    public String toString(){
        String texto = """
                \n
                ID do Aeroporto: %d
                Nome do Aeroporto: %s
                Código ICAO: %s
                Código IATA: %s
                
                """.formatted(idAeroporto, nome_aero, codigo_icao, codigo_iata);

        return texto;
    }
}
