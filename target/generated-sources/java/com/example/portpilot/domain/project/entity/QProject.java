package com.example.portpilot.domain.project.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProject is a Querydsl query type for Project
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProject extends EntityPathBase<Project> {

    private static final long serialVersionUID = 1898383365L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProject project = new QProject("project");

    public final EnumPath<com.example.portpilot.domain.project.entity.enums.CollaborationOption> collaborationOption = createEnum("collaborationOption", com.example.portpilot.domain.project.entity.enums.CollaborationOption.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> deadline = createDateTime("deadline", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final EnumPath<com.example.portpilot.domain.project.entity.enums.Experience> experience = createEnum("experience", com.example.portpilot.domain.project.entity.enums.Experience.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.portpilot.domain.user.QUser owner;

    public final SetPath<Participation, QParticipation> participants = this.<Participation, QParticipation>createSet("participants", Participation.class, QParticipation.class, PathInits.DIRECT2);

    public final EnumPath<com.example.portpilot.domain.project.entity.enums.PlanningState> planningState = createEnum("planningState", com.example.portpilot.domain.project.entity.enums.PlanningState.class);

    public final EnumPath<com.example.portpilot.domain.project.entity.enums.ProjectType> projectType = createEnum("projectType", com.example.portpilot.domain.project.entity.enums.ProjectType.class);

    public final EnumPath<com.example.portpilot.domain.project.entity.enums.StartOption> startOption = createEnum("startOption", com.example.portpilot.domain.project.entity.enums.StartOption.class);

    public final EnumPath<ProjectStatus> status = createEnum("status", ProjectStatus.class);

    public final StringPath title = createString("title");

    public QProject(String variable) {
        this(Project.class, forVariable(variable), INITS);
    }

    public QProject(Path<? extends Project> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProject(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProject(PathMetadata metadata, PathInits inits) {
        this(Project.class, metadata, inits);
    }

    public QProject(Class<? extends Project> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.owner = inits.isInitialized("owner") ? new com.example.portpilot.domain.user.QUser(forProperty("owner")) : null;
    }

}

