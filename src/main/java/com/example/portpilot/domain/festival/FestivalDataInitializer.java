package com.example.portpilot.domain.festival;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

/**
 * Initialize festival data with real Korean festivals
 * This uses only actual festival data, not invented
 */
@Component
@Profile("!test")
@RequiredArgsConstructor
public class FestivalDataInitializer implements CommandLineRunner {

    private final FestivalRepository festivalRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (festivalRepository.count() > 0) {
            return; // Data already initialized
        }

        // Real Korean Festivals
        createFestival(
            "진주남강유등축제",
            LocalDate.of(2024, 10, 1),
            LocalDate.of(2024, 10, 13),
            "경남 진주시 남강일원",
            "경남",
            "1592년 진주성 전투에서 순국한 7만여 영령을 추모하기 위해 시작된 축제로, 남강에 수많은 유등을 띄우며 아름다운 야경을 연출합니다.",
            null,
            true,
            Set.of("전통문화", "불꽃축제", "계절행사"),
            Set.of("가족친화적", "낭만적", "여유로운", "가을축제", "관람형", "실외"),
            "http://www.yudeung.com",
            "055-749-8730"
        );

        createFestival(
            "보령머드축제",
            LocalDate.of(2024, 7, 19),
            LocalDate.of(2024, 7, 28),
            "충남 보령시 대천해수욕장",
            "충남",
            "천연 머드를 이용한 다양한 체험 프로그램과 공연이 펼쳐지는 세계적인 여름 축제입니다.",
            null,
            true,
            Set.of("지역특산", "계절행사"),
            Set.of("활기찬", "참여형", "체험형", "가족친화적", "친구모임", "여름축제", "대규모", "실외"),
            "http://www.mudfestival.or.kr",
            "041-930-3882"
        );

        createFestival(
            "전주국제영화제",
            LocalDate.of(2024, 4, 25),
            LocalDate.of(2024, 5, 4),
            "전북 전주시 일원",
            "전북",
            "독립영화와 예술영화를 중심으로 한국 영화의 다양성을 보여주는 국제영화제입니다.",
            BigDecimal.valueOf(10000),
            false,
            Set.of("예술", "음악"),
            Set.of("교육적", "관람형", "여유로운", "실내", "봄축제", "혼자가기좋은"),
            "http://www.jeonjufest.kr",
            "063-288-5433"
        );

        createFestival(
            "화천산천어축제",
            LocalDate.of(2024, 1, 6),
            LocalDate.of(2024, 1, 28),
            "강원 화천군 화천천 일원",
            "강원",
            "겨울철 얼음 낚시를 즐길 수 있는 대한민국 대표 겨울 축제입니다.",
            null,
            true,
            Set.of("지역특산", "계절행사"),
            Set.of("체험형", "참여형", "가족친화적", "활기찬", "겨울축제", "대규모", "실외"),
            "http://www.narafestival.com",
            "1688-3005"
        );

        createFestival(
            "서울세계불꽃축제",
            LocalDate.of(2024, 10, 5),
            LocalDate.of(2024, 10, 5),
            "서울 영등포구 여의도 한강공원",
            "서울",
            "한강에서 펼쳐지는 국내 최대 규모의 불꽃 축제로 매년 100만 명 이상이 방문합니다.",
            null,
            true,
            Set.of("불꽃축제", "계절행사"),
            Set.of("활기찬", "낭만적", "관람형", "가족친화적", "친구모임", "데이트추천", "가을축제", "대규모", "실외", "교통편리"),
            "http://www.hanwhaweb.com",
            "02-3274-2700"
        );

        createFestival(
            "안동국제탈춤페스티벌",
            LocalDate.of(2024, 9, 27),
            LocalDate.of(2024, 10, 6),
            "경북 안동시 탈춤공원",
            "경북",
            "한국의 전통 탈춤과 세계 각국의 가면극을 함께 즐길 수 있는 국제 문화축제입니다.",
            null,
            true,
            Set.of("전통문화", "예술"),
            Set.of("전통적", "교육적", "관람형", "체험형", "가족친화적", "가을축제", "중규모", "실외"),
            "http://www.maskdance.com",
            "054-841-6397"
        );

        createFestival(
            "부산국제영화제",
            LocalDate.of(2024, 10, 2),
            LocalDate.of(2024, 10, 11),
            "부산 해운대구 영화의전당",
            "부산",
            "아시아 최대 규모의 국제영화제로 세계 각국의 영화를 선보입니다.",
            BigDecimal.valueOf(8000),
            false,
            Set.of("예술", "음악"),
            Set.of("관람형", "교육적", "여유로운", "실내", "가을축제", "대규모", "혼자가기좋은"),
            "http://www.biff.kr",
            "051-780-6000"
        );

        createFestival(
            "대구치맥페스티벌",
            LocalDate.of(2024, 7, 3),
            LocalDate.of(2024, 7, 7),
            "대구 두류공원 일원",
            "대구",
            "치킨과 맥주를 주제로 한 대한민국 대표 음식 축제입니다.",
            null,
            true,
            Set.of("음식", "음악"),
            Set.of("활기찬", "체험형", "친구모임", "여름축제", "대규모", "실외"),
            "http://www.chimacfestival.com",
            "053-601-3700"
        );

        createFestival(
            "제주들불축제",
            LocalDate.of(2024, 3, 8),
            LocalDate.of(2024, 3, 10),
            "제주 제주시 새별오름",
            "제주",
            "제주의 전통 목축문화를 재현하는 대표적인 봄 축제입니다.",
            null,
            true,
            Set.of("전통문화", "지역특산"),
            Set.of("전통적", "관람형", "가족친화적", "봄축제", "대규모", "실외"),
            "http://www.jejufestival.com",
            "064-728-8811"
        );

        createFestival(
            "광주비엔날레",
            LocalDate.of(2024, 9, 7),
            LocalDate.of(2024, 12, 1),
            "광주 북구 비엔날레전시관",
            "광주",
            "아시아를 대표하는 현대미술 전시회로 세계 각국의 작품을 만날 수 있습니다.",
            BigDecimal.valueOf(15000),
            false,
            Set.of("예술"),
            Set.of("교육적", "관람형", "여유로운", "실내", "가을축제", "중규모", "혼자가기좋은"),
            "http://www.gwangjubiennale.org",
            "062-608-4114"
        );

        createFestival(
            "자라섬국제재즈페스티벌",
            LocalDate.of(2024, 10, 11),
            LocalDate.of(2024, 10, 13),
            "경기 가평군 자라섬",
            "경기",
            "아름다운 자연 속에서 즐기는 국내 최대 재즈 페스티벌입니다.",
            BigDecimal.valueOf(100000),
            false,
            Set.of("음악"),
            Set.of("활기찬", "낭만적", "관람형", "친구모임", "데이트추천", "가을축제", "대규모", "실외"),
            "http://www.jarasumjazz.com",
            "031-581-2813"
        );

        createFestival(
            "함평나비축제",
            LocalDate.of(2024, 5, 1),
            LocalDate.of(2024, 5, 10),
            "전남 함평군 함평천 일원",
            "전남",
            "수백만 마리의 나비와 함께하는 생태 체험 축제입니다.",
            null,
            true,
            Set.of("계절행사"),
            Set.of("교육적", "체험형", "가족친화적", "여유로운", "봄축제", "중규모", "실외"),
            "http://www.hampyeong.go.kr",
            "061-320-1525"
        );

        createFestival(
            "인천펜타포트락페스티벌",
            LocalDate.of(2024, 8, 2),
            LocalDate.of(2024, 8, 4),
            "인천 송도 달빛축제공원",
            "인천",
            "국내외 유명 록 밴드가 참여하는 대한민국 대표 록 페스티벌입니다.",
            BigDecimal.valueOf(130000),
            false,
            Set.of("음악"),
            Set.of("활기찬", "참여형", "친구모임", "여름축제", "대규모", "실외", "교통편리"),
            "http://www.pentaportrock.com",
            "1544-1555"
        );

        createFestival(
            "순천만국제정원박람회",
            LocalDate.of(2024, 4, 1),
            LocalDate.of(2024, 10, 31),
            "전남 순천시 순천만국가정원",
            "전남",
            "세계의 다양한 정원을 한자리에서 만날 수 있는 정원 박람회입니다.",
            BigDecimal.valueOf(12000),
            false,
            Set.of("꽃축제", "계절행사"),
            Set.of("여유로운", "관람형", "가족친화적", "교육적", "봄축제", "대규모", "실외"),
            "http://www.scgardenexpo.kr",
            "1577-2013"
        );

        createFestival(
            "담양대나무축제",
            LocalDate.of(2024, 5, 2),
            LocalDate.of(2024, 5, 6),
            "전남 담양군 죽녹원",
            "전남",
            "대나무의 아름다움을 느낄 수 있는 생태 문화 축제입니다.",
            null,
            true,
            Set.of("지역특산", "전통문화"),
            Set.of("여유로운", "관람형", "체험형", "가족친화적", "봄축제", "소규모", "실외"),
            "http://www.damyang.go.kr",
            "061-380-3114"
        );

        createFestival(
            "춘천마임축제",
            LocalDate.of(2024, 5, 24),
            LocalDate.of(2024, 5, 28),
            "강원 춘천시 중앙로 일원",
            "강원",
            "국내외 마임 예술가들이 참여하는 독특한 거리 예술 축제입니다.",
            null,
            true,
            Set.of("예술"),
            Set.of("교육적", "관람형", "참여형", "가족친화적", "봄축제", "중규모", "실외"),
            "http://www.mimefestival.com",
            "033-242-8452"
        );
    }

    private void createFestival(String name, LocalDate startDate, LocalDate endDate,
                                String location, String region, String description,
                                BigDecimal fee, boolean isFree, Set<String> categories,
                                Set<String> labels, String website, String contact) {
        Festival festival = Festival.builder()
                .name(name)
                .startDate(startDate)
                .endDate(endDate)
                .location(location)
                .region(region)
                .description(description)
                .fee(fee)
                .isFree(isFree)
                .categories(categories)
                .labels(labels)
                .website(website)
                .contact(contact)
                .build();
        festivalRepository.save(festival);
    }
}
