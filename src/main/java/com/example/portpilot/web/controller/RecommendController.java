package com.example.portpilot.web.controller;

import com.example.portpilot.web.dto.RecommendRequest;
import com.example.portpilot.web.dto.RecommendResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class RecommendController {

    @PostMapping("/recommend")
    public ResponseEntity<RecommendResponse> recommend(@Valid @RequestBody RecommendRequest request) {
        // Stub implementation:
        // - returns stable schema
        // - deterministic output for FE integration
        // - avoids DB/LLM dependencies for now

        String primaryTheme = firstOrNull(request, true);
        String reason = buildReason(primaryTheme);

        List<RecommendResponse.Result> results = new ArrayList<>();
        results.add(new RecommendResponse.Result(
                "fest_stub_001",
                "Sample Festival (Stub)",
                0.87,
                reason,
                Arrays.asList("add_calendar", "notify_me")
        ));
        results.add(new RecommendResponse.Result(
                "fest_stub_002",
                "Second Pick (Stub)",
                0.81,
                "Good overall fit based on your survey preferences",
                Arrays.asList("add_calendar")
        ));

        return ResponseEntity.ok(new RecommendResponse(results));
    }

    private static String firstOrNull(RecommendRequest request, boolean theme) {
        if (request == null || request.getSurvey() == null) {
            return null;
        }
        List<String> values = theme ? request.getSurvey().getTheme() : request.getSurvey().getCompanion();
        if (values == null || values.isEmpty()) {
            return null;
        }
        return values.get(0);
    }

    private static String buildReason(String primaryTheme) {
        if (primaryTheme == null || primaryTheme.trim().isEmpty()) {
            return "Matches your survey preferences";
        }
        return "Matches your interest in " + primaryTheme;
    }
}
