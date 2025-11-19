package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.Article;
import com.jaysmentor.backend.model.Program;
import com.jaysmentor.backend.repository.ArticleRepository;
import com.jaysmentor.backend.repository.ProgramRepository;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocxImporterService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public List<String> extractParagraphs(String filePath) {
        List<String> lines = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(filePath);
             XWPFDocument doc = new XWPFDocument(fis)) {

            doc.getParagraphs().forEach(p -> {
                String text = p.getText().trim();
                if (!text.isEmpty()) {
                    lines.add(text);
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }

        return lines;
    }

    // --------------------------
    // IMPORT PROGRAMS
    // --------------------------
    public void importPrograms(String filePath) {

        List<String> lines = extractParagraphs(filePath);

        for (String line : lines) {
            Program p = new Program();
            p.setTitle(line);
            p.setDescription("Imported description placeholder");
            p.setPublished(true);

            // ❌ REMOVED: p.setSourceUrl(filePath);

            programRepository.save(p);
        }
    }

    // --------------------------
    // IMPORT ARTICLES
    // --------------------------
    public void importArticles(String filePath) {

        List<String> lines = extractParagraphs(filePath);

        for (String line : lines) {
            Article a = new Article();
            a.setTitle(line);
            a.setContent("Imported content placeholder");
            a.setCategory("General");
            a.setPublished(true);

            // ❌ REMOVED: a.setSourceUrl(filePath);

            articleRepository.save(a);
        }
    }
}
