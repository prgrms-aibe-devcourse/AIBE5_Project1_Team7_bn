package com.example.portpilot.domain.festival;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FestivalFilterCriteria {
    private String region;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isFree;
    private Set<String> categories;
    private Set<String> labels;
    private String sortBy; // "date", "name", "region"
    private String sortOrder; // "asc", "desc"
}
