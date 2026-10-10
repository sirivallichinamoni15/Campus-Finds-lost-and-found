
package com.example.lostfound.service;

import com.example.lostfound.entity.LostItem;
import com.example.lostfound.entity.FoundItem;
import com.example.lostfound.repository.LostItemRepository;
import com.example.lostfound.repository.FoundItemRepository;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemMatchingService {

    private final LostItemRepository lostItemRepository;
    private final FoundItemRepository foundItemRepository;

    private static final Set<String> STOP_WORDS = Set.of(
        "a", "an", "the", "is", "my", "it", "with",
        "and", "or", "in", "on", "at", "of", "to",
        "for", "i", "was", "this", "that", "has", "have"
    );

    public ItemMatchingService(
            LostItemRepository lostItemRepository,
            FoundItemRepository foundItemRepository) {
        this.lostItemRepository = lostItemRepository;
        this.foundItemRepository = foundItemRepository;
    }

    private Set<String> getWords(String text) {
        Set<String> words = new HashSet<>();

        if (text == null || text.isBlank()) {
            return words;
        }

        for (String word : text.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", " ")
                .trim().split("\\s+")) {

            if (word.length() > 1 && !STOP_WORDS.contains(word)) {
                words.add(word);
            }
        }

        return words;
    }

    private double similarity(String first, String second) {
        Set<String> firstWords = getWords(first);
        Set<String> secondWords = getWords(second);

        if (firstWords.isEmpty() || secondWords.isEmpty()) {
            return 0;
        }

        Set<String> common = new HashSet<>(firstWords);
        common.retainAll(secondWords);

        Set<String> all = new HashSet<>(firstWords);
        all.addAll(secondWords);

        return (double) common.size() / all.size() * 100;
    }

    public List<Map<String, Object>> findMatches() {

        List<LostItem> lostItems = lostItemRepository.findAll();
        List<FoundItem> foundItems = foundItemRepository.findAll();

        List<Map<String, Object>> matches = new ArrayList<>();

        for (LostItem lost : lostItems) {
            for (FoundItem found : foundItems) {

                double nameScore = similarity(
                    lost.getItemName(),
                    found.getItemName()
                );

                double descriptionScore = similarity(
                    lost.getDescription(),
                    found.getDescription()
                );

                double locationScore = similarity(
                    lost.getLocation(),
                    found.getLocation()
                );

                // Give more importance to item names and descriptions.
                double score =
                    (nameScore * 0.55) +
                    (descriptionScore * 0.35) +
                    (locationScore * 0.10);

                if (score >= 20) {
                    Map<String, Object> match = new LinkedHashMap<>();

                    match.put("lostItem", lost);
                    match.put("foundItem", found);
                    match.put(
                        "similarityScore",
                        Math.round(score)
                    );

                    matches.add(match);
                }
            }
        }

        matches.sort((a, b) ->
            Long.compare(
                ((Number) b.get("similarityScore")).longValue(),
                ((Number) a.get("similarityScore")).longValue()
            )
        );

        return matches;
    }
}
