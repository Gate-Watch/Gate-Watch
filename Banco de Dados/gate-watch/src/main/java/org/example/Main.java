package org.example;

import org.example.dao.*;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        DatabaseConfig config = new DatabaseConfig();
        JdbcTemplate template = config.getTemplate();

        CompanhiaDao companhiaDao = new CompanhiaDao();
        AeroportoDao aeroportoDao = new AeroportoDao();
        FuncionarioDao funcionarioDao = new FuncionarioDao();
        TotemDao totemDao = new TotemDao();
        DesempenhoDao desempenhoDao = new DesempenhoDao();

        Scanner scanner = new Scanner(System.in);

        String[] selectTable = {
                companhiaDao.selectDados(),
                aeroportoDao.selectDados(),
                funcionarioDao.selectDados(),
                totemDao.selectDados(),
                desempenhoDao.selectDados()
        };

        System.out.println("""
                Selecione a tabela que gostaria de modificar/visualizar os dados
                
                [1] Companhias Aéreas
                [2] Aeroportos
                [3] Funcionários
                [4] Tótens
                [5] Componentes
                
                Sua escolha:""");

        Integer opcaoTabela = scanner.nextInt();

        if(opcaoTabela < 1 || opcaoTabela > 5) System.out.println("Opção inválida!");
        else {
            System.out.println("""
                \n
                Selecione uma ação
                
                [1] Visualizar dados
                [2] Inserir dados
                [3] Atualizar dados
                [4] Apagar dados
                
                Sua escolha:""");

            Integer opcaoCrud = scanner.nextInt();

            switch (opcaoTabela){
                case 1:
                    if(opcaoCrud == 1) {
                        List<Companhia> itens = template.query(
                                companhiaDao.selectDados(),
                                new BeanPropertyRowMapper<>(Companhia.class)
                        );

                        System.out.println(itens);
                    }
                    break;

                case 2:
                    if(opcaoCrud == 1) {
                        List<Aeroporto> itens = template.query(
                                aeroportoDao.selectDados(),
                                new BeanPropertyRowMapper<>(Aeroporto.class)
                        );

                        System.out.println(itens);
                    }
                    break;

                case 3:
                    if(opcaoCrud == 1) {
                        List<Funcionario> itens = template.query(
                                funcionarioDao.selectDados(),
                                new BeanPropertyRowMapper<>(Funcionario.class)
                        );

                        System.out.println(itens);
                    }
                    break;

                case 4:
                    if(opcaoCrud == 1) {
                        List<Totem> itens = template.query(
                                totemDao.selectDados(),
                                new BeanPropertyRowMapper<>(Totem.class)
                        );

                        System.out.println(itens);
                    }
                    break;

                case 5:
                    if(opcaoCrud == 1) {
                        List<Desempenho> itens = template.query(
                                desempenhoDao.selectDados(),
                                new BeanPropertyRowMapper<>(Desempenho.class)
                        );

                        System.out.println(itens);
                    }
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        }


    }
}