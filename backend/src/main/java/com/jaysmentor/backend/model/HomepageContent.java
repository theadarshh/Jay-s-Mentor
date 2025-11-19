package com.jaysmentor.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HomepageContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String heroTitle;

    @Column(columnDefinition = "TEXT")
    private String heroSubtitle;

    private String heroImageUrl; // 🔥 online URL

    @Column(columnDefinition = "TEXT")
    private String aboutSection;

    private String aboutImageUrl; // 🔥 online URL

    @Column(columnDefinition = "TEXT")
    private String missionSection;

    private String missionImageUrl; // 🔥 online URL

    @Column(columnDefinition = "TEXT")
    private String visionSection;

    private String visionImageUrl; // 🔥 online URL

    @Column(columnDefinition = "TEXT")
    private String footerText;
}
