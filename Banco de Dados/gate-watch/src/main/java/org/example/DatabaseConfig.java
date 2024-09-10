package org.example;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.xml.crypto.Data;

public class DatabaseConfig {
    private JdbcTemplate template;

    public DatabaseConfig(){
        BasicDataSource bancoDeDados = new BasicDataSource();
        bancoDeDados.setDriverClassName("com.mysql.cj.jdbc.Driver");
        bancoDeDados.setUrl("jdbc:mysql://localhost:3306/gatewatch");
        bancoDeDados.setUsername("root");
        bancoDeDados.setPassword("7895");

        template = new JdbcTemplate(bancoDeDados);
    }

    public JdbcTemplate getTemplate(){
        return template;
    }
}
