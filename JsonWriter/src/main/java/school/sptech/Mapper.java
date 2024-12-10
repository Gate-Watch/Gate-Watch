package school.sptech;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Mapper {
    public List<Dado> map(InputStream inputStream) throws IOException {
        CsvMapper csvMapper = new CsvMapper();
        CsvSchema detector = CsvSchema.emptySchema().withHeader();
        MappingIterator<Dado> iterator = csvMapper.readerFor(Dado.class).with(detector).readValues(inputStream);
        return iterator.readAll();
    }
}
