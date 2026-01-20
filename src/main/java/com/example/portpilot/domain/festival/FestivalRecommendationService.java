package com.example.portpilot.domain.festival;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Rule-based recommendation service for festivals.
 * All recommendations are deterministic and explainable through label matching.
 */
@Service
@RequiredArgsConstructor
public class FestivalRecommendationService {

    private final FestivalRepository festivalRepository;

    /**
     * Recommend festivals based on user preference using rule-based matching
     */
    public FestivalRecommendationResult recommendByPreference(String preference, String region, Integer limit) {
        // Get recommended labels for this preference
        Set<String> recommendedLabels = FestivalLabelDictionary.getLabelsForPreference(preference);
        
        if (recommendedLabels.isEmpty()) {
            return FestivalRecommendationResult.builder()
                    .festivals(Collections.emptyList())
                    .explanation("선택하신 선호도에 대한 추천 라벨을 찾을 수 없습니다.")
                    .matchedLabels(Collections.emptyList())
                    .preference(preference)
                    .build();
        }

        // Get all festivals
        List<Festival> allFestivals = festivalRepository.findAll();

        // Filter to ongoing and upcoming festivals only
        LocalDate today = LocalDate.now();
        List<Festival> activeFestivals = allFestivals.stream()
                .filter(f -> !f.getEndDate().isBefore(today))
                .collect(Collectors.toList());

        // Filter by region if specified
        if (region != null && !region.isEmpty()) {
            activeFestivals = activeFestivals.stream()
                    .filter(f -> f.getRegion().equals(region))
                    .collect(Collectors.toList());
        }

        // Score and rank festivals by label matching
        List<ScoredFestival> scoredFestivals = activeFestivals.stream()
                .map(f -> scoreFestival(f, recommendedLabels))
                .filter(sf -> sf.score > 0) // Only include festivals with at least one matching label
                .sorted(Comparator.comparingInt(ScoredFestival::getScore).reversed())
                .collect(Collectors.toList());

        // Apply limit
        if (limit != null && limit > 0) {
            scoredFestivals = scoredFestivals.stream()
                    .limit(limit)
                    .collect(Collectors.toList());
        }

        List<FestivalDto> recommendedFestivals = scoredFestivals.stream()
                .map(sf -> FestivalDto.fromEntity(sf.festival))
                .collect(Collectors.toList());

        // Build explanation
        String explanation = buildExplanation(preference, recommendedLabels, region);

        return FestivalRecommendationResult.builder()
                .festivals(recommendedFestivals)
                .explanation(explanation)
                .matchedLabels(new ArrayList<>(recommendedLabels))
                .preference(preference)
                .build();
    }

    /**
     * Recommend festivals by categories
     */
    public List<FestivalDto> recommendByCategories(Set<String> categories, Integer limit) {
        if (categories == null || categories.isEmpty()) {
            return Collections.emptyList();
        }

        // Validate categories
        Set<String> validCategories = categories.stream()
                .filter(FestivalLabelDictionary::isValidCategory)
                .collect(Collectors.toSet());

        if (validCategories.isEmpty()) {
            return Collections.emptyList();
        }

        List<Festival> festivals = festivalRepository.findByCategories(new ArrayList<>(validCategories));

        // Filter to active festivals
        LocalDate today = LocalDate.now();
        List<FestivalDto> activeFestivals = festivals.stream()
                .filter(f -> !f.getEndDate().isBefore(today))
                .map(FestivalDto::fromEntity)
                .sorted(Comparator.comparing(FestivalDto::getStartDate))
                .collect(Collectors.toList());

        if (limit != null && limit > 0) {
            activeFestivals = activeFestivals.stream()
                    .limit(limit)
                    .collect(Collectors.toList());
        }

        return activeFestivals;
    }

    /**
     * Get similar festivals based on labels
     */
    public List<FestivalDto> findSimilarFestivals(Long festivalId, Integer limit) {
        Optional<Festival> optionalFestival = festivalRepository.findById(festivalId);
        if (optionalFestival.isEmpty()) {
            return Collections.emptyList();
        }

        Festival sourceFestival = optionalFestival.get();
        Set<String> sourceLabels = sourceFestival.getLabels();

        if (sourceLabels.isEmpty()) {
            return Collections.emptyList();
        }

        List<Festival> allFestivals = festivalRepository.findAll();
        LocalDate today = LocalDate.now();

        List<ScoredFestival> scoredFestivals = allFestivals.stream()
                .filter(f -> !f.getId().equals(festivalId)) // Exclude the source festival
                .filter(f -> !f.getEndDate().isBefore(today)) // Only active festivals
                .map(f -> scoreFestival(f, sourceLabels))
                .filter(sf -> sf.score > 0)
                .sorted(Comparator.comparingInt(ScoredFestival::getScore).reversed())
                .collect(Collectors.toList());

        if (limit != null && limit > 0) {
            scoredFestivals = scoredFestivals.stream()
                    .limit(limit)
                    .collect(Collectors.toList());
        }

        return scoredFestivals.stream()
                .map(sf -> FestivalDto.fromEntity(sf.festival))
                .collect(Collectors.toList());
    }

    // Private helper methods

    private ScoredFestival scoreFestival(Festival festival, Set<String> targetLabels) {
        Set<String> festivalLabels = festival.getLabels();
        long matchCount = festivalLabels.stream()
                .filter(targetLabels::contains)
                .count();
        return new ScoredFestival(festival, (int) matchCount);
    }

    private String buildExplanation(String preference, Set<String> matchedLabels, String region) {
        StringBuilder explanation = new StringBuilder();
        explanation.append("'").append(preference).append("' 선호도에 맞는 축제를 추천합니다. ");
        explanation.append("매칭된 라벨: ").append(String.join(", ", matchedLabels)).append(". ");
        
        if (region != null && !region.isEmpty()) {
            explanation.append("지역: ").append(region).append(". ");
        }
        
        explanation.append("라벨 매칭 점수가 높은 순서로 정렬되었습니다.");
        return explanation.toString();
    }

    // Inner class for scoring
    @RequiredArgsConstructor
    private static class ScoredFestival {
        private final Festival festival;
        private final int score;

        public int getScore() {
            return score;
        }
    }
}
