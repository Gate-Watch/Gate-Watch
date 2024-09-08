package org.example.dao;

public class AeroportoDao {
    public AeroportoDao(){}

    public String selectDados(){
        String sql = "SELECT * FROM Aeroporto";
        return sql;
    }
}
