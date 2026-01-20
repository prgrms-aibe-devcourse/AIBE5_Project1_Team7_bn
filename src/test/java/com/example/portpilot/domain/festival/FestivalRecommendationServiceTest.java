package com.example.portpilot.domain.festival;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Tests for FestivalRecommendationService
 */
@ExtendWith(MockitoExtension.class)
class FestivalRecommendationServiceTest {

    @Mock
    private FestivalRepository festivalRepository;

    @InjectMocks
    private FestivalRecommendationService recommendationService;

    private Festival testFestival1;
    private Festival testFestival2;
    private Festival testFestival3;

    @BeforeEach
    void setUp() {
        testFestival1 = Festival.builder()
                .id(1L)
                .name("Family Festival")
                .startDate(LocalDate.now().plusDays(10))
                .endDate(LocalDate.now().plusDays(15))
                .location("Test Location 1")
                .region("서울")
                .description("Family friendly festival")
                .fee(null)
                .isFree(true)
                .categories(new HashSet<>(Arrays.asList("전통문화")))
                .labels(new HashSet<>(Arrays.asList("가족친화적", "체험형", "교육적", "여유로운")))
                .build();

        testFestival2 = Festival.builder()
                .id(2L)
                .name("Date Festival")
                .startDate(LocalDate.now().plusDays(5))
                .endDate(LocalDate.now().plusDays(8))
                .location("Test Location 2")
                .region("경기")
                .description("Romantic festival")
                .fee(BigDecimal.valueOf(10000))
                .isFree(false)
                .categories(new HashSet<>(Arrays.asList("음악")))
                .labels(new HashSet<>(Arrays.asList("데이트추천", "낭만적", "여유로운", "관람형")))
                .build();

        testFestival3 = Festival.builder()
                .id(3L)
                .name("Friends Festival")
                .startDate(LocalDate.now().plusDays(20))
                .endDate(LocalDate.now().plusDays(25))
                .location("Test Location 3")
                .region("부산")
                .description("Energetic festival")
                .fee(null)
                .isFree(true)
                .categories(new HashSet<>(Arrays.asList("음악")))
                .labels(new HashSet<>(Arrays.asList("친구모임", "활기찬", "참여형", "체험형")))
                .build();
    }

    @Test
    void testRecommendByPreference_FamilyTravel() {
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("가족여행", null, 10);

        assertNotNull(result);
        assertEquals("가족여행", result.getPreference());
        assertNotNull(result.getFestivals());
        assertFalse(result.getFestivals().isEmpty());
        assertNotNull(result.getExplanation());
        assertNotNull(result.getMatchedLabels());
        assertFalse(result.getMatchedLabels().isEmpty());
        
        // Festival 1 should score highest for family travel
        assertTrue(result.getFestivals().get(0).getLabels().contains("가족친화적"));
    }

    @Test
    void testRecommendByPreference_Date() {
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("데이트", null, 10);

        assertNotNull(result);
        assertEquals("데이트", result.getPreference());
        assertNotNull(result.getFestivals());
        assertFalse(result.getFestivals().isEmpty());
        
        // Festival 2 should score highest for dates
        assertTrue(result.getFestivals().get(0).getLabels().contains("데이트추천"));
    }

    @Test
    void testRecommendByPreference_WithRegion() {
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("가족여행", "서울", 10);

        assertNotNull(result);
        assertNotNull(result.getFestivals());
        
        // All results should be from Seoul
        result.getFestivals().forEach(festival -> {
            assertEquals("서울", festival.getRegion());
        });
    }

    @Test
    void testRecommendByPreference_WithLimit() {
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("가족여행", null, 1);

        assertNotNull(result);
        assertNotNull(result.getFestivals());
        assertTrue(result.getFestivals().size() <= 1);
    }

    @Test
    void testRecommendByPreference_InvalidPreference() {
        FestivalRecommendationResult result = recommendationService.recommendByPreference("invalid", null, 10);

        assertNotNull(result);
        assertTrue(result.getFestivals().isEmpty());
        assertTrue(result.getMatchedLabels().isEmpty());
    }

    @Test
    void testRecommendByPreference_ExcludesPastFestivals() {
        Festival pastFestival = Festival.builder()
                .id(4L)
                .name("Past Festival")
                .startDate(LocalDate.now().minusDays(20))
                .endDate(LocalDate.now().minusDays(15))
                .location("Test Location 4")
                .region("서울")
                .isFree(true)
                .categories(new HashSet<>())
                .labels(new HashSet<>(Arrays.asList("가족친화적", "체험형")))
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, pastFestival));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("가족여행", null, 10);

        assertNotNull(result);
        assertNotNull(result.getFestivals());
        
        // Past festival should not be included
        result.getFestivals().forEach(festival -> {
            assertFalse(festival.getEndDate().isBefore(LocalDate.now()));
        });
    }

    @Test
    void testRecommendByCategories() {
        when(festivalRepository.findByCategories(any())).thenReturn(Arrays.asList(testFestival2, testFestival3));

        List<FestivalDto> result = recommendationService.recommendByCategories(
                new HashSet<>(Arrays.asList("음악")), 10);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(festivalRepository, times(1)).findByCategories(any());
    }

    @Test
    void testRecommendByCategories_InvalidCategory() {
        List<FestivalDto> result = recommendationService.recommendByCategories(
                new HashSet<>(Arrays.asList("invalid")), 10);

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(festivalRepository, never()).findByCategories(any());
    }

    @Test
    void testRecommendByCategories_WithLimit() {
        when(festivalRepository.findByCategories(any())).thenReturn(Arrays.asList(testFestival2, testFestival3));

        List<FestivalDto> result = recommendationService.recommendByCategories(
                new HashSet<>(Arrays.asList("음악")), 1);

        assertNotNull(result);
        assertTrue(result.size() <= 1);
    }

    @Test
    void testFindSimilarFestivals() {
        when(festivalRepository.findById(1L)).thenReturn(Optional.of(testFestival1));
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        List<FestivalDto> result = recommendationService.findSimilarFestivals(1L, 5);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        
        // The source festival should not be in the results
        result.forEach(festival -> {
            assertNotEquals(1L, festival.getId());
        });
    }

    @Test
    void testFindSimilarFestivals_NotFound() {
        when(festivalRepository.findById(999L)).thenReturn(Optional.empty());

        List<FestivalDto> result = recommendationService.findSimilarFestivals(999L, 5);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testFindSimilarFestivals_WithLimit() {
        when(festivalRepository.findById(1L)).thenReturn(Optional.of(testFestival1));
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2, testFestival3));

        List<FestivalDto> result = recommendationService.findSimilarFestivals(1L, 1);

        assertNotNull(result);
        assertTrue(result.size() <= 1);
    }

    @Test
    void testExplanationContainsPreferenceAndLabels() {
        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2));

        FestivalRecommendationResult result = recommendationService.recommendByPreference("가족여행", null, 10);

        assertNotNull(result.getExplanation());
        assertTrue(result.getExplanation().contains("가족여행"));
        assertTrue(result.getExplanation().contains("라벨"));
    }
}
