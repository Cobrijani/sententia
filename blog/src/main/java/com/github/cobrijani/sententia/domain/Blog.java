package com.github.cobrijani.sententia.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.ZonedDateTime;

import com.github.cobrijani.sententia.domain.enumeration.Markup;

/**
 * Entity representing a blog
 */
@Document(collection = "blog")
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("type")
    private Markup type;

    @Field("category")
    private String category;

    @Field("author_id")
    private String authorId;

    @Field("author_name")
    private String authorName;

    @Field("created")
    private ZonedDateTime created;

    @Field("modified")
    private ZonedDateTime modified;

    @Field("content")
    private String content;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Blog title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Markup getType() {
        return type;
    }

    public Blog type(Markup type) {
        this.type = type;
        return this;
    }

    public void setType(Markup type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public Blog category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorId() {
        return authorId;
    }

    public Blog authorId(String authorId) {
        this.authorId = authorId;
        return this;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public Blog authorName(String authorName) {
        this.authorName = authorName;
        return this;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Blog created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getModified() {
        return modified;
    }

    public Blog modified(ZonedDateTime modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(ZonedDateTime modified) {
        this.modified = modified;
    }

    public String getContent() {
        return content;
    }

    public Blog content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Blog)) {
            return false;
        }
        return id != null && id.equals(((Blog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Blog{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", authorId='" + getAuthorId() + "'" +
            ", authorName='" + getAuthorName() + "'" +
            ", created='" + getCreated() + "'" +
            ", modified='" + getModified() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
