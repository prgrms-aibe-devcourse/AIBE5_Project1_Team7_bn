package com.example.portpilot.domain.festival;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFestival is a Querydsl query type for Festival
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFestival extends EntityPathBase<Festival> {

    private static final long serialVersionUID = 285995884L;

    public static final QFestival festival = new QFestival("festival");

    public final SetPath<String, StringPath> categories = this.<String, StringPath>createSet("categories", String.class, StringPath.class, PathInits.DIRECT2);

    public final StringPath contact = createString("contact");

    public final StringPath description = createString("description");

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final NumberPath<java.math.BigDecimal> fee = createNumber("fee", java.math.BigDecimal.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isFree = createBoolean("isFree");

    public final SetPath<String, StringPath> labels = this.<String, StringPath>createSet("labels", String.class, StringPath.class, PathInits.DIRECT2);

    public final StringPath location = createString("location");

    public final StringPath name = createString("name");

    public final StringPath region = createString("region");

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final StringPath website = createString("website");

    public QFestival(String variable) {
        super(Festival.class, forVariable(variable));
    }

    public QFestival(Path<? extends Festival> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFestival(PathMetadata metadata) {
        super(Festival.class, metadata);
    }

}

