package org.example.dao;

public class CompanhiaDao {
    public CompanhiaDao(){}

    public String selectDados(){
        String sql = "SELECT * FROM Companhia";
        return sql;
    }
}
