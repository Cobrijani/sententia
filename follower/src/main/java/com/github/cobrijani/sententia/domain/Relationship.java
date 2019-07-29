package com.github.cobrijani.sententia.domain;

import java.time.ZonedDateTime;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.StartNode;

public abstract class Relationship {

    private ZonedDateTime created;

    @StartNode
    private Person subjectPerson;

    @EndNode
    private Person objectPerson;

	public ZonedDateTime getCreated() {
		return created;
	}

	public void setCreated(ZonedDateTime created) {
		this.created = created;
	}

	public Person getSubjectPerson() {
		return subjectPerson;
	}

	public void setSubjectPerson(Person subjectPerson) {
		this.subjectPerson = subjectPerson;
	}

	public Person getObjectPerson() {
		return objectPerson;
	}

	public void setObjectPerson(Person objectPerson) {
		this.objectPerson = objectPerson;
	}



}
