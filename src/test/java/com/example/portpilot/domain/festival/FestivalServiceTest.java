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
 * Tests for FestivalService
 */
@ExtendWith(MockitoExtension.class)
class FestivalServiceTest {

    @Mock
    private FestivalRepository festivalRepository;

    @InjectMocks
    private FestivalService festivalService;

    private Festival testFestival1;
    private Festival testFestival2;

    @BeforeEach
    void setUp() {
        testFestival1 = Festival.builder()
                .id(1L)
                .name("Test Festival 1")
                .startDate(LocalDate.now().plusDays(10))
                .endDate(LocalDate.now().plusDays(15))
                .location("Test Location 1")
                .region("서울")
                .description("Test Description 1")
                .fee(BigDecimal.valueOf(10000))
                .isFree(false)
                .categories(new HashSet<>(Arrays.asList("음악", "예술")))
                .labels(new HashSet<>(Arrays.asList("가족친화적", "데이트추천")))
                .build();

        testFestival2 = Festival.builder()
                .id(2L)
                .name("Test Festival 2")
                .startDate(LocalDate.now().plusDays(5))
                .endDate(LocalDate.now().plusDays(8))
                .location("Test Location 2")
                .region("경기")
                .description("Test Description 2")
                .fee(null)
                .isFree(true)
                .categories(new HashSet<>(Arrays.asList("전통문화")))
                .labels(new HashSet<>(Arrays.asList("가족친화적", "교육적")))
                .build();
    }

    @Test
    void testGetAllFestivals() {
        List<Festival> festivals = Arrays.asList(testFestival1, testFestival2);
        when(festivalRepository.findAll()).thenReturn(festivals);

        List<FestivalDto> result = festivalService.getAllFestivals();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(festivalRepository, times(1)).findAll();
    }

    @Test
    void testGetFestivalById() {
        when(festivalRepository.findById(1L)).thenReturn(Optional.of(testFestival1));

        Optional<FestivalDto> result = festivalService.getFestivalById(1L);

        assertTrue(result.isPresent());
        assertEquals("Test Festival 1", result.get().getName());
        verify(festivalRepository, times(1)).findById(1L);
    }

    @Test
    void testGetFestivalsByRegion() {
        when(festivalRepository.findByRegion("서울")).thenReturn(Arrays.asList(testFestival1));

        List<FestivalDto> result = festivalService.getFestivalsByRegion("서울");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("서울", result.get(0).getRegion());
        verify(festivalRepository, times(1)).findByRegion("서울");
    }

    @Test
    void testGetFestivalsByInvalidRegion() {
        List<FestivalDto> result = festivalService.getFestivalsByRegion("InvalidRegion");

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(festivalRepository, never()).findByRegion(any());
    }

    @Test
    void testGetOngoingFestivals() {
        Festival ongoingFestival = Festival.builder()
                .id(3L)
                .name("Ongoing Festival")
                .startDate(LocalDate.now().minusDays(5))
                .endDate(LocalDate.now().plusDays(5))
                .location("Test Location")
                .region("서울")
                .isFree(true)
                .categories(new HashSet<>())
                .labels(new HashSet<>())
                .build();

        when(festivalRepository.findByDateRange(any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(Arrays.asList(ongoingFestival));

        List<FestivalDto> result = festivalService.getOngoingFestivals();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(festivalRepository, times(1)).findByDateRange(any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void testGetUpcomingFestivals() {
        when(festivalRepository.findByDateRange(any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(Arrays.asList(testFestival1, testFestival2));

        List<FestivalDto> result = festivalService.getUpcomingFestivals(30);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(festivalRepository, times(1)).findByDateRange(any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void testGetFreeFestivals() {
        when(festivalRepository.findByIsFree(true)).thenReturn(Arrays.asList(testFestival2));

        List<FestivalDto> result = festivalService.getFreeFestivals();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).isFree());
        verify(festivalRepository, times(1)).findByIsFree(true);
    }

    @Test
    void testFilterFestivalsWithRegion() {
        FestivalFilterCriteria criteria = FestivalFilterCriteria.builder()
                .region("서울")
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2));

        List<FestivalDto> result = festivalService.filterFestivals(criteria);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("서울", result.get(0).getRegion());
    }

    @Test
    void testFilterFestivalsWithFreeStatus() {
        FestivalFilterCriteria criteria = FestivalFilterCriteria.builder()
                .isFree(true)
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2));

        List<FestivalDto> result = festivalService.filterFestivals(criteria);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).isFree());
    }

    @Test
    void testFilterFestivalsWithCategories() {
        FestivalFilterCriteria criteria = FestivalFilterCriteria.builder()
                .categories(new HashSet<>(Arrays.asList("음악")))
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2));

        List<FestivalDto> result = festivalService.filterFestivals(criteria);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getCategories().contains("음악"));
    }

    @Test
    void testFilterFestivalsWithDateRange() {
        LocalDate startDate = LocalDate.now().plusDays(4);
        LocalDate endDate = LocalDate.now().plusDays(12);

        FestivalFilterCriteria criteria = FestivalFilterCriteria.builder()
                .startDate(startDate)
                .endDate(endDate)
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival1, testFestival2));

        List<FestivalDto> result = festivalService.filterFestivals(criteria);

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    void testFilterFestivalsWithSorting() {
        FestivalFilterCriteria criteria = FestivalFilterCriteria.builder()
                .sortBy("name")
                .sortOrder("asc")
                .build();

        when(festivalRepository.findAll()).thenReturn(Arrays.asList(testFestival2, testFestival1));

        List<FestivalDto> result = festivalService.filterFestivals(criteria);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Test Festival 1", result.get(0).getName());
        assertEquals("Test Festival 2", result.get(1).getName());
    }
}
