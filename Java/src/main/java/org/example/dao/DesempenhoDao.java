package org.example.dao;

public class DesempenhoDao {
    public DesempenhoDao(){}

    public String selectDados(){
        String sql = "SELECT * FROM Desempenho";
        return sql;
    }
}
