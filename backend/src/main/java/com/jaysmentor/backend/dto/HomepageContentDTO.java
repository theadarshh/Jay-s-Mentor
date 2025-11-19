package com.jaysmentor.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomepageContentDTO {
    private Long id;
    private String heroTitle;
    private String heroSubtitle;
    private String aboutSection;
    private String missionSection;
    private String visionSection;
    private String footerText;

    /**
     * Mentor image path provided in response (static).
     * Frontend should request the actual file from:
     *  /assets/jay_profile.png
     *
     * Local dev absolute path (your machine):
     *  C:\Users\admin\Desktop\Jay-s-Mentor\frontend\public\assets\jay_profile.png
     */
    private String mentorImagePath;
    private String mentorImageLocalPath;
}
