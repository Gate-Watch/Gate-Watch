package org.example.dao;

public class FuncionarioDao {
    public FuncionarioDao(){}

    public String selectDados(){
        String sql = "SELECT * FROM Funcionario";
        return sql;
    }
}
