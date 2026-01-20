package com.example.portpilot.domain.festival;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FestivalDto {
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String location;
    private String region;
    private String description;
    private BigDecimal fee;
    private boolean isFree;
    private Set<String> categories;
    private Set<String> labels;
    private String website;
    private String contact;

    public static FestivalDto fromEntity(Festival festival) {
        return FestivalDto.builder()
                .id(festival.getId())
                .name(festival.getName())
                .startDate(festival.getStartDate())
                .endDate(festival.getEndDate())
                .location(festival.getLocation())
                .region(festival.getRegion())
                .description(festival.getDescription())
                .fee(festival.getFee())
                .isFree(festival.isFree())
                .categories(festival.getCategories())
                .labels(festival.getLabels())
                .website(festival.getWebsite())
                .contact(festival.getContact())
                .build();
    }
}
