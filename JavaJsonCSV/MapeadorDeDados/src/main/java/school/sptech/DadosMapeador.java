package school.sptech;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class DadosMapeador {
    public List<Dado> mapearDado(InputStream inputStream) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Dado> dados = objectMapper.readValue(inputStream, new TypeReference<List<Dado>>() {
        });
        return dados;
    }
}
