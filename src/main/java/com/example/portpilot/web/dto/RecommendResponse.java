package com.example.portpilot.web.dto;

import java.util.List;

public class RecommendResponse {

    private List<Result> results;

    public RecommendResponse() {
    }

    public RecommendResponse(List<Result> results) {
        this.results = results;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public static class Result {
        private String id;
        private String name;
        private double score;
        private String reason;
        private List<String> cta;

        public Result() {
        }

        public Result(String id, String name, double score, String reason, List<String> cta) {
            this.id = id;
            this.name = name;
            this.score = score;
            this.reason = reason;
            this.cta = cta;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getScore() {
            return score;
        }

        public void setScore(double score) {
            this.score = score;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public List<String> getCta() {
            return cta;
        }

        public void setCta(List<String> cta) {
            this.cta = cta;
        }
    }
}
