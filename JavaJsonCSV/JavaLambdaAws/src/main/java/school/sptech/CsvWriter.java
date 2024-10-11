package school.sptech;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import school.sptech.Dado;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvWriter {

    public ByteArrayOutputStream writeCsv(List<Dado> dados) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("ID da Máquina", "Uso de CPU (%)", "Frequência de CPU", "Memoria RAM Total", "Uso de Memória RAM", "Total de Disco", "Uso de Disco", "Data do Registro", "Horário do Registro"));

        for (Dado dado : dados) {
            csvPrinter.printRecord(dado.getId(), dado.getCpuUso(), dado.getCpuFreq(), dado.getMemTotal(), dado.getMemUso(), dado.getDiscoTotal(), dado.getDiscoLivre(), dado.getData(), dado.getHora());
        }

        csvPrinter.flush();
        writer.close();

        return outputStream;
    }

    public ByteArrayOutputStream appendCsv(InputStream existingCsv, List<Dado> newDados) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(existingCsv, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
        }

        for (Dado dado : newDados) {
            csvPrinter.printRecord(dado.getId(), dado.getCpuUso(), dado.getCpuFreq(), dado.getMemTotal(), dado.getMemUso(), dado.getDiscoTotal(), dado.getDiscoLivre(), dado.getData(), dado.getHora());
        }

        csvPrinter.flush();
        writer.close();

        return outputStream;
    }
}
