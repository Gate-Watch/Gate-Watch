package org.example;

public class Companhia {
    private Integer idCompanhia;
    private String nome_fantasia;
    private String razao_social;
    private String cnpj;
    private String codigo_icao;
    private String codigo_iata;
    private String email_comp;
    private String telefone_comp;
    private String chave_seguranca;

    public Companhia(Integer idCompanhia, String nome_fantasia, String razao_social, String cnpj, String codigo_icao, String codigo_iata, String email_comp, String telefone_comp, String chave_seguranca) {
        this.idCompanhia = idCompanhia;
        this.nome_fantasia = nome_fantasia;
        this.razao_social = razao_social;
        this.cnpj = cnpj;
        this.codigo_icao = codigo_icao;
        this.codigo_iata = codigo_iata;
        this.email_comp = email_comp;
        this.telefone_comp = telefone_comp;
        this.chave_seguranca = chave_seguranca;
    }

    public Companhia(){}

    public Integer getIdCompanhia() {
        return idCompanhia;
    }

    public void setIdCompanhia(Integer idCompanhia) {
        this.idCompanhia = idCompanhia;
    }

    public String getChave_seguranca() {
        return chave_seguranca;
    }

    public void setChave_seguranca(String chave_seguranca) {
        this.chave_seguranca = chave_seguranca;
    }

    public String getTelefone_comp() {
        return telefone_comp;
    }

    public void setTelefone_comp(String telefone_comp) {
        this.telefone_comp = telefone_comp;
    }

    public String getEmail_comp() {
        return email_comp;
    }

    public void setEmail_comp(String email_comp) {
        this.email_comp = email_comp;
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

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome_fantasia() {
        return nome_fantasia;
    }

    public void setNome_fantasia(String nome_fantasia) {
        this.nome_fantasia = nome_fantasia;
    }

    public String getRazao_social() {
        return razao_social;
    }

    public void setRazao_social(String razao_social) {
        this.razao_social = razao_social;
    }

    public String toString(){
        String texto = """
                \n
                ID da Companhia: %s
                Nome Fantasia: %s
                Razão Social: %s
                CNPJ: %s
                Código ICAO: %s
                Código IATA: %s
                Email: %s
                Telefone: %s
                Chave de Segurança: %s
                
                """.formatted(
                    idCompanhia,
                    nome_fantasia,
                    razao_social,
                    cnpj,
                    codigo_icao,
                    codigo_iata,
                    email_comp,
                    telefone_comp,
                    chave_seguranca
                );

        return texto;
    }
}
