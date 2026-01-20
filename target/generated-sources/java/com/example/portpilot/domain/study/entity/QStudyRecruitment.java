package com.example.portpilot.domain.study.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyRecruitment is a Querydsl query type for StudyRecruitment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyRecruitment extends EntityPathBase<StudyRecruitment> {

    private static final long serialVersionUID = 9285335L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyRecruitment studyRecruitment = new QStudyRecruitment("studyRecruitment");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    public final NumberPath<Integer> backendRecruit = createNumber("backendRecruit", Integer.class);

    public final BooleanPath closed = createBoolean("closed");

    public final BooleanPath completed = createBoolean("completed");

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final DateTimePath<java.time.LocalDateTime> deadline = createDateTime("deadline", java.time.LocalDateTime.class);

    public final NumberPath<Integer> designerRecruit = createNumber("designerRecruit", Integer.class);

    public final NumberPath<Integer> frontendRecruit = createNumber("frontendRecruit", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isBlocked = createBoolean("isBlocked");

    public final NumberPath<Integer> maxMembers = createNumber("maxMembers", Integer.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final ListPath<StudyParticipation, QStudyParticipation> participations = this.<StudyParticipation, QStudyParticipation>createList("participations", StudyParticipation.class, QStudyParticipation.class, PathInits.DIRECT2);

    public final NumberPath<Integer> plannerRecruit = createNumber("plannerRecruit", Integer.class);

    public final StringPath techStack = createString("techStack");

    public final ListPath<StudyTechStack, QStudyTechStack> techStacks = this.<StudyTechStack, QStudyTechStack>createList("techStacks", StudyTechStack.class, QStudyTechStack.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QStudyRecruitment(String variable) {
        this(StudyRecruitment.class, forVariable(variable), INITS);
    }

    public QStudyRecruitment(Path<? extends StudyRecruitment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyRecruitment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyRecruitment(PathMetadata metadata, PathInits inits) {
        this(StudyRecruitment.class, metadata, inits);
    }

    public QStudyRecruitment(Class<? extends StudyRecruitment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

