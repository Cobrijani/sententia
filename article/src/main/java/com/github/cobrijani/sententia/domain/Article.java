package com.github.cobrijani.sententia.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import com.github.cobrijani.sententia.domain.enumeration.Markup;

/**
 * An Article written by certain author that contains some kind of content.
 * @author Stefan Bratic
 */
@Document(collection = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Size(min = 1, max = 42)
    @Field("title")
    private String title;

    @Field("type")
    private Markup type;

    @NotNull
    @Field("category")
    private String category;

    @NotNull
    @Field("author_id")
    private String authorId;

    @NotNull
    @Field("author_name")
    private String authorName;

    @Field("created")
    private ZonedDateTime created;

    @Field("modified")
    private ZonedDateTime modified;

    @Field("published")
    private ZonedDateTime published;


    @Field("content")
    private String content;

    @Field("released_content")
    private String releasedContent;

    @NotNull
    @Field("content_hash")
    private String contentHash;

    @Field("released_content_hash")
    private String releasedContentHash;

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

    public Article title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Markup getType() {
        return type;
    }

    public Article type(Markup type) {
        this.type = type;
        return this;
    }

    public void setType(Markup type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public Article category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorId() {
        return authorId;
    }

    public Article authorId(String authorId) {
        this.authorId = authorId;
        return this;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public Article authorName(String authorName) {
        this.authorName = authorName;
        return this;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Article created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getModified() {
        return modified;
    }

    public Article modified(ZonedDateTime modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(ZonedDateTime modified) {
        this.modified = modified;
    }

    public ZonedDateTime getPublished() {
        return published;
    }

    public Article published(ZonedDateTime published) {
        this.published = published;
        return this;
    }

    public void setPublished(ZonedDateTime published) {
        this.published = published;
    }

    public String getContent() {
        return content;
    }

    public Article content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReleasedContent() {
        return releasedContent;
    }

    public Article releasedContent(String releasedContent) {
        this.releasedContent = releasedContent;
        return this;
    }

    public void setReleasedContent(String releasedContent) {
        this.releasedContent = releasedContent;
    }

    public String getContentHash() {
        return contentHash;
    }

    public Article contentHash(String contentHash) {
        this.contentHash = contentHash;
        return this;
    }

    public void setContentHash(String contentHash) {
        this.contentHash = contentHash;
    }

    public String getReleasedContentHash() {
        return releasedContentHash;
    }

    public Article releasedContentHash(String releasedContentHash) {
        this.releasedContentHash = releasedContentHash;
        return this;
    }

    public void setReleasedContentHash(String releasedContentHash) {
        this.releasedContentHash = releasedContentHash;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", authorId='" + getAuthorId() + "'" +
            ", authorName='" + getAuthorName() + "'" +
            ", created='" + getCreated() + "'" +
            ", modified='" + getModified() + "'" +
            ", published='" + getPublished() + "'" +
            ", content='" + getContent() + "'" +
            ", releasedContent='" + getReleasedContent() + "'" +
            ", contentHash='" + getContentHash() + "'" +
            ", releasedContentHash='" + getReleasedContentHash() + "'" +
            "}";
    }
}
