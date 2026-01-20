package com.example.portpilot.domain.festival;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

    List<Festival> findByRegion(String region);

    @Query("SELECT f FROM Festival f WHERE f.startDate <= :endDate AND f.endDate >= :startDate")
    List<Festival> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    List<Festival> findByIsFree(boolean isFree);

    @Query("SELECT f FROM Festival f JOIN f.categories c WHERE c IN :categories")
    List<Festival> findByCategories(@Param("categories") List<String> categories);

    @Query("SELECT f FROM Festival f JOIN f.labels l WHERE l IN :labels")
    List<Festival> findByLabels(@Param("labels") List<String> labels);
}
