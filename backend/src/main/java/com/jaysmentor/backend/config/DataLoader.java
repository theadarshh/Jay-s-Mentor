package com.jaysmentor.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // No auto-import for now.
        // Keeping this class clean until manual import endpoints are added.
        System.out.println("📌 DataLoader initialized (no auto import)");
    }
}
