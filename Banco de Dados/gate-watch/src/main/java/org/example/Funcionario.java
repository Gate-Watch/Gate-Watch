package org.example;

public class Funcionario {
    private Integer idFuncionario;
    private Integer fkCompanhia;
    private String nome;
    private String cargo;
    private String email;
    private String senha;

    public Funcionario(){}

    public Funcionario(Integer idFuncionario, String senha, String email, Integer fkCompanhia, String cargo, String nome) {
        this.idFuncionario = idFuncionario;
        this.senha = senha;
        this.email = email;
        this.fkCompanhia = fkCompanhia;
        this.cargo = cargo;
        this.nome = nome;
    }

    public Integer getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Integer idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getFkCompanhia() {
        return fkCompanhia;
    }

    public void setFkCompanhia(Integer fkCompanhia) {
        this.fkCompanhia = fkCompanhia;
    }

    public String toString() {
        String senhaOculta = "";

        for (int i = 0; i < senha.length(); i++) {
            senhaOculta += '*';
        }

        String texto = """
                \n
                ID do Funcionário: %d
                ID da Companhia Aérea: %d
                Nome do Funcionário: %s
                Cargo do Funcionário: %s
                Email do Funcionário: %s
                Senha do Funcionário: %s
                
                """.formatted(idFuncionario, fkCompanhia, nome, cargo, email, senhaOculta);

        return texto;
    }
}
