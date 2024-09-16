package org.example.dao;

public class TotemDao {

    public TotemDao(){}

    public String selectDados(){
        String sql = "SELECT * FROM Totem";
        return sql;
    }
}
