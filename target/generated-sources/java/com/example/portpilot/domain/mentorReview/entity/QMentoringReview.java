package com.example.portpilot.domain.mentorReview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMentoringReview is a Querydsl query type for MentoringReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMentoringReview extends EntityPathBase<MentoringReview> {

    private static final long serialVersionUID = 571731137L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMentoringReview mentoringReview = new QMentoringReview("mentoringReview");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath is_blocked = createBoolean("is_blocked");

    public final com.example.portpilot.domain.user.QUser mentor;

    public final NumberPath<Long> mentoringRequestId = createNumber("mentoringRequestId", Long.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final com.example.portpilot.domain.user.QUser reviewer;

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public QMentoringReview(String variable) {
        this(MentoringReview.class, forVariable(variable), INITS);
    }

    public QMentoringReview(Path<? extends MentoringReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMentoringReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMentoringReview(PathMetadata metadata, PathInits inits) {
        this(MentoringReview.class, metadata, inits);
    }

    public QMentoringReview(Class<? extends MentoringReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mentor = inits.isInitialized("mentor") ? new com.example.portpilot.domain.user.QUser(forProperty("mentor")) : null;
        this.reviewer = inits.isInitialized("reviewer") ? new com.example.portpilot.domain.user.QUser(forProperty("reviewer")) : null;
    }

}

