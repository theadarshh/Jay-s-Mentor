package com.rediscoveru.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {

    @GetMapping("/test")
    public String testApi() {
        return "Backend is working ✔️";
    }
}
