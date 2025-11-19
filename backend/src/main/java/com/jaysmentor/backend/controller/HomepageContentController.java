package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.HomepageContent;
import com.jaysmentor.backend.service.HomepageContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/homepage")
public class HomepageContentController {

    @Autowired
    private HomepageContentService service;

    @GetMapping
    public ResponseEntity<HomepageContent> getHomepageContent() {
        HomepageContent content = service.getHomepageContent();
        return ResponseEntity.ok(content);
    }

    @PostMapping
    public ResponseEntity<HomepageContent> saveHomepageContent(@RequestBody HomepageContent content) {
        HomepageContent saved = service.saveHomepageContent(content);
        return ResponseEntity.ok(saved);
    }
}
