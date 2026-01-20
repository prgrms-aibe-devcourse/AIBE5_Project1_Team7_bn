package com.example.portpilot.domain.festival;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "festivals")
public class Festival {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String region;

    @Column(length = 2000)
    private String description;

    private BigDecimal fee;

    @Column(nullable = false)
    private boolean isFree;

    @ElementCollection
    @CollectionTable(name = "festival_categories", joinColumns = @JoinColumn(name = "festival_id"))
    @Column(name = "category")
    private Set<String> categories = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "festival_labels", joinColumns = @JoinColumn(name = "festival_id"))
    @Column(name = "label")
    private Set<String> labels = new HashSet<>();

    private String website;

    @Column(length = 1000)
    private String contact;

    public void addCategory(String category) {
        this.categories.add(category);
    }

    public void addLabel(String label) {
        this.labels.add(label);
    }
}
