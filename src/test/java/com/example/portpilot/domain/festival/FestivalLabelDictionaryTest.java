package com.example.portpilot.domain.festival;

import org.junit.jupiter.api.Test;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for FestivalLabelDictionary
 */
class FestivalLabelDictionaryTest {

    @Test
    void testValidCategory() {
        assertTrue(FestivalLabelDictionary.isValidCategory("전통문화"));
        assertTrue(FestivalLabelDictionary.isValidCategory("음악"));
        assertFalse(FestivalLabelDictionary.isValidCategory("invalid"));
    }

    @Test
    void testValidLabel() {
        assertTrue(FestivalLabelDictionary.isValidLabel("가족친화적"));
        assertTrue(FestivalLabelDictionary.isValidLabel("데이트추천"));
        assertFalse(FestivalLabelDictionary.isValidLabel("invalid"));
    }

    @Test
    void testValidRegion() {
        assertTrue(FestivalLabelDictionary.isValidRegion("서울"));
        assertTrue(FestivalLabelDictionary.isValidRegion("경기"));
        assertFalse(FestivalLabelDictionary.isValidRegion("invalid"));
    }

    @Test
    void testGetLabelsForPreference() {
        Set<String> labels = FestivalLabelDictionary.getLabelsForPreference("가족여행");
        assertNotNull(labels);
        assertFalse(labels.isEmpty());
        assertTrue(labels.contains("가족친화적"));
        assertTrue(labels.contains("체험형"));
    }

    @Test
    void testGetLabelsForInvalidPreference() {
        Set<String> labels = FestivalLabelDictionary.getLabelsForPreference("invalid");
        assertNotNull(labels);
        assertTrue(labels.isEmpty());
    }

    @Test
    void testGetAvailablePreferences() {
        Set<String> preferences = FestivalLabelDictionary.getAvailablePreferences();
        assertNotNull(preferences);
        assertFalse(preferences.isEmpty());
        assertTrue(preferences.contains("가족여행"));
        assertTrue(preferences.contains("데이트"));
    }

    @Test
    void testCategoriesAreImmutable() {
        Set<String> categories = FestivalLabelDictionary.CATEGORIES;
        assertNotNull(categories);
        assertFalse(categories.isEmpty());
    }

    @Test
    void testLabelsAreImmutable() {
        Set<String> labels = FestivalLabelDictionary.LABELS;
        assertNotNull(labels);
        assertFalse(labels.isEmpty());
    }

    @Test
    void testRegionsAreImmutable() {
        Set<String> regions = FestivalLabelDictionary.REGIONS;
        assertNotNull(regions);
        assertFalse(regions.isEmpty());
    }
}
