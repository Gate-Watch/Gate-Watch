package school.sptech;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;



public class Mapper {
    public List<Dado> map(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        List<Dado> dados = mapper.readValue(inputStream, new TypeReference<List<Dado>>() {
        });
        return dados;
    }
}
