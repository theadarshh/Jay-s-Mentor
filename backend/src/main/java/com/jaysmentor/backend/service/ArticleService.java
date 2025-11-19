package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.Article;
import com.jaysmentor.backend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository repo;
    public List<Article> listAll() { return repo.findAll(); }
    public Optional<Article> get(Long id) { return repo.findById(id); }
    public Article create(Article a) { return repo.save(a); }
    public Article update(Article a) { return repo.save(a); }
    public void delete(Long id) { repo.deleteById(id); }
}
