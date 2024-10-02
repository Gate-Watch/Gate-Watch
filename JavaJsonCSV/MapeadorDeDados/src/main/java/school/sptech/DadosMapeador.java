package school.sptech;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class DadosMapeador {
    public List<Dado> mapearDado(InputStream inputStream) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        List<Dado> dados = objectMapper.readValue(inputStream, new TypeReference<List<Dado>>() {
        });
        return dados;
    }
}
