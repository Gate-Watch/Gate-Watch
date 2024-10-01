package school.sptech;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class DadosConversor {
    public static void main(String[] args) throws IOException {
        FileInputStream inputStream;

        try {
            inputStream = new FileInputStream("dados_sistema.json");
        }catch(FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        DadosMapeador dadosMapeador = new DadosMapeador();
        List<Dado> dados = new ArrayList<>();

        try{
            dados = dadosMapeador.mapearDado(inputStream);

        } catch (IOException e) {
            System.out.println("Erro ao mapear");
        }

        for(Dado dado : dados){
            System.out.println(dado);
        }

        gerarCsv(dados);

        try{
            inputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }

    private static void gerarCsv(List<Dado> dados){
        CSVFormat formato = CSVFormat.Builder.create().setHeader("ID da Máquina", "Uso de CPU (%)", "Frequência de CPU", "Memoria RAM Total", "Uso de Memória RAM", "Total de Disco", "Uso de Disco", "Data do Registro", "Horário do Registro").setDelimiter(";").build();

        try(FileOutputStream outputStream = new FileOutputStream("dados_sistema.csv");
            BufferedWriter escritor = new BufferedWriter(new OutputStreamWriter(outputStream));
            CSVPrinter escritorPrinter = new CSVPrinter(escritor, formato);){

            for(Dado dado : dados){
                escritorPrinter.printRecord(dado.getId(), dado.getCpuUso(), dado.getCpuFreq(), dado.getMemTotal(), dado.getMemUso(), dado.getDiscoTotal(), dado.getDiscoLivre(), dado.getData(), dado.getHora());
            }

        }catch(IOException e){
            throw new RuntimeException(e);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
