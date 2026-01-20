package com.example.portpilot.web.controller.festival;

import com.example.portpilot.domain.festival.*;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

/**
 * REST API Controller for Festival Discovery
 */
@RestController
@RequestMapping("/api/festivals")
@RequiredArgsConstructor
public class FestivalApiController {

    private final FestivalService festivalService;
    private final FestivalRecommendationService recommendationService;

    /**
     * Get all festivals
     */
    @GetMapping
    public ResponseEntity<List<FestivalDto>> getAllFestivals() {
        return ResponseEntity.ok(festivalService.getAllFestivals());
    }

    /**
     * Get festival by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<FestivalDto> getFestivalById(@PathVariable Long id) {
        return festivalService.getFestivalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Filter festivals with criteria
     */
    @PostMapping("/filter")
    public ResponseEntity<List<FestivalDto>> filterFestivals(@RequestBody FestivalFilterCriteria criteria) {
        return ResponseEntity.ok(festivalService.filterFestivals(criteria));
    }

    /**
     * Get festivals by region
     */
    @GetMapping("/region/{region}")
    public ResponseEntity<List<FestivalDto>> getFestivalsByRegion(@PathVariable String region) {
        return ResponseEntity.ok(festivalService.getFestivalsByRegion(region));
    }

    /**
     * Get ongoing festivals
     */
    @GetMapping("/ongoing")
    public ResponseEntity<List<FestivalDto>> getOngoingFestivals() {
        return ResponseEntity.ok(festivalService.getOngoingFestivals());
    }

    /**
     * Get upcoming festivals
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<FestivalDto>> getUpcomingFestivals(
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(festivalService.getUpcomingFestivals(days));
    }

    /**
     * Get free festivals
     */
    @GetMapping("/free")
    public ResponseEntity<List<FestivalDto>> getFreeFestivals() {
        return ResponseEntity.ok(festivalService.getFreeFestivals());
    }

    /**
     * Get recommended festivals by preference
     */
    @GetMapping("/recommend/preference")
    public ResponseEntity<FestivalRecommendationResult> recommendByPreference(
            @RequestParam String preference,
            @RequestParam(required = false) String region,
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(recommendationService.recommendByPreference(preference, region, limit));
    }

    /**
     * Get recommended festivals by categories
     */
    @GetMapping("/recommend/categories")
    public ResponseEntity<List<FestivalDto>> recommendByCategories(
            @RequestParam Set<String> categories,
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(recommendationService.recommendByCategories(categories, limit));
    }

    /**
     * Find similar festivals
     */
    @GetMapping("/{id}/similar")
    public ResponseEntity<List<FestivalDto>> findSimilarFestivals(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(recommendationService.findSimilarFestivals(id, limit));
    }

    /**
     * Get label dictionary information
     */
    @GetMapping("/dictionary/categories")
    public ResponseEntity<Set<String>> getCategories() {
        return ResponseEntity.ok(FestivalLabelDictionary.CATEGORIES);
    }

    @GetMapping("/dictionary/labels")
    public ResponseEntity<Set<String>> getLabels() {
        return ResponseEntity.ok(FestivalLabelDictionary.LABELS);
    }

    @GetMapping("/dictionary/regions")
    public ResponseEntity<Set<String>> getRegions() {
        return ResponseEntity.ok(FestivalLabelDictionary.REGIONS);
    }

    @GetMapping("/dictionary/preferences")
    public ResponseEntity<Set<String>> getPreferences() {
        return ResponseEntity.ok(FestivalLabelDictionary.getAvailablePreferences());
    }
}
