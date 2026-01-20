package com.example.portpilot.domain.festival;

import lombok.Getter;

import java.util.*;

/**
 * Predefined label dictionary for Korean festival categorization and recommendations.
 * This dictionary defines all valid labels and categories used in the system.
 * Labels are used for rule-based recommendations and must be deterministic.
 */
@Getter
public class FestivalLabelDictionary {

    // Categories - primary classification
    public static final Set<String> CATEGORIES = Set.of(
            "전통문화", // Traditional Culture
            "음악", // Music
            "예술", // Arts
            "음식", // Food
            "꽃축제", // Flower Festival
            "불꽃축제", // Fireworks
            "지역특산", // Local Specialties
            "계절행사" // Seasonal Events
    );

    // Labels - for detailed matching and recommendations
    public static final Set<String> LABELS = Set.of(
            // Atmosphere
            "가족친화적", // Family-friendly
            "데이트추천", // Date recommendation
            "친구모임", // Friends gathering
            "혼자가기좋은", // Good for solo visit
            
            // Activity type
            "체험형", // Experience-based
            "관람형", // Viewing-based
            "참여형", // Participatory
            "교육적", // Educational
            
            // Vibe/Mood
            "활기찬", // Energetic
            "여유로운", // Relaxing
            "낭만적", // Romantic
            "전통적", // Traditional
            
            // Season
            "봄축제", // Spring festival
            "여름축제", // Summer festival
            "가을축제", // Fall festival
            "겨울축제", // Winter festival
            
            // Scale
            "대규모", // Large scale
            "중규모", // Medium scale
            "소규모", // Small scale
            
            // Accessibility
            "교통편리", // Easy transportation
            "주차가능", // Parking available
            "실내", // Indoor
            "실외" // Outdoor
    );

    // Regions - Korean administrative regions
    public static final Set<String> REGIONS = Set.of(
            "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
            "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
    );

    // Recommendation rules: maps user preferences to matching labels
    private static final Map<String, Set<String>> PREFERENCE_TO_LABELS = Map.of(
            "가족여행", Set.of("가족친화적", "체험형", "교육적", "여유로운"),
            "데이트", Set.of("데이트추천", "낭만적", "여유로운", "관람형"),
            "친구와함께", Set.of("친구모임", "활기찬", "참여형", "체험형"),
            "혼자여행", Set.of("혼자가기좋은", "여유로운", "관람형", "교육적"),
            "전통문화체험", Set.of("전통적", "교육적", "체험형"),
            "음식즐기기", Set.of("체험형", "가족친화적", "친구모임")
    );

    /**
     * Get recommended labels based on user preference
     */
    public static Set<String> getLabelsForPreference(String preference) {
        return PREFERENCE_TO_LABELS.getOrDefault(preference, Collections.emptySet());
    }

    /**
     * Validate if a category is valid
     */
    public static boolean isValidCategory(String category) {
        return CATEGORIES.contains(category);
    }

    /**
     * Validate if a label is valid
     */
    public static boolean isValidLabel(String label) {
        return LABELS.contains(label);
    }

    /**
     * Validate if a region is valid
     */
    public static boolean isValidRegion(String region) {
        return REGIONS.contains(region);
    }

    /**
     * Get all available preferences
     */
    public static Set<String> getAvailablePreferences() {
        return PREFERENCE_TO_LABELS.keySet();
    }
}
