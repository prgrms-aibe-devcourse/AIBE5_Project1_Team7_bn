package com.example.portpilot.web.controller.festival;

import com.example.portpilot.domain.festival.FestivalLabelDictionary;
import com.example.portpilot.domain.festival.FestivalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Web Controller for Festival Discovery Pages
 */
@Controller
@RequestMapping("/festivals")
@RequiredArgsConstructor
public class FestivalController {

    private final FestivalService festivalService;

    /**
     * Festival list page
     */
    @GetMapping
    public String festivalList(Model model) {
        model.addAttribute("festivals", festivalService.getAllFestivals());
        model.addAttribute("regions", FestivalLabelDictionary.REGIONS);
        model.addAttribute("categories", FestivalLabelDictionary.CATEGORIES);
        model.addAttribute("preferences", FestivalLabelDictionary.getAvailablePreferences());
        return "festivals/list";
    }

    /**
     * Festival detail page
     */
    @GetMapping("/{id}")
    public String festivalDetail(@PathVariable Long id, Model model) {
        return festivalService.getFestivalById(id)
                .map(festival -> {
                    model.addAttribute("festival", festival);
                    return "festivals/detail";
                })
                .orElse("redirect:/festivals");
    }

    /**
     * Festival recommendation page
     */
    @GetMapping("/recommend")
    public String festivalRecommend(Model model) {
        model.addAttribute("preferences", FestivalLabelDictionary.getAvailablePreferences());
        model.addAttribute("regions", FestivalLabelDictionary.REGIONS);
        model.addAttribute("categories", FestivalLabelDictionary.CATEGORIES);
        return "festivals/recommend";
    }
}
