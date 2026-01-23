package com.example.portpilot.web.dto;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

public class RecommendRequest {

    private String userId;

    @Valid
    private Survey survey;

    @Valid
    private Constraints constraints;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Constraints getConstraints() {
        return constraints;
    }

    public void setConstraints(Constraints constraints) {
        this.constraints = constraints;
    }

    public static class Survey {
        @Min(1)
        @Max(5)
        private Integer mood;

        @Min(1)
        @Max(5)
        private Integer cost;

        @Min(1)
        @Max(5)
        private Integer timeVisual;

        @Min(1)
        @Max(5)
        private Integer crowded;

        private List<String> theme;
        private List<String> companion;

        public Integer getMood() {
            return mood;
        }

        public void setMood(Integer mood) {
            this.mood = mood;
        }

        public Integer getCost() {
            return cost;
        }

        public void setCost(Integer cost) {
            this.cost = cost;
        }

        public Integer getTimeVisual() {
            return timeVisual;
        }

        public void setTimeVisual(Integer timeVisual) {
            this.timeVisual = timeVisual;
        }

        public Integer getCrowded() {
            return crowded;
        }

        public void setCrowded(Integer crowded) {
            this.crowded = crowded;
        }

        public List<String> getTheme() {
            return theme;
        }

        public void setTheme(List<String> theme) {
            this.theme = theme;
        }

        public List<String> getCompanion() {
            return companion;
        }

        public void setCompanion(List<String> companion) {
            this.companion = companion;
        }
    }

    public static class Constraints {
        private String region;
        private String startDate;
        private String endDate;

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }

        public String getStartDate() {
            return startDate;
        }

        public void setStartDate(String startDate) {
            this.startDate = startDate;
        }

        public String getEndDate() {
            return endDate;
        }

        public void setEndDate(String endDate) {
            this.endDate = endDate;
        }
    }
}
