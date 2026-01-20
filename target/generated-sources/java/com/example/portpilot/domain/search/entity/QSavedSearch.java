package com.example.portpilot.domain.search.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSavedSearch is a Querydsl query type for SavedSearch
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSavedSearch extends EntityPathBase<SavedSearch> {

    private static final long serialVersionUID = 33109896L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSavedSearch savedSearch = new QSavedSearch("savedSearch");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isBlocked = createBoolean("isBlocked");

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath name = createString("name");

    public final StringPath searchConditions = createString("searchConditions");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QSavedSearch(String variable) {
        this(SavedSearch.class, forVariable(variable), INITS);
    }

    public QSavedSearch(Path<? extends SavedSearch> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSavedSearch(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSavedSearch(PathMetadata metadata, PathInits inits) {
        this(SavedSearch.class, metadata, inits);
    }

    public QSavedSearch(Class<? extends SavedSearch> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

