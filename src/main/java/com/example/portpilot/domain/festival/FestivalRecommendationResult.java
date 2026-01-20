package com.example.portpilot.domain.festival;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FestivalRecommendationResult {
    private List<FestivalDto> festivals;
    private String explanation;
    private List<String> matchedLabels;
    private String preference;
}
