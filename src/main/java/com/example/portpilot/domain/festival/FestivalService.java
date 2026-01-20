package com.example.portpilot.domain.festival;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FestivalService {

    private final FestivalRepository festivalRepository;

    /**
     * Get all festivals
     */
    public List<FestivalDto> getAllFestivals() {
        return festivalRepository.findAll().stream()
                .map(FestivalDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get festival by ID
     */
    public Optional<FestivalDto> getFestivalById(Long id) {
        return festivalRepository.findById(id)
                .map(FestivalDto::fromEntity);
    }

    /**
     * Filter festivals using rule-based logic
     */
    public List<FestivalDto> filterFestivals(FestivalFilterCriteria criteria) {
        List<Festival> festivals = festivalRepository.findAll();
        
        // Apply filters
        List<Festival> filtered = festivals.stream()
                .filter(f -> matchesRegion(f, criteria.getRegion()))
                .filter(f -> matchesDateRange(f, criteria.getStartDate(), criteria.getEndDate()))
                .filter(f -> matchesFreeStatus(f, criteria.getIsFree()))
                .filter(f -> matchesCategories(f, criteria.getCategories()))
                .filter(f -> matchesLabels(f, criteria.getLabels()))
                .collect(Collectors.toList());

        // Apply sorting
        List<Festival> sorted = sortFestivals(filtered, criteria.getSortBy(), criteria.getSortOrder());

        return sorted.stream()
                .map(FestivalDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get festivals by region
     */
    public List<FestivalDto> getFestivalsByRegion(String region) {
        if (!FestivalLabelDictionary.isValidRegion(region)) {
            return Collections.emptyList();
        }
        return festivalRepository.findByRegion(region).stream()
                .map(FestivalDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get ongoing festivals
     */
    public List<FestivalDto> getOngoingFestivals() {
        LocalDate today = LocalDate.now();
        return festivalRepository.findByDateRange(today, today).stream()
                .map(FestivalDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get upcoming festivals
     */
    public List<FestivalDto> getUpcomingFestivals(int days) {
        LocalDate today = LocalDate.now();
        LocalDate futureDate = today.plusDays(days);
        return festivalRepository.findByDateRange(today, futureDate).stream()
                .filter(f -> f.getStartDate().isAfter(today))
                .map(FestivalDto::fromEntity)
                .sorted(Comparator.comparing(FestivalDto::getStartDate))
                .collect(Collectors.toList());
    }

    /**
     * Get free festivals
     */
    public List<FestivalDto> getFreeFestivals() {
        return festivalRepository.findByIsFree(true).stream()
                .map(FestivalDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Private helper methods for filtering

    private boolean matchesRegion(Festival festival, String region) {
        if (region == null || region.isEmpty()) {
            return true;
        }
        return festival.getRegion().equals(region);
    }

    private boolean matchesDateRange(Festival festival, LocalDate startDate, LocalDate endDate) {
        if (startDate == null && endDate == null) {
            return true;
        }
        if (startDate == null) {
            return !festival.getStartDate().isAfter(endDate);
        }
        if (endDate == null) {
            return !festival.getEndDate().isBefore(startDate);
        }
        return !(festival.getEndDate().isBefore(startDate) || festival.getStartDate().isAfter(endDate));
    }

    private boolean matchesFreeStatus(Festival festival, Boolean isFree) {
        if (isFree == null) {
            return true;
        }
        return festival.isFree() == isFree;
    }

    private boolean matchesCategories(Festival festival, Set<String> categories) {
        if (categories == null || categories.isEmpty()) {
            return true;
        }
        return !Collections.disjoint(festival.getCategories(), categories);
    }

    private boolean matchesLabels(Festival festival, Set<String> labels) {
        if (labels == null || labels.isEmpty()) {
            return true;
        }
        return !Collections.disjoint(festival.getLabels(), labels);
    }

    private List<Festival> sortFestivals(List<Festival> festivals, String sortBy, String sortOrder) {
        if (sortBy == null || sortBy.isEmpty()) {
            sortBy = "date";
        }
        if (sortOrder == null || sortOrder.isEmpty()) {
            sortOrder = "asc";
        }

        Comparator<Festival> comparator;
        switch (sortBy.toLowerCase()) {
            case "name":
                comparator = Comparator.comparing(Festival::getName);
                break;
            case "region":
                comparator = Comparator.comparing(Festival::getRegion);
                break;
            case "date":
            default:
                comparator = Comparator.comparing(Festival::getStartDate);
                break;
        }

        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }

        return festivals.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}
