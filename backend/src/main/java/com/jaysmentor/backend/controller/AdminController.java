package com.jaysmentor.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

 @PostMapping("/add-video")
 public Map<String,String> addVideo(){
  return Map.of("status","Video Added");
 }

 @PostMapping("/schedule-live")
 public Map<String,String> scheduleLive(){
  return Map.of("status","Live Session Scheduled");
 }

 @PostMapping("/add-article")
 public Map<String,String> addArticle(){
  return Map.of("status","Article Published");
 }

 @PostMapping("/add-quiz")
 public Map<String,String> addQuiz(){
  return Map.of("status","Quiz Created");
 }
}