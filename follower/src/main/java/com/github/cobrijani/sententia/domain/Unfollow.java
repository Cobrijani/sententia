package com.github.cobrijani.sententia.domain;

import org.neo4j.ogm.annotation.RelationshipEntity;

@RelationshipEntity(type = "UNFOLLOWED")
public class Unfollow extends Relationship {

}
